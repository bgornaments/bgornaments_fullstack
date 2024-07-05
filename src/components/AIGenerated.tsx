import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setImageData } from "../redux/formSlice";
import { RootState } from "../redux/store"
import img from "src/assets/image.png"

const AIGenerated = () => {
  const formData = useSelector((state: RootState) => state.form.formData);
  console.log(formData);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const maxQuestions = 5;

  const temp_sys_prompt_1 = `
    You are a friendly and engaging chatbot for a jewelry company. Based on the information provided below, please ask one follow-up question to the customer to understand their needs better. Follow these guidelines:

    1. Question Specificity: Ask one short, one-liner question containing only one key entity to understand the customer's needs better.
    2. Inclusion of Options: Yes : Frame every question to include options in the framed sentence itself related to the question providing the user a choice.
    4. Entity Specification: Clearly mention the key entity in the question. Do not include entities such as metal or size.
    5. Context Awareness: Do not repeat key entities already covered in the basic information provided below.
    6. Conciseness: Print only the follow-up question and nothing extra, such as explanations or additional comments.
    7. Tone: Use a warm and friendly tone to make the user feel welcomed and valued.
    8. Relevance to Outfit: If outfit description is provided also consider the details of the outfit to ask the follow up question.
  `;

  const generateBasicInfoString = () => {
    return `Occasion: ${formData.occasion}, \nGift or Personal Purchase: ${
      formData.recipient
    }, \nGender: ${formData.gender}, \nAge Group: ${
      formData.ageGroup
    }, \nReligion: ${formData.religion}, \nType of Jewelry: ${
      formData.jewelryType
    }, \nBudget: ${formData.budget}, \nOutfit Image Provided: ${
      formData.photo ? "Yes" : "No"
    }`;
  };

  const fetchInitialQuestion = async () => {
    try {
      const response = await axios.post(
        "https://yh6w674h63.execute-api.us-east-1.amazonaws.com/default/",
        {
          sys_prompt: temp_sys_prompt_1,
          user_prompt: generateBasicInfoString(),
        }
      );
      const firstQuestion = response.data.body;
      setQuestions([firstQuestion]);
    } catch (error) {
      console.error("Error fetching initial question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNextQuestion = async (userAnswer:string) => {
    setIsLoading(true);
    const updatedAnswers = [...answers, userAnswer];
    setAnswers(updatedAnswers);

    const userPrompt = `${generateBasicInfoString()}, \nQuestions and Answers:\n${questions
      .map(
        (q, index) =>
          `Q${index + 1}: ${q}\nA${index + 1}: ${
            updatedAnswers[index] || userAnswer
          }`
      )
      .join("\n")}`;

    console.log("User Prompt:", userPrompt);

    try {
      const response = await axios.post(
        "https://yh6w674h63.execute-api.us-east-1.amazonaws.com/default/",
        {
          sys_prompt: temp_sys_prompt_1,
          user_prompt: userPrompt,
        }
      );
      const followUpQuestion = response.data.body;
      setQuestions([...questions, followUpQuestion]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } catch (error) {
      console.error("Error fetching follow-up question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateImages = async () => {
    setIsLoading(true);
    const finalPrompt = `${generateBasicInfoString()}, \nQuestions and Answers:\n${questions
      .map(
        (q, index) => `Q${index + 1}: ${q}\nA${index + 1}: ${answers[index]}`
      )
      .join("\n")}`;

    console.log("Final Prompt:", finalPrompt);

    try {
      const response = await axios.post(
        "https://pi85ecdrbi.execute-api.us-east-1.amazonaws.com/default/",
        { prompt: finalPrompt }
      );
      const imageResponse = response.data.body;

      console.log(imageResponse);
      dispatch(
        setImageData(
          Array.isArray(imageResponse) ? imageResponse : [imageResponse]
        )
      );
      navigate("/aiimages");
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialQuestion();
  }, []);

  const handleNext = () => {
    //const answer = document.getElementById("user-answer").value;
    const answerElement = document.getElementById("user-answer") as HTMLInputElement;
    const answer = answerElement?.value.trim();
    if (answer) {
      if (currentQuestionIndex < maxQuestions - 1) {
        fetchNextQuestion(answer);
      } else {
        generateImages();
      }
      answerElement.value = "";
    }
  };

  return (
    <div className="p-8 bg-[#fff9f6] min-h-screen flex flex-col items-center justify-center">
      {isLoading ? (
        <p className="text-2xl">Loading...</p>
      ) : (
        <>
          <div className="flex flex-col items-center bg-[#fff9f6] pt-[2vw] min-h-screen">
            <div>
              <img src={img} alt="" className="w-[5vh]" />
            </div>
            <div className="w-[80%] sm:w-[60%] mt-[3vw] flex flex-col gap-[1vw]">
              <h2 className="text-[1.2rem] sm:text-[1.5rem] font-secondary text-customBlack w-full">
                Let&#39;s design your perfect piece
              </h2>
              <div className="bg-customBeige min-h-[6vh] p-[2.5vw] text-customGreen font-bold leading-loose rounded-3xl w-full">
                <div className="text-[1.5vw] font-serif font-bold w-full">
                  {questions[currentQuestionIndex]}
                </div>
              </div>
              <div className="mt-2 w-full">
                <input
                  id="user-answer"
                  type="text"
                  className="custom-input w-full p-[1.5vw] text-[1.2vw] rounded-3xl bg-customBeige border-none placeholder-customBlack text-customGreen focus:outline-none focus:ring-2 focus:ring-customGreen"
                  placeholder="Share an input about something you love"
                />
              </div>{" "}
            </div>{" "}
            <div className="absolute bottom-[5vw] mt-[5vw] flex justify-around w-[80%]">
              <div>
                <button
                  type="submit"
                  className="bg-customGreen text-customBeige px-[2vh] sm:px-[5vw] py-[1vh] rounded-full font-secondary text-[0.7rem] md:text-[1.2rem]"
                >
                  {"<"}- Back
                </button>
              </div>
              <div className="flex gap-[2vw]">
                <button
                  onClick={generateImages}
                  type="submit"
                  className="bg-customGreen text-customBeige px-[2vh] sm:px-[5vw] py-[1vh] rounded-full font-secondary text-[0.7rem] md:text-[1.2rem]"
                >
                  Generate Designs
                </button>
                <button
                  onClick={handleNext}
                  type="submit"
                  className="bg-customGreen text-customBeige px-[2vh] sm:px-[5vw] py-[1vh] rounded-full font-secondary text-[0.7rem] md:text-[1.2rem]"
                  disabled={currentQuestionIndex >= maxQuestions}
                >
                  {currentQuestionIndex < maxQuestions - 1
                    ? "Next ->"
                    : "Generate Designs"}
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
