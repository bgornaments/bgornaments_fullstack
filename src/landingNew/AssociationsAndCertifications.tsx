import React from "react";
// import colLogo1 from "/src/assets/colLogo1.png";
// import colLogo2 from "/src/assets/colLogo2.png";
// import colLogo3 from "/src/assets/colLogo3.png";
// import colLogo4 from "/src/assets/colLogo4.png";
// import colLogo5 from "/src/assets/colLogo5.png";
import certImage from "/src/assets/cert.png";

const AssociationsAndCertificate: React.FC = () => {
  return (
    <section>
      {/* Combined Logo Carousel */}
      {/* <div className="bg-[#fefaf2] flex flex-col justify-center items-center mt-10 px-4">
        <h3 className="text-4xl sm:text-4xl md:text-5xl font-custom text-[#e0ae2a] mb-6 mt-12 text-center">
          Associations and Certifications
        </h3>

        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] my-6 md:my-10">
          <ul
            ref={(el) => {
              if (el && el.nextSibling === null) {
                const clone = el.cloneNode(true) as HTMLUListElement;
                clone.setAttribute("aria-hidden", "true");
                el.insertAdjacentElement("afterend", clone);
              }
            }}
            className="flex items-center justify-center md:justify-start [&_li]:mx-6 [&_img]:max-w-none animate-infinite-scroll"
          >
            {[colLogo2, colLogo4, colLogo5].map(
              (logo, index) => (
                <li key={index}>
                  <img
                    src={logo}
                    alt={`Logo ${index + 1}`}
                    className="w-[14vh] sm:w-[18vh] md:w-[15vh] xl:w-[24vh]"
                  />
                </li>
              )
            )}
          </ul>
        </div>
      </div> */}

      {/* Certificate Section */}
      <div className="bg-[#FFFBF6] py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left px-4 sm:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-custom text-[#e0ae2a] mb-4">
              Proudly Recognized by the Government of India
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6">
              We are proud to be officially recognized by the Government of
              India as an innovative brand, reflecting our commitment to
              preserving culture and driving industry progress. This recognition
              underscores our dedication to innovation and impact.
            </p>
            <a
              href="https://recognition-be.startupindia.gov.in/s3/download/document/RECOGNITION_CERTIFICATE/c9c3cdf7-e66a-431e-8444-f8335f384985.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-yellow-500 text-white px-6 py-3 rounded text-base sm:text-lg">
                View Certificate
              </button>
            </a>
          </div>
          <div className="w-full md:w-1/2 flex justify-center px-4 sm:px-8">
            <img
              src={certImage}
              alt="Certificate"
              className="rounded shadow max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssociationsAndCertificate;
