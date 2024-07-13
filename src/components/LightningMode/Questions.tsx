import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "/src/assets/image.png";


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
    const [currentQuestion, setCurrentQuestion] = useState<string>('');
    const [options, setOptions] = useState<string[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const maxQuestions: number = 5;
  
    const generateBasicInfoString = (): string => {
      return `Occasion: ${formData.occasion}, 
        \nGender: ${formData.gender}, 
        \nAge Group: ${formData.ageGroup},  
        \nType of Jewelry: ${formData.jewelryType}`;
    };
  
    const cleanUpChoicesString = (choicesString: string): string[] => {
      try {
        const cleanedString = choicesString.replace(/\[|\]|"/g, '').split(',');
        return cleanedString.map(option => option.trim());
      } catch (error) {
        console.error('Error cleaning up choices:', error);
        return [];
      }
    };
  
    const fetchInitialQuestion = async () => {
      setIsLoading(true);
      console.log(generateBasicInfoString())
      const userPrompt = generateBasicInfoString();
      try {
        const response = await axios.post('https://je8ad5wqs5.execute-api.us-east-1.amazonaws.com/default/LighteningMode', {
          user_prompt: userPrompt,
        });
        const data = JSON.parse(response.data.body);
        setCurrentQuestion(data.question);
        setOptions(cleanUpChoicesString(data.choices));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching initial question:', error);
        setIsLoading(false);
      }
    };
  
    const fetchNextQuestion = async (selectedOption: string) => {
      setIsLoading(true);
      const userPrompt = generateBasicInfoString() + `\nQ${currentQuestionIndex + 1}: ${currentQuestion}\nA${currentQuestionIndex + 1}: ${selectedOption}`;
    //  console.log(userPrompt)
      try {
        const response = await axios.post('https://je8ad5wqs5.execute-api.us-east-1.amazonaws.com/default/LighteningMode', {
          user_prompt: userPrompt,
        });
        const data = JSON.parse(response.data.body);
        setQuestions((prevQuestions) => [...prevQuestions, currentQuestion]);
        setAnswers((prevAnswers) => [...prevAnswers, selectedOption]);
        setCurrentQuestion(data.question);
        setOptions(cleanUpChoicesString(data.choices));
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching next question:', error);
        setIsLoading(false);
      }
    };
  
    const handleOptionSelect = (selectedOption: string) => {
      if (currentQuestionIndex < maxQuestions - 1) {
        fetchNextQuestion(selectedOption);
      } else {
        console.log('All questions answered:');
        questions.forEach((question, index) => {
          console.log(`Q${index + 1}: ${question}`);
          console.log(`A${index + 1}: ${answers[index]}`);
        });
        console.log(`Q${currentQuestionIndex + 1}: ${currentQuestion}`);
        console.log(`A${currentQuestionIndex + 1}: ${selectedOption}`);
  
      }
    };
  
    useEffect(() => {
      fetchInitialQuestion();
    }, []);

  return (
    <div className="bg-[#FFF9F5] w-full min-h-screen flex justify-center items-center">
      <div className="bg-[#FFF9F5] rounded-[3vw] w-[90vw] h-[94vh] flex flex-col  items-center">
      {isLoading ? (
        <div className="text-2xl flex justify-center items-center h-full">
            <p>Loading...</p>
        </div>
      ) : (
        <>
       
            <div>
              <img src={logo} alt="" className="w-[5vh] py-[1vw]" />
            </div>
            <div className="w-[70vw] justify-center flex flex-col items-center gap-[2vw]">
              <h2 className="text-[1.5vw] font-secondary text-customBlack">
                Let&#39;s design your perfect piece
              </h2>
              <div className="bg-customBeige min-h-[6vh] p-[2.5vw] text-customGreen font-bold leading-loose rounded-3xl w-full">
                <div className="text-[1.5vw] font-serif font-bold w-full">
                {currentQuestion}
                </div>
              </div>
              <div className="options-container flex gap-10 ">
            {options.map((option, index) => (
              <button key={index} onClick={() => handleOptionSelect(option)} className=' rounded-full cursor-pointer shadow-md shadow-[#F5E8D7] transition-all text-black border border-[#F5E8D7] px-[3vw] py-[1vw]'>
                {option}
              </button>
            ))}
          </div>
              
              {/* <div className="mt-2 w-full">
                <input
                  id="user-answer"
                  type="text"
                  className="custom-input w-full p-[1.5vw] text-[1.2vw] rounded-3xl bg-customBeige border-none placeholder-customBlack text-customGreen focus:outline-none focus:ring-2 focus:ring-customGreen"
                  placeholder="Share an input about something you love"
                />
              </div>{" "} */}
      
            {/* <div className="absolute bottom-[5vw] mt-[5vw] flex justify-around w-[80%]">
              <div>
                <button
                  type="submit"
                  className="bg-customGreen text-customBeige px-[2vh] sm:px-[5vw] py-[1vh] rounded-full font-secondary text-[0.7rem] md:text-[1.2rem]"
                >
                  {"<"}- Back
                </button>
              </div>
              <div className="flex gap-[2vw]">
                {currentQuestionIndex < maxQuestions - 1 && (
                  <button
                    onClick={() =>
                      generatePrompt(
                        (
                          document.getElementById(
                            "user-answer"
                          ) as HTMLInputElement
                        ).value
                      )
                    }
                    type="submit"
                    className="bg-customGreen text-customBeige px-[2vh] sm:px-[5vw] py-[1vh] rounded-full font-secondary text-[0.7rem] md:text-[1.2rem]"
                  >
                    Generate Designs
                  </button>
                )}
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
            </div> */}
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default AIGenerated;
