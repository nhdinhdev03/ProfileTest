import React from 'react';
import { useTranslation } from 'react-i18next';
import './I18nDemo.scss';

const I18nDemo = () => {
  const { t } = useTranslation();

  return (
    <div className="i18n-demo">
      <div className="container">
        <h1>{t('hero.title')}</h1>
        <h2>{t('hero.subtitle')}</h2>
        <p>{t('hero.description')}</p>
        
        <div className="demo-section">
          <h3>{t('navigation.about')}</h3>
          <p>{t('about.description')}</p>
        </div>

        <div className="demo-section">
          <h3>{t('navigation.projects')}</h3>
          <button className="btn-primary">{t('projects.view_project')}</button>
          <button className="btn-secondary">{t('projects.view_code')}</button>
        </div>

        <div className="demo-section">
          <h3>{t('navigation.contact')}</h3>
          <form className="contact-form">
            <input type="text" placeholder={t('contact.name')} />
            <input type="email" placeholder={t('contact.email')} />
            <textarea placeholder={t('contact.message')}></textarea>
            <button type="submit">{t('contact.send')}</button>
          </form>
        </div>

        <div className="common-buttons">
          <button>{t('common.save')}</button>
          <button>{t('common.cancel')}</button>
          <button>{t('common.confirm')}</button>
        </div>
      </div>
    </div>
  );
};

export default I18nDemo;