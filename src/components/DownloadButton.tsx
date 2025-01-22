import React from 'react';
import 'font-awesome/css/font-awesome.min.css';  

interface DownloadButtonProps {
  imageUrl: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl }) => {
  const handleDownload = () => {
    const sessionId = localStorage.getItem('session_id') || sessionStorage.getItem('session_id');
    const imageName = sessionId ? `kinmitra_${sessionId}` : 'kinmitra';

    const link = document.createElement('a');
    link.href = imageUrl;

    link.download = imageName;

    if (imageUrl.startsWith('data:image')) {
      link.click();
    } else {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', imageUrl, true);
      xhr.responseType = 'blob';
      xhr.onload = function () {
        const blob = xhr.response;
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.click();
        URL.revokeObjectURL(url); // Clean up the URL after downloading
      };
      xhr.send();
    }
  };

  return (
    <button 
      className="bg-green-500 hover:bg-yellow-500 active:bg-red-500 text-white p-3 rounded-full flex justify-center items-center transition-all"
      onClick={handleDownload}
    >
      <i className="fa fa-download text-xl"></i>  {/* Font Awesome download icon */}
    </button>
  );
};

export default DownloadButton;
