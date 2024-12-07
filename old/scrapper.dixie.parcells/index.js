import puppeteer from 'puppeteer-extra';
import fs from 'fs';
import csv from 'csv-parser';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { connect } from 'puppeteer-real-browser'

// Constants
const URL = 'https://qpublic.schneidercorp.com/Application.aspx?AppID=867&LayerID=16385&PageTypeID=2&PageID=7230';
const CSV_FILE = 'list/fl_dixie.csv';
const PARCEL_INPUT_SELECTOR = '#ctlBodyPane_ctl02_ctl01_txtParcelID';
const SEARCH_BUTTON_SELECTOR = '#ctlBodyPane_ctl02_ctl01_btnSearch';
const PARCEL_FORMAT = (parcel) => `${parcel.slice(0, 6)}-${parcel.slice(6, 14)}-${parcel.slice(14)}`;
const AGREE_BUTTON_SELECTOR = '#appBody > div.modal.in > div > div > div.modal-focus-target > div.modal-footer > a.btn.btn-primary.button-1'
// Sleep function using Promise and setTimeout
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function pageload(page,URL) {
    try {
        await page.goto(URL, { waitUntil: 'networkidle2' });
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

connect({

    headless: 'auto',

    args: [],

    customConfig: {},

    skipTarget: [],

    fingerprint: false,

    turnstile: true,

    connectOption: {},

    fpconfig: {},

    // proxy:{
    //     host:'<proxy-host>',
    //     port:'<proxy-port>',
    //     username:'<proxy-username>',
    //     password:'<proxy-password>'
    // }

})
    .then(async response => {
        //(async () => {
        const { browser, page } = response
        /*
        puppeteer.use(StealthPlugin())
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        */
        // Create a stream to read CSV
        /*
        const client = await page.target().createCDPSession();

        // Enable the Debugger
        await client.send('Debugger.enable');

        // Listen for the Debugger.paused event and automatically resume execution
        client.on('Debugger.paused', async () => {
            await client.send('Debugger.resume');
        });
        */

        await pageload(page,URL);
        while (true) {
            
            try {
                await page.click(AGREE_BUTTON_SELECTOR);
                break;
            } catch (error) {
                await sleep(10000);
            }
        }
        console.log("Agree");

        const parser = createReadStream(CSV_FILE).pipe(parse({ columns: false }));



        for await (const [parcel] of parser) {
            console.log("Processing parcel:", parcel);
            if (!(await pageload(page,URL))) continue;
            console.log("Init loaded");
            await page.evaluateOnNewDocument(() => {
                const originalDebugger = Object.getOwnPropertyDescriptor(window, 'debugger');
                Object.defineProperty(window, 'debugger', {
                    ...originalDebugger,
                    set: () => { }, // Override the setter to do nothing
                    get: () => () => { } // Override the getter to return a no-op function
                });
            });


            console.log("Cont");
            await sleep(10000);
            // Wait for the element to appear
            while (true) {
                try {
                    const element = await page.$(PARCEL_INPUT_SELECTOR);
                    if (!element) {
                        console.log('Sleep...');
                        await sleep(10000);
                        continue;
                    }
                    await page.waitForSelector(PARCEL_INPUT_SELECTOR, { timeout: 1000 });
                    await page.type(PARCEL_INPUT_SELECTOR, parcel);
                    await page.click(SEARCH_BUTTON_SELECTOR);
                    //await page.waitForNavigation({ waitUntil: 'networkidle2' });
                    //await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
                    try {
                        // Attempt to wait for the specific selector that indicates the page has loaded as expected
                        await page.waitForSelector('#ctlBodyPane_ctl00_ctl01_lblParcelID', { timeout: 30000 });
                    } catch (error) {
                        console.log("timeout")
                        break;
                    }

                    break; // Exit the loop if everything is successful
                } catch (error) {
                    console.log('Element not found, retrying...');
                    console.log(error);
                    await sleep(10000); // Wait and try again
                }
            }

            console.log("Page loaded");
            await sleep(20000);

            // Save page HTML to a file
            const html = await page.content();
            console.log("111");
            console.log(html);
            //await fs.writeFile(`res/${parcel}.html`, html);

            await fs.writeFile(`res/${parcel}.html`, html, (err) => {
                if (err) {
                    console.error('Failed to write file:', err);
                } else {
                    console.log(`File saved as res/${parcel}.dat`);
                }
            });

            console.log("222");
        }

        console.log('Completed processing all parcels');
        await browser.close();
    }).catch(error => {
        console.log(error.message)
    });//();

