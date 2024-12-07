//normal
import puppeteer from 'puppeteer';

//safe
import { connect } from 'puppeteer-real-browser'

//something old
//import StealthPlugin from 'puppeteer-extra-plugin-stealth'
//import puppeteer from 'puppeteer-extra';

import csv from 'csv-parser';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import fs from 'fs-extra';


//const fs = require('fs');
import { waitload, pageload, pageclick, waitforframe, waitforiframe, waitforelementbyselector, saveresult, fixdebug, sleep } from './process.js';


export async function scrapper_cfg(
    config
) {
    
    await checkAndCreateDir(config.RESULTS_PATH);
    

    if (config.CLOUDFLARE == true) {
        connect({

            headless: 'auto',

            args: [],

            customConfig: {},

            skipTarget: [],

            fingerprint: false,

            turnstile: true,

            connectOption: {},

            fpconfig: {},

            proxy:config.PROXY
        })
            .then(async response => {
                //(async () => {
                const { browser, page } = response
                await scrapper_start(config, browser, page)
                console.log('Completed processing');
                await browser.close();
            }).catch(error => {
                console.log(error.message)
            });//();



    } else {
        const browser = await puppeteer.launch({
            headless: false,
            args: [
                //'--proxy-server=socks5://127.0.0.1:10808',
                `--proxy-server=${config.PROXY.host}:${config.PROXY.port}`,
                '--no-sandbox'
            ]

        });
        const page = await browser.newPage();
        await scrapper_start(config, browser, page)
    }
}

export async function scrapper_start(config, browser, page) {
    if (config.METHOD == "LOOP")
        await scrapper_loop(config, browser, page);
}

export async function scrapper_loop(config, browser, page) {
    await pageload(page, config.URL);
    var frame = page;

    if (config.AGREE_BUTTON_SELECTOR != "") {
        while (true) {
            try {
                if (!pageclick(frame, config.AGREE_BUTTON_SELECTOR)) continue;
                await sleep(10000);
                URL = frame.url();
                console.log("change url")
                console.log(URL)
                break;
            } catch (error) {
                console.log(error)
                console.log("No Agree");
                await sleep(10000);
            }
        }
        console.log("Agree");
    }

    for (var i = config.I_MIN; i < config.I_MAX; i++) {
        var parcelfield = await waitforelementbyselector(frame, config.PARCEL_TEXT_SELECTOR, 60000,config.RESULTS_PATH+"last.png" );
        const content = await frame.evaluate(el => el.textContent, parcelfield);
        console.log("content");
        console.log(content);

        var parcelnum = content;
        console.log(parcelnum);

        await saveresult(frame, config.RESULTS_PATH + `${parcelnum}.html`);
        writeVariableToFile(config.RESULTS_PATH+"/last.id",parcelnum);


        await sleep(config.DELAY_NEXT);
        console.log("Нажимаю");

        var click = await pageclick(frame, config.NEXT_BUTTON_SELECTOR);
        if (!click) {
            console.log("Ерунда какая-то!!! Не нажимается");
        }
        console.log("Ожидаю загрузки");
        await waitload(frame);
    }
}





async function checkAndCreateDir(path) {
    try {
        // Проверка существования директории
        const exists = await fs.pathExists(path);

        if (!exists) {
            // Создание директории, если она не существует
            await fs.ensureDir(path);
            console.log(`Директория ${path} создана.`);
        } else {
            console.log(`Директория ${path} уже существует.`);
        }
    } catch (err) {
        console.error('Ошибка при проверке или создании директории:', err);
    }
}


function writeVariableToFile(filePath, variable) {
    fs.writeFile(filePath, variable.toString(), (err) => {
        if (err) {
            console.error('Ошибка при записи в файл:', err);
        } else {
            console.log(`Переменная записана в файл ${filePath}`);
        }
    });
}



function readVariableFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error('Ошибка при чтении из файла:', err);
        return null;
    }
}