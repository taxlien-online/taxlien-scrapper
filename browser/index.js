import { scrapper_stealth } from './libs/scrapper_stealth.js';

import { scrapper } from './libs/scrapper_puppeteer.js';

const args = process.argv.slice(2); // Skipping the first two elements

import {configs} from './configs/config.js';

console.log('Arguments:', args);

//if (args.length > 0) {
const [config_name] = args;
//}

var config=configs[config_name];
config.HEADLESS=false;

await scrapper_stealth(config);
