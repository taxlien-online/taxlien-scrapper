import { browser_start } from './libs/browser.js';

const args = process.argv.slice(2); // Skipping the first two elements

import {configs} from './configs/configs.js';

console.log('Arguments:', args);

//if (args.length > 0) {
const [config_name] = args;
//}

var config=configs[config_name];
config.HEADLESS=false;
//config.REALBROWSER=true;
config.PROXY= { host: 'socks5://localhost', port: '10809' };


console.log(config);

await browser_start(config);
