import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import logo from "/src/assets/image.png";
import next from "/src/assets/next.png";
import back from "/src/assets/previous.png";
import info from "/src/assets/info.png";
import otherImg from "/src/assets/otherimg.png";
import regen from "/src/assets/loading-arrow.png"
import {
  LIGHTENING_MODE,
  SUMMARIZER,
  IMAGE_GENERATOR,
} from "../../constantsAWS";
import Lottie from "react-lottie";
import LoadingData from "/src/assets/Loading.json";
import chat from "/src/assets/chat.png";
// import Feedback from "./Feedback";
import { setImageData, updateFormData } from "../../redux/formSlice";
import { useNavigate } from "react-router-dom";
import Meaning from "./Meaning";

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
      console.log(cleanedOptions);
      return cleanedOptions;
    } catch (error) {
      console.error("Error cleaning up choices:", error);
      return [];
    }
  };

  const fetchInitialQuestion = async (updatedFormData: FormData) => {
    setIsLoading(true);
    const userPrompt = `I want a ${updatedFormData.jewelryType} for ${updatedFormData.occasion} for a ${updatedFormData.gender} aged ${updatedFormData.ageGroup}`;
    try {
      const payload = {
        body: JSON.stringify({
            user_prompt: userPrompt,
            donotask: donotask.join(","),
        })
      };
      console.log(payload)
      const response = await axios.post(LIGHTENING_MODE, payload);
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
      .join("\n")}${
      selectedOption ? `\nbot: ${currentQuestion}\nuser: ${selectedOption}` : ""
    }`;
    console.log(userPrompt);
    try {
      const payload = {
        body: JSON.stringify({
            user_prompt: userPrompt,
            donotask: donotask.join(","),
        })
      };
      console.log(payload)

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
      .join("\n")}${
      selectedChoice ? `\nbot: ${currentQuestion}\nuser: ${selectedChoice}` : ""
    }`;
    console.log(userPrompt);
    try {
      const payload = {
        body: JSON.stringify({
            user_prompt: userPrompt,
            donotask: updatedDonotask.join(","),
        })
      };
      console.log(payload)

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
      const response = await axios.post(SUMMARIZER, {
        user_prompt: finalPrompt,
      });
      const data = JSON.parse(response.data.body);
      return data;
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
        console.log(t2i_prompt.t2i_prompt);
        await generateImages(t2i_prompt.t2i_prompt);
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
          numImages: 3, 
        }),
      };
  
      const response = await axios.post(IMAGE_GENERATOR, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const parsedBody = JSON.parse(response.data.body);
      console.log("Parsed Body:", parsedBody);
 
      const imageData = parsedBody.uploaded_image_urls;
      console.log("Extracted Image Data:", imageData);
  
      if (Array.isArray(imageData)) {
        dispatch(setImageData(imageData));
        Navigate('/aiimages');
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

  return (
    <>
      <div className="bg-[#FFF9F5] w-full min-h-screen flex flex-col  items-center justify-center">
        {isLoading ? (
          questionsAnswered + 1 === maxQuestions ? (
            <>
              {/* <Feedback /> */}
              <div className="text-xl min-h-screen flex flex-col justify-center items-center text-customGreen text-[3vw] xl:text-[1vw] text-center">
                <p>
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
              <div className="flex flex-col gap-[1vh] items-center pt-[1vh] ">
                <img
                  src={logo}
                  alt=""
                  className="xs:w-[10rem] md:w-[12rem] xl:w-[14rem]"
                />

                <h2 className="xs:text-[1.2rem] md:text-[1.4rem] font-secondary text-customBlack flex justify-center">
                  Let&#39;s design your perfect piece
                </h2>
              </div>

              <div className="flex-1 xs:w-[90vw] md:w-[90vw] xl:w-[70vw] flex-col justify-center items-center no-scrollbar">
                <div className="xs:py-[1rem] md:py-0 flex xs:gap-[2rem] xl:gap-[1rem] flex-col items-center ">
                  <div className="w-[98%] flex flex-col gap-[0.3rem] text-customBlack xs:text-[0.6rem] md:text-[1rem]">
                    <p>
                      {questionsAnswered + 1} out of {maxQuestions} Questions
                    </p>
                    <div className="w-full h-[1vh] bg-customBeige rounded-2xl overflow-hidden no-scrollbar">
                      <div
                        className="h-full bg-customGreen"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-customBeige xs:min-h-[15vh] xl:min-h-[15vh] p-[2rem] text-customGreen font-bold leading-loose rounded-3xl w-full flex justify-center items-center gap-[1rem]">
                    <img
                      src={chat}
                      alt=""
                      className="xs:w-[3rem] md:w-[4rem] xl:w-[4.3rem]"
                    />
                    <div className="xs:text-[1rem] md:text-[1.7rem] xl:text-[1.3rem] font-serif font-bold text-center">
                      {currentQuestion}
                    </div>
                  </div>
                  <div className="flex flex-wrap w-full justify-around font-serif font-semibold border border-[#F5E8D7] xs:py-[2rem] md:py-[3.5vw] xl:py-[2vw] xs:rounded-lg md:rounded-3xl">
                    {options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleChoiceChange(option)}
                        className={`flex justify-center gap-[2vw] items-center xs:text-[0.8rem] md:text-[1.4rem] xl:text-[1rem] xs:px-[1.7vw] xs:py-[1.2vw] md:px-[1.8vw] md:py-[1vw] xl:px-[1.2vw] xl:py-[0.8vw] mx-[0.5vw] xs:mt-[3vw] md:mt-[1vw] rounded-xl cursor-pointer shadow-md shadow-[#F5E8D7] transition-all ${
                          selectedChoice === option
                            ? "bg-[#F5E8D7] text-customBlack"
                            : "text-customGreen border border-[#F5E8D7]"
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
                              className="xs:w-[1rem] md:w-[1.4rem] xl:w-[1.1rem]"
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

              <div className="flex justify-between xs:w-[90vw] md:w-[90vw] xl:w-[70vw] xs:text-[0.8rem] md:text-[1.4rem] xl:text-[1rem] text-customBlack p-5">
                <button type="button" onClick={handleBack} className="flex flex-col items-center">
                  <img
                    src={back}
                    alt=""
                    className="xs:w-[2.7rem] md:w-[4.5rem] xl:w-[4.4rem] mb-[0.3vw] "
                  />
                  <p>Back</p>
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
                      className="xs:w-[2.7rem] md:w-[4.5rem] xl:w-[4.4rem] mb-[0.3vw] "
                    />
                    <p>Regenerate <br />Question</p>
                  </button>
                  <button
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
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AIGenerated;
