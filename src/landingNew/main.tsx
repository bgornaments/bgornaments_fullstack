import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import logo from "/src/assets/image.png";
import certImage from "/src/assets/cert.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { Lightbulb, Target, Puzzle, Globe, Smartphone, Clock } from "lucide-react";
import { FaComments, FaGem, FaRandom, FaTshirt, FaPencilAlt, FaStar } from "react-icons/fa";
import { useAuthenticator } from "@aws-amplify/ui-react";
// import Swal from "sweetalert2";
// import homepageimg1 from '/src/assets/homepageImg1.jpg';
import colLogo1 from "/src/assets/colLogo1.png";
import colLogo2 from "/src/assets/colLogo2.png";
import colLogo3 from "/src/assets/colLogo3.png";
import colLogo4 from "/src/assets/colLogo4.png";
import colLogo5 from "/src/assets/colLogo5.png";

gsap.registerPlugin(ScrollTrigger);

const FeatureCircle = ({ icon, text }: { icon: JSX.Element; text: string }) => (
  <div className="flex flex-col items-center text-center text-sm w-24">
    <div className="text-yellow-500 mb-1">{icon}</div>
    <p className="text-black text-lg">{text}</p>
  </div>
);

const LandingPage: React.FC = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const intro = introRef.current;
    if (!intro) return;

    const text = intro.querySelector<HTMLDivElement>(".intro-text");
    if (!text) return;

    const tl = gsap.timeline();

    requestAnimationFrame(() => {
      tl.to(text, {
        scale: 1.8,
        opacity: 0,
        duration: 1.2,
        ease: "power2.in",
        willChange: "transform, opacity",
      }).to(intro, {
        opacity: 0,
        duration: 2,
        pointerEvents: "none",
        onComplete: () => {
          intro.style.display = "none";
        },
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "Elastic.easeOut",
          scrollTrigger: {
            trigger: card,
            start: "top 80%", // Animation starts when card's top is 80% from the top of the viewport
            toggleActions: "play reverse play reverse",
          },
          delay: index * 0.2, // Stagger each card's animation
        }
      );
    });

    // Cleanup ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="px-0 font-custom">
      {/* Intro Animation Overlay */}
      <section
        ref={introRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: 9999,
        }}
      >
        <div
          className="intro-text"
          style={{
            fontSize: "8vw",
            fontWeight: 800,
            color: "#e0ae2a",
            transformOrigin: "center center",
            willChange: "transform, opacity",
          }}
        >
          <img src={logo} alt="KinMitra Logo" />
        </div>
      </section>

      {/* Header */}
      <header className="flex justify-between items-center py-6 border-b-2 border-gray-200 text-xl">
        <div className="flex items-center space-x-2 pl-8">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-40" />
          </Link>
        </div>
        <nav className="flex space-x-6 text-xl">
          <Link to="/" className='text-lg'>Home</Link>
          <Link to="/" className='text-lg'>Pricing</Link>
          <Link to="/" className='text-lg'>FAQs</Link>
          <Link to="/Contact-Us" className='text-lg'>Contact Us</Link>
        </nav>
        {user ? (
          <button
            onClick={signOut}
            className="border border-yellow-500 text-yellow-500 px-4 py-1 rounded text-lg mr-8"
          >
            Log Out
          </button>
        ) : (
          <Link to="/login">
            <button className="border border-yellow-500 text-yellow-500 px-4 py-1 rounded text-lg mr-8">
              Log In
            </button>
          </Link>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-[100vh] overflow-hidden text-white text-center flex flex-col justify-center items-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-[1.1] saturate-[1.2] sepia-[0.1]"
          src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/H2qwMhbkqkzg2flz4/videoblocks-646c7a82cdf8cd05c427ac1b_rrp7owas3__0405133d275c6b206830714a02f00c75__P360.mp4"
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.9) 90%)',
          }}
        />
        <div className="relative z-20 px-4">
          <h1 className="text-5xl font-bold mb-6 font-custom">Design Smarter. Create Faster.</h1>
          <p className="max-w-md mx-auto text-gray-200 text-xl mb-6">
            KinMitra revolutionizes the design journey with intelligent tools that help you ideate, visualize, and refine your creations — all in one place.
          </p>
          <div className="space-x-4">
            <Link to="/modes">
              <button className="bg-yellow-500 text-white px-5 py-2 rounded text-lg">Try the Design Studio</button>
            </Link>
            <a
              href="https://qflpgffwo9.execute-api.us-east-1.amazonaws.com/prod/redirect"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border border-yellow-500 text-yellow-500 px-5 py-2 rounded text-lg">See Video</button>
            </a>
          </div>
        </div>
      </section>

      {/* <section
        className="relative bg-cover bg-center text-white pt-32 pb-32 text-lg"
        style={{ backgroundImage: `url(${homepageimg1})` }}
      >
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.9) 90%)',
          }}
        />
        <div className="relative z-20 text-white text-center flex flex-col justify-center items-center h-full px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-5xl font-custom">Design Smarter. Create Faster.</h1>
          <p className="max-w-md text-gray-200 mb-6 text-xl">
            KinMitra revolutionizes the design journey with intelligent tools that help you ideate, visualize, and refine your creations — all in one place.
          </p>
          <div className="space-x-4">
            <button className="bg-yellow-500 text-white px-5 py-2 rounded text-lg">Try the Design Studio</button>
            <button className="border border-yellow-500 text-yellow-500 px-5 py-2 rounded text-lg">See Video</button>
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      {/* <section className="text-center px-4 py-16 bg-white">
        <h2 className="text-4xl font-semibold text-black mb-4 font-custom">
          Designed for Jewellery Designers
        </h2>
        <p className="text-gray-700 max-w-xl mx-auto mb-10 text-2xl">
          Say goodbye to guesswork and long hours spent sketching. KinMitra is your AI co-designer — helping you craft stunning jewellery designs fast.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <Feature icon={<Lightbulb />} text="AI-Driven Creativity" />
          <Feature icon={<Target />} text="Effortless Personalization" />
          <Feature icon={<Puzzle />} text="Synthesizable Designs" />
          <Feature icon={<Globe />} text="Web-based Platform" />
        </div>

        <div className="mt-4 flex justify-center">
          <Feature icon={<Smartphone />} text="Smartphone Operatable" />
        </div>
      </section> */}

      <section className="py-8 bg-white relative overflow-hidden px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:gap-8 px-4">
          {/* Left Column: Text */}
          <div className="md:w-1/2 text-left">
            <h2 className="text-5xl font-semibold text-[#e0ae2a] mb-6 font-custom tracking-wide">
              Designed for Jewellery Designers
            </h2>
            <p className="text-gray-700 max-w-lg mb-16 text-xl text-center mt-16">
              Say goodbye to guesswork and long hours spent sketching. <br />KinMitra is your AI co-designer — helping you craft stunning jewellery designs fast.
            </p>
          </div>

          {/* Right Column: Circular Animation with Logo */}
          <div className="md:w-1/2 flex justify-end">
            <div className="relative w-[500px] h-[500px]">
              {/* Rotating container */}
              <div className="absolute inset-0 animate-spin-slow">
                {/* 6 evenly spaced features */}
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2">
                  <div className="animate-counter-spin">
                    <FeatureCircle icon={<Lightbulb size={28} />} text="AI Creativity" />
                  </div>
                </div>

                <div className="absolute top-[25%] right-[-5px] -translate-y-1/2">
                  <div className="animate-counter-spin">
                    <FeatureCircle icon={<Target size={28} />} text="Personalization" />
                  </div>
                </div>

                <div className="absolute bottom-[25%] right-[-5px] translate-y-1/2">
                  <div className="animate-counter-spin">
                    <FeatureCircle icon={<Puzzle size={28} />} text="Synthesizable" />
                  </div>
                </div>

                <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2">
                  <div className="animate-counter-spin">
                    <FeatureCircle icon={<Globe size={28} />} text="Web App" />
                  </div>
                </div>

                <div className="absolute bottom-[25%] left-[-5px] translate-y-1/2">
                  <div className="animate-counter-spin">
                    <FeatureCircle icon={<Smartphone size={28} />} text="Mobile Use" />
                  </div>
                </div>

                <div className="absolute top-[25%] left-[-5px] -translate-y-1/2">
                  <div className="animate-counter-spin">
                    <FeatureCircle icon={<Clock size={28} />} text="Time Saver" />
                  </div>
                </div>
              </div>

              {/* Center Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={logo} alt="KinMitra Logo" className="w-40 h-32 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='h-1vh bg-black'></div>

      {/* What's Inside Section */}
      <section className="bg-[#fdf7f2] py-16 px-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center font-custom mb-2">What's Inside KinMitra</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl text-xl">
          Discover our powerful AI-powered tools designed to revolutionize your jewelry design experience
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          {[
            {
              icon: <FaComments className="text-[#e0ae2a]-500" />,
              title: "Intelligent Design Chat",
              desc: "Engage with our AI assistant to bring your jewelry ideas to life through natural conversation",
              bg: "bg-[#e0ae2a]-100",
            },
            {
              icon: <FaGem className="text-blue-500" />,
              title: "Jewelry Set Generation",
              desc: "Create complete, coordinated jewelry sets with our advanced AI generation system",
              bg: "bg-blue-100",
            },
            {
              icon: <FaRandom className="text-green-500" />,
              title: "Design Variation Generation",
              desc: "Explore multiple design variations with a single click using our AI algorithm",
              bg: "bg-green-100",
            },
            {
              icon: <FaTshirt className="text-red-500" />,
              title: "Outfit Matching Suggestions",
              desc: "Get perfect jewelry recommendations that complement your outfits",
              bg: "bg-red-100",
            },
            {
              icon: <FaPencilAlt className="text-yellow-500" />,
              title: "Sketch-to-Design Conversion",
              desc: "Transform your hand-drawn sketches into professional jewelry designs instantly",
              bg: "bg-yellow-100",
            },
            {
              icon: <FaStar className="text-indigo-500" />,
              title: "Astrology-Based Personalization",
              desc: "Create designs influenced by celestial alignments and zodiac elements",
              bg: "bg-indigo-100",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-start"
            >
              <div className={`${feature.bg} p-3 rounded-full mb-4 text-lg`}>
                {feature.icon}
              </div>
              <h2 className="text-lg font-semibold mb-2">{feature.title}</h2>
              <p className="text-gray-600 text-xl">{feature.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 mt-10 text-xl">And many more Premium Features!</p>
      </section>

      {/* Personalized Design Section*/}
      <section className="text-center py-12 font-serif">
        <h2 className="text-4xl font-bold mb-12 text-[#e0ae2a] font-custom text-5xl">
          Personalised Design Made Easy
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-12 px-4">
          {/* Card 1 */}
          <div className="flex flex-col items-center max-w-xs">
            <img
              src="https://storage.googleapis.com/a1aa/image/eVXiQw98MZad6YcOtEjXYGNR3T6xQg3ko7c6mGL2P6c.jpg"
              alt="Custom Designs"
              width={100}
              height={100}
              className="mb-4 rounded"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Custom Designs Just for You.
            </h3>
            <p className="text-gray-600">
              Leverage AI to create personalized jewellery designs tailored to your unique style. Answer a few questions and let AI do the rest.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center max-w-xs">
            <img
              src="https://storage.googleapis.com/a1aa/image/ShklPBgaQqD95r8-XiXf9_HLKSufnszVLGBwkklUlg8.jpg"
              alt="Interactive Design"
              width={100}
              height={100}
              className="mb-4 rounded"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Interactive Design Process.
            </h3>
            <p className="text-gray-600">
              Share your preferences by answering a few simple questions, and our AI will generate initial jewellery design concepts for you.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center max-w-xs">
            <img
              src="https://storage.googleapis.com/a1aa/image/0ZmeRP-t3G7iUN4BMUkj3ZYJIN2cv3xlxfVvu4e6lWI.jpg"
              alt="Tailored Designs"
              width={100}
              height={100}
              className="mb-4 rounded"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Tailored to Your Taste.
            </h3>
            <p className="text-gray-600">
              Our AI will ask additional questions to refine the designs, ensuring the final pieces match your unique style and preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Logo Carousel Section */}
      <section className="bg-[#fefaf2] flex flex-col justify-center items-center mt-10">
        <h3 className="text-5xl font-custom text-darkGolden mb-6 mt-12">
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
            className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
          >
            <li>
              <img
                src={colLogo1}
                alt="Logo 1"
                className="w-[20vh] md:w-[15vh] xl:w-[24vh]"
              />
            </li>
            <li>
              <img
                src={colLogo2}
                alt="Logo 2"
                className="w-[20vh] md:w-[15vh] xl:w-[24vh]"
              />
            </li>
            <li>
              <img
                src={colLogo3}
                alt="Logo 3"
                className="w-[20vh] md:w-[15vh] xl:w-[24vh]"
              />
            </li>
            <li>
              <img
                src={colLogo4}
                alt="Logo 4"
                className="w-[20vh] md:w-[15vh] xl:w-[24vh]"
              />
            </li>
            <li>
              <img
                src={colLogo5}
                alt="Logo 5"
                className="w-[20vh] md:w-[15vh] xl:w-[24vh]"
              />
            </li>
          </ul>
        </div>
      </section>
      {/* Certificate Section */}
      <section className="bg-[#FFFBF6] py-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
          <div className="md:w-1/2 px-8">
            <h2 className="text-5xl font-custom text-darkGolden mb-6">Proudly Recognized by the Government of India</h2>
            <p className="text-xl text-gray-700 mb-6 text">
              We are proud to be officially recognized by the Government of India as an innovative brand, reflecting our commitment to preserving culture and driving industry progress.
              This recognition underscores our dedication to innovation and impact.
            </p>
            <a
              href="https://recognition-be.startupindia.gov.in/s3/download/document/RECOGNITION_CERTIFICATE/c9c3cdf7-e66a-431e-8444-f8335f384985.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-yellow-500 text-white px-5 py-2 rounded text-lg">View Certificate</button>
            </a>
          </div>
          <div className="md:w-1/2 px-8">
            <img
              src={certImage}
              alt="Certificate"
              className="rounded shadow"
            />
          </div>
        </div>
      </section>

      {/* Book a Demo Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto border border-#F8F8F8-500 rounded-lg p-1">
          <div className="flex flex-col md:flex-row overflow-hidden">
            {/* Left Panel */}
            <div className="md:w-1/2 bg-[#F8F8F8] p-6 space-y-4">
              <h3 className="font-custom text-5xl text-[#e0ae2a] mb-4">Book a Demo</h3>
              <p className="text-lg text-gray-700 mb-4">Book a free demo to explore features tailored to you. Get expert guidance.</p>
              <div>
                <p className='text-lg mt-4 mb-4'>📞 +91 (931) 008-5981</p>
                <p className='text-lg mt-4 mb-4'>✉️ ceo@kinmitra.com</p>
                <div className="flex space-x-4 mt-4 text-xl mt-4">
                  <a className="text-gray-600 hover:text-gray-800" href="https://www.facebook.com/profile.php?id=61574416178019" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                  <a className="text-gray-600 hover:text-gray-800" href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                  <a className="text-gray-600 hover:text-gray-800" href="https://instagram.com/kinmitra_com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                  <a className="text-gray-600 hover:text-gray-800" href="https://linkedin.com/company/bgornaments" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                  <a className="text-gray-600 hover:text-gray-800" href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="md:w-1/2 p-6 bg-white space-y-4">
              <div className="flex space-x-2">
                <input type="text" placeholder="First Name" className="w-1/2 border px-3 py-2 text-sm rounded" />
                <input type="text" placeholder="Last Name" className="w-1/2 border px-3 py-2 text-sm rounded" />
              </div>
              <input type="text" placeholder="Phone Number" className="w-full border px-3 py-2 text-sm rounded" />
              <input type="email" placeholder="Email" className="w-full border px-3 py-2 text-sm rounded" />
              <textarea placeholder="Write your message..." className="w-full border px-3 py-2 text-sm rounded h-24" />
              <button className="bg-yellow-500 text-white px-4 py-2 rounded text-base">Send Message</button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 px-8">
        <div className="max-w-6xl mx-auto flex justify-center">
          <div className="bg-[#FEFAF5] rounded-tl-[50px] rounded-br-lg p-8 w-full">
            <h4 className="text-2xl font-custom mb-6 text-center">
              Subscribe to get the latest jewelry trends, style tips, and exclusive offers from KinMitra.
            </h4>
            <div className="flex flex-col sm:flex-row justify-center space-x-4 w-[90%] mx-auto">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 border px-4 py-3 rounded-l text-sm"
              />
              <button className="bg-yellow-500 text-white px-6 py-3 rounded-r text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-[#f8f8f8] py-8 text-sm text-gray-600 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <Link to="/">
              <img src={logo} alt="Company Logo" className="mb-4 w-32" />
            </Link>
            <p className="text-center md:text-left mb-4 text-2xl font-custom">
              Your Style, Our Craftsmanship — Together,
              <br />
              We Sparkle with Elegance.
            </p>
            <div className="flex space-x-4 text-xl">
              <a className="text-gray-600 hover:text-gray-800" href="https://www.facebook.com/profile.php?id=61574416178019" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a className="text-gray-600 hover:text-gray-800" href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a className="text-gray-600 hover:text-gray-800" href="https://instagram.com/kinmitra_com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a className="text-gray-600 hover:text-gray-800" href="https://linkedin.com/company/bgornaments" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a className="text-gray-600 hover:text-gray-800" href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row md:space-x-16 text-center md:text-left">
            <div className="mb-6 md:mb-0">
              <h3 className="text-gray-800 font-bold mb-4 text-2xl font-custom">Company</h3>
              <ul className="space-y-2">
                <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/">Home</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/">Our Work</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/catalog">AI Design</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/">Pricing</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/Contact-Us">Contact Us</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/kinmitra_team">Our Team</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-gray-800 font-bold mb-4 text-2xl font-custom">Support</h3>
              <ul className="space-y-2">
                <li className="text-gray-600 text-base">+91 (835) 608-5861</li>
                <li className="text-gray-600 text-base">ceo@kinmitra.com</li>
              </ul>
              <div className="mt-4">
                <a href="/privacy-Notice" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 text-base block">Privacy Notice</a>
                <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 text-base block mt-1">Terms & Conditions</a>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom copyright */}
        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-xs text-gray-500">
          Copyright © 2025 KinMitra. All rights reserved. <br /> Unauthorized reproduction or distribution is prohibited.
          KinMitra is a registered trademark of BG Ornaments Pvt. Ltd.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;