import { connect } from 'puppeteer-real-browser'

connect({
    turnstile: true
})
.then(async response => {
        const { page, browser, setTarget } = response

        page.goto('https://nopecha.com/demo/cloudflare', {
            waitUntil: 'domcontentloaded'
        })

        setTarget({ status: false })

        let page2 = await browser.newPage();

        setTarget({ status: true })

        await page2.goto('https://nopecha.com/demo/cloudflare');
})