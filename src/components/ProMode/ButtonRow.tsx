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
    <div className="flex flex-wrap justify-start gap-1.5 mx-10 px-4 ml-2">
      {buttons.map((button, index) => (
        <button
          key={index}
          className="bg-[#f59699] text-white border border-white rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px] py-1.5 px-4 text-md cursor-pointer transition-colors duration-300 ease-in-out shadow-md hover:bg-[#B2801D] active:transform active:translate-y-0.5 padding-10"
          onClick={() => onButtonClick(button)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default ButtonRow;
