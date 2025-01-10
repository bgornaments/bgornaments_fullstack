/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import logo from "/src/assets/image.png";
import next from "/src/assets/next.png";
import back from "/src/assets/previous.png";
import info from "/src/assets/info.png";
import otherImg from "/src/assets/otherimg.png";
import regen from "/src/assets/loading-arrow.png";
import {
  LIGHTENING_MODE,
  SUMMARIZER,
  IMAGE_GENERATOR,
  SIMILAR_IMAGES_FETCHER
} from "../../constantsAWS";
import Lottie from "react-lottie";
import LoadingData from "/src/assets/Loading2.json";
import chat from "/src/assets/chat.png";
import { setImageData, updateFormData } from "../../redux/formSlice";
import { useNavigate } from "react-router-dom";
import Meaning from "./Meaning";
import Images from "/src/assets/innovation.png";
import GlassComponent from "../GlassComponent";

interface FormData {
  occasion: string;
  gender: string;
  ageGroup: string;
  jewelryType: string;
}

interface RootState {
  form: {
    formData: FormData;
  };
}

const AIGenerated: React.FC = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.formData);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [selectedChoiceFlag, setSelectedChoiceFlag] = useState<boolean>(false);
  const [questionsHistory, setQuestionsHistory] = useState<string[]>([]);
  const [optionsHistory, setOptionsHistory] = useState<string[][]>([]);
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [meaningOption, setMeaningOption] = useState<string | null>(null);
  const [donotask, setDonotask] = useState<string[]>([]);
  const Navigate = useNavigate();
  const maxQuestions: number = 5;
  const [showComponent, setShowComponent] = useState<boolean>(false);

  useEffect(() => {
      const trialDaysLeft = parseInt(sessionStorage.getItem('trial_days_left') || '0');
      const trialStatus = sessionStorage.getItem('trial_status')?.toLowerCase();
    
      console.log("trialDaysLeft:", trialDaysLeft); // Log trial days left
      console.log("trialStatus:", trialStatus); // Log trial status as boolean
    
      // Check if trialStatus is true and trialDaysLeft is greater than 0
      if (trialStatus && trialDaysLeft > 0) {
        setShowComponent(true); // Show component if trial is active and days left are positive
      } else {
        setShowComponent(false); // Hide component if trial is inactive or days are not positive
      }
    }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const generateBasicInfoString = (): string => {
    return `I want a ${formData.jewelryType} for ${formData.occasion} for a ${formData.gender} aged ${formData.ageGroup}`;
    console.log(formData);
  };

  const capitalizeWords = (str: string): string => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const handleInfoClick = (event: React.MouseEvent, option: string) => {
    event.stopPropagation();
    setMeaningOption(option);
    console.log(`Info image clicked for option: ${option}`);
  };

  const handleCancelClick = () => {
    setMeaningOption(null);
  };

  const cleanUpChoicesString = (choicesString: string): string[] => {
    try {
      const cleanedString = choicesString.split(/['"],/);
      const cleanedOptions = cleanedString.map((option) =>
        capitalizeWords(option.replace(/\[|\]|"|'/g, "").trim())
      );
      //cleanedOptions.push("None");
      console.log(cleanedOptions);
      return cleanedOptions;
    } catch (error) {
      console.error("Error cleaning up choices:", error);
      return [];
    }
  };

  const fetchInitialQuestion = async (updatedFormData: FormData) => {
    setIsLoading(true);
    const userPrompt = `user: I want a ${updatedFormData.jewelryType} for ${updatedFormData.occasion} for a ${updatedFormData.gender} aged ${updatedFormData.ageGroup}`;
    try {
      const payload = {
        body: JSON.stringify({
          user_prompt: userPrompt,
          donotask: donotask.join(","),
        }),
      };
      console.log(payload);
      const response = await axios.post(LIGHTENING_MODE, payload);
      console.log(response)
      const data = JSON.parse(response.data.body);
      setCurrentQuestion(data.question);
      setOptions(cleanUpChoicesString(data.choices));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching initial question:", error);
      setIsLoading(false);
    }
  };

  const fetchNextQuestion = async (selectedOption: string | null) => {
    setIsLoading(true);
    const updatedQuestions = [...questions];
    const updatedAnswers = [...answers];

    if (selectedOption !== null) {
      updatedAnswers.push(selectedOption);
    }

    const userPrompt = `user: ${generateBasicInfoString()}\n${updatedQuestions
      .map((q, index) => `bot: ${q}\nuser: ${updatedAnswers[index]}`)
      .join("\n")}${selectedOption ? `\nbot: ${currentQuestion}\nuser: ${selectedOption}` : ""
      }`;
    console.log(userPrompt);
    try {
      const payload = {
        body: JSON.stringify({
          user_prompt: userPrompt,
          donotask: donotask.join(","),
        }),
      };
      console.log(payload);

      const response = await axios.post(LIGHTENING_MODE, payload);
      const data = JSON.parse(response.data.body);

      setQuestions([...updatedQuestions, currentQuestion]);
      setAnswers(updatedAnswers);
      setQuestionsHistory([...questionsHistory, currentQuestion]);
      setOptionsHistory([...optionsHistory, options]);
      setCurrentQuestion(data.question);
      setOptions(cleanUpChoicesString(data.choices));
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedChoice("");
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching next question:", error);
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setIsLoading(true);
    const updatedDonotask = [...donotask, currentQuestion];

    const userPrompt = `user: ${generateBasicInfoString()}\n${questions
      .map((q, index) => `bot: ${q}\nuser: ${answers[index]}`)
      .join("\n")}${selectedChoice ? `\nbot: ${currentQuestion}\nuser: ${selectedChoice}` : ""
      }`;
    console.log(userPrompt);
    try {
      const payload = {
        body: JSON.stringify({
          user_prompt: userPrompt,
          donotask: updatedDonotask.join(","),
        }),
      };
      console.log(payload);

      const response = await axios.post(LIGHTENING_MODE, payload);
      const data = JSON.parse(response.data.body);

      setDonotask(updatedDonotask);
      setCurrentQuestion(data.question);
      setOptions(cleanUpChoicesString(data.choices));
      setIsLoading(false);
    } catch (error) {
      console.error("Error regenerating question:", error);
      setIsLoading(false);
    }
  };

  const generateText2ImagePrompt = async () => {
    const finalPrompt =
      `user: ${generateBasicInfoString()}\n${questions
        .map((q, index) => `bot: ${q}\nuser: ${answers[index]}`)
        .join("\n")}` + `\nbot: ${currentQuestion}\nuser: ${selectedChoice}`;
    try {
      console.log(finalPrompt)
      const response = await axios.post(SUMMARIZER, {
        user_prompt: finalPrompt,
      });
      const data = JSON.parse(response.data.body);
      //const chat_link = data["chat_s3_link"]; //TO SAVE IN MongoDB/DynamoDB
      return data["t2i_prompt"];
    } catch (error) {
      console.error("Error generating text-to-image prompt:", error);
    }
  };

  const handleChoiceSubmit = async () => {
    if (currentQuestionIndex < maxQuestions - 1) {
      if (selectedChoice !== "" && selectedChoiceFlag) {
        await fetchNextQuestion(selectedChoice);
        setQuestionsAnswered((prev) => prev + 1);
      }
      setSelectedChoiceFlag(false);
    } else {
      setIsLoading(true);
      if (selectedChoice !== "" && selectedChoiceFlag) {
        const t2i_prompt = await generateText2ImagePrompt();
        console.log(t2i_prompt);
        await generateImages(t2i_prompt);
      }
    }
  };

  const generateImages = async (t2i_prompt: string) => {
    setIsLoading(true);
    try {
      const payload = {
        body: JSON.stringify({
          prompt: t2i_prompt,
          taskType: "TEXT_IMAGE",
        }),
      };
    let response;
    let retries = 0;
    const maxRetries = 3;

 while (retries < maxRetries) {
      try {
        response = await axios.post(IMAGE_GENERATOR, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          break; 
        }
      } catch (error: any) {
        if (error.response?.status === 504) {
          console.warn("Request timed out. Retrying...");
          retries++;
          await new Promise(resolve => setTimeout(resolve, 1000)); 
        } else {
          throw error; 
        }
      }
    }
    if (!response || response.status !== 200) {
      throw new Error("Failed to generate images after multiple retries.");
    }

    const parsedBody = JSON.parse(response.data.body);
    console.log("Parsed Body:", parsedBody);

    let urls_list = parsedBody.uploaded_image_urls;

      const payload_similar = {
        body: JSON.stringify({
          prompt: t2i_prompt,
          jtype: formData.jewelryType,
        }),
      };
      const response_similar = await axios.post(SIMILAR_IMAGES_FETCHER, payload_similar, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const parsedBody_similar = JSON.parse(response_similar.data.body);
      console.log("Parsed Body Similar:", parsedBody_similar);

      let similar_urls_list = parsedBody_similar.urls
      urls_list = similar_urls_list.concat(urls_list);

      const imageData = urls_list;
      console.log("Extracted Image Data:", imageData);

      if (Array.isArray(imageData)) {
        dispatch(setImageData(imageData));
        Navigate("/aiimages");
      } else {
        console.error("No image URLs found in response.");
      }
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      const previousQuestionIndex = currentQuestionIndex - 1;

      const previousQuestion = questionsHistory[previousQuestionIndex];
      const previousOptions = optionsHistory[previousQuestionIndex];

      setCurrentQuestion(previousQuestion);
      setOptions(previousOptions);
      setQuestions((prevQuestions) => prevQuestions.slice(0, -1));
      setAnswers((prevAnswers) => prevAnswers.slice(0, -1));
      setQuestionsHistory((prevHistory) => prevHistory.slice(0, -1));
      setOptionsHistory((prevHistory) => prevHistory.slice(0, -1));
      setCurrentQuestionIndex(previousQuestionIndex);

      if (answers[previousQuestionIndex]) {
        setSelectedChoice(answers[previousQuestionIndex]);
        setSelectedChoiceFlag(true);
        setQuestionsAnswered((prev) => prev - 1);
      } else {
        setSelectedChoice("");
        setSelectedChoiceFlag(false);
      }
    }
  };

  const progressPercentage = Math.min(
    ((questionsAnswered + 1) / maxQuestions) * 100,
    100
  );

  const handleChoiceChange = (choice: string) => {
    setSelectedChoice(choice);
    setSelectedChoiceFlag(true);
  };

  useEffect(() => {
    if (
      formData.occasion === "" &&
      formData.gender === "" &&
      formData.ageGroup === "" &&
      formData.jewelryType === ""
    ) {
      const savedFormData = localStorage.getItem("formData");
      if (savedFormData) {
        const parsedFormData = JSON.parse(savedFormData);
        dispatch(updateFormData(parsedFormData));
        fetchInitialQuestion(parsedFormData);
      }
    } else {
      fetchInitialQuestion(formData);
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return "Refreshing will take you to the new 1st question";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {showComponent ? (
        <div className="w-full min-h-screen flex flex-col  items-center justify-center">
        {isLoading ? (
          questionsAnswered + 1 === maxQuestions ? (
            <>
              {/* <Feedback /> */}
              <div className="text-xl min-h-screen flex flex-col justify-center items-center text-customGreen  text-center">
                <p className="font-custom text-lg md:text-2xl">
                  Crafting your Personalized Design <br />
                  Please Wait!
                </p>
                <Lottie options={defaultOptions} height={300} width={300} />
              </div>
            </>
          ) : (
            <div className="text-xl min-h-screen flex justify-center items-center">
              <Lottie options={defaultOptions} height={300} width={300} />
            </div>
          )
        ) : (
          <>
            <div className="xs:w-full xl:w-[75vw] flex flex-col  items-center xs:gap-[2.5vh] h-[100vh] overflow-scroll no-scrollbar">
              <div className="flex flex-col gap-[2vh] md:gap-[3vh] items-center pt-[2vh] ">
                <img
                  src={logo}
                  alt=""
                  className="xs:w-[3.8rem] md:w-[4.8rem] xl:w-[6.5rem]"
                />

                <h2 className="text-lightGolden flex justify-center xs:text-[1.1rem] md:text-[2.7vw] xl:text-[2.3vw] tracking-widest leading-tight font-custom text-center">
                  Let&#39;s design your perfect piece
                </h2>
              </div>

              <div className="flex-1 xs:w-[80vw] md:w-[75vw] xl:w-[70vw] flex-col justify-center items-center no-scrollbar">
                <div className="xs:py-[1rem] md:py-0 flex xs:gap-[2rem] xl:gap-[1rem] flex-col items-center ">
                  <div className="w-[98%] flex flex-col gap-[0.3rem] text-lightGolden text-[0.8rem] md:text-[1.2rem] tracking-widest">
                    <p className="font-custom">
                      {questionsAnswered + 1} out of {maxQuestions} Questions
                    </p>
                    <div className="w-full h-[1vh] bg-navbar rounded-2xl overflow-hidden no-scrollbar">
                      <div
                        className="h-full bg-customGreen"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-navbar xs:min-h-[10vh] xl:min-h-[12vh] p-[1.5rem] text-customGreen font-bold leading-loose rounded-3xl w-full flex justify-center items-center gap-[1rem]">
                    <img
                      src={chat}
                      alt=""
                      className="xs:w-[2rem] md:w-[3rem]"
                    />
                    <div className="xs:text-[0.6rem] md:text-[0.8rem] xl:text-[1.2rem] font-bold text-center">
                      {currentQuestion}
                    </div>
                  </div>
                  <div className="flex flex-wrap w-full justify-around font-serif font-semibold border border-navbar xs:py-[1.2rem] md:py-[3vw] p-[2vw] rounded-3xl">
                    {options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleChoiceChange(option)}
                        className={`flex justify-center gap-[2vw] items-center xs:text-[0.5rem] md:text-[0.6rem] xl:text-[0.9rem] xs:p-[0.4rem] md:px-[1vw] md:py-[0.6vw] mx-[0.5vw] my-[0.8vh] rounded-xl cursor-pointer shadow-md shadow-navbar transition-all ${selectedChoice === option
                          ? "bg-navbar text-lightGolden"
                          : "text-customGreen border border-navbar"
                          }`}
                      >
                        <p>{option}</p>
                        <div
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                          onClick={(event) => handleInfoClick(event, option)}
                        >
                          {hoverIndex === index ? (
                            <img
                              src={otherImg}
                              alt=""
                              className="xs:w-[1rem] md:w-[1.4rem] xl:w-[2rem]"
                            />
                          ) : (
                            <img
                              src={info}
                              alt=""
                              className="xs:w-[0.5rem] md:w-[0.9rem] xl:w-[1.2rem] "
                            />
                          )}
                        </div>
                      </button>
                    ))}
                    {meaningOption && (
                      <Meaning
                        option={meaningOption}
                        onCancel={handleCancelClick}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between xs:w-[80vw] md:w-[80vw] xl:w-[70vw] xs:text-[0.8rem] md:text-[1rem] xl:text-[1.2rem] text-customGreen p-5">
                <button
                  type="button"
                  onClick={handleBack}
                  className={`flex flex-col items-center ${currentQuestionIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                    }`}
                  disabled={currentQuestionIndex === 0}
                >
                  <img
                    src={back}
                    alt=""
                    className="xs:w-[2.2rem] md:w-[3rem] xl:w-[3.7rem] mb-[1vh] border border-customRed/80 rounded-full"
                  />
                  <p className="font-custom">Back</p>
                </button>

                <div className="flex gap-[2vw]">
                  <button
                    type="button"
                    onClick={handleRegenerate}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={regen}
                      alt=""
                      className="xs:w-[2.2rem] md:w-[3rem] xl:w-[3.7rem] mb-[1vh] border border-customRed/80 rounded-full"
                    />
                    <p className="font-custom">
                      Regenerate <br />
                      Question
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={handleChoiceSubmit}
                    disabled={!selectedChoiceFlag}
                    className="flex flex-col items-center"
                  >
                    {questionsAnswered + 1 === maxQuestions ? (
                      <>
                        <img
                          src={Images}
                          alt=""
                          className="xs:w-[2.2rem] md:w-[3rem] xl:w-[3.7rem] mb-[1vh] border border-customRed/80 rounded-full"
                        />
                        <p className="font-custom">
                          Generate <br />
                          Images
                        </p>
                      </>
                    ) : (
                      <>
                        <img
                          src={next}
                          alt="Next"
                          className="xs:w-[2.2rem] md:w-[3rem] xl:w-[3.7rem] mb-[1vh] border border-customRed/80 rounded-full"
                        />
                        <p className="font-custom">Next</p>
                      </>
                    )}
                  </button>
                  {/* <button
                    type="button"
                    onClick={handleChoiceSubmit}
                    disabled={!selectedChoiceFlag}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={next}
                      alt=""
                      className="xs:w-[2.7rem] md:w-[4.5rem] xl:w-[4.4rem] mb-[0.3vw]"
                    />
                    <p>Next</p>
                  </button> */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      ) : (
        <div>
          <GlassComponent/>
          <h2></h2>
        </div>
      )}
    </>
  );
};

export default AIGenerated;
