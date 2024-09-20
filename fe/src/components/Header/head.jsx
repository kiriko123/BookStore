import React from "react";
import './head.css';
import '../../i18n.js';
import {useTranslation} from "react-i18next";
const Head = () => {

    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <section className="head">
            <div className="container d_flex">
                <div className="left row">
                    <i className="fa fa-phone"></i>
                    <label>+84 8813 598</label>
                    <i className="fa fa-envelope"></i>
                    <label>tankhang101a@gmail.com</label>
                </div>
                <div className="right row RText">
                    <label>{t('faqs')}</label>
                    <label>{t('need_help')}</label>

                    <label onClick={() => changeLanguage('en')}><span role="img" aria-label="flag">🏳️‍⚧️</span>EN</label>

                    <label onClick={() => changeLanguage('vi')}><span role="img"
                                                                      aria-label="flag">🏳️‍⚧️</span> VI</label>
                </div>
            </div>
        </section>
    );
}

export default Head;
