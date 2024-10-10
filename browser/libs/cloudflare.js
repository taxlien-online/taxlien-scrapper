import { sleep } from './process.js';


export async function cfAndNavigate(browser, page, config) {
    console.log("cfAndNavigate");
    console.log(config);
    var check = await checkCf(browser, page, config);

    if ((config.CLOUDFLARE == true) || (config.CLOUDFLARE == "auto")) {
        while(true)
        {
        console.log("CF...")
            var cf = await scrapeCfClearance(config);
            //console.log(cf);
            if (cf.code==500) {sleep(60000); continue;}
            console.log("CF OK")
            config.COOKIES = cf.cookies;
            config.USER_AGENT = cf.agent
            console.log("cookies:", config.COOKIES)
            break;
        }
    }

    await page.setCookie(...config.COOKIES);

    await pageload(page, config.CUR_URL);
    await sleep(1000);
}

export async function cfThenNavigate(browser, page, config) {
    var check = await  checkCf(browser, page, config);

    if (config.CLOUDFLARE == false) return;
    if (check == false) return;

    console.log("CF...")
    var cf = await scrapeCfClearance(config);
    //console.log(cf);
    console.log("CF OK")
    config.COOKIES = cf.cookies;
    config.USER_AGENT = cf.agent
    console.log("cookies:", config.COOKIES)

    await page.setCookie(...config.COOKIES);

    await pageload(page, config.CUR_URL);
    await sleep(1000);
}


export async function checkCf(browser, page, config) {
    var cfText = "Just a moment...";
    const pageContent = await page.content();

    if (await pageContent.includes(cfText)) {
        console.log('Текст "Just a moment..." найден на странице.');
        return true;
    } else {
        return false;
    }
}

export async function scrapeCfClearance(config) {
    try {
        const response = await fetch('http://localhost:3000/cf-clearance-scraper', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // authToken: 'test', // Not mandatory. Checked if the env variable is set.
                //url: 'https://nopecha.com/demo/cloudflare', // Link to engrave
                //url: 'https://qpublic.schneidercorp.com/Application.aspx?AppID=867&LayerID=16385&PageTypeID=4&PageID=7232&Q=860515812&KeyValue=34-09-13-4496-0000-0050',
                url: config.URL_CUR,
                mode: "waf", // gets waf or captcha values

                proxy: config.PROXY,
                //agent: config.AGENT,

                /*
                proxy: {
                    host: 'socks5://127.0.0.1',
                    port: '10809',

                }*/



                // agent: null,
                // defaultCookies: [],
                // blockMedia: true // or false
                // Proxy information (not mandatory)
                // proxy: {
                //     host: '1.1.1.1',
                //     port: '1111',
                //     username: 'test',
                //     password: 'test'
                // }
            })
        });

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}