//normal
//import puppeteer from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())

//safe
import { connect } from 'puppeteer-real-browser'

import randomUseragent from 'random-useragent';


import { scrapper_start } from './scrapper_start.js';
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"

export async function scrapper_stealth(
    config
) {

    if (config.CLOUDFLARE == true) {
        connect({

            headless: 'auto',

            args: ['--disable-ipv6'],

            customConfig: {},

            skipTarget: [],

            fingerprint: false,

            turnstile: true,

            connectOption: {},

            fpconfig: {},

            proxy: config.PROXY
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
        /*
        const browser = await puppeteer.launch({
            headless: false,
            args: [
                //'--proxy-server=socks5://127.0.0.1:10808',
                `--proxy-server=${config.PROXY.host}:${config.PROXY.port}`,
                '--no-sandbox'
            ]

        });
        const page = await browser.newPage();
        */


        const browser = await runBrowser(config);
        const page = await createPage(browser, false);


        await scrapper_start(config, browser, page)
    }
}



async function runBrowser(config) {
    const bw = await puppeteer.launch({
        headless: config.HEADLESS,
        devtools: false,
        ignoreHTTPSErrors: true,
        slowMo: 0,
        args: ['--disable-gpu', '--no-sandbox', '--no-zygote', '--disable-setuid-sandbox', '--disable-accelerated-2d-canvas', '--disable-dev-shm-usage',
            // "--proxy-bypass-list=*",
            //"--proxy-server='direct://'",
            `--proxy-server=${config.PROXY.host}:${config.PROXY.port}`
            //'--no-sandbox'
        ]
    });

    bw.on('disconnected', async () => {
        if (isReleased) return;
        console.log("BROWSER CRASH");
        if (retries <= 3) {
            retries += 1;
            if (browser && browser.process() != null) browser.process().kill('SIGINT');
            await _this.init();
        } else {
            throw "===================== BROWSER crashed more than 3 times";
        }
    });

    return bw;
}

async function createPage(browser, loadImages, config) {
    const userAgent = randomUseragent.getRandom();
    //const UA = userAgent || USER_AGENT;
    const UA = USER_AGENT;
    console.log(browser);
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920 + Math.floor(Math.random() * 100),
        height: 3000 + Math.floor(Math.random() * 100),
        deviceScaleFactor: 1,
        hasTouch: false,
        isLandscape: false,
        isMobile: false,
    });
    await page.setUserAgent(UA);
    await page.setJavaScriptEnabled(true);
    await page.setDefaultNavigationTimeout(0);
    /*
    if (!loadImages) {
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
                req.abort();
            } else {
                req.continue();
            }
        });
    }
    */
    /*
    await page.setRequestInterception(true);
        page.on('request', (request) => {
        if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
            request.abort();
        } else {
            request.continue();
        }
    });
    */

    await page.evaluateOnNewDocument(() => {
        //pass webdriver check
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
        });
    });

    await page.evaluateOnNewDocument(() => {
        //pass chrome check
        window.chrome = {
            runtime: {},
            // etc.
        };
    });

    await page.evaluateOnNewDocument(() => {
        //pass plugins check
        const originalQuery = window.navigator.permissions.query;
        return window.navigator.permissions.query = (parameters) => (
            parameters.name === 'notifications' ?
                Promise.resolve({ state: Notification.permission }) :
                originalQuery(parameters)
        );
    });

    await page.evaluateOnNewDocument(() => {
        // Overwrite the `plugins` property to use a custom getter.
        Object.defineProperty(navigator, 'plugins', {
            // This just needs to have `length > 0` for the current test,
            // but we could mock the plugins too if necessary.
            get: () => [1, 2, 3, 4, 5],
        });
    });

    await page.evaluateOnNewDocument(() => {
        // Overwrite the `plugins` property to use a custom getter.
        Object.defineProperty(navigator, 'languages', {
            get: () => ['en-US', 'en'],
        });
    });






    //await page.goto(url, { waitUntil: 'networkidle2',timeout: 0 } );
    return page;
}

