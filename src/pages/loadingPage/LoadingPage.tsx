import React, { FC, useContext, useEffect, useState } from "react";
import classes from './LoadingPage.module.css';
import { useFilePicker } from 'use-file-picker';

import {readTextFile, writeTextFile, copyFile, BaseDirectory} from '@tauri-apps/api/fs';
import { useScene } from "react-babylonjs";


export let file_content: string = "";

const LoadingPage = () => {
    const scene = useScene()

    const {openFilePicker, filesContent, loading} = useFilePicker({
        accept: '.obj',
    });

    if (loading) {
        console.log("загрузка...");
        return <div>загрузка...</div>
    } else {
        // изменение содержания файла
    filesContent.map((file) => {
        file_content = file.content
    })
    writeTextFile("D:/codes/empty_mech_ts/src/assets/models/test.obj", file_content)
    // window.location.reload();
    console.log("чего мы так долго добивались ✨✨: \n", file_content);
    }    


    return (
        <div className="loading_page" key={"loading_page"}>
            <h1>Загрузка</h1>
            <p>Выберите модель для загрузки</p>
            <button onClick={() => openFilePicker()} className={classes.load_button}>Выбрать файл</button>
            {
            filesContent.map((file) => ( 
                <div>
                    <p>{file.name}</p>
                </div>
            ))}
                
        </div>
    );
    
};

export default LoadingPage;
