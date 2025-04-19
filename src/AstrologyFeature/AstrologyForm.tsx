import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/image.png';
import imgVar from '../assets/image_variations_icon.jpg';
import s2d from '../assets/sketch.png';
import outfitmatch from '../assets/outfit_matching_icon.jpg';
import setgen from '../assets/set_generator_icon.jpg';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

interface GeoSuggestion {
  formatted: string;
  lat: number;
  lon: number;
}
import Navbar from '../landingNew/navbar';

const AstrologyForm: React.FC = () => {
  const [gender, setGender] = useState('');
  const [timeOfBirth, setTimeOfBirth] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [monthOfBirth, setMonthOfBirth] = useState<string>(new Date().toISOString().slice(0, 7));
  const [location, setLocation] = useState<string>('');
  const [suggestions, setSuggestions] = useState<GeoSuggestion[]>([]);
  const [selectedGeoLocation, setSelectedGeoLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [transitioning, setTransitioning] = useState(false);

  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const demoSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTabIndex === null) return;
    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };
    setTabPosition();
  }, [activeTabIndex]);

  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    setTimeOfBirth(formattedTime);
  }, []);

  useEffect(() => {
    if (location) {
      fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=acca7dbee7ca4eefb04475a298fe14df`)
        .then((response) => response.json())
        .then((data) => {
          const suggestionsList: GeoSuggestion[] = data.features.map((feature: { properties: { formatted: string; lat: number; lon: number } }) => ({
            formatted: feature.properties.formatted,
            lat: feature.properties.lat,
            lon: feature.properties.lon,
          }));
          setSuggestions(suggestionsList);
        })
        .catch((error) => console.error('Error fetching location suggestions:', error));
    }
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (tabsRef.current[activeTabIndex]) {
        const activeTab = tabsRef.current[activeTabIndex];
        setTabUnderlineLeft(activeTab.offsetLeft);
        setTabUnderlineWidth(activeTab.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTabIndex]);

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
    setLocation(e.target.value);
  };

  const allTabs = [
    { id: "basic", name: "Basic" },
    { id: "advanced", name: "Advanced" },
  ];

  const handleTabChange = (index: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveTabIndex(index);
      setTransitioning(false);
    }, 500);
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    const dob = `${dateOfBirth.getDate().toString().padStart(2, '0')}/${(dateOfBirth.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${dateOfBirth.getFullYear()}`;
    if (!selectedGeoLocation) {
      alert('Please select a valid location from suggestions.');
      return;
    }
    const payload = {
      dob: dob,
      tob: timeOfBirth,
      location: {
        lat: selectedGeoLocation.lat,
        lon: selectedGeoLocation.lon,
      }
    };
    console.log('Payload:', payload);
    navigate('astroSign', { state: payload });
  };

  const features = [
    {
      title: 'Image Variation',
      imgSrc: imgVar,
      alt: 'Jewelry set on a wooden plate',
      description: 'Effortlessly create jewelry sets, optimized for your needs with flexibility.',
      link: '/expert-mode/image-variation',
    },
    {
      title: 'Sketch To Design',
      imgSrc: s2d,
      alt: 'Notebook with a sketch of a diamond and a pencil',
      description: 'Effortlessly transform your rough sketches to exquisite jewelry designs.',
      link: '/expert-mode/sketchToJwellery',
    },
    {
      title: 'Outfit Matching Jewelry',
      imgSrc: outfitmatch,
      alt: 'Golden picture frame',
      description: 'Perfectly match your jewelry & accessories to the outfit to impress everyone.',
      link: '/expert-mode/.../#',
    },
    {
      title: 'Set Generation',
      imgSrc: setgen,
      alt: 'Astrology chart with a glowing center',
      description: 'Find your perfect astrology jewelry with personalized astrology guidance.',
      link: '/expert-mode/set-generation',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-starry">
      <Navbar onContactClick={() => {
        demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }} />
      <div className="flex-grow flex flex-col justify-center items-center pt-16">
        <div className="w-[90%] sm:w-[80%] md:w-[70%] mx-auto bg-[#fffdfa] flex flex-col items-center p-4 sm:p-6 relative z-10 mt-4 sm:mt-2">
          <div className="header w-full text-center z-20 mb-10 sm:mb-14 md:mb-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-custom font-bold text-lightGolden">
              Astrology Based Jewellery
            </h1>
            <p className="text-lightGreen mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl">
              Let the stars and Vedas guide you to get the right jewelry piece
            </p>
          </div>

          <div className="form bg-gray-100 p-4 sm:p-6 rounded-lg border border-yellow-600 lg:p-10 max-w-3xl w-full mt-24 sm:mt-20 lg:mt-32 z-10 relative">
            <div className="flex justify-center mb-4 relative flex-row mx-auto flex h-12 rounded-3xl border border-[#e0ae2a] bg-[#e0ae2aaa] px-2 backdrop-blur-lg sm:px-4">
              <span
                className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-2 transition-all duration-300"
                style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
              >
                <span className="h-full w-full rounded-3xl bg-[#e0ae2a]" />
              </span>
              {allTabs.map((tab, index) => (
                <button
                  key={index}
                  ref={(el) => (tabsRef.current[index] = el)}
                  className={`my-auto cursor-pointer select-none rounded-full px-4 text-center font-bold text-white`}
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
                      inputProps={{ step: 300 }}
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
                          <li
                            key={index}
                            className="p-1 cursor-pointer hover:bg-gray-200"
                            onClick={() => {
                              setLocation(suggestion.formatted);
                              setSelectedGeoLocation({ lat: suggestion.lat, lon: suggestion.lon });
                              setSuggestions([]);
                            }}
                          >
                            {suggestion.formatted}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <button onClick={handleSubmit} className="mt-6 bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 sm:py-3 sm:px-6 z-20">
            See My Astrology Jewelry
          </button>
        </div>
        <div className="h-16"></div>

        {/* Features Section */}
        <div className="w-full bg-gray-100 border-t border-b border-gray-300">
          <div className="py-6 font-custom mx-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <Link
                    to={feature.link}
                    key={index}
                    className="bg-white rounded-2xl shadow text-center border border-orange-200 min-h-[350px] flex flex-col justify-between max-w-[80%] mx-auto hover:shadow-xl transition-shadow duration-300"
                  >
                    <h2 className="text-orange-600 text-lg font-semibold mb-2 bg-orange-100 p-3 rounded-t-2xl">
                      {feature.title}
                    </h2>
                    <div className="flex-grow flex flex-col items-center justify-center px-4">
                      <img
                        src={feature.imgSrc}
                        alt={feature.alt}
                        width={150}
                        height={150}
                        className="mb-8"
                      />
                      <p className="text-gray-600 text-base">{feature.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-16"></div>

        {/* Footer */}
        <footer ref={demoSectionRef} className="w-full bg-[#f8f8f8] py-8 text-sm text-gray-600 px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
              <Link to="/">
                <img src={logo} alt="Company Logo" className="mb-4 w-32" />
              </Link>
              <p className="text-center md:text-left mb-4 text-2xl font-custom">
                Your Style, Our Craftsmanship — Together,
                <br />
                We Sparkle with Elegance.
              </p>
              <div className="flex space-x-4 text-xl">
                <a className="text-gray-600 hover:text-gray-800" href="https://www.facebook.com/profile.php?id=61574416178019" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                <a className="text-gray-600 hover:text-gray-800" href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a className="text-gray-600 hover:text-gray-800" href="https://instagram.com/kinmitra_com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a className="text-gray-600 hover:text-gray-800" href="https://linkedin.com/company/bgornaments" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                <a className="text-gray-600 hover:text-gray-800" href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-16 text-center md:text-left">
              <div className="mb-6 md:mb-0">
                <h3 className="text-gray-800 font-bold mb-4 text-2xl font-custom">Company</h3>
                <ul className="space-y-2">
                  <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/">Home</Link></li>
                  <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/">Our Work</Link></li>
                  <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/catalog">AI Design</Link></li>
                  <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/">Pricing</Link></li>
                  <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/Contact-Us">Contact Us</Link></li>
                  <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/kinmitra_team">Our Team</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-gray-800 font-bold mb-4 text-2xl font-custom">Support</h3>
                <ul className="space-y-2">
                  <li className="text-gray-600 text-base">+91 (835) 608-5861</li>
                  <li className="text-gray-600 text-base">ceo@kinmitra.com</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AstrologyForm;