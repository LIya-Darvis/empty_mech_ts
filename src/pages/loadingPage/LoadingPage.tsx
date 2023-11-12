import React, { FC } from "react";
import classes from './LoadingPage.module.css';

const LoadingPage = () => {
    return (
        <div className="loading_page">
            <h1>Загрузка</h1>
            <p>страница настроек с глобальными изменениями системы</p>
            <button>Выбрать файл</button>
                
        </div>
    );
};

export default LoadingPage;