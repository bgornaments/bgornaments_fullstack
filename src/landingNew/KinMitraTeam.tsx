import React from "react";
import linkedIn from "/src/assets/linkedin.png";
import github from "/src/assets/github-sign.png";
import sagar from "/src/assets/sagar.png";
import divyanshu from "/src/assets/divyanshu.png";
import vanshika from "/src/assets/vanshika.jpg";
import Ayush from "/src/assets/Ayush.jpg";
import akhil from "/src/assets/akhil.jpeg";
import logo from "/src/assets/image.png";

const TeamComponent: React.FC = () => {
    const teamMembers = [
        {
            name: "Sagar G. Sangodkar",
            role: "Managing Director and CEO",
            description: "IIT Bombay Graduate",
            imageUrl: sagar,
            githubUrl: "https://github.com",
            linkedinUrl: "https://www.linkedin.com/in/sagarsangodkar/",
            isCEO: true,
        },
        {
            name: "Vinayak Bhamblani",
            role: "Artificial Intelligence Intern",
            description: "IIT Bombay Undergraduate Student",
            imageUrl: "",
            githubUrl: "https://github.com/Vinayak2104",
            linkedinUrl: "https://www.linkedin.com/in/vinayak-bhamblani-3b8952276/",
        },
        {
            name: "Akhil Gakhar",
            role: "Artificial Intelligence Researcher and Collaborator",
            description: "IIT Bombay Graduate",
            imageUrl: akhil,
            githubUrl: "https://github.com",
            linkedinUrl: "https://www.linkedin.com/in/akhil-gakhar-2593237a/",
        },
        {
            name: "Ayush Hurkat",
            role: "Full Stack Development Intern",
            description: "B.Tech (IT) student at MITS Gwalior",
            imageUrl: Ayush,
            githubUrl: "https://github.com/AyushHurkat0022",
            linkedinUrl: "https://www.linkedin.com/in/ayushhurkat/",
        },
        {
            name: "Vanshika Sharma",
            role: "Frontend Development Intern",
            description: "B.Tech (IT) student at MITS Gwalior",
            imageUrl: vanshika,
            githubUrl: "https://github.com",
            linkedinUrl: "https://www.linkedin.com/in/vanshikasharma-it/",
        },
        {
            name: "Divyanshu Suman",
            role: "Artificial Intelligence Intern",
            description: "IIT Bombay Undergraduate Student",
            imageUrl: divyanshu,
            githubUrl: "https://github.com",
            linkedinUrl: "https://www.linkedin.com/in/divyanshusuman/",
        },
    ];

    const ceo = teamMembers.find((member) => member.isCEO);
    const otherMembers = teamMembers.filter((member) => !member.isCEO);

    return (
        <div className="relative bg-gradient-to-br from-violet-100 via-white to-violet-100 min-h-screen overflow-hidden">
            {/* Soft lights */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-violet-300 opacity-30 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-300 opacity-30 rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2"></div>

            {/* Header */}
            <div className="text-center mb-16">
                <img src={logo} alt="KinMitra Logo" className="mx-auto h-12 mt-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-customGreen font-custom tracking-wide mt-4">
                    Meet the Team
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mt-3">
                    The Passionate Talent That Drives KinMitra Forward
                </p>
            </div>

            {/* CEO Section */}
            {ceo && (
                <div className="flex justify-center mb-20 px-4">
                    <div className="bg-white rounded-2xl shadow-xl border border-customGreen p-8 text-center w-full max-w-xs hover:scale-105 transition-transform duration-300">
                        <div className="relative -mt-20">
                            <img
                                src={ceo.imageUrl}
                                alt={ceo.name}
                                className="rounded-full w-36 h-36 mx-auto object-cover border-4 border-customGreen shadow-lg"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-customGreen mt-4">{ceo.name}</h2>
                        <p className="text-darkGolden font-medium">{ceo.role}</p>
                        <p className="text-gray-600 mt-2">{ceo.description}</p>
                        <div className="flex justify-center gap-4 mt-4">
                            {ceo.githubUrl && (
                                <a href={ceo.githubUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 hover:opacity-80">
                                    <img src={github} alt="GitHub" className="w-full h-full" />
                                </a>
                            )}
                            {ceo.linkedinUrl && (
                                <a href={ceo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 hover:opacity-80">
                                    <img src={linkedIn} alt="LinkedIn" className="w-full h-full" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Team Members */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                    {otherMembers.map((member, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition duration-300">
                            <div className="relative -mt-16">
                                <img
                                    src={member.imageUrl}
                                    alt={member.name}
                                    className="rounded-full w-32 h-32 mx-auto object-cover border-4 border-white shadow-md"
                                />
                            </div>
                            <h2 className="text-xl font-bold text-customGreen mt-4">{member.name}</h2>
                            <p className="text-darkGolden font-medium">{member.role}</p>
                            <p className="text-gray-600 mt-2">{member.description}</p>
                            <div className="flex justify-center gap-3 mt-4">
                                {member.githubUrl && (
                                    <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="w-7 h-7 hover:opacity-80">
                                        <img src={github} alt="GitHub" className="w-full h-full" />
                                    </a>
                                )}
                                {member.linkedinUrl && (
                                    <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-7 h-7 hover:opacity-80">
                                        <img src={linkedIn} alt="LinkedIn" className="w-full h-full" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamComponent;
