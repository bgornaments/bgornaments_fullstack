import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  companyName: string;
  designation: string;
  message: string;
}

const DemoForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    companyName: "",
    designation: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form submitted successfully!");
    setFormData({
      name: "",
      email: "",
      mobile: "",
      companyName: "",
      designation: "",
      message: "",
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side: Kinmitra logo and heading */}
      <div
        className="w-1/3 bg-cover bg-center flex flex-col items-center justify-center"
      // style={{
      //   backgroundImage:
      //     "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')",
      // }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Book a Demo</h2>
        <img
          src="https://www.kinmitra.com/assets/image-BEwmDLXF.png"
          alt="Kinmitra Logo"
          className="max-w-[50%] max-h-[33%]" // Reduced overall image size
        />
      </div>


      {/* Right side: Form */}
      <div className="w-2/3 bg-white p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Book a Demo </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-2">
              Mobile:
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2">
              Company Name:
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="designation" className="block text-sm font-semibold text-gray-700 mb-2">
              Designation:
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Message/Requests:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-transform transform hover:scale-105 active:scale-95"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DemoForm;
