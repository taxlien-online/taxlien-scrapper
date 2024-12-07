import { scrapper_cfg } from './libs/scrapper.js';
import { scrapper } from './libs/scrapper_puppeteer.js';

const args = process.argv.slice(2); // Skipping the first two elements

console.log('Arguments:', args);

//if (args.length > 0) {
const [type, county] = args;
//}

var URL;
var CSV_FILE;
var PARCEL_INPUT_SELECTOR;
var SEARCH_BUTTON_SELECTOR;
var PARCEL_FORMAT;
var AGREE_BUTTON_SELECTOR;
var RESULTS_PATH;
var ISFRAME, DELAY, TYPE, TEXT_XPATH, FRAME_NAME;

/*
const URL = 'https://qpublic.schneidercorp.com/Application.aspx?AppID=867&LayerID=16385&PageTypeID=2&PageID=7230';
const CSV_FILE = 'list/fl_dixie.csv';
const PARCEL_INPUT_SELECTOR = '#ctlBodyPane_ctl02_ctl01_txtParcelID';
const SEARCH_BUTTON_SELECTOR = '#ctlBodyPane_ctl02_ctl01_btnSearch';
const PARCEL_FORMAT = (parcel) => `${parcel.slice(0, 6)}-${parcel.slice(6, 14)}-${parcel.slice(14)}`;
const AGREE_BUTTON_SELECTOR = '#appBody > div.modal.in > div > div > div.modal-focus-target > div.modal-footer > a.btn.btn-primary.button-1'
*/

//const URL = 'https://fl-dixie-taxcollector.governmax.com/collectmax/collect30.asp';


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


const config_qpublic = {
    URL: 'https://qpublic.schneidercorp.com/Application.aspx?AppID=867&LayerID=16385&PageTypeID=4&PageID=7232&Q=1299906831&KeyValue=34-09-13-4496-0000-0040',
    //ACCOUNT_NUMBER_INPUT_SELECTOR: '#ctlBodyPane_ctl03_ctl01_srch1_txtInput',
    //ACCOUNT_NUMBER_SEARCH_SELECTOR: '#ctlBodyPane_ctl03_ctl01_srch1_btnSearch',
    NEXT_BUTTON_SELECTOR: "#ToolBar1_btnNextRecord > span",
    PARCEL_TEXT_SELECTOR: "#ctlBodyPane_ctl00_ctl01_lblParcelID",
    I_MIN: 1,
    I_MAX: 18500,
    //PARCEL_INPUT_SELECTOR: '#ctlBodyPane_ctl02_ctl01_txtParcelID',
    //SEARCH_BUTTON_SELECTOR: '#ctlBodyPane_ctl02_ctl01_btnSearch',
    AGREE_BUTTON_SELECTOR: '#appBody > div.modal.in > div > div > div.modal-focus-target > div.modal-footer > a.btn.btn-primary.button-1',
    TYPE: "QP",
    METHOD: "LOOP",
    CLOUDFLARE: true,
    DELAY_NEXT: 30000,
    PROXY: {host: 'socks5://localhost', port: '10808'},
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
            config = config_qpublic;
            config.RESULTS_PATH = 'res/parcel.dixie/';
            config.COUNTY="fl_dixie";
            config.PROXY={host: 'socks5://localhost', port: '10813'},
            await scrapper_cfg(config);
            break;
        case 'clay':
            config = config_qpublic;
            config.RESULTS_PATH = 'res/parcel.clay/';
            config.COUNTY="fl_clay";
            config.PROXY={host: 'socks5://localhost', port: '10809'},
            await scrapper_cfg(config);
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