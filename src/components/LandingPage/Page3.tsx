// import React from 'react';
// import teamMembers from './teamMembers.json'; 

// const Page3: React.FC = () => {
//     return (
//         <div className="bg-[#fff9f5] min-h-screen flex flex-col w-full px-[4rem] justify-center items-center gap-[1.3rem] md:gap-[2rem] xl:gap-[5rem]">
//             <section className="pb-12 sm:pb-16 lg:pb-20">
//                 <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//                     <div className="text-center">
//                         <h2 className="text-customGreen xs:text-[1.5rem] md:text-[2rem] xl:text-[3rem] leading-tight">
//                             Meet our Team
//                         </h2>
//                     </div>

//                     <div className="grid max-w-6xl grid-cols-1 px-20 mx-auto mt-12 text-center sm:px-0 sm:grid-cols-2 md:mt-20 gap-x-8 md:grid-cols-4 gap-y-12 lg:gap-x-16 xl:gap-x-20">
//                         {teamMembers.map((member, index) => (
//                             <div key={index} className='p-[2vw] border border-[#f3e4c3] rounded-3xl'>
//                                 <img
//                                     className="object-cover  mx-auto rounded-full lg:w-[8rem] "
//                                     src={member.image}
//                                     alt={member.name}
//                                 />
//                                 <p className="mt-5 text-lg text-customGreen font-medium sm:text-xl sm:mt-8 font-pj">
//                                     {member.name}
//                                 </p>
//                                 <p className="mt-2 text-base font-normal text-customBlack font-pj">
//                                     {member.role}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default Page3;
import React from 'react';
import linkedIn from "/src/assets/linkedin.png";
import github from "/src/assets/logo.png";
import img from "/src/assets/img.png"

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
            imageUrl: 'https://media.licdn.com/dms/image/v2/D4D35AQEzXwpMhRyCFQ/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1716278908145?e=1724817600&v=beta&t=P0HuymJHgPxGmzQRgVpp9rYnjZ5iZL3YhqloVcPvV4M',
            githubUrl: 'https://github.com',
            linkedinUrl: 'https://www.linkedin.com/in/vanshikasharma-it/',
        },
    ];

    return (
        <div className="bg-[#fff9f5] min-h-screen">
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
                                <div className="rounded-xl overflow-hidden shadow-md bg-[#f9eee6]">
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
