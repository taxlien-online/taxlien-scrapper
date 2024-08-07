//ACCOUNT_NUMBER_INPUT_SELECTOR: '#ctlBodyPane_ctl03_ctl01_srch1_txtInput',
//ACCOUNT_NUMBER_SEARCH_SELECTOR: '#ctlBodyPane_ctl03_ctl01_srch1_btnSearch',
//PARCEL_INPUT_SELECTOR: '#ctlBodyPane_ctl02_ctl01_txtParcelID',
//SEARCH_BUTTON_SELECTOR: '#ctlBodyPane_ctl02_ctl01_btnSearch',

const config_qpublic = {
    TYPE: "QP",
    METHOD: "LOOP", I_MIN: 1, I_MAX: 18500,
    
    URL: (id) => `https://qpublic.schneidercorp.com/Application.aspx?AppID=867&LayerID=16385&PageTypeID=4&PageID=7232&Q=1299906831&KeyValue=${id}`,
    START: '34-09-13-4496-0000-0040',
    NEXT_BUTTON_SELECTORS: ["#ToolBar1_btnNextRecord > span"],
    PREV_BUTTON_SELECTORS: ["#ToolBar1_btnNextRecord > span"],
    PARCEL_TEXT_SELECTORS: [
        "#ctlBodyPane_ctl00_ctl01_lblParcelID", //Dixie
        "#ctlBodyPane_ctl00_ctl01_dynamicSummary_rptrDynamicColumns_ctl00_pnlSingleValue > span" //Clay
    ],
    AGREE_BUTTON_SELECTORS: [
        '#appBody > div.modal.in > div > div > div.modal-focus-target > div.modal-footer > a.btn.btn-primary.button-1', //dixie
        "#appBody > div.modal.in > div > div > div.modal-focus-target > div.modal-footer > a" // Clay message
    ],
    MAP_IMG_SELECTOR: "#ctlBodyPane_ctl02_ctl01_imgMap",

    CLOUDFLARE: true,
    DELAY_NEXT: 30000,
    PROXY: { host: 'socks5://localhost', port: '10808' },
}

var config_parcel_fl_dixe =
{
    ...config_qpublic,
    COUNTY: "fl_dixie",
    RESULTS_PATH: 'res/parcel_fl_dixie/',
    URL: (id) => `https://qpublic.schneidercorp.com/Application.aspx?AppID=867&LayerID=16385&PageTypeID=4&PageID=7232&Q=1299906831&KeyValue=${id}`,
    //START: '34-09-13-4496-0000-0040', //start
    START: '36-13-11-0000-1295-0000', //up
    //PROXY:{};
    PROXY: { host: 'socks5://localhost', port: '10809' },
};

var config_parcel_fl_clay =
{
    ...config_qpublic,
    COUNTY: "fl_clay",
    RESULTS_PATH: 'res/parcel_fl_clay/',
    URL: (id) => `https://qpublic.schneidercorp.com/Application.aspx?AppID=830&LayerID=15008&PageTypeID=4&PageID=6756&Q=872484422&KeyValue=${id}`,
    START: '38-06-26-017620-000-00',
    //PROXY:{};
    PROXY: { host: 'socks5://localhost', port: '10810' },
};


export var configs_qpublic = {
    config_parcel_fl_dixe,
    config_parcel_fl_clay
}



