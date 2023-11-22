import React, { FC, useContext, useEffect, useState } from "react";
import classes from './LoadingPage.module.css';
import { useFilePicker } from 'use-file-picker';
// import * as fs from 'fs';
// import * as fs from '../../../node_modules/fs/package.json';
// import fs from '../../../node_modules/vite-plugin-fs/package.json';
// import fs from 'vite-fs';
// import * as fs from 'fs';

import {readTextFile, writeTextFile, copyFile, BaseDirectory} from '@tauri-apps/api/fs';
import { useScene } from "react-babylonjs";


// import Vue from '../../../node_modules/@vitejs/plugin-vue'
// import ViteFS from 'vite-fs'

// export default {
//   plugins: [
//     Vue(),
//     ViteFS()
//   ]
// }

// import {ModelLoadingContext} from '../../pages/scenePage/ScenePage';
// import {file} from '../../assets/test.obj'


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
        // const fs = require('fs');
        //  fs.writeFileSync("../../assets/test.txt", file_content)

        // // fs.writeFile("../../assets/test.obj", file_content)

        // const write_result = fs.readFileSync("../../assets/test.txt")
        // var file = fs.readFile('../../assets/test.txt');
        // console.log("что то выводим ???\n", file)
        
        // console.log("что то важное?? ", fs);
        const content = readTextFile('test.txt', { dir: BaseDirectory.Download});
        console.log(content);
        writeTextFile("D:/codes/empty_mech_ts/src/assets/test.obj", file_content)
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
    



    // const [file, setFile] = useState();

    // function handleUpload() {
    //     if (!file) {
    //         console.log("файл не выбран");
    //         return;
    //     }

    //     const fd = new FormData;
    //     fd.append('file', file);
    //     console.log(fd.get('file'));
    // }

    // return (
    //     <div className="loading_page">
    //         <h1>Загрузка</h1>
    //         <p>Выберите модель для загрузки</p>
    //         <input onChange={ (e) => { setFile(e.target.files[0]) } } type="file"/>
    //         <button onClick={handleUpload} className={classes.load_button}>Подтвердить</button>
                
    //     </div>
    // );
};

export default LoadingPage;