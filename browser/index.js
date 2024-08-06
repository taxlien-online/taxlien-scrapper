import { scrapper_stealth } from './libs/scrapper_stealth.js';

import { scrapper } from './libs/scrapper_puppeteer.js';

const args = process.argv.slice(2); // Skipping the first two elements

import {configs} from './configs/config.js';

console.log('Arguments:', args);

//if (args.length > 0) {
const [config_name] = args;
//}

config=configs[config_name];

if (type == "tax") {
    if (county == "dixie") {
        URL = 'https://fl-dixie-taxcollector.governmax.com/collectmax/agency/fl-dixie-taxcollector/homepage.asp?sid=0D33CBD6D0AC4D3D866C864B449E2A7D'
        CSV_FILE = 'list/fl_dixie.csv';
        PARCEL_INPUT_SELECTOR = 'body > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > font > input[type=TEXT]';
        // const SEARCH_BUTTON_SELECTOR = 'body > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > input[type=SUBMIT]';
        SEARCH_BUTTON_SELECTOR = 'body > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > input[type=SUBMIT]';
        PARCEL_FORMAT = (parcel) => `${parcel.slice(0, 6)}-${parcel.slice(6, 14)}-${parcel.slice(14)}`;
        AGREE_BUTTON_SELECTOR = 'body > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > center > a'
        ISFRAME = false;
        DELAY = 3000;
    }
}



var config;


            //CSV_FILE = 'list/fl_dixie.csv';
            //PARCEL_FORMAT = (parcel) => `${parcel.slice(0, 6)}-${parcel.slice(6, 14)}-${parcel.slice(14)}`;

//const SELECTOR = '#ownerDiv > table:first-child > tbody > tr:first-child > td > table > tbody > tr:first-child > td:nth-child(3)';
//const IFRAME_SELECTOR = '#recordSearchContent_1_iframe';
//const SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(3) > b';
//const BUTTON_SELECTOR = '#ownerDiv > table:first-child > tbody > tr:first-child > td > table > tbody > tr:first-child > td:nth-child(4) > a > input';
//const BUTTON_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(4) > a > input';

if (type == "parcels") {
    switch (county) {
        case 'dixie':
            await scrapper_stealth(config);
            break;
        case 'clay':

            await scrapper_stealth(configs.config_parcel_fl_clay);
            break;
    }


    if (county == "bradford") {
        URL = 'https://www.bradfordappraiser.com/gis/?pin=01680000000';
        CSV_FILE = 'list/fl_columbia.csv';
        RESULTS_PATH = 'res/parcel.bradford/';
        PARCEL_INPUT_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(3) > b';
        TEXT_XPATH = '';
        //SEARCH_BUTTON_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(4) > a > input';
        SEARCH_BUTTON_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > a > input';
        PARCEL_FORMAT = (parcel) => `${parcel.slice(0, 6)}-${parcel.slice(6, 14)}-${parcel.slice(14)}`;
        AGREE_BUTTON_SELECTOR = ''
        FRAME_NAME = "recordSearchContent_1_iframe";
        DELAY = 3000;
        TYPE = "GIS";
    }
    if (county == "columbia") {
        URL = 'https://columbia.floridapa.com/gis/?pin=142S1500061000';
        CSV_FILE = 'list/fl_columbia.csv';
        RESULTS_PATH = 'res/parcel.columbia/';
        PARCEL_INPUT_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(3) > b';
        TEXT_XPATH = '';
        //SEARCH_BUTTON_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(4) > a > input';
        SEARCH_BUTTON_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > a > input';
        PARCEL_FORMAT = (parcel) => `${parcel.slice(0, 6)}-${parcel.slice(6, 14)}-${parcel.slice(14)}`;
        AGREE_BUTTON_SELECTOR = ''
        FRAME_NAME = "recordSearchContent_1_iframe";
        DELAY = 3000;
        TYPE = "GIS";
    }
    if (county == "lafayette") {
        URL = 'https://www.lafayettepa.com/gis/?pin=0507140000000000200';
        CSV_FILE = 'list/fl_columbia.csv';
        RESULTS_PATH = 'res/parcel.lafayette/';
        PARCEL_INPUT_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(3) > b';
        TEXT_XPATH = '';
        //SEARCH_BUTTON_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(4) > a > input';
        SEARCH_BUTTON_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > a > input';
        PARCEL_FORMAT = (parcel) => `${parcel.slice(0, 6)}-${parcel.slice(6, 14)}-${parcel.slice(14)}`;
        AGREE_BUTTON_SELECTOR = ''
        FRAME_NAME = "recordSearchContent_1_iframe";
        DELAY = 3000;
        TYPE = "GIS";
    }
    if (county == "okeechobee") {
        URL = 'https://www.okeechobeepa.com/gis/?pin=11536350040000400200';
        CSV_FILE = 'list/fl_columbia.csv';
        RESULTS_PATH = 'res/parcel.okeechobee/';
        PARCEL_INPUT_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(3) > b';
        TEXT_XPATH = '';
        //SEARCH_BUTTON_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(4) > a > input';
        SEARCH_BUTTON_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > a > input';
        PARCEL_FORMAT = (parcel) => `${parcel.slice(0, 6)}-${parcel.slice(6, 14)}-${parcel.slice(14)}`;
        AGREE_BUTTON_SELECTOR = ''
        FRAME_NAME = "recordSearchContent_1_iframe";
        DELAY = 3000;
        TYPE = "GIS";
    }
    if (county == "suwannee") {
        URL = 'https://www.suwanneepa.com/gis/?pin=0403S11E11334000000';
        CSV_FILE = 'list/fl_columbia.csv';
        RESULTS_PATH = 'res/parcel.suwannee/';
        PARCEL_INPUT_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(3) > b';
        TEXT_XPATH = '';
        //SEARCH_BUTTON_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(4) > a > input';
        SEARCH_BUTTON_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > a > input';
        PARCEL_FORMAT = (parcel) => `${parcel.slice(0, 6)}-${parcel.slice(6, 14)}-${parcel.slice(14)}`;
        AGREE_BUTTON_SELECTOR = ''
        FRAME_NAME = "recordSearchContent_1_iframe";
        DELAY = 3000;
        TYPE = "GIS";
    }
    if (county == "union") {
        URL = 'https://union.floridapa.com/gis/?pin=1805210000005700';
        CSV_FILE = 'list/fl_columbia.csv';
        RESULTS_PATH = 'res/parcel.union/';
        PARCEL_INPUT_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(3) > b';
        TEXT_XPATH = '';
        //SEARCH_BUTTON_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(4) > a > input';
        SEARCH_BUTTON_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > a > input';
        PARCEL_FORMAT = (parcel) => `${parcel.slice(0, 6)}-${parcel.slice(6, 14)}-${parcel.slice(14)}`;
        AGREE_BUTTON_SELECTOR = ''
        FRAME_NAME = "recordSearchContent_1_iframe";
        DELAY = 3000;
        TYPE = "GIS";
    }
}


// Sleep function using Promise and setTimeout
/*
await scrapper(
    TYPE,
    URL,
    CSV_FILE,
    RESULTS_PATH,
    PARCEL_INPUT_SELECTOR,
    TEXT_XPATH,
    SEARCH_BUTTON_SELECTOR,
    PARCEL_FORMAT,
    AGREE_BUTTON_SELECTOR,
    FRAME_NAME,
    DELAY
);

*/