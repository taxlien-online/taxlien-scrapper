
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
    
    URL: (id) => `https://union.floridapa.com/gis/?pin=${id}`,
    START: '1805210000005700',
    PARCEL_INPUT_SELECTOR: ['#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(3) > b'],
    NEXT_BUTTON_SELECTOR: [''],//#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(4) > a > input',
    PREV_BUTTON_SELECTOR: ['#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > a > input'],
    FRAME_NAME: "recordSearchContent_1_iframe",
    DELAY: 3000,

    PROXY: { host: 'socks5://localhost', port: '10809' },
}

var config_parcel_fl_bradford = {
    ...config_gis,
    URL: (id) => `https://www.bradfordappraiser.com/gis/?pin=${id}`,
    //START: '01680000000', //start
    START: '02169000103', //up
    //START: '01397000100', //down

    //PARCEL_FORMAT = (parcel) => `${parcel.slice(0, 6)}-${parcel.slice(6, 14)}-${parcel.slice(14)}`,

    COUNTY:"fl_bradford",
    RESULTS_PATH: '../../taxlien_db/res/parcel_fl_bradford/',
}

var config_parcel_fl_columbia = {
    ...config_gis,
    URL: (id) => `https://columbia.floridapa.com/gis/?pin=${id}`,
    //START: '142S1500061000', //start
    START: '112S1500010001', //up
    
    COUNTY:"fl_columbia",
    RESULTS_PATH: 'res/parcel_fl_columbia/',
}


var config_parcel_fl_lafayette = {
    ...config_gis,
    URL: (id) => `https://www.lafayettepa.com/gis/?pin=${id}`,
    //START: '0507140000000000200', //start
    START: '140714004100B000190', //up
    //START: '030714MINR000000200', //down
    
    COUNTY:"fl_lafayette",
    RESULTS_PATH: 'res/parcel_fl_lafayette/',
}

var config_parcel_fl_okeechobee = {
    ...config_gis,
    URL: (id) => `https://www.okeechobeepa.com/gis/?pin=${id}`,
    //START: '11536350040000400200', //start
    //START: '10336350040000000050',//down
    START: '10537350040004800100',//up
    COUNTY:"fl_okeechobee",
    RESULTS_PATH: 'res/parcel_fl_okeechobee/',
}

var config_parcel_fl_suwannee = {
    ...config_gis,
    URL: (id) => `https://www.suwanneepa.com/gis/?pin=${id}`,
    //START: '0403S11E11334000000', //start
    //START: '0401S12E09458020010', //down
    START: '0504S14E02955020210', //up
    COUNTY:"fl_suwannee",
    RESULTS_PATH: 'res/parcel_fl_suwannee/',
}
var config_parcel_fl_union = {
    ...config_gis,
    URL: (id) => `https://union.floridapa.com/gis/?pin=${id}`,
    //START: '1805210000005700', //start
    //START: '2604210000003110', //down
    START: '0106250000010750', //up
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
