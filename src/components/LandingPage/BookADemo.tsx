import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

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

    const form = useRef<HTMLFormElement>(null);

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

        if (form.current) {
            emailjs
                .sendForm('service_qjgx74e', 'template_eihpgee', form.current, {
                    publicKey: '7mAHKpMscZZpj_-lt',
                })
                .then(
                    () => {
                        console.log('SUCCESS!');
                        // Reset form data after successful submission
                        setFormData({
                            name: "",
                            email: "",
                            mobile: "",
                            companyName: "",
                            designation: "",
                            message: "",
                        });
                        alert('Your demo request has been sent successfully!');
                    },
                    (error) => {
                        console.log('FAILED...', error.text);
                        alert('Failed to send the demo request. Please try again.');
                    },
                );
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left side: Kinmitra logo and heading */}
            <div
                className="w-1/3 bg-cover bg-center flex flex-col items-center justify-center"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Book a Demo</h2>
                <img
                    src="https://www.kinmitra.com/assets/image-BEwmDLXF.png"
                    alt="Kinmitra Logo"
                    className="max-w-[50%] max-h-[33%]"
                />
            </div>

            {/* Right side: Form */}
            <div className="w-2/3 bg-white p-8 flex flex-col justify-center">
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
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

                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
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

                        <div className="flex-1">
                            <label
                                htmlFor="mobile"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
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
                    </div>

                    <div>
                        <label
                            htmlFor="companyName"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
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
                        <label
                            htmlFor="designation"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
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
                        <label
                            htmlFor="message"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
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