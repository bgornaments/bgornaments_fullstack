/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import logo from './assets/image.png';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  // State to track which letters are selected/highlighted
  const [selectedLetters,] = useState<{ [key: number]: boolean }>({
    12: true, 13: true, 14: true, // "404"
    26: true, 27: true, 28: true, 29: true, // "page"
    33: true, 34: true, 35: true, // "not"
    50: true, 51: true, 52: true, 53: true, 54: true // "found"
  });

  const letters = [
    'k', 'v', 'n', 'z', 'i', 'x', 'm', 'e', 't', 'a', 'x', 'l',
    '4', '0', '4', 'y', 'y', 'w', 'v', 'b', 'o', 'q', 'd', 'y',
    'p', 'a', 'p', 'a', 'g', 'e', 'v', 'j', 'a', 'n', 'o', 't',
    's', 'c', 'e', 'w', 'v', 'x', 'e', 'p', 'c', 'f', 'h', 'q',
    'e', 'z', 'f', 'o', 'u', 'n', 'd', 's', 'w', 'q', 'v', 'o', 's',
    'm', 'v', 'f'
  ];

  const gridSize = 8;

  const styles = {
    body: {
      fontFamily: 'Source Sans Pro, sans-serif',
      WebkitFontSmoothing: 'antialiased',
      margin: '0px',
      backgroundColor: '#335B67',
      background: 'radial-gradient(ellipse at center, #335B67 0%, #2C3E50 100%)',
      color: 'white',
      minHeight: '100vh',
      padding: '0',
    },
    wrap: {
      width: '90%',
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative' as const,
      paddingTop: '4%',
      display: 'flex',
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      justifyContent: 'space-between',
      gap: '40px',
    },
    wordsearch: {
      width: '45%',
      aspectRatio: '1/1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    wordsearchContainer: {
      width: '100%',
      height: '100%',
      padding: '20px',
      boxSizing: 'border-box' as const,
    },
    wordsearchUl: {
      margin: '0',
      padding: '0',
      display: 'grid',
      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      gridTemplateRows: `repeat(${gridSize}, 1fr)`,
      gap: '4px',
      width: '100%',
      height: '100%',
    },
    wordsearchLi: {
      backgroundColor: 'rgba(0,0,0,.2)',
      listStyle: 'none',
      padding: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'rgba(255,255,255,0.7)',
      textTransform: 'uppercase' as const,
      fontSize: 'calc(2vw + 2px)',
      fontWeight: 300,
      transition: 'background-color 0.75s ease',
      aspectRatio: '1/1',
    },
    selectedLi: {
      backgroundColor: 'rgba(26,188,156,0.7)',
      color: 'rgba(255,255,255,1)',
      fontWeight: 400,
    },
    mainContent: {
      width: '45%',
      aspectRatio: '1/1',
      fontWeight: 300,
      fontSize: '20px',
      lineHeight: '30px',
      color: '#000',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backgroundImage: 'repeating-radial-gradient(circle at 0 0, transparent 0, #ffffff 10px), repeating-linear-gradient(#e0ae2a55, #e0ae2a)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRadius: '12px',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'flex-start',
      padding: '40px',
      boxSizing: 'border-box' as const,
    },
    h1: {
      margin: '0',
      fontWeight: 400,
      fontSize: '44px',
      marginBottom: '40px',
      lineHeight: 'normal',
    },
    search: {
      marginTop: '30px',
    },
    searchInput: {
      width: '88%',
      height: '41px',
      paddingLeft: '15px',
      boxSizing: 'border-box' as const,
      backgroundColor: 'rgba(0,0,0,0.2)',
      border: 'none',
      outline: 'none',
      fontSize: '18px',
      fontWeight: 300,
      color: 'white',
      fontFamily: 'Source Sans Pro, sans-serif',
      transition: 'all 0.5s ease',
      borderRadius: '0px',
    },
    navigation: {
      marginTop: '2%',
      display: 'flex',
      flexWrap: 'wrap' as const,
    },
    navigationLink: {
      display: 'block',
      backgroundColor: 'rgba(0,0,0,0.2)',
      paddingLeft: '15px',
      paddingRight: '15px',
      color: 'white',
      height: '41px',
      lineHeight: '41px',
      textDecoration: 'none',
      fontSize: '18px',
      transition: 'all 0.5s ease',
      marginRight: '2%',
      marginBottom: '2%',
      borderBottom: 'none',
    },
    a: {
      color: 'white',
      textDecoration: 'none',
      borderBottom: '1px solid rgba(255,255,255,0.5)',
      transition: 'all 0.5s ease',
      marginRight: '10px',
    },
    pageContainer: {
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#335B67',
      background: 'radial-gradient(ellipse at center, #335B67 0%, #2C3E50 100%)',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'flex-start' as const,
      padding: '0',
      margin: '0',
    },
    logoContainer: {
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    logoImage: {
      maxWidth: '192px',
      height: 'auto',
      display: 'block',
    },
    homeButton: {
      display: 'inline-block',
      marginTop: '30px',
      padding: '12px 30px',
      backgroundColor: 'transparent',
      color: '#000',
      border: '2px solid #000',
      borderRadius: '4px',
      fontSize: '18px',
      fontWeight: 500,
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center' as const,
      alignSelf: 'flex-start',
    },
    homeButtonContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      width: '100%',
      marginTop: '10px',
    },
    paragraph: {
      margin: '0 0 15px 0',
    }
  };

  const getResponsiveStyles = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let dynamicStyles = {};

    // For large screens: place side by side
    if (width >= 820 && height >= 1500) {
      dynamicStyles = {
        ...dynamicStyles,
        wrap: {
          ...styles.wrap,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '40px'
        },
        wordsearch: {
          ...styles.wordsearch,
          width: '48%'
        },
        mainContent: {
          ...styles.mainContent,
          width: '48%',
          height: 'auto',
          aspectRatio: 'auto'
        },
        h1: {
          ...styles.h1,
          fontSize: '38px'
        }
      };
    }
    // For regular screens: follow the existing responsive design
    else if (width <= 1200 && width > 900) {
      dynamicStyles = {
        ...dynamicStyles,
        wordsearchLi: {
          ...styles.wordsearchLi,
          fontSize: 'calc(2.2vw + 2px)'
        },
        logoImage: {
          ...styles.logoImage,
          maxWidth: '172px'
        }
      };
    }
    // For medium screens: stack vertically
    else if (width <= 900 && width > 500) {
      dynamicStyles = {
        ...dynamicStyles,
        wrap: {
          ...styles.wrap,
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px'
        },
        wordsearch: {
          ...styles.wordsearch,
          width: '90%',
          maxWidth: '500px'
        },
        mainContent: {
          ...styles.mainContent,
          width: '90%',
          maxWidth: '500px',
          height: 'auto',
          aspectRatio: 'auto'
        },
        wordsearchLi: {
          ...styles.wordsearchLi,
          fontSize: 'calc(4vw + 2px)'
        },
        homeButtonContainer: {
          ...styles.homeButtonContainer,
          justifyContent: 'center',
        },
        homeButton: {
          ...styles.homeButton,
          alignSelf: 'center',
        },
        h1: {
          ...styles.h1,
          fontSize: '34px',
          marginBottom: '25px'
        }
      };
    }
    // For small screens: w<=500 and h<=1100
    else if (width <= 500 && height <= 1100) {
      dynamicStyles = {
        ...dynamicStyles,
        wrap: {
          ...styles.wrap,
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          width: '95%',
          paddingTop: '2%'
        },
        wordsearch: {
          ...styles.wordsearch,
          width: '100%',
          aspectRatio: '1/0.7', // Smaller in height
          maxHeight: '35vh'
        },
        wordsearchContainer: {
          ...styles.wordsearchContainer,
          padding: '10px'
        },
        wordsearchUl: {
          ...styles.wordsearchUl,
          gap: '2px'
        },
        mainContent: {
          ...styles.mainContent,
          width: '100%',
          aspectRatio: 'auto',
          padding: '15px',
          height: 'auto'
        },
        h1: {
          ...styles.h1,
          fontSize: '22px',
          marginBottom: '10px'
        },
        logoContainer: {
          ...styles.logoContainer,
          marginBottom: '10px'
        },
        logoImage: {
          ...styles.logoImage,
          maxWidth: '100px'
        },
        wordsearchLi: {
          ...styles.wordsearchLi,
          fontSize: 'calc(5vw + 2px)'
        },
        homeButton: {
          ...styles.homeButton,
          padding: '8px 20px',
          fontSize: '14px',
          marginTop: '10px'
        },
        homeButtonContainer: {
          ...styles.homeButtonContainer,
          justifyContent: 'center',
          marginTop: '5px'
        },
        paragraph: {
          ...styles.paragraph,
          fontSize: '16px',
          lineHeight: '22px',
          margin: '0 0 10px 0'
        }
      };
    }
    // For small screens but taller
    else if (width <= 500) {
      dynamicStyles = {
        ...dynamicStyles,
        wrap: {
          ...styles.wrap,
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        },
        wordsearch: {
          ...styles.wordsearch,
          width: '100%'
        },
        mainContent: {
          ...styles.mainContent,
          width: '100%',
          padding: '20px',
          fontSize: '18px',
          lineHeight: '24px',
          height: 'auto',
          aspectRatio: 'auto'
        },
        h1: {
          ...styles.h1,
          fontSize: '26px',
          marginBottom: '15px'
        },
        wordsearchLi: {
          ...styles.wordsearchLi,
          fontSize: 'calc(6vw + 2px)'
        },
        logoImage: {
          ...styles.logoImage,
          maxWidth: '120px'
        },
        logoContainer: {
          ...styles.logoContainer,
          marginBottom: '15px'
        },
        homeButton: {
          ...styles.homeButton,
          padding: '10px 20px',
          fontSize: '16px',
          marginTop: '15px'
        },
        homeButtonContainer: {
          ...styles.homeButtonContainer,
          justifyContent: 'center',
        },
        paragraph: {
          ...styles.paragraph,
          fontSize: '16px',
          lineHeight: '24px'
        }
      };
    }

    return dynamicStyles;
  };

  const [responsiveStyles, setResponsiveStyles] = useState<{
    wrap?: React.CSSProperties;
    wordsearch?: React.CSSProperties;
    wordsearchContainer?: React.CSSProperties;
    wordsearchUl?: React.CSSProperties;
    wordsearchLi?: React.CSSProperties;
    mainContent?: React.CSSProperties;
    h1?: React.CSSProperties;
    logoImage?: React.CSSProperties;
    logoContainer?: React.CSSProperties;
    homeButton?: React.CSSProperties;
    homeButtonContainer?: React.CSSProperties;
    paragraph?: React.CSSProperties;
  }>(getResponsiveStyles());

  // Update responsive styles on window resize
  useEffect(() => {
    const handleResize = () => {
      setResponsiveStyles(getResponsiveStyles());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const combinedStyles = {
    wrap: { ...styles.wrap, ...responsiveStyles.wrap },
    wordsearch: { ...styles.wordsearch, ...responsiveStyles.wordsearch },
    wordsearchContainer: { ...styles.wordsearchContainer, ...responsiveStyles.wordsearchContainer },
    wordsearchUl: { ...styles.wordsearchUl, ...responsiveStyles.wordsearchUl },
    wordsearchLi: { ...styles.wordsearchLi, ...responsiveStyles.wordsearchLi },
    mainContent: { ...styles.mainContent, ...responsiveStyles.mainContent },
    h1: { ...styles.h1, ...responsiveStyles.h1 },
    logoImage: { ...styles.logoImage, ...responsiveStyles.logoImage },
    logoContainer: { ...styles.logoContainer, ...responsiveStyles.logoContainer },
    homeButton: { ...styles.homeButton, ...responsiveStyles.homeButton },
    homeButtonContainer: { ...styles.homeButtonContainer, ...responsiveStyles.homeButtonContainer },
    paragraph: { ...styles.paragraph, ...responsiveStyles.paragraph },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={combinedStyles.wrap}>
        <div className='grid' style={combinedStyles.wordsearch}>
          <div style={combinedStyles.wordsearchContainer}>
            <ul style={combinedStyles.wordsearchUl}>
              {letters.map((letter, index) => (
                <li
                  key={index}
                  style={{
                    ...combinedStyles.wordsearchLi,
                    ...(selectedLetters[index] ? styles.selectedLi : {})
                  }}
                >
                  {letter}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='all text' style={combinedStyles.mainContent}>
          <div style={combinedStyles.logoContainer}>
            <img src={logo} alt="Company Logo" style={combinedStyles.logoImage} />
          </div>
          <h1 style={combinedStyles.h1}>Looks like you arrived a little early or took a detour!</h1>
          <p style={combinedStyles.paragraph}>
            The page you're looking for is still on its way or may have taken a different path. But don't worry, we'll get you there!
          </p>
          <p style={combinedStyles.paragraph}>
            Double-check the URL or explore other parts of the site, and we're sure you'll find what you're looking for.
          </p>
          <div style={combinedStyles.homeButtonContainer}>
            <Link to="/" style={combinedStyles.homeButton}>
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;