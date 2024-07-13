import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, setFormSubmitted } from "../../redux/formSlice";
import { useNavigate } from "react-router-dom";
import icon from "/src/assets/image.png";

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
    <div className="bg-[#FFF9F5] rounded-[3vw] w-full min-h-screen flex flex-col items-center ">
      <div className="mt-[2vw]">
        <img src={icon} alt="" className="w-[3vw]" />
      </div>
      <div className="  w-full  justify-center flex flex-col items-center">
        <h2 className="text-[1.5vw] font-secondary text-customBlack  ">
          Tell us about the recipient
        </h2>
        <form
          onSubmit={handleSubmit}
          className="py-[5vw] flex gap-[3vw] w-[70vw] flex-col "
        >
          <div className="flex items-center gap-[0.5vw]">
            <label className="text-customGreen  font-secondary font-bold text-[1.2vw] w-3/12 ">
              Type of Jewellery
            </label>
            <div className="flex flex-wrap  gap-4 w-9/12">
              {[
                { type: "Necklaces", icon: "/src/assets/jewelry (1).png" },
                { type: "Pendants", icon: "/src/assets/necklace.png" },
                { type: "Earrings", icon: "/src/assets/flower.png" },
                { type: "Bangles", icon: "/src/assets/bangles.png" },
                { type: "Rings", icon: "/src/assets/wedding-ring.png" },
                { type: "Chains", icon: "/src/assets/pendant.png" },
                { type: "Bracelets", icon: "/src/assets/bracelet.png" },
              ].map((jewelry) => (
                <button key={jewelry.type} type="button">
                  <div
                    onClick={() =>
                      dispatch(updateFormData({ jewelryType: jewelry.type }))
                    }
                    className={`flex flex-col items-center text-customBlack p-[1vw]   rounded-full cursor-pointer shadow-md shadow-[#F5E8D7] transition-all ${
                      formData.jewelryType === jewelry.type
                        ? "bg-[#F5E8D7] text-white"
                        : " text-black border border-[#F5E8D7]"
                    }`}
                  >
                    <img
                      src={jewelry.icon}
                      alt={jewelry.type}
                      className="w-[2vw] "
                    />
                  </div>
                  <p className="pt-[1vw] text-[1vw] text-customBlack">
                    {jewelry.type}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-[0.5vw]">
            <label className="text-customGreen font-secondary font-bold text-[1.2vw] w-3/12 ">
              Occasion
            </label>
            <div className="flex flex-row flex-wrap gap-[1vw] font-serif w-9/12">
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
                  className={` text-[1.2vw] px-[1.5vh] py-[1vh] rounded-xl cursor-pointer shadow-md shadow-[#F5E8D7] transition-all  ${
                    formData.occasion === occasion
                      ? "bg-[#F5E8D7] "
                      : "bg-transparent text-customBlack border border-[#F5E8D7]"
                  }`}
                  onClick={() => dispatch(updateFormData({ occasion }))}
                >
                  {occasion}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-[0.5vw]">
            <label className="text-customGreen font-secondary font-bold text-[1.2vw] w-3/12 ">
              Gender
            </label>
            <div className="flex flex-row flex-wrap gap-[2vw] font-serif  w-9/12">
              {[
                { gender: "Female", icon: "/src/assets/female-icon.png" },
                { gender: "Male", icon: "/src/assets/male-icon.png" },
              ].map((option) => (
                <button
                  key={option.gender}
                  type="button"
                  className="flex flex-col items-center"
                >
                  <div
                    key={option.gender}
                    className={`cursor-pointer flex items-center gap-2 shadow-md shadow-[#F5E8D7] transition-all rounded-xl ${
                      formData.gender === option.gender
                        ? "bg-[#F5E8D7]  text-white"
                        : "bg-transparent "
                    }`}
                    onClick={() =>
                      dispatch(updateFormData({ gender: option.gender }))
                    }
                  >
                    <img
                      src={option.icon}
                      alt={option.gender}
                      className="w-[4.5vw]"
                    />
                  </div>
                  {/* <p className="text-customBlack">{option.gender}</p> */}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-[0.5vw]">
            <label className="text-customGreen font-secondary font-bold text-[1.2vw] w-3/12 ">
              Age group
            </label>
            <div className="flex flex-row flex-wrap gap-[1vw] font-serif  w-9/12">
              {["0 - 12", "13 - 19", "20 - 34", "35 - 44", "Above 45"].map(
                (ageGroup) => (
                  <button
                    key={ageGroup}
                    type="button"
                    className={`text-[1.2vw] px-[1.5vh] py-[1vh] rounded-xl cursor-pointer shadow-md shadow-[#F5E8D7] transition-all  ${
                      formData.ageGroup === ageGroup
                        ? "bg-[#F5E8D7] text-black"
                        : "bg-transparent  border border-[#F5E8D7] text-customBlack"
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
              className={`px-[3vh] py-[1.5vh] text-[0.8rem] sm:text-[1.2rem] rounded-xl cursor-pointer ${
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
  );
};

export default JewelryForm;
