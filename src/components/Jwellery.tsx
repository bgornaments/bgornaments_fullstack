import icon from "/src/assets/image.png";
import { useState } from "react";


const JewelryForm = () => {

  const [formData, setFormData] = useState({
    occasion: "",
    recipient: "",
    gender: "",
    ageGroup: "",
    religion: "",
    jewelryType: "",
    budget: "", 
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleBudgetChange = (budgetOption) => {
    const newBudgetValue = budgetOption === "Custom Budget" ? "" : budgetOption; 
    setFormData({
      ...formData,
      budget: newBudgetValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    window.location.href = "/aiquestions";
  };

  return (
    <div className="bg-[#fff9f6] h-full flex flex-col items-center pt-[2vw]">
      <div className=" ">
        <img src={icon} alt="" className="w-[5vh]" />
      </div>
      <div className="w-[80%] sm:w-[60%] mt-[3vw]">
        <h2 className="text-[1.2rem] sm:text-[1.5rem] font-secondary text-customBlack ">
          Tell us about the recipient
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 py-[3vh]">
          <div>
            <label className="text-customGreen font-secondary font-bold text-[1rem] sm:text-[1.2rem] py-[1.5vw]">
              Occasion
            </label>
            <div className="flex flex-row flex-wrap gap-[1vw] mt-[1.5vw] font-serif">
              {[
                "Wedding",
                "Engagement",
                "Festival",
                "Religious Ceremonies",
                "Birthday",
                "Daily wear",
                "Anniversary",
                "Corporate Event",
                "Social Gatherings",
                "Other",
              ].map((occasion) => (
                <button
                  key={occasion}
                  type="button"
                  className={` text-[0.6rem] sm:text-[1rem] px-[1.5vh] py-[1vh] rounded-xl cursor-pointer ${
                    formData.occasion === occasion
                      ? "bg-customGreen text-white"
                      : "bg-transparent text-[#656462] border border-[#e5e0dc]"
                  }`}
                  onClick={() => setFormData({ ...formData, occasion })}
                >
                  {occasion}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-customGreen font-secondary font-bold text-[1rem] sm:text-[1.2rem] py-[1.5vw]">
              Who is this for?
            </label>
            <div className="flex flex-row flex-wrap gap-[1vw] mt-[1.5vw] font-serif">
              {["Myself", "Gift"].map((recipient) => (
                <button
                  key={recipient}
                  type="button"
                  className={`text-[0.6rem] sm:text-[1rem] px-[1.5vh] py-[1vh] rounded-xl cursor-pointer ${
                    formData.recipient === recipient
                      ? "bg-customGreen text-white"
                      : "bg-transparent text-[#656462] border border-[#e5e0dc]"
                  }`}
                  onClick={() => setFormData({ ...formData, recipient })}
                >
                  {recipient}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-customGreen font-secondary font-bold text-[1rem] sm:text-[1.2rem] py-[1.5vw]">
              Recipient's gender
            </label>
            <div className="flex flex-row flex-wrap gap-[1vw] mt-[1.5vw] font-serif">
              {["Female", "Male", "Prefer not to say"].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  className={`text-[0.6rem] sm:text-[1rem] px-[1.5vh] py-[1vh] rounded-xl cursor-pointer ${
                    formData.gender === gender
                      ? "bg-customGreen text-white"
                      : "bg-transparent text-[#656462] border border-[#e5e0dc]"
                  }`}
                  onClick={() => setFormData({ ...formData, gender })}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-customGreen font-secondary font-bold text-[1rem] sm:text-[1.2rem] py-[1.5vw]">
              Recipient's age group
            </label>
            <div className="flex flex-row flex-wrap gap-[1vw] mt-[1.5vw] font-serif">
              {[
                "Below 15",
                "15-20",
                "20-29",
                "30-40",
                "41-54",
                "55-64",
                "65 or above",
              ].map((ageGroup) => (
                <button
                  key={ageGroup}
                  type="button"
                  className={`text-[0.6rem] sm:text-[1rem] px-[1.5vh] py-[1vh] rounded-xl cursor-pointer ${
                    formData.ageGroup === ageGroup
                      ? "bg-customGreen text-white"
                      : "bg-transparent text-[#656462] border border-[#e5e0dc]"
                  }`}
                  onClick={() => setFormData({ ...formData, ageGroup })}
                >
                  {ageGroup}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-customGreen font-secondary font-bold text-[1rem] sm:text-[1.2rem] py-[1.5vw]">
              Recipient's religion (optional)
            </label>
            <input
              type="text"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              placeholder="Religion"
              className="font-serif text-[0.6rem] sm:text-[1rem] text-[#877563] placeholder-[0.6rem] sm:placeholder-[1rem] rounded-xl bg-[#f6f2f0] placeholder-[#877563] py-[1vw] px-[1.5vw] w-[60%] "
            />
          </div>

          <div>
            <label className="text-customGreen font-secondary font-bold text-[1rem] sm:text-[1.2rem] py-[1.5vw]">
              Type of jewellery
            </label>
            <div className="flex flex-row flex-wrap gap-[1vw] mt-[1.5vw] font-serif">
              {[
                "Necklaces",
                "Earrings",
                "Bangles",
                "Rings",
                "Maang Tikka",
                "Nose Rings",
                "Jhumkas",
                "Kadas",
                "Chains",
                "Anklets",
                "Other"
              ].map((jewelryType) => (
                <button
                  key={jewelryType}
                  type="button"
                  className={`text-[0.6rem] sm:text-[1rem] px-[1.5vh] py-[1vh] rounded-xl cursor-pointer ${
                    formData.jewelryType === jewelryType
                      ? "bg-customGreen text-white"
                      : "bg-transparent text-[#656462] border border-[#e5e0dc] "
                  }`}
                  onClick={() => setFormData({ ...formData, jewelryType })}
                >
                  {jewelryType}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-customGreen font-secondary font-bold text-[1rem] sm:text-[1.2rem] py-[1.5vw]">
              Budget
            </label>
            <div className="flex flex-row flex-wrap gap-[1vw] mt-[1.5vw] font-serif">
              {[
                "Below ₹10,000",
                "₹10,000 - ₹20,000",
                "₹20,000 - ₹30,000",
                "₹30,000 - ₹50,000",
                "₹50,000 - ₹1,00,000",
                "₹1,00,000 - ₹2,00,000",
                "₹2,00,000 - ₹5,00,000",
                "Above ₹5,00,000",
                "Custom Budget",
                "No Budget Limit"
              ].map((budgetOption) => (
                <button
                  key={budgetOption}
                  type="button"
                  className={`text-[0.6rem] sm:text-[1rem] px-[1.5vh] py-[1vh] rounded-xl cursor-pointer ${
                    formData.budget === budgetOption
                      ? "bg-customGreen text-white"
                      : "bg-transparent text-[#656462] border border-[#e5e0dc]"
                  }`}
                  onClick={() => handleBudgetChange(budgetOption)}
                >
                  {budgetOption}
                </button>
              ))}
            </div>
            {formData.budget === "Custom Budget" && (
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Enter custom budget"
                className="font-serif text-[0.6rem] sm:text-[1rem] text-[#877563] placeholder-[0.6rem] sm:placeholder-[1rem] rounded-xl bg-[#f6f2f0] placeholder-[#877563] py-[1vw] px-[1.5vw] w-[60%]"
              />
            )}
          </div>
          
          

          <div>
            <label className="text-customGreen font-secondary font-bold text-[1rem] xs:text-[1.2rem] py-[1.5vw]">
              Outfit photo (optional)
            </label>
            <div className=" text-justify xs:text-[0.6rem] lg:text-[1rem]  flex flex-row flex-wrap gap-[1vw] text-[#656462] pt-[1.5vw] font-serif">
              Upload a photo of the recipient's outfit for personalized
              recommendations. We'll only use this photo to provide you with
              better suggestions. It won't be shared or stored.
            </div>
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              className=" w-full border rounded mt-[1.5vw] border-none file:border-2 file:border-customGreen file:text-[#656462] file:px-[1vw] file:py-[0.5vw] file:rounded-3xl text-[#656462] file:mr-[1.5vw]"
            />
          </div>

          <div className="flex justify-end py-[2vw]">
            <button
              type="submit"
              className= " bg-customGreen text-customBeige px-[2vh] sm:px-[7vw] py-[1vh] rounded-3xl font-secondary text-[1rem] md:text-[1.2rem]"
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
