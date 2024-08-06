import fs from 'fs';


export async function pageload(page, URL) {
    try {
        console.log("URL:");
        console.log(URL);
        await page.goto(URL, { waitUntil: 'networkidle2' });
        console.log("goto")
        //page.waitForTimeout(5000);
        await sleep(2000);
        console.log("waitfor networkidle2")
        await page.waitForNetworkIdle({ waitUntil: 'networkidle2' });
        await sleep(2000);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}


export async function pageclick(page, SELECTOR) {
    try {
        await page.waitForSelector(SELECTOR, { visible: true });
        await page.click(SELECTOR);
        //console.log("click+sleep 5000")
        //page.waitForTimeout(5000);
        //await sleep(5000);
        //await page.waitForNetworkIdle({ waitUntil: 'networkidle2' });

        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export async function waitforpageclick(page, SELECTOR, timeout, screen_filename) {
    console.log("waitforpageclick selector:");
    console.log(SELECTOR);
    while (true) {
        try {
            var element;
            await page.screenshot({ path: screen_filename });
            if (await pageclick(page, SELECTOR)) return;
        } catch (error) {
            console.log('Element not found, retrying...');
            console.log(error);
            await sleep(10000); // Wait and try again
        }
    }
}


export async function waitload(page) {
    await sleep(2000);
    try {
        await page.waitForNetworkIdle({ waitUntil: 'networkidle2' });
    } catch (error) {
        console.log(error)
        await sleep(5000);
        return false;
    }
    await sleep(2000);
}


export async function waitforframe(page, FRAME_NAME, timeout) {
    if (!FRAME_NAME) return page;


    console.log("!!!waitforframe!!!");
    console.log("page:", page)
    while (true) {
        try {
            var frames = page.frames();
            //console.log("frames:",frames)
            var frame = await frames.find(f => f.name() === FRAME_NAME);
            //var frame = frames[FRAME_NAME];
            if (!frame) continue;

            console.log("frame:", frame)
            return frame;

        } catch (error) {
            console.log('no frame...');
            console.log(error);
            await sleep(10000); // Wait and try again
        }

    }
    //TODO: if timeout retur false;
}


export async function waitforiframe(page, IFRAME_NAME, timeout) {
    if (!IFRAME_NAME) return page;


    console.log("!!!waitforframe!!!");
    console.log("page:", page)
    while (true) {
        try {
            var frames = page.frames();
            const frameHandle = await page.$('iframe[name="' + IFRAME_NAME + '"], iframe#' + IFRAME_NAME);
            const frame = await frameHandle.contentFrame();
            //console.log("frames:",frames)
            //var frame = await frames.find(f => f.name() === FRAME_NAME);
            //var frame = frames[FRAME_NAME];
            if (!frame) continue;

            console.log("frame:", frame)
            return frame;

        } catch (error) {
            console.log('no frame...');
            console.log(error);
            await sleep(10000); // Wait and try again
        }

    }
    //TODO: if timeout retur false;
}


export async function getselector(frame, SELECTOR) {
    try {
        console.log("getselector:", SELECTOR);
        var element;
        element = await frame.$(SELECTOR); // Get the element handle

        console.log("element:", element);
        if (!element) {
            console.log('!element');
            return false
        }

        return element;
    } catch (error) {
        console.log(error)
        return false;
    }
}


export async function waitforelementbyselectors(page,frame, SELECTORS, timeout, screen_filename) {
    console.log("!!!waitforelementbyselectorS!!!");
    await page.screenshot({ path: screen_filename });

    console.log("frame:", frame);
    console.log("selectors:", SELECTORS);
    while (true) {
        for (const selector of SELECTORS) {
            var element = await getselector(frame, selector);
            if (element) return element;
        };

        console.log("no element...");
        await sleep(30000);
    }
    //TODO: if timeout retur false;
}


export async function waitforelementbyselector(frame, SELECTOR, timeout, screen_filename) {
    console.log("!!!waitforelementbyselector!!!");

    //const html = await frame.content();
    //console.log("html",html);

    //var div = await frame.$("#ownerDiv");
    var div = await frame.$(SELECTOR);
    //console.log(div);
    //const content = await frame.evaluate(el => el.textContent, div);
    //console.log("content");
    //console.log(content);

    console.log("selector:", SELECTOR);
    while (true) {
        try {
            var element;

            await frame.screenshot({ path: screen_filename });

            //const elementHandle = await frame.$x(SELECTOR);
            //await frame.waitForXPath(SELECTOR, { timeout: 5000 }); // Wait for the element to appear
            element = await frame.$(SELECTOR); // Get the element handle
            //console.log("element",element);
            //if (elementHandle) {
            //  return elementHandle;
            //} 

            /*
                        //element = await frame.$(SELECTOR);
                        console.log("frame:",frame);
                        element = await frame.evaluate((SELECTOR) => {
                            const element = document.evaluate(SELECTOR, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                            console.log("element:", element);
                            return element;
                        }, SELECTOR);
            */

            console.log("element:", element);
            if (!element) {
                console.log('Sleep...');
                await sleep(30000);
                continue;
            }
            return element;
        } catch (error) {
            console.log('Element not found, retrying...');
            console.log(error);
            await sleep(30000); // Wait and try again
        }
    }
    //TODO: if timeout retur false;
}







export async function saveresult(frame, path) {
    const html = await frame.content();
    await fs.writeFile(path, html, (err) => {
        if (err) {
            console.error('Failed to write file:', err);
        } else {
            console.log(`File saved as ${path}`);
        }
    });
}


export function sleep(ms) {
    console.log(`sleep ${ms}ms`);
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fixdebug(page) {
    await page.evaluateOnNewDocument(() => {
        const originalDebugger = Object.getOwnPropertyDescriptor(window, 'debugger');
        Object.defineProperty(window, 'debugger', {
            ...originalDebugger,
            set: () => { }, // Override the setter to do nothing
            get: () => () => { } // Override the getter to return a no-op function
        });
    });
}



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