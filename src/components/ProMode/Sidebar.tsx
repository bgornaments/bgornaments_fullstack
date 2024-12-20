// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// interface SidebarProps {
//   isSidebarVisible: boolean;
//   toggleSidebar: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ isSidebarVisible, toggleSidebar }) => {
//   const navigate = useNavigate();

//   const handleNavigation = (route: string) => {
//     navigate(route); // Navigate to the desired route
//     toggleSidebar(); // Close the sidebar
//   };

//   return (
//     <div
//       className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform ${
//         isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
//       } transition-transform duration-300 ease-in-out z-50`}
//     >
//       <div className="p-4">
//         <h2 className="text-lg font-bold mb-4">More Features</h2>
//         <ul className="space-y-2">
//           <li
//             className="text-gray-700 cursor-pointer"
//             onClick={() => handleNavigation('/promode/ImageVariation')}
//           >
//             Image Variation
//           </li>
//           <li
//             className="text-gray-700 cursor-pointer"
//             onClick={() => handleNavigation('/set-generation')}
//           >
//             Set Generation
//           </li>
//           <li
//             className="text-gray-700 cursor-pointer"
//             onClick={() => handleNavigation('/feature3')}
//           >
//             Feature 3
//           </li>
//         </ul>
//       </div>
//       <button
//         onClick={toggleSidebar}
//         className="absolute top-4 right-4 text-gray-700 text-lg focus:outline-none"
//       >
//         ✕
//       </button>
//     </div>
//   );
// };

// export default Sidebar;

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

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform ${
        isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">More Features</h2>
        <ul className="space-y-2">
          <li
            className="text-gray-700 cursor-pointer"
            onClick={() => handleNavigation('/promode/ImageVariation')}
          >
            Image Variation
          </li>
          <li
            className="text-gray-700 cursor-pointer"
            onClick={() => handleNavigation('/promode/SetGeneration')}
          >
            Set Generation
          </li>
          <li
            className="text-gray-700 cursor-pointer"
            onClick={() => handleNavigation('/promode/Feature3')}
          >
            Feature 3
          </li>
        </ul>
      </div>
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 text-gray-700 text-lg focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
};

export default Sidebar;
