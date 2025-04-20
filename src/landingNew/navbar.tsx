import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Menu, X } from 'lucide-react';
import logo from '/src/assets/image.png';

type NavbarProps = {
  onContactClick: () => void;
  onFaqClick: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onContactClick, onFaqClick }) => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  // Debug: Log activeLink changes
  useEffect(() => {
    console.log('Active link:', activeLink);
  }, [activeLink]);

  // Update active link based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActiveLink('Home');
    } else if (path.includes('pricing')) {
      setActiveLink('Pricing');
    }
  }, [location]);

  const handleContactClick = () => {
    setMenuOpen(false);
    setActiveLink('Contact Us');
    onContactClick();
  };

  const handleFaqClick = () => {
    setMenuOpen(false);
    setActiveLink('FAQs');
    onFaqClick();
  };

  const getLinkClass = (linkName: string) => {
    return `text-xl relative group ${
      activeLink === linkName ? 'text-[#e0ae2a]' : ''
    }`;
  };

  return (
    <header className="w-full border-b-2 border-gray-200 px-4 py-4 md:py-6 text-xl relative">
      <div className="flex justify-between items-center relative">
        {/* Logo with left margin on md and above */}
        <div className="flex items-center md:ml-8">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-32 md:w-40" />
          </Link>
        </div>

        {/* Centered Menu Links on large screens */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 items-center">
          <Link
            to="/"
            className={getLinkClass('Home')}
            onClick={() => setActiveLink('Home')}
          >
            Home
            <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#e0ae2a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className={`absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#e0ae2a] ${activeLink === 'Home' ? 'scale-x-100' : 'scale-x-0'}`} />
          </Link>
          <Link
            to="/pricing"
            className={getLinkClass('Pricing')}
            onClick={() => setActiveLink('Pricing')}
          >
            Pricing
            <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#e0ae2a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className={`absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#e0ae2a] ${activeLink === 'Pricing' ? 'scale-x-100' : 'scale-x-0'}`} />
          </Link>
          <button
            onClick={handleFaqClick}
            className={getLinkClass('FAQs')}
          >
            FAQs
            <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#e0ae2a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className={`absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#e0ae2a] ${activeLink === 'FAQs' ? 'scale-x-100' : 'scale-x-0'}`} />
          </button>
          <button
            onClick={handleContactClick}
            className={getLinkClass('Contact Us')}
          >
            Contact Us
            <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#e0ae2a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className={`absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#e0ae2a] ${activeLink === 'Contact Us' ? 'scale-x-100' : 'scale-x-0'}`} />
          </button>
        </div>

        {/* Login/Logout on right with right margin */}
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
            className={`block text-lg relative ${activeLink === 'Home' ? 'text-[#e0ae2a]' : ''}`}
            onClick={() => {
              setMenuOpen(false);
              setActiveLink('Home');
            }}
          >
            Home
            <span className={`absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#e0ae2a] ${activeLink === 'Home' ? 'scale-x-100' : 'scale-x-0'}`} />
          </Link>
          <Link
            to="/pricing"
            className={`block text-lg relative ${activeLink === 'Pricing' ? 'text-[#e0ae2a]' : ''}`}
            onClick={() => {
              setMenuOpen(false);
              setActiveLink('Pricing');
            }}
          >
            Pricing
            <span className={`absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#e0ae2a] ${activeLink === 'Pricing' ? 'scale-x-100' : 'scale-x-0'}`} />
          </Link>
          <button
            onClick={handleFaqClick}
            className={`block text-lg w-full text-left relative ${activeLink === 'FAQs' ? 'text-[#e0ae2a]' : ''}`}
          >
            FAQs
            <span className={`absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#e0ae2a] ${activeLink === 'FAQs' ? 'scale-x-100' : 'scale-x-0'}`} />
          </button>
          <button
            onClick={handleContactClick}
            className={`block text-lg w-full text-left relative ${activeLink === 'Contact Us' ? 'text-[#e0ae2a]' : ''}`}
          >
            Contact Us
            <span className={`absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#e0ae2a] ${activeLink === 'Contact Us' ? 'scale-x-100' : 'scale-x-0'}`} />
          </button>

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

export default Navbar;