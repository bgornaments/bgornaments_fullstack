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
    <div className="button-row">
      {buttons.map((button, index) => (
        <button
          key={index}
          className="response-button"
          onClick={() => onButtonClick(button)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default ButtonRow;
