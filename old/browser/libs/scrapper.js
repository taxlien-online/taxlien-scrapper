import puppeteer from 'puppeteer';
//import StealthPlugin from 'puppeteer-extra-plugin-stealth'
//import puppeteer from 'puppeteer-extra';

import csv from 'csv-parser';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

// import { connect } from 'puppeteer-real-browser'
import { waitload,pageload, pageclick, waitforframe,waitforiframe, waitforelementbyselector, saveresult, fixdebug, sleep } from './process.js';

export async function scrapper(
    TYPE,
    URL,
    CSV_FILE,
    RESULTS_PATH,
    PARCEL_INPUT_SELECTOR,
    TEXT_XPATH,
    SEARCH_BUTTON_SELECTOR,
    PARCEL_FORMAT,
    AGREE_BUTTON_SELECTOR,
    FRAME_NAME,
    DELAY
) {


    const browser = await puppeteer.launch({ headless: false,
        args: [
            '--proxy-server=socks5://127.0.0.1:10808',
	        '--no-sandbox'
          ]

    });
    const page = await browser.newPage();




    await pageload(page, URL);
    await sleep(5000);

    var frame = await waitforframe(page, FRAME_NAME, 6000);


    if (AGREE_BUTTON_SELECTOR != "") {
        while (true) {
            try {
                if (!pageclick(frame, AGREE_BUTTON_SELECTOR)) continue;
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

    const parser = createReadStream(CSV_FILE).pipe(parse({ columns: false }));



    for await (const [parcel] of parser) {
        if (TYPE == "taxsome") {
            console.log("Processing parcel:", parcel);
            if (!(await pageload(page, URL))) continue;
            console.log("Init loaded");
            fixdebug(page);


            console.log("Cont");
            await sleep(DELAY);
            // Wait for the element to appear
        }

        frame = page;
        var element;
        var parcelfield;
        if (TYPE == "GIS") {
            frame = await waitforiframe(page, FRAME_NAME, 6000);
            //element = await waitforelementbyselector(frame, "#ownerDiv", 60000);
            parcelfield = await waitforelementbyselector(frame, PARCEL_INPUT_SELECTOR, 60000);
            //console.log(111);
            const content = await frame.evaluate(el => el.textContent, parcelfield);
            console.log("content");
            console.log(content);
        
            //parcelfield = element.textContent;
            var parcelnum=content;
            console.log(parcelnum);
            saveresult(frame, RESULTS_PATH + `${parcelnum}.html`);
            console.log("Нажимаю");
            //nextbutton= await waitforelementbyselector(frame, SEARCH_BUTTON_SELECTOR, 60000);
            var click=await pageclick(frame, SEARCH_BUTTON_SELECTOR);
            if (!click) {
                console.log("Ерунда какая-то!!! Не нажимается");
            }
            console.log("Ожидаю загрузки");
            await waitload(page);
            continue;

            console.log("Processing parcel:", parcel);
        }

        if (TYPE == "governmax") {
            element = await waitforelementbyselector(page, FRAME_NAME, PARCEL_INPUT_SELECTOR, 60000);
            selector = await frame.waitForSelector(PARCEL_INPUT_SELECTOR, { timeout: 1000 });
        }




        if (TYPE == "sometax") {
            var parcelf = PARCEL_FORMAT(parcel);
            await frame.type(PARCEL_INPUT_SELECTOR, parcelf);
            //await frame.click(SEARCH_BUTTON_SELECTOR);
            if (!pageclick(frame, SEARCH_BUTTON_SELECTOR)) continue;
            //await page.waitForNavigation({ waitUntil: 'networkidle2' });
            //await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
            try {
                // Attempt to wait for the specific selector that indicates the page has loaded as expected
                await frame.waitForSelector('#ctlBodyPane_ctl00_ctl01_lblParcelID', { timeout: 30000 });
            } catch (error) {
                console.log("timeout")
                break;
            }
        }


        console.log("Page loaded");
        await sleep(DELAY);

        saveresult(frame, RESULTS_PATH + `${parcelf}.html`)

        console.log("222");
    }

    console.log('Completed processing all parcels');
    await browser.close();


}