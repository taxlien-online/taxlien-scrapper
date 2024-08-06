
/*
const URL = 'https://qpublic.schneidercorp.com/Application.aspx?AppID=867&LayerID=16385&PageTypeID=2&PageID=7230';
const CSV_FILE = 'list/fl_dixie.csv';
const PARCEL_INPUT_SELECTOR = '#ctlBodyPane_ctl02_ctl01_txtParcelID';
const SEARCH_BUTTON_SELECTOR = '#ctlBodyPane_ctl02_ctl01_btnSearch';
const PARCEL_FORMAT = (parcel) => `${parcel.slice(0, 6)}-${parcel.slice(6, 14)}-${parcel.slice(14)}`;
const AGREE_BUTTON_SELECTOR = '#appBody > div.modal.in > div > div > div.modal-focus-target > div.modal-footer > a.btn.btn-primary.button-1'
*/

//const URL = 'https://fl-dixie-taxcollector.governmax.com/collectmax/collect30.asp';





var config;


//CSV_FILE = 'list/fl_dixie.csv';
//PARCEL_FORMAT = (parcel) => `${parcel.slice(0, 6)}-${parcel.slice(6, 14)}-${parcel.slice(14)}`;

//const SELECTOR = '#ownerDiv > table:first-child > tbody > tr:first-child > td > table > tbody > tr:first-child > td:nth-child(3)';
//const IFRAME_SELECTOR = '#recordSearchContent_1_iframe';
//const SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(3) > b';
//const BUTTON_SELECTOR = '#ownerDiv > table:first-child > tbody > tr:first-child > td > table > tbody > tr:first-child > td:nth-child(4) > a > input';
//const BUTTON_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(4) > a > input';



var config_gis = {
    TYPE: "GIS",
    METHOD: "LOOP", I_MIN: 1, I_MAX: 18500,
    
    URL: 'https://union.floridapa.com/gis/?pin=1805210000005700',
    PARCEL_INPUT_SELECTOR: '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(3) > b',
    SEARCH_BUTTON_SELECTOR: '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > a > input';
    PARCEL_FORMAT = (parcel) => `${parcel.slice(0, 6)}-${parcel.slice(6, 14)}-${parcel.slice(14)}`,
    FRAME_NAME: "recordSearchContent_1_iframe",
    DELAY: 3000
}

var config_parcel_fl_bradford = {
    ...config_gis,
    URL: 'https://www.bradfordappraiser.com/gis/?pin=01680000000',
    COUNTY:"fl_bradford",
    RESULTS_PATH: 'res/parcel_fl_bradford/',
}

var config_parcel_fl_columbia = {
    ...config_gis,
    URL: 'https://columbia.floridapa.com/gis/?pin=142S1500061000',
    COUNTY:"fl_columbia",
    RESULTS_PATH: 'res/parcel_fl_columbia/',
}


var config_parcel_fl_lafayette = {
    ...config_gis,
    URL: 'https://www.lafayettepa.com/gis/?pin=0507140000000000200',
    COUNTY:"fl_lafayette",
    RESULTS_PATH: 'res/parcel_fl_lafayette/',
}

var config_parcel_fl_okeechobee = {
    ...config_gis,
    URL: 'https://www.okeechobeepa.com/gis/?pin=11536350040000400200',
    COUNTY:"fl_okeechobee",
    RESULTS_PATH: 'res/parcel_fl_okeechobee/',
}

var config_parcel_fl_suwannee = {
    ...config_gis,
    URL: 'https://www.suwanneepa.com/gis/?pin=0403S11E11334000000',
    COUNTY:"fl_suwannee",
    RESULTS_PATH: 'res/parcel_fl_suwannee/',
}
var config_parcel_fl_union = {
    ...config_gis,
    URL: 'https://union.floridapa.com/gis/?pin=1805210000005700',
    COUNTY:"fl_union",
    RESULTS_PATH: 'res/parcel_fl_union/',
}



export var configs_other = {
    config_parcel_fl_bradford,
    config_parcel_fl_columbia,
    config_parcel_fl_lafayette,
    config_parcel_fl_okeechobee,
    config_parcel_fl_suwannee,
    config_parcel_fl_union
}
