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
                url:config.URL_CUR,
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