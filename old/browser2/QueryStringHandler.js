const URL = require('url');
const { addHandler } = require('website-scraper');

class QueryStringHandler {
    constructor(options) {
        this.options = options;
    }

    apply(registerAction) {
        registerAction('onResourceSaved', async ({ resource, content }) => {
            const parsedUrl = URL.parse(resource.url, true);
            const queryStringUrls = generateQueryStringUrls(parsedUrl);

            for (const url of queryStringUrls) {
                await this.options.scraper.scrapeUrl(url);
            }
        });
    }
}

function generateQueryStringUrls(parsedUrl) {
    // Генерируем различные варианты querystring параметров для данного URL
    // Например, можно перебрать возможные значения для известных параметров
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}`;
    const queryParams = parsedUrl.query;
    const urls = [];

    // Добавьте сюда логику генерации URL с различными querystring параметрами
    // Например, если есть параметры page и sort:
    for (let page = 1; page <= 5; page++) {
        for (let sort of ['asc', 'desc']) {
            const queryString = `?page=${page}&sort=${sort}`;
            urls.push(`${baseUrl}${queryString}`);
        }
    }

    return urls;
}

module.exports = QueryStringHandler;
