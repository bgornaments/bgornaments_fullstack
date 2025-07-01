import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarVisible, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route); // Navigate to the desired route
    toggleSidebar(); // Close the sidebar
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSidebar();
  };

  // Don't render anything if sidebar is not visible
  if (!isSidebarVisible) {
    return null;
  }

  return (
    <>
      {/* Overlay - Covers entire viewport */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
        onClick={handleOverlayClick}
        style={{ pointerEvents: 'auto' }}
      />
      
      {/* Sidebar - Highest z-index */}
      <div
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-[9999] transform translate-x-0 transition-transform duration-300 ease-in-out"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 border-b border-yellow-300">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">More Features</h2>
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-red-500 text-xl font-bold focus:outline-none transition-colors duration-200"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4">
          <ul className="space-y-3">
            <li
              className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-yellow-50 transition-colors duration-200 border border-transparent hover:border-yellow-200"
              onClick={() => handleNavigation('/promode/ImageVariation')}
            >
              <span className="text-gray-700 font-medium">Image Variation</span>
            </li>
            <li
              className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-yellow-50 transition-colors duration-200 border border-transparent hover:border-yellow-200"
              onClick={() => handleNavigation('/promode/SetGeneration')}
            >
              <span className="text-gray-700 font-medium">Set Generation</span>
            </li>
            <li
              className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-yellow-50 transition-colors duration-200 border border-transparent hover:border-yellow-200"
              onClick={() => handleNavigation('/promode/Feature3')}
            >
              <span className="text-gray-700 font-medium">Feature 3</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
