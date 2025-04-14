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
            description: "MITS Gwalior IT Undergraduate Student",
            imageUrl: Ayush,
            githubUrl: "https://github.com",
            linkedinUrl: "https://www.linkedin.com/in/ayushhurkat/",
        },
        {
            name: "Vanshika Sharma",
            role: "Full Stack Development Intern",
            description: "IT Undergraduate Student",
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
        <div className="relative bg-gradient-to-br from-violet-100 via-white to-violet-100 min-h-screen py-16 overflow-hidden">
            {/* Soft light effects */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-violet-300 opacity-30 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-300 opacity-30 rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2"></div>

            {/* Header Section */}
            <div className="text-center mb-12 animate-fade-in-up">
                <img src={logo} alt="Company Logo" className="mx-auto h-16 mb-2" />
                <h1 className="text-4xl md:text-5xl font-bold text-customGreen font-custom tracking-wide">
                    Meet the Team at KinMitra
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mt-2">
                    The Bright Minds Behind Our Success
                </p>
            </div>

            {/* CEO Section */}
            {ceo && (
                <div className="container mx-auto px-4 mb-8 mt-4">
                    <div className="flex justify-center">
                        <div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-2xl shadow-xl border border-customGreen p-8 text-center transform hover:scale-105 transition-transform duration-300 animate-fade-in-up">
                            <div className="relative -mt-20">
                                <img
                                    src={ceo.imageUrl}
                                    alt={`Display Picture of ${ceo.name}`}
                                    className="rounded-full w-32 h-32 mx-auto object-cover border-4 border-customGreen shadow-lg"
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
                </div>
            )}

            {/* Team Members Section */}
            <div className="container mx-auto px-4">
                <div
                    role="list"
                    aria-label="Team Members"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    {otherMembers.map((member, index) => (
                        <div
                            role="listitem"
                            key={index}
                            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow duration-300 mt-4 animate-fade-in-up"
                        >
                            <div className="relative -mt-16">
                                <img
                                    src={member.imageUrl}
                                    alt={`Display Picture of ${member.name}`}
                                    className="rounded-full w-24 h-24 mx-auto object-cover border-4 border-white shadow-md"
                                />
                            </div>
                            <h2 className="text-xl font-bold text-customGreen mt-4">{member.name}</h2>
                            <p className="text-darkGolden font-medium">{member.role}</p>
                            <p className="text-gray-600 mt-2">{member.description}</p>
                            <div className="flex justify-center gap-4 mt-4">
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