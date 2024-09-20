import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Các file chứa các chuỗi văn bản của bạn
import translationEN from './locales/en/translation.json';
import translationVI from './locales/vi/translation.json';

const resources = {
    en: {
        translation: translationEN,
    },
    vi: {
        translation: translationVI,
    },
};

i18n
    .use(initReactI18next) // pass the i18n instance to react-i18next.
    .init({
        resources,
        lng: 'en', // ngôn ngữ mặc định
        fallbackLng: 'en', // ngôn ngữ dự phòng

        interpolation: {
            escapeValue: false, // React đã tự động bảo vệ XSS
        },
    });

export default i18n;
