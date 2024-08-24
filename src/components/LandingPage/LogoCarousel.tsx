// src/components/LogoCarousel.tsx
import React, { useEffect, useRef } from 'react';
import colLogo1 from '/src/assets/colLogo1.png'
import colLogo2 from '/src/assets/colLogo2.png'
import colLogo3 from '/src/assets/colLogo3.png'
import colLogo4 from '/src/assets/colLogo4.png'
import colLogo5 from '/src/assets/colLogo5.png'
import certi from '/src/assets/Group 27.png'


const LogoCarousel: React.FC = () => {
  const logosRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const logos = logosRef.current;
    if (logos) {
      const clone = logos.cloneNode(true) as HTMLUListElement;
      clone.setAttribute('aria-hidden', 'true');
      logos.insertAdjacentElement('afterend', clone);
    }
  }, []);

  return (
    <div className='bg-[#fff9f5]'>
    <div
      className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] bg-[#fff9f5] py-10"
    >
      <ul
        ref={logosRef}
        className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
      >
        <li>
          <img src={colLogo1} alt="Facebook" className="md:w-[15vh] xl:w-[20vh]" />
        </li>
        <li>
          <img src={colLogo2} alt="Disney" className="md:w-[15vh] xl:w-[20vh]" />
        </li>
        <li>
          <img src={colLogo3} alt="Airbnb" className="md:w-[15vh] xl:w-[20vh]" />
        </li>
        <li>
          <img src={colLogo4} alt="Apple" className="md:w-[15vh] xl:w-[20vh]" />
        </li>
        <li>
          <img src={colLogo5} alt="Spark" className="md:w-[15vh] xl:w-[20vh]"/>
        </li>
      </ul>
    </div>

    <div className='bg-[#fff9f5] w-full h-80 flex flex-col mt-40'>
      <div className='my-20 bg-[#f5e8d7] h-1/2 flex justify-around items-center'>
          <div className='max-w-[40vw] text-customGreen xs:text-[1.5rem] md:text-[2rem] xl:text-[1.6rem] leading-tight text-center'>
              <h4>Proudly Recognized by the Government of India</h4>
              {/* <p>We are honored to have received official recognition from the Government of India as an innovative startup. This certificate highlights our commitment to pioneering new solutions and driving progress in our industry. It’s a testament to our dedication, innovation, and impact.</p>
               */}
          </div>
          <img src={certi} alt="" className='h-[40vh]' />
      </div>
    
    </div>
    </div>
  );

};

export default LogoCarousel;
