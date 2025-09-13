import React from 'react';
import { useTranslation } from 'react-i18next';
import I18nDemo from 'components/I18nDemo';
import './I18nDemoPage.scss';

const I18nDemoPage = () => {
  const { t } = useTranslation();

  return (
    <div className="i18n-demo-page">
      <div className="page-header">
        <h1>🌍 {t('common.welcome')} - Internationalization Demo</h1>
        <p>Chuyển đổi ngôn ngữ bằng cách sử dụng nút chuyển đổi ở góc trên bên phải</p>
        <p>Switch languages using the language toggle button in the top right corner</p>
      </div>
      <I18nDemo />
    </div>
  );
};

export default I18nDemoPage;