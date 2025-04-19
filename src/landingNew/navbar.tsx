import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Menu, X } from 'lucide-react';
import logo from '/src/assets/image.png';

type NavbarProps = {
  onContactClick: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleContactClick = () => {
    setMenuOpen(false); // Close menu if open
    onContactClick(); // Execute the passed function
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
          <Link to="/" className="text-xl">Home</Link>
          <Link to="/" className="text-xl">Pricing</Link>
          <Link to="/" className="text-xl">FAQs</Link>
          <button onClick={handleContactClick} className="text-xl">Contact Us</button>
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
          <Link to="/" className="block text-lg" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/" className="block text-lg" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link to="/" className="block text-lg" onClick={() => setMenuOpen(false)}>FAQs</Link>
          <button onClick={handleContactClick} className="block text-lg w-full text-left">
            Contact Us
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