import React from "react";
import linkedIn from "/src/assets/linkedin.png";
import github from "/src/assets/github-sign.png";
import sagar from "/src/assets/sagar.png";
import divyanshu from "/src/assets/divyanshu.png";
import vanshika from "/src/assets/vanshika.jpg";
import Ayush from "/src/assets/Ayush.jpg";
import akhil from "/src/assets/akhil.jpeg";

const TeamComponent: React.FC = () => {
  const teamMembers = [
    {
      name: "Sagar G. Sangodkar",
      role: "Managing Director\nand CEO",
      description: "IIT Bombay\nGraduate",
      imageUrl: sagar,
      githubUrl: "https://github.com",
      linkedinUrl: "https://www.linkedin.com/in/sagarsangodkar/",
    },
    {
      name: "Akhil Gakhar",
      role: "Artificial Intelligence Researcher and Collaborator",
      description: "IIT Bombay\nGraduate",
      imageUrl: akhil,
      githubUrl: "https://github.com",
      linkedinUrl: "https://www.linkedin.com/in/akhil-gakhar-2593237a/",
    },
    {
      name: "Divyanshu Suman",
      role: "Artificial Intelligence\nIntern",
      description: "IIT Bombay\nUndergraduate Student",
      imageUrl: divyanshu,
      githubUrl: "https://github.com",
      linkedinUrl: "https://www.linkedin.com/in/divyanshusuman/",
    },
    {
      name: "Vanshika Sharma",
      role: "Full Stack Development\nIntern",
      description: "IT Undergraduate\nStudent",
      imageUrl: vanshika,
      githubUrl: "https://github.com",
      linkedinUrl: "https://www.linkedin.com/in/vanshikasharma-it/",
    },
    {
      name: "Ayush Hurkat",
      role: "Full Stack Development\nIntern",
      description: "MITS Gwalior \nIT Undergraduate Student",
      imageUrl: Ayush,
      githubUrl: "https://github.com",
      linkedinUrl: "https://www.linkedin.com/in/ayushhurkat/",
    },
  ];

  return (
    <div className="mt-28">
      <div className="flex justify-center items-center pt-16">
        <h1 className="w-full text-customGreen xs:text-[2rem] xl:text-[3.5vw] md:text-[3.4vw] tracking-widest leading-tight font-bold font-custom text-center">
          Meet the Innovators Driving Our Vision
        </h1>
      </div>
      <div className="w-full px-[2vw] xl:py-[17vh] py-[8vh]">
        <div className="container mx-auto">
          <div
            role="list"
            aria-label="Behind the scenes People"
            className="flex flex-wrap justify-center gap-8"
          >
            {teamMembers.map((member, index) => (
              <div
                role="listitem"
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 relative mt-16"
                key={index}
              >
                <div className="rounded-xl overflow-hidden shadow-lg border-2 border-customGreen bg-navbar py-8">
                  <div className="absolute -top-12 w-full flex justify-center items-center">
                    <div className="h-28 w-28 lg:h-32 lg:w-32">
                      <img
                        src={member.imageUrl}
                        alt={`Display Picture of ${member.name}`}
                        className="rounded-full object-cover h-full w-full shadow-md border-4 border-white"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-16 flex flex-col items-center gap-4">
                    <h1 className="text-customGreen font-custom text-center text-xl lg:text-2xl font-bold">
                      {member.name}
                    </h1>
                    <p className="text-darkGolden text-center text-sm lg:text-base whitespace-pre-line">
                      {member.role}
                    </p>
                    <p className="text-darkGolden text-center text-sm lg:text-base whitespace-pre-line">
                      {member.description}
                    </p>
                    <div className="flex justify-center gap-6 mt-4">
                      {member.githubUrl && (
                        <a
                          href={member.githubUrl}
                          className="w-8 h-8 lg:w-10 lg:h-10"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={github} alt="GitHub" className="w-full h-full" />
                        </a>
                      )}
                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          className="w-8 h-8 lg:w-10 lg:h-10"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={linkedIn} alt="LinkedIn" className="w-full h-full" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamComponent;
