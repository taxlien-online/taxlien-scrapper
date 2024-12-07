//import puppeteer from 'puppeteer-extra';
import fs from 'fs';
import csv from 'csv-parser';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

//import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { connect } from 'puppeteer-real-browser'



function sleep(ms) {
    console.log(`sleep ${ms}ms`);
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function scrapper(URL,
    CSV_FILE,
    PARCEL_INPUT_SELECTOR,
    SEARCH_BUTTON_SELECTOR,
    PARCEL_FORMAT,
    AGREE_BUTTON_SELECTOR,
    isframe,DELAY) {

    async function pageload(page, URL) {
        try {
            console.log(URL);
            await page.goto(URL, { waitUntil: 'networkidle2' });
            console.log("goto+sleep 5000")
            //page.waitForTimeout(5000);
            await sleep(5000);
            await page.waitForNetworkIdle({ waitUntil: 'networkidle2' });
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async function pageclick(page, SELECTOR) {
        try {
            console.log(URL);
            await page.waitForSelector(SELECTOR, { visible: true });
            await page.click(SELECTOR);
            console.log("click+sleep 5000")
            //page.waitForTimeout(5000);
            await sleep(5000);
            await page.waitForNetworkIdle({ waitUntil: 'networkidle2' });
            
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

        
         proxy:{
             host:'socks5://localhost',
             //host:'socks5://[::1]]',
             port:'10808',
        //     username:'<proxy-username>',
        //     password:'<proxy-password>'
         }
        
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

            await pageload(page, URL);
            await sleep(5000);

            var frame=page;
            if (isframe) frame=page.frames()[isframe];
            console.log(page);
            console.log(page.frames());
            console.log(frame);

            if (AGREE_BUTTON_SELECTOR != "") {
                while (true) {
                    try {
                        if (!pageclick(frame,AGREE_BUTTON_SELECTOR)) continue;
                        await sleep(10000);
                        URL=frame.url();
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
                console.log("Processing parcel:", parcel);
                if (!(await pageload(page, URL))) continue;
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
                await sleep(DELAY);
                // Wait for the element to appear
                
                
                while (true) {
                    try {
                        if (isframe) frame=page.frames()[isframe];
                        const element = await frame.$(PARCEL_INPUT_SELECTOR);
                        if (!element) {
                            console.log('Sleep...');
                            await sleep(10000);
                            continue;
                        }
                        await frame.waitForSelector(PARCEL_INPUT_SELECTOR, { timeout: 1000 });
                        
                        var parcelf=PARCEL_FORMAT(parcel);
                        await frame.type(PARCEL_INPUT_SELECTOR, parcelf);
                        //await frame.click(SEARCH_BUTTON_SELECTOR);
                        if (!pageclick(frame,SEARCH_BUTTON_SELECTOR)) continue;
                        //await page.waitForNavigation({ waitUntil: 'networkidle2' });
                        //await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
                        try {
                            // Attempt to wait for the specific selector that indicates the page has loaded as expected
                            await frame.waitForSelector('#ctlBodyPane_ctl00_ctl01_lblParcelID', { timeout: 30000 });
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
                await sleep(DELAY);

                // Save page HTML to a file
                if (isframe) frame=page.frames()[isframe];
                const html = await frame.content();
                console.log("111");
                console.log(html);
                //await fs.writeFile(`res/${parcelf}.html`, html);

                await fs.writeFile(`res/${parcelf}.html`, html, (err) => {
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

}

