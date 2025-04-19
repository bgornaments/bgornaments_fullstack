import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import logo from "/src/assets/image.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaComments, FaGem, FaRandom, FaTshirt, FaPencilAlt, FaStar } from "react-icons/fa";
import Navbar from './navbar';
import FeaturesSection from './FeaturesSection';
import HeroSection from './HeroSection';
import AssociationsAndCertifications from './AssociationsAndCertifications';
import BookDemoSection from './BookADemo';
import Faqs from './FAQs';

gsap.registerPlugin(ScrollTrigger);

const LandingPage: React.FC = () => {
  const introRef = useRef<HTMLDivElement>(null);
  const demoSectionRef = useRef<HTMLDivElement>(null);
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
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
          delay: index * 0.2,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Improved scroll to demo section function
  const scrollToDemoSection = () => {
    // Add a small delay to ensure the ref is properly attached
    setTimeout(() => {
      if (demoSectionRef.current) {
        const yOffset = -100; // Offset to account for fixed header
        const y = demoSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <div className="px-0 font-custom">
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
            transformOrigin: "center center",
            willChange: "transform, opacity",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "40%",
            padding: "0 5vw",
            boxSizing: "border-box",
          }}
        >
          <img
            src={logo}
            alt="KinMitra Logo"
            style={{
              width: "100%",
              maxWidth: "70vw",
              height: "auto",
            }}
          />
        </div>
      </section>

      {/* Header */}
      <Navbar onContactClick={scrollToDemoSection} />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Spacing */}
      <div className='h-1vh bg-black'></div>

      {/* What's Inside Section */}
      <section className="bg-[#fdf7f2] py-16 px-6 flex flex-col items-center">
        <h1 className="font-bold mb-4 text-[#e0ae2a] text-center font-custom text-5xl ">What's Inside KinMitra</h1>
        <p className="text-center text-gray-600 mb-12 max-w-6xl text-xl">
          Discover our powerful AI-powered tools designed to revolutionize your jewellery design experience
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          {[
            {
              icon: <FaComments className="text-[#e0ae2a]-500" />,
              title: "Intelligent Design Chat",
              desc: "Engage with our AI assistant to bring jewellery ideas to life through natural conversation",
              bg: "bg-orange-100",
            },
            {
              icon: <FaGem className="text-blue-500" />,
              title: "Jewellery Set Generation",
              desc: "Create complete, coordinated jewellery sets with our advanced AI generation system",
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
              title: "Outfit Matching Jewellery",
              desc: "Get perfect jewellery recommendations that complement your outfits",
              bg: "bg-red-100",
            },
            {
              icon: <FaPencilAlt className="text-yellow-500" />,
              title: "Sketch-to-Design Conversion",
              desc: "Transform your hand-drawn sketches into professional jewellery designs instantly",
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
        <p className="text-center text-gray-600 mt-10 text-xl">And many more premium features !!!</p>
      </section>

      {/* Personalized Design Section */}
      <section className="text-center py-12 font-serif">
        <h2 className="font-bold mb-12 text-[#e0ae2a] font-custom text-5xl">
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

      <AssociationsAndCertifications />
      
      <Faqs/>

      {/* Book a Demo Section with ID for direct linking */}
      <div id="book-demo-section" ref={demoSectionRef}>
        <BookDemoSection />
      </div>

      {/* Newsletter */}
      <section className="py-12 px-8">
        <div className="max-w-6xl mx-auto flex justify-center">
          <div className="bg-[#FEFAF5] rounded-tl-[50px] rounded-br-lg p-8 w-full">
            <h4 className="text-2xl font-custom mb-6 text-center">
              Subscribe to get the latest jewellery trends, style tips, and exclusive offers from KinMitra.
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
            <p className="text-center md:text-left mb-4 text-base">
              Design Smarter. Create Faster.
              <br />
              Join the jewellery design revolution.
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
          KinMitra is a registered trademark of Bharat Gold Ornaments Pvt. Ltd.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;