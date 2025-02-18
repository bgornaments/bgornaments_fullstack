import React, { useState, useEffect, useRef } from 'react';

const AstrologyForm: React.FC = () => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0); // Default to 'Basic' tab
    const [transitioning, setTransitioning] = useState(false); // State for transition control
    const tabsRef = useRef<(HTMLElement | null)[]>([]);
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

    useEffect(() => {
        const setTabPosition = () => {
            const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
            setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
            setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
        };
        setTabPosition();
    }, [activeTabIndex]);

    const allTabs = [
        { id: "basic", name: "Basic" },
        { id: "advanced", name: "Advanced" },
    ];

    const handleTabChange = (index: number) => {
        setTransitioning(true);
        setTimeout(() => {
            setActiveTabIndex(index);
            setTransitioning(false);
        }, 500); // Transition time
    };

    return (
        <div className="min-h-screen p-8 rounded-lg shadow-lg text-center max-w-full flex flex-col justify-center items-center">
            <div className="header absolute top-0 left-0 right-0 p-8 text-center z-50 mb-4">
                <h1 className="text-yellow-600 text-2xl font-bold mb-2 lg:text-4xl">Astrology Based Jewellery</h1>
                <p className="text-green-600 italic mb-6 lg:text-xl">Let the stars and Vedas guide your divine path and get you the right piece</p>
            </div>
            <div className="form bg-[gray]-100/80 p-6 rounded-lg border border-yellow-600 lg:p-10 max-w-3xl w-full mt-20 lg:mt-32 z-10">
                <div className="flex justify-center mb-4 relative flex-row mx-auto flex h-12 rounded-3xl border border-[#e0ae2a] bg-[#e0ae2aaa] px-2 backdrop-blur-lg lg:px-4">
                    <span className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-2 transition-all duration-300" style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}>
                        <span className="h-full w-full rounded-3xl bg-[#e0ae2a]" />
                    </span>
                    {allTabs.map((tab, index) => (
                        <button
                            key={index}
                            ref={(el) => (tabsRef.current[index] = el)}
                            className="my-auto cursor-pointer select-none rounded-full px-4 text-center font-bold text-white"
                            onClick={() => handleTabChange(index)}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

                <div className={`text-left transition-all duration-500 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
                    {activeTabIndex === 0 ? (
                        <div className="mb-4">
                            <h1>Basic</h1>
                            <label className="block text-gray-700 lg:text-lg">Date of Birth</label>

                            <input type="date" placeholder="Put date" className="w-full mt-1 p-2 border border-gray-300 rounded lg:p-3" />
                        </div>
                    ) : (
                        <div className="mb-4">
                            <h1>Advanced</h1>
                            <label className="block text-gray-700 lg:text-lg">Date of Birth</label>
                            <input type="date" className="w-full mt-1 p-2 border border-gray-300 rounded lg:p-3" />
                        </div>
                    )}
                </div>
            </div>
            <button className="mt-6 bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 lg:py-3 lg:px-6">
                Show me the jwellery
            </button>
        </div>
    );
};

export default AstrologyForm;
