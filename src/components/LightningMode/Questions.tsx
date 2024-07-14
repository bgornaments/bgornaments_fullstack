import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "/src/assets/image.png";
import { LIGHTENING_MODE, SUMMARIZER, IMAGE_GENERATOR } from '../../constantsAWS';
import { useNavigate } from "react-router-dom";


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
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedChoice, setSelectedChoice] = useState<string>('');
    const [selectedChoiceFlag, setSelectedChoiceFlag] = useState<boolean>(false);
    const navigate = useNavigate();

    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const maxQuestions: number = 3;
  
    const generateBasicInfoString = (): string => {
    //  return `Occasion: ${formData.occasion}, 
    //    \nGender: ${formData.gender}, 
    //    \nAge Group: ${formData.ageGroup},  
    //    \nType of Jewelry: ${formData.jewelryType}`;
        return `I want a ${formData.jewelryType} for ${formData.occasion} for a ${formData.gender} aged ${formData.ageGroup}`
    };
  
    const cleanUpChoicesString = (choicesString: string): string[] => {
      try {
        const cleanedString = choicesString.split('\',');
        return cleanedString.map(option => option.replace(/\[|\]|"|'/g, '').trim());
      } catch (error) {
        console.error('Error cleaning up choices:', error);
        return [];
      }
    };
  
    const fetchInitialQuestion = async () => {
      setIsLoading(true);
      //console.log(generateBasicInfoString())
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
        console.error('Error fetching initial question:', error);
        setIsLoading(false);
      }
    };
  
    const fetchNextQuestion = async (selectedOption: string) => {
      setIsLoading(true);
      const userPrompt = `user: ${generateBasicInfoString()}\n${questions
            .map(
              (q, index) =>
                `bot: ${q}\nuser: ${answers[index]
                }`
            )
            .join("\n")}` + `\nbot: ${currentQuestionIndex + 1}: ${currentQuestion}\nuser: ${currentQuestionIndex + 1}: ${selectedOption}`;
      //console.log(userPrompt)
      try {
        const response = await axios.post(LIGHTENING_MODE, {
          user_prompt: userPrompt,
        });
        const data = JSON.parse(response.data.body);
        setAnswers((prevAnswers) => [...prevAnswers, selectedOption]);
        setCurrentQuestion(data.question);
        setQuestions((prevQuestions) => [...prevQuestions, data.question]);
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

    const generateText2ImagePrompt = async () => {
      const finalPrompt = `user: ${generateBasicInfoString()}\n${questions
        .map(
          (q, index) =>
            `bot: ${q}\nuser: ${answers[index]
            }`
        )
        .join("\n")}` + `\nbot: ${currentQuestion}\nuser: ${selectedChoice}`;

      //console.log("Final Prompt:", finalPrompt);
      try {
        const response = await axios.post(
           SUMMARIZER,
                 {user_prompt: finalPrompt }
            );
        const data = JSON.parse(response.data.body);
        //console.log("Final Prompt:", data)
        return data;
      } catch (error) {
        console.error("Error generating text-to-image prompt:", error);
      }

    }

    const handleChoiceSubmit = async () => {
      if (currentQuestionIndex < maxQuestions){
        if (selectedChoice !== "" && selectedChoiceFlag) {
            fetchNextQuestion(selectedChoice);
          }
        setSelectedChoiceFlag(false)
      }
      else{
        setIsLoading(true);
        if (selectedChoice !== "" && selectedChoiceFlag) {
          const t2i_prompt =  await generateText2ImagePrompt();
          await generateImages(t2i_prompt);

        }
      }
    };

   const generateImages = async (t2i_prompt: string) => {
     setIsLoading(true);
     //console.log('Inside Genertate Images', t2i_prompt)
     try {
      console.log(t2i_prompt)
       const response = await axios.post(
        IMAGE_GENERATOR,
         { prompt: t2i_prompt }
       );
       const imageResponse = response.data.body;
       console.log(imageResponse);
       navigate("/aiimages", { state: { images: imageResponse } });
      }catch (error) {
     console.error("Error generating images:", error);
     }
    }
       // const images: HTMLImageElement[] = [];

//       // for (let i = 0; i < numImages; i++) {
//       //   const image = new Image();
//       //   image.src = `data:image/png;base64,${imageResponse}`;
//       //   images.push(image);
//       // }

//       // console.log(images); // For debugging purposes
//       // const imageBase64Strings = images.map(img => img.src);
//       // dispatch(setImageData(imageBase64Strings));

//       dispatch(
//         setImageData(
//           Array.isArray(imageResponse) ? imageResponse : [imageResponse]
//         )
//       );
//       navigate("/aiimages");
//     } catch (error) {
//       console.error("Error generating images:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

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
                  <button
                    key={index}
                    onClick={() => {setSelectedChoice(option); setSelectedChoiceFlag(true)}}
                    className={`rounded-full cursor-pointer shadow-md shadow-[#F5E8D7] transition-all px-[3vw] py-[1vw] ${
                      selectedChoice === option
                        ? "bg-[#F5E8D7] text-white"
                        : "text-black border border-[#F5E8D7]"
                    }`}
                  >
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
            
            { <div className="absolute bottom-[5vw] mt-[5vw] flex justify-around w-[80%]">
              <div>
                <button
                  type="submit"
                  className="bg-customGreen text-customBeige px-[2vh] sm:px-[5vw] py-[1vh] rounded-full font-secondary text-[0.7rem] md:text-[1.2rem]"
                >
                  {"<"}- Back
                </button>
              </div>
              {/*<div className="flex gap-[2vw]">
                {currentQuestionIndex < maxQuestions - 1 && (
                  <button
                    type="submit"
                    className="bg-customGreen text-customBeige px-[2vh] sm:px-[5vw] py-[1vh] rounded-full font-secondary text-[0.7rem] md:text-[1.2rem]"
                  >
                    Generate Designs
                  </button>
                )}
              </div>
              */}
              <div>
                <button               
                  type="submit"
                  className="bg-customGreen text-customBeige px-[2vh] sm:px-[5vw] py-[1vh] rounded-full font-secondary text-[0.7rem] md:text-[1.2rem]"
                  onClick={() => handleChoiceSubmit()}
                >
                {currentQuestionIndex >= maxQuestions ? "Generate Designs" : "Next ->"}
                </button>
              </div>
            </div> }


          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default AIGenerated;
