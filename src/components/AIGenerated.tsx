import icon from "/src/assets/image.png";
import { useState, useEffect } from "react";
import axios from "axios";

const AIGenerated = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/questions.json")
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleAnswerChange = (event) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: {
        ...answers[currentQuestionIndex],
        text: event.target.value,
      },
    });
  };

  const handleOptionChange = (event) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: {
        ...answers[currentQuestionIndex],
        option: event.target.value,
      },
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("User Answers:", answers);
    }
  };

  const handleFinishQuiz = () => {
    console.log("User Answers:", answers);
    window.location.href = "/aiimages";
  };

  const handleBackQuiz = () => {
    window.location.href = "/form";
  };

  if (loading) return <div>Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div className="flex flex-col items-center bg-[#fff9f6] pt-[2vw] min-h-screen">
        <div>
          <img src={icon} alt="" className="w-[5vh]" />
        </div>
        <div className="w-[80%] sm:w-[60%] mt-[3vw] flex flex-col gap-[1vw]">
          <h2 className="text-[1.2rem] sm:text-[1.5rem] font-secondary text-customBlack ">
            Let&#39;s design your perfect piece
          </h2>
          <div className="bg-customBeige min-h-[6vh] p-[2.5vw] text-customGreen font-bold leading-loose rounded-3xl">
           <div className="text-[1.5vw]  font-serif font-bold">
            {currentQuestion.question}
           </div>
          <div className="flex flex-wrap gap-[1vw] mt-[1.5vw]">
            {currentQuestion.options?.map((option, index) => (
              <label
                key={index}
                className={`cursor-pointer px-[1vw] py-[0.3vw] text-[1vw] rounded-full ${
                  answers[currentQuestionIndex]?.option === option
                    ? "bg-customGreen text-customBeige"
                    : "bg-[#fff9f6] text-customBlack "
                }`}
              >
                <input
                  type="radio"
                  name="option"
                  value={option}
                  onChange={handleOptionChange}
                  className="hidden"
                />
                {option}
              </label>
            ))}
          </div>
          </div>


          <div className="mt-2">
            <input
              type="text"
              value={answers[currentQuestionIndex]?.text || ""}
              onChange={handleAnswerChange}
              className="custom-input w-full p-[1.5vw] text-[1vw] rounded-3xl bg-customBeige border-none placeholder-gray-400 text-customBlack focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Share an input about something you love"
            />
          </div>
        </div>

        <div className="absolute bottom-[5vw] mt-[5vw] flex justify-around w-[80%]">
          <div>
            <button
              onClick={handleBackQuiz}
              type="submit"
              className="bg-customGreen text-customBeige px-[2vh] sm:px-[5vw] py-[1vh] rounded-full font-secondary text-[0.7rem] md:text-[1.2rem]"
            >
              {"<"}- Back
            </button>
          </div>
          <div className="flex gap-[2vw]">
            <button
              onClick={handleFinishQuiz}
              type="submit"
              className="bg-customGreen text-customBeige px-[2vh] sm:px-[5vw] py-[1vh] rounded-full font-secondary text-[0.7rem] md:text-[1.2rem]"
            >
              Generate Designs
            </button>
            <button
              onClick={handleNextQuestion}
              type="submit"
              className="bg-customGreen text-customBeige px-[2vh] sm:px-[5vw] py-[1vh] rounded-full font-secondary text-[0.7rem] md:text-[1.2rem]"
            >
              Next -{">"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIGenerated;
