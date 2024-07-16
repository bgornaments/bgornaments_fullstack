import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import logo from "/src/assets/image.png";
import { useNavigate } from "react-router-dom";
import next from "/src/assets/next.png";
import back from "/src/assets/previous.png";
import {
  LIGHTENING_MODE,
  SUMMARIZER,
  IMAGE_GENERATOR,
} from "../../constantsAWS";
import Lottie from "react-lottie";
import loading from "/src/assets/loading.json";


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
  const navigate = useNavigate();
  const maxQuestions: number = 5;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const generateBasicInfoString = (): string => {
    return `I want a ${formData.jewelryType} for ${formData.occasion} for a ${formData.gender} aged ${formData.ageGroup}`;
  };

  const capitalizeWords = (str: string): string => {
    return str.replace(/\b\w/g, char => char.toUpperCase()); 
  };

  const cleanUpChoicesString = (choicesString: string): string[] => {
    try {
      console.log(choicesString)
      const cleanedString = choicesString.split(/['"],/);
      const cleanedOptions = cleanedString.map(option => 
        capitalizeWords(option.replace(/\[|\]|"|'/g, '').trim()));
      cleanedOptions.push('None');
      return cleanedOptions;        
    } catch (error) {
      console.error('Error cleaning up choices:', error);
      return [];
    }
  };

  const fetchInitialQuestion = async () => {
    setIsLoading(true);
    console.log(generateBasicInfoString());
    const userPrompt = generateBasicInfoString();
    try {
      const response = await axios.post(LIGHTENING_MODE, {
        user_prompt: userPrompt,
      });
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
      const response = await axios.post(LIGHTENING_MODE, {
        user_prompt: userPrompt,
      });
      const data = JSON.parse(response.data.body);

      setQuestions([...updatedQuestions, currentQuestion]);
      setAnswers(updatedAnswers);
      setQuestionsHistory([...questionsHistory, currentQuestion]);
      setOptionsHistory([...optionsHistory, options]);
      setCurrentQuestion(data.question);
      console.log(data.choices);
      setOptions(cleanUpChoicesString(data.choices));
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedChoice("");
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching next question:", error);
      setIsLoading(false);
    }
  };

  const generateText2ImagePrompt = async () => {
    const finalPrompt =
      `user: ${generateBasicInfoString()}\n${questions
        .map((q, index) => `bot: ${q}\nuser: ${answers[index]}`)
        .join("\n")}` + `\nbot: ${currentQuestion}\nuser: ${selectedChoice}`;

    console.log("Final Prompt:", finalPrompt);
    try {
      const response = await axios.post(SUMMARIZER, {
        user_prompt: finalPrompt,
      });
      const data = JSON.parse(response.data.body);
      console.log("Final Prompt:", data);
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
        await generateImages(t2i_prompt);
      }
    }
  };

  const generateImages = async (t2i_prompt: string) => {
    setIsLoading(true);
    console.log("Inside Generate Images", t2i_prompt);
    try {
      console.log(t2i_prompt);
      const response = await axios.post(IMAGE_GENERATOR, {
        prompt: t2i_prompt,
      });
      const imageResponse = response.data.body;
      console.log(imageResponse);
      navigate("/aiimages", { state: { images: imageResponse } });
    } catch (error) {
      console.error("Error generating images:", error);
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

  // const handleSkip = async () => {
  //   await fetchNextQuestion(null);
  // };

  const progressPercentage = Math.min(
    (questionsAnswered / maxQuestions) * 100,
    100
  );

  useEffect(() => {
    fetchInitialQuestion();
  }, []);

  return (
    <div className="bg-[#FFF9F5] w-full min-h-screen flex flex-col  items-center">
      {isLoading ? (
        <div className="text-xl min-h-screen flex justify-center items-center">
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>
      ) : (
        <>
          <div className="mt-[2vw]">
            <img src={logo} alt="" className="w-[12vw]" />
          </div>
          <h2 className="text-[1.5vw] font-secondary text-customBlack">
            Let&#39;s design your perfect piece
          </h2>
          <div className="w-[70vw] justify-center flex flex-col items-center gap-[1vw] mt-[2.3vw]">
            <div className="w-[98%] h-[1vh] bg-customBeige rounded-2xl overflow-hidden">
              <div
                className="h-full bg-customGreen"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="bg-customBeige min-h-[6vh] p-[2.5vw] text-customGreen font-bold leading-loose rounded-3xl w-full">
              <div className="text-[1.5vw] font-serif font-bold w-full flex justify-center">
                {currentQuestion}
              </div>
            </div>
            <div className="flex flex-wrap w-full justify-around font-serif font-semibold border border-[#F5E8D7] py-[2vw] rounded-3xl">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedChoice(option);
                    setSelectedChoiceFlag(true);
                  }}
                  className={`text-[1.3vw] px-[1.2vw] py-[0.8vw] mx-[0.5vw] mt-[0.5vw] rounded-xl cursor-pointer shadow-md shadow-[#F5E8D7] transition-all ${
                    selectedChoice === option
                      ? "bg-[#F5E8D7] text-customBlack"
                      : "text-customGreen border border-[#F5E8D7]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="absolute bottom-[5vw] mt-[5vw] flex justify-between w-[70vw] text-[1.3vw] text-customBlack">
              <div>
                <button type="button" onClick={handleBack}>
                  <img src={back} alt="" className="w-[4.5vw] mb-[0.3vw]" />
                  Back
                </button>
              </div>
              <div className="flex gap-[2.5vw]  items-center justify-normal">
                <button
                  type="button"
                  onClick={handleChoiceSubmit}
                  disabled={!selectedChoiceFlag}
                >
                  <img src={next} alt="" className="w-[4.5vw] mb-[0.3vw]" />
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIGenerated;
