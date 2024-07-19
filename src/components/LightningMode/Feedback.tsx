import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import stars from "/src/assets/rating-stars.png";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconFilled": {
    color: "#b9944c",
    fontSize: "3rem", // Increased font size
  },
  "& .MuiRating-iconHover": {
    color: "#b9944c",
    fontSize: "3rem", // Increased font size
  },
  "& .MuiRating-iconEmpty": {
    color: theme.palette.action.disabled,
    fontSize: "3rem", // Increased font size
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon fontSize="inherit" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon fontSize="inherit" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon fontSize="inherit" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon fontSize="inherit" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon fontSize="inherit" />,
    label: "Very Satisfied",
  },
};

const Feedback: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setRating(newValue);
    console.log(event);
  };

  const submitRating = () => {
    if (rating !== null) {
      console.log(`Rating submitted: ${rating}`);
      setSubmitted(true);
      console.log(submitted);
      setVisible(false);
    }
  };

  const cancelFeedback = () => {
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`absolute z-10 transform  bg-customBeige xs:w-[20rem] md:w-[35rem] xl:w-[30rem] xs:h-[70vh] md:h-[60vh] xl:h-[60vh] rounded-2xl shadow-green`}
    >
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center xs:gap-[4vh] md:gap-[2vh] xl:gap-[4vh] w-[80%] h-[85%] border border-[#b9944c] rounded-xl">
          <img
            src={stars}
            alt=""
            className="xs:w-[9vh] md:w-[10vh] xl:w-[7vh]"
          />
          <h2 className="xs:text-[2vh] md:text-[3.2vh] xl:text-[2.5vh] text-customGreen text-center">
            How did you like our AI-generated questions? <br />
            Please share your feedback.
          </h2>
          <div className="flex justify-center">
            <StyledRating
              name="highlight-selected-only"
              value={rating}
              onChange={handleRatingChange}
              IconContainerComponent={(props) => <IconContainer {...props} />}
              getLabelText={(value: number) => customIcons[value].label}
              precision={1}
              sx={{ justifyContent: "space-between" }}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={submitRating}
              className="xs:text-[2vh] md:text-[3vh] xl:text-[2vh] px-[1.5vh] py-[1vh] rounded-xl cursor-pointer shadow-md shadow-[#F5E8D7] transition-all text-customGreen border border-customGreen"
            >
              Submit
            </button>
            <button
              onClick={cancelFeedback}
              className="xs:text-[2vh] md:text-[3vh] xl:text-[2vh] px-[1.5vh] py-[1vh] rounded-xl cursor-pointer shadow-md shadow-[#F5E8D7] transition-all text-customGreen border border-customGreen"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const IconContainer = (props: any) => {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
};

export default Feedback;
