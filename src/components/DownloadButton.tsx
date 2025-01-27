// // import React from 'react';

// // interface DownloadButtonProps {
// //   imageUrl: string;
// // }

// // const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl }) => {
// //   return (
// //     <a href={imageUrl} download="kinmitra_images">
// //       <button className="download-button">Download</button>
// //     </a>
// //   );
// // };

// // export default DownloadButton;
// // // import React from "react";
// // // import { getUrl } from "aws-amplify/storage";

// // // interface DownloadButtonProps {
// // //   imgUrl: string;
// // // }

// // // const DownloadButton: React.FC<DownloadButtonProps> = ({ imgUrl }) => {
// // //   const handleDownload = async () => {
// // //     try {
// // //       const { url } = await getUrl({
// // //         path: imgUrl,
// // //         options: {
// // //           bucket: "Bucket Name",
// // //           expiresIn: 900,
// // //           validateObjectExistence: true,
// // //         },
// // //       });

// // //       const link = document.createElement("a");
// // //       link.href = url.toString();
// // //       link.download = "kinmitra_session_id.jpg";
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       document.body.removeChild(link);
// // //     } catch (error) {
// // //       console.error("Download failed:", error);
// // //     }
// // //   };

// // //   return <button onClick={handleDownload}>Download Image</button>;
// // // };

// // // export default DownloadButton;
// import React from 'react';

// interface DownloadButtonProps {
//   imageUrl: string;
// }

// const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl }) => {
//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.href = imageUrl;
//     link.download = `kinmitra_${localStorage.getItem('sessionId') || 'image'}`;
//     link.click();
//   };

//   return (
//     <button
//       onClick={handleDownload}
//       className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//     >
//       Download
//     </button>
//   );
// };

// export default DownloadButton;
import React from 'react';

interface DownloadButtonProps {
  imageUrl: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `kinmitra_${localStorage.getItem('sessionId') || 'image'}`;
    link.click();
  };

  return (
    <button
      onClick={handleDownload}
      className="p-2 bg-transparent rounded-full hover:opacity-80"
      title="Download Image"
    >
      <img
        src="/src/assets/download_gif.gif"
        alt="Download"
        className="w-6 h-6"
      />
    </button>
  );
};

export default DownloadButton;
