import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Menu, X } from "lucide-react";
import logo from "/src/assets/image.png";

type NavbarProps = {
  onTutorialClick: () => void;
};

const NavbarFeature: React.FC<NavbarProps> = ({ onTutorialClick }) => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActiveLink("Home");
    else if (path === "/tutorial") setActiveLink("Tutorial");
    else if (path === "/profile-page") setActiveLink("My Profile");
    else setActiveLink("");
  }, [location]);



  const getLinkClass = (linkName: string) => {
    return `text-xl relative group ${activeLink === linkName ? "text-[#e0ae2a]" : ""}`;
  };

  return (
    <header className="w-full border-b-2 border-gray-200 px-4 py-4 md:py-6 text-xl relative">
      <div className="flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex items-center md:ml-8">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-32 md:w-40" />
          </Link>
        </div>

        {/* Centered Menu Links */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 items-center">
          <Link
            to="/"
            className={getLinkClass("Home")}
            onClick={() => setActiveLink("Home")}
          >
            Home
            <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#e0ae2a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span
              className={`absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#e0ae2a] ${activeLink === "Home" ? "scale-x-100" : "scale-x-0"
                }`}
            />
          </Link>
          <span
            className={`relative cursor-pointer font-semibold group ${activeLink === "Tutorial" ? "text-[#e0ae2a]" : "text-black"}`}
            onClick={onTutorialClick}
          >
            Tutorial
            {/* Underline spans */}
            <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#e0ae2a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span
              className={`absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#e0ae2a] ${activeLink === "Tutorial" ? "scale-x-100" : "scale-x-0"
                }`}
            />
          </span>



          {user && (
            <Link
              to="/profile-page"
              className={getLinkClass('My Profile')}
              onClick={() => setActiveLink('My Profile')}
            >
              My Profile
              <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#e0ae2a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className={`absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#e0ae2a] ${activeLink === 'My Profile' ? 'scale-x-100' : 'scale-x-0'}`} />
            </Link>
          )}
          {showVideoModal && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 max-w-5xl w-full max-h-[90vh] relative flex flex-col">
                <button
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold"
                  onClick={() => setShowVideoModal(false)}
                >
                  ×
                </button>
                <div className="flex-grow">
                  <div className="w-full h-full aspect-w-16 aspect-h-9">
                    <iframe
                      className="w-full h-full rounded-md"
                      src="https://www.youtube.com/embed/HfwFYSPnvk4"
                      title="Tutorial Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          )}


        </div>

        {/* Login/Logout */}
        <div className="hidden md:flex items-center mr-8">
          {user ? (
            <button
              onClick={signOut}
              className="border border-yellow-500 text-yellow-500 px-4 py-1 rounded text-lg"
            >
              Log Out
            </button>
          ) : (
            <Link to="/login">
              <button className="border border-yellow-500 text-yellow-500 px-4 py-1 rounded text-lg">
                Log In
              </button>
            </Link>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            {menuOpen ? (
              <X className="w-8 h-8 text-[#e0ae2a]" />
            ) : (
              <Menu className="w-8 h-8 text-[#e0ae2a]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-4 top-full mt-2 bg-white shadow-lg border rounded-lg w-56 py-4 px-4 space-y-3 z-50">
          <Link
            to="/"
            className={`block text-lg relative ${activeLink === "Home" ? "text-[#e0ae2a]" : ""}`}
            onClick={() => {
              setMenuOpen(false);
              setActiveLink("Home");
            }}
          >
            Home
            <span
              className={`absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#e0ae2a] ${activeLink === "Home" ? "scale-x-100" : "scale-x-0"
                }`}
            />
          </Link>

          {/* <Link
            to="/tutorial"
            className={`block text-lg relative ${activeLink === "Tutorial" ? "text-[#e0ae2a]" : ""}`}
            onClick={() => {
              setMenuOpen(false);
              setActiveLink("Tutorial");
            }}
          >
            Tutorial
            <span
              className={`absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#e0ae2a] ${activeLink === "Tutorial" ? "scale-x-100" : "scale-x-0"
                }`}
            />
          </Link> */}

          <span
            className={`block text-lg cursor-pointer ${activeLink === "Tutorial" ? "text-[#e0ae2a]" : "text-black"}`}
            onClick={onTutorialClick}
          >
            Tutorial
            {/* Underline spans */}
            <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#e0ae2a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span
              className={`absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#e0ae2a] ${activeLink === "Tutorial" ? "scale-x-100" : "scale-x-0"
                }`}
            />
          </span>




          {user && (
            <Link
              to="/profile-page"
              className={`block text-lg relative ${activeLink === 'My Profile' ? 'text-[#e0ae2a]' : ''}`}
              onClick={() => {
                setMenuOpen(false);
                setActiveLink('My Profile');
              }}
            >
              My Profile
              <span className={`absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#e0ae2a] ${activeLink === 'My Profile' ? 'scale-x-100' : 'scale-x-0'}`} />
            </Link>
          )}
          {user ? (
            <button
              onClick={() => {
                setMenuOpen(false);
                signOut();
              }}
              className="w-full text-left border border-yellow-500 text-yellow-500 px-4 py-1 rounded text-lg text-center"
            >
              Log Out
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="w-full text-left border border-yellow-500 text-yellow-500 px-4 py-1 rounded text-lg text-center">
                Log In
              </button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default NavbarFeature;