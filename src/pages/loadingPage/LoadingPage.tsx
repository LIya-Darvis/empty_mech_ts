import React, { FC, useState } from "react";
import classes from './LoadingPage.module.css';
import { useFilePicker } from 'use-file-picker';

const LoadingPage = () => {
    const [file, setFile] = useState();

    function handleUpload() {
        if (!file) {
            console.log("файл не выбран");
            return;
        }

        const fd = new FormData;
        fd.append('file', file);
        console.log(fd.get('file'));
    }

    return (
        <div className="loading_page">
            <h1>Загрузка</h1>
            <p>Выберите модель для загрузки</p>
            <input onChange={ (e) => { setFile(e.target.files[0]) } } type="file"/>
            <button onClick={handleUpload} className={classes.load_button}>Подтвердить</button>
                
        </div>
    );
};

export default LoadingPage;