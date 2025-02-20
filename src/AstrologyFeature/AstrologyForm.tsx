import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const AstrologyForm: React.FC = () => {
    const [gender, setGender] = useState('');
    const [timeOfBirth, setTimeOfBirth] = useState(new Date().toLocaleString());
    const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
    const [monthOfBirth, setMonthOfBirth] = useState<string>(new Date().toISOString().slice(0, 7));
    const [location, setLocation] = useState<string>(''); // For storing location input
    const [suggestions, setSuggestions] = useState<string[]>([]); // For storing autocomplete suggestions
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0); // Default to 'Basic' tab
    const [transitioning, setTransitioning] = useState(false); // State for transition control

    const tabsRef = useRef<(HTMLElement | null)[]>([]);
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

    useEffect(() => {
        if (activeTabIndex === null) {
            return;
        }

        const setTabPosition = () => {
            const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
            setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
            setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
        };

        setTabPosition();
    }, [activeTabIndex]);

    useEffect(() => {
        // Set the default time to the current local time in 12-hour format with AM/PM
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        setTimeOfBirth(formattedTime);
    }, []);

    useEffect(() => {
        // Trigger API call when the location input changes
        if (location) {
            fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=acca7dbee7ca4eefb04475a298fe14df`)
                .then((response) => response.json())
                .then((data) => {
                    // Set the suggestions from the API response
                    const placeNames = data.features.map((feature: any) => feature.properties.formatted);
                    setSuggestions(placeNames);
                })
                .catch((error) => console.error('Error fetching location suggestions:', error));
        }
    }, [location]);

    const handleGenderSelect = (selectedGender: string) => {
        setGender(selectedGender);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateOfBirth(new Date(event.target.value));
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMonthOfBirth(event.target.value);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimeOfBirth(e.target.value);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value); // Update location state
    };

    const allTabs = [
        {
            id: "basic",
            name: "Basic",
        },
        {
            id: "advanced",
            name: "Advanced",
        },
    ];

    const handleTabChange = (index: number) => {
        setTransitioning(true);
        setTimeout(() => {
            setActiveTabIndex(index);
            setTransitioning(false);
        }, 500); // Make sure this matches the transition time
    };

    const navigate = useNavigate();

    const handleSubmit = () => {
        console.log('Form submitted with the following data:');
        console.log('Gender: ', gender);
        console.log('Month of Birth: ', monthOfBirth);
        console.log('Date of birth: ', dateOfBirth);
        console.log('Location: ', location); // Print location to check
        navigate('astroSign');
        console.log('Active Tab Index: ', activeTabIndex);
    };

    return (
        <div className="min-h-screen p-8 rounded-lg shadow-lg text-center max-w-full flex flex-col justify-center items-center bg-starry">
            <div className="header absolute top-0 left-0 right-0 p-8 text-center z-20 mb-4">
                <h1 className="text-yellow-600 text-2xl font-bold mb-2 lg:text-4xl drop-shadow-[0px_0px_16px_rgba(224,174,42,1.0)]">
                    Astrology Based Jewellery
                </h1>
                <p className="text-green-600 italic mb-6 lg:text-xl drop-shadow-[0px_0px_16px_rgba(112,240,144,1)]">
                    Let the stars and Vedas guide your divine path and get you the right piece
                </p>
            </div>

            <div className="form bg-gray-100 p-6 rounded-lg border border-yellow-600 lg:p-10 max-w-3xl w-full mt-20 lg:mt-32 z-10 relative">
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
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700 lg:text-lg">Month of Birth</label>
                                <input
                                    type="month"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded lg:p-3"
                                    value={monthOfBirth}
                                    onChange={handleMonthChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 lg:text-lg">Gender</label>
                                <div className="flex mt-1">
                                    <button
                                        className={`w-1/2 p-2 border border-gray-300 rounded-l ${gender === 'Male' ? 'bg-yellow-300' : ''}`}
                                        onClick={() => handleGenderSelect('Male')}
                                    >
                                        Male
                                    </button>
                                    <button
                                        className={`w-1/2 p-2 border border-gray-300 rounded-r ${gender === 'Female' ? 'bg-yellow-300' : ''}`}
                                        onClick={() => handleGenderSelect('Female')}
                                    >
                                        Female
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700 lg:text-lg">Date of Birth</label>
                                <input
                                    type="date"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded lg:p-3"
                                    value={dateOfBirth.toISOString().split('T')[0]}
                                    onChange={handleDateChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 lg:text-lg">Time of Birth</label>
                                <TextField
                                    label="Choose Time"
                                    type="time"
                                    value={timeOfBirth}
                                    onChange={handleTimeChange}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ step: 300 }} // 5 minutes step
                                    className="w-full mt-1"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 lg:text-lg">Gender</label>
                                <div className="flex mt-1">
                                    <button
                                        className={`w-1/2 p-2 border border-gray-300 rounded-l ${gender === 'Male' ? 'bg-yellow-300' : ''}`}
                                        onClick={() => handleGenderSelect('Male')}
                                    >
                                        Male
                                    </button>
                                    <button
                                        className={`w-1/2 p-2 border border-gray-300 rounded-r ${gender === 'Female' ? 'bg-yellow-300' : ''}`}
                                        onClick={() => handleGenderSelect('Female')}
                                    >
                                        Female
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 lg:text-lg">Location</label>
                                <input
                                    type="text"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded lg:p-3"
                                    value={location}
                                    onChange={handleLocationChange}
                                    placeholder="Start typing a location"
                                />
                                {suggestions.length > 0 && (
                                    <ul className="mt-2 max-h-40 overflow-y-auto bg-white border border-gray-300 rounded p-2">
                                        {suggestions.map((suggestion, index) => (
                                            <li key={index} className="p-1 cursor-pointer hover:bg-gray-200" onClick={() => setLocation(suggestion)}>
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <button onClick={handleSubmit} className="mt-6 bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 lg:py-3 lg:px-6 z-20">
                See My Astrology Jewelry
            </button>
        </div>
    );
};

export default AstrologyForm;
