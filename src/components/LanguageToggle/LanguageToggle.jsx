import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageToggle.scss';

const LanguageToggle = ({ className = '' }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  return (
    <div className={`language-toggle ${className}`}>
      <div className="language-selector">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`language-btn ${i18n.language === lang.code ? 'active' : ''}`}
            onClick={() => changeLanguage(lang.code)}
            title={lang.name}
          >
            <span className="flag">{lang.flag}</span>
            <span className="lang-code">{lang.code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageToggle;