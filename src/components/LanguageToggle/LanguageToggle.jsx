import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import img from 'assets/Img';
import './LanguageToggle.scss';

const LanguageToggle = ({ className = '', variant = 'dropdown' }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const languages = [
    { 
      code: 'vi', 
      name: 'Việt Nam', 
      flag: img.Co_VN,
      shortName: 'VI'
    },
    { 
      code: 'en', 
      name: 'English', 
      flag: img.Co_My,
      shortName: 'EN'
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`language-toggle language-toggle--compact ${className}`}>
        <div className="language-selector">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-btn ${i18n.language === lang.code ? 'active' : ''}`}
              onClick={() => changeLanguage(lang.code)}
              title={lang.name}
              aria-label={`Switch to ${lang.name}`}
            >
              <img 
                src={lang.flag} 
                alt={`${lang.name} flag`}
                className="flag-img"
              />
              <span className="lang-code">{lang.shortName}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`language-toggle language-toggle--dropdown ${className}`} ref={dropdownRef}>
      <button 
        className={`language-current ${isOpen ? 'language-current--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-label={`Current language: ${currentLanguage.name}. Click to change language`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <img 
          src={currentLanguage.flag} 
          alt={`${currentLanguage.name} flag`}
          className="flag-img"
        />
        <span className="lang-name">{currentLanguage.name}</span>
        <svg 
          className={`chevron ${isOpen ? 'chevron--open' : ''}`} 
          viewBox="0 0 24 24" 
          width="16" 
          height="16"
        >
          <path d="M7 10l5 5 5-5z" fill="currentColor"/>
        </svg>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${i18n.language === lang.code ? 'language-option--active' : ''}`}
              onClick={() => changeLanguage(lang.code)}
              aria-label={`Switch to ${lang.name}`}
            >
              <img 
                src={lang.flag} 
                alt={`${lang.name} flag`}
                className="flag-img"
              />
              <div className="lang-details">
                <span className="lang-name">{lang.name}</span>
                <span className="lang-code">{lang.shortName}</span>
              </div>
              {i18n.language === lang.code && (
                <svg className="check-icon" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;