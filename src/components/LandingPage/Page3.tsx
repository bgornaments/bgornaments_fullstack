import React from 'react';
import teamMembers from './teamMembers.json'; 

const Page3: React.FC = () => {
    return (
        <div className="bg-[#fff9f5] min-h-screen flex flex-col w-full px-[4rem] justify-center items-center gap-[1.3rem] md:gap-[2rem] xl:gap-[5rem]">
            <section className="pb-12 sm:pb-16 lg:pb-20">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-customGreen xs:text-[1.5rem] md:text-[2rem] xl:text-[3rem] leading-tight">
                            Meet our Team
                        </h2>
                    </div>

                    <div className="grid max-w-6xl grid-cols-1 px-20 mx-auto mt-12 text-center sm:px-0 sm:grid-cols-2 md:mt-20 gap-x-8 md:grid-cols-4 gap-y-12 lg:gap-x-16 xl:gap-x-20">
                        {teamMembers.map((member, index) => (
                            <div key={index} className='p-[2vw] border border-[#f3e4c3] rounded-3xl'>
                                <img
                                    className="object-cover  mx-auto rounded-full lg:w-[8rem] "
                                    src={member.image}
                                    alt={member.name}
                                />
                                <p className="mt-5 text-lg text-customGreen font-medium sm:text-xl sm:mt-8 font-pj">
                                    {member.name}
                                </p>
                                <p className="mt-2 text-base font-normal text-customBlack font-pj">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Page3;
