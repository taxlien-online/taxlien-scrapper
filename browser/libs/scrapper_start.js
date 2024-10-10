import csv from 'csv-parser';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';



//const fs = require('fs');
import { waitforpageclick, waitload, pageload, pageclick, waitforframe, waitforiframe, waitforelementbyselector,waitforelementbyselectors, saveresult, fixdebug, sleep } from './process.js';
import { savePictures, movePictures, checkAndCreateDir, writeVariableToFile, readVariableFromFile } from './functions.js';


export async function scrapper_start(config, browser, page) {
    await checkAndCreateDir(config.RESULTS_PATH);
    savePictures(page, config)

    switch (config.METHOD) {
        case "LOOP":
            await scrapper_loop(config, browser, page);
            break;
        case "csv":
            await scrapper_csv(config, browser, page);
            break;
    }
}

export async function scrapper_loop(config, browser, page) {
    const url=config.URL(config.START);

    await pageload(page, url);
    await sleep(1000);

    var frame = page;
    if (typeof config.FRAME_NAME !== 'undefined') {
        var frame = await waitforframe(page, config.FRAME_NAME, 6000);
    }

    if (typeof config.AGREE_BUTTON_SELECTOR !== 'undefined') {
        /*
        while (true) {
            try {
                if (!pageclick(frame, config.AGREE_BUTTON_SELECTOR)) continue;
                if (!if (!pageclick(frame, config.AGREE_BUTTON_SELECTOR)) continue;(frame, config.AGREE_BUTTON_SELECTOR)) continue;
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
        console.log("Agree");*/
        await waitforpageclick(frame, config.AGREE_BUTTON_SELECTOR, 60000, config.RESULTS_PATH + "agree.png");
    }

    for (var i = config.I_MIN; i < config.I_MAX; i++) {
        await scrapper_iteration(config, browser, page,frame);
    }
}

export async function scrapper_csv(config, browser, page) 
{
}

export async function scrapper_iteration(config, browser, page,frame) {
    var parcelfield = await waitforelementbyselectors(page,frame, config.PARCEL_TEXT_SELECTOR, 60000, config.RESULTS_PATH + "last.png");
    const content = await frame.evaluate(el => el.textContent, parcelfield);
    console.log("content");
    console.log(content);

    var parcelnum = content;
    console.log(parcelnum);

    await saveresult(frame, config.RESULTS_PATH + `${parcelnum}.html`);
    writeVariableToFile(config.RESULTS_PATH + "/last.id", parcelnum);
    movePictures(page, config, parcelnum);

    await sleep(config.DELAY_NEXT);
    console.log("Нажимаю");

    var clickbutton = await waitforelementbyselectors(page,frame, config.NEXT_BUTTON_SELECTOR, 60000, config.RESULTS_PATH + "last.png");
    var clickres=await clickbutton.click();

    /*
    var click = await pageclick(frame, config.NEXT_BUTTON_SELECTOR);
    if (!click) {
        console.log("Ерунда какая-то!!! Не нажимается");
    }*/
    console.log("Ожидаю загрузки");
    await waitload(page);
    await sleep(config.DELAY_NEXT);
}




