import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, setFormSubmitted } from "../../redux/formSlice";
import { useNavigate } from "react-router-dom";
import icon from "/src/assets/image.png";
import necklaceIcon from "/src/assets/jewelry (1).png";
import pendantIcon from "/src/assets/necklace.png";
import earringIcon from "/src/assets/flower.png";
import bangleIcon from "/src/assets/bangles.png";
import ringIcon from "/src/assets/wedding-ring.png";
import chainIcon from "/src/assets/pendant.png";
import braceletIcon from "/src/assets/bracelet.png";
import femaleIcon from "/src/assets/female-icon.png";
import maleIcon from "/src/assets/male-icon.png";

const JewelryForm: React.FC = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: any) => state.form.formData);
  const isFormSubmitted = useSelector(
    (state: any) => state.form.isFormSubmitted
  );
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/option");
    console.log("Form Data on Submit:", formData);
    dispatch(setFormSubmitted(true));
    console.log(isFormSubmitted);
  };

  const isFormValid = () => {
    const { occasion, gender, ageGroup, jewelryType } = formData;
    return occasion && gender && ageGroup && jewelryType;
  };

  return (
    <>
      <div className="bg-[#FFF9F5] w-full min-h-screen flex justify-center items-center">
        <div className="xs:w-full xl:w-[75vw] flex flex-col justify-center items-center xs:gap-[2.5vh] ">
          <div className="flex flex-col gap-[1vh] items-center pt-[1vh]">
            <img src={icon} alt="" className="xs:w-[24vw] md:w-[19vh] xl:w-[12vw]" />
            <h2 className="xs:text-[4vw] md:text-[3vw]  xl:text-[1.5vw] font-secondary text-customBlack flex justify-center">
              Tell us about the recipient
            </h2>
          </div>
          <div className="w-full justify-center flex flex-col items-center">
            <form
              onSubmit={handleSubmit}
              className="py-[5vw] flex md:gap-[6vh] xl:gap-[5vh]  xs:w-[90vw] md:w-[90vw] xl:w-[70vw] h-full flex-col"
            >
              <div className="flex xs:flex-col md:flex-row justify-center items-center xs:gap-[2vh] md:gap-[0.5vh]">
                <label className="text-customGreen font-secondary font-bold xs:text-[3.2vw] md:text-[2.7vw] xl:text-[1.2vw] xs:w-full md:w-3/12 xs:text-center md:text-start">
                  Type of Jewellery
                </label>
                <div className="flex flex-wrap xs:justify-center md:justify-start xs:gap-[3vw] xl:gap-[1.7vw] xs:w-full md:w-9/12">
                  {[
                    { type: "Necklaces", icon: necklaceIcon },
                    { type: "Pendants", icon: pendantIcon },
                    { type: "Earrings", icon: earringIcon },
                    { type: "Bangles", icon: bangleIcon },
                    { type: "Rings", icon: ringIcon },
                    { type: "Chains", icon: chainIcon },
                    { type: "Bracelets", icon: braceletIcon },
                  ].map((jewelry) => (
                    <button key={jewelry.type} type="button">
                      <div
                        onClick={() =>
                          dispatch(
                            updateFormData({ jewelryType: jewelry.type })
                          )
                        }
                        className={`flex flex-col items-center text-customBlack xs:p-[2vw] xl:p-[1vw] rounded-full cursor-pointer shadow-md shadow-[#F5E8D7] transition-all ${
                          formData.jewelryType === jewelry.type
                            ? "bg-[#F5E8D7] text-white"
                            : "text-black border border-[#F5E8D7]"
                        }`}
                      >
                        <img
                          src={jewelry.icon}
                          alt={jewelry.type}
                          className="xs:w-[5vw] md:w-[5vw] xl:w-[2vw]"
                        />
                      </div>
                      <p className="xs:pt-[1.5vw] xl:pt-[1vw] xs:text-[2.5vw] md:text-[2vw] xl:text-[1vw] text-customBlack">
                        {jewelry.type}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex xs:flex-col md:flex-row items-center justify-center xs:gap-[2vh] md:gap-[0.5vh]">
              <label className="text-customGreen font-secondary font-bold xs:text-[3.2vw] md:text-[2.7vw] xl:text-[1.2vw] xs:w-full md:w-3/12 xs:text-center md:text-start">
                  Occasion
                </label>
                <div className="flex flex-wrap xs:justify-center md:justify-start xs:gap-[3vw] xl:gap-[1.7vw] xs:w-full md:w-9/12">
                  {[
                    "Wedding",
                    "Engagement",
                    "Birthday",
                    "Daily wear",
                    "Anniversary",
                  ].map((occasion) => (
                    <button
                      key={occasion}
                      type="button"
                      className={`xs:text-[2.5vw] md:text-[2.4vw] xl:text-[1vw] px-[1.5vh] py-[1vh] rounded-xl cursor-pointer shadow-md shadow-[#F5E8D7] transition-all ${
                        formData.occasion === occasion
                          ? "bg-[#F5E8D7]"
                          : "bg-transparent text-customBlack border border-[#F5E8D7]"
                      }`}
                      onClick={() => dispatch(updateFormData({ occasion }))}
                    >
                      {occasion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex xs:flex-col md:flex-row items-center justify-center xs:gap-[2vh] md:gap-[0.5vh]">
              <label className="text-customGreen font-secondary font-bold xs:text-[3.2vw] md:text-[2.7vw] xl:text-[1.2vw] xs:w-full md:w-3/12 xs:text-center md:text-start">
                  Gender
                </label>
                <div className="flex flex-wrap xs:justify-center md:justify-start xs:gap-[3vw]  md:gap-[1.7vw] xs:w-full md:w-9/12">
                  {[
                    { gender: "Female", icon: femaleIcon },
                    { gender: "Male", icon: maleIcon },
                  ].map((option) => (
                    <button
                      key={option.gender}
                      type="button"
                      className="flex flex-col items-center"
                    >
                      <div
                        className={`cursor-pointer flex items-center gap-[1vw] shadow-md shadow-[#F5E8D7] transition-all rounded-xl ${
                          formData.gender === option.gender
                            ? "bg-[#F5E8D7] text-white"
                            : "bg-transparent"
                        }`}
                        onClick={() =>
                          dispatch(updateFormData({ gender: option.gender }))
                        }
                      >
                        <img
                          src={option.icon}
                          alt={option.gender}
                          className="xs:w-[11vw] md:w-[10vw] xl:w-[4.5vw]"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex xs:flex-col md:flex-row items-center justify-center xs:gap-[2vh] md:gap-[0.5vh]">
              <label className="text-customGreen font-secondary font-bold xs:text-[3.2vw] md:text-[2.7vw] xl:text-[1.2vw] xs:w-full md:w-3/12 xs:text-center md:text-start">
                  Age group
                </label>
                <div className="flex flex-wrap xs:justify-center md:justify-start xs:gap-[3vw]  md:gap-[1.7vw] xs:w-full md:w-9/12">
                  {["0 - 12", "13 - 19", "20 - 34", "35 - 44", "Above 45"].map(
                    (ageGroup) => (
                      <button
                        key={ageGroup}
                        type="button"
                        className={`xs:text-[2.5vw] md:text-[2.4vw] xl:text-[1vw] px-[1.5vh] py-[1vh] rounded-xl cursor-pointer shadow-md shadow-[#F5E8D7] transition-all ${
                          formData.ageGroup === ageGroup
                            ? "bg-[#F5E8D7] text-black"
                            : "bg-transparent border border-[#F5E8D7] text-customBlack"
                        }`}
                        onClick={() => dispatch(updateFormData({ ageGroup }))}
                      >
                        {ageGroup}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`xs:text-[2.5vw] md:text-[2.4vw] xl:text-[1vw] px-[2.5vh] py-[2vh] rounded-xl cursor-pointer ${
                    isFormValid()
                      ? "bg-customGreen text-white"
                      : "bg-[#F5E8D7] text-customBlack cursor-not-allowed"
                  }`}
                  disabled={!isFormValid()}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JewelryForm;
