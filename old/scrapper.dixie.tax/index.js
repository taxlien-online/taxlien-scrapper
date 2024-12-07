import { scrapper } from './scrapper.js';

/*
const URL = 'https://qpublic.schneidercorp.com/Application.aspx?AppID=867&LayerID=16385&PageTypeID=2&PageID=7230';
const CSV_FILE = 'list/fl_dixie.csv';
const PARCEL_INPUT_SELECTOR = '#ctlBodyPane_ctl02_ctl01_txtParcelID';
const SEARCH_BUTTON_SELECTOR = '#ctlBodyPane_ctl02_ctl01_btnSearch';
const PARCEL_FORMAT = (parcel) => `${parcel.slice(0, 6)}-${parcel.slice(6, 14)}-${parcel.slice(14)}`;
const AGREE_BUTTON_SELECTOR = '#appBody > div.modal.in > div > div > div.modal-focus-target > div.modal-footer > a.btn.btn-primary.button-1'
*/

//const URL = 'https://fl-dixie-taxcollector.governmax.com/collectmax/collect30.asp';
const URL = 'https://fl-dixie-taxcollector.governmax.com/collectmax/agency/fl-dixie-taxcollector/homepage.asp?sid=0D33CBD6D0AC4D3D866C864B449E2A7D'
const CSV_FILE = 'list/fl_dixie.csv';
const PARCEL_INPUT_SELECTOR = 'body > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > font > input[type=TEXT]';
// const SEARCH_BUTTON_SELECTOR = 'body > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > input[type=SUBMIT]';
const SEARCH_BUTTON_SELECTOR = 'body > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > input[type=SUBMIT]';
const PARCEL_FORMAT = (parcel) => `${parcel.slice(0, 6)}-${parcel.slice(6, 14)}-${parcel.slice(14)}`;
const AGREE_BUTTON_SELECTOR = 'body > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > center > a'


// Sleep function using Promise and setTimeout

await scrapper(URL,
    CSV_FILE,
    PARCEL_INPUT_SELECTOR,
    SEARCH_BUTTON_SELECTOR,
    PARCEL_FORMAT,
    AGREE_BUTTON_SELECTOR,
    false,
    3000);