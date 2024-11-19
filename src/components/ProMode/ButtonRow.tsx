// import React from 'react';

// interface Button {
//   text: string;
//   value: string;
// }

// interface ButtonRowProps {
//   buttons: Button[];
//   onButtonClick: (button: Button) => void;
// }

// const ButtonRow: React.FC<ButtonRowProps> = ({ buttons, onButtonClick }) => {
//   return (
//     <div className="button-row">
//       {buttons.map((button, index) => (
//         <button 
//           key={index} 
//           className="response-button" 
//           onClick={() => onButtonClick(button)}
//         >
//           {button.text}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default ButtonRow;

import React from 'react';

interface Button {
  text: string;
  value: string;
}

interface ButtonRowProps {
  buttons: Button[];
  onButtonClick: (button: Button) => void;
}

const ButtonRow: React.FC<ButtonRowProps> = ({ buttons, onButtonClick }) => {
  return (
    <div className="flex flex-wrap justify-center gap-1.5 my-3">
      {buttons.map((button, index) => (
        <button
          key={index}
          className="bg-[#f59696] text-white border-none rounded-full py-2.5 px-5 text-lg cursor-pointer transition-colors duration-300 ease-in-out shadow-md hover:bg-[#B2801D] active:transform active:translate-y-0.5"
          onClick={() => onButtonClick(button)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default ButtonRow;
