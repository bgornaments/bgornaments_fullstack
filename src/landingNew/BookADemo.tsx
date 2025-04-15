import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

interface FormData {
    name: string;
    email: string;
    mobile: string;
    companyName: string;
    designation: string; // Added designation field
    message: string;
}

const BookDemoSection: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        mobile: "",
        companyName: "",
        designation: "", // Added designation field
        message: "",
    });

    const [isSent, setIsSent] = useState(false);
    const [isclicked, setIsClicked] = useState(false);

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
        setIsClicked(true);
        if (form.current) {
            emailjs
                .sendForm('service_qjgx74e', 'template_eihpgee', form.current, {
                    publicKey: '7mAHKpMscZZpj_-lt',
                })
                .then(
                    () => {
                        console.log('SUCCESS!');
                        setFormData({
                            name: "",
                            email: "",
                            mobile: "",
                            companyName: "",
                            designation: "", // Reset designation field
                            message: "",
                        });
                        setIsClicked(false);
                        setIsSent(true); // show sent state
                        setTimeout(() => setIsSent(false), 5000); // revert after 5 sec
                    },
                    (error) => {
                        console.log('FAILED...', error.text);
                        alert('Failed to send the demo request. Please try again.');
                    }
                );
        }
    };


    return (
        <section className="py-16 px-8">
            <div className="max-w-6xl mx-auto border border-#F8F8F8-500 rounded-lg p-1">
                <div className="flex flex-col md:flex-row overflow-hidden">
                    {/* Left Panel */}
                    <div className="md:w-1/2 bg-[#F8F8F8] p-6 space-y-4">
                        <h3 className="font-custom text-5xl text-[#e0ae2a] mb-4">Book a Demo</h3>
                        <p className="text-lg text-gray-700 mb-4">Book a free demo to explore features tailored to you. Get expert guidance.</p>
                        <div>
                            <p className='text-lg mt-4 mb-4'>📞 +91 (931) 008-5981</p>
                            <p className='text-lg mt-4 mb-4'>✉️ ceo@kinmitra.com</p>
                            <div className="flex space-x-4 mt-4 text-xl mt-4">
                                <a className="text-gray-600 hover:text-gray-800" href="https://www.facebook.com/profile.php?id=61574416178019" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                                <a className="text-gray-600 hover:text-gray-800" href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                                <a className="text-gray-600 hover:text-gray-800" href="https://instagram.com/kinmitra_com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                                <a className="text-gray-600 hover:text-gray-800" href="https://linkedin.com/company/bgornaments" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                                <a className="text-gray-600 hover:text-gray-800" href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                            </div>
                        </div>
                    </div>

                    {/* Right Form Panel */}
                    <div className="md:w-1/2 p-6 bg-white space-y-4">
                        <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                    className="w-full border px-3 py-2 text-sm rounded"
                                />
                            </div>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                required
                                className="w-full border px-3 py-2 text-sm rounded"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                                className="w-full border px-3 py-2 text-sm rounded"
                            />
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="Company Name"
                                    className="w-1/2 border px-3 py-2 text-sm rounded"
                                />
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    placeholder="Designation"
                                    className="w-1/2 border px-3 py-2 text-sm rounded"
                                />
                            </div>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Write your message..."
                                className="w-full border px-3 py-2 text-sm rounded h-24"
                            />
                            <div className="flex justify-center">
                                {isclicked ? (
                                    <button
                                        type="submit"
                                        className="px-6 py-2 rounded text-base font-semibold transition-all duration-300 bg-[#f1c44a] text-white cursor-not-allowed"
                                        disabled
                                    >
                                        Sending...
                                    </button>
                                ) : isSent ? (
                                    <button
                                        type="submit"
                                        className="px-6 py-2 rounded text-base font-semibold transition-all duration-300 bg-green-500 text-white"
                                    >
                                        Sent!
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="px-6 py-2 rounded text-base font-semibold transition-all duration-300 bg-yellow-500 text-white hover:bg-yellow-600"
                                    >
                                        Send Message
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookDemoSection;