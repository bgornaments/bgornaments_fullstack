import React from "react";
import linkedIn from "/src/assets/linkedin.png";
import github from "/src/assets/github-sign.png";
import sagar from "/src/assets/sagar.png";
import divyanshu from "/src/assets/divyanshu.png";
import vanshika from "/src/assets/vanshika.jpg";
import akhil from "/src/assets/akhil.jpeg"

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
            className="lg:flex md:flex xs:flex items-center xl:justify-between flex-wrap md:justify-around xs:justify-around lg:justify-around"
          >
            {teamMembers.map((member, index) => (
              <div
                role="listitem"
                className="xl:w-[20vw] xs:w-3/4 md:w-2/5 relative mt-16 mb-16 sm:mb-24 xl:max-w-sm lg:w-2/5 "
                key={index}
              >
                <div className="rounded-xl overflow-hidden shadow-md bg-navbar py-[2vh]">
                  <div className="absolute -mt-20 w-full flex justify-center items-center">
                    <div className="lg:h-32 lg:w-32 w-24 h-24">
                      <img
                        src={member.imageUrl}
                        alt={`Display Picture of ${member.name}`}
                        role="img"
                        className="rounded-full object-cover h-full w-full shadow-md"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-12 xl:min-h-[35vh] flex flex-col justify-center gap-[2vh]">
                    <h1 className="text-customGreen font-custom text-center text-[1.5rem] md:text-[1.5rem] xl:text-[1.7rem] pb-[1vh]">
                      {member.name}
                    </h1>
                    <p className="text-darkGolden text-[0.7rem] md:text-[0.8rem] xl:text-[0.9rem] text-center">
                      {member.role.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i !== member.role.split("\n").length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                    <p className="text-darkGolden text-[0.7rem] md:text-[0.8rem] xl:text-[0.9rem] text-center">
                      {member.description.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i !== member.description.split("\n").length - 1 && (
                            <br />
                          )}
                        </React.Fragment>
                      ))}
                    </p>
                    <div className="w-full flex justify-center gap-[2vw] pt-[1vh]">
                      {member.githubUrl && (
                        <a
                          href={member.githubUrl}
                          className="w-[6vw] md:w-[2.4vw] xl:w-[1.5vw]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div aria-label="Github" role="img">
                            <img src={github} alt="GitHub" />
                          </div>
                        </a>
                      )}
                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          className="w-[6vw] md:w-[2.4vw] xl:w-[1.5vw]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div aria-label="LinkedIn" role="img">
                            <img src={linkedIn} alt="LinkedIn" />
                          </div>
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
