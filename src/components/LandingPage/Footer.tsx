import React from 'react';
import logo from "/src/assets/image.png";
import { FaInstagram, FaLinkedin, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <div className="w-full bg-navbar py-6 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 md:w-1/4">
            <img
              src={logo}
              alt="Company Logo"
              className="w-32 md:w-40 lg:w-48 mb-3"
            />
            <p className="text-xs text-brown-800 opacity-80">
              A 'Bharat Gold Ornaments Pvt Ltd' Product
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-grow">
            <div>
              <h3 className="text-base font-semibold mb-3 text-brown-900">
                <b>Legal</b>
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <a
                    href="/privacy-Notice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brown-700 hover:text-brown-900 transition-colors"
                  >
                    Privacy Notice
                  </a>
                </li>
                <li>
                  <a
                    href="/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brown-700 hover:text-brown-900 transition-colors"
                  >
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-3 text-brown-900">
                <b>Contact</b>
              </h3>
              <ul className="space-y-1.5">
                <li className="text-sm text-brown-700">
                  ceo@kinmitra.com
                </li>
                <li className="text-sm text-brown-700">
                  +91 (835) 608-5861
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-3 text-brown-900">
                <b>Follow Us</b>
              </h3>
              <div className="flex space-x-3">
                <a
                  href="https://instagram.com/kinmitra_com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <FaInstagram size={20} className="text-[#E1306C]" />
                </a>
                <a
                  href="https://linkedin.com/company/bgornaments"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <FaLinkedin size={20} className="text-[#0077B5]" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61574416178019"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <FaFacebook size={20} className="text-[#1877F2]" />
                </a>
                {/* <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <FaWhatsapp size={20} className="text-[#25D366]" />
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-brown-300 mt-6 pt-4">
          <div className="text-center">
            <p className="text-xs text-brown-700">
              © {new Date().getFullYear()} Bharat Gold Ornaments Pvt Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
