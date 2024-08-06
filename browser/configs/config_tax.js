var config_tax_gm = {
    TYPE: "GM",
    METHOD: "CSV",    
    URL: 'https://fl-dixie-taxcollector.governmax.com/collectmax/agency/fl-dixie-taxcollector/homepage.asp?sid=0D33CBD6D0AC4D3D866C864B449E2A7D',
    PARCEL_INPUT_SELECTOR: 'body > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > font > input[type=TEXT]',
    // const SEARCH_BUTTON_SELECTOR = 'body > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > input[type=SUBMIT]',
    SEARCH_BUTTON_SELECTOR: 'body > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > input[type=SUBMIT]',
    AGREE_BUTTON_SELECTOR: 'body > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > center > a',
    DELAY: 3000
}

var config_tax_fl_dixie = {
    ...config_gis,
    URL: 'https://fl-dixie-taxcollector.governmax.com/collectmax/agency/fl-dixie-taxcollector/homepage.asp?sid=0D33CBD6D0AC4D3D866C864B449E2A7D',
    COUNTY:"fl_dixie",
    CSV_FILE: 'list/fl_dixie.csv',
    RESULTS_PATH: 'res/tax_fl_dixie/',
}

export var configs_tax = {
    config_tax_fl_dixie
}
