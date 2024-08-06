//import puppeteer from 'puppeteer-extra';
import fs from 'fs';
import csv from 'csv-parser';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

//import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { connect } from 'puppeteer-real-browser'
import { pageload, pageclick, waitforframe, waitforelementbyselector, saveresult, fixdebug, sleep } from './process.js';

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


    connect({

        headless: 'auto',

        args: [],

        customConfig: {},

        skipTarget: [],

        fingerprint: false,

        turnstile: true,

        connectOption: {},

        fpconfig: {},


        proxy: {
            host: 'socks5://localhost',
            port: '10808',
        }

    })
        .then(async response => {
            //(async () => {
            const { browser, page } = response


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
                var res;
                if (TYPE == "GIS") {
                    frame = await waitforframe(page, FRAME_NAME, 6000);
                    //console.log("frд",frame.contentFrame());
                    const elementHandle = await  page.$("#ownerDiv");

                    //var test=await this.browser.frame(iframeHandle);
                    console.log(elementHandle);
                    break;

                    element = await waitforelementbyselector(frame, TEXT_XPATH, 60000);
                    console.log(111);
                    parcel = element.textContent;
                    console.log(222);
                    console.log("Processing parcel:", parcel);
                }

                if (TYPE == "governmax") {
                    res = await waitforelementbyselector(page, FRAME_NAME, PARCEL_INPUT_SELECTOR, 60000);
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
        }).catch(error => {
            console.log(error.message)
        });//();

}

