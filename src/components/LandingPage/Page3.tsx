import React from 'react';
import linkedIn from "/src/assets/linkedin.png";
import github from "/src/assets/logo.png";
import img from "/src/assets/img.png"
import img4 from "/src/assets/vanshika.jpg"

const TeamComponent: React.FC = () => {
    const teamMembers = [
        {
            name: 'Sagar G. Sangodkar',
            role: 'Managing Director\nand CEO',
            description: "IIT Bombay\nGraduate",
            imageUrl: img,
            githubUrl: 'https://github.com',
            linkedinUrl: 'https://www.linkedin.com/in/sagarsangodkar/',
        },
        {
            name: 'Akhil Gakhar',
            role: 'Artificial Intelligence Researcher and Collaborator',
            description: 'IIT Bombay\nGraduate',
            imageUrl: 'https://media.licdn.com/dms/image/C5603AQE0aHcpNA0ToQ/profile-displayphoto-shrink_400_400/0/1650630385577?e=1727913600&v=beta&t=lGLNX4p7wVTemZeKbR034CRAZ0o1T-_cJ1Gw-c2jDhU',
            githubUrl: 'https://github.com',
            linkedinUrl: 'https://www.linkedin.com/in/akhil-gakhar-2593237a/',
        },
        {
            name: 'Divyanshu Suman',
            role: 'Artificial Intelligence\nIntern',
            description: 'IIT Bombay\nUndergraduate Student',
            imageUrl: 'https://media.licdn.com/dms/image/v2/D4E35AQFABqmtpH9ONA/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1719441316980?e=1724817600&v=beta&t=0_l3irOplncyjpV3zCYFy91wIAlCV6vZxptzt3Adld8',
            githubUrl: 'https://github.com',
            linkedinUrl: 'https://www.linkedin.com/in/divyanshusuman/',
        },
        {
            name: 'Vanshika Sharma',
            role: 'Full Stack Development Intern',
            description: 'IT Undergraduate\nStudent',
            imageUrl: img4,
            githubUrl: 'https://github.com',
            linkedinUrl: 'https://www.linkedin.com/in/vanshikasharma-it/',
        },
    ];

    return (
        <div className="bg-[#fff9f5] min-h-screen pt-40">
            <div className="container flex justify-center mx-auto pt-16">
                <div>
                    <h1 className="text-customGreen xs:text-[1.5rem] md:text-[2rem] xl:text-[2.8rem] leading-tight text-center pb-6 sm:w-4/6 w-5/6 mx-auto">
                        Meet the Innovators Driving Our Vision
                    </h1>
                </div>
            </div>
            <div className="w-full px-[2vw] py-[17vh]">
                <div className="container mx-auto">
                    <div
                        role="list"
                        aria-label="Behind the scenes People"
                        className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
                    >
                        {teamMembers.map((member, index) => (
                            <div
                                role="listitem"
                                className="xl:w-[20vw] sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
                                key={index}
                            >
                                <div className="rounded-xl overflow-hidden shadow-md bg-[#f5e8d7]">
                                    <div className="absolute -mt-20 w-full flex justify-center">
                                        <div className="h-32 w-32">
                                            <img
                                                src={member.imageUrl}
                                                alt={`Display Picture of ${member.name}`}
                                                role="img"
                                                className="rounded-full object-cover h-full w-full shadow-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="px-6 mt-16 min-h-[35vh] flex flex-col justify-center gap-[2vh]">
                                        <h1 className="text-customGreen text-center text-[1.4rem] md:text-[1.5rem] xl:text-[1.2rem] pb-[2vh]">{member.name}</h1>
                                        <p className="text-customBlack text-[1.4rem] md:text-[1.5rem] xl:text-[0.9rem] text-center">
                                            {member.role.split('\n').map((line, i) => (
                                                <React.Fragment key={i}>
                                                    {line}
                                                    {i !== member.role.split('\n').length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                        </p>
                                        <p className="text-customBlack text-[1.4rem] md:text-[1.5rem] xl:text-[0.9rem] text-center">
                                            {member.description.split('\n').map((line, i) => (
                                                <React.Fragment key={i}>
                                                    {line}
                                                    {i !== member.description.split('\n').length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                        </p>
                                        <div className="w-full flex justify-center gap-[2vw] pt-[1vh]">
                                            {member.githubUrl && (
                                                <a href={member.githubUrl} className="text-green-600 w-[1.5vw]" target="_blank" rel="noopener noreferrer">
                                                    <div aria-label="Github" role="img">
                                                        <img src={github} alt="GitHub" />
                                                    </div>
                                                </a>
                                            )}
                                            {member.linkedinUrl && (
                                                <a href={member.linkedinUrl} className="w-[1.5vw]" target="_blank" rel="noopener noreferrer">
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
