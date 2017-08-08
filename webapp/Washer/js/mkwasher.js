/* 
 * Copyright (c) 2017 by Samsung Electronics, Inc.,
 *
 * This software is the confidential and proprietary information
 * of Samsung Electronics, Inc. ("Confidential Information").  You
 * shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement
 * you entered into with Samsung.
 *
 */
var Debug_tag = 'WW : ';
var myScope;
var devType = 'Washer';
var app = angular.module("DASmartHomeDevice", ['toaster', 'ngSanitize', 'angular-svg-round-progress']);

var WASHERSCREENS = {
    HOME: 1,
    DETAILPAGE: 2,
    SETTINGS: 3,
    OPTIONS: 4,
    SMARTCARE: 5,
    ALARMSCREEN: 6,
    CYCLEFINISH: 7,
    ERRORTEXT: 8,
    ENERGYMONITOR: 9,
    SMARTCAREERROR: 10,
    ADDWASHPAGE: 11,
    LAUNDRYOUTPAGE: 12,
    KOREANCOMBOSETTINGPAGE: 15,
    MYFAVORITE: 16,
    ADDFAVORITE: 17,
    CYCLEMYFAVORITE: 18,
    FREEZEPROTECTIONALARMPAGE: 19,
    KOREANCOMBOSETTINGPAGEFAV: 20,
    INFORMATION: 21,
    OPENSOURCE: 22,
    COUNTRYLIST: 23,
    DRAINFILTEROPTION: 24,
    DRAINFILTERGUIDEPAGE: 25
};

var WASHER_DEVICEINFO = {
    WasherKor: "0121", //Drum Washer:Korea							
    DryerElecEng: "0132", //Dryer:US	
    DryerGasEng: "0142", //Dryer - Gas:US
    WasherDrumKor: "0151", //Drum Washer:Korea	
    DryerElecUs: "0152", //Dryer:US
    DryerGasUs: "0153", //GasDryer:US	
    WasherDrumUs: "0154", //DrumWasher:US
    DryerEu: "0155", //Dryer:Erope			
    DryerGasEu: "0156", //Dryer:GAS - Erope
    /**			
     * DrumWasher:Erope <br/>			
     * 중소형 Non LED:F900E			
     */
    WasherDrumEu: "0157",
    DryerAu: "0158", //Dryer:Austrailia
    DryerGasAu: "0159", //Dryer:GAS-Austrailia	
    WasherAu: "0160", //DrumWasher:Austrailia
    WasherSmallKor: "0161", //Medium size Drum Washer:Korea	
    DryerSmallEng: "0162", //Medium size Drum Dryer:America	
    WasherSmallGasEng: "0163", //Medium size Drum:Gas Washer:America
    WasherSmallEng: "0164", //Medium size Drum Washer:America	
    DryerSmallEu: "0165", //Medium size Drum Dryer:Europe	
    DryerSmallGasEu: "0166", //Medium size Drum:Gas Dryer:Europe
    WasherSmallEu: "0167", //Medium size Drum Washer:Europe	
    DryerSmallAu: "0168", //Medium size Drum Dryer:Australia
    DryerSmallGasAu: "0169", //Medium size Drum Dryer:Australia
    WasherSmallAu: "0170", //Medium size Drum Washer:Australia		
    Unknown: "01FF", //Unknown
    TopLoadUS: "0145", //TopLoader Washer:US
    DualWasherUS: "0146", //Dual Washer:US
    DualWasherCombo: "0147", //Dual Washer:Korea
    DualDryerUS: "0148", //Dual Dryer:US
    DualDryerGasUS: "0149" //Dual Dryer:Gas Dryer:US
};

var WASHER_DEVICEMODES = {
    'Notused': '00',
    'Normal': '01',
    'PowerBubble': '02',
    'Sanitize': '03',
    'Bedding': '04',
    'BubbleEco': '05',
    'WoolLingerie': '06',
    'QuickWash': '07',
    'BabyCare': '08',
    'BubbleSports': '09',
    'NightWash': '0A',
    'AirRefresh': '0B',
    'AirSanitize': '0C',
    'AirBeddingCare': '0D',
    'HeavyDuty': '0E',
    'BeddingPLUS': '0F',
    'ecoCold': '10',
    'Wool': '11',
    'Nursery': '12',
    'DEEPSTEAM': '13',
    'StainAway': '14',
    'PermPress': '15',
    'ActiveWear': '16',
    'DelicatesHandWash': '17',
    'PureCycle': '18',
    'RinseSpin': '19',
    'SpinOnly': '1A',
    'DiningKitchenwork': '1B',
    'GardeningNMachinery': '1C',
    'PicnicCamping': '1D',
    'Kidswear': '1E',
    'DeskOffice': '1F',
    'GarageMachinery': '20',
    'Towel': '21',
    'EcoNormal': '22',
    'Delicates': '23',
    'TimeDry': '24',
    'QuickDry': '25',
    'AirFluff': '26',
    'Refresh': '27',
    'WrinkleAway': '28',
    'OneStopBubble': '29',
    'Soak': '2A',
    'SportsBubble': '2B',
    'Synthetics': '2C',
    'WaterSaving': '2D',
    'DryOnly': '2E',
    'Cotton': '2F',
    'Denim': '30',
    'DarkGarment': '31',
    'DailyWash': '32',
    'EcoDrumClean': '33',
    'SuperEcoWash': '34',
    'OutdoorCare': '35',
    'HandWash': '36',
    'BabyBubble': '37',
    'EcoBubble': '38',
    'DryDrum': '39',
    'Bedding2': '3A',
    'Spin': '3B',
    'SmartWashTM': '3E',
    'CottonEco': '3F',
    'GoretexRefresh': '40',
    'Gardening': '41',
    'ActiveSports': '42',
    'HygieneCare': '43',
    'IntensiveCold': '44',
    'DrumClean': '45',
    'ECotton': '46',
    'SuperSpeed': '47',
    'Delicates2': '48',
    'Cooking': '49',
    'Everyday': '4A',
    'Sportswear': '4B',
    'KidsWear2': '4C',
    'Shirts': '4D',
    'Deodorization': '4E',
    'Sanitization': '4F',
    'CottonDry': '50',
    'SyntheticsDry': '51',
    'OutdoorWaterCare': '52',
    'PaddingCare': '53',
    'Allergen': '54',
    'Whites': '55',
    'Towels': '56',
    'SelfClean': '57',
    'WashandWear': '58',
    'BeddingCare': '59',
    'NotSupported': 'FD',
    'Unknown': 'FE',
    'NULL': 'FF',
    'Cotton1': '5B',
    'Superspeed1': '5C',
    'SuperEcoWash1': '5D',
    'Delicates1': '5E',
    'BabyCare1': '5F',
    'OutdoorCare1': '60',
    'DarkGarment1': '61',
    'SpecialityCare': '62',
    'EcoDrumClean1': '63',
    'RinseSpin1': '64',
    'Wool1': '65',
    'Bedding1': '66',
    'Synthetics1': '67',
    'ECotton1': '68',
    'IntensiveCold1': '69',
    'DOWNJACKET': '6A',
    'Spin1': '6B',
    'Denim1': '6C',
    'DrumClean1': '6D',
    'ECotton2': '6E',
    'SteamSanitize_US': '6F',
    'HeavyDuty_US': '70',
    'Bedding_US': '71',
    'Sanitize_US': '72',
    'RinseSpin_US': '73',
    'ActiveWear_US': '74',
    'Delicates_US': '75',
    'Wool_US': '76',
    'PremPress_US': '77',
    'QuickWash_US': '78',
    'EcoCold_US': '79',
    'DeepSteam_US': '7A',
    'StainAway_US': '7B',
    'WrinkleAway_US': '7C',
    'Refresh_US': '7D',
    'AirFluff_US': '7E',
    'TimeDry_US': '7F',
    'QuickDry_US': '80',
    'EcoNormal_US': '81',
    'SuperSpeed_US': '8C',
    'DeepWash_US': '8D',
    'BrilliantWhites_US': '8E',
    'BeddingWaterProof_US': '8F',
    'Spin_US': '90',
    'SelfClean_US': '91',
    'AirWash_US': '92',
    'IronDry_US': '93',
    'Towels_US': '94',
    'Time_Dry_US': '95',
    'CoolAir_US': '96',
    'WarmAir_US': '97',
    'QuickDry35_US': '98',
    'Mix_US': '99',
    'Cotton_US': '9A',
    'Steam_Sanitize_US': '9B',
    'Heavy_Duty_US': '9C',
    'Rinse_Spin_US': '9D',
    'Perm_Press_US': '9E',
    'Quick_Wash_US': '9F',
    'Air_Fluff_US': 'A0',
    'Wrinkle_Away_US': 'A1',
    'Delicates_17_US': 'A2',
    'Active_Wear_US': 'A3',
    'Time_Dry_17_US': 'A4',
    'Bedding_17_US': 'A5',
    'Quick_Dry_US': 'A6',
    'Sanitize_17_US': 'A9',
    'Whites_17_US': 'AA',
    'EcoCold_17_US': 'AB',
    'Normal_17': 'AC',
    'ShirtBlouse_17_US': 'AD',
    'Undergarment_17_US': 'AE',
    'Sweater_17_US': 'AF',
    'Accessory_17_US': 'B0',
    'SelfClean_17_US': 'B1',
    'AirRefreshSanitize_17': 'B2',
    'OutdoorCare_17_EUROPE': 'B4',
    'Wool_17_EUROPE': 'B5',
    'Synthetics_17_EUROPE': 'B6',
    'SelfClean_17_FLEXGLOBAL': 'B7',
    'Drying_UAE_17_FLEXGLOBAL': 'B8',
    'RinseSpin_17_FLEXGLOBAL': 'B9',
    'DrainSpin_17_MK': 'BA',
    'QuickWash_17_FLEXGLOBAL': 'BB',
    'Delicates_17_FLEXGLOBAL': 'BC',
    'AutoOptimalWash_17_MK': 'BD',
    'Cotton_17_FLEXGLOBAL': 'BE',
    'Wool_17_FLEXGLOBAL': 'BF',
    'WashWear_17_FLEXGLOBAL': 'C0',
    'PowerBubble_17_FLEXGLOBAL': 'C1',
    'BabyCare_17_FLEXGLOBAL': 'C2',
    'Outdoor_17_FLEXGLOBAL': 'C3',
    'EcoTubClean_17_FLEXGLOBAL': 'C4',
    'AirBeddingCare_17_FLEXGLOBAL': 'C5',
    'DryingDrum_17_FLEXGLOBAL': 'C6',
    'EcoDrumClean_17_FLEXGLOBAL': 'C7',
    'TubClean_17_FLEXGLOBAL': 'C8',
    '59WashDry_17_EUROPE': 'C9',
    'AirWash_17_EUROPE': 'CA',
    '15QuickWash_17_EUROPE': 'CB',
    'BabyCare_17_EUROPE': 'CC',
    'OutdoorCare17_EUROPE': 'CD',
    'Bedding_17_FLEXGLOBAL': 'CE',
    'Drying_17_FLEXGLOBAL': 'CF',
    'Cotton_17_MK': 'D0',
    'eCotton_17_MK': 'D1',
    'Synthetics_17_MK': 'D2',
    'Delicates_17_MK': 'D3',
    'RinseSpin_17_MK': 'D4',
    'EcoDrumClean_17_MK': 'D5',
    'Bedding_17_MK': 'D6',
    'OutdoorCare_17_MK': 'D7',
    'Wool_17_MK': 'D8',
    'DarkGarment_17_MK': 'D9',
    'SuperEcoWash_17_MK': 'DA',
    'SuperSpeed_17_MK': 'DB',
    '15QuickWash_17_MK': 'DC'
};

var WASHERTOUPDATE = {
    NONE: 0,
    SINGLEWASHER: 1,
    MAINWASHER: 2,
    SUBWASHER: 3
};

var WASHERCURRENTSEL = {
    NONE: 0,
    SUB_SELECTED: 1,
    MAIN_SELECTED: 2
};

var WASHER_TEMP = {
    "TAPCOLD": "WEBMOB_device_washer_option_temp_tapcold",
    "COLD": "WEBMOB_device_washer_option_temp_cold",
    "COOL": "WEBMOB_device_washer_option_temp_cool",
    "EcoWarm": "WEBMOB_device_washer_option_temp_ecowarm",
    "Warm": "WEBMOB_device_washer_option_temp_warm",
    "Hot": "WEBMOB_device_washer_option_temp_hot",
    "ExtraHot": "WEBMOB_device_washer_option_temp_extrahot",
    "ExtraLow": "WEBMOB_device_washer_option_temp_extralow",
    "Low": "WEBMOB_device_washer_option_temp_low",
    "MediumLow": "WEBMOB_device_washer_option_temp_mediumlow",
    "Medium": "WEBMOB_device_washer_option_temp_medium",
    "High": "WEBMOB_device_washer_option_temp_high",
    "T20": "WEBMOB_device_washer_option_temp_20",
    "T30": "WEBMOB_device_washer_option_temp_30",
    "T40": "WEBMOB_device_washer_option_temp_40",
    "T50": "WEBMOB_device_washer_option_temp_50",
    "T60": "WEBMOB_device_washer_option_temp_60",
    "T65": "WEBMOB_device_washer_option_temp_65",
    "T70": "WEBMOB_device_washer_option_temp_70",
    "T75": "WEBMOB_device_washer_option_temp_75",
    "T80": "WEBMOB_device_washer_option_temp_80",
    "T90": "WEBMOB_device_washer_option_temp_90",
    "T95": "WEBMOB_device_washer_option_temp_95",
    "None": "-"
};

var WASHER_SPIN = {
    None: "WEBMOB_device_washer_option_spin_none",
    NoSpin: "WEBMOB_device_washer_option_spin_no",
    Low: "WEBMOB_device_washer_option_spin_low",
    Delicate: "WEBMOB_device_washer_option_spin_delicate",
    Medium: "WEBMOB_device_washer_option_spin_medium",
    High: "WEBMOB_device_washer_option_spin_high",
    ExtraHigh: "WEBMOB_device_washer_option_spin_extrahigh",
    ExtraLow: "WEBMOB_device_washer_option_spin_extralow",
    RinseHold: "WEBMOB_device_washer_option_spin_none",
    S200: "WEBMOB_device_washer_option_spin_200",
    S400: "WEBMOB_device_washer_option_spin_400",
    S600: "WEBMOB_device_washer_option_spin_600",
    S800: "WEBMOB_device_washer_option_spin_800",
    S1000: "WEBMOB_device_washer_option_spin_1000",
    S1200: "WEBMOB_device_washer_option_spin_1200",
    S1400: "WEBMOB_device_washer_option_spin_1400",
    S1600: "WEBMOB_device_washer_option_spin_1600",
    // exception case for wifi module problem. After OTN done, can remove "Unknown" : 170417
    Unknown: "WEBMOB_device_washer_option_spin_extralow",
    Unknown18: "WEBMOB_device_washer_option_spin_extralow"
            //-----------------------------------------------------------------------------
};

var WASHER_RINSE = {
    R0: "WEBMOB_device_washer_option_rinse_no",
    R1: "WEBMOB_device_washer_option_rinse_1",
    R2: "WEBMOB_device_washer_option_rinse_2",
    R3: "WEBMOB_device_washer_option_rinse_3",
    R4: "WEBMOB_device_washer_option_rinse_4",
    R5: "WEBMOB_device_washer_option_rinse_5"
};

var WASHER_SOIL = {
    "ExtraHeavy": "WEBMOB_device_washer_option_soil_extraheavy",
    "Heavy": "WEBMOB_device_washer_option_soil_heavy",
    "Normal": "WEBMOB_device_washer_option_soil_normal",
    "Light": "WEBMOB_device_washer_option_soil_light",
    "ExtraLight": "WEBMOB_device_washer_option_soil_extralight",
    "Up": "WEBMOB_device_washer_option_soil_up",
    "Down": "WEBMOB_device_washer_option_soil_down",
    "None": "-"
};

var WASHER_DRY_LEVEL = {
    "None": "WEBMOB_device_washer_option_dry_combo_no_dry",
    "Normal": "WEBMOB_device_washer_option_dry_combo_normal",
    "ExtraDry": "WEBMOB_device_washer_option_dry_combo_power",
    "Shirt": "WEBMOB_device_washer_option_dry_combo_shirt",
    "Delicates": "WEBMOB_device_washer_option_dry_combo_delicate",
    "T30": "WEBMOB_device_washer_option_dry_combo_time_30",
    "T60": "WEBMOB_device_washer_option_dry_combo_time_60",
    "T90": "WEBMOB_device_washer_option_dry_combo_time_90",
    "T120": "WEBMOB_device_washer_option_dry_combo_time_120",
    "T150": "WEBMOB_device_washer_option_dry_combo_time_150",
    "Drum20": "20",
    "Drum40": "40",
    "Drum60": "60"
};

var WASHER_COMMANDS = {
    "getDevices": "getDevices",
    "startWasher": "startWasher",
    "pauseWasher": "pauseWasher",
    "cancelWasher": "cancelWasher",
    "autoDetergent": "autoDetergent",
    "autosoftener": "autosoftener",
    "laundry": "laundry",
    "wrinklePrevent": "wrinklePrevent",
    "diagnosis": "diagnosis",
    "PARSE_MODULEINFO": "PARSE_MODULEINFO",
    "DB_RESET": "UsagesDB_reset",
    "ADD_WASH": "add_wash",
    "STATUS_204": 204,
    "syncTime": "syncTime",
    "PARSE_CONFIGURATION": "PARSE_CONFIGURATION",
    "SAEMLESS_CONTROL": "SAEMLESS_CONTROL",
    "FREEZE_PROTECTION_ALARM": "FREEZE_PROTECTION_ALARM"
};

var WASHER_DETERGENT = {
    "Normal": 1,
    "Less": 2,
    "Empty": 3
};

var WASHER_SOFTNER = {
    "Normal": 1,
    "Less": 2,
    "Empty": 3
};

var WASHER_PROGRESSDISPLAY = {
    delaywash: "Delaywash", //:"WMMOB_delay_end",
    Weightsensing: "Weightsensing", //:"WMMOB_progressing_01",
    Prewash: "Prewash", //"WMMOB_progressing_02",
    Wash: "Wash", //"WMMOB_progressing_03",
    Rinse: "Rinse", //"WMMOB_progressing_04",
    Spin: "Spin", //"WMMOB_progressing_05",
    Sud: "Sud", //"WMMOB_progressing_06",
    Drying: "Drying", //"WMMOB_progressing_07",
    Airwash: "Airwash", //"WMMOB_progressing_08",
    Cooling: "Cooling", //"WMMOB_progressing_09",
    Wrinkleprevent: "Wrinkleprevent", //"WMMOB_progressing_10",
    Finish: "Finish", //"WMMOB_progressing_11",
    Waitend: "Waitend", //"WMMOB_progressing_12",
    Pause: "Paused.", //"WMMOB_pause_state"
    None: "None"
};

var WASHERALERT = {
    NONE: 0,
    CANCEL: 1,
    WRINKLE: 2,
    CYCLEFINISHED: 3,
    POWEROFF: 4,
    AUTODETERGENT: 5,
    ALARMSERVICE: 6,
    VENT: 7,
    CONNECTION_FAILURE: 8,
    DISPENSER_OPEN: 9,
    RESETENERGY: 10,
    DELETE_MYFAVORITES: 11,
    OTN_UPDATE: 12,
    DRAINFILTER_GUIDE: 13
};

var WASHER_ALERT_ID = {
    NONE: 0,
    OTN_POPUP: 10001
};

var WASHER_DRYCOMBO = {
    'none': 'WEBMOB_device_washer_option_dry_combo_no_dry',
    'normal': 'WEBMOB_device_washer_option_dry_combo_normal',
    'strong': 'WEBMOB_device_washer_option_dry_combo_power',
    'shirts': 'WEBMOB_device_washer_option_dry_combo_shirt',
    'low': 'WEBMOB_device_washer_option_dry_combo_delicate',
    'more': 'WEBMOB_device_washer_option_dry_combo_time',
    'cupboard': 'WEBMOB_device_washer_option_dry_combo_cupboard',
    'DL30': 'WEBMOB_device_washer_option_dry_combo_time_30',
    'DL60': 'WEBMOB_device_washer_option_dry_combo_time_60',
    'DL90': 'WEBMOB_device_washer_option_dry_combo_time_90',
    'DL120': 'WEBMOB_device_washer_option_dry_combo_time_120',
    'DL150': 'WEBMOB_device_washer_option_dry_combo_time_150',
    'DL180': 'WEBMOB_device_washer_option_dry_combo_time_180',
    'DL210': 'WEBMOB_device_washer_option_dry_combo_time_210',
    'DL240': 'WEBMOB_device_washer_option_dry_combo_time_240',
    'DL270': 'WEBMOB_device_washer_option_dry_combo_time_270'
};

var BUBBLE_SOAK = {
    NOTUSED: 0,
    ON: 1,
    OFF: 2
};

var SA_WASHER = {
    HOME: {
        SCREEN: "DA251",
        BACK: "DA2511",
        HELP: "DA2513",
        TOP_LOADER_STATUS: "DA2515",
        TOP_LOADER_START_PAUSE: "DA2516",
        FRONT_LOADER_STATUS: "DA2518",
        FRONT_LOADER_START_PAUSE: "DA2519"
    },
    HOME_READY: {
        SCREEN: "DA251",
        BACK: "DA2511",
        HELP: "DA2513",
        TOP_LOADER_STATUS: "DA2515",
        TOP_LOADER_START_PAUSE: "DA2516",
        FRONT_LOADER_STATUS: "DA2518",
        FRONT_LOADER_START_PAUSE: "DA2519"
    },
    HOME_RUNNING: {
        SCREEN: "DA252",
        BACK: "DA2511",
        HELP: "DA2513",
        TOP_LOADER_STATUS: "DA2515",
        TOP_LOADER_START_PAUSE: "DA2516",
        FRONT_LOADER_STATUS: "DA2518",
        FRONT_LOADER_START_PAUSE: "DA2519"
    },
    HOME_COMPLETE: {
        SCREEN: "DA253",
        BACK: "DA2511",
        HELP: "DA2513",
        TOP_LOADER_STATUS: "DA2515",
        TOP_LOADER_START_PAUSE: "DA2516",
        FRONT_LOADER_STATUS: "DA2518",
        FRONT_LOADER_START_PAUSE: "DA2519"
    },
    HOME_ERROR: {
        SCREEN: "DA254",
        BACK: "DA2511",
        HELP: "DA2513",
        TOP_LOADER_STATUS: "DA2515",
        TOP_LOADER_START_PAUSE: "DA2516",
        FRONT_LOADER_STATUS: "DA2518",
        FRONT_LOADER_START_PAUSE: "DA2519"
    },
    HOME_SMART_CONTROL_OFF: {
        SCREEN: "DA255",
        BACK: "DA2511",
        HELP: "DA2513",
        TOP_LOADER_STATUS: "DA2515",
        TOP_LOADER_START_PAUSE: "DA2516",
        FRONT_LOADER_STATUS: "DA2518",
        FRONT_LOADER_START_PAUSE: "DA2519"
    },
    HOME_DEVICE_OFF: {
        SCREEN: "DA256",
        BACK: "DA2511",
        HELP: "DA2513",
        TOP_LOADER_STATUS: "DA2515",
        TOP_LOADER_START_PAUSE: "DA2516",
        FRONT_LOADER_STATUS: "DA2518",
        FRONT_LOADER_START_PAUSE: "DA2519"
    },
    FRONT_LOAD_DETAIL_PAGE: {
        SCREEN: "DA201",
        BACK: "DA2001",
        HELP: "DA2003",
        MORE_BTN: "DA2004",
        WASHER_MODE_SELECTION: "DA2005",
        START_BTN: "DA2006",
        PAUSE_BTN: "DA2022",
        CANCEL_BTN: "DA2024",
        BOTTOM_TEMP_OPTION: "DA2008",
        BOTTOM_SPIN_OPTION: "DA2009",
        BOTTOM_SOIL_LEVEL_OPTION: "DA2010",
        BOTTOM_RENAINING_LAUNDRY_OPTION: "DA2011",
        BOTTOM_MY_FAVORITE_OPTION: "DA2012",
        BOTTOM_SMART_CONTROL_OPTION: "DA2013",
        MORE_BTN_SETTINGS: "DA2014",
        MORE_BTN_ABOUT_DEVICE: "DA2015"
    },
    TOP_LOAD_DETAIL_PAGE: {
        SCREEN: "DA202",
        BACK: "DA2001",
        HELP: "DA2003",
        MORE_BTN: "DA2004",
        WASHER_MODE_SELECTION: "DA2005",
        START_BTN: "DA2006",
        PAUSE_BTN: "DA2022",
        CANCEL_BTN: "DA2024",
        BOTTOM_TEMP_OPTION: "DA2008",
        BOTTOM_SPIN_OPTION: "DA2009",
        BOTTOM_SOIL_LEVEL_OPTION: "DA2010",
        BOTTOM_RENAINING_LAUNDRY_OPTION: "DA2011",
        BOTTOM_MY_FAVORITE_OPTION: "DA2012",
        BOTTOM_SMART_CONTROL_OPTION: "DA2013",
        MORE_BTN_SETTINGS: "DA2014",
        MORE_BTN_ABOUT_DEVICE: "DA2015"
    },
    MODE_SELECTION: {
        SCREEN: "DA207",
        MODE_SELECTED: "DA2071"
    },
    SMART_CONTROL_NOTIFICATION_POPUP: {
        SCREEN: "DA261",
        OK_BTN: "DA2613"
    },
    SMART_CONTROL_POPUP: {
        SCREEN: "DA203",
        STAY_CONNECTED: "DA2033",
        OK_BTN: "DA2034"
    },
    CYCLE_CANCEL_POPUP: {
        SCREEN: "DA204",
        CANCEL_BTN: "DA2042",
        YES_BTN: "DA2043"
    },
    HOME_HELP_PAGE: {
        SCREEN: "DA295",
        CLOSE_BTN: "DA2952"
    },
    DETAIL_HELP_PAGE: {
        SCREEN: "DA226",
        CLOSE_BTN: "DA2262"
    },
    MY_FAVORITE_PAGE: {
        SCREEN: "DA208",
        BACK: "DA2001",
        MORE_BTN: "DA2004",
        MY_FAVORITE_LIST: "DA2082",
        REMOVE_MY_FAVORITE_LIST: "DA2083",
        START_NOW: "DA2084",
        ADD_FAVORITE: "DA2085"
    },
    MY_FAVORITE_DELETE_PAGE: {
        SCREEN: "DA209",
        SELECT_ALL: "DA2091",
        CANCEL_BTN: "DA2092",
        DELETE_BTN: "DA2093",
        MY_FAVORITE_LIST_SELECTED_NOTSELECTED: "DA2094"
    },
    ADD_EDIT_MY_FAVORITE_PAGE: {
        SCREEN: "DA210",
        CANCEL_BTN: "DA2101",
        SAVE_BTN: "DA2102",
        SET_MY_FAVORITE_CYCLE: "DA2106",
        SET_MY_FAVORITE_TEMP: "DA2107",
        SET_MY_FAVORITE_SPIN: "DA2108",
        SET_MY_FAVORITE_SOIL_LEVEL: "DA2109"
    },
    SELECT_CYCLE_FOR_FAVORITE_PAGE: {
        SCREEN: "DA211",
        BACK: "DA2001",
        SELECT_MY_FAVORITE_CYCLE: "DA2112"
    },
    REMAINING_LAUNDRY_PAGE: {
        SCREEN: "DA212",
        BACK: "DA2001",
        REMAINING_LAUNDRY_SWITCH: "DA2123",
        EVERY_30_MIN: "DA2125",
        EVERY_60_MIN: "DA2126",
        EVERY_90_MIN: "DA2127"
    },
    SETTINGS: {
        SCREEN: "DA213",
        BACK: "DA2001",
        AUTO_DETERGENT: "DA2133",
        AUTO_SOFTNER: "DA2135",
        ADD_WASH_ALARM: "DA2136",
        SYBC_TIME_INFO: "DA2138",
        ENERGY_MONITOR: "DA2139"
    },
    ADD_WASH_ALARM_PAGE: {
        SCREEN: "DA214",
        BACK: "DA2001",
        ADD_WASH_ALARM_SWITCH: "DA2143",
        WHEN_STARTING_RINSING: "DA2145",
        WHEN_STARTING_FINAL_RINSE: "DA2146",
        WHEN_STARTING_SPINNING: "DA2147"
    },
    CLEAN_HISTORY_PAGE: {
        SCREEN: "DA215",
        BACK: "DA2001"
    },
    ENERGY_MONITOR: {
        SCREEN: "DA216",
        BACK: "DA2001",
        MORE_BTN: "DA2004",
        DAY_TAB: "DA2162",
        WEEK_TAB: "DA2163",
        MONTH_TAB: "DA2164",
        PREVIOUS_PERIOD: "DA2165",
        NEXT_PERIOD: "DA2167",
        MORE_BTN_RESET_HISTORY: "DA2169"
    },
    RESET_HISTORY_POPUP: {
        SCREEN: "DA217",
        OK_BTN: "DA2173"
    },
    CYCLE_SELECTION: {
        SCREEN: "DA218",
        CYCLE_SELECTED: "DA2181"

    },
    TEMP_SELECTION_POPUP: {
        SCREEN: "DA219",
        TEMP_SELECTED: "DA2191"
    },
    FREEZE_ALARM_PAGE: {
        SCREEN: "DA220",
        BACK: "DA2001",
        FREEZE_ALARM_SWITCH: "DA2203"
    },
    AUTO_DETERGENT_SOFTENER_POPUP: {
        SCREEN: "DA221",
        OK_BTN: "DA2212"
    },
    SMART_CHECK_ERROR_PAGE: {
        SCREEN: "DA224",
        BACK: "DA2001",
        CALL_SERVICE_CENTER: "DA2244"
    }
};
app.controller("mkWSController", function ($scope, SHPService, $timeout, CourseParseService, EnergyService, STCONST, toaster, KEYCODE, CountryService, $sce) {

    var previousScreen, tutpreviousScreen, mostUsedCourseName, mostUsedSelected, steamModel, tempSteamModel,
            soilDisable, soilDisableMain, soilDisableSub, tempDisable, tempDisableMain, tempDisableSub, dmName, dryLevelEnabled,
            deviceCurrentMode, deviceTemp, deviceTempMain, deviceTempSub,
            deviceRinse, deviceRinseMain, deviceRinseSub, previousScreenAtSelfCheck,
            deviceTempDryComboLevel, deviceTempDryComboLevelMain, deviceTempDryComboLevelSub,
            deviceSoil, deviceSoilMain, deviceSoilSub, dryLevelTemp, supportedProgress, sendAddWashCommand, promise, currentLaundryVal, currentLaundryValMain,
            currentLaundryValSub, tempLaundryVal, tempLaundryValMain, tempLaundryValSub, currentRunItem, currentRunItemMain, currentRunItemSub,
            appSelectedItem, clearTime, reqParamCountrySelection, data, remoteControlEnabledPrevValue,
            remoteControlEnabledPrevValueMain, remoteControlEnabledPrevValueSub, deviceTypeVal;

    var debugMode = false, errorDemoPage = false, chatErrorPage = false, clickedDiagnosis = false,
            quickwashoff = false, steamTempDisable = false, steamTempDisableMain = false, steamTempDisableSub = false, tempNoti = false, getSmartControlNoti = false, firstParse = true,
            firstConfigCheck = true, firstConfigCheckDualTop = true, firstConfigCheckDualFront = true, initialDataParsed = false,
            favPopUpChanged = false, cancelCommandFromFav = false, powerOffPopUp = false, rinseSelected = false, drainFilterVisibility = true;

    var demoModeVersionClickCount = 0;
    var startCommandFromFavIndex = -1;
    var cHeight = 0, cWidth = 0, base = 0;
    var setEndTimerDrag = $("#setEndTimerDrag");
    var scroll_middle_area = document.getElementById("scrollSettings");
    $scope.circleWidth = document.getElementById("circularProgress").offsetWidth;
    $scope.circleHeight = document.getElementById("circularProgress").offsetHeight;

    $scope.circleWidthMain = document.getElementById("circularProgressMain").offsetWidth;
    $scope.circleHeightMain = document.getElementById("circularProgressMain").offsetHeight;

    $scope.radiusMain = $scope.circleHeightMain / 2;
    $scope.strokeMain = Math.ceil($scope.circleHeightMain / 5);//20 //for dual wahser progress bar

    $scope.radiusSub = $scope.circleHeightMain / 2;
    $scope.strokeSub = Math.ceil($scope.circleHeightMain / 5);//20 //for dual wahser progress bar

    if ($scope.applePhone) {
        $scope.diameterMain = $scope.radiusMain * 2 + 2;
        $scope.diameterSub = $scope.radiusSub * 2 + 2;
    } else {
        $scope.diameterMain = $scope.radiusMain * 2;
        $scope.diameterSub = $scope.radiusSub * 2;
    }


    //    LANG = "KO-KR";
    var langArr = Object.keys(LANGUAGE_FILE.language);
    if (langArr.indexOf(LANG.toUpperCase()) !== -1) {
        data = LANGUAGE_FILE["language"][LANG.toUpperCase()];
    } else if (langArr.indexOf(LANG.toUpperCase().substring(0, 2)) !== -1) {
        data = LANGUAGE_FILE["language"][LANG.toUpperCase().substring(0, 2)];
    } else {
        data = LANGUAGE_FILE["language"]["DEFAULT"];
    }

    $scope.translation = data;

    var langArrCommon = Object.keys(LANGUAGE_FILE_COMMON.language);
    if (langArrCommon.indexOf(LANG.toUpperCase()) !== -1) {
        $scope.translationCommon = LANGUAGE_FILE_COMMON["language"][LANG.toUpperCase()];
    } else if (langArrCommon.indexOf(LANG.toUpperCase().substring(0, 2)) !== -1) {
        $scope.translationCommon = LANGUAGE_FILE_COMMON["language"][LANG.toUpperCase().substring(0, 2)];
    } else {
        $scope.translationCommon = LANGUAGE_FILE_COMMON["language"]["DEFAULT"];
    }

    myScope = angular.element(document.getElementById("bodyTag")).scope();
    $scope.currentDeviceName = $scope.translation.WEBMOB_common_device_washer;

//    $scope.deviceName = $scope.translation.WEBMOB_common_device_washer;
    $scope.popupName;
    $scope.translation;
    $scope.enrgyMonitorTab;
    $scope.tempSlide = document.getElementById('tempSlider');
    $scope.initSelectValue = 0;
    $scope.FavID = null;
    $scope.isNoti = !true;
    $scope.addWash = false;
    $scope.homePage = true;
    $scope.clockwise = true;
    $scope.dontShow = false;
    $scope.spinOnly = false;
    $scope.cycFinish = false;
    $scope.rinseOnly = false;
    $scope.dryingOnly = false;
    $scope.detailPage = false;
    $scope.isErrorSub = false;
    $scope.addWashSub = false;
    $scope.spinOnlySub = false;
    $scope.addWashMain = false;
    $scope.isErrorMain = false;
    $scope.isTopLoader = false;
    $scope.rinseOnlySub = false;
    $scope.spinOnlyMain = false;
    //$scope.showSyncTime = false;
    $scope.isDualWasher = false;
    $scope.bOptionPopUp = false;
    $scope.cycFinishSub = false;
    $scope.cycFinishMain = false;
    $scope.rinseOnlyMain = false;
    $scope.descHasDongle = false;
    $scope.dryingOnlySub = false;
    //$scope.showSyncTimeSub = false;
    $scope.dryingOnlyMain = false;
    //$scope.showSyncTimeMain = false;
    $scope.washNotIncluded = false;
    $scope.rinseremove0102 = false;
    $scope.descHasDongleSub = false;
    $scope.descHasDongleMain = false;
    $scope.indicatorExpanded = false;
    $scope.samrtControlPopup = false;
    $scope.showDemoErrorList = false;
    $scope.isSubWasherPowerOn = true;
    $scope.washNotIncludedSub = false;

    $scope.isMainWasherPowerOn = true;
    $scope.washNotIncludedMain = false;
    $scope.cancelButtonPressed = false;

    $scope.confirmButtonPressed = false;
    $scope.serviceButtonPressed = false;
    $scope.remoteControlEnabled = false;
    $scope.rinseOnlyAtSetCourse = false;
    $scope.remoteControlEnabledSub = true;
    $scope.remoteControlEnabledMain = true;
    $scope.rinseOnlyAtSetCourseSub = false;
    $scope.rinseOnlyAtSetCourseMain = false;
    $scope.countrySelectionPopupVisible = false;
    $scope.setFreezeProtectionCommandComing = false;
    $scope.showCountryList = false;
    $scope.countryListDetail = [];

    $scope.max = 100;
    $scope.iterations = 50;
    $scope.setEndTimeValue = 0;
    $scope.callServiceIndex = 0;
    $scope.koreanComboIndex = 0;
    $scope.mostUsedItemIndex = 0;
    $scope.dialCallNumLength = 1;
    $scope.koreanComboSubIndex = 0;
    $scope.incrementProgress = 0.1;
    $scope.countrySelectedIndex = 0;
    $scope.radius = $scope.circleHeight / 2;
    $scope.stroke = 20;//Math.ceil($scope.circleHeight / 2); // for progress bar height //20
    $scope.diameter = $scope.applePhone ? $scope.radius * 2 + 2 : $scope.radius * 2;

    $scope.switchON = 'I';
    $scope.switchOff = 'O';
    $scope.rounded = "true";
    $scope.bgColor = '#FAFAFA00';
    $scope.smartControlDesc = "";
    $scope.smartControlTitle = "";
    $scope.deviceStatusMain = 'Ready';
    $scope.deviceStatusSub = 'Ready';
    $scope.BottomPopupDivCls = '';
    $scope.containSubCl = "containSub";
    $scope.ModeSelectionPopupDivCls = '';
    $scope.currentAnimation = 'easeOutCubic';
    $scope.BottomPopupDimBackgroundDiv = '';
    $scope.washerToUpdate = WASHERTOUPDATE.NONE;
    $scope.currentWasherSelected = WASHERCURRENTSEL.NONE;
    $scope.previousScreenError = WASHERSCREENS.DETAILPAGE;
    $scope.getYAxisValue = EnergyService.getYAxisValue;
    $scope.currentCourseEnum = 'WEBMOB_device_washer_course_01';
    $scope.currentCourseEnumMain = 'WEBMOB_device_washer_course_01';
    $scope.currentCourseEnumSub = 'WEBMOB_device_washer_course_01';
    $scope.addWashDesc = $scope.translation.WEBMOB_device_washer_add_wash_desc;
    $scope.remainingLaundryDesc = $scope.translation.WEBMOB_device_washer_laundryout_desc;
    $scope.smartControlOnOffText = $scope.translation.WEBMOB_device_washer_comm_off_CL;
    $scope.addWashAlarm = $scope.translation.WEBMOB_device_washer_settings_addwash_alarm;
    $scope.freezeProtectionAlarmOnOFf = $scope.translation.WEBMOB_device_washer_comm_off_CL;
    $scope.progressColor = 'rgb(54,149,221)';
    /*if ($scope.appVersionInitial === '' || $scope.appVersionInitial === undefined) {
     $scope.appVersionInitial = "WW(D).1.0.6";
     }*/
    $scope.appVersion = "WW(D).SC.0.59";
    $scope.errorList = [];
    $scope.dialCallNum = [];
    $scope.checkResponse = [];
    $scope.countryToSelect = [];
    $scope.arrImages = ["washer"];
    $scope.topLoaderModelArray = ['0145'];
    $scope.optionsMenu = [{
            id: 0,
            title: $scope.translation.WEBMOB_common_settings
        }, {
            id: 1,
            title: $scope.translation.WEBMOB_common_help_desk
        }, {
            id: 2,
            title: $scope.translation.WEBMOB_common_tutorial
        }, {
            id: 3,
            title: $scope.translation.WEBMOB_common_self_diagnosis
        }, {
            id: 4,
            title: $scope.translationCommon.WEBMOB_common_device_select_a_country
        }, {
            id: 5,
            title: $scope.translationCommon.WEBMOB_common_device_information
        }, {
            id: 6,
            title: $scope.translation.WEBMOB_common_energy_monitor_reset_history
        }, {
            id: 7,
            title: $scope.translation.WEBMOB_device_washer_comm_delete
        }, {
            id: 8,
            title: $scope.translation.WEBMOB_common_error_code
        }, {
            id: 9,
            title: $scope.translation.WEBMOB_device_washer_comm_usage_guide
        }];

    $scope.koreanComboOptions = [{
            id: 0,
            title: 'First option'
        }, {
            id: 1,
            title: 'Second option'
        }, {
            id: 2,
            title: 'Third option'
        }, {
            id: 3,
            title: 'Fourth option'
        }, {
            id: 4,
            title: 'Fifth option'
        }, {
            id: 5,
            title: 'Sixth option'
        }];

    $scope.koreanComboSubOptions = [{
            id: 0,
            title: 'First Suboption'
        }, {
            id: 1,
            title: 'Second Suboption'
        }, {
            id: 2,
            title: 'Third Suboption'
        }, {
            id: 3,
            title: 'Fourth Suboption'
        }, {
            id: 4,
            title: 'Fifth Suboption'
        }, {
            id: 5,
            title: 'Sixth Suboption'
        }];

    $scope.erroTextArray = [
        "WEBMOB_device_washer_error_title_te1",
        "WEBMOB_device_washer_error_title_te2",
        "WEBMOB_device_washer_error_title_te3",
        "WEBMOB_device_washer_error_title_tc1",
        "WEBMOB_device_washer_error_title_tc2",
        "WEBMOB_device_washer_error_title_tc3",
        "WEBMOB_device_washer_error_title_3e1",
        "WEBMOB_device_washer_error_title_3e2",
        "WEBMOB_device_washer_error_title_3e3",
        "WEBMOB_device_washer_error_title_3e4",
        "WEBMOB_device_washer_error_title_be",
        "WEBMOB_device_washer_error_title_3c1",
        "WEBMOB_device_washer_error_title_3c2",
        "WEBMOB_device_washer_error_title_3c3",
        "WEBMOB_device_washer_error_title_3c4",
        "WEBMOB_device_washer_error_title_bc",
        "WEBMOB_device_washer_error_title_9e1",
        "WEBMOB_device_washer_error_title_9e2",
        "WEBMOB_device_washer_error_title_be2",
        "WEBMOB_device_washer_error_title_de",
        "WEBMOB_device_washer_error_title_9c1",
        "WEBMOB_device_washer_error_title_9c2",
        "WEBMOB_device_washer_error_title_bc2",
        "WEBMOB_device_washer_error_title_dc",
        "WEBMOB_device_washer_error_title_de1",
        "WEBMOB_device_washer_error_title_de2",
        "WEBMOB_device_washer_error_title_ae",
        "WEBMOB_device_washer_error_title_dc1",
        "WEBMOB_device_washer_error_title_dc2",
        "WEBMOB_device_washer_error_title_ac",
        "WEBMOB_device_washer_error_title_oe",
        "WEBMOB_device_washer_error_title_le",
        "WEBMOB_device_washer_error_title_le1",
        "WEBMOB_device_washer_error_title_fe",
        "WEBMOB_device_washer_error_title_4e",
        "WEBMOB_device_washer_error_title_4e2",
        "WEBMOB_device_washer_error_title_oc",
        "WEBMOB_device_washer_error_title_lc",
        "WEBMOB_device_washer_error_title_lc1",
        "WEBMOB_device_washer_error_title_fc",
        "WEBMOB_device_washer_error_title_4c",
        "WEBMOB_device_washer_error_title_4c2",
        "WEBMOB_device_washer_error_title_5e",
        "WEBMOB_device_washer_error_title_he",
        "WEBMOB_device_washer_error_title_he1",
        "WEBMOB_device_washer_error_title_he2",
        "WEBMOB_device_washer_error_title_ce",
        "WEBMOB_device_washer_error_title_5c",
        "WEBMOB_device_washer_error_title_hc",
        "WEBMOB_device_washer_error_title_hc1",
        "WEBMOB_device_washer_error_title_hc2",
        "WEBMOB_device_washer_error_title_cc",
        "WEBMOB_device_washer_error_title_ue",
        "WEBMOB_device_washer_error_title_8e",
        "WEBMOB_device_washer_error_title_1e",
        "WEBMOB_device_washer_error_title_pe",
        "WEBMOB_device_washer_error_title_ub",
        "WEBMOB_device_washer_error_title_8c",
        "WEBMOB_device_washer_error_title_1c",
        "WEBMOB_device_washer_error_title_pc",
        "WEBMOB_device_washer_error_title_sde",
        "WEBMOB_device_washer_error_title_sdc",
        "WEBMOB_device_washer_error_title_6e",
        "WEBMOB_device_washer_error_title_ae3",
        "WEBMOB_device_washer_error_title_ae4",
        "WEBMOB_device_washer_error_title_ae5",
        "WEBMOB_device_washer_error_title_ae6",
        "WEBMOB_device_washer_error_title_6c",
        "WEBMOB_device_washer_error_title_ac3",
        "WEBMOB_device_washer_error_title_ac4",
        "WEBMOB_device_washer_error_title_ac5",
        "WEBMOB_device_washer_error_title_ac6",
        "WEBMOB_device_washer_error_title_4e3",
        "WEBMOB_device_washer_error_title_te4",
        "WEBMOB_device_washer_error_title_4c3",
        "WEBMOB_device_washer_error_title_tc4",
        "WEBMOB_device_washer_error_title_te5",
        "WEBMOB_device_washer_error_title_5e_dry",
        "WEBMOB_device_washer_error_title_ddc",
        "WEBMOB_device_washer_error_title_dc3"
    ];

    $scope.countryToSelect.push({'Country': 'Belgium'});
    $scope.countryToSelect.push({'Country': 'Belgium(F)'});

    function debugMessage(message) {
        if (debugMode) {
            console.log(Debug_tag + message);
        }
    }

    //Tutorial arrays
    $scope.arrHeader = [$scope.translation.WEBMOB_device_washer_error_title_5e];
    $scope.arrSubHeader = [$scope.translation.WEBMOB_common_device_washer];

    if (LANG.toUpperCase().indexOf('EN') !== -1) {
        $scope.switchON = 'ON';
        $scope.switchOff = 'OFF';
    }

    if (LANG.toUpperCase() === 'KO-KR') {
        $scope.isTutorialEnable = true;
    }

    if (window.navigator.platform === 'iPhone' || window.navigator.platform === 'iPad') {
        $scope.applePhone = true;
    } else {
        $scope.applePhone = false;
    }

    if ($scope.isStatic && !$scope.deviceUuid) {
        parseStaticData();
    }

    $timeout(function () {
        cHeight = window.screen.availHeight;
        cWidth = window.screen.availWidth;
        if (cHeight === 0 || cHeight === undefined) {
            cHeight = document.body.clientHeight;
        }
        if (cWidth === 0 || cWidth === undefined) {
            cWidth = document.body.clientWidth;
        }
        base = ((80 * cWidth) / 1440);
        $scope.screenAreaHeight = (cHeight / base);
    }, 10);

    $scope.init = init;
    $scope.options = options;
    $scope.getColor = getColor;
    $scope.closeApp = closeApp;
    $scope.settings = settings;
    $scope.openAbout = openAbout;
    $scope.closeNoti = closeNoti;
    $scope.isChecked = isChecked;
    $scope.callCenter = callCenter;
    $scope.closepopup = closepopup;
    $scope.isPowerOff = isPowerOff;
    $scope.setCountry = setCountry;
    $scope.selectIndex = selectIndex;
    $scope.createArray = createArray;
    $scope.onOkClicked = onOkClicked;
    $scope.getSaveText = getSaveText;
    $scope.cycleConfirm = cycleConfirm;
    $scope.retUpperCase = retUpperCase;
    $scope.showHelpText = showHelpText;
    $scope.isMainHeader = isMainHeader;
    $scope.saveFavorite = saveFavorite;
    $scope.showOTNPopup = showOTNPopup;
    $scope.getCancelText = getCancelText;
    $scope.callGetDevice = callGetDevice;
    $scope.showDailyData = showDailyData;
    $scope.isEnergyReset = isEnergyReset;
    $scope.onAboutAction = onAboutAction;
    $scope.startProgress = startProgress;
    $scope.onBackPressed = onBackPressed;
    $scope.startFavorite = startFavorite;
    $scope.isItemChecked = isItemChecked;
    $scope.hideMoreOption = hideMoreOption;
    $scope.cancelFavorite = cancelFavorite;
    $scope.closeAllPopups = closeAllPopups;
    $scope.getSoilDisable = getSoilDisable;
    $scope.isSoilSelected = isSoilSelected;
    $scope.showWeeklyData = showWeeklyData;
    $scope.getTempDisable = getTempDisable;
    $scope.isTempSelected = isTempSelected;
    $scope.getSpinDisable = getSpinDisable;
    $scope.isSpinSelected = isSpinSelected;
    $scope.showDetailPage = showDetailPage;
    $scope.doAlarmService = doAlarmService;
    $scope.closeSpinPopup = closeSpinPopup;
    $scope.closeSoilPopup = closeSoilPopup;
    $scope.showMyFavorite = showMyFavorite;
    $scope.editMyFavorite = editMyFavorite;
    $scope.cancelProgress = cancelProgress;
    $scope.getDryLevelImg = getDryLevelImg;
    $scope.getHeaderTitle = getHeaderTitle;
    $scope.showCancelSave = showCancelSave;
    $scope.saveSetEndTime = saveSetEndTime;
    $scope.showAddFavorite = showAddFavorite;
    $scope.isSpinnerActive = isSpinnerActive;
    $scope.callTutorialURL = callTutorialURL;
    $scope.parseStaticData = parseStaticData;
    $scope.openPopovermode = openPopovermode;
    $scope.openPopoverTemp = openPopoverTemp;
    $scope.openPopoverSpin = openPopoverSpin;
    $scope.getSpinConstant = getSpinConstant;
    $scope.getTempConstant = getTempConstant;
    $scope.getSoilConstant = getSoilConstant;
    $scope.closeRinsePopup = closeRinsePopup;
    $scope.getRinseDisable = getRinseDisable;
    $scope.isRinseSelected = isRinseSelected;
    $scope.getmodeSelected = getmodeSelected;
    $scope.getModeDisabled = getModeDisabled;
    $scope.doCancelWashing = doCancelWashing;
    $scope.selectIndexTemp = selectIndexTemp;
    $scope.selectIndexSpin = selectIndexSpin;
    $scope.selectIndexSpinValue = selectIndexSpinValue;
    $scope.showMonthlyData = showMonthlyData;
    $scope.showOptionPopup = showOptionPopup;
    $scope.onAddWashSwitch = onAddWashSwitch;
    $scope.onLaundrySwitch = onLaundrySwitch;
    $scope.toggleCheckList = toggleCheckList;
    $scope.parseDeviceData = parseDeviceData;
    $scope.clickOpenSource = clickOpenSource;
    $scope.handleKeyAction = handleKeyAction;
    $scope.openLaundryPage = openLaundryPage;
    $scope.isMostUsedCourse = isMostUsedCourse;
    $scope.getRinseConstant = getRinseConstant;
    $scope.onCloseTempPopup = onCloseTempPopup;
    $scope.updateDeviceData = updateDeviceData;
    $scope.onSettingsUpdate = onSettingsUpdate;
    $scope.openPopoverRinse = openPopoverRinse;
    $scope.selectIndexRinse = selectIndexRinse;
    $scope.getEcottonCourse = getEcottonCourse;
    $scope.setTempSelectValue = setTempSelectValue;
    $scope.showNextDaysData = showNextDaysData;
    $scope.closeOptionPopUp = closeOptionPopUp;
    $scope.sendResetCommand = sendResetCommand;
    $scope.setSelectAllText = setSelectAllText;
    $scope.cancelSetEndTime = cancelSetEndTime;
    $scope.cancelMultiSelect = cancelMultiSelect;
    $scope.parseNotification = parseNotification;
    $scope.onCountrySelected = onCountrySelected;
    $scope.goToEnergyMonitor = goToEnergyMonitor;
    $scope.fetchDBfromDevice = fetchDBfromDevice;
    $scope.showUsageHelpPage = showUsageHelpPage;
    $scope.openAddWashScreen = openAddWashScreen;
    $scope.numOfCheckedItems = numOfCheckedItems;
    $scope.isAllItemsChecked = isAllItemsChecked;
    $scope.openPopoverTempFav = openPopoverTempFav;
    $scope.openPopoverSpinFav = openPopoverSpinFav;
    $scope.parseConfiguration = parseConfiguration;
    $scope.requestFailHandler = requestFailHandler;
    $scope.powerButtonPressed = powerButtonPressed;
    $scope.openErrorTextArray = openErrorTextArray;
    $scope.closeUsageHelpPage = closeUsageHelpPage;
    $scope.openLaundryOutPage = openLaundryOutPage;
    $scope.saveButtonFavorite = saveButtonFavorite;
    $scope.hasFavoriteChanged = hasFavoriteChanged;
    $scope.cancelSaveFavorite = cancelSaveFavorite;
    $scope.toggleAllCheckList = toggleAllCheckList;
    $scope.openSetEndTimePopUp = openSetEndTimePopUp;
    $scope.goToInformationPage = goToInformationPage;
    $scope.selectIndexDryLevel = selectIndexDryLevel;
    $scope.openPopoverRinseFav = openPopoverRinseFav;
    $scope.laundryItemSelected = laundryItemSelected;
    $scope.addWashItemSelected = addWashItemSelected;
    $scope.smartcareerrorcheck = smartcareerrorcheck;
    $scope.getDryComboDisabled = getDryComboDisabled;
    $scope.getTempDisableMyFav = getTempDisableMyFav;
    $scope.getSpinDisableMyFav = getSpinDisableMyFav;
    $scope.getSoilDisableMyFav = getSoilDisableMyFav;
    $scope.okClickedAtPowerOff = okClickedAtPowerOff;
    $scope.setSelectOptionText = setSelectOptionText;
    $scope.setDeleteOptionText = setDeleteOptionText;
    $scope.setCancelOptionText = setCancelOptionText;
    //$scope.getDeviceTypeInitial = getDeviceTypeInitial;
    $scope.getSmartControlImage = getSmartControlImage;
    $scope.showDrumCleanHistory = showDrumCleanHistory;
    $scope.getRinseDisableMyFav = getRinseDisableMyFav;
    $scope.parseRequestAccepted = parseRequestAccepted;
    $scope.parseRequestResponse = parseRequestResponse;
    $scope.openPopoverSoilLevel = openPopoverSoilLevel;
    $scope.showPreviousDaysData = showPreviousDaysData;
    $scope.parseEnergyUsageData = parseEnergyUsageData;
    $scope.getTempSelectedPopUp = getTempSelectedPopUp;
    $scope.getSpinSelectedPopUp = getSpinSelectedPopUp;
    $scope.getSoilSelectedPopUp = getSoilSelectedPopUp;
    $scope.handleInitialResponse = handleInitialResponse;
    $scope.showDrainFilterOption = showDrainFilterOption;
    $scope.showMultiSelectHeader = showMultiSelectHeader;
    $scope.isHeaderOptionVisible = isHeaderOptionVisible;
    $scope.openDryComboLevelPage = openDryComboLevelPage;
    $scope.getRinseSelectedPopUp = getRinseSelectedPopUp;
    $scope.changeSeamLessControl = changeSeamLessControl;
    $scope.isEnergyResetDisabled = isEnergyResetDisabled;
    $scope.selectMyFavoriteCycle = selectMyFavoriteCycle;
    $scope.updateSetEndTimeValue = updateSetEndTimeValue;
    $scope.changeBubbleSoakOption = changeBubbleSoakOption;
    $scope.getDryComboDisabledFav = getDryComboDisabledFav;
    $scope.selectIndexDryLevelFav = selectIndexDryLevelFav;
    $scope.selectIndexForFavorite = selectIndexForFavorite;
    $scope.showOptionItemsVisible = showOptionItemsVisible;
    $scope.hideSmartControlOption = hideSmartControlOption;
    $scope.selectTempFromSettings = selectTempFromSettings;
    $scope.selectSoilFromSettings = selectSoilFromSettings;
    $scope.selectSpinFromSettings = selectSpinFromSettings;
    $scope.selectRinseFromSettings = selectRinseFromSettings;
    $scope.disableTempContentsFunc = disableTempContentsFunc;
    $scope.disableSoilContentsFunc = disableSoilContentsFunc;
    $scope.openPopoverSoilLevelFav = openPopoverSoilLevelFav;
    $scope.disableSpinContentsFunc = disableSpinContentsFunc;
    $scope.numberOfEnableDryOptions = numberOfEnableDryOptions;
    $scope.openDryComboLevelPageFav = openDryComboLevelPageFav;
    $scope.getDryComboLevelConstant = getDryComboLevelConstant;
    $scope.callServiceIndexSelected = callServiceIndexSelected;
    $scope.selectIndexTempSoilLevel = selectIndexTempSoilLevel;
    $scope.toggleSmartControlButton = toggleSmartControlButton;
    $scope.removeItemFromMyFavorite = removeItemFromMyFavorite;
    $scope.disableFavoriteHeaterSpec = disableFavoriteHeaterSpec;
    $scope.openDrainFilterUsageGuide = openDrainFilterUsageGuide;
    $scope.getSpinDisableKoreanSpecs = getSpinDisableKoreanSpecs;
    $scope.handleEnergyMonitorErrors = handleEnergyMonitorErrors;
    $scope.selectIndexFromOptionMenu = selectIndexFromOptionMenu;
    $scope.showConnectionFailurePopup = showConnectionFailurePopup;
    $scope.onCountrySelectedOkClicked = onCountrySelectedOkClicked;
    $scope.closeCountrySelectionPopup = closeCountrySelectionPopup;
    $scope.toggleSelectAllListCheckBox = toggleSelectAllListCheckBox;
    $scope.deleteItemsFromFavoriteList = deleteItemsFromFavoriteList;
    $scope.toggleWashIndicatorInfoArea = toggleWashIndicatorInfoArea;
    $scope.onKoreanComboOptionsSelected = onKoreanComboOptionsSelected;
    $scope.onFreezeProtectionAlarmToggle = onFreezeProtectionAlarmToggle;
    $scope.confirmDeleteItemsFromFavorite = confirmDeleteItemsFromFavorite;
    $scope.getSpinDisableKoreanSpecsMyFav = getSpinDisableKoreanSpecsMyFav;
    $scope.onKoreanComboOptionsSelectedFav = onKoreanComboOptionsSelectedFav;
    $scope.selectIndexKoreanComboSubOption = selectIndexKoreanComboSubOption;
    $scope.longPressOnItemFromFavoritePage = longPressOnItemFromFavoritePage;
    $scope.openFreezeProtectionAlarmScreen = openFreezeProtectionAlarmScreen;
    $scope.onCloseKoreanComboSubOptionPopup = onCloseKoreanComboSubOptionPopup;
    $scope.selectIndexKoreanComboSubOptionFav = selectIndexKoreanComboSubOptionFav;
    $scope.cancelButtonPressedFromMultiSelect = cancelButtonPressedFromMultiSelect;
    $scope.onCloseKoreanComboSubOptionPopupFav = onCloseKoreanComboSubOptionPopupFav;

    CountryService.getCountryList();
    CountryService.initCountrySearchText();

    $scope.$watchGroup(['washingTimes', 'drumCleanProposal', 'screenAreaHeight', 'drumCleanHistoryPage'], function () {
        var el = document.getElementById("filterlayerstyle");
        var elt = document.getElementById("drumCleanWashingTextTop");
        var el_scroll = document.getElementById("drumHistoryScrollable");
        var sPos = getPositionElement("main_header_divId");
        el_scroll.style.maxHeight = $scope.screenAreaHeight - 14.6 - 1.2 + 'rem';
        if (Number($scope.washingTimes) < Number($scope.drumCleanProposal)) {
            el.style.width = $scope.washingTimes * 12.825 / $scope.drumCleanProposal + 'rem';
            el.style.backgroundColor = '#89cfec';
            elt.style.color = 'rgb(0,171,241)';
            $scope.drumCleanAlert = false;
        } else {
            el.style.backgroundColor = 'rgb(249,132,122)';
            el.style.width = 16 + 'rem';
            elt.style.color = 'rgb(255,115,102)';
            $scope.drumCleanAlert = true;
        }
    });

    $scope.$watchGroup(['currentSpinList', 'currentCourseEnum', 'currentSpinList', 'spinOnly', 'rinseOnly', 'dryingOnly', 'setRinse', 'setSpin', 'setDryComboLevel', 'deviceStatus'], function () {
        var count = 0;
        if ($scope.listItemsSpin !== undefined) {
            for (var i = 0; i < $scope.listItemsSpin.length; i++)
            {
                if (!$scope.getSpinDisable($scope.listItemsSpin[i])) {
                    $scope.setSpinHighest = $scope.listItemsSpin[i];
                    break;
                }
            }
            for (var i = 0; i < $scope.listItemsSpin.length; i++)
            {
                if (!$scope.getSpinDisable($scope.listItemsSpin[i]) && !$scope.getSpinDisableKoreanSpecs($scope.listItemsSpin[i])) {
                    ++count;
                }
            }
        }
        if (count <= 1)
            $scope.spinOneItemEnable = true;
        else
            $scope.spinOneItemEnable = false;
    });

    $scope.$watchGroup(['isDryComboLevel', 'deviceStatus'], function () {
        //$scope.disableSpinContentsSubstitue a new varriable is  added to counter disableSpinContents in some special cases because changing it required lot of changes in the code
        // Condition is such that it will be used only for korean combo model
        if ($scope.isDryComboLevel && $scope.deviceStatus !== "Run" && $scope.deviceStatus !== "Pause") {
            $scope.disableSpinContentsSubstitue = false;
        } else {
            $scope.disableSpinContentsSubstitue = true;
        }
    });

//    //This condition is added because if spin value is not supported  then due to the flow of code it may have some garbage values but actually we dont have any information about the rinse value
//    $scope.$watchGroup (['isSpin','setSpin'],function(){
//        if($scope.isSpin === false){
//            $scope.setSpin = undefined;
//        }
//        
//    });

    // exception case for wifi module problem. After OTN done, can remove "Unknown" : 170417
    $scope.$watchGroup(['setSpin'], function () {
        if ($scope.currentSpinList !== undefined && ($scope.currentSpinList.indexOf("Unknown") > -1)) {
            console.log("[Flex Global F210 Exception]SetSpin : " + $scope.setSpin + " -> Unknown");
            if ($scope.setSpin === "18") {
                $scope.setSpin = "Unknown";
            }
        }
    });
    //-----------------------------------------------------------------------------

    $scope.$watchGroup(['rinseOnly', 'dryingOnly', 'spinOnly'], function () {
        if ($scope.rinseOnly) {
            $scope.dryingOnly = false;
            $scope.spinOnly = false;
            // patch code because for some model they are sending none and for some model they are sending RinseHold @Shashank Saurabh 2_9_2017
            if (angular.isDefined($scope.Device.Washer) && angular.isDefined($scope.Device.Washer.supportedSpinLevel) && $scope.Device.Washer.supportedSpinLevel.indexOf("None") !== -1) {
                $scope.setSpin = "None";
            } else {
                $scope.setSpin = "RinseHold";
            }
            $scope.koreanComboIndex = 0;
        } else if ($scope.spinOnly) {
            $scope.rinseOnly = false;
            $scope.dryingOnly = false;
            $scope.setRinse = "0";
            $scope.koreanComboIndex = 0;
        } else if ($scope.dryingOnly) {
            $scope.rinseOnly = false;
            $scope.spinOnly = false;
            $scope.setRinse = "0";
            // patch code because for some model they are sending none and for some model they are sending RinseHold @Shashank Saurabh 2_9_2017
            if (angular.isDefined($scope.Device.Washer.supportedSpinLevel) && $scope.Device.Washer.supportedSpinLevel.indexOf("None") !== -1) {
                $scope.setSpin = "None";
            } else {
                $scope.setSpin = "RinseHold";
            }
            $scope.koreanComboIndex = 0;
        }
    });

    $scope.$watchGroup(['setRinse', 'setDryComboLevel', 'setSpin', 'currentCourseEnum'], function () {
        if (($scope.setSpin === "RinseHold" || $scope.setSpin === "None") && ($scope.setDryComboLevel === "" || $scope.setDryComboLevel === undefined || $scope.setDryComboLevel === "None") && ($scope.disabletempContents || $scope.isTemp === false)) {
            $scope.dryingOnly = false;
            $scope.spinOnly = false;
            if ($scope.rinseOnly !== true) {
                $scope.rinseOnly = true;
                $scope.rinseOnlySetByApp = true;
            }
        }
        // if isSpin = false then we are not sure of setSpin value...then we check for what is the status of rinseOnly at the set in the default condition and rinseOnly is updted accordingly
        else if (($scope.isSpin === false && $scope.rinseOnlyAtSetCourse && deviceCurrentMode === $scope.deviceMode) && $scope.setDryComboLevel === "None" && ($scope.disabletempContents || $scope.isTemp === false)) {
            $scope.dryingOnly = false;
            $scope.spinOnly = false;
            if ($scope.rinseOnly !== true) {
                $scope.rinseOnly = true;
                $scope.rinseOnlySetByApp = false;
            }
        } else if ($scope.setRinse === "0" && ($scope.setDryComboLevel === "" || $scope.setDryComboLevel === undefined || $scope.setDryComboLevel === "None") && ($scope.disabletempContents || $scope.isTemp === false)) {
            $scope.dryingOnly = false;
            if ($scope.spinOnly !== true) {
                $scope.spinOnly = true;
                $scope.spinOnlySetByApp = true;
            }
            $scope.rinseOnly = false;
        } else if (($scope.setSpin === "RinseHold" || $scope.setSpin === "None") && $scope.setRinse === "0" && ($scope.disabletempContents || $scope.isTemp === false)) {
            if ($scope.dryingOnly !== true) {
                $scope.dryingOnly = true;
                $scope.dryingOnlySetByApp = true;
            }
            $scope.spinOnly = false;
            $scope.rinseOnly = false;
        } else {
            $scope.dryingOnly = false;
            $scope.spinOnly = false;
            $scope.rinseOnly = false;
        }
    });

    $scope.$watchGroup(['setRinse', 'setDryComboLevel'], function () {
        if ($scope.setDryComboLevel !== "None" && $scope.setDryComboLevel !== "" && $scope.setDryComboLevel !== undefined && !$scope.dryingOnly && $scope.isDryComboLevel)
        {
            $scope.setSpin = $scope.setSpinHighest;
        }
    });

    $scope.$watchGroup(['setSpinFav', 'setDryComboLevelFav', 'setRinseFav'], function () {
        if ($scope.setDryComboLevelFav !== "None" && $scope.setDryComboLevelFav !== "" && $scope.setDryComboLevelFav !== undefined && !(($scope.isRinseFav === false || $scope.setRinseFav === '0') && ($scope.disableTempContentsFav || $scope.isTempFav === false))) {
            $scope.setSpinFav = getSpinHighestFav();
            $scope.disableSpinFav = true;
        } else {
            $scope.disableSpinFav = false;
        }
    });

    $scope.$watchGroup(['currentCourseEnumSub'], function () {
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED && $scope.currentCourseEnumSub === "WEBMOB_device_washer_course_a9")
        {
            if ($scope.setDryComboLevel !== "None" || Number($scope.setTemp) >= 60 || $scope.currentCourseEnum === "WEBMOB_device_washer_course_a9" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_25" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_2e" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_b2" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_0d" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_53" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_52" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_39" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_b1" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_c0" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_cf" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_3d" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_c5" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_0b" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_52" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_c6" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_c7") {
                if ($scope.listItemsModes !== undefined && deviceCurrentMode !== undefined) {
                    for (var i = 0; i < $scope.listItemsModes.length; i++) {
                        if (deviceCurrentMode === $scope.listItemsModes[i].courseNameHex) {
                            selectIndex($scope.listItemsModes[i], i);
                            break;
                        }
                    }
                }
            }
        }
    });

    //This is included because of a special case that in korean combo model when rinse only is selected or Rinse + Spin course is selected then the meaning of temeperature is different and it must be enabled 
    //deviceModelMain is used because sub data was wrong "Problem of the set"
    $scope.$watchGroup(['deviceModel', 'currentWasherSelected', 'currentCourseEnum', 'rinseOnly', 'deviceStatus'], function () {
        if ($scope.deviceModelMain !== undefined && $scope.deviceModelMain.slice(11, 15) === WASHER_DEVICEINFO.DualWasherCombo && $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED && ($scope.currentCourseEnum === "WEBMOB_device_washer_course_9d" || $scope.rinseOnly || $scope.spinOnly) && $scope.deviceStatus === "Ready") {
            $scope.disabletempContentsSubstitute = false;
        } else {
            $scope.disabletempContentsSubstitute = true;
        }

    });

    $scope.$watchGroup(['currentCourseEnumMain', 'setDryComboLevelMain', 'setTempMain'], function () {
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED && ($scope.setDryComboLevelMain !== "None" || Number($scope.setTempMain) >= 60 || ($scope.currentCourseEnumMain === "WEBMOB_device_washer_course_a9" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_25" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_2e" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_b2" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_0d" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_53" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_52" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_39" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_b1" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_c0" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_cf" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_3d" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_c5" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_0b" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_52" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_c6" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_c7")))
        {
            if ($scope.currentCourseEnum === "WEBMOB_device_washer_course_a9") {
                if ($scope.listItemsModes !== undefined && deviceCurrentMode !== undefined) {
                    for (var i = 0; i < $scope.listItemsModes.length; i++) {
                        if (deviceCurrentMode === $scope.listItemsModes[i].courseNameHex) {
                            selectIndex($scope.listItemsModes[i], i);
                            break;
                        }
                    }
                }
            }
        }
    });



    /***
     * set selected country in local storage
     * @param {type} countryName
     * @returns {undefined}
     */
    function setCountry(countryName) {
        if (CountryService.isCountryExists()) {
            CountryService.setCountryData(countryName);
        } else {
            CountryService.setCountryData(countryName);
            goToHome();
        }
        return;
    }

    /***
     * country list updated when search 
     * @returns {undefined}
     */
    $scope.searchValueUpdated = function () {
        CountryService.searchUpdatedValues();
    };

    $scope.checkCountrySearchEmpty = function () {
        if ($scope.countryToBeSearched === '') {
            return true;
        }
        return false;
    };

    $scope.clearSearchText = function () {
        document.getElementById("countrySearchId").value = '';
        searchValueUpdated();
        $scope.countryToBeSearched = '';
    };

    $scope.hightlightSearchText = function (text) {
        return CountryService.hightlightSearchText(text);
    };

    function disableFavoriteHeaterSpec(index) {
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED && $scope.currentCourseEnumSub === "WEBMOB_device_washer_course_a9")
        {
            if ($scope.myFavoriteList[index].defaultDryCombo !== "None" || Number($scope.myFavoriteList[index].defaultTemp) >= 60 || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_a9" || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_25" || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_2e" || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_b2" || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_0d" || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_53" || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_52" || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_39" || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_b1" || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_c0" || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_cf" || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_3d" || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_c5" || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_0b" || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_52" || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_c6" || $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_c7") {
                return true;
            }
        }
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED && $scope.myFavoriteList[index].courseEnum === "WEBMOB_device_washer_course_a9" && ($scope.setDryComboLevelMain !== "None" || Number($scope.setTempMain) >= 60 || ($scope.currentCourseEnumMain === "WEBMOB_device_washer_course_a9" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_25" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_2e" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_b2" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_0d" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_53" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_52" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_39" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_b1" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_c0" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_cf" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_3d" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_c5" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_0b" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_52" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_c6" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_c7")))
        {
            return true;
        }
        return false;

    }

    function numberOfEnableDryOptions() {
        var count = 0;
        if ($scope.currentDryComboLevelList !== undefined) {
            for (var i = 0; i < $scope.currentDryComboLevelList.length; i++) {
                if (getDryComboDisabled($scope.currentDryComboLevelList[i]) === false) {
                    ++count;
                }
            }
        }
        return count;
    }

    function disableSpinContentsFunc() {

        if ($scope.disablespinContents && $scope.disableSpinContentsSubstitue !== false)
        {
            return true;
        } else {
            return false;
        }

    }

    //This is included because of a special case that in korean combo model when rinse only is selected or Rinse + Spin course is selected then the meaning of temeperature is different and it must be enabled 
    function disableTempContentsFunc() {
        if (steamTempDisable || $scope.disabletempContents && $scope.disabletempContentsSubstitute !== false) {
            return true;
        } else {
            return false;
        }
    }

    function disableSoilContentsFunc() {
        if (soilDisable || $scope.disablesoilContents || !$scope.remoteControlEnabled || $scope.kidsLock || $scope.currentSoilList.length < 2) {
            return true;
        } else {
            return false;
        }
    }

    function getModeDisabled(index) {
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED && $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_a9" && (($scope.setDryComboLevelMain !== "None" && $scope.isDryComboLevelMain) || Number($scope.setTempMain) >= 60 || ($scope.currentCourseEnumMain === "WEBMOB_device_washer_course_a9" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_25" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_2e" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_b2" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_0d" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_53" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_52" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_39" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_b1" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_c0" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_cf" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_3d" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_c5" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_0b" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_52" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_c6" || $scope.currentCourseEnumMain === "WEBMOB_device_washer_course_c7")))
        {
            return true;
        }
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED && $scope.currentCourseEnumSub === "WEBMOB_device_washer_course_a9")
        {
            if ($scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_a9" || $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_25" || $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_2e" || $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_b2" || $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_0d" || $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_53" || $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_52" || $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_39" || $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_b1" || $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_c0" || $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_cf" || $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_3d" || $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_c5" || $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_0b" || $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_52" || $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_c6" || $scope.listItemsModes[index].CourseEnum === "WEBMOB_device_washer_course_c7")
                return true;
        }
        return false;
    }
    
    function isMostUsedCourse(index) {
        if ($scope.listItemsModes[index].courseNameHex === $scope.mostUsed) {
            return true;
        }
        return false;
    }
    
    function showCancelSave() {
        return $scope.addFavoritePage;
    }

    function hasFavoriteChanged() {
        return true; //TODO check whether need to add any condition or not
    }

    function saveFavorite() {
        sendSAData(SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SCREEN, SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SAVE_BTN, "", "");
        saveButtonFavorite();
    }

    function cancelFavorite() {
        sendSAData(SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SCREEN, SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.CANCEL_BTN, "", "");
        cancelSaveFavorite();
    }

    function getSaveText() {
        return $scope.translation.WEBMOB_device_washer_comm_save_CL;
    }

    function getCancelText() {
        return $scope.translation.WEBMOB_common_cancel_capital;
    }

    function isMainHeader() {
        return $scope.homePage || $scope.detailPage || !$scope.mainLoadingScreen;
    }

    function getHeaderTitle() {
        if ($scope.backText === '' || $scope.backText === undefined || $scope.backText === 'Unknown') {
            return $scope.translation.WEBMOB_common_device_washer;
        }
        return $scope.backText;
    }
    /*function getDeviceTypeInitial() {
     if ($scope.deviceTypeInitial === '' || $scope.deviceTypeInitial === undefined || $scope.deviceTypeInitial === 'Unknown') {
     return $scope.translation.WEBMOB_common_device_washer;
     }
     return $scope.deviceTypeInitial;
     }*/

    function hideMoreOption() {
        if ($scope.homePage) {
            return true;
        }
        return false;
    }

    function isHeaderOptionVisible() {
        if ($scope.mainLoadingScreen && (($scope.homePage || $scope.detailPage) && !$scope.cycFinish) || ($scope.energyMonitorPage || ($scope.myFavoritePage && $scope.myFavoriteList.length > 0))) {
            return true;
        }
        return false;
    }

    function showHelpText() {
        if (($scope.homePage || $scope.detailPage) && !$scope.cycFinish) {
            return true;
        }
        return false;
    }

    /***
     * page for open source information
     * @returns {undefined}
     */
    function clickOpenSource() {
        $scope.currentScreen = WASHERSCREENS.OPENSOURCE;
        changeScreen();
    }

    function isPowerOff(currentSection) {
        if (!angular.isDefined($scope.Device) || !angular.isDefined($scope.Device.Operation) || !angular.isDefined($scope.Device.Operation.power)) {
            return false;
        }
        switch (currentSection) {
            case WASHERCURRENTSEL.MAIN_SELECTED:
                return $scope.mainWasherData.Operation.power === "Off";
                break;
            case WASHERCURRENTSEL.SUB_SELECTED:
                return $scope.subWasherData.Operation.power === "Off";
                break;
            default:
                return $scope.Device.Operation.power === "Off";
                break;
        }
    }

    function createArray(n) {
        n = Math.floor(n);
        if (n > 0) {
            return new Array(n);
        }
        return new Array(0);
    }

    function getSpinHighestFav() {
        var setSpinHighestFav = $scope.setSpinFav;
        if ($scope.listItemsSpin !== undefined) {
            for (var i = 0; i < $scope.listItemsSpin.length; i++) {
                if (!$scope.getSpinDisableMyFav($scope.listItemsSpin[i])) {
                    setSpinHighestFav = $scope.listItemsSpin[i];
                    break;
                }
            }
        }
        return setSpinHighestFav;
    }

    function okClickedAtPowerOff(moveToHome, id) {
        powerOffPopUp = false;
        if ($scope.isDualWasher && $scope.detailPage && !$scope.cycFinish && moveToHome) {
            if ((id === 0 && $scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) || (id === 1 && $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED)) {
                goToHome();
            }
        }
        $scope.custDialogpopup = false;
        $scope.alertState = -1;
        if ($scope.errorList.length > 0) {
            $scope.errorList.pop();
        }
        changePopUpClass(false);
    }

    function removeItemFromMyFavorite(index) {
        sendSAData(SA_WASHER.MY_FAVORITE_PAGE.SCREEN, SA_WASHER.MY_FAVORITE_PAGE.REMOVE_MY_FAVORITE_LIST, $scope.myFavoriteList[index].courseEnum, 1);
        $scope.alertState = WASHERALERT.DELETE_MYFAVORITES;
        $scope.errorList.push({
            msg: $scope.translation.WEBMOB_device_washer_alarm_my_favorite_delete_msg,
            btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_delete_CL,
            btnOkHandler: function () {
                //$scope.deleteFavoriteItem = true;
                $scope.myFavoriteList.splice(index, 1);
                setLocalStorageForMyFavorite($scope.myFavoriteList);
                showToast($scope.translation.WEBMOB_device_washer_alarm_my_favorite_toast_delete);
                showMyFavorite();
                $scope.onOkClicked(true);

            },
            btnCancelTxt: $scope.translation.WEBMOB_common_cancel_capital,
            btnCancelHandler: function () {
                $scope.onOkClicked(false);
            },
            closeDialog: !true
        });
    }

    function deleteItemsFromFavoriteList() {
        $scope.alertState = WASHERALERT.DELETE_MYFAVORITES;
        $scope.errorList.push({
            msg: $scope.translation.WEBMOB_device_washer_alarm_my_favorite_delete_msg,
            btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_delete_CL,
            btnOkHandler: function () {
                $scope.onOkClicked(true);
            },
            btnCancelTxt: $scope.translation.WEBMOB_common_cancel_capital,
            btnCancelHandler: function () {
                $scope.onOkClicked(false);
                cancelButtonPressedFromMultiSelect();
            },
            closeDialog: !true
        });
    }

    function deletAllFromFavorites() {
        //var numberOfItemDeleted= $scope.myFavoriteList.length;
        $scope.myFavoriteList = [];
        setLocalStorageForMyFavorite($scope.myFavoriteList);
        $scope.bAllListSelected = false;
        $scope.isMultiSelectMode = false;
        showMyFavorite();
        showToast($scope.translation.WEBMOB_device_washer_alarm_my_favorite_toast_delete);
//        showToast(numberOfItemDeleted + " " + $scope.translation.WEBMOB_device_washer_alarm_my_favorite_toast_delete);
    }

    function deleteSelectedItemFromFavorites() {
        //var numberOfItemDeleted=0;
        for (var i = 0; i < $scope.myFavoriteList.length; i++) {
            if ($scope.myFavoriteList[i].isChecked) {
                var index = i;
                if (index > -1) {
                    $scope.myFavoriteList.splice(index, 1);
                    //numberOfItemDeleted=numberOfItemDeleted+1;
                    --i;
                }
            }
        }
        setLocalStorageForMyFavorite($scope.myFavoriteList);
        $scope.isMultiSelectMode = false;
        showMyFavorite();
        showToast($scope.translation.WEBMOB_device_washer_alarm_my_favorite_toast_delete);
//        showToast(numberOfItemDeleted+" " +$scope.translation.WEBMOB_device_washer_alarm_my_favorite_toast_delete);
    }

    function numOfCheckedItems() {
        var numOfCheckedItem = 0;
        for (var i = 0; i < $scope.myFavoriteList.length; i++) {
            if ($scope.myFavoriteList[i].isChecked) {
                numOfCheckedItem++;
            }
        }
        return numOfCheckedItem;
    }

    function toggleCheckList(item, index) {
        //$scope.indexSelected = index;
        debugMessage("toggleCheckList called");
        for (var i = 0; i < $scope.myFavoriteList.length; i++) {
            if ($scope.myFavoriteList[i].title === item.title) {
                $scope.myFavoriteList[i].isChecked = !$scope.myFavoriteList[i].isChecked;
                if ($scope.myFavoriteList[i].isChecked) {
                    sendSAData(SA_WASHER.MY_FAVORITE_DELETE_PAGE.SCREEN, SA_WASHER.MY_FAVORITE_DELETE_PAGE.MY_FAVORITE_LIST_SELECTED_NOTSELECTED, "selected", 1);
                } else {
                    sendSAData(SA_WASHER.MY_FAVORITE_DELETE_PAGE.SCREEN, SA_WASHER.MY_FAVORITE_DELETE_PAGE.MY_FAVORITE_LIST_SELECTED_NOTSELECTED, "not selected", 0);
                }
            }
        }
        isAllCheckBoxSelected();
        isAnyCheckedItem();
    }

    function isAllCheckBoxSelected() {
        for (var i = 0; i < $scope.myFavoriteList.length; i++) {
            if ($scope.myFavoriteList[i].isChecked === false) {
                $scope.bAllListSelected = false;
                return;
            }
        }
        $scope.bAllListSelected = true;
    }

    function toggleSelectAllListCheckBox() {
        if ($scope.isAnyCheckedItem) {
            $scope.isAnyCheckedItem = !$scope.isAnyCheckedItem;
        }
        $scope.bAllListSelected = !$scope.bAllListSelected;
        if ($scope.bAllListSelected) {
            for (var i = 0; i < $scope.myFavoriteList.length; i++) {
                $scope.myFavoriteList[i].isChecked = true;
            }
        } else {
            for (var i = 0; i < $scope.myFavoriteList.length; i++) {
                $scope.myFavoriteList[i].isChecked = false;
            }
        }
    }

    function cancelButtonPressedFromMultiSelect() {
        showMyFavorite();
    }

    function isChecked(currentListInfo, index) {
        for (var i = 0; i < $scope.myFavoriteList.length; i++) {
            if ($scope.myFavoriteList[i].title === currentListInfo.title) {
                return $scope.myFavoriteList[i].isChecked;
            }
        }
        return false;
    }

    function isAnyCheckedItem() {
        for (var i = 0; i < $scope.myFavoriteList.length; i++) {
            if ($scope.myFavoriteList[i].isChecked) {
                $scope.isAnyCheckedItem = true;
                return;
            }
        }
        $scope.isAnyCheckedItem = false;
    }

    function longPressOnItemFromFavoritePage() {
        if (!$scope.isMultiSelectMode) {
            $scope.isMultiSelectMode = true;
            $scope.bAllListSelected = false;
        }
    }

    function getTempSelectedPopUp(selectedItem) {
        if ($scope.setTempFav === selectedItem) {
            return true;
        } else {
            return false;
        }
    }

    function getSpinSelectedPopUp(selectedItem) {
        if ($scope.setSpinFav === selectedItem) {
            return true;
        } else {
            return false;
        }
    }

    function getSoilSelectedPopUp(selectedItem) {
        if ($scope.setSoilFav === selectedItem) {
            return true;
        } else {
            return false;
        }
    }

    function getRinseSelectedPopUp(selectedItem) {
        if ($scope.setRinseFav === selectedItem) {
            return true;
        } else {
            return false;
        }
    }

    function selectTempFromSettings(item, index) {
        sendSAData(SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SCREEN, SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SET_MY_FAVORITE_TEMP, item, 1);
        if (getTempDisableMyFav(item)) {
            return;
        }
        $scope.setTempFav = item;
        checkSpecialCaseFav();
        closeAllPopups();
    }

    function selectSoilFromSettings(item, index) {
        sendSAData(SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SCREEN, SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SET_MY_FAVORITE_SOIL_LEVEL, item, 1);
        if (getSoilDisableMyFav(item)) {
            return;
        }
        $scope.setSoilFav = item;
        closeAllPopups();
    }

    function selectSpinFromSettings(item, index) {
        sendSAData(SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SCREEN, SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SET_MY_FAVORITE_SPIN, item, 1);
        if (getSpinDisableMyFav(item)) {
            return;
        }
        $scope.setSpinFav = item;
        closeAllPopups();
    }

    function selectRinseFromSettings(item, index) {
        //sendSAData(SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SCREEN, SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SET_MY_FAVORITE_RINSE, item, 1); //TODO
        if (getRinseDisableMyFav(item)) {
            return;
        }
        $scope.setRinseFav = item;
        closeAllPopups();
    }

    function getTempDisableMyFav(selectedItem) {
        if ($scope.currentTempListFav === undefined) {
            return;
        }
        if ($scope.currentTempListFav.indexOf(selectedItem) > -1) {
            return false;
        } else {
            return true;
        }
    }

    function getSpinDisableMyFav(selectedItem) {
        if ($scope.currentSpinListFav === undefined) {
            return;
        }
        if (($scope.currentCourseEnumfavorite === "WEBMOB_device_washer_course_19" || $scope.currentCourseEnumfavorite === "WEBMOB_device_washer_course_64" || $scope.currentCourseEnumfavorite === "WEBMOB_device_washer_course_73" || $scope.currentCourseEnumfavorite === "WEBMOB_device_washer_course_9d") && $scope.setRinseFav === "0" && (selectedItem === "RinseHold" || selectedItem === "None")) {
            return true;
        }
        if ($scope.currentSpinListFav.indexOf(selectedItem) > -1) {
            return false;
        } else {
            return true;
        }
    }

    function getSpinDisableKoreanSpecsMyFav(selectedItem) {
        if (($scope.setDryComboLevelFav === undefined || $scope.setDryComboLevelFav !== "None" || $scope.isDryComboLevelFav === false || $scope.isDryComboLevelFav === undefined) && $scope.setRinseFav === "0" && ($scope.disableTempContentsFav || $scope.isTempFav === false) && selectedItem === "RinseHold") {
            return false;
        }
        if ($scope.setDryComboLevelFav !== "" && $scope.setDryComboLevelFav !== undefined && $scope.isDryComboLevelFav && $scope.setDryComboLevelFav !== "None" && (selectedItem !== "ExtraHigh")) {
            return true;
        }
        return false;
    }

    function getSoilDisableMyFav(selectedItem) {
        if ($scope.currentSoilListFav === undefined) {
            return;
        }
        if ($scope.currentSoilListFav.indexOf(selectedItem) > -1) {
            return false;
        } else {
            return true;
        }
    }

    function getRinseDisableMyFav(selectedItem) {
        if ($scope.currentRinseListFav === undefined) {
            return;
        }
        if (($scope.currentCourseEnumfavorite === "WEBMOB_device_washer_course_19" || $scope.currentCourseEnumfavorite === "WEBMOB_device_washer_course_64" || $scope.currentCourseEnumfavorite === "WEBMOB_device_washer_course_73" || $scope.currentCourseEnumfavorite === "WEBMOB_device_washer_course_9d") && ($scope.setSpinFav === "RinseHold" || $scope.setSpinFav === "None") && (selectedItem === "0")) {//Here O is No Rinse
            return true;
        }
        if ($scope.rinseremove0102Fav && (selectedItem === "0" || selectedItem === "1")) {
            return true;
        }
        if ($scope.currentRinseListFav.indexOf(selectedItem) > -1) {
            return false;
        } else {
            return true;
        }
    }

    function openPopoverTempFav() {
        sendSAData(SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SCREEN, SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SET_MY_FAVORITE_TEMP, "", "");
        closeAllPopups();
        if ($scope.disableTempContentsFav || favPopUpChanged) {
            return;
        }
        if ($scope.currentTempListFav.length > 0) {
            $scope.favTemp = true;
        } else {
            $scope.favTemp = false;
        }
        var elemPosition = getPositionElement('myFavCycle');
        var forthElementFromCycleCycle = (elemPosition.top + (2 * (3.7)) + (3.7) / 2);
        var elementPosition = getPositionElement('favCommonPupupTemp');
        var elementPositionFromCycle = elementPosition.top;
        if (elementPositionFromCycle > forthElementFromCycleCycle) {
            var elementToApply = document.getElementById('favtempSpin');
            elementToApply.style.top = (-Math.min(($scope.listItemsTemp.length * 2.7), 8.1) + 170 / 80) + "rem";
        }
        changePopUpClass($scope.favTemp);
        var topCalculated = elementPosition.top + 170 / 80 + Math.min(($scope.listItemsTemp.length * 2.7), 8.1);
        if (topCalculated > $scope.screenAreaHeight) {
            var scrolElem = document.getElementById('scrollSettings');
            scrolElem.style.overflowY = 'scroll';
        }
    }

    function openPopoverSpinFav() {
        sendSAData(SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SCREEN, SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SET_MY_FAVORITE_SPIN, "", "");
        closeAllPopups();
        if ($scope.disableSpinContentsFav || favPopUpChanged) {
            return;
        }
        if ($scope.currentSpinListFav.length > 0) {
            $scope.favSpin = true;
        } else {
            $scope.favSpin = false;
        }
        var elemPosition = getPositionElement('myFavCycle');
        var forthElementFromCycleCycle = (elemPosition.top + (2 * (3.7)) + (3.7) / 2);
        var elementPosition = getPositionElement('favCommonPupupSpin');
        var elementPositionFromCycle = elementPosition.top;
        if (elementPositionFromCycle > forthElementFromCycleCycle) {
            var elementToApply = document.getElementById('favspinSpin');
            elementToApply.style.top = (-Math.min(($scope.listItemsSpin.length * 2.7), 8.1) + 170 / 80) + "rem";
        }
        changePopUpClass($scope.favSpin);
        var topCalculated = elementPosition.top + 170 / 80 + Math.min(($scope.listItemsSpin.length * 2.7), 8.1);
        if (topCalculated > $scope.screenAreaHeight) {
            var scrolElem = document.getElementById('scrollSettings');
            scrolElem.style.overflowY = 'scroll';
        }
    }

    function openPopoverRinseFav() {
        closeAllPopups();
        if ($scope.disableRinseContentsFav || favPopUpChanged) {
            return;
        }
        if ($scope.currentRinseListFav.length > 0) {
            $scope.favRinse = true;
        } else {
            $scope.favRinse = false;
        }
        var elemPosition = getPositionElement('myFavCycle');
        var forthElementFromCycleCycle = (elemPosition.top + (2 * (3.7)) + (3.7) / 2);
        var elementPosition = getPositionElement('favCommonPupupRinse');
        var elementPositionFromCycle = elementPosition.top;
        if (elementPositionFromCycle > forthElementFromCycleCycle) {
            var elementToApply = document.getElementById('favrinseSpin');
            elementToApply.style.top = (-Math.min(($scope.listItemsRinse.length * 2.7), 8.1) + 170 / 80) + "rem";
        }
        changePopUpClass($scope.favRinse);
        var topCalculated = elementPosition.top + 170 / 80 + Math.min(($scope.listItemsRinse.length * 2.7), 8.1);
        if (topCalculated > $scope.screenAreaHeight) {
            var scrolElem = document.getElementById('scrollSettings');
            scrolElem.style.overflowY = "scroll";
        }
    }

    function openPopoverSoilLevelFav() {
        sendSAData(SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SCREEN, SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SET_MY_FAVORITE_SOIL_LEVEL, "", "");
        closeAllPopups();
        if ($scope.disableSoilContentsFav || favPopUpChanged) {
            return;
        }
        if ($scope.currentSoilListFav.length > 0) {
            $scope.favSoil = true;
        } else {
            $scope.favSoil = false;
        }
        var elemPosition = getPositionElement('myFavCycle');
        var forthElementFromCycleCycle = (elemPosition.top + (2 * (3.7)) + (3.7) / 2);
        var elementPosition = getPositionElement('favCommonPupupSoil');
        var elementPositionFromCycle = elementPosition.top;
        if (elementPositionFromCycle > forthElementFromCycleCycle) {
            var elementToApply = document.getElementById('favsoilSpin');
            elementToApply.style.top = (-Math.min(($scope.listItemsSoilLevel.length * 2.7), 8.1) + 170 / 80) + "rem";
        }
        changePopUpClass($scope.favSoil);
        var topCalculated = elementPosition.top + 170 / 80 + Math.min(($scope.listItemsSoilLevel.length * 2.7), 8.1);
        if (topCalculated > $scope.screenAreaHeight) {
            var scrolElem = document.getElementById('scrollSettings');
            scrolElem.style.overflowY = 'scroll';
        }
    }

    function getPositionElement(id) {
        var el = document.getElementById(id);
        var position = {left: 0, top: 0};
        for (position.left = 0, position.top = 0;
                el !== null;
                position.left += el.offsetLeft, position.top += el.offsetTop, el = el.offsetParent);
        var cWidth = document.body.clientWidth || window.innerWidth;
        var baseFontSize = (80 * cWidth) / 1440;
        position.left = position.left / baseFontSize;
        position.top = position.top / baseFontSize;
        return position;
    }

    function cancelSaveFavorite() {
        closeAllPopups();
        if (favPopUpChanged) {
            return;
        }
        initAddFavoriteSettingsOptions();
        $scope.FavID = null;
        showMyFavorite();
    }

    function saveButtonFavorite() {
        closeAllPopups();
        if (favPopUpChanged) {
            return;
        }
        initAddFavoriteSettingsOptions();
        if (!toUpdateFavItem()) {
            saveMyFav();
        }
    }

    function initAddFavoriteSettingsOptions() {
        $scope.favDryLevel = false;
        $scope.favDryTime = false;
        $scope.favTemp = false;
        $scope.favWrinkle = false;
        $scope.favMixedBell = false;
    }

    function toUpdateFavItem() {
        if ($scope.currentScreen !== WASHERSCREENS.ADDFAVORITE) {
            return false;
        }
        var newLocalStorage = JSON.parse(getLocalStorageData($scope.Device.uuid + $scope.currentWasherSelected + 'myFavorite'));
        if (newLocalStorage === null || newLocalStorage.length === 0) {
            return false;
        }
        for (var k = 0; k < newLocalStorage.length; k++) {
            if ($scope.FavID === newLocalStorage[k]['favItemId']) {
                debugMessage('updated old  ' + newLocalStorage[k]);
                var inputName = document.getElementById("inputMFName").value;
                //$scope.currentRecipeName = newLocalStorage[k].title;
                if (newLocalStorage[k].title !== inputName) {
                    if (inputName !== undefined && inputName.trim() === '') {
                        inputName = newLocalStorage[k].title;//$scope.currentRecipeName;
                    } else {
                        if (!validateName(inputName)) {
                            return true;
                        }
                    }
                }
                newLocalStorage[k].favItemId = $scope.FavID;
                newLocalStorage[k].title = inputName;
                newLocalStorage[k].courseEnum = $scope.currentCourseEnumfavorite;
                newLocalStorage[k].course = $scope.translation[$scope.currentCourseEnumfavorite];
                newLocalStorage[k].courseHex = $scope.currentCourseHexFav;
                newLocalStorage[k].isChecked = false;

                newLocalStorage[k].defaultTemp = $scope.setTempFav;
                newLocalStorage[k].defaultSpin = $scope.setSpinFav;
                newLocalStorage[k].defaultSoil = $scope.setSoilFav;
                newLocalStorage[k].defaultRinse = $scope.setRinseFav;
                newLocalStorage[k].defaultDryCombo = $scope.setDryComboLevelFav;

                newLocalStorage[k].isTempEnabled = $scope.isTempFav;
                newLocalStorage[k].isSpinEnabled = $scope.isSpinFav;
                newLocalStorage[k].isSoilLevelEnabled = $scope.isSoilLevelFav;
                newLocalStorage[k].isRinseEnabled = $scope.isRinseFav;
                newLocalStorage[k].isDryComboEnabled = $scope.isDryComboLevelFav;

                newLocalStorage[k].optionDisableTempContentsFav = $scope.disableTempContentsFav;
                newLocalStorage[k].optionDisableSpinContentsFav = $scope.disableSpinContentsFav;
                newLocalStorage[k].optionDisableSoilContentsFav = $scope.disableSoilContentsFav;
                newLocalStorage[k].optionDisableRinseContentsFav = $scope.disableRinseContentsFav;
                newLocalStorage[k].optionDisableDryComboLevelContentsFav = $scope.disableDryComboLevelContentsFav;

                newLocalStorage[k].optionCurrentTempListFav = $scope.currentTempListFav;
                newLocalStorage[k].optionCurrentSpinListFav = $scope.currentSpinListFav;
                newLocalStorage[k].optionCurrentRinseListFav = $scope.currentRinseListFav;
                newLocalStorage[k].optionCurrentSoilListFav = $scope.currentSoilListFav;
                newLocalStorage[k].optionCurrentDryComboLevelListFav = $scope.currentDryComboLevelListFav;

                newLocalStorage[k].optionTempImage = getTempConstantFav($scope.setTempFav);
                newLocalStorage[k].optionSpinImage = getSpinConstantFav($scope.setSpinFav);
                newLocalStorage[k].optionSoilImage = getSoilConstantFav($scope.setSoilFav);
                newLocalStorage[k].optionRinseImage = getRinseConstantFav($scope.setRinseFav);
                newLocalStorage[k].optionDryLevelImage = getDryLevelImg($scope.setDryComboLevelFav);

                debugMessage('updated new ' + newLocalStorage[k]);
                removeLocalStorageData($scope.Device.uuid + $scope.currentWasherSelected + 'myFavorite');
                setLocalStorageForMyFavorite(newLocalStorage);
                showMyFavorite();
                showToast($scope.translation.WEBMOB_device_washer_alarm_my_favorite_toast_save_change);
                $scope.FavID = null;
                return true;
            }
        }
        return false;
    }

    function saveMyFav() {
        var name = document.getElementById('inputMFName').value;
        if (name !== undefined && name.trim() === '') {
            document.getElementById('inputMFName').value = getMyFavoriteName();
            $scope.currentRecipeName = getMyFavoriteName();

        } else {
            if (!validateName(name)) {
                return;
            }
        }
        $scope.myFavoriteList = [];
        var favList = getLocalStorageForMyFavorite($scope.Device.uuid + $scope.currentWasherSelected + 'myFavorite');
        if (favList.length !== 0)
            $scope.myFavoriteList = JSON.parse(getLocalStorageForMyFavorite($scope.Device.uuid + $scope.currentWasherSelected + 'myFavorite'));
        var itemToPush = {
            favItemId: Math.random(),
            title: document.getElementById('inputMFName').value,
            courseEnum: $scope.currentCourseEnumfavorite,
            course: $scope.translation[$scope.currentCourseEnumfavorite],
            courseHex: $scope.currentCourseHexFav,
            isChecked: false,
            defaultTemp: $scope.setTempFav,
            defaultSpin: $scope.setSpinFav,
            defaultSoil: $scope.setSoilFav,
            defaultRinse: $scope.setRinseFav,
            defaultDryCombo: $scope.setDryComboLevelFav,
            isTempEnabled: $scope.isTempFav,
            isSpinEnabled: $scope.isSpinFav,
            isSoilLevelEnabled: $scope.isSoilLevelFav,
            isRinseEnabled: $scope.isRinseFav,
            isDryComboEnabled: $scope.isDryComboLevelFav,
            optionDisableTempContentsFav: $scope.disableTempContentsFav,
            optionDisableSpinContentsFav: $scope.disableSpinContentsFav,
            optionDisableSoilContentsFav: $scope.disableSoilContentsFav,
            optionDisableRinseContentsFav: $scope.disableRinseContentsFav,
            optionDisableDryComboLevelContents: $scope.disableDryComboLevelContentsFav,
            optionCurrentTempListFav: $scope.currentTempListFav,
            optionCurrentSpinListFav: $scope.currentSpinListFav,
            optionCurrentRinseListFav: $scope.currentRinseListFav,
            optionCurrentSoilListFav: $scope.currentSoilListFav,
            optionCurrentDryComboLevelListFav: $scope.currentDryComboLevelListFav,
            optionTempImage: getTempConstantFav($scope.setTempFav),
            optionSpinImage: getSpinConstantFav($scope.setSpinFav),
            optionSoilImage: getSoilConstantFav($scope.setSoilFav),
            optionRinseImage: getRinseConstantFav($scope.setRinseFav),
            optionDryLevelImage: getDryLevelImg($scope.setDryComboLevelFav)
        };
        $scope.myFavoriteList.unshift(itemToPush);
        setLocalStorageForMyFavorite($scope.myFavoriteList);
        showMyFavorite();
        showToast($scope.translation.WEBMOB_device_washer_alarm_my_favorite_toast_save_new);
    }

    function validateName(title) {
        debugMessage('validation for  name ' + title);
        var list = getLocalStorageForMyFavorite($scope.Device.uuid + $scope.currentWasherSelected + 'myFavorite');
        if (list.length !== 0) {
            list = JSON.parse(getLocalStorageForMyFavorite($scope.Device.uuid + $scope.currentWasherSelected + 'myFavorite'));
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var obj = (list[i]);
                if (obj.title === title) {
                    $scope.errorList.push({
                        title: '',
                        msg: $scope.translation.WEBMOB_device_washer_alarm_my_favorite_same_name_msg,
                        btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                        btnOkHandler: function () {
                            onOkClicked(true);
                        },
                        closeDialog: !true
                    });
                    changePopUpClass(true);
                    return false;
                }
            }
        }
        return true;
    }

    function editMyFavorite(itemToEdit) {
        sendSAData(SA_WASHER.MY_FAVORITE_PAGE.SCREEN, SA_WASHER.MY_FAVORITE_PAGE.MY_FAVORITE_LIST, itemToEdit.courseEnum, itemToEdit.favItemId);
        $scope.FavID = itemToEdit.favItemId;
        $scope.currentCourseEnumfavorite = itemToEdit.courseEnum;
        $scope.currentCourseHexFav = itemToEdit.courseHex;

        $scope.setTempFav = itemToEdit.defaultTemp;
        $scope.setSoilFav = itemToEdit.defaultSoil;
        $scope.setSpinFav = itemToEdit.defaultSpin;
        $scope.setRinseFav = itemToEdit.defaultRinse;
        $scope.setDryComboLevelFav = itemToEdit.defaultDryCombo;

        $scope.isTempFav = itemToEdit.isTempEnabled;
        $scope.isSpinFav = itemToEdit.isSpinEnabled;
        $scope.isSoilLevelFav = itemToEdit.isSoilLevelEnabled;
        $scope.isRinseFav = itemToEdit.isRinseEnabled;
        $scope.isDryComboLevelFav = itemToEdit.isDryComboEnabled;

        $scope.currentTempListFav = itemToEdit.optionCurrentTempListFav;
        $scope.currentSpinListFav = itemToEdit.optionCurrentSpinListFav;
        $scope.currentRinseListFav = itemToEdit.optionCurrentRinseListFav;
        $scope.currentSoilListFav = itemToEdit.optionCurrentSoilListFav;
        $scope.currentDryComboLevelListFav = itemToEdit.optionCurrentDryComboLevelListFav;

        $scope.disableTempContentsFav = itemToEdit.optionDisableTempContentsFav;
        $scope.disableSpinContentsFav = itemToEdit.optionDisableSpinContentsFav;
        $scope.disableSoilContentsFav = itemToEdit.optionDisableSoilContentsFav;
        $scope.disableRinseContentsFav = itemToEdit.optionDisableRinseContentsFav;
        $scope.disableDryComboLevelContentsFav = itemToEdit.optionDisableDryComboLevelContents;

        $scope.currentRecipeName = itemToEdit.title;

        checkSpecialCaseFav();

        $scope.currentScreen = WASHERSCREENS.ADDFAVORITE;
        changeScreen();
    }

    function selectIndexForFavorite(selectedItem) {
        sendSAData(SA_WASHER.SELECT_CYCLE_FOR_FAVORITE_PAGE.SCREEN, SA_WASHER.SELECT_CYCLE_FOR_FAVORITE_PAGE.SELECT_MY_FAVORITE_CYCLE, selectedItem.CourseEnum, 1);
        $scope.currentCourseEnumfavorite = selectedItem.CourseEnum;
        $scope.currentCourseHexFav = selectedItem.courseNameHex;

        $scope.isTempFav = selectedItem.isTempEnabled;
        $scope.isRinseFav = selectedItem.isRinseEnabled;
        $scope.isSpinFav = selectedItem.isSpinEnabled;
        $scope.isSoilLevelFav = selectedItem.isSoilLevelEnabled;
        $scope.isDryComboLevelFav = selectedItem.isDryComboEnabled;

        $scope.setTempFav = selectedItem.defaultTemp;
        $scope.setRinseFav = selectedItem.defaultRinse;
        $scope.setSpinFav = selectedItem.defaultSpin;
        $scope.setSoilFav = selectedItem.defaultSoil;
        $scope.setDryComboLevelFav = selectedItem.defaultDryCombo;

        $scope.currentTempListFav = selectedItem.optionTempList;
        $scope.currentSpinListFav = selectedItem.optionSpinList;
        $scope.currentRinseListFav = selectedItem.optionRinseList;
        $scope.currentSoilListFav = selectedItem.optionSoilList;
        $scope.currentDryComboLevelListFav = selectedItem.optionDryComboList;

        if ($scope.currentTempListFav !== undefined && ($scope.currentTempListFav.length === 0 || $scope.currentTempListFav.length < 2)) {
            $scope.disableTempContentsFav = true;
        } else {
            $scope.disableTempContentsFav = false;
        }
        if ($scope.currentSpinListFav !== undefined && ($scope.currentSpinListFav.length === 0 || $scope.currentSpinListFav.length < 2)) {
            $scope.disableSpinContentsFav = true;
        } else {
            $scope.disableSpinContentsFav = false;
        }
        if ($scope.currentRinseListFav !== undefined && ($scope.currentRinseListFav.length === 0 || $scope.currentRinseListFav.length < 2)) {
            $scope.disableRinseContentsFav = true;
        } else {
            $scope.disableRinseContentsFav = false;
        }
        if ($scope.currentSoilListFav !== undefined && ($scope.currentSoilListFav.length === 0 || $scope.currentSoilListFav.length < 2)) {
            $scope.disableSoilContentsFav = true;
        } else {
            $scope.disableSoilContentsFav = false;
        }
        if ($scope.currentDryComboLevelListFav !== undefined && ($scope.currentDryComboLevelListFav.length === 0 || $scope.currentDryComboLevelListFav.length < 2)) {
            $scope.disableDryComboLevelContentsFav = true;
        } else {
            $scope.disableDryComboLevelContentsFav = false;
        }

        checkSpecialCaseFav();

        $scope.currentScreen = WASHERSCREENS.ADDFAVORITE;
        changeScreen();
    }

    function selectMyFavoriteCycle() {
        sendSAData(SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SCREEN, SA_WASHER.ADD_EDIT_MY_FAVORITE_PAGE.SET_MY_FAVORITE_CYCLE, "", "");
        closeAllPopups();
        if (favPopUpChanged) {
            return;
        }
        $scope.currentScreen = WASHERSCREENS.CYCLEMYFAVORITE;
        changeScreen();
    }

    function closeMyFavPopUps() {
        favPopUpChanged = false;
        if ($scope.favTemp || $scope.favRinse || $scope.favSpin || $scope.favSoil || $scope.favDry) {
            $scope.favTemp = false;
            $scope.favRinse = false;
            $scope.favSpin = false;
            $scope.favSoil = false;
            $scope.favDry = false;
            favPopUpChanged = true;
        }
    }

    function showMyFavorite() {
        $scope.isMultiSelectMode = false;
        $scope.isAnyCheckedItem = false;
        $scope.bAllListSelected = false;
        $scope.rinseremove0102Fav = false;
        var list = [];

        $timeout(function () {
            var favList = getLocalStorageForMyFavorite($scope.Device.uuid + $scope.currentWasherSelected + 'myFavorite');

            if (favList.length !== 0) {
                document.getElementById("scrollSettings").scrollTop = 0;
                favList = JSON.parse(getLocalStorageForMyFavorite($scope.Device.uuid + $scope.currentWasherSelected + 'myFavorite'));
                for (var i = 0; i < favList.length; i++) {
                    list.push(favList[i]);
                }
            }
            $scope.myFavoriteList = list;
            $scope.currentScreen = WASHERSCREENS.MYFAVORITE;
            changeScreen();
        }, 0);
    }

    function showDrumCleanHistory() {
        var el_scroll = document.getElementById("drumHistoryScrollable");
        if (el_scroll !== null) {
            setTimeout(function () {
                el_scroll.scrollTop = 0;
            }, 10);
        }
        $scope.currentScreen = WASHERSCREENS.DRUMClEANHISTORY;
        changeScreen();
    }

    function showAddFavorite() {
        sendSAData(SA_WASHER.MY_FAVORITE_PAGE.SCREEN, SA_WASHER.MY_FAVORITE_PAGE.ADD_FAVORITE, "", "");
        if ($scope.myFavoriteList.length >= 20) {
            showToast($scope.translation.WEBMOB_device_washer_alarm_my_favorite_toast_max_list);
            return;
        }
        if ($scope.bAllListSelected) {
            $scope.bAllListSelected = !$scope.bAllListSelected;
        }
        if ($scope.isMultiSelectMode) {
            $scope.isMultiSelectMode = !$scope.isMultiSelectMode;
        }
        if ($scope.isAnyCheckedItem) {
            $scope.isAnyCheckedItem = !$scope.isAnyCheckedItem;
        }
        $scope.currentRecipeName = getMyFavoriteName();
        $scope.currentCourseEnumfavorite = $scope.listItemsModes[0].CourseEnum;
        $scope.currentCourseHexFav = $scope.listItemsModes[0].courseNameHex;

        $scope.isTempFav = $scope.listItemsModes[0].isTempEnabled;
        $scope.isRinseFav = $scope.listItemsModes[0].isRinseEnabled;
        $scope.isSpinFav = $scope.listItemsModes[0].isSpinEnabled;
        $scope.isSoilLevelFav = $scope.listItemsModes[0].isSoilLevelEnabled;
        $scope.isDryComboLevelFav = $scope.listItemsModes[0].isDryComboEnabled;

        $scope.setTempFav = $scope.listItemsModes[0].defaultTemp;
        $scope.setRinseFav = $scope.listItemsModes[0].defaultRinse;
        $scope.setSpinFav = $scope.listItemsModes[0].defaultSpin;
        $scope.setSoilFav = $scope.listItemsModes[0].defaultSoil;
        $scope.setDryComboLevelFav = $scope.listItemsModes[0].defaultDryCombo;

        $scope.currentTempListFav = $scope.listItemsModes[0].optionTempList;
        $scope.currentSpinListFav = $scope.listItemsModes[0].optionSpinList;
        $scope.currentRinseListFav = $scope.listItemsModes[0].optionRinseList;
        $scope.currentSoilListFav = $scope.listItemsModes[0].optionSoilList;
        $scope.currentDryComboLevelListFav = $scope.listItemsModes[0].optionDryComboList;

        if ($scope.currentTempListFav !== undefined && ($scope.currentTempListFav.length === 0 || $scope.currentTempListFav.length < 2)) {
            $scope.disableTempContentsFav = true;
        } else {
            $scope.disableTempContentsFav = false;
        }
        if ($scope.currentSpinListFav !== undefined && ($scope.currentSpinListFav.length === 0 || $scope.currentSpinListFav.length < 2)) {
            $scope.disableSpinContentsFav = true;
        } else {
            $scope.disableSpinContentsFav = false;
        }
        if ($scope.currentRinseListFav !== undefined && ($scope.currentRinseListFav.length === 0 || $scope.currentRinseListFav.length < 2)) {
            $scope.disableRinseContentsFav = true;
        } else {
            $scope.disableRinseContentsFav = false;
        }
        if ($scope.currentSoilListFav !== undefined && ($scope.currentSoilListFav.length === 0 || $scope.currentSoilListFav.length < 2)) {
            $scope.disableSoilContentsFav = true;
        } else {
            $scope.disableSoilContentsFav = false;
        }
        if ($scope.currentDryComboLevelListFav !== undefined && ($scope.currentDryComboLevelListFav.length === 0 || $scope.currentDryComboLevelListFav.length < 2)) {
            $scope.disableDryComboLevelContentsFav = true;
        } else {
            $scope.disableDryComboLevelContentsFav = false;
        }

        checkSpecialCaseFav();

        $scope.currentScreen = WASHERSCREENS.ADDFAVORITE;
        changeScreen();
    }

    function getMyFavoriteName() {
        var defaultRecipeName = $scope.translation.WEBMOB_device_washer_settings_my_favorite, j = 1;
        var list = getLocalStorageForMyFavorite($scope.Device.uuid + $scope.currentWasherSelected + 'myFavorite');
        if (list.length === 0) {
            return defaultRecipeName + ' 1';
        }
        var newLocalStorage = JSON.parse(getLocalStorageForMyFavorite($scope.Device.uuid + $scope.currentWasherSelected + 'myFavorite'));

        while (true) {
            var uniqueNameFound = true;
            defaultRecipeName = $scope.translation.WEBMOB_device_washer_settings_my_favorite + ' ' + j;
            for (var i = 0; i < newLocalStorage.length; i++) {
                if (newLocalStorage[i]["title"] !== undefined && newLocalStorage[i]["title"].trim() === (defaultRecipeName).trim()) {
                    uniqueNameFound = false;
                    break;
                }
            }
            if (uniqueNameFound) {
                break;
            }
            j++;
        }

        return defaultRecipeName;
    }

    function getLocalStorageForMyFavorite(item) {
        if (typeof (Storage) !== "undefined") {
            var locVal = localStorage.getItem(item);
            if (locVal === null) {
                locVal = [];
            }
            return locVal;
        }
    }

    function setLocalStorageForMyFavorite(item) {
        setLocalStorageData($scope.Device.uuid + $scope.currentWasherSelected + 'myFavorite', JSON.stringify(item));
    }

    function showToast(txt) {
        $timeout(function () {
            document.activeElement.blur();
            toaster.success({title: "", body: txt, bodyOutputType: 'trustedHtml'});
        }, 200);
    }

    function parseRequestResponse(response) {
        $scope.getDeviceInProgress = true;
        if (!angular.isDefined($scope.NoEnergyKW_396)) {
            $scope.NoEnergyKW_396 = true;
        }
        if (!angular.isDefined($scope.NoEnergyKW_396Main)) {
            $scope.NoEnergyKW_396Main = true;
        }
        if (!angular.isDefined($scope.NoEnergyKW_396Sub)) {
            $scope.NoEnergyKW_396Sub = true;
        }
        var deviceId = -1;
        if (response["resourceURL"] && response["resourceURL"].indexOf('/devices/') !== -1) {
            deviceId = parseInt(response["resourceURL"].split("/")[3], 10);
            debugMessage("deviceId :: " + deviceId);
        }
        if (angular.isDefined(response["status"]) && response["status"] === STCONST.STATUS_99000) {
            showConnectionFailurePopup();
        }

        if (angular.isDefined(response["data"])) {
            if (angular.isDefined(response["data"]["Devices"])) {
                if ($scope.errorList.length > 0) {
                    for (var i = 0; i < $scope.errorList.length; i++) {
                        $scope.errorList.pop();
                    }
                } // to fix pop-up flash issue 
                SHPService.parseGetDevices($scope, response);
            }
            if (angular.isDefined(response["data"]["Configuration"]) && angular.isDefined(response["data"]["Configuration"]["remoteControlEnabled"])) {
                $scope.parseConfiguration(response["data"]["Configuration"], deviceId);
            }
            if (angular.isDefined(response["data"]["Information"])) {
                parseModuleInformation(response["data"]["Information"]);
            }
        }
        if (angular.isDefined(response["resourceURL"])) {
            if (response["resourceURL"].indexOf($scope.energyMonitorLocation) !== -1 && $scope.energyMonitorLocation !== "") {
                $scope.isDBDownloaded = true;
                if (isCallFromReset === 2) {
                    $scope.loadingBar = false;
                    isCallFromReset = 1;
                    if (energyDebug) {
                        response["data"] = [];
                    } else {
                        energyResetDone = true;
                        $scope.goToEnergyMonitor();
                    }
                }
                if (energyDebug) {
                    $scope.parseEnergyUsageData(response);
                }
            }
        }
        if (angular.isDefined(response["resourceURL"])) {
            if (response["resourceURL"].indexOf("resetEnergyDB") !== -1) {
                response["data"] = [];
                $scope.parseEnergyUsageData(response);
            }
        }

        if (response.status >= 200 && response.status < 300) { //<300 is succes only. Refer http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html for status code definitions.
            handleStatusCode(response.status, response, deviceId);
        }
        $scope.getDeviceInProgress = false;
    }

    function parseNotification(response) {
        var deviceId = -1;
        if (angular.isDefined(response["data"])) {
            if (angular.isDefined(response["data"]["mobileTimeChanged"])) {
                return;
            }
            if (response["data"] === "backPressed") {
                //if loding bar visible, don't handle back key
                if (!!!$scope.loadingBar) {
                    onBackPressed();
                }
                return;
            }
            if (angular.isDefined(response["data"].isApplicationActive)) {
                $scope.appAlive = true;
                callGetDevice();
                return;
            }
            if (angular.isDefined(response["data"][0]) && angular.isDefined(response["data"][0]["Device"]) && angular.isDefined(response["data"][0]["Device"]["scsConnectionState"])) {
                checkCycleCompleteScreen(response["data"][0]["Device"]["scsConnectionState"]);   //device ID TODO amit
                if (!response["data"][0]["Device"]["scsConnectionState"]) {
                    showConnectionFailurePopup();
                } else if (response["data"][0]["Device"]["scsConnectionState"]) {
                    closeConnectionFailurePopup();
                    callGetDevice();
                }
                return;
            }
            if (response["data"] instanceof Array) {
                response["data"].forEach(function (value) {
                    if (value["resourceURI"].indexOf('/devices/') !== -1) {
                        deviceId = parseInt(value["resourceURI"].split("/")[2], 10);
                    }
                    parseNotificationData(value, deviceId);
                });
            } else {
                deviceId = parseInt(response["data"][0]["resourceURI"].split("/")[2], 10);
                parseNotificationData(response["data"], deviceId);
            }
        }
    }

    function callGetDevice() {
        SHPService.getDevices($scope);
    }

    function parseRequestAccepted(response) {
        if (angular.isDefined(response["data"]) && angular.isDefined(response["data"]["energyData"])) {
            $scope.parseEnergyUsageData(response["data"]);
        } else if (angular.isDefined(response["isSuccess"])) {    // todo : need to check whether is being used.
            parseDeviceData(response);
        }
    }

    function showUsageHelpPage() {
        setTimeout(function () {
            scroll_middle_area.scrollTop = 0;
        }, 10);
        if ($scope.homePage) {
            sendSAData(SA_WASHER.HOME.SCREEN, SA_WASHER.HOME.HELP, "", "");
            sendSAData(SA_WASHER.HOME_HELP_PAGE.SCREEN, "", "", "");
            setLocalStorageData('firstTimeLaunchHomePage', true);
        } else if ($scope.detailPage && $scope.Device.id === "1") {
            sendSAData(SA_WASHER.TOP_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.TOP_LOAD_DETAIL_PAGE.HELP, "", "");
            sendSAData(SA_WASHER.DETAIL_HELP_PAGE.SCREEN, "", "", "");
            setLocalStorageData('firstTimeLaunchDetailPageTopLoad', true);
        } else if ($scope.detailPage && $scope.Device.id === "0") {
            sendSAData(SA_WASHER.FRONT_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.FRONT_LOAD_DETAIL_PAGE.HELP, "", "");
            sendSAData(SA_WASHER.DETAIL_HELP_PAGE.SCREEN, "", "", "");
            setLocalStorageData('firstTimeLaunchDetailPageFrontLoad', true);
        } else {
            ;//Nothing
        }
        $scope.bUsageHelpPage = true;
        changePopUpClass(true);
    }

    function closeUsageHelpPage() {
        if ($scope.homePage) {
            sendSAData(SA_WASHER.HOME_HELP_PAGE.SCREEN, SA_WASHER.HOME_HELP_PAGE.CLOSE_BTN, "", "");
        } else {
            sendSAData(SA_WASHER.DETAIL_HELP_PAGE.SCREEN, SA_WASHER.DETAIL_HELP_PAGE.CLOSE_BTN, "", "");
        }
        $scope.bUsageHelpPage = false;
        changePopUpClass(false);
    }

    // Toggle class for body
    function toggleAnimClass() {
        if ($scope.containSubCl === "containSub") {
            $scope.containSubCl = "";
        } else {
            $scope.containSubCl = "containSub";
        }
    }

    // Toggle class for Mode drop down
    function changePopUpClass(closemultiDialogPopUp) {

        if (closemultiDialogPopUp) {
            $scope.ModeSelectionPopupDivCls = "ModeSelectionPopupDiv";
            scroll_middle_area.style.overflowY = "hidden";
        } else {
            if ($scope.bUsageHelpPage) {    // this check used as for first launch help screen is visible and overflow should not be overlay
                return;
            }
            $scope.ModeSelectionPopupDivCls = "ModeSelectionPopOutDiv";
            scroll_middle_area.style.overflowY = "overlay";
        }

    }

    function dismissLoadingBar(value) {
        if ($scope.checkResponse.indexOf(value) !== -1) {
            $scope.checkResponse.splice($scope.checkResponse.indexOf(value), 1);
            if ($scope.checkResponse.length === 0) {
                $scope.loadingBar = false;
            }
        }
    }

    // Toggle class for Mode drop down
    function toggleBottomPopUpClass(popupName) {
        console.log("toggleBottomPopUpClass_popupName="+popupName);
        if (popupName) {
            $scope.BottomPopupDimBackgroundDiv = "BottomPopupDimBackgroundDivIn";
            $scope.BottomPopupDivCls = "mkpopupboxmode center";
        } else {
            $scope.BottomPopupDimBackgroundDiv = "BottomPopupDimBackgroundDivOut";
            $scope.BottomPopupDivCls = "BottomPopupBGOut";
        }
    }

    function onCloseTempPopup() {
        console.log("onCloseTempPopup");
        $scope.setTemp = $scope.initSelectValue ;
        $scope.tempPopup = false;
        toggleBottomPopUpClass($scope.tempPopup);
        changePopUpClass($scope.tempPopup);
    }

    function closeSpinPopup() {
        console.log("closeSpinPopup");
        $scope.setSpin = $scope.initSelectValue;
        $scope.spinPopup = false;
        toggleBottomPopUpClass($scope.spinPopup);
        changePopUpClass($scope.spinPopup);
        
        for(var i=0; i<5; i++){
            $(".BottomPopUpImageSpin").removeClass('spinAnimate'+i);
        }
    }

    function closeRinsePopup(bool) {
        console.log("closeRinsePopup : "+bool);
        
        if(bool)//OK 일때
        {
            if ($scope.specialCaseRinse !== $scope.setRinse) {
                $scope.rinseChanged = true;
                $scope.specialCaseRinse = $scope.setRinse;
                debugMessage("Rinse changed" + $scope.rinseChanged);
            }
        }
        else //CANCEL 일때
        {
            
        }
        
        $scope.rinsePopup = false;
        toggleBottomPopUpClass($scope.rinsePopup);
        changePopUpClass($scope.rinsePopup);
        checkSpecialCase();
        
        for(var i=0; i<5; i++){
            $(".BottomPopUpImageWave").removeClass('waveAnimate'+i);
        }
    }

    function closeSoilPopup() {
        console.log("closeSoilPopup");
        $scope.soilPopup = false;
        toggleBottomPopUpClass($scope.soilPopup);
        changePopUpClass($scope.soilPopup);
    }

    function getIndexOfDryLevel(drylevelVal) {
        return $scope.currentDryComboLevelList.indexOf(drylevelVal) + 1;
    }

    function onCloseKoreanComboSubOptionPopup() {
        $scope.isKoreanComboSubOption = false;
        toggleBottomPopUpClass($scope.isKoreanComboSubOption);
        changePopUpClass($scope.isKoreanComboSubOption);
    }

    function onCloseKoreanComboSubOptionPopupFav() {
        $scope.isKoreanComboSubOptionFav = false;
        toggleBottomPopUpClass($scope.isKoreanComboSubOptionFav);
        changePopUpClass($scope.isKoreanComboSubOptionFav);
    }

    function init(response) {
        console.log("init");
        var uuid = angular.isDefined($scope.Device) && angular.isDefined($scope.Device.uuid) ? $scope.Device.uuid : "";
        if (!initialDataParsed) {
            $scope.Device = {
                "Alarms": [],
                "ConfigurationLink": {
                    "href": ""
                },
                "Diagnosis": {
                    "diagnosisStart": ""
                },
                "EnergyConsumption": {
                    "saveLocation": ""
                },
                "InformationLink": {
                    "href": ""
                },
                "Mode": {
                    "options": [],
                    "supportedOptions": []
                },
                "Operation": {
                    "kidsLock": "",
                    "power": "",
                    "progress": "",
                    "progressPercentage": 1,
                    "remainingTime": "",
                    "state": "",
                    "supportedProgress": []
                },
                "Washer": {
                },
                "connected": true,
                "description": "",
                "id": "",
                "name": "",
                "resources": [],
                "type": "",
                "uuid": uuid
            };
        }
        var uuid = angular.isDefined($scope.mainWasherData) && angular.isDefined($scope.mainWasherData.uuid) ? $scope.mainWasherData.uuid : "";
        if (!initialDataParsed) {
            $scope.mainWasherData = {
                "Alarms": [],
                "ConfigurationLink": {
                    "href": ""
                },
                "Diagnosis": {
                    "diagnosisStart": ""
                },
                "EnergyConsumption": {
                    "saveLocation": ""
                },
                "InformationLink": {
                    "href": ""
                },
                "Mode": {
                    "options": [],
                    "supportedOptions": []
                },
                "Operation": {
                    "kidsLock": "",
                    "power": "",
                    "progress": "",
                    "progressPercentage": 1,
                    "remainingTime": "",
                    "state": "",
                    "supportedProgress": []
                },
                "Washer": {
                },
                "connected": true,
                "description": "",
                "id": "",
                "name": "",
                "resources": [],
                "type": "",
                "uuid": uuid
            };
        }
        var uuid = angular.isDefined($scope.subWasherData) && angular.isDefined($scope.subWasherData.uuid) ? $scope.subWasherData.uuid : "";
        if (!initialDataParsed) {
            $scope.subWasherData = {
                "Alarms": [],
                "ConfigurationLink": {
                    "href": ""
                },
                "Diagnosis": {
                    "diagnosisStart": ""
                },
                "EnergyConsumption": {
                    "saveLocation": ""
                },
                "InformationLink": {
                    "href": ""
                },
                "Mode": {
                    "options": [],
                    "supportedOptions": []
                },
                "Operation": {
                    "kidsLock": "",
                    "power": "",
                    "progress": "",
                    "progressPercentage": 1,
                    "remainingTime": "",
                    "state": "",
                    "supportedProgress": []
                },
                "Washer": {
                },
                "connected": true,
                "description": "",
                "id": "",
                "name": "",
                "resources": [],
                "type": "",
                "uuid": ""
            };
        }
        rinseSelected = false;
        $scope.current = 0;
        $scope.currentMain = 0;
        $scope.currentSub = 0;
        $scope.errormesaeg = false;
        $scope.progressStart = false;
        $scope.progressStartSub = false;
        $scope.progressStartMain = false;
        $scope.progresshead = false;
        $scope.progressheadSub = false;
        $scope.progressheadMain = false;
        $scope.isErrorMain = false;
        $scope.isErrorSub = false;
        $scope.cycFinishMain = false;
        $scope.cycFinishSub = false;
        $scope.isLaundryEnabled = false;
        $scope.isLaundryEnabledMain = false;
        $scope.isLaundryEnabledSub = false;
        $scope.showEnergyLevelSet = false;
        $scope.showEnergyLevelSetMain = false;
        $scope.showEnergyLevelSetSub = false;
        $scope.hotwarning = false;
        $scope.hotwarningMain = false;
        $scope.hotwarningSub = false;
        $scope.showSeamLessControl = false;
        $scope.showSeamLessControlMain = false;
        $scope.showSeamLessControlSub = false;
        $scope.seamLessControlValue = false;
        $scope.seamLessControlValueMain = false;
        $scope.seamLessControlValueSub = false;
        $scope.disableLaundry = false;
        $scope.disableLaundryMain = false;
        $scope.disableLaundrySub = false;
        $scope.kidsLockByPass = false;
        $scope.kidsLockByPassMain = false;
        $scope.kidsLockByPassSub = false;
        $scope.notiParsingInProress = false;
        $scope.showFreezeProtectionAlarm = false;
        $scope.showFreezeProtectionAlarmMain = false;
        $scope.showFreezeProtectionAlarmSub = false;
        $scope.freezeProtectionAlarmValue = false;
        $scope.freezeProtectionAlarmValueMain = false;
        $scope.freezeProtectionAlarmValueSub = false;
        if (!$scope.isStatic) {
            $scope.checkResponse.push(WASHER_COMMANDS.PARSE_CONFIGURATION);
            SHPService.sendSHPCommand(CONSTANTS.GET, "/" + $scope.peerId + "/devices/0/configuration");
            if (response && response.length === 2) {
                SHPService.sendSHPCommand(CONSTANTS.GET, "/" + $scope.peerId + "/devices/1/configuration");
            }
        }
    }
    console.log("slider create start");
    if( $scope.tempSlide) {
        //$scope.tempSlide.noUiSlider.destroy();
    }
    console.log("slider create start1");
    noUiSlider.create( $scope.tempSlide, {
        animate : true,
        start: 0,
        direction: 'rtl',			// rtl, ltr
        orientation: 'vertical',	// vertical, horizontal
        connect: [true, false],
        range: {
            min: 0,
            max: 100
        }
    });
    console.log("slider create end");
    function updateDeviceData(data) {
        SHPService.updateDeviceData($scope, data);
    }

    function parseConfiguration(configura, deviceId) {
        debugMessage("parseConfiguration deviceId............. " + deviceId);
        dismissLoadingBar(WASHER_COMMANDS.PARSE_CONFIGURATION);
        var smartControlNotification = true;
        $scope.hideSmartControlOption(smartControlNotification);
        if (angular.isDefined(configura["remoteControlEnabled"])) {
            if (isDeviceUpdateRequired(deviceId)) {
                $scope.remoteControlEnabled = configura["remoteControlEnabled"];
                $scope.smartControlOnOffText = $scope.remoteControlEnabled ? $scope.translation.WEBMOB_device_washer_comm_on_CL : $scope.translation.WEBMOB_device_washer_comm_off_CL;
                closeAllPopups();
                debugMessage("$scope.remoteControlEnabled" + $scope.remoteControlEnabled);
            }
        }
        if (angular.isDefined(configura["region"])) {
            $scope.region = configura["region"];
        }
        if (!$scope.isDualWasher) {
            if ((remoteControlEnabledPrevValue && $scope.remoteControlEnabled === false)
                    || (firstConfigCheck && !$scope.remoteControlEnabled)) {
                $timeout(function () {
                    getSmartControlNoti = true;
                    $scope.errorList.push({
                        title: $scope.translation.WEBMOB_device_washer_alarm_smart_control_off,
                        msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_off_washer_msg,
                        btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                        btnOkHandler: function () {
                            onOkClicked(true);
                        },
                        closeDialog: !true
                    });
                    changePopUpClass(true);
                }, MATERIAL_DESIGN.BTN_ANIMATION_TIME);
            }
            remoteControlEnabledPrevValue = $scope.remoteControlEnabled;
            firstConfigCheck = false;
        }

        if ($scope.isDualWasher && deviceId === 0) {
            if (angular.isDefined(configura["remoteControlEnabled"])) {
                if (firstConfigCheck) {
                    remoteControlEnabledPrevValueMain = configura["remoteControlEnabled"];
                }
                $scope.remoteControlEnabledMain = configura["remoteControlEnabled"];
                if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
                    $scope.smartControlOnOffText = $scope.remoteControlEnabledMain ? $scope.translation.WEBMOB_device_washer_comm_on_CL : $scope.translation.WEBMOB_device_washer_comm_off_CL;
                }
                if (!firstConfigCheck) {
                    if ($scope.remoteControlEnabledMain) {
                        closeAllPopups();
                    } else {
                        $timeout(function () {
                            getSmartControlNoti = true;
                            $scope.errorList.push({
                                title: $scope.translation.WEBMOB_device_washer_alarm_smart_control_off,
                                msg: '[' + $scope.translation.WEBMOB_device_washer_comm_front_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_smart_control_off_washer_msg,
                                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                                btnOkHandler: function () {
                                    onOkClicked(true);
                                },
                                closeDialog: !true
                            });
                            changePopUpClass(true);
                        }, MATERIAL_DESIGN.BTN_ANIMATION_TIME);
                    }
                }
                firstConfigCheckDualFront = false;
            }
            if (angular.isDefined(configura["region"])) {
                $scope.regionMain = configura["region"];
            }
        } else if ($scope.isDualWasher && deviceId === 1) {
            if (angular.isDefined(configura["remoteControlEnabled"])) {
                if (firstConfigCheck) {
                    remoteControlEnabledPrevValueSub = configura["remoteControlEnabled"];
                }
                $scope.remoteControlEnabledSub = configura["remoteControlEnabled"];
                if ($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                    $scope.smartControlOnOffText = $scope.remoteControlEnabledSub ? $scope.translation.WEBMOB_device_washer_comm_on_CL : $scope.translation.WEBMOB_device_washer_comm_off_CL;
                }

                if (!firstConfigCheck && !$scope.remoteControlEnabledSub) {
                    if ($scope.remoteControlEnabledSub) {
                        closeAllPopups();
                    } else {
                        $timeout(function () {
                            getSmartControlNoti = true;
                            $scope.errorList.push({
                                title: $scope.translation.WEBMOB_device_washer_alarm_smart_control_off,
                                msg: '[' + $scope.translation.WEBMOB_device_washer_comm_top_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_smart_control_off_washer_msg,
                                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                                btnOkHandler: function () {
                                    onOkClicked(true);
                                },
                                closeDialog: !true
                            });
                            changePopUpClass(true);
                        }, MATERIAL_DESIGN.BTN_ANIMATION_TIME);
                    }
                }
                firstConfigCheckDualTop = false;
            }
            if (angular.isDefined(configura["region"])) {
                $scope.regionSub = configura["region"];
            }
        } else {
            ;//NOthing
        }

        if ($scope.isDualWasher && firstConfigCheck && !firstConfigCheckDualTop && !firstConfigCheckDualFront) {
            if (!remoteControlEnabledPrevValueMain && !remoteControlEnabledPrevValueSub && $scope.mainWasherData.Operation.power === 'On' && $scope.subWasherData.Operation.power === 'On') {
                $timeout(function () {
                    getSmartControlNoti = true;
                    $scope.errorList.push({
                        title: $scope.translation.WEBMOB_device_washer_alarm_smart_control_off,
                        msg: '[' + $scope.translation.WEBMOB_device_washer_comm_top_loader + ', ' + $scope.translation.WEBMOB_device_washer_comm_front_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_smart_control_off_washer_msg,
                        btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                        btnOkHandler: function () {
                            onOkClicked(true);
                        },
                        closeDialog: !true
                    });
                    changePopUpClass(true);
                }, MATERIAL_DESIGN.BTN_ANIMATION_TIME);
            } else if (!remoteControlEnabledPrevValueMain && $scope.mainWasherData.Operation.power === 'On') {
                $timeout(function () {
                    getSmartControlNoti = true;
                    $scope.errorList.push({
                        title: $scope.translation.WEBMOB_device_washer_alarm_smart_control_off,
                        msg: '[' + $scope.translation.WEBMOB_device_washer_comm_front_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_smart_control_off_washer_msg,
                        btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                        btnOkHandler: function () {
                            onOkClicked(true);
                        },
                        closeDialog: !true
                    });
                    changePopUpClass(true);
                }, MATERIAL_DESIGN.BTN_ANIMATION_TIME);
            } else if (!remoteControlEnabledPrevValueSub && $scope.subWasherData.Operation.power === 'On') {
                $timeout(function () {
                    getSmartControlNoti = true;
                    $scope.errorList.push({
                        title: $scope.translation.WEBMOB_device_washer_alarm_smart_control_off,
                        msg: '[' + $scope.translation.WEBMOB_device_washer_comm_top_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_smart_control_off_washer_msg,
                        btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                        btnOkHandler: function () {
                            onOkClicked(true);
                        },
                        closeDialog: !true
                    });
                    changePopUpClass(true);
                }, MATERIAL_DESIGN.BTN_ANIMATION_TIME);
            } else {
                ;//Nothing
            }
        }

        if ($scope.isDualWasher && !firstConfigCheckDualTop && !firstConfigCheckDualFront) {
            firstConfigCheck = false;
        }
    }

    function requestFailHandler(response) {
        debugMessage("Fail Handler respose is::" + response);
        $scope.loadingBar = false;
        $scope.checkResponse = [];
    }

    function parseDeviceData(devices) {

        initialDataParsed = false;
        dismissLoadingBar(WASHER_COMMANDS.getDevices);
        debugMessage(JSON.stringify(devices));
        $scope.washerToUpdate = WASHERTOUPDATE.NONE;

        if (devices.length === 2) {
            $scope.isDualWasher = true;
        } else {
            if (devices[0]["Mode"] && devices[0]["Mode"].options) {
                devices[0]["Mode"].options.forEach(function (value) {
                    if (value.indexOf("DeviceType") !== -1) {
                        checkIfTopLoaderForSingleWasher(value);
                    }
                });
            }
        }

        if (!$scope.isDualWasher) {
            $scope.Device = devices[0];
            $scope.washerToUpdate = WASHERTOUPDATE.SINGLEWASHER;
            parseWasherData(devices[0]);
            $scope.washerToUpdate = WASHERTOUPDATE.NONE;
        } else {
            if (devices instanceof Array) {
                devices.forEach(function (value) {
                    if (value["id"] === '0') {
                        $scope.mainWasherData = value;
                        $scope.washerToUpdate = WASHERTOUPDATE.MAINWASHER;
                        if ($scope.homePage || $scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
                            parseWasherData(value);
                        }
                        $scope.washerToUpdate = WASHERTOUPDATE.NONE;
                    }
                    if (value["id"] === '1') {
                        $scope.subWasherData = value;
                        $scope.washerToUpdate = WASHERTOUPDATE.SUBWASHER;
                        if ($scope.homePage || $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                            parseWasherData(value);
                        }
                        $scope.washerToUpdate = WASHERTOUPDATE.NONE;
                    }
                });
            }
        }
        checkIfTimeSyncVisible();
        $scope.mainLoadingScreen = true;
        $scope.pageLoaded = true;
        isCallFromReset = 1;
        initialDataParsed = true;
        if ($scope.isDualWasher && $scope.homePage) {
            goToHome();
        }
    }

    function parseNotificationData(devices, deviceId) {
        debugMessage("deviceId :" + deviceId);
        if (!initialDataParsed) {
            return;
        }
        $scope.notiParsingInProress = true;
        debugMessage(JSON.stringify(devices));
        if (!$scope.isDualWasher) {
            updateSingleWasherData(devices);
            $scope.washerToUpdate = WASHERTOUPDATE.SINGLEWASHER;
            parseWasherData(devices);
            $scope.washerToUpdate = WASHERTOUPDATE.NONE;
        } else {
            if (deviceId === 0) {
                $scope.washerToUpdate = WASHERTOUPDATE.MAINWASHER;
                updateMainWasherData(devices);
                $scope.washerToUpdate = WASHERTOUPDATE.NONE;
            }
            if (deviceId === 1) {
                $scope.washerToUpdate = WASHERTOUPDATE.SUBWASHER;
                updateSubWasherData(devices);
                $scope.washerToUpdate = WASHERTOUPDATE.NONE;
            }
        }
        $scope.notiParsingInProress = false;

        if (angular.isDefined(devices["Information"])) {
            //console.log("Inside parseDeviceData: angular.isDefined(devices['Information']:::" + angular.isDefined(devices["Information"]));
            parseModuleInformation(devices["Information"]);
        }
    }

    function updateSingleWasherData(device) {
        if (angular.isDefined(device["description"])) {
            $scope.Device.description = device["description"];
        }

        if (angular.isDefined(device["id"])) {
            $scope.Device.id = device["id"];
        }

        if (angular.isDefined(device["Alarms"])) {
            $scope.Device.Alarms = device["Alarms"];
        }

        if (angular.isDefined(device["ConfigurationLink"]) && angular.isDefined(device["ConfigurationLink"]["href"])) {
            $scope.Device.ConfigurationLink.href = device["ConfigurationLink"]["href"];
        }

        if (angular.isDefined(device["Diagnosis"]) && angular.isDefined(device["Diagnosis"]["diagnosisStart"])) {
            $scope.Device.Diagnosis.diagnosisStart = device["Diagnosis"]["diagnosisStart"];
        }

        if (angular.isDefined(device["EnergyConsumption"]) && angular.isDefined(device["EnergyConsumption"]["saveLocation"])) {
            $scope.Device.EnergyConsumption.saveLocation = device["EnergyConsumption"]["saveLocation"];
        }

        if (angular.isDefined(device["InformationLink"]) && angular.isDefined(device["InformationLink"]["href"])) {
            $scope.Device.InformationLink.href = device["InformationLink"]["href"];
        }

        if (angular.isDefined(device["type"])) {
            $scope.Device.type = device["type"];
        }

        if (angular.isDefined(device["Mode"]) && angular.isDefined(device["Mode"]["options"])) {
            $scope.Device.Mode.options = device["Mode"]["options"];
        }

        if (angular.isDefined(device["Mode"]) && angular.isDefined(device["Mode"]["supportedOptions"])) {
            $scope.Device.Mode.supportedOptions = device["Mode"]["supportedOptions"];
        }

        if (angular.isDefined(device["Operation"])) {
            if (angular.isDefined(device["Operation"]["kidsLock"])) {
                $scope.Device.Operation.kidsLock = device["Operation"]["kidsLock"];
            }
            if (angular.isDefined(device["Operation"]["power"])) {
                $scope.Device.Operation.power = device["Operation"]["power"];
            }
            if (angular.isDefined(device["Operation"]["progress"])) {
                $scope.Device.Operation.progress = device["Operation"]["progress"];
            }
            if (angular.isDefined(device["Operation"]["progressPercentage"])) {
                $scope.Device.Operation.progressPercentage = device["Operation"]["progressPercentage"];
            }
            if (angular.isDefined(device["Operation"]["remainingTime"])) {
                $scope.Device.Operation.remainingTime = device["Operation"]["remainingTime"];
            }
            if (angular.isDefined(device["Operation"]["state"])) {
                $scope.Device.Operation.state = device["Operation"]["state"];
            }
            if (angular.isDefined(device["Operation"]["supportedProgress"])) {
                $scope.Device.Operation.supportedProgress = device["Operation"]["supportedProgress"];
            }
        }

        if (angular.isDefined(device["Washer"])) {
            if (angular.isDefined(device["Washer"]["soilLevel"])) {
                $scope.Device.Washer.soilLevel = device["Washer"]["soilLevel"];
            }
            if (angular.isDefined(device["Washer"]["spinLevel"])) {
                $scope.Device.Washer.spinLevel = device["Washer"]["spinLevel"];
            }
            if (angular.isDefined(device["Washer"]["waterTemperature"])) {
                $scope.Device.Washer.waterTemperature = device["Washer"]["waterTemperature"];
            }
            if (angular.isDefined(device["Washer"]["supportedSoilLevel"])) {
                $scope.Device.Washer.supportedSoilLevel = device["Washer"]["supportedSoilLevel"];
            }
            if (angular.isDefined(device["Washer"]["supportedSpinLevel"])) {
                $scope.Device.Washer.supportedSpinLevel = device["Washer"]["supportedSpinLevel"];
            }
            if (angular.isDefined(device["Washer"]["supportedWaterTemperature"])) {
                $scope.Device.Washer.supportedWaterTemperature = device["Washer"]["supportedWaterTemperature"];
            }
        }
        if (angular.isDefined(device["resources"])) {
            $scope.Device.resources = device["resources"];
        }
    }

    function parseWasherData(device, isDualMainSubObject) {
        if (angular.isDefined(device["Configuration"]) && angular.isDefined(device["Configuration"]["remoteControlEnabled"])) {
            parseConfiguration(device["Configuration"]);
        }

        if (angular.isDefined($scope.demoErrorCode)) {
            if (isDeviceUpdateRequired($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED ? 1 : 0)) {
                $scope.currentErrorCode = $scope.demoErrorCode;
                openErrorTextArray($scope.currentErrorCode);
            }
            if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                $scope.currentErrorCodeMain = $scope.demoErrorCode;
                openErrorTextArray($scope.currentErrorCodeMain);
            } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                $scope.currentErrorCodeSub = $scope.demoErrorCode;
                openErrorTextArray($scope.currentErrorCodeSub);
            } else {
                ;//Nothing
            }
            $scope.mainLoadingScreen = true;
            $scope.pageLoaded = true;
            return;
        }
        if (firstParse) {
            if (angular.isDefined(device["Mode"]) && angular.isDefined(device["Mode"].supportedOptions)) {
                firstParse = false;
            } else {
                return;
            }
        }

        if (angular.isDefined(device["type"])) {
            if (isDeviceUpdateRequired($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED ? 1 : 0)) {
                $scope.deviceType = "Washer"; //device["type"];
            }
            if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                $scope.deviceTypeMain = device["type"];
            } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                $scope.deviceTypeSub = device["type"];
            } else {
                ;//Nothing
            }
        }

        if (angular.isDefined(device["description"])) {
            updateDeviceName(device["description"]);
        }
        if (angular.isDefined(device["EnergyConsumption"]) && angular.isDefined(device["EnergyConsumption"].saveLocation)) {
            $scope.energyMonitorLocation = device["EnergyConsumption"].saveLocation;
            $scope.showEnergyMonitorOption = true;
            $scope.optionCodeValue = "OptionCode_16384";   // hardcoded for native processing
        }
        if (angular.isDefined(device["resources"])) {
            showSmartCheck(device["resources"]);
        }
        if (angular.isDefined(device["Mode"])) {
            if (angular.isDefined(device["Mode"].options)) {
                updateMostUsed(device["Mode"].options);
            }
            if (angular.isDefined(device["Mode"].supportedOptions)) {
                if (!$scope.isDualWasher && ($scope.homePage || $scope.detailPage)) {
                    goToHome();
                }
                parseCourseOptions(device["Mode"].supportedOptions[0], isDualMainSubObject);
            }
            if (angular.isDefined(device["Mode"].options)) {
                if (!$scope.cycFinish || ($scope.cycFinish && $scope.isLaundryEnabled)) {
                    updateDeviceModel(device["Mode"].options, isDualMainSubObject);
                }
            }
        }
        if (angular.isDefined(device["Washer"]) && !$scope.cycFinish) {
            parseDefaultOptionValues(device["Washer"]);
        }

        if (angular.isDefined(device["Operation"]) && (!$scope.isDualWasher || ($scope.isDualWasher && !$scope.cycFinish))) {
            updateOperation(device["Operation"]);
        }
        if (angular.isDefined(device["Alarms"])) {
            checkAlarms(device, isDualMainSubObject);
        }
        if (angular.isDefined(device["Diagnosis"])) {
            showDiagnosisPage(device["Diagnosis"]);
        }
    }

    function updateMainWasherData(device) {
        if (angular.isDefined(device["Configuration"]) && angular.isDefined(device["Configuration"]["remoteControlEnabled"])) {
            parseConfiguration(device["Configuration"], 0);
        }

        if (angular.isDefined(device["description"])) {
            $scope.mainWasherData.description = device["description"];
            updateDeviceName(device["description"]);
        }

        if (angular.isDefined(device["id"])) {
            $scope.mainWasherData.id = device["id"];
        }

        if (angular.isDefined(device["Alarms"])) {
            $scope.mainWasherData.Alarms = device["Alarms"];
            checkAlarms(device);
        }

        if (angular.isDefined(device["ConfigurationLink"]) && angular.isDefined(device["ConfigurationLink"]["href"])) {
            $scope.mainWasherData.ConfigurationLink.href = device["ConfigurationLink"]["href"];
        }

        if (angular.isDefined(device["Diagnosis"]) && angular.isDefined(device["Diagnosis"]["diagnosisStart"])) {
            $scope.mainWasherData.Diagnosis.diagnosisStart = device["Diagnosis"]["diagnosisStart"];
            showDiagnosisPage(device["Diagnosis"]);
        }

        if (angular.isDefined(device["EnergyConsumption"]) && angular.isDefined(device["EnergyConsumption"]["saveLocation"])) {
            $scope.mainWasherData.EnergyConsumption.saveLocation = device["EnergyConsumption"]["saveLocation"];
            $scope.energyMonitorLocation = device["EnergyConsumption"].saveLocation;
            $scope.showEnergyMonitorOption = true;
            $scope.optionCodeValue = "OptionCode_16384";   // hardcoded for native processing
        }

        if (angular.isDefined(device["InformationLink"]) && angular.isDefined(device["InformationLink"]["href"])) {
            $scope.mainWasherData.InformationLink.href = device["InformationLink"]["href"];
        }

        if (angular.isDefined(device["type"])) {
            $scope.mainWasherData.type = device["type"];
            if (isDeviceUpdateRequired($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED ? 1 : 0)) {
                $scope.deviceType = "Washer"; //device["type"];
            }
            $scope.deviceTypeMain = device["type"];
        }

        if (angular.isDefined(device["Mode"])) {
            if (angular.isDefined(device["Mode"]["options"])) {
                $scope.mainWasherData.Mode.options = device["Mode"]["options"];
                if (!$scope.cycFinishMain) {
                    updateMostUsedMain(device["Mode"].options);
                }
            }
            if (angular.isDefined(device["Mode"]["supportedOptions"])) {
                $scope.mainWasherData.Mode.supportedOptions = device["Mode"]["supportedOptions"];
                if (!$scope.cycFinishMain) {
                    parseCourseOptions(device["Mode"].supportedOptions[0], false);
                }
            }
            if (angular.isDefined(device["Mode"]["options"])) {
                $scope.mainWasherData.Mode.options = device["Mode"]["options"];
                if (!$scope.cycFinishMain || ($scope.cycFinishMain && $scope.isLaundryEnabledMain)) {
                    updateDeviceModel(device["Mode"].options);
                }
            }
        }

        if (angular.isDefined(device["Operation"])) {
            if (angular.isDefined(device["Operation"]["kidsLock"])) {
                $scope.mainWasherData.Operation.kidsLock = device["Operation"]["kidsLock"];
            }
            if (angular.isDefined(device["Operation"]["power"])) {
                var previousPowerState = $scope.mainWasherData.Operation.power;
                $scope.mainWasherData.Operation.power = device["Operation"]["power"];
                if ($scope.mainWasherData.Operation.power === "Off") {
                    if ($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                        $scope.cycFinishMain = false;
                    }
                    powerOffPopUp = true;
                    $scope.errorList.push({
                        title: '',
                        msg: '[' + $scope.translation.WEBMOB_device_washer_comm_front_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_power_off_msg_washer,
                        btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                        btnOkHandler: function () {
                            $scope.okClickedAtPowerOff(true, 0);
                        },
                        closeDialog: false
                    });
                    changePopUpClass(true);
                }
                if ($scope.mainWasherData.Operation.power === "On" && previousPowerState !== "On") {
                    okClickedAtPowerOff();
                    if ($scope.cycFinishMain) {
                        callGetDevice();
                        return;
                    }
                }
            }
            if (angular.isDefined(device["Operation"]["progress"])) {
                $scope.mainWasherData.Operation.progress = device["Operation"]["progress"];
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.Device.Operation.progress = $scope.mainWasherData.Operation.progress
                }
            }
            if (angular.isDefined(device["Operation"]["progressPercentage"])) {
                $scope.mainWasherData.Operation.progressPercentage = device["Operation"]["progressPercentage"];
            }
            if (angular.isDefined(device["Operation"]["remainingTime"])) {
                $scope.mainWasherData.Operation.remainingTime = device["Operation"]["remainingTime"];
            }
            if (angular.isDefined(device["Operation"]["state"])) {
                $scope.mainWasherData.Operation.state = device["Operation"]["state"];
            }
            if (angular.isDefined(device["Operation"]["supportedProgress"])) {
                $scope.mainWasherData.Operation.supportedProgress = device["Operation"]["supportedProgress"];
            }
            if (!$scope.cycFinishMain) {
                updateOperation(device["Operation"]);
            } else {
                if (device["Operation"]["state"] === "Ready" && $scope.seamLessControlValueMain) {
                    dismissLoadingBar(WASHER_COMMANDS.cancelWasher);
                    if (isDeviceUpdateRequired($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED ? 1 : 0)) {
                        $scope.cycFinish = false;
                        $scope.disableLaundry = false;
                        $scope.spinOnly = false;
                        $scope.rinseOnly = false;
                        $scope.rinseOnlyAtSetCourse = false;
                        $scope.dryingOnly = false;
                        $scope.washNotIncluded = false;
                    }
                    $scope.dryingOnlyMain = false;
                    $scope.rinseOnlyMain = false;
                    $scope.rinseOnlyAtSetCourseMain = false;
                    $scope.spinOnlyMain = false;
                    $scope.washNotIncludedMain = false;
                    $scope.cycFinishMain = false;
                    //updateOperation(device["Operation"]);
                    callGetDevice();
                    return;
                }
            }
        }

        if (angular.isDefined(device["Washer"])) {
            if (angular.isDefined(device["Washer"]["soilLevel"])) {
                $scope.mainWasherData.Washer.soilLevel = device["Washer"]["soilLevel"];
            }
            if (angular.isDefined(device["Washer"]["spinLevel"])) {
                $scope.mainWasherData.Washer.spinLevel = device["Washer"]["spinLevel"];
            }
            if (angular.isDefined(device["Washer"]["dryLevel"])) {
                $scope.mainWasherData.Washer.dryLevel = device["Washer"]["dryLevel"];
            }
            if (angular.isDefined(device["Washer"]["rinseCycles"])) {
                $scope.mainWasherData.Washer.rinseCycles = device["Washer"]["rinseCycles"];
            }
            if (angular.isDefined(device["Washer"]["waterTemperature"])) {
                $scope.mainWasherData.Washer.waterTemperature = device["Washer"]["waterTemperature"];
            }
            if (angular.isDefined(device["Washer"]["supportedSoilLevel"])) {
                $scope.mainWasherData.Washer.supportedSoilLevel = device["Washer"]["supportedSoilLevel"];
            }
            if (angular.isDefined(device["Washer"]["supportedSpinLevel"])) {
                $scope.mainWasherData.Washer.supportedSpinLevel = device["Washer"]["supportedSpinLevel"];
            }
            if (angular.isDefined(device["Washer"]["supportedWaterTemperature"])) {
                $scope.mainWasherData.Washer.supportedWaterTemperature = device["Washer"]["supportedWaterTemperature"];
            }
            if (!$scope.cycFinishMain) {
                parseDefaultOptionValues(device["Washer"]);
            }
        }
        if (angular.isDefined(device["resources"])) {
            $scope.mainWasherData.resources = device["resources"];
            showSmartCheck(device["resources"]);
        }
    }

    function updateSubWasherData(device) {
        if (angular.isDefined(device["Configuration"]) && angular.isDefined(device["Configuration"]["remoteControlEnabled"])) {
            parseConfiguration(device["Configuration"], 1);
        }

        if (angular.isDefined(device["description"])) {
            $scope.subWasherData.description = device["description"];
            updateDeviceName(device["description"]);
        }

        if (angular.isDefined(device["id"])) {
            $scope.subWasherData.id = device["id"];
        }

        if (angular.isDefined(device["Alarms"])) {
            $scope.subWasherData.Alarms = device["Alarms"];
            checkAlarms(device);
        }

        if (angular.isDefined(device["ConfigurationLink"]) && angular.isDefined(device["ConfigurationLink"]["href"])) {
            $scope.subWasherData.ConfigurationLink.href = device["ConfigurationLink"]["href"];
        }

        if (angular.isDefined(device["Diagnosis"]) && angular.isDefined(device["Diagnosis"]["diagnosisStart"])) {
            $scope.subWasherData.Diagnosis.diagnosisStart = device["Diagnosis"]["diagnosisStart"];
            showDiagnosisPage(device["Diagnosis"]);
        }

        if (angular.isDefined(device["EnergyConsumption"]) && angular.isDefined(device["EnergyConsumption"]["saveLocation"])) {
            $scope.subWasherData.EnergyConsumption.saveLocation = device["EnergyConsumption"]["saveLocation"];
            $scope.energyMonitorLocation = device["EnergyConsumption"].saveLocation;
            $scope.showEnergyMonitorOption = true;
            $scope.optionCodeValue = "OptionCode_16384";   // hardcoded for native processing
        }

        if (angular.isDefined(device["InformationLink"]) && angular.isDefined(device["InformationLink"]["href"])) {
            $scope.subWasherData.InformationLink.href = device["InformationLink"]["href"];
        }

        if (angular.isDefined(device["type"])) {
            $scope.subWasherData.type = device["type"];
            if (isDeviceUpdateRequired($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED ? 1 : 0)) {
                $scope.deviceType = "Washer"; //device["type"];
            }
            $scope.deviceTypesUB = device["type"];
        }

        if (angular.isDefined(device["Mode"])) {
            if (angular.isDefined(device["Mode"]["options"])) {
                $scope.subWasherData.Mode.options = device["Mode"]["options"];
                if (!$scope.cycFinishSub) {
                    updateMostUsedSub(device["Mode"].options);
                }
            }
            if (angular.isDefined(device["Mode"]["supportedOptions"])) {
                $scope.subWasherData.Mode.supportedOptions = device["Mode"]["supportedOptions"];
                if (!$scope.cycFinishSub) {
                    parseCourseOptions(device["Mode"].supportedOptions[0], false);
                }
            }
            if (angular.isDefined(device["Mode"]["options"])) {
                $scope.subWasherData.Mode.options = device["Mode"]["options"];
                if (!$scope.cycFinishSub || ($scope.cycFinishSub && $scope.isLaundryEnabledSub)) {
                    updateDeviceModel(device["Mode"].options);
                }
            }
        }

        if (angular.isDefined(device["Operation"])) {
            if (angular.isDefined(device["Operation"]["kidsLock"])) {
                $scope.subWasherData.Operation.kidsLock = device["Operation"]["kidsLock"];
            }
            if (angular.isDefined(device["Operation"]["power"])) {
                var previousPowerStateSubWasher = $scope.subWasherData.Operation.power;
                $scope.subWasherData.Operation.power = device["Operation"]["power"];
                if ($scope.subWasherData.Operation.power === "Off") {
                    if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
                        $scope.cycFinishSub = false;
                    }
                    powerOffPopUp = true;
                    $scope.errorList.push({
                        title: '',
                        msg: '[' + $scope.translation.WEBMOB_device_washer_comm_top_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_power_off_msg_washer,
                        btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                        btnOkHandler: function () {
                            $scope.okClickedAtPowerOff(true, 1);
                        },
                        closeDialog: false
                    });
                    changePopUpClass(true);
                }
                if ($scope.subWasherData.Operation.power === "On" && previousPowerStateSubWasher !== "On") {
                    okClickedAtPowerOff();
                    if ($scope.cycFinishSub) {
                        callGetDevice();
                        return;
                    }
                }
            }
            if (angular.isDefined(device["Operation"]["progress"])) {
                $scope.subWasherData.Operation.progress = device["Operation"]["progress"];
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.Device.Operation.progress = $scope.subWasherData.Operation.progress
                }
            }
            if (angular.isDefined(device["Operation"]["progressPercentage"])) {
                $scope.subWasherData.Operation.progressPercentage = device["Operation"]["progressPercentage"];
            }
            if (angular.isDefined(device["Operation"]["remainingTime"])) {
                $scope.subWasherData.Operation.remainingTime = device["Operation"]["remainingTime"];
            }
            if (angular.isDefined(device["Operation"]["state"])) {
                $scope.subWasherData.Operation.state = device["Operation"]["state"];
            }
            if (angular.isDefined(device["Operation"]["supportedProgress"])) {
                $scope.subWasherData.Operation.supportedProgress = device["Operation"]["supportedProgress"];
            }
            if (!$scope.cycFinishSub) {
                updateOperation(device["Operation"]);
            } else {
                if (device["Operation"]["state"] === "Ready" && $scope.seamLessControlValueSub) {
                    dismissLoadingBar(WASHER_COMMANDS.cancelWasher);
                    if (isDeviceUpdateRequired($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED ? 1 : 0)) {
                        $scope.cycFinish = false;
                        $scope.disableLaundry = false;
                        $scope.spinOnly = false;
                        $scope.rinseOnly = false;
                        $scope.rinseOnlyAtSetCourse = false;
                        $scope.dryingOnly = false;
                        $scope.washNotIncluded = false;
                    }
                    $scope.dryingOnlySub = false;
                    $scope.rinseOnlySub = false;
                    $scope.rinseOnlyAtSetCourseSub = false;
                    $scope.spinOnlySub = false;
                    $scope.washNotIncludedSub = false;
                    $scope.cycFinishSub = false;
                    //updateOperation(device["Operation"]);
                    callGetDevice();
                    return;
                }
            }
        }

        if (angular.isDefined(device["Washer"])) {
            if (angular.isDefined(device["Washer"]["soilLevel"])) {
                $scope.subWasherData.Washer.soilLevel = device["Washer"]["soilLevel"];
            }
            if (angular.isDefined(device["Washer"]["spinLevel"])) {
                $scope.subWasherData.Washer.spinLevel = device["Washer"]["spinLevel"];
            }
            if (angular.isDefined(device["Washer"]["dryLevel"])) {
                $scope.subWasherData.Washer.dryLevel = device["Washer"]["dryLevel"];
            }
            if (angular.isDefined(device["Washer"]["rinseCycles"])) {
                $scope.subWasherData.Washer.rinseCycles = device["Washer"]["rinseCycles"];
            }
            if (angular.isDefined(device["Washer"]["waterTemperature"])) {
                $scope.subWasherData.Washer.waterTemperature = device["Washer"]["waterTemperature"];
            }
            if (angular.isDefined(device["Washer"]["supportedSoilLevel"])) {
                $scope.subWasherData.Washer.supportedSoilLevel = device["Washer"]["supportedSoilLevel"];
            }
            if (angular.isDefined(device["Washer"]["supportedSpinLevel"])) {
                $scope.subWasherData.Washer.supportedSpinLevel = device["Washer"]["supportedSpinLevel"];
            }
            if (angular.isDefined(device["Washer"]["supportedWaterTemperature"])) {
                $scope.subWasherData.Washer.supportedWaterTemperature = device["Washer"]["supportedWaterTemperature"];
            }
            if (!$scope.cycFinishSub) {
                parseDefaultOptionValues(device["Washer"]);
            }
        }
        if (angular.isDefined(device["resources"])) {
            $scope.subWasherData.resources = device["resources"];
            showSmartCheck(device["resources"]);
        }
    }

    function handleStatusCode(status, response, deviceId) {
        debugMessage("deviceId :" + deviceId);
        if (status === WASHER_COMMANDS.STATUS_204) {
            if ($scope.checkResponse.indexOf(WASHER_COMMANDS.diagnosis) > -1) {
                // do nothing
            }
            if ($scope.checkResponse.indexOf(WASHER_COMMANDS.syncTime) > -1) {
                $scope.syncTime = true;
                setLocalStorageData('WASHERsyncTime1', JSON.stringify($scope.syncTime));
                if (deviceId === 0) {
                    $scope.syncTimeMain = true;
                    setLocalStorageData('WASHERsyncTimeMain1', JSON.stringify($scope.syncTimeMain));
                } else if (deviceId === 1) {
                    $scope.syncTimeSub = true;
                    setLocalStorageData('WASHERsyncTimeSub1', JSON.stringify($scope.syncTimeSub));
                } else {
                    ;//Nothing
                }
                dismissLoadingBar(WASHER_COMMANDS.syncTime);
            }
        }
    }

    function closeConnectionFailurePopup() {
        if ($scope.errorList.length > 0) {
            for (var i = 0; i < $scope.errorList.length; i++) {
                $scope.errorList.pop();
            }
            $scope.alertState = WASHERALERT.NONE;
            document.getElementById("scrollSettings").style.overflowY = "overlay";
        }
    }

    function checkAlarms(alarmString, isDualMainSubObject) {
        if (isDualMainSubObject || alarmString["Alarms"][0] === undefined) {
            return;
        }
        console.log("Alarm function");
        if (angular.isDefined(alarmString["Alarms"][0].code)) {
            if (alarmString["Alarms"][0].code === "DrumClean") {
                // Do Nothing just handle this alarm
                debugMessage("Just handling this alarm..DO nothing");
            } else if (alarmString["Alarms"][0].code === "FilterAlarm") {
                // Do Nothing just handle this alarm
                //debugMessage("Just handling this alarm..DO nothing");
                if (alarmString.event === "Created") {
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        return;
                    }
                    $scope.errorList.push({
                        msg: $scope.translation.WEBMOB_device_washer_alarm_drain_filter_msg,
                        btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_view_CL,
                        btnOkHandler: function () {
                            onOkClicked(true);
                        },
                        btnCancelTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                        btnCancelHandler: function () {
                            onOkClicked(false);
                        },
                        closeDialog: !true
                    });
                    $scope.alertState = WASHERALERT.DRAINFILTER_GUIDE;
                    changePopUpClass(true);
                    return;
                }
            } else if (alarmString["Alarms"][0].code === "FreezeProtection") {
                if (alarmString.event === "Created") {
                    var dispenserOpenErrorMsg = $scope.translation.WEBMOB_device_washer_alarm_freeze_protection_msg;
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        dispenserOpenErrorMsg = '[' + $scope.translation.WEBMOB_device_washer_comm_front_loader + ']<br>' + dispenserOpenErrorMsg;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        dispenserOpenErrorMsg = '[' + $scope.translation.WEBMOB_device_washer_comm_top_loader + ']<br>' + dispenserOpenErrorMsg;
                    } else {
                        ;//Nothing
                    }
                    showcustDialog($scope.translation.WEBMOB_device_washer_comm_notice, dispenserOpenErrorMsg, false, false);
                    var notifyTime = $timeout(function () {
                        $timeout.cancel(notifyTime);
                        $scope.custDialogpopup = false;
                    }, 3000);
                } else if (alarmString.event === "Deleted") {
                    ;// Nothing
                } else {
                    ;//Nothing
                }
            } else if (alarmString["Alarms"][0].code === "AirwashWarning") {
                if (!angular.isDefined(alarmString.event) || alarmString.event === "Created") {
                    $scope.loadingBar = false;
                    $scope.checkResponse = [];
                    var airWashingErrorMsg = $scope.translation.WEBMOB_device_washer_alarm_airwashing_error_msg;
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        airWashingErrorMsg = '[' + $scope.translation.WEBMOB_device_washer_comm_front_loader + ']<br>' + airWashingErrorMsg;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        airWashingErrorMsg = '[' + $scope.translation.WEBMOB_device_washer_comm_top_loader + ']<br>' + airWashingErrorMsg;
                    } else {
                        ;//Nothing
                    }
                    $timeout(function () {
                        getSmartControlNoti = true;
                        $scope.errorList.push({
                            title: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_title,
                            msg: airWashingErrorMsg,
                            btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                            btnOkHandler: function () {
                                onOkClicked(true);
                            },
                            closeDialog: !true
                        });
                        changePopUpClass(true);
                    }, MATERIAL_DESIGN.BTN_ANIMATION_TIME);

                } else if (alarmString.event === "Deleted") {
                    debugMessage("Just handling this alarm..DO nothing");
                } else {
                    debugMessage("Just handling this alarm..DO nothing");
                }
            } else if (alarmString["Alarms"][0].code === "HotWarning") {
                if ((angular.isDefined(alarmString.event) && alarmString.event === "Created") || (!angular.isDefined(alarmString.event))) {
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                        $scope.hotwarning = true;
                    }
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        $scope.hotwarningMain = true;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        $scope.hotwarningSub = true;
                    } else {
                        ;//Nothing
                    }
                } else if (angular.isDefined(alarmString.event) && alarmString.event === "Deleted") {
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                        $scope.hotwarning = false;
                    }
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        $scope.hotwarningMain = false;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        $scope.hotwarningSub = false;
                    } else {
                        ;//Nothing
                    }
                } else {
                    ;//Nothing
                }
            } else if (alarmString["Alarms"][0].code === "DispenserOpen") {
                if (alarmString.event === "Created") {
                    $scope.alertState = WASHERALERT.DISPENSER_OPEN;
                    var dispenserOpenErrorMsg = $scope.translation.WEBMOB_device_washer_error_message_sde_result;
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        dispenserOpenErrorMsg = '[' + $scope.translation.WEBMOB_device_washer_comm_front_loader + ']<br>' + dispenserOpenErrorMsg;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        dispenserOpenErrorMsg = '[' + $scope.translation.WEBMOB_device_washer_comm_top_loader + ']<br>' + dispenserOpenErrorMsg;
                    } else {
                        ;//Nothing
                    }
                    showcustDialog($scope.translation.WEBMOB_device_washer_comm_notice, dispenserOpenErrorMsg, false, false);
                    var notifyTime = $timeout(function () {
                        $timeout.cancel(notifyTime);
                        $scope.custDialogpopup = false;
                    }, 3000);
                } else if (alarmString.event === "Deleted") {
                    ;// Nothing
                } else {
                    ;//Nothing
                }
            } else if (alarmString["Alarms"][0].code === "DispenserAbnormal") {
                // Do Nothing just handle this alarm
                debugMessage("Just handling this alarm..DO nothing");
            } else if (alarmString["Alarms"][0].code !== "ErrorChecking") {
                debugMessage("Alarm function");
                if (!angular.isDefined(alarmString.event) || alarmString.event === "Created") { // !angular.isDefined(alarmString.event) || 

                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        $scope.isErrorMain = true;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        $scope.isErrorSub = true;
                    } else {
                        ;//Nothing
                    }

                    var alarmtxt = alarmString["Alarms"][0].code;
                    alarmtxt = alarmtxt.split("_")[1];
                    alarmtxt = alarmtxt.toLowerCase();
                    debugMessage("alarm text is ::" + alarmtxt);
                    debugMessage("alarm text is ::" + getErrorTitle(alarmtxt) + ":::" + getErrorMessage(alarmtxt) + ":::" + getErrorAction(alarmtxt));
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                        $scope.errorTitle = getErrorTitle(alarmtxt);
                        $scope.errorResult = getErrorMessage(alarmtxt);
                        $scope.errorAction = getErrorAction(alarmtxt);
                    }
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        $scope.errorTitleMain = getErrorTitle(alarmtxt);
                        $scope.errorResultMain = getErrorMessage(alarmtxt);
                        $scope.errorActionMain = getErrorAction(alarmtxt);
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        $scope.errorTitleSub = getErrorTitle(alarmtxt);
                        $scope.errorResultSub = getErrorMessage(alarmtxt);
                        $scope.errorActionSub = getErrorAction(alarmtxt);
                    } else {
                        ;//Nothing
                    }
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                        if ($scope.currentScreen !== WASHERSCREENS.ALARMSCREEN) {
                            $scope.previousScreenError = $scope.currentScreen;
                        }
                        if (!$scope.homePage) {
                            $scope.currentScreen = WASHERSCREENS.ALARMSCREEN;
                            changeScreen();
                        }
                    }
                    return;
                } else if (alarmString.event === "Deleted") {
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        $scope.isErrorMain = false;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        $scope.isErrorSub = false;
                    } else {
                        ;//Nothing
                    }
                    if ($scope.custDialogpopup) {
                        $scope.custDialogpopup = false;
                    }
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                        if (angular.isDefined($scope.previousScreenError) && $scope.previousScreenError !== WASHERSCREENS.HOME && $scope.previousScreenError !== WASHERSCREENS.DETAILPAGE) {
                            $scope.currentScreen = $scope.previousScreenError;
                        } else if ($scope.currentScreen === WASHERSCREENS.ALARMSCREEN) {
                            $scope.currentScreen = WASHERSCREENS.DETAILPAGE;
                        } else {
                            ;//Nothing
                        }
                        changeScreen();
                    }
                } else {
                    ;//Nothing
                }
            } else {
                ;// Nothing
            }
        }
    }

    function showSmartCheck(resourcevalue) {
        resourcevalue.forEach(function (value) {
            if (value.indexOf("Diagnosis") !== -1) {
                $scope.showSmartCare = true;
            }
        });
    }

    function closeApp() {
        nativeInterface.runOnNative("closeWebApp", "");
    }

    function callCenter(callNumb) {
        sendSAData(SA_WASHER.SMART_CHECK_ERROR_PAGE.SCREEN, SA_WASHER.SMART_CHECK_ERROR_PAGE.CALL_SERVICE_CENTER, "", "");
        nativeInterface.runOnNative("callDial", alarmServicePayload($scope.dialCallNum[callNumb]));
    }

    function alarmConfirm() {
        $timeout(function () {
            $scope.closeApp();
            $scope.confirmButtonPressed = false;
        }, MATERIAL_DESIGN.BTN_ANIMATION_TIME);
    }

    function doAlarmService() {
        $scope.serviceButtonPressed = true;
        alarmService();
    }

    function alarmService() {
        $timeout(function () {
            $scope.alertState = WASHERALERT.ALARMSERVICE;
            $scope.callServiceIndex = 0;
            showcustDialog($scope.translation.WEBMOB_device_washer_comm_service_call, $scope.translation.WEBMOB_device_washer_alarm_service_call, true, true);
            changePopUpClass(true);
            $scope.serviceButtonPressed = false;
        }, MATERIAL_DESIGN.BTN_ANIMATION_TIME);
    }

    function alarmServicePayload(callNumb) {
        return '{"selectedCountry" : "' + $scope.selectedCountry + '","selectedDial" :"' + callNumb + '"}';
    }

    function updateDeviceName(deviceModelName) {
        $scope.dmName = deviceModelName.indexOf('(') > -1 ? deviceModelName.split("(")[0] : deviceModelName;
        if ($scope.dmName.indexOf("TP6X") > -1 || $scope.dmName.indexOf("DONGLE") > -1) {
            if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                $scope.descHasDongle = true;
            }
            if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                $scope.descHasDongleMain = true;
            } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                $scope.descHasDongleSub = true;
            } else {
                ;//Nothing
            }
        }
    }

    function checkIfTimeSyncVisible() {
        if ($scope.timeSyncSupported === undefined) {
            if ($scope.descHasDongle) {
                $scope.showSyncTime = false;
            } else {
                $scope.showSyncTime = true;
            }
        } else if ($scope.timeSyncSupported) {
            $scope.showSyncTime = true;
        } else {
            $scope.showSyncTime = false;
        }

        if ($scope.timeSyncSupportedMain === undefined) {
            if ($scope.descHasDongleMain) {
                $scope.showSyncTimeMain = false;
            } else {
                $scope.showSyncTimeMain = true;
            }
        } else if ($scope.timeSyncSupportedMain) {
            $scope.showSyncTimeMain = true;
        } else {
            $scope.showSyncTimeMain = false;
        }

        if ($scope.timeSyncSupportedSub === undefined) {
            if ($scope.descHasDongleSub) {
                $scope.showSyncTimeSub = false;
            } else {
                $scope.showSyncTimeSub = true;
            }
        } else if ($scope.timeSyncSupportedSub) {
            $scope.showSyncTimeSub = true;
        } else {
            $scope.showSyncTimeSub = false;
        }
    }

    function updateDeviceModel(deviceModelMode, isDualMainSubObject) {
        deviceModelMode.forEach(function (value) {
            if (value.indexOf("QuickWash_Not_Used") !== -1) {
                quickwashoff = false;
            } else if (value.indexOf("QuickWash_") !== -1) {
                var quWashOff = value.split("_")[1];
                if (quWashOff === "Off") {
                    quickwashoff = false;
                } else {
                    quickwashoff = true;
                }
                quickwashoff = true;
            } else {
                //Do Nothing
            }
            if (value.indexOf("QuickWashSet") !== -1) {
                var quWash = value.split("_")[1];
                if (quWash.length === 14) {
                    quWash = "3" + quWash;
                } else if (quWash.length === 16) {
                    quWash = "4" + quWash;
                } else {
                    //Do Nothing
                }
                CourseParseService.getCourseParsed(quWash, $scope, 1, $scope.washerToUpdate);
                showModeDefault();
            }
            if ((value.indexOf("Course_") !== -1) && (!$scope.cycFinish)) {
                quickwashoff = false;

                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.deviceMode = value.split("_")[1];
                    deviceCurrentMode = $scope.deviceMode;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.deviceModeMain = value.split("_")[1];
                    $scope.deviceCurrentModeMain = $scope.deviceModeMain;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.deviceModeSub = value.split("_")[1];
                    $scope.deviceCurrentModeSub = $scope.deviceModeSub;
                } else {
                    ;//Nothing
                }
                closeAllPopups();
                showModeDefault();
                if ($scope.deviceMode === WASHER_DEVICEMODES.NightWash) {
                    dryLevelEnabled = true;
                } else {
                    dryLevelEnabled = false;
                }
                debugMessage("The vale of mode is ::mode name is::" + $scope.deviceMode);
            }
            if (value.indexOf("DeviceType") !== -1) {
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.deviceModel = value;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.deviceModelMain = value;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.deviceModelSub = value;
                } else {
                    ;//Nothing
                }
                if (value.indexOf("DeviceType_") !== -1) {
                    deviceTypeVal = value.split("_")[1];
                    drainFilterVisibility = deviceTypeVal === "0145" ? false : true;
                }
            }
            if ((value.indexOf("SteamWash") !== -1)) {
                if (value.split("_")[1] === "Enable") {
                    steamModel = true;
                    tempSteamModel = steamModel;
                } else {
                    steamModel = false;
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                        soilDisable = false;
                        steamTempDisable = false;
                    }
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        soilDisableMain = false;
                        steamTempDisableMain = false;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        soilDisableSub = false;
                        steamTempDisableSub = false;
                    } else {
                        ;//Nothing
                    }
                }
                checkSpecialUS();
                updateOptionsGUI();
            }
            if (value.indexOf("LaundryOutTime") !== -1) {
                dismissLoadingBar(WASHER_COMMANDS.laundry);

                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.isLaundryEnabled = true;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.isLaundryEnabledMain = true;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.isLaundryEnabledSub = true;
                } else {
                    ;//Nothing
                }

                var laundryVal = value.split("_")[1];
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.laundryOpt2 = false;
                    $scope.laundryOpt3 = false;
                    $scope.laundryOpt4 = false;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.laundryOpt2Main = false;
                    $scope.laundryOpt3Main = false;
                    $scope.laundryOpt4Main = false;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.laundryOpt2Sub = false;
                    $scope.laundryOpt3Sub = false;
                    $scope.laundryOpt4Sub = false;
                } else {
                    ;//Nothing
                }

                if (laundryVal === "0") {
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                        $scope.laundrySwitch = false;
                        $scope.laundryOnOffText = $scope.translation.WEBMOB_device_washer_comm_off_CL;
                        currentLaundryVal = 0;
                    }
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        $scope.laundrySwitchMain = false;
                        $scope.laundryOnOffTextMain = $scope.translation.WEBMOB_device_washer_comm_off_CL;
                        currentLaundryValMain = 0;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        $scope.laundrySwitchSub = false;
                        $scope.laundryOnOffTextSub = $scope.translation.WEBMOB_device_washer_comm_off_CL;
                        currentLaundryValSub = 0;
                    } else {
                        ;//Nothing
                    }
                } else if (laundryVal === "30") {
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                        currentLaundryVal = 2;
                        $scope.laundryOpt2 = true;
                        $scope.laundrySwitch = true;
                    }
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        currentLaundryValMain = 2;
                        $scope.laundryOpt2Main = true;
                        $scope.laundrySwitchMain = true;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        currentLaundryValSub = 2;
                        $scope.laundryOpt2Sub = true;
                        $scope.laundrySwitchSub = true;
                    } else {
                        ;//Nothing
                    }
                } else if (laundryVal === "60") {
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                        currentLaundryVal = 3;
                        $scope.laundryOpt3 = true;
                        $scope.laundrySwitch = true;
                    }
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        currentLaundryValMain = 3;
                        $scope.laundryOpt3Main = true;
                        $scope.laundrySwitchMain = true;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        currentLaundryValSub = 3;
                        $scope.laundryOpt3Sub = true;
                        $scope.laundrySwitchSub = true;
                    } else {
                        ;//Nothing
                    }
                } else if (laundryVal === "90") {
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                        currentLaundryVal = 4;
                        $scope.laundryOpt4 = true;
                        $scope.laundrySwitch = true;
                    }
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        currentLaundryValMain = 4;
                        $scope.laundryOpt4Main = true;
                        $scope.laundrySwitchMain = true;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        currentLaundryValSub = 4;
                        $scope.laundryOpt4Sub = true;
                        $scope.laundrySwitchSub = true;
                    } else {
                        ;//Nothing
                    }
                } else {
                    ;//Nothing
                }
                if (laundryVal === "0") {
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0) && $scope.cycFinish) {
                        $scope.disableLaundry = true;
                    }
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER && $scope.cycFinishMain) {
                        $scope.disableLaundryMain = true;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER && $scope.cycFinishSub) {
                        $scope.disableLaundrySub = true;
                    } else {
                        ;//Nothing
                    }
                }

                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    tempLaundryVal = currentLaundryVal;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    tempLaundryValMain = currentLaundryVal;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    tempLaundryValSub = currentLaundryVal;
                } else {
                    ;//Nothing
                }
                updateLaundryStatusText();
                debugMessage("Device model name is::" + $scope.deviceModel);
            }
            if (value.indexOf("LaundryOut_Notice") !== -1 && isDualMainSubObject !== true) {
                var remainingLaundaryMsg = $scope.translation.WEBMOB_device_washer_alarm_remaining_laundry_msg;
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    remainingLaundaryMsg = '[' + $scope.translation.WEBMOB_device_washer_comm_front_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_remaining_laundry_msg;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    remainingLaundaryMsg = '[' + $scope.translation.WEBMOB_device_washer_comm_top_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_remaining_laundry_msg;
                } else {
                    ;//Nothing
                }
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_settings_remaining_laundry,
                    msg: remainingLaundaryMsg,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
            }
            if (value.indexOf("AddWashAlarm") !== -1) {
                $scope.isNoti = !true;
                tempNoti = $scope.isNoti;
                var alarmTitle = $scope.translation.WEBMOB_device_washer_settings_addwash_alarm;
                if (!$scope.isDualWasher && $scope.isTopLoader) {
                    alarmTitle = '';
                }
                if (value.split("_")[1] === "1" && isDualMainSubObject !== true) {
                    var startRinseMsg = $scope.translation.WEBMOB_device_washer_alarm_add_wash_start_rinse_msg;
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        startRinseMsg = '[' + $scope.translation.WEBMOB_device_washer_comm_front_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_add_wash_start_rinse_msg;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        startRinseMsg = '[' + $scope.translation.WEBMOB_device_washer_comm_top_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_add_wash_start_rinse_msg;
                    } else {
                        ;//Nothing
                    }
                    $scope.errorList.push({
                        title: alarmTitle,
                        msg: startRinseMsg,
                        btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                        btnOkHandler: function () {
                            onOkClicked(true);
                        },
                        closeDialog: !true
                    });
                    //$scope.notiMessage = $scope.translation.WEBMOB_device_washer_alarm_add_wash_start_rinse_msg;
                } else if (value.split("_")[1] === "2" && isDualMainSubObject !== true) {
                    var startLastRinseMsg = $scope.translation.WEBMOB_device_washer_alarm_add_wash_start_last_rinse_msg;
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        startLastRinseMsg = '[' + $scope.translation.WEBMOB_device_washer_comm_front_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_add_wash_start_last_rinse_msg;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        startLastRinseMsg = '[' + $scope.translation.WEBMOB_device_washer_comm_top_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_add_wash_start_last_rinse_msg;
                    } else {
                        ;//Nothing
                    }
                    $scope.errorList.push({
                        title: alarmTitle,
                        msg: startLastRinseMsg,
                        btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                        btnOkHandler: function () {
                            onOkClicked(true);
                        },
                        closeDialog: !true
                    });
//                    $scope.notiMessage = $scope.translation.WEBMOB_device_washer_alarm_add_wash_start_last_rinse_msg;
                } else if (value.split("_")[1] === "3" && isDualMainSubObject !== true) {
                    var startSpinMsg = $scope.translation.WEBMOB_device_washer_alarm_add_wash_start_spin_msg;
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        startSpinMsg = '[' + $scope.translation.WEBMOB_device_washer_comm_front_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_add_wash_start_spin_msg;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        startSpinMsg = '[' + $scope.translation.WEBMOB_device_washer_comm_top_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_add_wash_start_spin_msg;
                    } else {
                        ;//Nothing
                    }
                    $scope.errorList.push({
                        title: alarmTitle,
                        msg: startSpinMsg,
                        btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                        btnOkHandler: function () {
                            onOkClicked(true);
                        },
                        closeDialog: !true
                    });
//                    $scope.notiMessage = $scope.translation.WEBMOB_device_washer_alarm_add_wash_start_spin_msg;
                } else {
                    ;//Do Nothing
                }
                if (isDualMainSubObject !== true) {
                    changePopUpClass(true);
                }
            }
            if (value.indexOf("AddWashSet_") !== -1) {
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.addWash = true;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.addWashMain = true;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.addWashSub = true;
                } else {
                    ;//Nothing
                }
                $scope.currentAddWashValue = parseInt(value.slice(-1), 10);
                $scope.tempAddWashValue = $scope.currentAddWashValue;
                if ($scope.currentAddWashValue !== 0) {
                    $scope.addWashSwitch = true;
                    $scope.addWashOnOFf = $scope.translation.WEBMOB_device_washer_comm_on_CL;
                } else {
                    $scope.addWashSwitch = false;
                    $scope.addWashOnOFf = $scope.translation.WEBMOB_device_washer_comm_off_CL;
                }
                debugMessage("currentAddWashValue: " + $scope.currentAddWashValue);
                dismissLoadingBar(WASHER_COMMANDS.ADD_WASH);
                decodeAddWashValue($scope.currentAddWashValue, 0);
            }

            if (value.indexOf("UsagesDB_ok") !== -1) {
                // get DB request
                if ($scope.isCallFromEnergyReset && isCallFromReset === 1 && $scope.currentScreen === WASHERSCREENS.ENERGYMONITOR) {
                    isCallFromReset = 2;
                    $scope.isCallFromEnergyReset = false;
                }
                $scope.isDBDownloaded = false;
                fetchDBfromDevice();
            }
            if (value.indexOf("AddWashIndicator_") !== -1) {
                if (value.split("_")[1] === "Off") {
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                        $scope.addWashIndicator = false;
                    }
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        $scope.addWashIndicatorMain = false;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        $scope.addWashIndicatorSub = false;
                    } else {
                        ;//Nothing
                    }
                } else {
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                        $scope.addWashIndicator = true;
                    }
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        $scope.addWashIndicatorMain = true;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        $scope.addWashIndicatorSub = true;
                    } else {
                        ;//Nothing
                    }
                }


                if ($scope.isDualWasher && $scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
                    $scope.addWashIndicator = $scope.addWashIndicatorMain;
                } else if ($scope.isDualWasher && $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                    $scope.addWashIndicator = $scope.addWashIndicatorSub;
                } else {
                    ;//Nothing
                }
            }
            if (value.indexOf("AddGarmentIndicator_") !== -1) {
                if (value.split("_")[1] === "Off") {
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                        $scope.addGarmentIndicator = false;
                    }
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        $scope.addGarmentIndicatorMain = false;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        $scope.addGarmentIndicatorSub = false;
                    } else {
                        ;//Nothing
                    }
                } else {
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                        $scope.addGarmentIndicator = true;
                    }
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        $scope.addGarmentIndicatorMain = true;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        $scope.addGarmentIndicatorSub = true;
                    } else {
                        ;//Nothing
                    }
                }

                if ($scope.isDualWasher && $scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
                    $scope.addGarmentIndicator = $scope.addGarmentIndicatorMain;
                } else if ($scope.isDualWasher && $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                    $scope.addGarmentIndicator = $scope.addGarmentIndicatorSub;
                } else {
                    ;//Nothing
                }
            }

            if (value.indexOf("EnergyLevelSet_") !== -1) {
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.showEnergyLevelSet = true;
                    updateEnergyLevelSet(value.split('_')[1], WASHERTOUPDATE.SINGLEWASHER);
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.showEnergyLevelSetMain = true;
                    updateEnergyLevelSet(value.split('_')[1], WASHERTOUPDATE.MAINWASHER);
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.showEnergyLevelSetSub = true;
                    updateEnergyLevelSet(value.split('_')[1], WASHERTOUPDATE.SUBWASHER);
                } else {
                    ;//Nothing
                }
            }

            if (value.indexOf("SeamlessControl") !== -1) {
                dismissLoadingBar(WASHER_COMMANDS.SAEMLESS_CONTROL);
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.showSeamLessControl = true;
                    if (value.split("_")[1] === "Enable") {
                        $scope.seamLessControlValue = true;
                    } else {
                        $scope.seamLessControlValue = false;
                        if ($scope.cycFinish && !$scope.isDualWasher) {
                            callGetDevice();
                            return;
                        }
                    }
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.showSeamLessControlMain = true;
                    if (value.split("_")[1] === "Enable") {
                        $scope.seamLessControlValueMain = true;
                    } else {
                        $scope.seamLessControlValueMain = false;
                        if ($scope.cycFinishMain && !isDualMainSubObject) {
                            callGetDevice();
                            return;
                        }
                    }
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.showSeamLessControlSub = true;
                    if (value.split("_")[1] === "Enable") {
                        $scope.seamLessControlValueSub = true;
                    } else {
                        $scope.seamLessControlValueSub = false;
                        if ($scope.cycFinishSub && !isDualMainSubObject) {
                            callGetDevice();
                            return;
                        }
                    }
                } else {
                    ;//Nothing
                }
            }

            if (value.indexOf("KidsLockBypass") !== -1) {
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.kidsLockByPass = true;
                    $scope.kidsLock = false;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.kidsLockByPassMain = true;
                    $scope.kidsLockSub = false;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.kidsLockByPassSub = true;
                    $scope.kidsLockSub = false;
                } else {
                    ;//Nothing
                }
            }

            if (value.indexOf("FreezeProtectionAlarm") !== -1 || value.indexOf("SetFreezeProtection") !== -1) {
                if (value.indexOf("SetFreezeProtection") !== -1) {
                    $scope.setFreezeProtectionCommandComing = true;
                } else {
                    $scope.setFreezeProtectionCommandComing = false;
                }
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.showFreezeProtectionAlarm = true;
                    if (value.split("_")[1] === "On") {
                        $scope.freezeProtectionAlarmValue = true;
                        $scope.freezeProtectionAlarmOnOFf = $scope.translation.WEBMOB_device_washer_comm_on_CL;
                    } else {
                        $scope.freezeProtectionAlarmValue = false;
                        $scope.freezeProtectionAlarmOnOFf = $scope.translation.WEBMOB_device_washer_comm_off_CL;
                    }

                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.showFreezeProtectionAlarmMain = true;
                    if (value.split("_")[1] === "On") {
                        $scope.freezeProtectionAlarmValueMain = true;
                    } else {
                        $scope.freezeProtectionAlarmValueMain = false;
                    }
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.showFreezeProtectionAlarmSub = true;
                    if (value.split("_")[1] === "On") {
                        $scope.freezeProtectionAlarmValueSub = true;
                    } else {
                        $scope.freezeProtectionAlarmValueSub = false;
                    }
                } else {
                    ;//Nothing
                }
                dismissLoadingBar(WASHER_COMMANDS.FREEZE_PROTECTION_ALARM);
            }
            if (value.indexOf("WashingTimes_") !== -1) {
                var time = value.split("_")[1];
                //time = 15;    // for demo
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.washingTimes = time;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.washingTimesMain = time;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.washingTimesSub = time;
                } else {
                    ;//Nothing
                }
            }
            if (value.indexOf("DrumCleanProposal_") !== -1) {
                var time = value.split("_")[1];
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.drumCleanProposal = time;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.drumCleanProposalMain = time;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.drumCleanProposalSub = time;
                } else {
                    ;//Nothing
                }
            }
            if (value.indexOf("DrumCleanLog_") !== -1) {
                var log = value.split("g_")[1];
                //log = '2016-12-16T14:17:44_000|2016-12-16T14:19:28_000';  // for demo
                if (log !== "Empty") {
                    log = log.split("|");
                    log = log.slice().reverse();
                    for (var i = 0, size = log.length; i < size; i++) {
                        var splitDate = log[i].split("_")[0];
                        if (splitDate.toUpperCase().indexOf('Z') === -1) {//Add Z to UTC date string if missing
                            splitDate += 'Z';
                        }
                        log[i] = new Date(splitDate);
                    }

                }
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.drumCleanLog = log;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.drumCleanLogMain = log;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.drumCleanLogSub = log;
                } else {
                    ;//Nothing
                }
            }

            if (value.indexOf("TimeSync_") !== -1) {
                if (value.indexOf("TimeSync_Supported") !== -1) {
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                        $scope.timeSyncSupported = true;
                    }
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        $scope.timeSyncSupportedMain = true;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        $scope.timeSyncSupportedSub = true;
                    } else {
                        ;//Nothing
                    }
                }
                if (value.indexOf("TimeSync_NotSupported") !== -1) {
                    if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                        $scope.timeSyncSupported = false;
                    }
                    if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                        $scope.timeSyncSupportedMain = false;
                    } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                        $scope.timeSyncSupportedSub = false;
                    } else {
                        ;//Nothing
                    }
                }
            }

            //log = '2016-12-16T14:17:44_000|2016-12-16T14:19:28_000';  // for demo
            if ($scope.getDeviceInProgress && value.indexOf("EnergyKW_396") !== -1 && $scope.itiscombo) {
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.NoEnergyKW_396 = false;
                    for (var i = 0; i < $scope.Device.CourseData.length; i++) {
                        if ($scope.currentWasherSelected !== WASHERCURRENTSEL.SUB_SELECTED) {   //dryComboLevel not supported for Upper Washer
                            $scope.Device.CourseData[i].isDryComboEnabled = true;
                            $scope.isDryComboLevel = true;
                        }
                    }
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.NoEnergyKW_396Main = false;
                    for (var i = 0; i < $scope.mainWasherData.CourseData.length; i++) {
                        $scope.mainWasherData.CourseData[i].isDryComboEnabled = true;
                        $scope.isDryComboLevelMain = true;
                    }

                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.NoEnergyKW_396Sub = false;
                    for (var i = 0; i < $scope.subWasherData.CourseData.length; i++) {
                        if ($scope.currentWasherSelected !== WASHERCURRENTSEL.SUB_SELECTED) {   //dryComboLevel not supported for Upper Washer
                            $scope.subWasherData.CourseData[i].isDryComboEnabled = true;
                            $scope.isDryComboLevelSub = true;
                        }
                    }
                } else {
                    ;//Nothing
                }

            }
            if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0) && $scope.NoEnergyKW_396 !== false) {
                for (var i = 0; i < $scope.Device.CourseData.length; i++) {
                    $scope.Device.CourseData[i].isDryComboEnabled = false;
                    $scope.isDryComboLevel = false;
                }
            }
            if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER && $scope.NoEnergyKW_396Main !== false) {
                for (var i = 0; i < $scope.mainWasherData.CourseData.length; i++) {
                    $scope.mainWasherData.CourseData[i].isDryComboEnabled = false;
                    $scope.isDryComboLevelMain = false;
                }

            } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER && $scope.NoEnergyKW_396Sub !== false) {
                for (var i = 0; i < $scope.subWasherData.CourseData.length; i++) {
                    $scope.subWasherData.CourseData[i].isDryComboEnabled = false;
                    $scope.isDryComboLevelSub = false;
                }
            } else {
                ;//Nothing
            }
            
            if (value.indexOf("BubbleSoakSet") !== -1) {
                updateBubbleSoakSet(value.split("_")[1]);
            }
            
            if (value.indexOf("BubbleSoak") !== -1) {
                $scope.bubbleSoakValue = value.split("_")[1] === "On" ? true : false;
            }

        });
    }

    function updateMostUsed(deviceModelMode) {
        deviceModelMode.forEach(function (value) {
            if (value.indexOf("MostUsed_") !== -1) {
                $scope.mostUsed = value.split("_")[1].slice(0,2);
                debugMessage("mostUsed value is::" + $scope.mostUsed);
            }
        });
    }
    
    function updateMostUsedMain(deviceModelMode) {
        deviceModelMode.forEach(function (value) {
            if (value.indexOf("MostUsed_") !== -1) {
                $scope.mostUsedMain = value.split("_")[1].slice(0,2);
                debugMessage("mostUsedMain value is::" + $scope.mostUsedMain);
            }
        });
    }
    
    function updateMostUsedSub(deviceModelMode) {
        deviceModelMode.forEach(function (value) {
            if (value.indexOf("MostUsed_") !== -1) {
                $scope.mostUsedSub = value.split("_")[1].slice(0,2);
                debugMessage("mostUsedSub value is::" + $scope.mostUsedSub);
            }
        });
    }
    
    function parseCourseOptions(courseData, isDualMainSubObject) {
        var tempModeArray = [];
        document.getElementById("cPopup").style.zIndex = 999;
        document.getElementById("cPopup1").style.zIndex = 999;
//        if (angular.isDefined($scope.mostUsed)) {
//            courseData = courseData + $scope.mostUsed;
//        }
        if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
            $scope.Device['CourseData'] = [];
        }
        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
            $scope.mainWasherData['CourseData'] = [];
        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
            $scope.subWasherData['CourseData'] = [];
        } else {
            ;//Nothing
        }

        CourseParseService.getCourseParsed(courseData, $scope, 0, $scope.washerToUpdate);
        debugMessage($scope.Device['CourseData']);

        if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
            if (isDualMainSubObject) {
                tempModeArray = [];
                tempModeArray = jQuery.extend(true, {}, $scope.listItemsModes);
            }
            $scope.listItemsModes = $scope.Device['CourseData'];
            if (isDualMainSubObject) {
                for (var i = 0; i < $scope.listItemsModes.length; i++) {
                    if (angular.isDefined(tempModeArray[i].energyLevelValue)) {
                        $scope.listItemsModes[i].energyLevelValue = tempModeArray[i].energyLevelValue;
                    }
                    if (angular.isDefined(tempModeArray[i].LevelValue)) {
                        $scope.listItemsModes[i].LevelValue = tempModeArray[i].LevelValue;
                    }
                }
            }
            if (angular.isDefined($scope.mostUsed)) {
                for (var i = 0; i < $scope.listItemsModes.length; i++) {
                    if ($scope.listItemsModes[i].courseNameHex === $scope.mostUsed) {
                        $scope.mostUsedItem = $scope.listItemsModes[i];
                        $scope.mostUsedItemIndex = i;
                        mostUsedCourseName = $scope.mostUsedItem.CourseEnum;
                        $scope.listItemsModes.splice(i, 1);
                        $scope.listItemsModes.unshift($scope.mostUsedItem);
                        debugMessage($scope.listItemsModes);
                        break;
                    }
                }
            }
            if (!(angular.isDefined($scope.Device["Washer"].autoDetergentEnabled) || angular.isDefined($scope.Device["Washer"].autoSoftenerEnabled))) {
                $scope.isDetergentEnabled = false;
                $scope.isSoftnerEnabled = false;
            }
            if ($scope.cycFinish && !isDualMainSubObject) {
                $scope.cycFinish = false; //for fixing issue WM_0600092036        
                //$scope.cycFinish = false; //for fixing issue WM_0600091930
            }
            var timeVal = JSON.parse(getLocalStorageData('WASHERsyncTime1'));
            $scope.syncTime = timeVal;
        }
        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
            if (isDualMainSubObject) {
                tempModeArray = [];
                tempModeArray = jQuery.extend(true, {}, $scope.listItemsModesMain);
            }
            $scope.listItemsModesMain = $scope.mainWasherData['CourseData'];
            if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
                $scope.listItemsModes = $scope.mainWasherData['CourseData'];
            }
            if (isDualMainSubObject) {
                for (var i = 0; i < $scope.listItemsModesMain.length; i++) {
                    if (angular.isDefined(tempModeArray[i].energyLevelValue)) {
                        $scope.listItemsModesMain[i].energyLevelValue = tempModeArray[i].energyLevelValue;
                    }
                    if (angular.isDefined(tempModeArray[i].LevelValue)) {
                        $scope.listItemsModesMain[i].LevelValue = tempModeArray[i].LevelValue;
                    }
                }
            }
            if (angular.isDefined($scope.mostUsed)) {
                $scope.mostUsedItemMain = $scope.listItemsModesMain.pop();
                mostUsedCourseName = $scope.mostUsedItemMain.CourseEnum;
                $scope.listItemsModesMain.unshift($scope.mostUsedItemMain);
                debugMessage($scope.listItemsModesMain);
            }
            if (!(angular.isDefined($scope.Device["Washer"].autoDetergentEnabled) || angular.isDefined($scope.Device["Washer"].autoSoftenerEnabled))) {
                $scope.isDetergentEnabledMain = false;
                $scope.isSoftnerEnabledMain = false;
            }
            if ($scope.cycFinishMain && !isDualMainSubObject) {
                $scope.cycFinishMain = false;
            }
            var timeValMain = JSON.parse(getLocalStorageData('WASHERsyncTime1'));
            $scope.syncTimeMain = timeValMain;
        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
            if (isDualMainSubObject) {
                tempModeArray = [];
                tempModeArray = jQuery.extend(true, {}, $scope.listItemsModesSub);
            }
            $scope.listItemsModesSub = $scope.subWasherData['CourseData'];
            if ($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                $scope.listItemsModes = $scope.subWasherData['CourseData'];
            }
            if (isDualMainSubObject) {
                for (var i = 0; i < $scope.listItemsModesSub.length; i++) {
                    if (angular.isDefined(tempModeArray[i].energyLevelValue)) {
                        $scope.listItemsModesSub[i].energyLevelValue = tempModeArray[i].energyLevelValue;
                    }
                    if (angular.isDefined(tempModeArray[i].LevelValue)) {
                        $scope.listItemsModesSub[i].LevelValue = tempModeArray[i].LevelValue;
                    }
                }
            }
            if (angular.isDefined($scope.mostUsed)) {
                $scope.mostUsedItemSub = $scope.listItemsModesSub.pop();
                mostUsedCourseName = $scope.mostUsedItemSub.CourseEnum;
                $scope.listItemsModesSub.unshift($scope.mostUsedItemSub);
                debugMessage($scope.listItemsModesSub);
            }
            if (!(angular.isDefined($scope.Device["Washer"].autoDetergentEnabled) || angular.isDefined($scope.Device["Washer"].autoSoftenerEnabled))) {
                $scope.isDetergentEnabledSub = false;
                $scope.isSoftnerEnabledSub = false;
            }
            if ($scope.cycFinishSub && !isDualMainSubObject) {
                $scope.cycFinishSub = false;
            }
            var timeValSub = JSON.parse(getLocalStorageData('WASHERsyncTime1'));
            $scope.syncTimeSub = timeValSub;
        } else {
            ;//Nothing
        }
    }

    function getLocalStorageData(item) {
        if (typeof (Storage) !== "undefined") {
            var locVal = localStorage.getItem(item);
            if (locVal === null) {
                setLocalStorageData('WASHERsyncTime1', JSON.stringify(true));
                return true;
            }
            return locVal;
        }
    }

    function getLocalStorageForFirstLaunch(item) {
        if (typeof (Storage) !== "undefined") {
            //localStorage.clear();
            var locVal = localStorage.getItem(item);
            if (locVal === null) {
                return false;
            }
            return locVal;
        }
    }

    function showModeDefault() {
        if ($scope.deviceMode !== undefined) {
            var index = 0;
            var listModes = $scope.listItemsModes;
            var listModesMain = $scope.listItemsModesMain;
            var listModesSub = $scope.listItemsModesSub;
            if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                for (index = 0; index < listModes.length; index++) {
                    if (listModes[index].courseNameHex == deviceCurrentMode.toUpperCase()) {
                        break;
                    }
                }
                debugMessage("The value of mode is 1:::" + index);
                if (index !== listModes.length) {
                    if ($scope.quickWashcode === undefined) {
                        quickwashoff = false;
                    }
                    if (quickwashoff) {
                        updateLandingpage($scope.quickWashcode);
                    } else {
                        updateLandingpage(listModes[index]);
                    }
                }
            }

            if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                listModesMain = $scope.listItemsModesMain;
                for (index = 0; index < listModesMain.length; index++) {
                    if (listModesMain[index].courseNameHex == $scope.deviceCurrentModeMain.toUpperCase()) {
                        break;
                    }
                }
                debugMessage("The value of mode is 2 :::" + index);
                if (index !== listModesMain.length) {
                    if ($scope.quickWashcodeMain === undefined) {
                        quickwashoff = false;
                    }
                    if (quickwashoff) {
                        updateLandingpage($scope.quickWashcodeMain);
                    } else {
                        updateLandingpage(listModesMain[index]);
                    }
                }
                
            } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                listModesSub = $scope.listItemsModesSub;
                for (index = 0; index < listModesSub.length; index++) {
                    if (listModesSub[index].courseNameHex == $scope.deviceCurrentModeSub.toUpperCase()) {
                        break;
                    }
                }
                debugMessage("The value of mode is 3 :::" + index);
                if (index !== listModesSub.length) {
                    if ($scope.quickWashcodeSub === undefined) {
                        quickwashoff = false;
                    }
                    if (quickwashoff) {
                        updateLandingpage($scope.quickWashcodeSub);
                    } else {
                        updateLandingpage(listModesSub[index]);
                    }
                }      
            } else {
                ;//Nothing
            }

            debugMessage("The value of mode is:::" + index);
            //$scope.currentMode = index;
        } else {
            selectIndex(listModes[0], -1);
        }
    }

    function updateSettingsNotification(settingNotifications) {
        if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
            if (angular.isDefined(settingNotifications.autoDetergentEnabled)) {
                $scope.isDetergentEnabled = true;
                $scope.detergent = settingNotifications.autoDetergentEnabled.indexOf("On") !== -1 ? true : false;
                dismissLoadingBar(WASHER_COMMANDS.autoDetergent);
            }
            if (angular.isDefined(settingNotifications.autoSoftenerEnabled)) {
                $scope.isSoftnerEnabled = true;
                $scope.softner = settingNotifications.autoSoftenerEnabled.indexOf("On") !== -1 ? true : false;
                dismissLoadingBar(WASHER_COMMANDS.autosoftener);
            }
        }
        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
            if (angular.isDefined(settingNotifications.autoDetergentEnabled)) {
                $scope.isDetergentEnabledMain = true;
                $scope.detergentMain = settingNotifications.autoDetergentEnabled.indexOf("On") !== -1 ? true : false;
                dismissLoadingBar(WASHER_COMMANDS.autoDetergent);
            }
            if (angular.isDefined(settingNotifications.autoSoftenerEnabled)) {
                $scope.isSoftnerEnabledMain = true;
                $scope.softnerMain = settingNotifications.autoSoftenerEnabled.indexOf("On") !== -1 ? true : false;
                dismissLoadingBar(WASHER_COMMANDS.autosoftener);
            }
        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
            if (angular.isDefined(settingNotifications.autoDetergentEnabled)) {
                $scope.isDetergentEnabledSub = true;
                $scope.detergentSub = settingNotifications.autoDetergentEnabled.indexOf("On") !== -1 ? true : false;
                dismissLoadingBar(WASHER_COMMANDS.autoDetergent);
            }
            if (angular.isDefined(settingNotifications.autoSoftenerEnabled)) {
                $scope.isSoftnerEnabledSub = true;
                $scope.softnerSub = settingNotifications.autoSoftenerEnabled.indexOf("On") !== -1 ? true : false;
                dismissLoadingBar(WASHER_COMMANDS.autosoftener);
            }
        } else {
            ;//Nothing
        }

    }

    function parseDefaultOptionValues(defaultSetValues) {
        if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
            if ($scope.spinOnly && ((Object.keys(defaultSetValues).length === 1 && !angular.isDefined(defaultSetValues.spinLevel))
                    || Object.keys(defaultSetValues).length !== 1)) {
                $scope.spinOnly = false;
                $scope.disabletempContents = false;
                $scope.disablesoilContents = false;
                tempDisable = false;
                soilDisable = false;
            }
            updateSettingsNotification(defaultSetValues);
            if (angular.isDefined(defaultSetValues.supportedWaterTemperature)) {
                $scope.listItemsTemp = defaultSetValues.supportedWaterTemperature.slice();
                $scope.listItemsTemp.reverse();
                $scope.listItemsTemp.pop();
            }
            if (angular.isDefined(defaultSetValues.supportedSpinLevel)) {
                $scope.listItemsSpin = defaultSetValues.supportedSpinLevel.slice();
                $scope.listItemsSpin.reverse();
            }
            if (angular.isDefined(defaultSetValues.supportedSoilLevel)) {
                $scope.listItemsSoilLevel = defaultSetValues.supportedSoilLevel.slice();
                $scope.listItemsSoilLevel.reverse();
                $scope.listItemsSoilLevel.pop();
            }
            if (angular.isDefined(defaultSetValues.supportedRinseCycles)) {
                $scope.listItemsRinse = defaultSetValues.supportedRinseCycles.slice();
                $scope.listItemsRinse.reverse();
            }
            if (angular.isDefined(defaultSetValues.supportedDryLevel)) {
                $scope.listItemsDryLevel = defaultSetValues.supportedDryLevel.slice();
                $scope.listItemsDryLevel.reverse();
            }

            if (angular.isDefined(defaultSetValues.waterTemperature)) {
                $scope.setTemp = defaultSetValues.waterTemperature;
                deviceTemp = $scope.setTemp;
            }
            if (angular.isDefined(defaultSetValues.spinLevel)) {
                $scope.setSpin = defaultSetValues.spinLevel;
                $scope.deviceSpin = $scope.setSpin;
            }
            if (angular.isDefined(defaultSetValues.soilLevel)) {
                $scope.setSoil = defaultSetValues.soilLevel;
                deviceSoil = $scope.setSoil;
            }
            if (angular.isDefined(defaultSetValues.rinseCycles)) {
                $scope.setRinse = defaultSetValues.rinseCycles;
                deviceRinse = $scope.setRinse;
            }
            if (angular.isDefined(defaultSetValues.dryLevel)) {
                $scope.setDryComboLevel = defaultSetValues.dryLevel;
                deviceTempDryComboLevel = $scope.setDryComboLevel;
                if ($scope.currentScreen === WASHERSCREENS.KOREANCOMBOSETTINGPAGE)
                    updatekoreanComboOptions();
                if (($scope.setDryComboLevel !== "None") && (!($scope.deviceMode === "39" || $scope.deviceMode === "2E"))) {
                    dryLevelEnabled = true;
                } else {
                    dryLevelEnabled = false;
                }
            }
            if (angular.isDefined(defaultSetValues.detergentLevel)) {
                $scope.detergentlevel = defaultSetValues.detergentLevel;
            }
            if (angular.isDefined(defaultSetValues.softenerLevel)) {
                $scope.softnerlevel = defaultSetValues.softenerLevel;
            }
            if ((angular.isDefined(defaultSetValues.detergentLevel) || angular.isDefined(defaultSetValues.softenerLevel)) && $scope.deviceStatus === "Run" && !$scope.appAlive) {
                updateDetergentSoftner();
            }
            if (angular.isDefined(defaultSetValues.autoDetergentEnabled) && defaultSetValues.autoDetergentEnabled === "Not_Used") {
                $scope.detergentNotUsed = true;
                updateSettingsDisable();
            }
            if (angular.isDefined(defaultSetValues.autoDetergentEnabled) && ((defaultSetValues.autoDetergentEnabled === "On") || (defaultSetValues.autoDetergentEnabled === "Off"))) {
                $scope.disabledetergentOn = false;
                $scope.disabledetergentOff = false;
                $scope.detergentNotUsed = false;
            }
            if (angular.isDefined(defaultSetValues.autoSoftenerEnabled) && defaultSetValues.autoSoftenerEnabled === "Not_Used") {
                $scope.softenerNotUsed = true;
                updateSettingsDisable();
            }
            if (angular.isDefined(defaultSetValues.autoSoftenerEnabled) && ((defaultSetValues.autoSoftenerEnabled === "On") || (defaultSetValues.autoSoftenerEnabled === "Off"))) {
                $scope.disablesoftnerOn = false;
                $scope.disablesoftnerOff = false;
                $scope.softenerNotUsed = false;
            }
        }
        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
            if ($scope.spinOnlyMain && ((Object.keys(defaultSetValues).length === 1 && !angular.isDefined(defaultSetValues.spinLevel))
                    || Object.keys(defaultSetValues).length !== 1)) {
                $scope.spinOnlyMain = false;
                $scope.disabletempContentsMain = false;
                $scope.disablesoilContentsMain = false;
                tempDisableMain = false;
                soilDisableMain = false;
            }
            if ($scope.washOnlyMain && ((Object.keys(defaultSetValues).length === 1 && !angular.isDefined(defaultSetValues.spinLevel))
                    || Object.keys(defaultSetValues).length !== 1)) {
                $scope.washOnlyMain = false;
                $scope.disabletempContentsMain = false;
                $scope.disablesoilContentsMain = false;
                tempDisableMain = false;
                soilDisableMain = false;
            }
            updateSettingsNotification(defaultSetValues);
            if (angular.isDefined(defaultSetValues.supportedWaterTemperature)) {
                $scope.listItemsTempMain = defaultSetValues.supportedWaterTemperature.slice();
                $scope.listItemsTempMain.reverse();
                $scope.listItemsTempMain.pop();
            }
            if (angular.isDefined(defaultSetValues.supportedSpinLevel)) {
                $scope.listItemsSpinMain = defaultSetValues.supportedSpinLevel.slice();
                $scope.listItemsSpinMain.reverse();
            }
            if (angular.isDefined(defaultSetValues.supportedSoilLevel)) {
                $scope.listItemsSoilLevelMain = defaultSetValues.supportedSoilLevel.slice();
                $scope.listItemsSoilLevelMain.reverse();
                $scope.listItemsSoilLevelMain.pop();
            }
            if (angular.isDefined(defaultSetValues.supportedRinseCycles)) {
                $scope.listItemsRinseMain = defaultSetValues.supportedRinseCycles.slice();
                $scope.listItemsRinseMain.reverse();
            }
            if (angular.isDefined(defaultSetValues.supportedDryLevel)) {
                $scope.listItemsDryLevelMain = defaultSetValues.supportedDryLevel.slice();
                $scope.listItemsDryLevelMain.reverse();
            }

            if (angular.isDefined(defaultSetValues.waterTemperature)) {
                $scope.setTempMain = defaultSetValues.waterTemperature;
                deviceTempMain = $scope.setTempMain;
            }
            if (angular.isDefined(defaultSetValues.spinLevel)) {
                $scope.setSpinMain = defaultSetValues.spinLevel;
                $scope.deviceSpinMain = $scope.setSpinMain;
            }
            if (angular.isDefined(defaultSetValues.soilLevel)) {
                $scope.setSoilMain = defaultSetValues.soilLevel;
                deviceSoilMain = $scope.setSoilMain;
            }
            if (angular.isDefined(defaultSetValues.rinseCycles)) {
                $scope.setRinseMain = defaultSetValues.rinseCycles;
                deviceRinseMain = $scope.setRinseMain;
            }
            if (angular.isDefined(defaultSetValues.dryLevel)) {
                $scope.setDryComboLevelMain = defaultSetValues.dryLevel;
                deviceTempDryComboLevelMain = $scope.setDryComboLevelMain;
                if (($scope.setDryComboLevelMain !== "None") && (!($scope.deviceModeMain === "39" || $scope.deviceModeMain === "2E"))) {
                    dryLevelEnabled = true;
                } else {
                    dryLevelEnabled = false;
                }
            }
            if (angular.isDefined(defaultSetValues.detergentLevel)) {
                $scope.detergentlevelMain = defaultSetValues.detergentLevel;
            }
            if (angular.isDefined(defaultSetValues.softenerLevel)) {
                $scope.softnerlevelMain = defaultSetValues.softenerLevel;
            }
            if ((angular.isDefined(defaultSetValues.detergentLevel) || angular.isDefined(defaultSetValues.softenerLevel)) && $scope.deviceStatusMain === "Run" && !$scope.appAlive) {
                updateDetergentSoftner();
            }
            if (angular.isDefined(defaultSetValues.autoDetergentEnabled) && defaultSetValues.autoDetergentEnabled === "Not_Used") {
                $scope.detergentNotUsedMain = true;
                updateSettingsDisable();
            }
            if (angular.isDefined(defaultSetValues.autoDetergentEnabled) && ((defaultSetValues.autoDetergentEnabled === "On") || (defaultSetValues.autoDetergentEnabled === "Off"))) {
                $scope.disabledetergentOnMain = false;
                $scope.disabledetergentOffMain = false;
                $scope.detergentNotUsedMain = false;
            }
            if (angular.isDefined(defaultSetValues.autoSoftenerEnabled) && defaultSetValues.autoSoftenerEnabled === "Not_Used") {
                $scope.softenerNotUsedMain = true;
                updateSettingsDisable();
            }
            if (angular.isDefined(defaultSetValues.autoSoftenerEnabled) && ((defaultSetValues.autoSoftenerEnabled === "On") || (defaultSetValues.autoSoftenerEnabled === "Off"))) {
                $scope.disablesoftnerOnMain = false;
                $scope.disablesoftnerOffMain = false;
                $scope.softenerNotUsedMain = false;
            }
        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
            if ($scope.spinOnlySub && ((Object.keys(defaultSetValues).length === 1 && !angular.isDefined(defaultSetValues.spinLevel))
                    || Object.keys(defaultSetValues).length !== 1)) {
                $scope.spinOnlySub = false;
                $scope.disabletempContentsSub = false;
                $scope.disablesoilContentsSub = false;
                tempDisableSub = false;
                soilDisableSub = false;
            }
            if ($scope.washOnlyMain && ((Object.keys(defaultSetValues).length === 1 && !angular.isDefined(defaultSetValues.spinLevel))
                    || Object.keys(defaultSetValues).length !== 1)) {
                $scope.washOnlyMain = false;
                $scope.disabletempContentsMain = false;
                $scope.disablesoilContentsMain = false;
                tempDisableSub = false;
                soilDisableSub = false;
            }
            updateSettingsNotification(defaultSetValues);
            if (angular.isDefined(defaultSetValues.supportedWaterTemperature)) {
                $scope.listItemsTempSub = defaultSetValues.supportedWaterTemperature.slice();
                $scope.listItemsTempSub.reverse();
                $scope.listItemsTempSub.pop();
            }
            if (angular.isDefined(defaultSetValues.supportedSpinLevel)) {
                $scope.listItemsSpinSub = defaultSetValues.supportedSpinLevel.slice();
                $scope.listItemsSpinSub.reverse();
            }
            if (angular.isDefined(defaultSetValues.supportedSoilLevel)) {
                $scope.listItemsSoilLevelSub = defaultSetValues.supportedSoilLevel.slice();
                $scope.listItemsSoilLevelSub.reverse();
                $scope.listItemsSoilLevelSub.pop();
            }
            if (angular.isDefined(defaultSetValues.supportedRinseCycles)) {
                $scope.listItemsRinseSub = defaultSetValues.supportedRinseCycles.slice();
                $scope.listItemsRinseSub.reverse();
            }
            if (angular.isDefined(defaultSetValues.supportedDryLevel)) {
                $scope.listItemsDryLevelSub = defaultSetValues.supportedDryLevel.slice();
                $scope.listItemsDryLevelSub.reverse();
            }

            if (angular.isDefined(defaultSetValues.waterTemperature)) {
                $scope.setTempSub = defaultSetValues.waterTemperature;
                deviceTempSub = $scope.setTempSub;
            }
            if (angular.isDefined(defaultSetValues.spinLevel)) {
                $scope.setSpinSub = defaultSetValues.spinLevel;
                $scope.deviceSpinSub = $scope.setSpinSub;
            }
            if (angular.isDefined(defaultSetValues.soilLevel)) {
                $scope.setSoilSub = defaultSetValues.soilLevel;
                deviceSoilSub = $scope.setSoilSub;
            }
            if (angular.isDefined(defaultSetValues.rinseCycles)) {
                $scope.setRinseSub = defaultSetValues.rinseCycles;
                deviceRinseSub = $scope.setRinseSub;
            }
            if (angular.isDefined(defaultSetValues.dryLevel)) {
                $scope.setDryComboLevelSub = defaultSetValues.dryLevel;
                deviceTempDryComboLevelSub = $scope.setDryComboLevelSub;
                if (($scope.setDryComboLevelSub !== "None") && (!($scope.deviceModeSub === "39" || $scope.deviceModeSub === "2E"))) {
                    dryLevelEnabled = true;
                } else {
                    dryLevelEnabled = false;
                }
            }
            if (angular.isDefined(defaultSetValues.detergentLevel)) {
                $scope.detergentlevelSub = defaultSetValues.detergentLevel;
            }
            if (angular.isDefined(defaultSetValues.softenerLevel)) {
                $scope.softnerlevelSub = defaultSetValues.softenerLevel;
            }
            if ((angular.isDefined(defaultSetValues.detergentLevel) || angular.isDefined(defaultSetValues.softenerLevel)) && $scope.deviceStatusSub === "Run" && !$scope.appAlive) {
                updateDetergentSoftner();
            }
            if (angular.isDefined(defaultSetValues.autoDetergentEnabled) && defaultSetValues.autoDetergentEnabled === "Not_Used") {
                $scope.detergentNotUsedSub = true;
                updateSettingsDisable();
            }
            if (angular.isDefined(defaultSetValues.autoDetergentEnabled) && ((defaultSetValues.autoDetergentEnabled === "On") || (defaultSetValues.autoDetergentEnabled === "Off"))) {
                $scope.disabledetergentOnSub = false;
                $scope.disabledetergentOffSub = false;
                $scope.detergentNotUsedSub = false;
            }
            if (angular.isDefined(defaultSetValues.autoSoftenerEnabled) && defaultSetValues.autoSoftenerEnabled === "Not_Used") {
                $scope.softenerNotUsedSub = true;
                updateSettingsDisable();
            }
            if (angular.isDefined(defaultSetValues.autoSoftenerEnabled) && ((defaultSetValues.autoSoftenerEnabled === "On") || (defaultSetValues.autoSoftenerEnabled === "Off"))) {
                $scope.disablesoftnerOnSub = false;
                $scope.disablesoftnerOffSub = false;
                $scope.softenerNotUsedSub = false;
            }
        } else {
            ;//Nothing
        }
        showModeDefault();
        checkSpecialEcodrum();
    }

    $scope.$watch(function () {
        return $scope.setSpin;
    }, function () {
        if (angular.isDefined($scope.setSpin)) {
            getSpinConstant($scope.setSpin, 0);
        }
    });

    function getSpinConstant(spnDefault, value) {
        var spinString;
        var spinimageID;
        switch (spnDefault) {
            case "None":
                spinString = $scope.translation[WASHER_SPIN.None];
                spinimageID = "Washer/assets/img/main_list_ic_spin_low.svg#Layer_1";
                break;
            case "NoSpin":
                spinString = $scope.translation[WASHER_SPIN.NoSpin];
                spinimageID = "Washer/assets/img/main_list_ic_spin_no_spin.svg#Layer_1";
                break;
            case "Low":
                spinString = $scope.translation[WASHER_SPIN.Low];
                spinimageID = "Washer/assets/img/main_list_ic_spin_low.svg#Layer_1";
                break;
            case "Delicate":
                spinString = $scope.translation[WASHER_SPIN.Delicate];
                spinimageID = "Washer/assets/img/main_list_ic_spin_low.svg#Layer_1";
                break;
            case "Medium":
                spinString = $scope.translation[WASHER_SPIN.Medium];
                spinimageID = "Washer/assets/img/main_list_ic_spin_medium.svg#Layer_1";
                break;
            case "High":
                spinString = $scope.translation[WASHER_SPIN.High];
                spinimageID = "Washer/assets/img/main_list_ic_spin_extra_high.svg#Layer_1";
                break;
            case "ExtraHigh":
                spinString = $scope.translation[WASHER_SPIN.ExtraHigh];
                spinimageID = "Washer/assets/img/main_list_ic_spin_extra_high.svg#Layer_1";
                break;
            case "ExtraLow":
                spinString = $scope.translation[WASHER_SPIN.ExtraLow];
                spinimageID = "Washer/assets/img/main_list_ic_spin_low.svg#Layer_1";
                break;
            case "RinseHold":
                spinString = $scope.translation[WASHER_SPIN.RinseHold];
                spinimageID = "Washer/assets/img/main_list_ic_rinse_hold.svg#Layer_1";
                break;
            case "200":
                spinString = $scope.translation[WASHER_SPIN.S200];
                spinimageID = "Washer/assets/img/main_list_ic_spin_200.svg#Layer_1";
                break;
            case "400":
                spinString = $scope.translation[WASHER_SPIN.S400];
                spinimageID = "Washer/assets/img/main_list_ic_spin_400.svg#Layer_1";
                break;
            case "600":
                spinString = $scope.translation[WASHER_SPIN.S600];
                spinimageID = "Washer/assets/img/main_list_ic_spin_600.svg#Layer_1";
                break;
            case "800":
                spinString = $scope.translation[WASHER_SPIN.S800];
                spinimageID = "Washer/assets/img/main_list_ic_spin_800.svg#Layer_1";
                break;
            case "1000":
                spinString = $scope.translation[WASHER_SPIN.S1000];
                spinimageID = "Washer/assets/img/main_list_ic_spin_800.svg#Layer_1";
                break;
            case "1200":
                spinString = $scope.translation[WASHER_SPIN.S1200];
                spinimageID = "Washer/assets/img/main_list_ic_spin_1200.svg#Layer_1";
                break;
            case "1400":
                spinString = $scope.translation[WASHER_SPIN.S1400];
                spinimageID = "Washer/assets/img/main_list_ic_spin_1400.svg#Layer_1";
                break;
            case "1600":
                spinString = $scope.translation[WASHER_SPIN.S1600];
                spinimageID = "Washer/assets/img/main_list_ic_spin_1600.svg#Layer_1";
                break;
                // exception case for wifi module problem. After OTN done, can remove "Unknown" : 170417
            case "Unknown":
                spinString = $scope.translation[WASHER_SPIN.Unknown];
                spinimageID = "Washer/assets/img/main_list_ic_spin_low.svg#Layer_1";
                break;
            case "18":
                spinString = $scope.translation[WASHER_SPIN.Unknown18];
                spinimageID = "Washer/assets/img/main_list_ic_spin_low.svg#Layer_1";
                break;
                //-----------------------------------------------------------------------------
            default:
                break;
        }
        if (value === 0) {
            var svg = document.getElementById('spinSVG');
            SHPService.loadSVG(spinimageID, svg);
            return spinimageID;
        } else {
            return spinString;
        }
    }

    function getSpinConstantFav(spnDefault, value) {
        var spinimageID;
        switch (spnDefault) {
            case "None":
                spinimageID = "Washer/assets/img/main_list_ic_spin_low.svg#Layer_1";
                break;
            case "NoSpin":
                spinimageID = "Washer/assets/img/main_list_ic_spin_no_spin.svg#Layer_1";
                break;
            case "Low":
                spinimageID = "Washer/assets/img/main_list_ic_spin_low.svg#Layer_1";
                break;
            case "Medium":
                spinimageID = "Washer/assets/img/main_list_ic_spin_medium.svg#Layer_1";
                break;
            case "High":
                spinimageID = "Washer/assets/img/main_list_ic_spin_extra_high.svg#Layer_1";
                break;
            case "ExtraHigh":
                spinimageID = "Washer/assets/img/main_list_ic_spin_extra_high.svg#Layer_1";
                break;
            case "ExtraLow":
                spinimageID = "Washer/assets/img/main_list_ic_spin_extra_low.svg#Layer_1";
                break;
            case "RinseHold":
                spinimageID = "Washer/assets/img/main_list_ic_rinse_hold.svg#Layer_1";
                break;
            case "200":
                spinimageID = "Washer/assets/img/main_list_ic_spin_200.svg#Layer_1";
                break;
            case "400":
                spinimageID = "Washer/assets/img/main_list_ic_spin_400.svg#Layer_1";
                break;
            case "600":
                spinimageID = "Washer/assets/img/main_list_ic_spin_600.svg#Layer_1";
                break;
            case "800":
                spinimageID = "Washer/assets/img/main_list_ic_spin_800.svg#Layer_1";
                break;
            case "1000":
                spinimageID = "Washer/assets/img/main_list_ic_spin_800.svg#Layer_1";
                break;
            case "1200":
                spinimageID = "Washer/assets/img/main_list_ic_spin_1200.svg#Layer_1";
                break;
            case "1400":
                spinimageID = "Washer/assets/img/main_list_ic_spin_1400.svg#Layer_1";
                break;
            case "1600":
                spinimageID = "Washer/assets/img/main_list_ic_spin_1600.svg#Layer_1";
                break;
                // exception case for wifi module problem. After OTN done, can remove "Unknown" : 170417
            case "Unknown":
                spinimageID = "Washer/assets/img/main_list_ic_spin_low.svg#Layer_1";
                break;
            case "18":
                spinimageID = "Washer/assets/img/main_list_ic_spin_low.svg#Layer_1";
                break;
                //-----------------------------------------------------------------------------
            default:
                break;
        }
        return spinimageID;
    }

    $scope.$watch(function () {
        return $scope.setTemp;
    }, function () {
        if (angular.isDefined($scope.setTemp)) {
            getTempConstant($scope.setTemp, 0);
        }
    });

    function getTempConstant(tmpDefault, value) {
        var tempString;
        var tempImageID;
        switch (tmpDefault) {
            case "TapCold":
                tempString = $scope.translation[WASHER_TEMP.TAPCOLD];
                tempImageID = "Washer/assets/img/main_list_ic_temp_cold.svg#Layer_1";
                break;
            case "Cold":
                tempString = $scope.translation[WASHER_TEMP.COLD];
                tempImageID = "Washer/assets/img/main_list_ic_temp_cold.svg#Layer_1";
                break;
            case "Cool":
                tempString = $scope.translation[WASHER_TEMP.COOL];
                tempImageID = "Washer/assets/img/main_list_ic_temp_cold.svg#Layer_1";
                break;
            case "EcoWarm":
                tempString = $scope.translation[WASHER_TEMP.EcoWarm];
                tempImageID = "Washer/assets/img/main_list_ic_temp_eco_warm.svg#Layer_1";
                break;
            case "Warm":
                tempString = $scope.translation[WASHER_TEMP.Warm];
                tempImageID = "Washer/assets/img/main_list_ic_temp_warm.svg#Layer_1";
                break;
            case "Hot":
                tempString = $scope.translation[WASHER_TEMP.Hot];
                tempImageID = "Washer/assets/img/main_list_ic_temp_hot.svg#Layer_1";
                break;
            case "ExtraHot":
                tempString = $scope.translation[WASHER_TEMP.ExtraHot];
                tempImageID = "Washer/assets/img/main_list_ic_temp_extra_hot.svg#Layer_1";
                break;
            case "ExtraLow":
                tempString = $scope.translation[WASHER_TEMP.ExtraLow];
                tempImageID = "Washer/assets/img/main_list_ic_temp_extra_low.svg#Layer_1";
                break;
            case "Low":
                tempString = $scope.translation[WASHER_TEMP.Low];
                tempImageID = "Washer/assets/img/main_list_ic_temp_low.svg#Layer_1";
                break;
            case "MediumLow":
                tempString = $scope.translation[WASHER_TEMP.MediumLow];
                tempImageID = "Washer/assets/img/main_list_ic_temp_medium_low.svg#Layer_1";
                break;
            case "Medium":
                tempString = $scope.translation[WASHER_TEMP.Medium];
                tempImageID = "Washer/assets/img/main_list_ic_temp_medium.svg#Layer_1";
                break;
            case "High":
                tempString = $scope.translation[WASHER_TEMP.High];
                tempImageID = "Washer/assets/img/main_list_ic_temp_high.svg#Layer_1";
                break;
            case "20":
                tempString = $scope.translation[WASHER_TEMP.T20];
                tempImageID = "Washer/assets/img/main_list_ic_temp_20.svg#Layer_1";
                break;
            case "30":
                tempString = $scope.translation[WASHER_TEMP.T30];
                tempImageID = "Washer/assets/img/main_list_ic_temp_30.svg#Layer_1";
                break;
            case "40":
                tempString = $scope.translation[WASHER_TEMP.T40];
                tempImageID = "Washer/assets/img/main_list_ic_temp_40.svg#Layer_1";
                break;
            case "50":
                tempString = $scope.translation[WASHER_TEMP.T50];
                tempImageID = "Washer/assets/img/main_list_ic_temp_50.svg#Layer_1";
                break;
            case "60":
                tempString = $scope.translation[WASHER_TEMP.T60];
                tempImageID = "Washer/assets/img/main_list_ic_temp_60.svg#Layer_1";
                break;
            case "65":
                tempString = $scope.translation[WASHER_TEMP.T65];
                tempImageID = "Washer/assets/img/main_list_ic_temp_60.svg#Layer_1";
                break;
            case "70":
                tempString = $scope.translation[WASHER_TEMP.T70];
                tempImageID = "Washer/assets/img/main_list_ic_temp_60.svg#Layer_1";
                break;
            case "75":
                tempString = $scope.translation[WASHER_TEMP.T75];
                tempImageID = "Washer/assets/img/main_list_ic_temp_60.svg#Layer_1";
                break;
            case "80":
                tempString = $scope.translation[WASHER_TEMP.T80];
                tempImageID = "Washer/assets/img/main_list_ic_temp_95.svg#Layer_1";
                break;
            case "90":
                tempString = $scope.translation[WASHER_TEMP.T90];
                tempImageID = "Washer/assets/img/main_list_ic_temp_95.svg#Layer_1";
                break;
            case "95":
                tempString = $scope.translation[WASHER_TEMP.T95];
                tempImageID = "Washer/assets/img/main_list_ic_temp_95.svg#Layer_1";
                break;
            case "None":
                tempString = WASHER_TEMP.None;
                tempImageID = "Washer/assets/img/main_list_ic_temp_20.svg#Layer_1";
                break;
            default:
                break;
        }
        if (value === 0) {
            var svg = document.getElementById('tempSVG');
            SHPService.loadSVG(tempImageID, svg);
            return tempImageID;
        } else {
            return tempString;
        }

    }

    function getTempConstantFav(tmpDefault, value) {
        console.log("getTempConstantFav_tmpDefault="+tmpDefault);
        var tempImageID;
        switch (tmpDefault) {
            case "TapCold":
                tempImageID = "Washer/assets/img/main_list_ic_temp_cold.svg#Layer_1";
                break;
            case "Cold":
                tempImageID = "Washer/assets/img/main_list_ic_temp_cold.svg#Layer_1";
                break;
            case "Cool":
                tempImageID = "Washer/assets/img/main_list_ic_temp_cold.svg#Layer_1";
                break;
            case "EcoWarm":
                tempImageID = "Washer/assets/img/main_list_ic_temp_eco_warm.svg#Layer_1";
                break;
            case "Warm":
                tempImageID = "Washer/assets/img/main_list_ic_temp_warm.svg#Layer_1";
                break;
            case "Hot":
                tempImageID = "Washer/assets/img/main_list_ic_temp_hot.svg#Layer_1";
                break;
            case "ExtraHot":
                tempImageID = "Washer/assets/img/main_list_ic_temp_extra_hot.svg#Layer_1";
                break;
            case "ExtraLow":
                tempImageID = "Washer/assets/img/main_list_ic_temp_extra_low.svg#Layer_1";
                break;
            case "Low":
                tempImageID = "Washer/assets/img/main_list_ic_temp_low.svg#Layer_1";
                break;
            case "MediumLow":
                tempImageID = "Washer/assets/img/main_list_ic_temp_medium_low.svg#Layer_1";
                break;
            case "Medium":
                tempImageID = "Washer/assets/img/main_list_ic_temp_medium.svg#Layer_1";
                break;
            case "High":
                tempImageID = "Washer/assets/img/main_list_ic_temp_high.svg#Layer_1";
                break;
            case "20":
                tempImageID = "Washer/assets/img/main_list_ic_temp_20.svg#Layer_1";
                break;
            case "30":
                tempImageID = "Washer/assets/img/main_list_ic_temp_30.svg#Layer_1";
                break;
            case "40":
                tempImageID = "Washer/assets/img/main_list_ic_temp_40.svg#Layer_1";
                break;
            case "50":
                tempImageID = "Washer/assets/img/main_list_ic_temp_50.svg#Layer_1";
                break;
            case "60":
                tempImageID = "Washer/assets/img/main_list_ic_temp_60.svg#Layer_1";
                break;
            case "65":
                tempImageID = "Washer/assets/img/main_list_ic_temp_60.svg#Layer_1";
                break;
            case "70":
                tempImageID = "Washer/assets/img/main_list_ic_temp_60.svg#Layer_1";
                break;
            case "75":
                tempImageID = "Washer/assets/img/main_list_ic_temp_60.svg#Layer_1";
                break;
            case "80":
                tempImageID = "Washer/assets/img/main_list_ic_temp_95.svg#Layer_1";
                break;
            case "90":
                tempImageID = "Washer/assets/img/main_list_ic_temp_95.svg#Layer_1";
                break;
            case "95":
                tempImageID = "Washer/assets/img/main_list_ic_temp_95.svg#Layer_1";
                break;
            case "None":
                tempImageID = "Washer/assets/img/main_list_ic_temp_20.svg#Layer_1";
                break;
            default:
                break;
        }
        return tempImageID;
    }

    $scope.$watch(function () {
        return $scope.setRinse;
    }, function () {
        if (angular.isDefined($scope.setRinse)) {
            getRinseConstant($scope.setRinse, 0);
        }
    });

    function getRinseConstant(rinseDefault, value) {
        var rinseString;
        var rinseImageID;
        switch (rinseDefault) {
            case "0":
                rinseString = $scope.translation[WASHER_RINSE.R0];
                rinseImageID = "Washer/assets/img/main_list_ic_rinse_1.svg#Layer_1";
                break;
            case "1":
                rinseString = $scope.translation[WASHER_RINSE.R1];
                rinseImageID = "Washer/assets/img/main_list_ic_rinse_1.svg#Layer_1";
                break;
            case "2":
                rinseString = $scope.translation[WASHER_RINSE.R2];
                rinseImageID = "Washer/assets/img/main_list_ic_rinse_2.svg#Layer_1";
                break;
            case "3":
                rinseString = $scope.translation[WASHER_RINSE.R3];
                rinseImageID = "Washer/assets/img/main_list_ic_rinse_3.svg#Layer_1";
                break;
            case "4":
                rinseString = $scope.translation[WASHER_RINSE.R4];
                rinseImageID = "Washer/assets/img/main_list_ic_rinse_4.svg#Layer_1";
                break;
            case "5":
                rinseString = $scope.translation[WASHER_RINSE.R5];
                rinseImageID = "Washer/assets/img/main_list_ic_rinse_5.svg#Layer_1";
                break;
            default:
                break;
        }
        if (value === 0) {
            var svg = document.getElementById('rinseSVG');
            SHPService.loadSVG(rinseImageID, svg);
            return rinseImageID;
        } else {
            return rinseString;
        }
    }

    function getRinseConstantFav(rinseDefault, value) {
        var rinseImageID;
        switch (rinseDefault) {
            case "0":
                rinseImageID = "Washer/assets/img/main_list_ic_rinse_1.svg#Layer_1";
                break;
            case "1":
                rinseImageID = "Washer/assets/img/main_list_ic_rinse_1.svg#Layer_1";
                break;
            case "2":
                rinseImageID = "Washer/assets/img/main_list_ic_rinse_2.svg#Layer_1";
                break;
            case "3":
                rinseImageID = "Washer/assets/img/main_list_ic_rinse_3.svg#Layer_1";
                break;
            case "4":
                rinseImageID = "Washer/assets/img/main_list_ic_rinse_4.svg#Layer_1";
                break;
            case "5":
                rinseImageID = "Washer/assets/img/main_list_ic_rinse_5.svg#Layer_1";
                break;
            default:
                break;
        }
        return rinseImageID;
    }

    $scope.$watch(function () {
        return $scope.setSoil;
    }, function () {
        if (angular.isDefined($scope.setSoil)) {
            getSoilConstant($scope.setSoil, 0);
        }
    });

    function getSoilConstant(soilDefault, value) {
        var soilString;
        var soilImageID;
        switch (soilDefault) {
            case "ExtraHeavy":
                soilString = $scope.translation[WASHER_SOIL.ExtraHeavy];
                soilImageID = "Washer/assets/img/main_list_ic_soillevel_extra_heavy.svg#Layer_1";
                break;
            case "Heavy":
                soilString = $scope.translation[WASHER_SOIL.Heavy];
                soilImageID = "Washer/assets/img/main_list_ic_soillevel_heavy.svg#Layer_1";
                break;
            case "Normal":
                soilString = $scope.translation[WASHER_SOIL.Normal];
                soilImageID = "Washer/assets/img/main_list_ic_soillevel_normal.svg#Layer_1";
                break;
            case "Light":
                soilString = $scope.translation[WASHER_SOIL.Light];
                soilImageID = "Washer/assets/img/main_list_ic_soillevel_light.svg#Layer_1";
                break;
            case "ExtraLight":
                soilString = $scope.translation[WASHER_SOIL.ExtraLight];
                soilImageID = "Washer/assets/img/main_list_ic_soillevel_extra_light.svg#Layer_1";
                break;
            case "Up":
                soilString = $scope.translation[WASHER_SOIL.Up];
                soilImageID = "Washer/assets/img/main_list_ic_soillevel_extra_light.svg#Layer_1";
                break;
            case "Down":
                soilString = $scope.translation[WASHER_SOIL.Down];
                soilImageID = "Washer/assets/img/main_list_ic_soillevel_extra_light.svg#Layer_1";
                break;
            case "None":
                soilString = WASHER_SOIL.None;
                soilImageID = "Washer/assets/img/main_list_ic_soillevel_extra_light.svg#Layer_1";
                break;
            default:
                break;
        }
        if (value === 0) {
            var svg = document.getElementById('soilSVG');
            SHPService.loadSVG(soilImageID, svg);
            return soilImageID;
        } else {
            return soilString;
        }
    }

    function getSoilConstantFav(soilDefault, value) {
        var soilImageID;
        switch (soilDefault) {
            case "ExtraHeavy":
                soilImageID = "Washer/assets/img/main_list_ic_soillevel_extra_heavy.svg#Layer_1";
                break;
            case "Heavy":
                soilImageID = "Washer/assets/img/main_list_ic_soillevel_heavy.svg#Layer_1";
                break;
            case "Normal":
                soilImageID = "Washer/assets/img/main_list_ic_soillevel_normal.svg#Layer_1";
                break;
            case "Light":
                soilImageID = "Washer/assets/img/main_list_ic_soillevel_light.svg#Layer_1";
                break;
            case "ExtraLight":
                soilImageID = "Washer/assets/img/main_list_ic_soillevel_extra_light.svg#Layer_1";
                break;
            case "Up":
                soilImageID = "Washer/assets/img/main_list_ic_soillevel_extra_light.svg#Layer_1";
                break;
            case "Down":
                soilImageID = "Washer/assets/img/main_list_ic_soillevel_extra_light.svg#Layer_1";
                break;
            case "None":
                soilImageID = "Washer/assets/img/main_list_ic_soillevel_extra_light.svg#Layer_1";
                break;
            default:
                break;
        }
        return soilImageID;
    }

    $scope.$watch(function () {
        return $scope.setDryComboLevel;
    }, function () {
        if (angular.isDefined($scope.setDryComboLevel)) {
            $scope.getDryComboLevelConstant($scope.setDryComboLevel, 0);
        }
    });

    function getDryComboLevelConstant(drylevelDefault) {
        var drylevelString;
        switch (drylevelDefault) {
            case "Normal":
                drylevelString = $scope.translation[WASHER_DRYCOMBO.normal];
                break;
            case "Strong":
                drylevelString = $scope.translation[WASHER_DRYCOMBO.strong];
                break;
            case "Shirt":
                drylevelString = $scope.translation[WASHER_DRYCOMBO.shirts];
                break;
            case "Low":
                drylevelString = $scope.translation[WASHER_DRYCOMBO.low];
                break;
            case "More":
                drylevelString = $scope.translation[WASHER_DRYCOMBO.more];
                break;
            case "Cupboard":
                drylevelString = $scope.translation[WASHER_DRYCOMBO.cupboard];
                break;
            case "30":
                drylevelString = $scope.translation[WASHER_DRYCOMBO.DL30];
                break;
            case "60":
                drylevelString = $scope.translation[WASHER_DRYCOMBO.DL60];
                break;
            case "90":
                drylevelString = $scope.translation[WASHER_DRYCOMBO.DL90];
                break;
            case "120":
                drylevelString = $scope.translation[WASHER_DRYCOMBO.DL120];
                break;
            case "150":
                drylevelString = $scope.translation[WASHER_DRYCOMBO.DL150];
                break;
            case "180":
                drylevelString = $scope.translation[WASHER_DRYCOMBO.DL180];
                break;
            case "210":
                drylevelString = $scope.translation[WASHER_DRYCOMBO.DL210];
                break;
            case "240":
                drylevelString = $scope.translation[WASHER_DRYCOMBO.DL240];
                break;
            case "270":
                drylevelString = $scope.translation[WASHER_DRYCOMBO.DL270];
                break;
            case "None":
                drylevelString = $scope.translation[WASHER_DRYCOMBO.none];
                break;
            default:
                drylevelString = $scope.translation[WASHER_DRYCOMBO.none];
                break;
        }
        return drylevelString;
    }

    function getDryLevelImg(drylevelDefault) {
        var dryImageID;
        switch (drylevelDefault) {
            case "Normal":
            case "Strong":
            case "Shirt":
            case "Low":
            case "More":
            case "Cupboard":
            case "30":
            case "60":
            case "90":
            case "120":
            case "150":
            case "180":
            case "210":
            case "240":
            case "270":
            case "None":
                dryImageID = "common/img/main_list_ic_extra_dry.svg#Layer_1";
                break;
            default:
                dryImageID = "common/img/main_list_ic_extra_dry.svg#Layer_1";
                break;
        }
        return dryImageID;
    }

    /*function getColor(sectionValue) {
     var gradientDiv = 'url(#gradient)';
     switch (sectionValue) {
     case 0:
     gradientDiv = 'url(#gradient)';
     break;
     case 1:
     gradientDiv = 'url(#gradientMain)';
     break;
     case 2:
     gradientDiv = 'url(#gradientSub)';
     break;
     default:
     gradientDiv = 'url(#gradient)';
     break;
     }
     return gradientDiv;
     }*/

    function getColor() {
        return $scope.progressColor;
    }

    function toggleWashIndicatorInfoArea() {
        $scope.indicatorExpanded = !$scope.indicatorExpanded;
        var scrollArea1 = document.getElementsByClassName('home_center_area_AddWashIndicator');
        var exHeight1 = document.getElementsByClassName('addWasherAvailableMsgDiv')[0].clientHeight;
        if ($scope.indicatorExpanded) {
            $timeout(function () {
                var exHeight = document.getElementsByClassName('addWasherAvailableMsgDiv')[0].clientHeight - exHeight1;
                if (scrollArea1 && exHeight > 0) {
                    var mParentDiv = document.getElementsByClassName('home_center_area_AddWashIndicator')[0].clientHeight;
                    scrollArea1[0].style.height = mParentDiv + exHeight;
                }
            }, 0);
        } else {
            //TODO need to check how we can set these values dynamic;
            if (($scope.addWashIndicator || $scope.addGarmentIndicator) && !$scope.cycFinish) {
                scrollArea1[0].style.height = 23 + 'rem';
            } else {
                scrollArea1[0].style.height = 18.85 + 'rem';
            }
        }
    }

    function getStartCommand(courseValue, deviceStatus, isRinseSupported, isTempSupported, isSpinSupported, isSoilSupported, isDryLevelSupported, isBubbleSoakSupported, washerSection) {
        var tempRinse, tempTemp, tempSpin, tempSoil, tempDryLevel;
        switch (washerSection) {
            case WASHERTOUPDATE.SINGLEWASHER:
                tempTemp = $scope.setTemp;
                tempSpin = $scope.setSpin;
                tempSoil = $scope.setSoil;
                tempRinse = $scope.setRinse;
                tempDryLevel = $scope.setDryComboLevel;
                break;
            case WASHERTOUPDATE.MAINWASHER:
                tempTemp = $scope.setTempMain;
                tempSpin = $scope.setSpinMain;
                tempSoil = $scope.setSoilMain;
                tempRinse = $scope.setRinseMain;
                tempDryLevel = $scope.setDryComboLevelMain;
                break;
            case WASHERTOUPDATE.SUBWASHER:
                tempTemp = $scope.setTempSub;
                tempSpin = $scope.setSpinSub;
                tempSoil = $scope.setSoilSub;
                tempRinse = $scope.setRinseSub;
                tempDryLevel = $scope.setDryComboLevelSub;
                break;
            default:
                tempTemp = $scope.setTemp;
                tempSpin = $scope.setSpin;
                tempSoil = $scope.setSoil;
                tempRinse = $scope.setRinse;
                tempDryLevel = $scope.setDryComboLevel;
                break;
        }

        var command = '{"Device":{"Mode":{"options":["Course_' + courseValue + '"';
        if (isBubbleSoakSupported) {
            command = command + ',"BubbleSoak_'+$scope.bubbleSoakValue+'"';
        }
        command = command+ ']},"Operation":{"state":"' + deviceStatus + '"}';

        if (isRinseSupported || isTempSupported || isSpinSupported || isSoilSupported || isDryLevelSupported) {
            command = command + ',"Washer":{';
            var count = 0;
            if (isRinseSupported) {
                command = command + '"rinseCycles":"' + tempRinse + '"';
                count++;
            }
            if (isTempSupported) {
                if (count > 0) {
                    command = command + ',';
                }
                command = command + '"waterTemperature":"' + tempTemp + '"';
                count++;
            }
            if (isSpinSupported) {
                if (count > 0) {
                    command = command + ',';
                }
                // exception case for wifi module problem. After OTN done, can remove "Unknown" : 170417
                if ($scope.currentSpinList !== undefined && ($scope.currentSpinList.indexOf("Unknown") > -1)) {
                    console.log("[Flex Global F210 Exception]tempSpin : " + tempSpin + " -> 18");
                    if (tempSpin === "Unknown") {
                        tempSpin = "18";
                    }
                }
                //-----------------------------------------------------------------------------
                command = command + '"spinLevel":"' + tempSpin + '"';
                count++;
            }
            if (isDryLevelSupported) {
                if (count > 0) {
                    command = command + ',';
                }
                command = command + '"dryLevel":"' + tempDryLevel + '"';
                count++;
            }
            if (isSoilSupported) {
                if (count > 0) {
                    command = command + ',';
                }
                command = command + '"soilLevel":"' + tempSoil + '"';
            }
            command = command + '}}}';
        } else {
            command = command + '}}';
        }
        console.log("command :: " + command);
        return command;
    }

    function getStartCommandMyFav(courseValue, deviceStatus, isTemp, isRinse, isSpin, isSoil, isDry, tempValue, rinseValue, spinValue, soilValue, dryValue) {

        var command = '{"Device":{"Mode":{"options":["Course_' + courseValue + '"]},"Operation":{"state":"' + deviceStatus + '"},"Washer":{';
        var count = 0;
        if (isTemp) {
            command = command + '"waterTemperature":"' + tempValue + '"';
            count++;
        }
        if (isRinse) {
            if (count > 0) {
                command = command + ',';
            }
            command = command + '"rinseCycles":"' + rinseValue + '"';
            count++;
        }
        if (isSpin) {
            if (count > 0) {
                command = command + ',';
            }
            // exception case for wifi module problem. After OTN done, can remove "Unknown" : 170417
            if ($scope.currentSpinList !== undefined && ($scope.currentSpinList.indexOf("Unknown") > -1)) {
                console.log("[Flex Global F210 Exception]spinValue : " + spinValue + " -> 18");
                if (spinValue === "Unknown") {
                    spinValue = "18";
                }
            }
            //-----------------------------------------------------------------------------
            command = command + '"spinLevel":"' + spinValue + '"';
            count++;
        }
        if (isSoil) {
            if (count > 0) {
                command = command + ',';
            }
            command = command + '"soilLevel":"' + soilValue + '"';
            count++;
        }
        if (isDry) {
            if (count > 0) {
                command = command + ',';
            }
            command = command + '"dryLevel":"' + dryValue + '"';
            count++;
        }
        command = command + '}}}';
        console.log("commandfav :: " + command);
        return command;
    }

    function cancelCommand() {
        return '{"Operation":{"state":"Ready"}}';
    }

    function pauseCommand() {
        return '{"Operation":{"state":"Pause"}}';
    }

    function autoDetergentCommand(deterValue) {
        var dText;
        if (deterValue) {
            dText = "On";
        } else {
            dText = "Off";
        }
        return '{"Washer":{"autoDetergentEnabled":"' + dText + '"}}';
    }

    function autoSoftnerCommand(SoftnerValue) {
        var sText;
        if (SoftnerValue) {
            sText = "On";
        } else {
            sText = "Off";
        }
        return '{"Washer":{"autoSoftenerEnabled":"' + sText + '"}}';
    }

    function laundryOut() {
        var lText;
        if (!$scope.laundrySwitch) {
            lText = "LaundryOutTime_0";
        } else if ($scope.laundryOpt2) {
            lText = "LaundryOutTime_30";
        } else if ($scope.laundryOpt3) {
            lText = "LaundryOutTime_60";
        } else if ($scope.laundryOpt4) {
            lText = "LaundryOutTime_90";
        } else {
            ;//Do Nothing
        }
        return '{"Device":{"Mode":{"options":["' + lText + '"]}}}';
    }

    function syncTimerCommand() {
        debugMessage("current date is::::::::" + getCurrentTime());
        var dateValue = getCurrentTime();
        return '{"Time":{"currentTime":"' + dateValue + '"}}';
    }

    function getCurrentTime() {
        var local = new Date();
        var currentdate = new Date(local);
        currentdate.setMinutes(local.getMinutes() - local.getTimezoneOffset());
        return currentdate.toJSON().slice(0, 19);
    }

    function checkCycleCompleteScreen(checkOn) {
        if ($scope.cycFinish && !$scope.appAlive) {
            if (checkOn) {
                $scope.alertState = -1;
                $scope.disableLaundry = false;
//                updateCancelProgres();
//                $scope.cycFinish = false;
            } else {
                if (!$scope.laundrySwitch) {
                    $scope.disableLaundry = true;
                }
            }
        }
    }

    function updateOperation(operationValues) {
        debugMessage("power value is::" + operationValues.power);
        if (!$scope.isDualWasher && operationValues.power === "Off") {
            powerOffPopUp = true;
            $scope.errorList.push({
                title: '',
                msg: $scope.translation.WEBMOB_device_washer_alarm_power_off_msg_washer,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    $scope.okClickedAtPowerOff();
                },
                closeDialog: false
            });
            changePopUpClass(true);
        }
        if (!$scope.isDualWasher && operationValues.power === "On") {
            okClickedAtPowerOff();
        }
        if (angular.isDefined(operationValues.kidsLock)) {
            if (operationValues.kidsLock.indexOf("Ready") === -1) {
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    if ($scope.kidsLockByPass) {
                        $scope.kidsLock = false;
                    } else {
                        $scope.kidsLock = true;
                        if (!$scope.isDualWasher && $scope.notiParsingInProress) {
                            $timeout(function () {
                                $scope.errorList.push({
                                    title: $scope.translation.WEBMOB_device_washer_alarm_smart_control_off,
                                    msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_msg_washer,
                                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                                    btnOkHandler: function () {
                                        onOkClicked(true);
                                    },
                                    closeDialog: !true
                                });
                                changePopUpClass(true);
                            }, MATERIAL_DESIGN.BTN_ANIMATION_TIME);
                        }
                    }
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    if ($scope.kidsLockByPassMain) {
                        $scope.kidsLockMain = false;
                    } else {
                        $scope.kidsLockMain = true;
                        if ($scope.notiParsingInProress) {
                            $timeout(function () {
                                $scope.errorList.push({
                                    title: $scope.translation.WEBMOB_device_washer_alarm_smart_control_off,
                                    msg: '[' + $scope.translation.WEBMOB_device_washer_comm_front_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_child_lock_msg_washer,
                                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                                    btnOkHandler: function () {
                                        onOkClicked(true);
                                    },
                                    closeDialog: !true
                                });
                                changePopUpClass(true);
                            }, MATERIAL_DESIGN.BTN_ANIMATION_TIME);
                        }
                    }
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    if ($scope.kidsLockByPassSub) {
                        $scope.kidsLockSub = false;
                    } else {
                        $scope.kidsLockSub = true;
                        if ($scope.notiParsingInProress) {
                            $timeout(function () {
                                $scope.errorList.push({
                                    title: $scope.translation.WEBMOB_device_washer_alarm_smart_control_off,
                                    msg: '[' + $scope.translation.WEBMOB_device_washer_comm_top_loader + ']<br>' + $scope.translation.WEBMOB_device_washer_alarm_child_lock_msg_washer,
                                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                                    btnOkHandler: function () {
                                        onOkClicked(true);
                                    },
                                    closeDialog: !true
                                });
                                changePopUpClass(true);
                            }, MATERIAL_DESIGN.BTN_ANIMATION_TIME);
                        }
                    }
                } else {
                    ;//Nothing
                }
            } else {
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.kidsLock = false;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.kidsLockMain = false;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.kidsLockSub = false;
                } else {
                    ;//Nothing
                }
            }
        }

        if (angular.isDefined(operationValues.state)) {
            if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                $scope.deviceStatus = operationValues.state;
            }
            if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                $scope.deviceStatusMain = operationValues.state;
            } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                $scope.deviceStatusSub = operationValues.state;
            } else {
                ;//Nothing
            }
        }
        updateStatus(operationValues.progress);
        if ((operationValues.state === "Ready")) {
            if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                if (!$scope.cycFinish) {
                    //$scope.custDialogpopup = true; //due to this line blank popup was displaying: WM_0600092402
                    updateCancelProgres();
                } else {
                    if (!$scope.isDualWasher && $scope.seamLessControlValue) {
                        $scope.cycFinish = false;
                        $scope.disableLaundry = false;
                        $scope.spinOnly = false;
                        $scope.rinseOnly = false;
                        $scope.rinseOnlyAtSetCourse = false;
                        $scope.dryingOnly = false;
                        $scope.washNotIncluded = false;
                        updateCancelProgres();
                        dismissLoadingBar(WASHER_COMMANDS.cancelWasher);
                        callGetDevice();
                        return;
                    }
                    dismissLoadingBar(WASHER_COMMANDS.cancelWasher);
                }
            }
            if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                if (!$scope.cycFinishMain) {
                    updateCancelProgres();
                } else {
                    dismissLoadingBar(WASHER_COMMANDS.cancelWasher);
                }
            } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                if (!$scope.cycFinishSub) {
                    updateCancelProgres();
                } else {
                    dismissLoadingBar(WASHER_COMMANDS.cancelWasher);
                }
            } else {
                ;//Nothing
            }

        } else if ((operationValues.state === "Run")) {
            if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                if ($scope.isDualWasher && $scope.homePage) {
                    ;// Nothing
                } else {
                    if (currentRunItem !== undefined) {
                        updateLandingpage(currentRunItem);
                    }
                }
            }
            if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                if (currentRunItemMain !== undefined) {
                    updateLandingpage(currentRunItemMain);
                }
            } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                if (currentRunItemSub !== undefined) {
                    updateLandingpage(currentRunItemSub);
                }
            } else {
                ;//Nothing
            }

            if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                $scope.onPause = false;
                $scope.textDisplay = true;
            }
            if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                $scope.textDisplayMain = true;
                $scope.onPauseMain = false;
            } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                $scope.textDisplaySub = true;
                $scope.onPauseSub = false;
            } else {
                ;//Nothing
            }
            $scope.wrinkleStart = true;
            if ($scope.alertState !== WASHERALERT.CANCEL) { //CQ defect WM_0600092363: cancel popup is disappeared when Run state notification received.
                closeAllPopups();
            }
            dismissLoadingBar(WASHER_COMMANDS.startWasher);
            updateSettingsDisable();
            if (!$scope.appAlive && !$scope.cycFinish) {
                updateDetergentSoftner();
            }
        } else if ((operationValues.state === "Pause")) {
            if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                $scope.onPause = true;
                $scope.textDisplay = true;
            }
            if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                $scope.textDisplayMain = true;
                $scope.onPauseMain = true;
                $scope.dispStatusMain = $scope.translation.WEBMOB_device_washer_progressing_paused;
            } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                $scope.textDisplaySub = true;
                $scope.onPauseSub = true;
                $scope.dispStatusSub = $scope.translation.WEBMOB_device_washer_progressing_paused;
            } else {
                ;//Nothing
            }
            dismissLoadingBar(WASHER_COMMANDS.pauseWasher);
            if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                $scope.wrinkleStart = true;
                $scope.dispStatus = $scope.translation.WEBMOB_device_washer_progressing_paused;
            }
        } else {
            ;//Nothing
        }

        if (angular.isDefined(operationValues.supportedProgress)) {
            supportedProgress = operationValues.supportedProgress;
            if (supportedProgress.indexOf('Spin') === -1 && supportedProgress.indexOf('Wash') === -1 && supportedProgress.indexOf('Rinse') === -1) {//&& supportedProgress.indexOf('Rinse') === -1 removed on 12/20/2016 on the suggestion of yoon
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.dryingOnly = true;
                    $scope.dryingOnlySetByApp = false;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.dryingOnlyMain = true;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.dryingOnlySub = true;
                } else {
                    ;//Nothing
                }
            } else {
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.dryingOnly = false;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.dryingOnlyMain = false;

                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.dryingOnlySub = false;
                } else {
                    ;//Nothing
                }

            }
            if (supportedProgress.indexOf('Spin') === -1 && supportedProgress.indexOf('Wash') === -1 && supportedProgress.indexOf('Drying') === -1) {//&& supportedProgress.indexOf('Rinse') === -1 removed on 12/20/2016 on the suggestion of yoon
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.rinseOnly = true;
                    $scope.rinseOnlyAtSetCourse = true;
                    $scope.rinseOnlySetByApp = false;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.rinseOnlyMain = true;
                    $scope.rinseOnlyAtSetCourseMain = true;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.rinseOnlySub = true;
                    $scope.rinseOnlyAtSetCourseSub = true;
                } else {
                    ;//Nothing
                }
            } else {
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.rinseOnly = false;
                    $scope.rinseOnlyAtSetCourse = false;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.rinseOnlyMain = false;
                    $scope.rinseOnlyAtSetCourseMain = false;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.rinseOnlySub = false;
                    $scope.rinseOnlyAtSetCourseSub = false;
                } else {
                    ;//Nothing
                }

            }
            if (supportedProgress.indexOf('Wash') === -1 && supportedProgress.indexOf('Rinse') === -1 && supportedProgress.indexOf('Drying') === -1) {//&& supportedProgress.indexOf('Rinse') === -1 removed on 12/20/2016 on the suggestion of yoon
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.spinOnly = true;
                    $scope.spinOnlySetByApp = false;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.spinOnlyMain = true;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.spinOnlySub = true;
                } else {
                    ;//Nothing
                }
            } else {
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.spinOnly = false;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.spinOnlyMain = false;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.spinOnlySub = false;
                } else {
                    ;//Nothing
                }

            }
            if (supportedProgress.indexOf('Wash') === -1) {//&& supportedProgress.indexOf('Rinse') === -1 removed on 12/20/2016 on the suggestion of yoon
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.washNotIncluded = true;
                    tempDisable = undefined;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.washNotIncludedMain = true;
                    tempDisableMain = undefined;//set it to undefined (default value)
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.washNotIncludedSub = true;
                    tempDisableSub = undefined;
                } else {
                    ;//Nothing
                }
            } else {
                if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                    $scope.washNotIncluded = false;
                }
                if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                    $scope.washNotIncludedMain = false;
                } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                    $scope.washNotIncludedSub = false;
                } else {
                    ;//Nothing
                }
            }
            if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                // This condition is added because if the dryingOnly is set by app due to course selection or other things it must be set to false ....because watch updates it after the update
                if ($scope.dryingOnlySetByApp) {
                    $scope.dryingOnly = false;
                    $scope.dryingOnlySetByApp = false;
                }
                if ($scope.spinOnlySetByApp) {
                    $scope.spinOnly = false;
                    $scope.spinOnlySetByApp = false;
                }
                if ($scope.rinseOnlySetByApp) {
                    $scope.rinseOnly = false;
                    $scope.rinseOnlySetByApp = false;
                }
                if (($scope.spinOnly || $scope.rinseOnly || $scope.dryingOnly || $scope.washNotIncluded))
                {
                    $scope.disabletempContents = true;
                    $scope.disablesoilContents = true;
                    tempDisable = undefined;//set it to undefined (default value)
                } else {
                    $scope.disabletempContents = false;
                    $scope.disablesoilContents = false;
                }
            }
            if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                if (($scope.spinOnlyMain || $scope.rinseOnlyMain || $scope.dryingOnlyMain || $scope.washNotIncludedMain))
                {
                    $scope.disabletempContentsMain = true;
                    $scope.disablesoilContentsMain = true;
                    tempDisableMain = undefined;//set it to undefined (default value)
                } else {
                    $scope.disabletempContentsMain = false;
                    $scope.disablesoilContentsMain = false;
                }

            } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                if (($scope.spinOnlySub || $scope.rinseOnlySub || $scope.dryingOnlySub || $scope.washNotIncludedSub))
                {
                    $scope.disabletempContentsSub = true;
                    $scope.disablesoilContentsSub = true;
                    tempDisableSub = undefined;//set it to undefined (default value)
                } else {
                    $scope.disabletempContentsSub = false;
                    $scope.disablesoilContentsSub = false;
                }
            } else {
                ;//Nothing
            }

        }
        updateProgressPercentage(operationValues);
        updateProgress();
    }

    function updateStatus(progressString) {
        console.log("updateStatus :: " + JSON.stringify(progressString));
//        if ($scope.cycFinish) {
//            return;
//        }
        if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0) && !$scope.cycFinish) {
            var ret = getStatusString(progressString);
            if (ret !== "-") {
                $scope.stringDisplay = ret;
            }
            switch (progressString) {
                case WASHER_PROGRESSDISPLAY.Wrinkleprevent:
                    $scope.wrinkleStart = false;
                    break;
                case WASHER_PROGRESSDISPLAY.Finish:
                    $scope.currentScreen = WASHERSCREENS.CYCLEFINISH;
                    $scope.cycFinish = true;
                    $scope.isNoti = false;
                    tempNoti = $scope.isNoti;
                    if (!$scope.laundrySwitch) {
                        $scope.disableLaundry = true;
                    }
                    break;
                default:
                    break;
            }
            if ($scope.deviceStatus === "Pause") {
                $scope.dispStatus = $scope.translation.WEBMOB_device_washer_progressing_paused;
            } else if ($scope.deviceStatus === "Run" && $scope.dispStatus === $scope.translation.WEBMOB_device_washer_progressing_paused) {
                $scope.dispStatus = getStatusString($scope.Device.Operation.progress);
            } else {
                $scope.dispStatus = $scope.stringDisplay;
            }
        }
        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER && !$scope.cycFinishMain) {
            var ret = getStatusString(progressString);
            if (ret !== "-") {
                $scope.stringDisplayMain = ret;
            }
            switch (progressString) {
                case WASHER_PROGRESSDISPLAY.Wrinkleprevent:
                    $scope.wrinkleStartMain = false;
                    break;
                case WASHER_PROGRESSDISPLAY.Finish:
                    $scope.currentScreen = WASHERSCREENS.CYCLEFINISH;
                    $scope.cycFinishMain = true;
                    $scope.isNotiMain = false;
                    tempNoti = $scope.isNotiMain;
                    if (!$scope.laundrySwitchMain) {
                        $scope.disableLaundryMain = true;
                    }
                    break;
                default:
                    break;
            }
            if ($scope.deviceStatusMain === "Pause") {
                $scope.dispStatusMain = $scope.translation.WEBMOB_device_washer_progressing_paused;
            } else if ($scope.deviceStatusMain === "Run" && $scope.dispStatusMain === $scope.translation.WEBMOB_device_washer_progressing_paused) {
                $scope.dispStatusMain = getStatusString($scope.mainWasherData.Operation.progress);
            } else {
                $scope.dispStatusMain = $scope.stringDisplayMain;
            }
        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER && !$scope.cycFinishSub) {
            var ret = getStatusString(progressString);
            if (ret !== "-") {
                $scope.stringDisplaySub = ret;
            }
            switch (progressString) {
                case WASHER_PROGRESSDISPLAY.Wrinkleprevent:
                    $scope.wrinkleStartSub = false;
                    break;
                case WASHER_PROGRESSDISPLAY.Finish:
                    $scope.currentScreen = WASHERSCREENS.CYCLEFINISH;
                    $scope.cycFinishSub = true;
                    $scope.isNotiSub = false;
                    tempNoti = $scope.isNotiSub;
                    if (!$scope.laundrySwitchSub) {
                        $scope.disableLaundrySub = true;
                    }
                    break;
                default:
                    break;
            }
            if ($scope.deviceStatusSub === "Pause") {
                $scope.dispStatusSub = $scope.translation.WEBMOB_device_washer_progressing_paused;
            } else if ($scope.deviceStatusSub === "Run" && $scope.dispStatusSub === $scope.translation.WEBMOB_device_washer_progressing_paused) {
                $scope.dispStatusSub = getStatusString($scope.subWasherData.Operation.progress);
            } else {
                $scope.dispStatusSub = $scope.stringDisplaySub;
            }
        } else {
            ;//Nothing
        }
    }

    function getStatusString(progressString) {
        switch (progressString) {
            case WASHER_PROGRESSDISPLAY.delaywash:
                if ($scope.dmName === "WF457") {
                    return $scope.translation.WEBMOB_device_washer_progressing_delay_start;
                } else {
                    return $scope.translation.WEBMOB_device_washer_progressing_delay_end;
                }
            case WASHER_PROGRESSDISPLAY.Weightsensing:
                return $scope.translation.WEBMOB_device_washer_progressing_load_sensing;
            case WASHER_PROGRESSDISPLAY.Prewash:
                return $scope.translation.WEBMOB_device_washer_progressing_prewashing;
            case WASHER_PROGRESSDISPLAY.Wash:
                return $scope.translation.WEBMOB_device_washer_progressing_washing;
            case WASHER_PROGRESSDISPLAY.Rinse:
                return $scope.translation.WEBMOB_device_washer_progressing_rinsing;
            case WASHER_PROGRESSDISPLAY.Spin:
                return $scope.translation.WEBMOB_device_washer_progressing_spin;
            case WASHER_PROGRESSDISPLAY.Sud:
                return $scope.translation.WEBMOB_device_washer_progressing_sud;
            case WASHER_PROGRESSDISPLAY.Drying:
                return $scope.translation.WEBMOB_device_washer_progressing_drying;
            case WASHER_PROGRESSDISPLAY.Airwash:
                return $scope.translation.WEBMOB_device_washer_progressing_airwashing;
            case WASHER_PROGRESSDISPLAY.Cooling:
                return $scope.translation.WEBMOB_device_washer_progressing_cooling;
            case WASHER_PROGRESSDISPLAY.Wrinkleprevent:
                return $scope.translation.WEBMOB_device_washer_progressing_wrinkle_preventing;
            case WASHER_PROGRESSDISPLAY.Finish:
                return $scope.translation.WEBMOB_device_washer_alarm_cycle_complete;
            case WASHER_PROGRESSDISPLAY.Waitend:
                return $scope.translation.WEBMOB_device_washer_progressing_waitending;
            case WASHER_PROGRESSDISPLAY.None:
                return "";
            default:
                return "-";
                break;
        }
    }

    function updateProgressPercentage(timeProgressUpdate) {
        if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
            if (angular.isDefined(timeProgressUpdate.remainingTime)) {
                $scope.remainingTime = timeProgressUpdate.remainingTime;
                $scope.remHrs = parseInt(($scope.remainingTime.substring(0, 2)), 10);
                $scope.remMin = parseInt(($scope.remainingTime.substring(3, 5)), 10);
                var strRemHrs = $scope.remHrs;
                var strRemMin = $scope.remMin;
                if ($scope.remHrs < 10) {
                    strRemHrs = "0" + $scope.remHrs;
                }
                if ($scope.remMin < 10) {
                    strRemMin = "0" + $scope.remMin;
                }
                $scope.remainingTime = strRemHrs + "hr " + strRemMin + "min";
            }
            if (angular.isDefined(timeProgressUpdate.progressPercentage)) {
                $scope.progresshead = true;
                if ($scope.current < $scope.max) {
                    $scope.current = timeProgressUpdate.progressPercentage;
                }
            }
        }
        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
            if (angular.isDefined(timeProgressUpdate.remainingTime)) {
                $scope.remainingTimeMain = timeProgressUpdate.remainingTime;
                $scope.remHrsMain = parseInt(($scope.remainingTimeMain.substring(0, 2)), 10);
                $scope.remMinMain = parseInt(($scope.remainingTimeMain.substring(3, 5)), 10);
                var strRemHrs = $scope.remHrsMain;
                var strRemMin = $scope.remMinMain;
                if ($scope.remHrsMain < 10) {
                    strRemHrs = "0" + $scope.remHrsMain;
                }
                if ($scope.remMinMain < 10) {
                    strRemMin = "0" + $scope.remMinMain;
                }
                $scope.remainingTimeMain = strRemHrs + "hr " + strRemMin + "min";
            }
            if (angular.isDefined(timeProgressUpdate.progressPercentage)) {
                $scope.progressheadMain = true;
                if ($scope.currentMain < $scope.max) {
                    $scope.currentMain = timeProgressUpdate.progressPercentage;
                }
            }
        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
            if (angular.isDefined(timeProgressUpdate.remainingTime)) {
                $scope.remainingTimeSub = timeProgressUpdate.remainingTime;
                $scope.remHrsSub = parseInt(($scope.remainingTimeSub.substring(0, 2)), 10);
                $scope.remMinSub = parseInt(($scope.remainingTimeSub.substring(3, 5)), 10);
                var strRemHrs = $scope.remHrsSub;
                var strRemMin = $scope.remMinSub;
                if ($scope.remHrsSub < 10) {
                    strRemHrs = "0" + $scope.remHrsSub;
                }
                if ($scope.remMinSub < 10) {
                    strRemMin = "0" + $scope.remMinSub;
                }
                $scope.remainingTimeSub = strRemHrs + "hr " + strRemMin + "min";
            }
            if (angular.isDefined(timeProgressUpdate.progressPercentage)) {
                $scope.progressheadSub = true;
                if ($scope.currentSub < $scope.max) {
                    $scope.currentSub = timeProgressUpdate.progressPercentage;
                }
            }
        } else {
            ;//Nothing
        }
    }

    function startFavorite(index) {
        sendSAData(SA_WASHER.MY_FAVORITE_PAGE.SCREEN, SA_WASHER.MY_FAVORITE_PAGE.START_NOW, $scope.myFavoriteList[index].courseEnum, 1);
        if ($scope.isStatic) {
            return;
        }

        if ($scope.isMultiSelectMode || !$scope.remoteControlEnabled || $scope.deviceStatus === 'Run' || $scope.deviceStatus === 'Pause' || $scope.disableFavoriteHeaterSpec(index)) {
            return;
        }

        var washerId = 0;
        var errormsgHotWarning = $scope.translation.WEBMOB_device_washer_alarm_device_control_error_msg;
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
            errormsgHotWarning = '[' + $scope.translation.WEBMOB_device_washer_comm_front_loader + ']<br>' + errormsgHotWarning;
        } else if ($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
            washerId = 1;
            errormsgHotWarning = '[' + $scope.translation.WEBMOB_device_washer_comm_top_loader + ']<br>' + errormsgHotWarning;
        } else {
            ;//Nothing
        }

        if ($scope.hotwarning) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_title,
                msg: errormsgHotWarning,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }

        startCommandFromFavIndex = index;

        //cancelCommandFromFav = true;
        //$scope.checkResponse.push(WASHER_COMMANDS.cancelWasher);
        SHPService.sendSHPCommand(CONSTANTS.PUT, cancelCommand(), "/" + $scope.peerId + "/devices/" + washerId + "/operation");
        startFavoriteAfterCancelCommand();
    }

    function startFavoriteAfterCancelCommand() {
        if ($scope.isStatic) {
            return;
        }

        var selectedFavourite = $scope.myFavoriteList[startCommandFromFavIndex];
        var washerId = 0;
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
            washerId = 1;
        }

        $scope.checkResponse.push(WASHER_COMMANDS.startWasher);
        if ($scope.syncTime && $scope.showSyncTime) {
            $scope.checkResponse.push(WASHER_COMMANDS.syncTime);
            SHPService.sendSHPCommand(CONSTANTS.PUT, syncTimerCommand(), "/" + $scope.peerId + "/devices/" + washerId + "/configuration/time");
        }
        SHPService.sendSHPCommand(CONSTANTS.PUT, getStartCommandMyFav(selectedFavourite.courseHex, 'Run', selectedFavourite.isTempEnabled, selectedFavourite.isRinseEnabled, selectedFavourite.isSpinEnabled, selectedFavourite.isSoilLevelEnabled, selectedFavourite.isDryComboEnabled, selectedFavourite.defaultTemp, selectedFavourite.defaultRinse, selectedFavourite.defaultSpin, selectedFavourite.defaultSoil, selectedFavourite.defaultDryCombo), "/" + $scope.peerId + "/devices/" + washerId);
        goToDetailPage();
    }

    function startProgress(washerId) {
        if (!$scope.isDualWasher) {
            washerId = 0;
        }
        if (!$scope.isStatic) {
            if ($scope.isDualWasher) {
                if ($scope.homePage) {
                    if (washerId === 0 && $scope.hotwarningMain || washerId === 1 && $scope.hotwarningSub) {
                        var errormsgHotWarning = $scope.translation.WEBMOB_device_washer_alarm_device_control_error_msg;
                        $scope.errorList.push({
                            title: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_title,
                            msg: errormsgHotWarning,
                            btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                            btnOkHandler: function () {
                                onOkClicked(true);
                            },
                            closeDialog: !true
                        });
                        changePopUpClass(true);
                        return;
                    }
                    var tempDeviceStatus = washerId === 0 ? $scope.deviceStatusMain : $scope.deviceStatusSub;
                    var eventActionOnScreen = washerId === 0 ? SA_WASHER.HOME.TOP_LOADER_START_PAUSE : SA_WASHER.HOME.FRONT_LOADER_START_PAUSE;
                    if (tempDeviceStatus === "Run") {
                        sendSAData(SA_WASHER.HOME.SCREEN, eventActionOnScreen, "Pause", 1);
                        $scope.checkResponse.push(WASHER_COMMANDS.pauseWasher);
                        SHPService.sendSHPCommand(CONSTANTS.PUT, pauseCommand(), "/" + $scope.peerId + "/devices/" + washerId + "/operation");
                    } else if ((tempDeviceStatus === "Ready") || (tempDeviceStatus === "Pause")) {
                        sendSAData(SA_WASHER.HOME.SCREEN, eventActionOnScreen, "Start", 1);
                        $scope.checkResponse.push(WASHER_COMMANDS.startWasher);
                        if (washerId === 0 && $scope.syncTimeMain && $scope.showSyncTimeMain) {
                            $scope.checkResponse.push(WASHER_COMMANDS.syncTime);
                            SHPService.sendSHPCommand(CONSTANTS.PUT, syncTimerCommand(), "/" + $scope.peerId + "/devices/" + washerId + "/configuration/time");
                        } else if (washerId === 1 && $scope.syncTimeSub && $scope.showSyncTimeSub) {
                            $scope.checkResponse.push(WASHER_COMMANDS.syncTime);
                            SHPService.sendSHPCommand(CONSTANTS.PUT, syncTimerCommand(), "/" + $scope.peerId + "/devices/" + washerId + "/configuration/time");
                        }
                        if (washerId === 0) {
                            SHPService.sendSHPCommand(CONSTANTS.PUT, getStartCommand($scope.currentCourseHexMain, 'Run', $scope.isRinseMain, $scope.isTempMain, $scope.isSpinMain, $scope.isSoilLevelMain, $scope.isDryComboLevelMain, WASHERTOUPDATE.MAINWASHER), "/" + $scope.peerId + "/devices/" + washerId);
                        } else {
                            SHPService.sendSHPCommand(CONSTANTS.PUT, getStartCommand($scope.currentCourseHexSub, 'Run', $scope.isRinseSub, $scope.isTempSub, $scope.isSpinSub, $scope.isSoilLevelSub, $scope.isDryComboLevelSub, WASHERTOUPDATE.SUBWASHER), "/" + $scope.peerId + "/devices/" + washerId);
                        }
                    } else {
                        ;//Nothing
                    }
                } else {
                    if ($scope.hotwarning) {
                        var errormsgHotWarning = $scope.translation.WEBMOB_device_washer_alarm_device_control_error_msg;
                        $scope.errorList.push({
                            title: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_title,
                            msg: errormsgHotWarning,
                            btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                            btnOkHandler: function () {
                                onOkClicked(true);
                            },
                            closeDialog: !true
                        });
                        changePopUpClass(true);
                        return;
                    }
                    if ($scope.kidsLock) {
                        $scope.errorList.push({
                            title: $scope.translation.WEBMOB_device_washer_alarm_child_lock_title,
                            msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_message,
                            btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                            btnOkHandler: function () {
                                onOkClicked(true);
                            },
                            closeDialog: !true
                        });
                        changePopUpClass(true);
                        return;
                    }
                    if (!$scope.remoteControlEnabled) {
                        $scope.errorList.push({
                            title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                            msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                            btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                            btnOkHandler: function () {
                                onOkClicked(true);
                            },
                            closeDialog: !true
                        });
                        changePopUpClass(true);
                        return;
                    }
                    washerId = $scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED ? 0 : 1;
                    var eventActionStartOnScreen = washerId === 0 ? SA_WASHER.TOP_LOAD_DETAIL_PAGE.START_BTN : SA_WASHER.FRONT_LOAD_DETAIL_PAGE.START_BTN;
                    var eventActionPauseOnScreen = washerId === 0 ? SA_WASHER.TOP_LOAD_DETAIL_PAGE.PAUSE_BTN : SA_WASHER.FRONT_LOAD_DETAIL_PAGE.PAUSE_BTN;
                    if (($scope.deviceStatus === "Run")) {
                        $scope.checkResponse.push(WASHER_COMMANDS.pauseWasher);
                        sendSAData(SA_WASHER.HOME.SCREEN, eventActionPauseOnScreen, "Pause", 1);
                        SHPService.sendSHPCommand(CONSTANTS.PUT, pauseCommand(), "/" + $scope.peerId + "/devices/" + washerId + "/operation");
                    } else if (($scope.deviceStatus === "Ready") || ($scope.deviceStatus === "Pause")) {
                        sendSAData(SA_WASHER.HOME.SCREEN, eventActionStartOnScreen, "Start", 1);
                        $scope.checkResponse.push(WASHER_COMMANDS.startWasher);
                        if ($scope.syncTime && $scope.showSyncTime) {
                            $scope.checkResponse.push(WASHER_COMMANDS.syncTime);
                            SHPService.sendSHPCommand(CONSTANTS.PUT, syncTimerCommand(), "/" + $scope.peerId + "/devices/" + washerId + "/configuration/time");
                        }
                        SHPService.sendSHPCommand(CONSTANTS.PUT, getStartCommand($scope.currentCourseHex, 'Run', $scope.isRinse, $scope.isTemp, $scope.isSpin, $scope.isSoilLevel, $scope.isDryComboLevel, WASHERTOUPDATE.SINGLEWASHER), "/" + $scope.peerId + "/devices/" + washerId);
                    } else {
                        ;//Nothing
                    }
                }

            } else {
                if ($scope.hotwarning) {
                    $scope.errorList.push({
                        title: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_title,
                        msg: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_msg,
                        btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                        btnOkHandler: function () {
                            onOkClicked(true);
                        },
                        closeDialog: !true
                    });
                    changePopUpClass(true);
                    return;
                }
                if ($scope.kidsLock) {
                    $scope.errorList.push({
                        title: $scope.translation.WEBMOB_device_washer_alarm_child_lock_title,
                        msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_message,
                        btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                        btnOkHandler: function () {
                            onOkClicked(true);
                        },
                        closeDialog: !true
                    });
                    changePopUpClass(true);
                    return;
                }
                if (!$scope.remoteControlEnabled) {
                    $scope.errorList.push({
                        title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                        msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                        btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                        btnOkHandler: function () {
                            onOkClicked(true);
                        },
                        closeDialog: !true
                    });
                    changePopUpClass(true);
                    return;
                }
                if (($scope.deviceStatus === "Run")) {
                    $scope.checkResponse.push(WASHER_COMMANDS.pauseWasher);
                    sendSAData(SA_WASHER.FRONT_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.FRONT_LOAD_DETAIL_PAGE.PAUSE_BTN, "Pause", 1);
                    SHPService.sendSHPCommand(CONSTANTS.PUT, pauseCommand(), "/" + $scope.peerId + "/devices/" + washerId + "/operation");
                } else if (($scope.deviceStatus === "Ready") || ($scope.deviceStatus === "Pause")) {
                    sendSAData(SA_WASHER.FRONT_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.FRONT_LOAD_DETAIL_PAGE.START_BTN, "Start", 1);
                    $scope.checkResponse.push(WASHER_COMMANDS.startWasher);
                    if ($scope.syncTime && $scope.showSyncTime) {
                        $scope.checkResponse.push(WASHER_COMMANDS.syncTime);
                        SHPService.sendSHPCommand(CONSTANTS.PUT, syncTimerCommand(), "/" + $scope.peerId + "/devices/" + washerId + "/configuration/time");
                    }
                    SHPService.sendSHPCommand(CONSTANTS.PUT, getStartCommand($scope.currentCourseHex, 'Run', $scope.isRinse, $scope.isTemp, $scope.isSpin, $scope.isSoilLevel, $scope.isDryComboLevel, WASHERTOUPDATE.SINGLEWASHER), "/" + $scope.peerId + "/devices/" + washerId);
                } else {
                    ;//Nothing
                }
            }
        } else {
            if (washerId === 0 && $scope.homePage) {
                $scope.onPauseMain = !$scope.onPauseMain;
                if ($scope.onPauseMain) {
                    $scope.dispStatusMain = $scope.translation.WEBMOB_device_washer_progressing_paused;
                }
                if (!$scope.onPauseMain) {
                    $scope.dispStatusMain = $scope.translation.WEBMOB_device_washer_progressing_washing;
                }
                if (!$scope.textDisplayMain) {
                    $scope.dispStatusMain = $scope.translation.WEBMOB_device_washer_progressing_ready;
                }
            } else if (washerId === 1 && $scope.homePage) {
                $scope.onPauseSub = !$scope.onPauseSub;
                if ($scope.onPauseSub) {
                    $scope.dispStatusSub = $scope.translation.WEBMOB_device_washer_progressing_paused;
                }
                if (!$scope.onPauseSub) {
                    $scope.dispStatusSub = $scope.translation.WEBMOB_device_washer_progressing_washing;
                }
                if (!$scope.textDisplaySub) {
                    $scope.dispStatusSub = $scope.translation.WEBMOB_device_washer_progressing_ready;
                }
            } else {
                if ($scope.onPause) {
                    $scope.textDisplay = true;
                    $scope.wrinkleStart = true;
                    document.getElementById("circularProgress").style.visibility = 'visible';
                    $scope.dispStatus = $scope.translation.WEBMOB_device_washer_progressing_washing;
                    $scope.current = 99;
                    $scope.estimationTime = " 1:30 PM";
                    $scope.progresshead = true;
                    if ($scope.detergent) {
                        $scope.disabledetergentOn = true;
                    } else {
                        $scope.disabledetergentOff = true;
                    }
                    if ($scope.softner) {
                        $scope.disablesoftnerOn = true;
                    } else {
                        $scope.disablesoftnerOff = true;
                    }
                    //updateStatus('Finish'); //commented for checking progress bar status
                }
                $scope.onPause = !$scope.onPause;
            }

        }
    }

    function powerButtonPressed() {
        $scope.cancelButtonPressed = true;
    }

    function updateProgress() {
        if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
            if (($scope.deviceStatus === "Run") || $scope.deviceStatus === "Pause") {
                updateClock();
                $scope.progressStart = true;
                $scope.progresshead = true;
                $scope.disableContents = true;
                $scope.disabletempContents = true;
                $scope.disablerinseContents = true;
                $scope.disablespinContents = true;
                $scope.disablesoilContents = true;
                document.getElementById("circularProgress").style.visibility = 'visible';
                updateSettingsDisable();
            } else if ($scope.deviceStatus === "Ready") {
                if (!$scope.cycFinish) {
                    document.getElementById("circularProgress").style.visibility = 'hidden';
                }
                $timeout.cancel(clearTime);
            } else {
                ;//Nothing
            }
        }
        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
            if (($scope.deviceStatusMain === "Run") || $scope.deviceStatusMain === "Pause") {
                updateClock();
                $scope.progressStartMain = true;
                $scope.progressheadMain = true;
                $scope.disableContentsMain = true;
                $scope.disabletempContentsMain = true;
                $scope.disablerinseContentsMain = true;
                $scope.disablespinContentsMain = true;
                $scope.disablesoilContentsMain = true;
                if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
                    document.getElementById("circularProgress").style.visibility = 'visible';
                }
                updateSettingsDisable();
            } else if ($scope.deviceStatusMain === "Ready") {
                if (!$scope.cycFinishMain) {
                    if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
                        document.getElementById("circularProgress").style.visibility = 'hidden';
                    }
                }
                $timeout.cancel(clearTime);
            } else {
                ;//Nothing
            }
        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
            if (($scope.deviceStatusSub === "Run") || $scope.deviceStatusSub === "Pause") {
                updateClock();
                $scope.progressStartSub = true;
                $scope.progressheadSub = true;
                $scope.disableContentsSub = true;
                $scope.disabletempContentsSub = true;
                $scope.disablerinseContentsSub = true;
                $scope.disablespinContentsSub = true;
                $scope.disablesoilContentsSub = true;
                if ($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                    document.getElementById("circularProgress").style.visibility = 'visible';
                }
                updateSettingsDisable();
            } else if ($scope.deviceStatusSub === "Ready") {
                if (!$scope.cycFinishSub) {
                    if ($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                        document.getElementById("circularProgress").style.visibility = 'hidden';
                    }
                }
                $timeout.cancel(clearTime);
            } else {
                ;//Nothing
            }
        } else {
            ;//Nothing
        }
    }

    function cancelProgress() {
        if ($scope.kidsLock) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_child_lock_title,
                msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_message,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            $scope.cancelButtonPressed = false;
            return;
        }
        if (!$scope.remoteControlEnabled) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            $scope.cancelButtonPressed = false;
            return;
        }
        if (!$scope.isStatic) {
            var washerId = 0;
            if ($scope.isDualWasher && $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                washerId = 1
            }
            sendSAData(SA_WASHER.CYCLE_CANCEL_POPUP.SCREEN, SA_WASHER.CYCLE_CANCEL_POPUP.YES_BTN, "Cancel Cycle", 1);
            $scope.checkResponse.push(WASHER_COMMANDS.cancelWasher);
            SHPService.sendSHPCommand(CONSTANTS.PUT, cancelCommand(), "/" + $scope.peerId + "/devices/" + washerId + "/operation");
            debugMessage("sending cancel command to washer");
        } else {
            if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                $scope.deviceStatus = "Ready";
            }
            if ($scope.isDualWasher && ($scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER || $scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED)) {
                $scope.deviceStatusMain = "Ready";
            } else if ($scope.isDualWasher && ($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER || $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED)) {
                $scope.deviceStatusSub = "Ready";
            } else {
                ;//Nothing
            }

            updateCancelProgres();
        }
        $scope.cancelButtonPressed = false;
    }

    function updateCancelProgres() {
        if (cancelCommandFromFav) {
            dismissLoadingBar(WASHER_COMMANDS.cancelWasher);
            cancelCommandFromFav = false;
            startFavoriteAfterCancelCommand();
            return;
        }

        closeAllPopups();
        if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
            document.getElementById("circularProgress").style.visibility = 'hidden';
            $scope.current = 0;
            $scope.appAlive = false;
            $scope.textDisplay = false;
            $scope.progressStart = false;
            $scope.progresshead = false;
            $scope.wrinkleStart = false;
            $scope.disableContents = false;
            $scope.disablesoilContents = false;
            $scope.disabletempContents = false;
            $scope.disablespinContents = false;
            $scope.disablerinseContents = false;
            if (!$scope.softenerNotUsed) {
                $scope.disablesoftnerOn = false;
                $scope.disablesoftnerOff = false;
            }
            if (!$scope.detergentNotUsed) {
                $scope.disabledetergentOn = false;
                $scope.disabledetergentOff = false;
            }
            $scope.onPause = true;
            $scope.isNoti = !true;
            tempNoti = $scope.isNoti;
        }
        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
            $scope.currentMain = 0;
            $scope.textDisplayMain = false;
            $scope.progressStartMain = false;
            $scope.progressheadMain = false;
            $scope.onPauseMain = true;
            $scope.wrinkleStartMain = false;
            $scope.disableContentsMain = false;
            $scope.disablesoilContentsMain = false;
            $scope.disabletempContentsMain = false;
            $scope.disablespinContentsMain = false;
            $scope.disablerinseContentsMain = false;
            if (!$scope.softenerNotUsedMain) {
                $scope.disablesoftnerOnMain = false;
                $scope.disablesoftnerOffMain = false;
            }
            if (!$scope.detergentNotUsedMain) {
                $scope.disabledetergentOnMain = false;
                $scope.disabledetergentOffMain = false;
            }
            $scope.isNotiMain = !true;
            tempNoti = $scope.isNotiMain;
        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
            $scope.currentSub = 0;
            $scope.textDisplaySub = false;
            $scope.progressStartSub = false;
            $scope.progressheadSub = false;
            $scope.onPauseSub = true;
            $scope.wrinkleStartSub = false;
            $scope.disableContentsSub = false;
            $scope.disablesoilContentsSub = false;
            $scope.disabletempContentsSub = false;
            $scope.disablespinContentsSub = false;
            $scope.disablerinseContentsSub = false;
            if (!$scope.softenerNotUsedSub) {
                $scope.disablesoftnerOnSub = false;
                $scope.disablesoftnerOffSub = false;
            }
            if (!$scope.detergentNotUsedSub) {
                $scope.disabledetergentOnSub = false;
                $scope.disabledetergentOffSub = false;
            }
            $scope.isNotiSub = !true;
            tempNoti = $scope.isNotiSub;
        } else {
            ;//Nothing
        }

        $timeout.cancel(clearTime);
        updateOptionsGUI();
        dismissLoadingBar(WASHER_COMMANDS.cancelWasher);
    }

    function updateSettingsDisable() {
        if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
            if ($scope.detergent) {
                $scope.disabledetergentOn = true;
            } else {
                $scope.disabledetergentOff = true;
            }
            if ($scope.softner) {
                $scope.disablesoftnerOn = true;
            } else {
                $scope.disablesoftnerOff = true;
            }
        }
        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
            if ($scope.detergentMain) {
                $scope.disabledetergentOnMain = true;
            } else {
                $scope.disabledetergentOffMain = true;
            }
            if ($scope.softnerMain) {
                $scope.disablesoftnerOnMain = true;
            } else {
                $scope.disablesoftnerOffMain = true;
            }
        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
            if ($scope.detergentSub) {
                $scope.disabledetergentOnSub = true;
            } else {
                $scope.disabledetergentOffSub = true;
            }
            if ($scope.softnerSub) {
                $scope.disablesoftnerOnSub = true;
            } else {
                $scope.disablesoftnerOffSub = true;
            }
        } else {
            ;//Nothing
        }

    }

    function onSettingsUpdate(id) {
        $timeout(function () {
            if ($scope.hotwarning) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_title,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_msg,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if ($scope.kidsLock) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_child_lock_title,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_message,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            var washerId = 0;
            if ($scope.isDualWasher && $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                washerId = 1
            }
            if (!$scope.remoteControlEnabled) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if (id === "syncTime") {
                if ($scope.isStatic) {
                    $scope.syncTime = !$scope.syncTime;
                    if ($scope.isDualWasher && $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                        $scope.syncTimeSub = !$scope.syncTimeSub;
                    } else if ($scope.isDualWasher && $scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
                        $scope.syncTimeMain = !$scope.syncTimeMain;
                    } else {
                        ;//Nothing
                    }
                }
                if (!$scope.isStatic && !$scope.syncTime) {
                    var syncTimeValue = $scope.syncTime ? 1 : 0;
                    sendSAData(SA_WASHER.SETTINGS.SCREEN, SA_WASHER.SETTINGS.SYBC_TIME_INFO, "Sync time info on/off", syncTimeValue);
                    $scope.checkResponse.push(WASHER_COMMANDS.syncTime);
                    SHPService.sendSHPCommand(CONSTANTS.PUT, syncTimerCommand(), "/" + $scope.peerId + "/devices/" + washerId + "/configuration/time");
                }
                if ($scope.syncTime) {
                    $scope.syncTime = !$scope.syncTime;
                    setLocalStorageData('WASHERsyncTime1', JSON.stringify($scope.syncTime));
                    if ($scope.isDualWasher && $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                        $scope.syncTimeSub = !$scope.syncTimeSub;
                        setLocalStorageData('WASHERsyncTimeSub1', JSON.stringify($scope.syncTimeSub));
                    } else if ($scope.isDualWasher && $scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
                        $scope.syncTimeMain = !$scope.syncTimeMain;
                        setLocalStorageData('WASHERsyncTimeMain1', JSON.stringify($scope.syncTimeMain));
                    } else {
                        ;//Nothing
                    }
                }
                return;
            }
            if ($scope.deviceStatus === "Run") {
                return;
            }

            switch (id) {
                case "detergent":
                    if ($scope.disabledetergentOff || $scope.disabledetergentOn || $scope.detergentNotUsed) {
                        return;
                    }
                    if (!$scope.isStatic) {
                        var autoDetergent = $scope.detergent ? 1 : 0;
                        sendSAData(SA_WASHER.SETTINGS.SCREEN, SA_WASHER.SETTINGS.AUTO_DETERGENT, "Auto detergent on/off", autoDetergent);
                        $scope.checkResponse.push(WASHER_COMMANDS.autoDetergent);
                        SHPService.sendSHPCommand(CONSTANTS.PUT, autoDetergentCommand(!$scope.detergent), "/" + $scope.peerId + "/devices/" + washerId + "/washer");
                        debugMessage("sending the autoDetergentCommand command to washer");
                    } else {
                        $scope.detergent = !$scope.detergent;
                    }
                    break;
                case "softner":
                    if ($scope.disablesoftnerOn || $scope.disablesoftnerOff || $scope.softenerNotUsed) {
                        return;
                    }
                    if (!$scope.isStatic) {
                        var autoSoftner = $scope.softner ? 1 : 0;
                        sendSAData(SA_WASHER.SETTINGS.SCREEN, SA_WASHER.SETTINGS.AUTO_SOFTNER, "Auto softener on/off", autoSoftner);
                        $scope.checkResponse.push(WASHER_COMMANDS.autosoftener);
                        SHPService.sendSHPCommand(CONSTANTS.PUT, autoSoftnerCommand(!$scope.softner), "/" + $scope.peerId + "/devices/" + washerId + "/washer");
                        debugMessage("sending the autoSoftnerCommand command to washer");
                    } else {
                        $scope.softner = !$scope.softner;
                    }
                    break;
                default:
                    break;
            }
            debugMessage(id);
        }, MATERIAL_DESIGN.TOGGLE_TIME);
    }

    function goToInformationPage() {
        if ($scope.isStatic) {
            //console.log("goToInformationPage: Its Static");
            $scope.currentScreen = WASHERSCREENS.INFORMATION;
            changeScreen();
        } else {
            //console.log("goToInformationPage: Before SHPService.sendSHPCommand call...");
            //SHPService.sendSHPCommand('GET', "/" + $scope.peerId + "/devices/0/information");
            //console.log("goToInformationPage:  After SHPService.sendSHPCommand called...");
            //TODO: Remove below code...when app get Information response.
            $scope.currentScreen = WASHERSCREENS.INFORMATION;
            changeScreen();
        }
    }

    $scope.moduleInfoOk = function () {
        $scope.showModuleInfoPopup = false;
        toggleBottomPopUpClass($scope.showModuleInfoPopup);
    };

    function parseModuleInformation(information) {
        if (angular.isDefined(information["description"])) {
            updateDeviceName(information["description"]);
        }
        SHPService.parseInformationResponse($scope, information);
    }

    function showOTNPopup() {
        //OTN popup 
        for (var i = 0; i < $scope.errorList.length; i++) {
            if ($scope.errorList[i].id === WASHER_ALERT_ID.OTN_POPUP) {
                return;
            }
        }
        $scope.alertState = WASHERALERT.OTN_UPDATE;
        $scope.errorList.push({
            id: WASHER_ALERT_ID.OTN_POPUP,
            title: $scope.translationCommon.WEBMOB_common_OTN_popup_title,
            msg: $scope.translationCommon.WEBMOB_common_OTN_popup_description.replace("#1#", $scope.deviceNameInitial),
            btnOkTxt: $scope.translation.WEBMOB_common_ok,
            btnOkHandler: function () {
                onOkClicked(true);
            },
            btnCancelTxt: $scope.translation.WEBMOB_common_cancel_capital,
            btnCancelHandler: onOkClicked,
            closeDialog: !true
        });
    }

    function cancelOTNRequest() {
        //OTN popup 
        //console.log('Display OTN popup');
        //$scope.alertState = -1;
        //$scope.errorList.pop(); //remove error from list        
        //Insert timestamp to localstorage
        setLocalStorageData($scope.deviceUuid + '_OTN_TIMESTAMP', new Date().getTime());

    }

    function sendOTNRequest() {
        //$scope.errorList.pop(); //remove error from list       
        //$scope.alertState = -1;
        if (!$scope.remoteControlEnabled) { //if smart control off then dont send command
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
        } else {
            //Clear OTN Popup display timestamp from localstorage
            removeLocalStorageData($scope.deviceUuid + '_OTN_TIMESTAMP');

            //if smart control is off then send command
            //var payload = '{"Versions":[{"id":"' + $scope.versionUpdateRequestId +'","userAgreement":true}]}';
            var payload = '{"Version":{"userAgreement":true}}';
            //show loading -> check with native whether they display loading and when to dismiss loading, currently loading is not shown
            //Need to handle - Error case for this command
            SHPService.sendSHPCommand("PUT", payload, "/" + $scope.peerId + "/devices/0/information/version/" + $scope.versionUpdateRequestId, false);
        }
    }

    function updateDetergentSoftner() {
        var det_title, det_message;
        var showdetPop = false;
        if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
            if ($scope.detergent && $scope.softner) {
                if (($scope.detergentlevel === WASHER_DETERGENT.Less) && ($scope.softnerlevel === WASHER_SOFTNER.Normal)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_msg_low;
                } else if (($scope.detergentlevel === WASHER_DETERGENT.Empty) && ($scope.softnerlevel === WASHER_SOFTNER.Normal)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_msg_empty;
                } else if (($scope.detergentlevel === WASHER_DETERGENT.Normal) && ($scope.softnerlevel === WASHER_SOFTNER.Less)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_msg_low;
                } else if (($scope.detergentlevel === WASHER_DETERGENT.Normal) && ($scope.softnerlevel === WASHER_SOFTNER.Empty)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_msg_empty;
                } else if (($scope.detergentlevel === WASHER_DETERGENT.Empty) && ($scope.softnerlevel === WASHER_SOFTNER.Empty)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_msg_empty;
                } else if (($scope.detergentlevel === WASHER_DETERGENT.Empty) && ($scope.softnerlevel === WASHER_SOFTNER.Less)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_msg_empty_low;
                } else if (($scope.detergentlevel === WASHER_DETERGENT.Less) && ($scope.softnerlevel === WASHER_SOFTNER.Empty)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_msg_low_empty;
                } else if (($scope.detergentlevel === WASHER_DETERGENT.Less) && ($scope.softnerlevel === WASHER_SOFTNER.Less)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_msg_low;
                } else if (($scope.detergentlevel === WASHER_DETERGENT.Normal) && ($scope.softnerlevel === WASHER_SOFTNER.Normal)) {
                    showdetPop = true;
                } else {
                    ;// Nothing           
                }
            } else if ($scope.detergent && !$scope.softner) {
                if ($scope.detergentlevel === WASHER_DETERGENT.Less) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_msg_low;
                } else if ($scope.detergentlevel === WASHER_DETERGENT.Empty) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_msg_empty;
                } else if ($scope.detergentlevel === WASHER_DETERGENT.Normal) {
                    showdetPop = true;
                } else {
                    ;// Nothing
                }
            } else if (!$scope.detergent && $scope.softner) {
                if ($scope.softnerlevel === WASHER_SOFTNER.Less) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_msg_low;
                } else if ($scope.softnerlevel === WASHER_SOFTNER.Empty) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_msg_empty;
                } else if ($scope.softnerlevel === WASHER_SOFTNER.Normal) {
                    showdetPop = true;
                } else {
                    ;// Nothing
                }
            } else {
                showdetPop = true;
            }
        }
        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
            if ($scope.detergentMain && $scope.softnerMain) {
                if (($scope.detergentlevelMain === WASHER_DETERGENT.Less) && ($scope.softnerlevelMain === WASHER_SOFTNER.Normal)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_msg_low;
                } else if (($scope.detergentlevelMain === WASHER_DETERGENT.Empty) && ($scope.softnerlevelMain === WASHER_SOFTNER.Normal)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_msg_empty;
                } else if (($scope.detergentlevelMain === WASHER_DETERGENT.Normal) && ($scope.softnerlevelMain === WASHER_SOFTNER.Less)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_msg_low;
                } else if (($scope.detergentlevelMain === WASHER_DETERGENT.Normal) && ($scope.softnerlevelMain === WASHER_SOFTNER.Empty)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_msg_empty;
                } else if (($scope.detergentlevelMain === WASHER_DETERGENT.Empty) && ($scope.softnerlevelMain === WASHER_SOFTNER.Empty)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_msg_empty;
                } else if (($scope.detergentlevelMain === WASHER_DETERGENT.Empty) && ($scope.softnerlevelMain === WASHER_SOFTNER.Less)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_msg_empty_low;
                } else if (($scope.detergentlevelMain === WASHER_DETERGENT.Less) && ($scope.softnerlevelMain === WASHER_SOFTNER.Empty)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_msg_low_empty;
                } else if (($scope.detergentlevelMain === WASHER_DETERGENT.Less) && ($scope.softnerlevelMain === WASHER_SOFTNER.Less)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_msg_low;
                } else if (($scope.detergentlevelMain === WASHER_DETERGENT.Normal) && ($scope.softnerlevelMain === WASHER_SOFTNER.Normal)) {
                    showdetPop = true;
                } else {
                    ;// Nothing           
                }
            } else if ($scope.detergentMain && !$scope.softnerMain) {
                if ($scope.detergentlevelMain === WASHER_DETERGENT.Less) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_msg_low;
                } else if ($scope.detergentlevelMain === WASHER_DETERGENT.Empty) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_msg_empty;
                } else if ($scope.detergentlevelMain === WASHER_DETERGENT.Normal) {
                    showdetPop = true;
                } else {
                    ;// Nothing
                }
            } else if (!$scope.detergentMain && $scope.softnerMain) {
                if ($scope.softnerlevelMain === WASHER_SOFTNER.Less) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_msg_low;
                } else if ($scope.softnerlevelMain === WASHER_SOFTNER.Empty) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_msg_empty;
                } else if ($scope.softnerlevelMain === WASHER_SOFTNER.Normal) {
                    showdetPop = true;
                } else {
                    ;// Nothing
                }
            } else {
                showdetPop = true;
            }
        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
            if ($scope.detergentSub && $scope.softnerSub) {
                if (($scope.detergentlevelSub === WASHER_DETERGENT.Less) && ($scope.softnerlevelSub === WASHER_SOFTNER.Normal)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_msg_low;
                } else if (($scope.detergentlevelSub === WASHER_DETERGENT.Empty) && ($scope.softnerlevelSub === WASHER_SOFTNER.Normal)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_msg_empty;
                } else if (($scope.detergentlevelSub === WASHER_DETERGENT.Normal) && ($scope.softnerlevelSub === WASHER_SOFTNER.Less)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_msg_low;
                } else if (($scope.detergentlevelSub === WASHER_DETERGENT.Normal) && ($scope.softnerlevelSub === WASHER_SOFTNER.Empty)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_msg_empty;
                } else if (($scope.detergentlevelSub === WASHER_DETERGENT.Empty) && ($scope.softnerlevelSub === WASHER_SOFTNER.Empty)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_msg_empty;
                } else if (($scope.detergentlevelSub === WASHER_DETERGENT.Empty) && ($scope.softnerlevelSub === WASHER_SOFTNER.Less)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_msg_empty_low;
                } else if (($scope.detergentlevelSub === WASHER_DETERGENT.Less) && ($scope.softnerlevelSub === WASHER_SOFTNER.Empty)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_msg_low_empty;
                } else if (($scope.detergentlevelSub === WASHER_DETERGENT.Less) && ($scope.softnerlevelSub === WASHER_SOFTNER.Less)) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_softener_msg_low;
                } else if (($scope.detergentlevelSub === WASHER_DETERGENT.Normal) && ($scope.softnerlevelSub === WASHER_SOFTNER.Normal)) {
                    showdetPop = true;
                } else {
                    ;// Nothing           
                }
            } else if ($scope.detergentSub && !$scope.softnerSub) {
                if ($scope.detergentlevelSub === WASHER_DETERGENT.Less) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_msg_low;
                } else if ($scope.detergentlevelSub === WASHER_DETERGENT.Empty) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_detergent_msg_empty;
                } else if ($scope.detergentlevelSub === WASHER_DETERGENT.Normal) {
                    showdetPop = true;
                } else {
                    ;// Nothing
                }
            } else if (!$scope.detergentSub && $scope.softnerSub) {
                if ($scope.softnerlevelSub === WASHER_SOFTNER.Less) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_msg_low;
                } else if ($scope.softnerlevelSub === WASHER_SOFTNER.Empty) {
                    det_title = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_title;
                    det_message = $scope.translation.WEBMOB_device_washer_alarm_remain_softener_msg_empty;
                } else if ($scope.softnerlevelSub === WASHER_SOFTNER.Normal) {
                    showdetPop = true;
                } else {
                    ;// Nothing
                }
            } else {
                showdetPop = true;
            }
        } else {
            ;//Nothing
        }

        if (!showdetPop) {
            $scope.alertState = WASHERALERT.AUTODETERGENT;
            debugMessage(det_title + "::" + det_message);
            $scope.errorList.push({
                title: det_title,
                msg: det_message,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    sendSAData(SA_WASHER.AUTO_DETERGENT_SOFTENER_POPUP.SCREEN, SA_WASHER.AUTO_DETERGENT_SOFTENER_POPUP.OK_BTN, "", "");
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
        }
    }

    function settings() {
        if ($scope.cycFinish) {
            return;
        }
        toggleAnimClass();
        $timeout(function () {
            toggleAnimClass();
            $scope.currentScreen = WASHERSCREENS.SETTINGS;
            changeScreen();
        }, MATERIAL_DESIGN.LIST_ANIMATION_TIME);
    }
    
    function openAbout() {
        $scope.currentScreen = WASHERSCREENS.OPTIONS;
        changeScreen();
    }
    
    function showDrainFilterOption() {
        $scope.currentScreen = WASHERSCREENS.DRAINFILTEROPTION;
        changeScreen();
    }
    
    function openDrainFilterUsageGuide() {
        $scope.currentScreen = WASHERSCREENS.DRAINFILTERGUIDEPAGE;
        changeScreen();
    }
    
    function goToHome() {
        if (!CountryService.isCountryExists()) {
            $scope.currentScreen = WASHERSCREENS.COUNTRYLIST;
            changeScreen();
        } else {
            if ($scope.isDualWasher) {
                $scope.modePopup = false;
                $scope.currentScreen = WASHERSCREENS.HOME;
                changeScreen();
                var hasLaunchedBefore = getLocalStorageForFirstLaunch('firstTimeLaunchHomePage');
                if (!hasLaunchedBefore) {
                    showUsageHelpPage();
                }
            } else {
                if ($scope.isTopLoader) {
                    showDetailPage(1);
                } else {
                    showDetailPage(0);
                }
            }
        }
    }

    function goToDetailPage() {
        $scope.currentScreen = WASHERSCREENS.DETAILPAGE;
        changeScreen();
        if ($scope.Device.id === "1") {
            var hasLaunchedBefore = getLocalStorageForFirstLaunch('firstTimeLaunchDetailPageTopLoad');
            if (!hasLaunchedBefore) {
                showUsageHelpPage();
            }
        } else if ($scope.Device.id === "0") {
            var hasLaunchedBefore = getLocalStorageForFirstLaunch('firstTimeLaunchDetailPageFrontLoad');
            if (!hasLaunchedBefore) {
                showUsageHelpPage();
            }
        } else {
            ;//Nothing
        }
    }

    function options() {
        if ($scope.cycFinish) {
            return;
        }
        toggleAnimClass();
        $timeout(function () {
            toggleAnimClass();
            $scope.currentScreen = WASHERSCREENS.OPTIONS;
            changeScreen();
        }, MATERIAL_DESIGN.LIST_ANIMATION_TIME);
    }

    function changeScreen() {
        $scope.isNoti = !true;
        $scope.homePage = false;
        $scope.pageloaded = true;
        $scope.aboutPage = false;
        $scope.detailPage = false;
        $scope.cycleFinish = false;
        $scope.settingPage = false;
        $scope.errormesaeg = false;
        $scope.addWashPage = false;
        $scope.smartcarepage = false;
        $scope.errorTextpage = false;
        $scope.laundryOutPage = false;
        $scope.smartcareerror = false;
        $scope.myFavoritePage = false;
        $scope.opensourcePage = false;
        $scope.informationPage = false;
        $scope.addFavoritePage = false;
        $scope.energyMonitorPage = false;
        $scope.drainFilterOption = false;
        $scope.korComboSettingPage = false;
        $scope.drumCleanHistoryPage = false;
        $scope.korComboSettingPageFav = false;
        $scope.selectCycleForFavoritePage = false;
        $scope.showCountryList = false;

        var scrollAreaClass;
        if ($scope.isAppV2) {
            scrollAreaClass = 'scrollable_area_others scrollable_area_others_V2';
        } else {
            scrollAreaClass = 'scrollable_area_others';
        }
        switch ($scope.currentScreen) {
            case WASHERSCREENS.HOME:
                $scope.backText = $scope.translation.WEBMOB_device_washer_comm_dual_washer;
                $scope.homePage = true;
                $scope.isNoti = false;
                break;
            case WASHERSCREENS.DETAILPAGE:
//                if ($scope.isAppV2) {
//                    scrollAreaClass = 'scrollable_area scrollable_area_V2';
//                } else {
//                    scrollAreaClass = 'scrollable_area';
//                }
//                $scope.backText = $scope.translation.WEBMOB_common_device_washer;
                $scope.backText = $scope.deviceNameInitial;
                if ($scope.isDualWasher) {
                    $scope.backText = $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED ? $scope.translation.WEBMOB_device_washer_comm_top_loader : $scope.translation.WEBMOB_device_washer_comm_front_loader;
                }
                $scope.detailPage = true;
                $scope.isNoti = tempNoti;
                break;
            case WASHERSCREENS.SETTINGS:
                $scope.backText = $scope.translation.WEBMOB_common_settings;
                $scope.settingPage = true;
                sendSAData(SA_WASHER.SETTINGS.SCREEN, "", "", "");
                break;
            case WASHERSCREENS.OPTIONS:
                $scope.backText = $scope.translation.WEBMOB_common_about_device;
                $scope.aboutPage = true;
                break;
            case WASHERSCREENS.CYCLEFINISH:
                $scope.cycleFinish = true;
                $scope.cycleName = $scope.currentCourseEnum;
                $scope.backText = $scope.translation[$scope.cycleName];
                $scope.cycleFinishString = $scope.translation.WEBMOB_device_washer_alarm_cycle_complete;
                break;
            case WASHERSCREENS.ERRORTEXT:
                $scope.backText = "Error List";
                $scope.errorTextpage = true;
                break;
            case WASHERSCREENS.ALARMSCREEN:
                if ($scope.serviceCenterNumber !== undefined) {
                    if ($scope.serviceCenterNumber.indexOf(',') !== -1) {
                        $scope.dialCallNum = $scope.serviceCenterNumber.split(",");
                    } else {
                        $scope.dialCallNum[0] = $scope.serviceCenterNumber;
                    }
                    $scope.dialCallNumLength = $scope.dialCallNum.length;
                }
                //$scope.phoneNumbers = $scope.serviceCenterNumber;
                $scope.backText = $scope.translation.WEBMOB_common_device_washer;
                if ($scope.isDualWasher) {
                    $scope.backText = $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED ? $scope.translation.WEBMOB_device_washer_comm_top_loader : $scope.translation.WEBMOB_device_washer_comm_front_loader;
                }
                $scope.errormesaeg = true;
                break;
            case WASHERSCREENS.ENERGYMONITOR:
                $scope.backText = $scope.translation.WEBMOB_common_energy_monitor_title;
                $scope.energyMonitorPage = true;
                break;
            case WASHERSCREENS.SMARTCARE:
                $scope.backText = $scope.translation.WEBMOB_common_self_diagnosis;
                $scope.smartcarepage = true;
                break;
            case WASHERSCREENS.SMARTCAREERROR:
                $scope.backText = $scope.translation.WEBMOB_common_self_diagnosis;
                $scope.smartcareerror = true;
                break;
            case WASHERSCREENS.ADDWASHPAGE:
                if (!$scope.isDualWasher) {
                    if ($scope.isTopLoader) {
                        $scope.backText = '';
                    } else {
                        $scope.backText = $scope.translation.WEBMOB_device_washer_settings_addwash_alarm;
                    }
                } else {
                    $scope.backText = $scope.translation.WEBMOB_device_washer_settings_addwash_alarm;
                }
                $scope.addWashPage = true;
                decodeAddWashValue($scope.currentAddWashValue, 0);
                break;
            case WASHERSCREENS.LAUNDRYOUTPAGE:
                $scope.backText = $scope.translation.WEBMOB_device_washer_settings_remaining_laundry;
                $scope.laundryOutPage = true;
                break;
            case WASHERSCREENS.KOREANCOMBOSETTINGPAGE:
                $scope.korComboSettingPage = true;
                $scope.backText = $scope.translation.WEBMOB_device_washer_option_dry_combo;
                break;
            case WASHERSCREENS.KOREANCOMBOSETTINGPAGEFAV:
                $scope.korComboSettingPageFav = true;
                $scope.backText = $scope.translation.WEBMOB_device_washer_option_dry_combo;
                break;
            case WASHERSCREENS.MYFAVORITE:
                $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED ? sendSAData(SA_WASHER.TOP_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.TOP_LOAD_DETAIL_PAGE.BOTTOM_MY_FAVORITE_OPTION, "", "") : sendSAData(SA_WASHER.FRONT_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.FRONT_LOAD_DETAIL_PAGE.BOTTOM_MY_FAVORITE_OPTION, "", "");
                $scope.backText = $scope.translation.WEBMOB_device_washer_settings_my_favorite;
                $scope.myFavoritePage = true;
                break;
            case WASHERSCREENS.DRUMCLEANHISTORY:
                $scope.backText = $scope.translation.WEBMOB_device_washer_settings_drum_clean_history;
                $scope.drumCleanHistoryPage = true;
                break;
            case WASHERSCREENS.ADDFAVORITE:
                $scope.addFavoritePage = true;
                break;
            case WASHERSCREENS.CYCLEMYFAVORITE:
                $scope.backText = $scope.translation.WEBMOB_device_washer_comm_cycle;
                $scope.selectCycleForFavoritePage = true;
                break;
            case WASHERSCREENS.FREEZEPROTECTIONALARMPAGE:
                $scope.backText = $scope.translation.WEBMOB_device_washer_settings_freeze_protection_alarm;
                $scope.freezeProtectionAlarmValueTemp = $scope.freezeProtectionAlarmValue;
                $scope.freezeProtectionAlarmPage = true;
                break;
            case WASHERSCREENS.INFORMATION:
                $scope.informationPage = true;
                //$scope.deviceType = $scope.translation.WEBMOB_common_device_information;
                $scope.backText = $scope.translationCommon.WEBMOB_common_device_information;
                break;
            case WASHERSCREENS.OPENSOURCE:
                $scope.opensourcePage = true;
                //currently added as a hardcoded , need to discuss with MR JEON to move this page on server side.                
                $scope.backText = $scope.translationCommon.WEBMOB_common_device_open_source_license;
                break;
            case WASHERSCREENS.COUNTRYLIST:
                $scope.showCountryList = true;
                $scope.backText = $scope.translationCommon.WEBMOB_common_device_select_a_country;
                CountryService.scrollToSelectedCountry();
                break;
            case WASHERSCREENS.DRAINFILTEROPTION:
                $scope.drainFilterOption = true;
                $scope.backText = $scope.translation.WEBMOB_device_washer_comm_usage_guide;
                break;
            case WASHERSCREENS.DRAINFILTERGUIDEPAGE:
                $scope.drainFilterGuidePage = true;
                $scope.backText = $scope.translation.WEBMOB_device_washer_usageguide_drain_filter;
                break;
            default:
                $scope.backText = $scope.translation.WEBMOB_common_device_washer;
                break;
        }
        document.getElementById("scrollSettings").className = scrollAreaClass;
    }

    // On back key pressed
    function onBackPressed() {

        if ($scope.showModuleInfoPopup) {
            $scope.showModuleInfoPopup = false;
            return;
        }

        if (!$scope.mainLoadingScreen) {
            closeApp();
            return;
        }
        $timeout(function () {

            if ($scope.alertState === WASHERALERT.CONNECTION_FAILURE) {
                if ($scope.currentScreen !== WASHERSCREENS.CYCLEFINISH) {
                    closeApp();
                    return;
                }
            }

            toggleBottomPopUpClass(false);
            changePopUpClass(false);
            if ($scope.countrySelectionPopupVisible) {
                $scope.countrySelectionPopupVisible = false;
                return;
            }
            if ($scope.samrtControlPopup) {
                $scope.samrtControlPopup = false;
                return;
            }
            if ($scope.diagnosisState === "Run") {
                return;
            }
            if ($scope.custDialogpopup) {
                $scope.custDialogpopup = false;
                return;
            }
            if ($scope.modePopup) {
                if (angular.isDefined($scope.mostUsed)) {
                    $scope.listItemsModes[0].CourseEnum = mostUsedCourseName;
                }
                $scope.modePopup = false;
                return;
            }
            if ($scope.tempPopup) {
                $scope.tempPopup = false;
                return;
            }
            if ($scope.spinPopup) {
                $scope.spinPopup = false;
                return;
            }
            if ($scope.rinsePopup) {
                $scope.rinsePopup = false;
                return;
            }
            if ($scope.soilPopup) {
                $scope.soilPopup = false;
                return;
            }
            if ($scope.isKoreanComboSubOption) {
                $scope.isKoreanComboSubOption = false;
                return;
            }
            if ($scope.bOptionPopUp) {
                $scope.bOptionPopUp = false;
                return;
            }
            if ($scope.setEndTimePopUpVisible) {
                $scope.setEndTimePopUpVisible = false;
                return;
            }
            if ($scope.bUsageHelpPage) {
                $scope.bUsageHelpPage = false;
                changePopUpClass(false);
                return;
            }
            closeMyFavPopUps();
            if (favPopUpChanged) {
                return;
            }
            if ($scope.errorList.length > 0) {
                if (angular.isDefined($scope.errorList[$scope.errorList.length - 1].id) && $scope.errorList[$scope.errorList.length - 1].id === WASHERALERT.OTN_UPDATE) {
                    $scope.errorList.pop();
                    $scope.alertState = -1;
                    cancelOTNRequest();
                    return;
                }
                var poppedObj = $scope.errorList.pop();
                if (poppedObj["msg"] === $scope.translation.WEBMOB_device_washer_alarm_smart_control_off_washer_msg) {
                    getSmartControlNoti = false;
                }
                document.getElementById("scrollSettings").style.overflowY = "overlay";
                return;
            }
            
            if ($scope.isMultiSelectMode) {
                $scope.isMultiSelectMode = false;
                $scope.bAllListSelected = false;
                $scope.isAnyCheckedItem = false;
                return;
            }
            
            switch ($scope.currentScreen) {
                case WASHERSCREENS.SETTINGS:
                    sendSAData(SA_WASHER.SETTINGS.SCREEN, SA_WASHER.SETTINGS.BACK, "", "");
                    $scope.showDemoErrorList = !true;
                    if ($scope.errorList.length > 0) {
                        $scope.errorList.pop();
                        document.getElementById("scrollSettings").style.overflowY = "overlay";
                        return;
                    }
                    goToDetailPage();
                    break;
                case WASHERSCREENS.OPTIONS:
                    $scope.showDemoErrorList = !true;
                    if ($scope.errorList.length > 0) {
                        $scope.errorList.pop();
                        document.getElementById("scrollSettings").style.overflowY = "overlay";
                        return;
                    }
                    goToDetailPage();
                    break;
                case WASHERSCREENS.MYFAVORITE:
                    sendSAData(SA_WASHER.MY_FAVORITE_PAGE.SCREEN, SA_WASHER.MY_FAVORITE_PAGE.BACK, "", "");
                    $scope.showDemoErrorList = !true;
                    if ($scope.errorList.length > 0) {
                        $scope.errorList.pop();
                        document.getElementById("scrollSettings").style.overflowY = "overlay";
                        return;
                    }
                    goToDetailPage();
                    break;
                case WASHERSCREENS.DRUMCLEANHISTORY:
                    sendSAData(SA_WASHER.CLEAN_HISTORY_PAGE.SCREEN, SA_WASHER.CLEAN_HISTORY_PAGE.BACK, "", "");
                    $scope.currentScreen = WASHERSCREENS.SETTINGS;
                    changeScreen();
                    break;
                case WASHERSCREENS.ENERGYMONITOR:
                    sendSAData(SA_WASHER.ENERGY_MONITOR.SCREEN, SA_WASHER.ENERGY_MONITOR.BACK, "", "");
                    $scope.currentScreen = WASHERSCREENS.SETTINGS;
                    changeScreen();
                    break;
                case WASHERSCREENS.DETAILPAGE:
                    if (!$scope.isDualWasher) {
                        $scope.closeApp();
                        return;
                    }
                    if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
                        sendSAData(SA_WASHER.TOP_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.TOP_LOAD_DETAIL_PAGE.BACK, "", "");
                    } else {
                        sendSAData(SA_WASHER.FRONT_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.FRONT_LOAD_DETAIL_PAGE.BACK, "", "");
                    }
                    updateHomePageDataForDualWasher();
                    goToHome();
                    break;
                case WASHERSCREENS.HOME:
                    sendSAData(SA_WASHER.HOME.SCREEN, SA_WASHER.HOME.BACK, "", "");
                    $scope.closeApp();
                    break;
                case WASHERSCREENS.ALARMSCREEN:
                    if ($scope.custDialogpopup) {
                        $scope.custDialogpopup = false;
                        return;
                    }
                    if (errorDemoPage && !chatErrorPage) {
                        $scope.currentScreen = WASHERSCREENS.ERRORTEXT;
                        changeScreen();
                    } else {
                        if ($scope.isDualWasher) {
                            goToHome();
                        } else {
                            alarmConfirm();
                        }
                    }
                    break;
                case WASHERSCREENS.CYCLEFINISH:
                    if ($scope.isDualWasher) {
                        goToHome();
                    } else {
                        alarmConfirm();
                    }
                    break;
                case WASHERSCREENS.ERRORTEXT:
                    $scope.currentScreen = WASHERSCREENS.DETAILPAGE;
                    changeScreen();
                    break;
                case WASHERSCREENS.SMARTCARE:
                    $scope.currentScreen = WASHERSCREENS.DETAILPAGE;
                    if (previousScreenAtSelfCheck) {
                        $scope.currentScreen = previousScreenAtSelfCheck;
                        previousScreenAtSelfCheck = undefined;
                    }
                    changeScreen();
                    break;
                case WASHERSCREENS.SMARTCAREERROR:
                    sendSAData(SA_WASHER.SMART_CHECK_ERROR_PAGE.SCREEN, SA_WASHER.SMART_CHECK_ERROR_PAGE.BACK, "", "");
                    $scope.currentScreen = WASHERSCREENS.DETAILPAGE;
                    if (previousScreenAtSelfCheck) {
                        $scope.currentScreen = previousScreenAtSelfCheck;
                        previousScreenAtSelfCheck = undefined;
                    }
                    changeScreen();
                    break;
                case WASHERSCREENS.ADDWASHPAGE:
                    sendSAData(SA_WASHER.ADD_WASH_ALARM_PAGE.SCREEN, SA_WASHER.ADD_WASH_ALARM_PAGE.BACK, "", "");
                    onSaveAddWashSelection();
                    $scope.currentScreen = WASHERSCREENS.SETTINGS;
                    changeScreen();
                    break;
                case WASHERSCREENS.LAUNDRYOUTPAGE:
                    sendSAData(SA_WASHER.REMAINING_LAUNDRY_PAGE.SCREEN, SA_WASHER.REMAINING_LAUNDRY_PAGE.BACK, "", "");
                    if ((!$scope.isStatic) && (tempLaundryVal !== currentLaundryVal)) {
                        var washerId = 0;
                        if ($scope.isDualWasher && $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                            washerId = 1
                        }
                        $scope.checkResponse.push(WASHER_COMMANDS.laundry);
                        SHPService.sendSHPCommand(CONSTANTS.PUT, laundryOut(), "/" + $scope.peerId + "/devices/" + washerId);
                        debugMessage("sending the autoSoftnerCommand command to washer");
                    }
                    laundryStatusText();
                    goToDetailPage();
                    break;
                case WASHERSCREENS.KOREANCOMBOSETTINGPAGE:
                    updateDryComboValue();
                    goToDetailPage();
                    break;
                case WASHERSCREENS.KOREANCOMBOSETTINGPAGEFAV:
                    updateDryComboValueFav();
                    $scope.currentScreen = WASHERSCREENS.ADDFAVORITE;
                    changeScreen();
                    break;
                case WASHERSCREENS.CYCLEMYFAVORITE:
                    sendSAData(SA_WASHER.SELECT_CYCLE_FOR_FAVORITE_PAGE.SCREEN, SA_WASHER.SELECT_CYCLE_FOR_FAVORITE_PAGE.BACK, "", "");
                    $scope.currentScreen = WASHERSCREENS.ADDFAVORITE;
                    changeScreen();
                    break;
                case WASHERSCREENS.ADDFAVORITE:
                    $scope.currentScreen = WASHERSCREENS.MYFAVORITE;
                    changeScreen();
                    break;
                case WASHERSCREENS.FREEZEPROTECTIONALARMPAGE:
                    sendSAData(SA_WASHER.FREEZE_ALARM_PAGE.SCREEN, SA_WASHER.FREEZE_ALARM_PAGE.BACK, "", "");
                    onSaveFreezeProtectionAlarmSelection();
                    $scope.currentScreen = WASHERSCREENS.SETTINGS;
                    changeScreen();
                    break;
                case WASHERSCREENS.INFORMATION:
                    $scope.currentScreen = WASHERSCREENS.DETAILPAGE;
                    changeScreen();
                    break;
                case WASHERSCREENS.OPENSOURCE:
                    $scope.currentScreen = WASHERSCREENS.INFORMATION;
                    changeScreen();
                    break;
                case WASHERSCREENS.COUNTRYLIST:
                    CountryService.clearSearchInputData();
                    if (CountryService.isCountryExists()) {
                        $scope.currentScreen = WASHERSCREENS.DETAILPAGE;
                        changeScreen();
                    } else {
                        closeApp();
                        return;
                    }
                    break;
                case WASHERSCREENS.DRAINFILTEROPTION:
                    goToHome();
                    break;
                case WASHERSCREENS.DRAINFILTERGUIDEPAGE:
                    $scope.currentScreen = WASHERSCREENS.DRAINFILTEROPTION;
                    changeScreen();
                    break;
                default:
                    break;
            }
        }, MATERIAL_DESIGN.BACK_ANIMTION_TIMEOUT);
    }

    function laundryStatusText() {
        if (!$scope.laundrySwitch) {
            $scope.laundryOnOffText = $scope.translation.WEBMOB_device_washer_comm_off_CL;
        } else if ($scope.laundryOpt2) {
            $scope.laundryOnOffText = $scope.translation.WEBMOB_device_washer_laundryout_every_30min;
        } else if ($scope.laundryOpt3) {
            $scope.laundryOnOffText = $scope.translation.WEBMOB_device_washer_laundryout_every_60min;
        } else if ($scope.laundryOpt4) {
            $scope.laundryOnOffText = $scope.translation.WEBMOB_device_washer_laundryout_every_90min;
        } else {
            //Do Nothing
        }
    }

    function updateLaundryStatusText() {
        if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
            if (!$scope.laundrySwitch) {
                $scope.laundryOnOffText = $scope.translation.WEBMOB_device_washer_comm_off_CL;
            } else if ($scope.laundryOpt2) {
                $scope.laundryOnOffText = $scope.translation.WEBMOB_device_washer_laundryout_every_30min;
            } else if ($scope.laundryOpt3) {
                $scope.laundryOnOffText = $scope.translation.WEBMOB_device_washer_laundryout_every_60min;
            } else if ($scope.laundryOpt4) {
                $scope.laundryOnOffText = $scope.translation.WEBMOB_device_washer_laundryout_every_90min;
            } else {
                ;//Do Nothing
            }
        }
        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
            if (!$scope.laundrySwitchMain) {
                $scope.laundryOnOffTextMain = $scope.translation.WEBMOB_device_washer_comm_off_CL;
            } else if ($scope.laundryOpt2Main) {
                $scope.laundryOnOffTextMain = $scope.translation.WEBMOB_device_washer_laundryout_every_30min;
            } else if ($scope.laundryOpt3Main) {
                $scope.laundryOnOffTextMain = $scope.translation.WEBMOB_device_washer_laundryout_every_60min;
            } else if ($scope.laundryOpt4Main) {
                $scope.laundryOnOffTextMain = $scope.translation.WEBMOB_device_washer_laundryout_every_90min;
            } else {
                ;//Do Nothing
            }
        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
            if (!$scope.laundrySwitchSub) {
                $scope.laundryOnOffTextSub = $scope.translation.WEBMOB_device_washer_comm_off_CL;
            } else if ($scope.laundryOpt2Sub) {
                $scope.laundryOnOffTextSub = $scope.translation.WEBMOB_device_washer_laundryout_every_30min;
            } else if ($scope.laundryOpt3Sub) {
                $scope.laundryOnOffTextSub = $scope.translation.WEBMOB_device_washer_laundryout_every_60min;
            } else if ($scope.laundryOpt4Sub) {
                $scope.laundryOnOffTextSub = $scope.translation.WEBMOB_device_washer_laundryout_every_90min;
            } else {
                ;//Do Nothing
            }
        } else {
            ;//Nothing
        }
    }

    function closeNoti() {
        $scope.isNoti = false;
        tempNoti = $scope.isNoti;
    }

    function closeAllPopups() {
        if ($scope.custDialogpopup && ($scope.alertState !== WASHERALERT.CONNECTION_FAILURE && $scope.alertState !== WASHERALERT.ALARMSERVICE && $scope.alertState !== WASHERALERT.DISPENSER_OPEN)) {
            $scope.custDialogpopup = false;
        }
        if ($scope.errorList.length > 0 && !getSmartControlNoti && $scope.alertState !== WASHERALERT.CONNECTION_FAILURE && $scope.alertState !== WASHERALERT.ALARMSERVICE && $scope.alertState !== WASHERALERT.DISPENSER_OPEN && !powerOffPopUp) {
            for (var i = 0; i < $scope.errorList.length; i++) {
                if (angular.isDefined($scope.errorList) && angular.isDefined($scope.errorList[i].id) && $scope.errorList[i].id === WASHER_ALERT_ID.OTN_POPUP) {
                    ;//Nothing
                } else {
                    $scope.errorList.pop();
                }
            }
        }
        if ($scope.modePopup) {
            if (angular.isDefined($scope.mostUsed)) {
                $scope.listItemsModes[0].CourseEnum = mostUsedCourseName;
            }
            $scope.modePopup = false;
        }
        if ($scope.tempPopup) {
            $scope.tempPopup = false;
        }
        if ($scope.spinPopup) {
            $scope.spinPopup = false;
        }
        if ($scope.rinsePopup) {
            $scope.rinsePopup = false;
        }
        if ($scope.soilPopup) {
            $scope.soilPopup = false;
        }
        if ($scope.isKoreanComboSubOption) {
            $scope.isKoreanComboSubOption = false;
        }
        if ($scope.serviceButtonPressed) {
            $scope.serviceButtonPressed = false;
        }
        if ($scope.setEndTimePopUpVisible) {
            $scope.setEndTimePopUpVisible = false;
        }
        closeMyFavPopUps();
        changePopUpClass(false);
    }

    function aboutCommand(cmdstring, changedCode) {
        if (changedCode) {
            return '{"service" : "' + cmdstring + '","selectedCountry" : "' + $scope.selectedCountry + '_FR"}';
        } else {
            return '{"service" : "' + cmdstring + '","selectedCountry" : "' + $scope.selectedCountry + '"}';
        }
    }

    function onAboutAction(reqParam) {
        if (reqParam === 'version') {
            demoModeVersionClickCount++;
            if (demoModeVersionClickCount === 1) {
                $timeout(function () {
                    demoModeVersionClickCount = 0;
                }, 15000);
            }
            if (demoModeVersionClickCount === 20) {
                $scope.showDemoErrorList = false;
            }
            return;
        }
        if (reqParam === "errorpage") {
            $scope.currentScreen = WASHERSCREENS.ERRORTEXT;
            changeScreen();
            return;
        }
        if (reqParam === "smartcare") {
            $scope.currentScreen = WASHERSCREENS.SMARTCARE;
            changeScreen();
            return;
        }

        if (reqParam === 'tutorial' || reqParam === 'manual' || reqParam === 'helpdesk') {
            var selectedLang1 = "";
            var selectedLang2 = "";
            if ($scope.selectedCountry === "BE") {
                $scope.countryToSelect = [];
                selectedLang1 = $scope.translation.WEBMOB_common_tutorial_belgium;
                selectedLang2 = $scope.translation.WEBMOB_common_tutorial_belgium_french;
                $scope.countryToSelect.push({'Country': selectedLang1});
                $scope.countryToSelect.push({'Country': selectedLang2});
                reqParamCountrySelection = reqParam;
                showcustCountrySelectionPopup();
            } else if ($scope.selectedCountry === "CA") {
                $scope.countryToSelect = [];
                selectedLang1 = $scope.translation.WEBMOB_common_tutorial_canada;
                selectedLang2 = $scope.translation.WEBMOB_common_tutorial_canada_french;
                $scope.countryToSelect.push({'Country': selectedLang1});
                $scope.countryToSelect.push({'Country': selectedLang2});
                reqParamCountrySelection = reqParam;
                showcustCountrySelectionPopup();
            } else if ($scope.selectedCountry === "CH") {
                $scope.countryToSelect = [];
                selectedLang1 = $scope.translation.WEBMOB_common_tutorial_switzerland;
                selectedLang2 = $scope.translation.WEBMOB_common_tutorial_switzerland_french;
                $scope.countryToSelect.push({'Country': selectedLang1});
                $scope.countryToSelect.push({'Country': selectedLang2});
                reqParamCountrySelection = reqParam;
                showcustCountrySelectionPopup();
            } else {
                //Removed static check as in demo mode also we need to run native commands
                /*if($scope.isStatic) {
                 $scope.selectedCountry = "BE";
                 showcustCountrySelectionPopup();
                 return;
                 }*/
                $timeout(function () {
                    nativeInterface.runOnNative("customerService", aboutCommand(reqParam));
                }, MATERIAL_DESIGN.LIST_ANIMATION_TIME);
            }
        } else {
            $timeout(function () {
                nativeInterface.runOnNative("customerService", aboutCommand(reqParam));
            }, MATERIAL_DESIGN.LIST_ANIMATION_TIME);
        }
    }

    function updateClock() {
        var currentTime = new Date(); // current date

        var crhours = currentTime.getHours();
        var crminutes = currentTime.getMinutes();

        if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
            if ($scope.remainingTime !== undefined) {
                var estHrs = $scope.remHrs + crhours;
                var estMin = $scope.remMin + crminutes;
                debugMessage("Time is:: " + crminutes + ":::" + $scope.remainingTime.substring(4, 5));
                var newdate = new Date();
                newdate.setHours(estHrs, estMin, 0);
                var hours = newdate.getHours();
                var minutes = newdate.getMinutes();
                $scope.ampm = hours >= 12 ? ' PM' : ' AM';
                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                $scope.estimationTime = " " + hours + ":" + minutes;
                if (clearTime !== undefined) {
                    $timeout.cancel(clearTime);
                }
                clearTime = $timeout(updateClock, 1000 * 60);
            }
        }
        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
            if ($scope.remainingTimeMain !== undefined) {
                var estHrs = $scope.remHrsMain + crhours;
                var estMin = $scope.remMinMain + crminutes;
                debugMessage("Time is:: " + crminutes + ":::" + $scope.remainingTimeMain.substring(4, 5));
                var newdate = new Date();
                newdate.setHours(estHrs, estMin, 0);
                var hours = newdate.getHours();
                var minutes = newdate.getMinutes();
                $scope.ampmMain = hours >= 12 ? ' PM' : ' AM';
                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                $scope.estimationTimeMain = " " + hours + ":" + minutes;
                if (clearTime !== undefined) {
                    $timeout.cancel(clearTime);
                }
                clearTime = $timeout(updateClock, 1000 * 60);
            }
        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
            if ($scope.remainingTimeSub !== undefined) {
                var estHrs = $scope.remHrsSub + crhours;
                var estMin = $scope.remMinSub + crminutes;
                debugMessage("Time is:: " + crminutes + ":::" + $scope.remainingTimeSub.substring(4, 5));
                var newdate = new Date();
                newdate.setHours(estHrs, estMin, 0);
                var hours = newdate.getHours();
                var minutes = newdate.getMinutes();
                $scope.ampmSub = hours >= 12 ? ' PM' : ' AM';
                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                $scope.estimationTimeSub = " " + hours + ":" + minutes;
                if (clearTime !== undefined) {
                    $timeout.cancel(clearTime);
                }
                clearTime = $timeout(updateClock, 1000 * 60);
            }
        } else {
            ;//Nothing
        }
    }

    function parseStaticData() {
        // Reading SHP Json Response
        $scope.isStatic = true;
        //$scope.isAppV2 = !true;
        //$scope.serviceCenterNumber = '000-213-516-000,000-213-517-000';
        $scope.showManualErrorPage = true;
        $scope.remoteControlEnabled = true;
        init();
        $scope.deviceTypeInitial = $scope.translation.WEBMOB_common_device_washer;
        $scope.appVersionInitial = "1234567";
        $scope.firmwareVersion = "M_22:S_10:D_17";
        if ($scope.isStatic) {
            var deviceResponseWasher = '{"Devices":[{"description":"TP6X_WW8800(C09727703B4A)","id":"0","Alarms":[],"ConfigurationLink":{"href":"/devices/0/configuration"},"Diagnosis":{"diagnosisStart":"Ready"},"EnergyConsumption":{"saveLocation":"/files/usage.db"},"InformationLink":{"href":"/devices/0/information"},"Mode":{"options":["EnergyKW_396","DrumCleanLog_Empty","TimeSync_NotSupported","NoCheck_SC","Course_D0","DeviceType_0167","UsagesDB_ok","MostUsed_D0847E923FA77D","LaundryOutTime_0","AddWashSet_0","AddWashAvailable_7","AddWashIndicator_Off","EnergyLevelSet_050403010301020304050101020402","SeamlessControl_Disable","KidsLockBypass_On","WashingTimes_0","DrumCleanProposal_40","DetergentOnce_50","DetergentLeft_100","DetergentBase_50","DetergentAlarm_On","SpecialFunction_1","AvailableDelayTime_66","BubbleSoakSet_F00000F0000000F000000000F000","BubbleSoak_Off","DispenserSet_2222222222222222FF2222222222","DetergentLevelCtrl_3","SoftenerLevelCtrl_3","SupportedDetergentLevelCtrl_00010203","SupportedSoftenerLevelCtrl_00010203","DetergentType_1"],"supportedOptions":["3D0847E923FA67DBD84109308A67DDC811E933FA31DDB841E923FA53DDA8102923FA41DD9831E933FA41DD8841E920FA30DD6841E933FA30DD585209204A410BA80009000A57ED48000913FA57DD3831E920FA30DD2843E923FA53DD18430923FA67D"]},"Operation":{"delayEndTime":"00:00:00","kidsLock":"Ready","power":"On","progress":"None","progressPercentage":1,"remainingTime":"01:06:00","state":"Ready","supportedProgress":["None","Weightsensing","Wash","Rinse","Spin","Finish"]},"Washer":{"rinseCycles":"2","spinLevel":"1600","supportedRinseCycles":["0","1","2","3","4","5"],"supportedSpinLevel":["RinseHold","NoSpin","400","800","1200","1400","1600"],"supportedWaterTemperature":["None","Cold","20","30","40","60","90"],"waterTemperature":"40"},"connected":true,"name":"Washer","resources":["Alarms","Configuration","Diagnosis","EnergyConsumption","Information","Mode","Operation","Washer"],"type":"Washer","uuid":"C0972770-3B4A-0000-0000-000000000000"}]}';
            //var deviceResponseWasherRun = '{"Devices":[{"description":"TP6X_WW8800(C09727703B4A)","id":"0","Alarms":[],"ConfigurationLink":{"href":"/devices/0/configuration"},"Diagnosis":{"diagnosisStart":"Ready"},"EnergyConsumption":{"saveLocation":"/files/usage.db"},"InformationLink":{"href":"/devices/0/information"},"Mode":{"options":["EnergyKW_396","DrumCleanLog_Empty","TimeSync_NotSupported","NoCheck_SC","Course_D0","DeviceType_0167","UsagesDB_ok","MostUsed_D0847E923FA77D","LaundryOutTime_0","AddWashSet_0","AddWashAvailable_7","AddWashIndicator_Off","EnergyLevelSet_050403010301020304050101020402","SeamlessControl_Disable","KidsLockBypass_On","WashingTimes_0","DrumCleanProposal_40","DetergentOnce_50","DetergentLeft_100","DetergentBase_50","DetergentAlarm_On","SpecialFunction_1","AvailableDelayTime_59","BubbleSoakSet_F00000F0000000F000000000F000","BubbleSoak_Off","DispenserSet_2222222222222222FF2222222222","DetergentLevelCtrl_3","SoftenerLevelCtrl_3","SupportedDetergentLevelCtrl_00010203","SupportedSoftenerLevelCtrl_00010203","DetergentType_1"],"supportedOptions":["3D0847E923FA67DBD84109308A67DDC811E933FA31DDB841E923FA53DDA8102923FA41DD9831E933FA41DD8841E920FA30DD6841E933FA30DD585209204A410BA80009000A57ED48000913FA57DD3831E920FA30DD2843E923FA53DD18430923FA67D"]},"Operation":{"delayEndTime":"00:00:00","kidsLock":"Ready","power":"On","progress":"Wash","progressPercentage":1,"remainingTime":"00:59:00","state":"Pause","supportedProgress":["None","Weightsensing","Wash","Rinse","Spin","Finish"]},"Washer":{"rinseCycles":"2","spinLevel":"1600","supportedRinseCycles":["0","1","2","3","4","5"],"supportedSpinLevel":["RinseHold","NoSpin","400","800","1200","1400","1600"],"supportedWaterTemperature":["None","Cold","20","30","40","60","90"],"waterTemperature":"40"},"connected":true,"name":"Washer","resources":["Alarms","Configuration","Diagnosis","EnergyConsumption","Information","Mode","Operation","Washer"],"type":"Washer","uuid":"C0972770-3B4A-0000-0000-000000000000"}]}';
            //var deviceResponseDualWasher = '{"Devices":[{"description":"DONGLE_WF7500(F8042EEC45B3)","id":"0","Alarms":[],"ConfigurationLink":{"href":"/devices/0/configuration"},"Diagnosis":{"diagnosisStart":"Ready"},"EnergyConsumption":{"saveLocation":"/files/usage.db"},"InformationLink":{"href":"/devices/0/information"},"Mode":{"options":["Course_73","DeviceType_0154","SteamWash_Disable","UsagesDB_ok","LaundryOutTime_0","AddWashSet_7","AddWashAvailable_4","AddWashIndicator_Off"],"supportedOptions":["301833EA43FC33E70843EA53FC53E71830EA20FC33E55831EA43FC33E728520A43FC33E548410A43FC33E738000A43FC00074830EA207C33E75810EA207C33E76830EA207C30877830EA21FC33E78831EA43FC13E798106A43FC33E7A8410A43FC520578520A520C000"]},"Operation":{"kidsLock":"Ready","power":"On","progress":"Rinse","progressPercentage":4,"remainingTime":"00:19:00","state":"Pause","supportedProgress":["None","Rinse","Spin","Finish"]},"Washer":{"soilLevel":"None","spinLevel":"High","supportedSoilLevel":["None","Light","Down","Normal","Up","Heavy"],"supportedSpinLevel":["RinseHold","NoSpin","Low","Medium","High","ExtraHigh"],"supportedWaterTemperature":["None","TapCold","Cold","Warm","Hot","ExtraHot"],"waterTemperature":"None"},"connected":true,"name":"Washer","resources":["Alarms","Configuration","Diagnosis","EnergyConsumption","Information","Mode","Operation","Washer"],"type":"Washer","uuid":"F8042EEC-45B3-0000-0000-000000000000"},{"Alarms":[],"ConfigurationLink":{"href":"/devices/1/configuration"},"Diagnosis":{"diagnosisStart":"Ready"},"EnergyConsumption":{"saveLocation":"/files/usage.db"},"InformationLink":{"href":"/devices/1/information"},"Mode":{"options":["Course_01","DeviceType_0146","SteamWash_Disable","UsagesDB_ok","LaundryOutTime_0","AddWashSet_7","AddWashAvailable_7","AddWashIndicator_Off"],"supportedOptions":["301833EA43FC33E70843EA53FC53E71830EA20FC33E55831EA43FC33E728520A43FC33E548410A43FC33E738000A43FC00074830EA207C33E75810EA207C33E76830EA207C30877830EA21FC33E78831EA43FC13E798106A43FC33E7A8410A43FC520578520A520C000"]},"Operation":{"kidsLock":"Ready","power":"On","progress":"None","progressPercentage":1,"remainingTime":"00:45:00","state":"Ready","supportedProgress":["None","Weightsensing","Wash","Rinse","Spin","Finish"]},"Washer":{"soilLevel":"Normal","spinLevel":"High","supportedSoilLevel":["None","Light","Down","Normal","Up","Heavy"],"supportedSpinLevel":["RinseHold","NoSpin","Low","Medium","High","ExtraHigh"],"supportedWaterTemperature":["None","TapCold","Cold","Warm","Hot","ExtraHot"],"waterTemperature":"Warm"},"connected":true,"description":"DONGLE_WF7500","id":"1","name":"Washer","resources":["Alarms","Configuration","Diagnosis","EnergyConsumption","Information","Mode","Operation","Washer"],"type":"Washer","uuid":"F8042EEC-45B3-0000-0000-000000000001"}]}';
            //var deviceResponseDualKoreanSingle = '{"Devices":[{"description":"TP6X_DUAL_WD26M9900KV(F8042EEBABDA)","id":"0","Alarms":[],"ConfigurationLink":{"href":"/devices/0/configuration"},"Diagnosis":{"diagnosisStart":"Ready"},"EnergyConsumption":{"saveLocation":"/files/usage.db"},"InformationLink":{"href":"/devices/0/information"},"Mode":{"options":["EnergyKW_396","DrumCleanLog_Empty","Course_AC","DeviceType_0147","UsagesDB_ok","LaundryOutTime_0","AddWashSet_0","AddWashAvailable_7","AddWashIndicator_Off","EnergyLevelSet_050303040104030203030501030303040101","SeamlessControl_Disable","KidsLockBypass_On","FreezeProtectionAlarm_Enable","WashingTimes_0","DrumCleanProposal_40"],"supportedOptions":["4AC831E933FA43FB03F8D831E933FA43FB03F9F820E923FA43FB03FA98520933CA43FB03F258206923FA53FB10206830E930FA207B00012843E933FA43FB03FA5820E933FA41FB000748206930FA30FB0009D8000913FA43FB03F2E80009000A021B13EB280009000A000B0000D80009000A000B0005380009000A000B0005280009000A000B0003980009000A000B000B184109204A520B000"]},"Operation":{"kidsLock":"Ready","power":"On","progress":"None","progressPercentage":1,"remainingTime":"01:09:00","state":"Ready","supportedProgress":["None","Weightsensing","Wash","Rinse","Spin","Finish"]},"Washer":{"dryLevel":"None","rinseCycles":"3","spinLevel":"High","supportedDryLevel":["None","Normal","Strong","Shirt","Low","30","60","90","120","150"],"supportedRinseCycles":["0","1","2","3","4","5"],"supportedSpinLevel":["RinseHold","Delicate","Low","Medium","High","ExtraHigh"],"supportedWaterTemperature":["None","Cold","30","40","60","90"],"waterTemperature":"40"},"connected":true,"name":"Washer","resources":["Alarms","Configuration","Diagnosis","EnergyConsumption","Information","Mode","Operation","Washer"],"type":"Washer","uuid":"F8042EEB-ABDA-0000-0000-000000000000"}]}';
            //var deviceResponseDualKorean = '{"Devices":[{"description":"TP6X_DUAL_WD26M9900KV(C097273E07B8)","id":"1","Alarms":[],"ConfigurationLink":{"href":"/devices/1/configuration"},"Diagnosis":{"diagnosisStart":"Ready"},"EnergyConsumption":{"saveLocation":"/files/usage.db"},"InformationLink":{"href":"/devices/1/information"},"Mode":{"options":["EnergyKW_396","Course_01","DeviceType_0000","UsagesDB_ok","LaundryOutTime_0","AddGarmentIndicator_Off","KidsLockBypass_On"],"supportedOptions":["101823C06821C03843C19823C578410"]},"Operation":{"kidsLock":"Ready","power":"On","progress":"None","progressPercentage":1,"remainingTime":"00:53:00","state":"Ready","supportedProgress":["None","Wash","Rinse","Spin","Finish"]},"Washer":{"supportedWaterTemperature":["None","Cold","Warm"],"waterTemperature":"Cold"},"connected":true,"name":"Washer","resources":["Alarms","Configuration","Diagnosis","EnergyConsumption","Information","Mode","Operation","Washer"],"type":"Washer","uuid":"C097273E-07B8-0000-0000-000000000001"},{"description":"TP6X_DUAL_WD26M9900KV(C097273E07B8)","id":"0","Alarms":[],"ConfigurationLink":{"href":"/devices/0/configuration"},"Diagnosis":{"diagnosisStart":"Ready"},"EnergyConsumption":{"saveLocation":"/files/usage.db"},"InformationLink":{"href":"/devices/0/information"},"Mode":{"options":["EnergyKW_396","Course_AC","DeviceType_0147","SteamWash_Disable","UsagesDB_ok","LaundryOutTime_0","AddWashSet_0","AddWashAvailable_7","AddWashIndicator_Off","EnergyLevelSet_050303040104030203030501030303040101","SeamlessControl_Disable","KidsLockBypass_On","SetFreezeProtection_On"],"supportedOptions":["4AC831E933FA43FB0038D831E933FA43FB0039F820E923FA43FB003A98520933CA43FB003258206923FA53FB10206830E930FA207B00012843E933FA43FB003A5820E933FA41FB000748206930FA30FB0009D8000913FA43FB0032E80009000A021B002B280009000A000B0000D80009000A000B0005380009000A000B0005280009000A000B0003980009000A000B102B184109204A520B000"]},"Operation":{"kidsLock":"Ready","power":"On","progress":"None","progressPercentage":1,"remainingTime":"01:09:00","state":"Ready","supportedProgress":["None","Weightsensing","Wash","Rinse","Spin","Finish"]},"Washer":{"dryLevel":"None","rinseCycles":"3","spinLevel":"High","supportedDryLevel":["None","Normal","Strong","Shirt","Low","30","60","90","120","150","150","150","150"],"supportedRinseCycles":["0","1","2","3","4","5"],"supportedSpinLevel":["RinseHold","NoSpin","Low","Medium","High","ExtraHigh"],"supportedWaterTemperature":["None","Cold","30","40","60","90"],"waterTemperature":"40"},"connected":true,"name":"Washer","resources":["Alarms","Configuration","Diagnosis","EnergyConsumption","Information","Mode","Operation","Washer"],"type":"Washer","uuid":"C097273E-07B8-0000-0000-000000000000"}]}';
            var device = JSON.parse(deviceResponseWasher);
            debugMessage("device ", device);
            $scope.isDBDownloaded = true;
            $scope.remoteControlEnabled = true;
            $scope.smartControlOnOffText = $scope.remoteControlEnabled ? $scope.translation.WEBMOB_device_washer_comm_on_CL : $scope.translation.WEBMOB_device_washer_comm_off_CL;
            $scope.locationName = "HOME";
            $scope.roomName = "LIVING ROOM";
            parseDeviceData(device.Devices);
        }
    }

    function openPopovermode() {
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
            sendSAData(SA_WASHER.TOP_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.TOP_LOAD_DETAIL_PAGE.WASHER_MODE_SELECTION, "", "");
        } else {
            sendSAData(SA_WASHER.FRONT_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.FRONT_LOAD_DETAIL_PAGE.WASHER_MODE_SELECTION, "", "");
        }
        if ($scope.hotwarning) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_title,
                msg: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_msg,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }
        if ($scope.disableContents || !$scope.remoteControlEnabled || $scope.kidsLock) {
            return;
        }
//        if (angular.isDefined($scope.mostUsed)) {
//            $scope.listItemsModes[0].CourseEnum = "WEBMOB_device_washer_comm_most_used";
//        }
        $scope.modePopup = true;
        changePopUpClass($scope.modePopup);

    }

    function openPopoverTemp() {
        console.log("openPopoverTemp="+$scope.setTemp);
        switch($scope.setTemp){
            case "90":
                $scope.tempSlide.noUiSlider.set(100);
                break;
            case "60":
                $scope.tempSlide.noUiSlider.set(80);
                break;
            case "40":
                $scope.tempSlide.noUiSlider.set(60);
                break;
            case "30":
                $scope.tempSlide.noUiSlider.set(40);
                break;
            case "20":
                $scope.tempSlide.noUiSlider.set(20);
                break;
            case "Cold":
                $scope.tempSlide.noUiSlider.set(0);
                break;

        }
        $scope.initSelectValue = $scope.setTemp;

        if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
            sendSAData(SA_WASHER.TOP_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.TOP_LOAD_DETAIL_PAGE.BOTTOM_TEMP_OPTION, "", "");
        } else {
            sendSAData(SA_WASHER.FRONT_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.FRONT_LOAD_DETAIL_PAGE.BOTTOM_TEMP_OPTION, "", "");
        }
        $timeout(function () {
            debugMessage("Current temperature length is::" + $scope.currentTempList.length);
            if ($scope.currentTempList.length <= 1) {
                return;
            }
            console.log("$scope.hotwarning="+$scope.hotwarning);
            if ($scope.hotwarning) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_title,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_msg,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if ($scope.kidsLock) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_child_lock_title,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_message,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if (!$scope.remoteControlEnabled) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if (disableTempContentsFunc() || steamTempDisable) {
                return;
            }
            $scope.tempPopup = true;
            toggleBottomPopUpClass($scope.tempPopup);
            changePopUpClass($scope.tempPopup);
        }, MATERIAL_DESIGN.LIST_ANIMATION_TIME);
    }

    function openPopoverSpin() {
        $scope.initSelectValue =  $scope.setSpin;
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
            sendSAData(SA_WASHER.TOP_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.TOP_LOAD_DETAIL_PAGE.BOTTOM_SPIN_OPTION, "", "");
        } else {
            sendSAData(SA_WASHER.FRONT_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.FRONT_LOAD_DETAIL_PAGE.BOTTOM_SPIN_OPTION, "", "");
        }
        $timeout(function () {
            if ($scope.currentSpinList.length <= 1) {
                return;
            }
            if ($scope.hotwarning) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_title,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_msg,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if ($scope.kidsLock) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_child_lock_title,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_message,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if (!$scope.remoteControlEnabled) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if ($scope.disablespinContents && $scope.disableSpinContentsSubstitue) {
                return;
            }
            $scope.spinPopup = true;
            toggleBottomPopUpClass($scope.spinPopup);
            changePopUpClass($scope.spinPopup);
        }, MATERIAL_DESIGN.LIST_ANIMATION_TIME);
    }

    function openPopoverSoilLevel() {
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
            sendSAData(SA_WASHER.TOP_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.TOP_LOAD_DETAIL_PAGE.BOTTOM_SOIL_LEVEL_OPTION, "", "");
        } else {
            sendSAData(SA_WASHER.FRONT_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.FRONT_LOAD_DETAIL_PAGE.BOTTOM_SOIL_LEVEL_OPTION, "", "");
        }
        $timeout(function () {
            if ($scope.currentSoilList.length <= 1) {
                return;
            }
            if ($scope.hotwarning) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_title,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_msg,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if ($scope.kidsLock) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_child_lock_title,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_message,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if (!$scope.remoteControlEnabled) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if ($scope.disablesoilContents || soilDisable) {
                return;
            }

            $scope.soilPopup = true;
            toggleBottomPopUpClass($scope.soilPopup);
            changePopUpClass($scope.soilPopup);
        }, MATERIAL_DESIGN.LIST_ANIMATION_TIME);
    }

    function openPopoverRinse() {
        $timeout(function () {
            if ($scope.currentRinseList.length <= 1) {
                return;
            }
            if ($scope.hotwarning) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_title,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_msg,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if ($scope.kidsLock) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_child_lock_title,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_message,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if (!$scope.remoteControlEnabled) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if ($scope.disablerinseContents) {
                return;
            }
            $scope.rinsePopup = true;
            toggleBottomPopUpClass($scope.rinsePopup);
            changePopUpClass($scope.rinsePopup);
        }, MATERIAL_DESIGN.LIST_ANIMATION_TIME);
    }

    function openDryComboLevelPage() {
        $timeout(function () {
            if ($scope.currentDryComboLevelList.length <= 1) {
                return;
            }
            if ($scope.hotwarning) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_title,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_msg,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if ($scope.kidsLock) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_child_lock_title,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_message,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if (!$scope.remoteControlEnabled) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                return;
            }
            if ($scope.disableContents) {
                return;
            }
            updatekoreanComboOptions();
            $scope.currentScreen = WASHERSCREENS.KOREANCOMBOSETTINGPAGE;
            changeScreen();
        }, MATERIAL_DESIGN.LIST_ANIMATION_TIME);
    }

    function openDryComboLevelPageFav() {
        $timeout(function () {
            closeAllPopups();
            if ($scope.currentDryComboLevelListFav.length <= 1 || favPopUpChanged) {
                return;
            }
            updatekoreanComboOptionsFav();
            $scope.currentScreen = WASHERSCREENS.KOREANCOMBOSETTINGPAGEFAV;
            changeScreen();
        }, MATERIAL_DESIGN.LIST_ANIMATION_TIME);
    }

    function getDryComboDisabled(selectedItem) {
        if ($scope.currentDryComboLevelList === undefined || $scope.disableContents) {
            return true;
        }
        if (($scope.setSpin === "RinseHold" || $scope.setSpin === "None") && $scope.setRinse === "0" && ($scope.disabletempContents || $scope.isTemp === false) && selectedItem === "None") {
            return true;
        }
        // This Heater Spec in which if the sanitizer course is selected in top load then dry option is disabled in te front load
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED && $scope.currentCourseEnumSub === "WEBMOB_device_washer_course_a9" && selectedItem !== "None") {
            return true;
        }
        if (selectedItem === "More") {
            var matched = false;
            $scope.koreanComboSubOptions.forEach(function (value) {
                if ($scope.currentDryComboLevelList.indexOf(value.title) > 1) {
                    matched = true;
                }
            });
            if (matched) {
                return false;
            }
            return true;
        }
        if ($scope.currentDryComboLevelList.indexOf(selectedItem) > -1) {
            return false;
        } else {
            return true;
        }
    }

    function getDryComboDisabledFav(selectedItem) {
        if ($scope.currentDryComboLevelListFav === undefined) {
            return true;
        }
        if (selectedItem === "More") {
            var matched = false;
            $scope.koreanComboSubOptionsFav.forEach(function (value) {
                if ($scope.currentDryComboLevelListFav.indexOf(value.title) > 1) {
                    matched = true;
                }
            });
            if (matched) {
                return false;
            }
            return true;
        }
        if (($scope.setSpinFav === "RinseHold" || $scope.setSpinFav === "None") && $scope.setRinseFav === "0" && selectedItem === "None") {
            return true;
        }
        if ($scope.currentDryComboLevelListFav.indexOf(selectedItem) > -1) {
            return false;
        } else {
            return true;
        }
    }

    function openLaundryOutPage() {
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
            sendSAData(SA_WASHER.TOP_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.TOP_LOAD_DETAIL_PAGE.BOTTOM_RENAINING_LAUNDRY_OPTION, "", "");
        } else {
            sendSAData(SA_WASHER.FRONT_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.FRONT_LOAD_DETAIL_PAGE.BOTTOM_RENAINING_LAUNDRY_OPTION, "", "");
        }
        if ($scope.disableLaundry) {
            return;
        }
        if ($scope.hotwarning) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_title,
                msg: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_msg,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }
        if ($scope.kidsLock) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_child_lock_title,
                msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_message,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }
        if (!$scope.remoteControlEnabled) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }
        tempLaundryVal = currentLaundryVal;
        $scope.currentScreen = WASHERSCREENS.LAUNDRYOUTPAGE;
        changeScreen();
    }

    function openKoreanComboSubOptionPopOver() {
        $timeout(function () {
            $scope.isKoreanComboSubOption = true;
            toggleBottomPopUpClass($scope.isKoreanComboSubOption);
            changePopUpClass($scope.isKoreanComboSubOption);
        }, MATERIAL_DESIGN.LIST_ANIMATION_TIME);
    }

    function openKoreanComboSubOptionPopOverFav() {
        $timeout(function () {
            $scope.isKoreanComboSubOptionFav = true;
            toggleBottomPopUpClass($scope.isKoreanComboSubOptionFav);
            changePopUpClass($scope.isKoreanComboSubOptionFav);
        }, MATERIAL_DESIGN.LIST_ANIMATION_TIME);
    }

    function onLaundrySwitch() {
        $scope.laundrySwitch = !$scope.laundrySwitch;
        var laundrySwitchValue = $scope.laundrySwitch ? 1 : 0;
        sendSAData(SA_WASHER.REMAINING_LAUNDRY_PAGE.SCREEN, SA_WASHER.REMAINING_LAUNDRY_PAGE.REMAINING_LAUNDRY_SWITCH, "Remaining laundry on/off", laundrySwitchValue);
        if ($scope.laundrySwitch) {
            $scope.laundryOpt2 = true;
            tempLaundryVal = 1;
        } else {
            $scope.laundryOpt2 = false;
            $scope.laundryOpt3 = false;
            $scope.laundryOpt4 = false;
            tempLaundryVal = 0;
        }
    }

    function laundryItemSelected(indexVal) {
        if (!$scope.laundrySwitch) {
            return;
        }
        $scope.laundryOpt2 = false;
        $scope.laundryOpt3 = false;
        $scope.laundryOpt4 = false;
        switch (indexVal) {
            case "2":
                $scope.laundryOpt2 = !$scope.laundryOpt2;
                var laundrySwitchValue = $scope.laundryOpt2 ? 1 : 0;
                var laundryOptSelected = $scope.laundryOpt2 ? "selected" : "not selected";
                sendSAData(SA_WASHER.REMAINING_LAUNDRY_PAGE.SCREEN, SA_WASHER.REMAINING_LAUNDRY_PAGE.EVERY_30_MIN, laundryOptSelected, laundrySwitchValue);
                tempLaundryVal = 2;
                break;
            case "3":
                $scope.laundryOpt3 = !$scope.laundryOpt3;
                var laundrySwitchValue = $scope.laundryOpt3 ? 1 : 0;
                var laundryOptSelected = $scope.laundryOpt3 ? "selected" : "not selected";
                sendSAData(SA_WASHER.REMAINING_LAUNDRY_PAGE.SCREEN, SA_WASHER.REMAINING_LAUNDRY_PAGE.EVERY_60_MIN, laundryOptSelected, laundrySwitchValue);
                tempLaundryVal = 3;
                break;
            case "4":
                $scope.laundryOpt4 = !$scope.laundryOpt4;
                var laundrySwitchValue = $scope.laundryOpt4 ? 1 : 0;
                var laundryOptSelected = $scope.laundryOpt4 ? "selected" : "not selected";
                sendSAData(SA_WASHER.REMAINING_LAUNDRY_PAGE.SCREEN, SA_WASHER.REMAINING_LAUNDRY_PAGE.EVERY_90_MIN, laundryOptSelected, laundrySwitchValue);
                tempLaundryVal = 4;
                break;
            default:
                break;
        }
        $scope.laundrySwitch = true;
    }

    function openAddWashScreen() {
        sendSAData(SA_WASHER.SETTINGS.SCREEN, SA_WASHER.SETTINGS.ADD_WASH_ALARM, "", "");
        if ($scope.hotwarning) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_title,
                msg: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_msg,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }
        if ($scope.kidsLock) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_child_lock_title,
                msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_message,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }
        if (!$scope.remoteControlEnabled) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }
        $scope.currentScreen = WASHERSCREENS.ADDWASHPAGE;
        changeScreen();
    }

    function openFreezeProtectionAlarmScreen() {
        if ($scope.hotwarning) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_title,
                msg: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_msg,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }
        if ($scope.kidsLock) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_child_lock_title,
                msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_message,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }
        if (!$scope.remoteControlEnabled) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }
        $scope.currentScreen = WASHERSCREENS.FREEZEPROTECTIONALARMPAGE;
        changeScreen();
    }

    function onFreezeProtectionAlarmToggle() {
        $scope.freezeProtectionAlarmValueTemp = !$scope.freezeProtectionAlarmValueTemp;
        var freezeProtectionAlarmValue = $scope.freezeProtectionAlarmValueTemp ? 1 : 0;
        sendSAData(SA_WASHER.FREEZE_ALARM_PAGE.SCREEN, SA_WASHER.FREEZE_ALARM_PAGE.FREEZE_ALARM_SWITCH, "Freeze alarm on/off", freezeProtectionAlarmValue);
    }

    function decodeAddWashValue(addValue, disValue) {
        var temp;
        temp = "00" + addValue.toString(2);
        temp = temp.substr(-3);
        if (disValue === 0) {
            $scope.addWashOpt3 = parseInt(temp.charAt(0), 10) === 1 ? true : false;
            $scope.addWashOpt2 = parseInt(temp.charAt(1), 10) === 1 ? true : false;
            $scope.addWashOpt1 = parseInt(temp.charAt(2), 10) === 1 ? true : false;
        } else if (disValue === 1) {
            $scope.disableOpt3 = parseInt(temp.charAt(0), 10) === 1 ? false : true;
            $scope.disableOpt2 = parseInt(temp.charAt(1), 10) === 1 ? false : true;
            $scope.disableOpt1 = parseInt(temp.charAt(2), 10) === 1 ? false : true;
        } else {
            //Do Nothing
        }
        checkAddWashSwitch();
    }

    function checkAddWashSwitch() {
        if (!$scope.addWashOpt1 && !$scope.addWashOpt2 && !$scope.addWashOpt3) {
            $scope.addWashSwitch = false;
        } else if ($scope.addWashOpt1 || $scope.addWashOpt2 || $scope.addWashOpt3) {
            $scope.addWashSwitch = true;
        } else {
            //Do Nothing
        }
    }

//    function changeAddWashText(addAlarmValue) {
//        decodeAddWashValue(addAlarmValue,1);
//    }

    function addWashItemSelected(indVal) {
        if (!$scope.addWashSwitch) {
            return;
        }
        switch (indVal) {
            case "1":
                if ($scope.disableOpt1) {
                    return;
                }
                $scope.addWashOpt1 = !$scope.addWashOpt1;
                var addWashItemValue = $scope.addWashOpt1 ? 1 : 0;
                sendSAData(SA_WASHER.ADD_WASH_ALARM_PAGE.SCREEN, SA_WASHER.ADD_WASH_ALARM_PAGE.WHEN_STARTING_RINSING, "When starting rinsing", addWashItemValue);
                break;
            case "2":
                if ($scope.disableOpt2) {
                    return;
                }
                $scope.addWashOpt2 = !$scope.addWashOpt2;
                var addWashItemValue = $scope.addWashOpt1 ? 1 : 0;
                sendSAData(SA_WASHER.ADD_WASH_ALARM_PAGE.SCREEN, SA_WASHER.ADD_WASH_ALARM_PAGE.WHEN_STARTING_FINAL_RINSE, "When starting last rinsing", addWashItemValue);
                break;
            case "3":
                if ($scope.disableOpt3) {
                    return;
                }
                $scope.addWashOpt3 = !$scope.addWashOpt3;
                var addWashItemValue = $scope.addWashOpt1 ? 1 : 0;
                sendSAData(SA_WASHER.ADD_WASH_ALARM_PAGE.SCREEN, SA_WASHER.ADD_WASH_ALARM_PAGE.WHEN_STARTING_SPINNING, "When starting spinning", addWashItemValue);
                break;
            default:
                break;
        }
        checkAddWashSwitch();
        $scope.tempAddWashValue = getAddWashValue();
    }

    function onAddWashSwitch() {
        $scope.addWashSwitch = !$scope.addWashSwitch;
        var addWashSwitchValue = $scope.addWashSwitch ? 1 : 0;
        sendSAData(SA_WASHER.ADD_WASH_ALARM_PAGE.SCREEN, SA_WASHER.ADD_WASH_ALARM_PAGE.ADD_WASH_ALARM_SWITCH, "Add wash alarm on/off", addWashSwitchValue);
        if ($scope.addWashSwitch) {
            $scope.addWashOpt1 = true;
            $scope.addWashOpt2 = true;
            $scope.addWashOpt3 = true;
        } else {
            $scope.addWashOpt1 = false;
            $scope.addWashOpt2 = false;
            $scope.addWashOpt3 = false;
        }
        $scope.tempAddWashValue = getAddWashValue();
    }

    function onSaveAddWashSelection() {
        $scope.addWashPage = false;
        if ($scope.currentAddWashValue !== $scope.tempAddWashValue) {
            if (!$scope.isStatic) {
                sendAddWashCommand = true;
                var washerId = 0;
                if ($scope.isDualWasher && $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                    washerId = 1
                }
                $scope.checkResponse.push(WASHER_COMMANDS.ADD_WASH);
                SHPService.sendSHPCommand(CONSTANTS.PUT, getAddWashCommand($scope.tempAddWashValue), "/" + $scope.peerId + "/devices/" + washerId);
            } else {
                $scope.currentAddWashValue = $scope.tempAddWashValue;
                if ($scope.currentAddWashValue !== 0) {
                    $scope.addWashSwitch = true;
                    $scope.addWashOnOFf = $scope.translation.WEBMOB_device_washer_comm_on_CL;
                } else {
                    $scope.addWashSwitch = false;
                    $scope.addWashOnOFf = $scope.translation.WEBMOB_device_washer_comm_off_CL;
                }
            }
        }
    }

    function onSaveFreezeProtectionAlarmSelection() {
        $scope.freezeProtectionAlarmPage = false;
        if ($scope.freezeProtectionAlarmValueTemp !== $scope.freezeProtectionAlarmValue) {
            if (!$scope.isStatic) {
                var washerId = 0;
                if ($scope.isDualWasher && $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                    washerId = 1
                }
                $scope.checkResponse.push(WASHER_COMMANDS.FREEZE_PROTECTION_ALARM);
                SHPService.sendSHPCommand(CONSTANTS.PUT, getFreezeProtectionAlarmCommand($scope.freezeProtectionAlarmValueTemp), "/" + $scope.peerId + "/devices/" + washerId);
            } else {
                $scope.freezeProtectionAlarmValue = $scope.freezeProtectionAlarmValueTemp;
                $scope.freezeProtectionAlarmOnOFf = $scope.freezeProtectionAlarmValue ? $scope.translation.WEBMOB_device_washer_comm_on_CL : $scope.translation.WEBMOB_device_washer_comm_off_CL;
            }
        }
    }

    function getFreezeProtectionAlarmCommand(value) {
        var val = value ? 'On' : 'Off';
        if ($scope.setFreezeProtectionCommandComing) {
            return '{"Device":{"Mode":{"options":["SetFreezeProtection_' + val + '"]}}}';
        }
        return '{"Device":{"Mode":{"options":["FreezeProtectionAlarm_' + val + '"]}}}';
    }

    function getAddWashCommand(washValue) {
        return '{"Device":{"Mode":{"options":["AddWashSet_' + washValue + '"]}}}';
    }

    function getAddWashValue() {
        var temp;
        temp = ($scope.addWashOpt3 ? 1 : 0) + "" + ($scope.addWashOpt2 ? 1 : 0) + "" + ($scope.addWashOpt1 ? 1 : 0);
        return parseInt(temp, 2);
    }

    function getTempDisable(selectedItem) {
        if ($scope.currentTempList === undefined) {
            return;
        }
        if ($scope.currentCourseEnumSub === "WEBMOB_device_washer_course_a9" && Number(selectedItem) >= 60)
            return true;
        if ($scope.currentTempList.indexOf(selectedItem) > -1) {
            return false;
        } else {
            return true;
        }
    }

    function isTempSelected(selectedItem) {
        console.log("isTempSelected")
        if ($scope.setTemp === selectedItem) {
            return true;
        } else {
            return false;
        }
    }

    function getSpinDisable(selectedItem) {
        if ($scope.currentSpinList === undefined) {
            return;
        }
        if (($scope.currentCourseEnum === "WEBMOB_device_washer_course_19" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_64" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_73" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_9d") && $scope.setRinse === "0" && (selectedItem === "None" || selectedItem === "RinseHold") && ($scope.setDryComboLevel === undefined || $scope.setDryComboLevel === "None")) {
            return true;
        }
        if ((!$scope.setDryComboLevel || $scope.setDryComboLevel === "None") && ($scope.disabletempContents || $scope.isTemp === false) && $scope.setRinse === "0" && selectedItem === "RinseHold") {
            return true;
        }
        if ($scope.currentSpinList.indexOf(selectedItem) > -1) {
            return false;
        } else {
            return true;
        }
    }

    // This Function is used because we have to set spin to highest value of the range and range is decided by the getSpinDisable function
    // getSpinDisable and  getSpinDisableKoreanSpecs both are true then only the contents would be disable
    function getSpinDisableKoreanSpecs(selectedItem) {
        if (($scope.setDryComboLevel === undefined || $scope.setDryComboLevel !== "None" || $scope.isDryComboLevel === false || $scope.isDryComboLevel === undefined) && $scope.setRinse === "0" && ($scope.disabletempContents || $scope.isTemp === false) && selectedItem === "RinseHold") {
            return false;
        }
        if ($scope.setDryComboLevel !== "" && $scope.setDryComboLevel !== undefined && $scope.isDryComboLevel && $scope.setDryComboLevel !== "None" && (selectedItem !== $scope.setSpinHighest)) {
            return true;
        }
        return false;
    }

    function isSpinSelected(selectedItem) {
        if ($scope.setSpin === selectedItem) {
            return true;
        } else {
            return false;
        }
    }

    function getRinseDisable(selectedItem) {
        if ($scope.currentRinseList === undefined) {
            return;
        }
        if (($scope.currentCourseEnum === "WEBMOB_device_washer_course_19" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_64" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_73" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_9d") && ($scope.setSpin === "RinseHold" || $scope.setSpin === "None") && (selectedItem === "0")) {
            return true;
        }
        if ($scope.rinseremove01 && (selectedItem === "0" || selectedItem === "1")) {
            return true;
        }
        if ($scope.rinseremove0102 && (selectedItem === "0" || selectedItem === "1")) {
            return true;
        }
        // ($scope.isSpin === false && $scope.rinseOnly ) is equivalent to rinsehold when spin is not supported
        if (($scope.setDryComboLevel === undefined || $scope.setDryComboLevel === "None") && (($scope.setSpin === "RinseHold" || $scope.setSpin === "None") || ($scope.isSpin === false && $scope.rinseOnly)) && ($scope.disabletempContents || $scope.isTemp === false) && selectedItem === "0") {
            return true;
        }
        if ($scope.currentRinseList.indexOf(selectedItem) > -1) {
            return false;
        } else {
            return true;
        }
    }

    function isRinseSelected(selectedItem) {
        if ($scope.setRinse === selectedItem) {
            return true;
        } else {
            return false;
        }
    }

    function getSoilDisable(selectedItem) {
        if ($scope.currentSoilList === undefined) {
            return;
        }
        if ($scope.currentSoilList.indexOf(selectedItem) > -1) {
            return false;
        } else {
            return true;
        }
    }

    function isSoilSelected(selectedItem) {
        if ($scope.setSoil === selectedItem) {
            return true;
        } else {
            return false;
        }
    }

    function getmodeSelected(selectedItem, modeIndex) {
        if (modeIndex === 0 && angular.isDefined($scope.mostUsed)) {
            return false;
        }
        if (deviceCurrentMode === selectedItem.courseNameHex) {
            return true;
        } else {
            return false;
        }
    }

    function setCommonValues(selectedItem, ifNotFromSet) {
        if (ifNotFromSet || isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
            $scope.setTemp = deviceTemp;
            // exception case for wifi module problem. After OTN done, can remove "Unknown" : 170417
            if ($scope.currentSpinList !== undefined && ($scope.currentSpinList.indexOf("Unknown") > -1)) {
                console.log("[Flex Global F210 Exception]deviceSpin : " + $scope.deviceSpin + " -> Unknown");
                if ($scope.deviceSpin === undefined) {
                    $scope.setSpin = "Unknown";
                    $scope.deviceSpin = "Unknown";
                }
            }
            //-----------------------------------------------------------------------------
            $scope.setSpin = $scope.deviceSpin;
            $scope.setSoil = deviceSoil;
            $scope.setRinse = deviceRinse;
            $scope.setDryComboLevel = deviceTempDryComboLevel;
            $scope.isTemp = selectedItem.isTempEnabled;
            $scope.isSpin = selectedItem.isSpinEnabled;
            $scope.isRinse = selectedItem.isRinseEnabled;
            $scope.deviceMode = selectedItem.courseNameHex;
            $scope.currentCourseEnum = selectedItem.CourseEnum;
            $scope.currentCourseHex = selectedItem.courseNameHex;
            $scope.isSoilLevel = selectedItem.isSoilLevelEnabled;
            $scope.currentTempList = selectedItem.optionTempList;
            $scope.currentSpinList = selectedItem.optionSpinList;
            $scope.currentSoilList = selectedItem.optionSoilList;
            $scope.currentRinseList = selectedItem.optionRinseList;
            $scope.isDryComboLevel = selectedItem.isDryComboEnabled;
            $scope.currentDryComboLevelList = selectedItem.optionDryComboList;
            $scope.rinseChanged = false;
        }

        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
            $scope.setTempMain = deviceTempMain;
            $scope.setSpinMain = $scope.deviceSpinMain;
            $scope.setSoilMain = deviceSoilMain;
            $scope.setRinseMain = deviceRinseMain;
            $scope.setDryComboLevelMain = deviceTempDryComboLevelMain;
            if ($scope.currentScreen === WASHERSCREENS.KOREANCOMBOSETTINGPAGE) {
                updatekoreanComboOptions();
            }
            $scope.isTempMain = selectedItem.isTempEnabled;
            $scope.isSpinMain = selectedItem.isSpinEnabled;
            $scope.isRinseMain = selectedItem.isRinseEnabled;
            $scope.deviceModeMain = selectedItem.courseNameHex;
            $scope.currentCourseEnumMain = selectedItem.CourseEnum;
            $scope.currentCourseHexMain = selectedItem.courseNameHex;
            if($scope.currentCourseHexMain === '9D' ){
                console.log("Error Produced");
            }
            $scope.isSoilLevelMain = selectedItem.isSoilLevelEnabled;
            $scope.currentTempListMain = selectedItem.optionTempList;
            $scope.currentSpinListMain = selectedItem.optionSpinList;
            $scope.currentSoilListMain = selectedItem.optionSoilList;
            $scope.currentRinseListMain = selectedItem.optionRinseList;
            $scope.isDryComboLevelMain = selectedItem.isDryComboEnabled;
            $scope.currentDryComboLevelListMain = selectedItem.optionDryComboList;
            $scope.rinseChangedMain = false;
        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
            $scope.setTempSub = deviceTempSub;
            $scope.setSpinSub = $scope.deviceSpinSub;
            $scope.setSoilSub = deviceSoilSub;
            $scope.setRinseSub = deviceRinseSub;
            $scope.setDryComboLevelSub = deviceTempDryComboLevelSub;
            $scope.isTempSub = selectedItem.isTempEnabled;
            $scope.isSpinSub = selectedItem.isSpinEnabled;
            $scope.isRinseSub = selectedItem.isRinseEnabled;
            $scope.deviceModeSub = selectedItem.courseNameHex;
            $scope.currentCourseEnumSub = selectedItem.CourseEnum;
            $scope.currentCourseHexSub = selectedItem.courseNameHex;
            $scope.isSoilLevelSub = selectedItem.isSoilLevelEnabled;
            $scope.currentTempListSub = selectedItem.optionTempList;
            $scope.currentSpinListSub = selectedItem.optionSpinList;
            $scope.currentSoilListSub = selectedItem.optionSoilList;
            $scope.currentRinseListSub = selectedItem.optionRinseList;
            $scope.isDryComboLevelSub = selectedItem.isDryComboEnabled;
            $scope.currentDryComboLevelListSub = selectedItem.optionDryComboList;
            $scope.rinseChangedSub = false;
        } else {
            ;//Nothing
        }
    }

    function selectIndex(selectedItem, indexval) {
        $scope.showEnergyLevelSet && sendSAData(SA_WASHER.MODE_SELECTION.SCREEN, SA_WASHER.MODE_SELECTION.MODE_SELECTED, selectedItem.CourseEnum, 1);
        $scope.detailPage && sendSAData(SA_WASHER.CYCLE_SELECTION.SCREEN, SA_WASHER.CYCLE_SELECTION.CYCLE_SELECTED, selectedItem.CourseEnum, 1);
        $scope.modePopup = false;
        appSelectedItem = selectedItem;
        changePopUpClass($scope.modePopup);
        if ($scope.kidsLock) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_child_lock_title,
                msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_message,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }
        if (!$scope.remoteControlEnabled) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }
        // This condition is added because if the dryingOnly is set by app due to course selection or other things it must be set to false ....because watch updates it after the update
        if (deviceCurrentMode === selectedItem.courseNameHex && $scope.dryingOnlySetByApp) {
            $scope.dryingOnly = false;
            $scope.dryingOnlySetByApp = false;
        }
        if (deviceCurrentMode === selectedItem.courseNameHex && $scope.spinOnlySetByApp) {
            $scope.spinOnly = false;
            $scope.spinOnlySetByApp = false;
        }
        if (deviceCurrentMode === selectedItem.courseNameHex && $scope.rinseOnlySetByApp) {
            $scope.rinseOnly = false;
            $scope.rinseOnlySetByApp = false;
        }
        if (deviceCurrentMode === selectedItem.courseNameHex && tempSteamModel) {
            steamModel = tempSteamModel;
            soilDisable = true;
            steamTempDisable = true;
        } else {
            steamModel = false;
            soilDisable = false;
            steamTempDisable = false;
        }

        if (deviceCurrentMode === selectedItem.courseNameHex && ($scope.spinOnly || $scope.rinseOnly || $scope.dryingOnly || $scope.washNotIncluded)) {//$scope.spinOnly and same course selected as set then make temp and soil level disabled
            tempDisable = true;
            soilDisable = true;
        } else {
            tempDisable = false;
            soilDisable = false;
        }

        if (indexval === 0 && angular.isDefined($scope.mostUsed)) {
            selectedItem = $scope.mostUsedItem;
            mostUsedSelected = true;
        } else {
            mostUsedSelected = false;
        }

        if (quickwashoff && deviceCurrentMode === selectedItem.courseNameHex) {
            if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                selectedItem = $scope.quickWashcode;
            }
            if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                selectedItem = $scope.quickWashcodeMain;
            } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                selectedItem = $scope.quickWashcodeSub;
            } else {
                ;//Nothing
            }
        }
        if (angular.isDefined($scope.mostUsed)) {
            $scope.listItemsModes[0].CourseEnum = mostUsedCourseName;
        }
        setCommonValues(selectedItem, true);
        if (deviceCurrentMode !== $scope.currentCourseHex) {
            // This is done because when top loader course is set to sanitizer front loader temperature cannot exceed 40 C default for course_12 is 60
            if ($scope.currentCourseEnumSub === "WEBMOB_device_washer_course_a9" && ($scope.currentCourseEnum === "WEBMOB_device_washer_course_12" || $scope.currentCourseEnum === "WEBMOB_device_washer_course_c2") && $scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED)
            {
                $scope.setTemp = "40";
            } else {
                $scope.setTemp = selectedItem.defaultTemp;
            }
            $scope.setSpin = selectedItem.defaultSpin;
            $scope.specialCaseRinse = selectedItem.defaultRinse;
            $scope.setSoil = selectedItem.defaultSoil;
            $scope.setRinse = selectedItem.defaultRinse;
            $scope.setDryComboLevel = selectedItem.defaultDryCombo;
            if ($scope.currentCourseHex === WASHER_DEVICEMODES.NightWash) {//"0A"
                dryLevelTemp = true;
            } else {
                dryLevelTemp = false;
            }
        } else {
            if (dryLevelEnabled) {
                dryLevelTemp = true;
            } else {
                dryLevelTemp = false;
            }
            $scope.setTemp = deviceTemp;
            $scope.setSpin = $scope.deviceSpin;
            $scope.specialCaseRinse = deviceRinse;
            $scope.setSoil = deviceSoil;
            $scope.setRinse = deviceRinse;
            $scope.setDryComboLevel = deviceTempDryComboLevel;
        }
        checkSpecialCase();
        checkSpecialUS();
        checkSpecialEcodrum();
        updateOptionsGUI(true);
    }

    function updateOptionsGUI(ifNotFromSet) {
        if (ifNotFromSet || isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
            if (ifNotFromSet) {
                if (tempDisable || steamTempDisable || ($scope.currentTempList !== undefined && $scope.currentTempList.length < 2)) {
                    $scope.disabletempContents = true;
                } else {
                    $scope.disabletempContents = !true;
                }
                if (($scope.currentSpinList !== undefined && $scope.currentSpinList.length < 2) || $scope.cycFinish) {
                    $scope.disablespinContents = true;
                } else {
                    $scope.disablespinContents = !true;
                }
                if ($scope.currentRinseList !== undefined && $scope.currentRinseList.length < 2) {
                    $scope.disablerinseContents = true;
                } else {
                    $scope.disablerinseContents = !true;
                }
                if (soilDisable || ($scope.currentSoilList !== undefined && $scope.currentSoilList.length < 2)) {
                    $scope.disablesoilContents = true;
                } else {
                    $scope.disablesoilContents = !true;
                }
                if ($scope.currentDryComboLevelList !== undefined && $scope.currentDryComboLevelList.length < 2) {
                    $scope.disabledrylevelContents = true;
                } else {
                    $scope.disabledrylevelContents = !true;
                }
            } else {
                // This condition is added because if the dryingOnly is set by app due to course selection or other things it must be set to false ....because watch updates it after the update
                if ($scope.dryingOnlySetByApp) {
                    $scope.dryingOnly = false;
                    $scope.dryingOnlySetByApp = false;
                }
                if ($scope.spinOnlySetByApp) {
                    $scope.spinOnly = false;
                    $scope.spinOnlySetByApp = false;
                }
                if ($scope.rinseOnlySetByApp) {
                    $scope.rinseOnly = false;
                    $scope.rinseOnlySetByApp = false;
                }
                if ($scope.washNotIncluded || $scope.dryingOnly || $scope.rinseOnly || $scope.spinOnly || tempDisable || steamTempDisable || ($scope.currentTempList !== undefined && $scope.currentTempList.length < 2)) {
                    $scope.disabletempContents = true;
                } else {
                    $scope.disabletempContents = !true;
                }
                if (dryLevelTemp || ($scope.currentSpinList !== undefined && $scope.currentSpinList.length < 2) || $scope.cycFinish) {
                    $scope.disablespinContents = true;
                } else {
                    $scope.disablespinContents = !true;
                }
                if ($scope.currentRinseList !== undefined && $scope.currentRinseList.length < 2) {
                    $scope.disablerinseContents = true;
                } else {
                    $scope.disablerinseContents = !true;
                }
                if ($scope.washNotIncluded || $scope.dryingOnly || $scope.rinseOnly || $scope.spinOnly || soilDisable || ($scope.currentSoilList !== undefined && $scope.currentSoilList.length < 2)) {
                    $scope.disablesoilContents = true;
                } else {
                    $scope.disablesoilContents = !true;
                }
                if ($scope.currentDryComboLevelList !== undefined && $scope.currentDryComboLevelList.length < 2) {
                    $scope.disabledrylevelContents = true;
                } else {
                    $scope.disabledrylevelContents = !true;
                }
            }
            updateBubbleSoakValue();
        }
        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
            if (ifNotFromSet) {
                if (tempDisableMain || steamTempDisableMain || ($scope.currentTempListMain !== undefined && $scope.currentTempListMain.length < 2)) {
                    $scope.disabletempContentsMain = true;
                } else {
                    $scope.disabletempContentsMain = !true;
                }
                if (($scope.currentSpinListMain !== undefined && $scope.currentSpinListMain.length < 2) || $scope.cycFinishMain) {
                    $scope.disablespinContentsMain = true;
                } else {
                    $scope.disablespinContentsMain = !true;
                }
                if ($scope.currentRinseListMain !== undefined && $scope.currentRinseListMain.length < 2) {
                    $scope.disablerinseContentsMain = true;
                } else {
                    $scope.disablerinseContentsMain = !true;
                }
                if (soilDisableMain || ($scope.currentSoilListMain !== undefined && $scope.currentSoilListMain.length < 2)) {
                    $scope.disablesoilContentsMain = true;
                } else {
                    $scope.disablesoilContentsMain = !true;
                }
                if ($scope.currentDryComboLevelListMain !== undefined && $scope.currentDryComboLevelListMain.length < 2) {
                    $scope.disabledrylevelContentsMain = true;
                } else {
                    $scope.disabledrylevelContentsMain = !true;
                }
            } else {
                if ($scope.washNotIncludedMain || $scope.dryingOnlyMain || $scope.rinseOnlyMain || $scope.spinOnlyMain || tempDisableMain || steamTempDisableMain || ($scope.currentTempListMain !== undefined && $scope.currentTempListMain.length < 2)) {
                    $scope.disabletempContentsMain = true;
                } else {
                    $scope.disabletempContentsMain = !true;
                }
                if (dryLevelTemp || ($scope.currentSpinListMain !== undefined && $scope.currentSpinListMain.length < 2) || $scope.cycFinishMain) {
                    $scope.disablespinContentsMain = true;
                } else {
                    $scope.disablespinContentsMain = !true;
                }
                if ($scope.spinOnlyMain || $scope.currentRinseListMain !== undefined && $scope.currentRinseListMain.length < 2) {
                    $scope.disablerinseContentsMain = true;
                } else {
                    $scope.disablerinseContentsMain = !true;
                }
                if ($scope.washNotIncludedMain || $scope.dryingOnlyMain || $scope.rinseOnlyMain || $scope.spinOnlyMain || soilDisableMain || ($scope.currentSoilListMain !== undefined && $scope.currentSoilListMain.length < 2)) {
                    $scope.disablesoilContentsMain = true;
                } else {
                    $scope.disablesoilContentsMain = !true;
                }
                if ($scope.currentDryComboLevelListMain !== undefined && $scope.currentDryComboLevelListMain.length < 2) {
                    $scope.disabledrylevelContentsMain = true;
                } else {
                    $scope.disabledrylevelContentsMain = !true;
                }
            }
        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
            if (ifNotFromSet) {
                if (tempDisableSub || steamTempDisableSub || ($scope.currentTempListSub !== undefined && $scope.currentTempListSub.length < 2)) {
                    $scope.disabletempContentsSub = true;
                } else {
                    $scope.disabletempContentsSub = !true;
                }
                if (($scope.currentSpinListSub !== undefined && $scope.currentSpinListSub.length < 2) || $scope.cycFinishSub) {
                    $scope.disablespinContentsSub = true;
                } else {
                    $scope.disablespinContentsSub = !true;
                }
                if ($scope.currentRinseListSub !== undefined && $scope.currentRinseListSub.length < 2) {
                    $scope.disablerinseContentsSub = true;
                } else {
                    $scope.disablerinseContentsSub = !true;
                }
                if (soilDisableSub || ($scope.currentSoilListSub !== undefined && $scope.currentSoilListSub.length < 2)) {
                    $scope.disablesoilContentsSub = true;
                } else {
                    $scope.disablesoilContentsSub = !true;
                }
                if ($scope.currentDryComboLevelListSub !== undefined && $scope.currentDryComboLevelListSub.length < 2) {
                    $scope.disabledrylevelContentsSub = true;
                } else {
                    $scope.disabledrylevelContentsSub = !true;
                }
            } else {
                if ($scope.washNotIncludedSub || $scope.dryingOnlySub || $scope.rinseOnlySub || $scope.spinOnlySub || tempDisableSub || steamTempDisableSub || ($scope.currentTempListSub !== undefined && $scope.currentTempListSub.length < 2)) {
                    $scope.disabletempContentsSub = true;
                } else {
                    $scope.disabletempContentsSub = !true;
                }
                if (dryLevelTemp || ($scope.currentSpinListSub !== undefined && $scope.currentSpinListSub.length < 2) || $scope.cycFinishSub) {
                    $scope.disablespinContentsSub = true;
                } else {
                    $scope.disablespinContentsSub = !true;
                }
                if ($scope.spinOnlySub || $scope.currentRinseListSub !== undefined && $scope.currentRinseListSub.length < 2) {
                    $scope.disablerinseContentsSub = true;
                } else {
                    $scope.disablerinseContentsSub = !true;
                }
                if ($scope.washNotIncludedSub || $scope.dryingOnlySub || $scope.rinseOnlySub || $scope.spinOnlySub || soilDisableSub || ($scope.currentSoilListSub !== undefined && $scope.currentSoilListSub.length < 2)) {
                    $scope.disablesoilContentsSub = true;
                } else {
                    $scope.disablesoilContentsSub = !true;
                }
                if ($scope.currentDryComboLevelListSub !== undefined && $scope.currentDryComboLevelListSub.length < 2) {
                    $scope.disabledrylevelContentsSub = true;
                } else {
                    $scope.disabledrylevelContentsSub = !true;
                }
            }
        } else {
            ;//Nothing
        }
        updateProgress();
    }

    function updateLandingpage(selectedItem) {
//        steamModel = false;
//        soilDisable = false;
//        steamTempDisable = false;

        if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
            currentRunItem = selectedItem;
        }
        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
            currentRunItemMain = selectedItem;
        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
            currentRunItemSub = selectedItem;
        } else {
            ;//Nothing
        }
        if (angular.isDefined($scope.mostUsed)) {
            $scope.listItemsModes[0].CourseEnum = mostUsedCourseName;
        }
        mostUsedSelected = false;
        $scope.specialCaseRinse = $scope.setRinse;//selectedItem.defaultRinse;
        if (dryLevelEnabled) {
            dryLevelTemp = true;
        } else {
            dryLevelTemp = false;
        }
        if ($scope.deviceMode === "39" || $scope.deviceMode === "2E") {
            dryLevelTemp = false;
        }
        if (dryLevelTemp) {
            $scope.setSpin = "ExtraHigh";
        }
        setCommonValues(selectedItem);
        checkSpecialUS();
        updateOptionsGUI();
        checkSpecialEcodrum();
    }

    function checkSpecialEcodrum() {
        if ($scope.deviceModel !== undefined) {
            var chkModel = $scope.deviceModel.slice(11, 15);
            if ((chkModel === WASHER_DEVICEINFO.WasherDrumEu ||
                    chkModel === WASHER_DEVICEINFO.WasherSmallKor ||
                    chkModel === WASHER_DEVICEINFO.WasherSmallEu ||
                    chkModel === WASHER_DEVICEINFO.WasherSmallAu)) {
                if ($scope.deviceMode === WASHER_DEVICEMODES.EcoDrumClean ||
                        $scope.deviceMode === WASHER_DEVICEMODES.DrumClean ||
                        $scope.deviceMode === WASHER_DEVICEMODES.EcoDrumClean1 ||
                        $scope.deviceMode === WASHER_DEVICEMODES.DrumClean1) {
                    $scope.setTemp = "70";
                }
            }

            if ($scope.setTemp === "95") {
                $scope.rinseremove01 = true;
            } else {
                $scope.rinseremove01 = false;
            }

            // Previously only on combo model but after asking device team dated 1/13/2017 it was set for all the models
            if ($scope.setTemp === "90") {
                $scope.rinseremove0102 = true;
            } else {
                $scope.rinseremove0102 = false;
            }
        }
    }

    function checkSpecialCase() {
        console.log("checkSpecialCase start||$scope.setTemp="+$scope.setTemp);

        if ($scope.deviceModel !== undefined) {
            var chkModel = $scope.deviceModel.slice(11, 15);
            if (chkModel === WASHER_DEVICEINFO.WasherDrumEu ||
                    chkModel === WASHER_DEVICEINFO.WasherSmallKor ||
                    chkModel === WASHER_DEVICEINFO.WasherSmallEu ||
                    chkModel === WASHER_DEVICEINFO.WasherSmallAu) {
                if ($scope.rinseChanged && ($scope.setTemp === "95")) {
                    if ($scope.setRinse === "0" || $scope.setRinse === "1" || $scope.setRinse === "2") {
                        debugMessage("In the check special case rinse value for 0 ,1");
                        $scope.setRinse = "2";
                    }
                } else {
                    if ($scope.setTemp === "95") {
                        $scope.setRinse = "4";
                        $scope.specialCaseRinse = $scope.setRinse;
                    } else if (!$scope.rinseChanged) {
                        if (deviceCurrentMode === $scope.currentCourseHex) {
                            $scope.setRinse = deviceRinse;//$scope.specialCaseRinse;
                            $scope.specialCaseRinse = deviceRinse;
                        } else {
                            $scope.setRinse = appSelectedItem.defaultRinse;
                            $scope.specialCaseRinse = $scope.setRinse;

                        }
                    } else {
                        $scope.setRinse = $scope.specialCaseRinse;
                    }
                }
            }
            console.log("chkModel="+chkModel);
            console.log(" $scope.deviceMode="+ $scope.deviceMode);

            if (chkModel === WASHER_DEVICEINFO.WasherDrumKor) {
                if ($scope.deviceMode === WASHER_DEVICEMODES.BabyBubble || $scope.deviceMode === WASHER_DEVICEMODES.BabyCare || $scope.deviceMode === WASHER_DEVICEMODES.BabyCare1) {
                    $scope.rinseremove01 = true;
                } else {
                    $scope.rinseremove01 = false;
                }
                if (($scope.setTemp === "95") && ($scope.setRinse === "0" || $scope.setRinse === "1" || $scope.setRinse === "2")) {
                    debugMessage("In the check special case rinse value for 0 ,1");
                    $scope.setRinse = "2";
                }
            }

            if ($scope.setTemp === "95") {
                $scope.rinseremove01 = true;
            } else {
                $scope.rinseremove01 = false;
            }

            if ($scope.setTemp === "90") {
                $scope.rinseremove0102 = true;
            } else {
                $scope.rinseremove0102 = false;
            }
            if (($scope.setTemp === "90" || $scope.setTemp === "95") && ($scope.setRinse === "1" || $scope.setRinse === "0")) {
                $scope.setRinse = "2";
            }
        }
    }

    function checkSpecialCaseFav() {
        if ($scope.deviceModel !== undefined) {
            var chkModel = $scope.deviceModel.slice(11, 15);
            if (chkModel === WASHER_DEVICEINFO.DualWasherCombo) {
                if ($scope.setTempFav === "90") {
                    $scope.rinseremove0102Fav = true;
                } else {
                    $scope.rinseremove0102Fav = false;
                }
                if (($scope.setTempFav === "90" || $scope.setTempFav === "95") && ($scope.setRinseFav === "1" || $scope.setRinseFav === "0")) {
                    $scope.setRinseFav = "2";
                }
            }
        }
    }

    function checkSpecialUS() {
        if ($scope.deviceModel !== undefined) {
            var chkModel = $scope.deviceModel.slice(11, 15);
            if ($scope.isSoilLevel && (chkModel === WASHER_DEVICEINFO.WasherDrumUs || chkModel === WASHER_DEVICEINFO.DualWasherUS)) {
                switch ($scope.deviceMode) {
                    case WASHER_DEVICEMODES.DiningKitchenwork: // Cooking & Dining
                        if ($scope.setSoil === "ExtraLight") {
                            $scope.setTemp = "EcoWarm";
                        } else if ($scope.setSoil === "ExtraHeavy") {
                            $scope.setTemp = "Hot";
                        } else {
                            //                        $scope.setTemp = "Warm";
                        }
                        break;
                    case WASHER_DEVICEMODES.GardeningNMachinery: // Gardening & Yard Work
                        if (($scope.setSoil === "ExtraLight") || ($scope.setSoil === "Light")) {
                            $scope.setTemp = "EcoWarm";
                        } else if ($scope.setSoil === "ExtraHeavy") {
                            $scope.setTemp = "Hot";
                        } else {
                            //                        $scope.setTemp = "Warm";
                        }
                        break;
                    case WASHER_DEVICEMODES.PicnicCamping: // Outdoors & Travel
                        if ($scope.setSoil === "ExtraLight") {
                            $scope.setTemp = "EcoWarm";
                        }
                        break;
                    case WASHER_DEVICEMODES.Kidswear: // Active Kids
                        if ($scope.setSoil === "ExtraLight") {
                            $scope.setTemp = "EcoWarm";
                        } else if ($scope.setSoil === "Extraheavy") {
                            $scope.setTemp = "Hot";
                        } else {
                            //                        $scope.setTemp = "Warm";
                        }
                        break;
                    case WASHER_DEVICEMODES.DeskOffice: // Working & Everyday
                        if (($scope.setSoil === "Normal") || ($scope.setSoil === "Heavy")) {
                            $scope.setTemp = "Warm";
                        }
                        break;
                    case WASHER_DEVICEMODES.Nursery: // BabyCare 다른 코스에서 어떻게 사용되는지 확인 필요
                        if ($scope.setSoil === "ExtraLight") {
                            $scope.setTemp = "EcoWarm";
                        } else if (($scope.setSoil === "ExtraHeavy")
                                || ($scope.setSoil === "Heavy")) {
                            $scope.setTemp = "Hot";
                        } else {
                            //                        $scope.setTemp = "Warm";
                        }
                        break;
                    default:
                        break;
                }
            }
            if (steamModel && (chkModel === WASHER_DEVICEINFO.WasherDrumUs || chkModel === WASHER_DEVICEINFO.DualWasherUS)) {
                switch ($scope.deviceMode) {
                    case WASHER_DEVICEMODES.Normal:
                    case WASHER_DEVICEMODES.HeavyDuty:
                    case WASHER_DEVICEMODES.Bedding:
                    case WASHER_DEVICEMODES.Bedding_US:
                    case WASHER_DEVICEMODES.Bedding_17_US:
                    case WASHER_DEVICEMODES.StainAway:
                    case WASHER_DEVICEMODES.Sanitize:
                    case WASHER_DEVICEMODES.Sanitize_US:
                    case WASHER_DEVICEMODES.Sanitize_17_US:
                    case WASHER_DEVICEMODES.DiningKitchenwork://Cooking &dining
                    case WASHER_DEVICEMODES.GardeningNMachinery://Gardening & Yard work
                    case WASHER_DEVICEMODES.Kidswear://Active kids
                    case WASHER_DEVICEMODES.Nursery://Baby care
                    case WASHER_DEVICEMODES.Whites:
                    case WASHER_DEVICEMODES.Allergen:
                    case WASHER_DEVICEMODES.HeavyDuty_US:
                    case WASHER_DEVICEMODES.Heavy_Duty_US:
                    case WASHER_DEVICEMODES.StainAway_US:
                    case WASHER_DEVICEMODES.DeepSteam_US:
                    case WASHER_DEVICEMODES.Whites_17_US:
                        if ($scope.deviceMode === WASHER_DEVICEMODES.Bedding || $scope.deviceMode === WASHER_DEVICEMODES.Bedding_US || $scope.deviceMode === WASHER_DEVICEMODES.Bedding_17_US) {
                            $scope.setTemp = "Warm";
                        } else if ($scope.deviceMode === WASHER_DEVICEMODES.Sanitize || $scope.deviceMode === WASHER_DEVICEMODES.Sanitize_US || $scope.deviceMode === WASHER_DEVICEMODES.Sanitize_17_US) {
                            $scope.setTemp = "ExtraHot";
                        } else {
                            $scope.setTemp = "Hot";
                        }
                        //                        if(dmName === "WF457"){
                        //                            $scope.setSoil = "ExtraHeavy";
                        //                        } else {
                        //                            $scope.setSoil = "Heavy";
                        //                        }
                        $scope.setSoil = $scope.currentSoilList[$scope.currentSoilList.length - 1];
                        if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
                            soilDisable = true;
                            steamTempDisable = true;
                        }
                        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                            soilDisableMain = true;
                            steamTempDisableMain = true;
                        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                            soilDisableSub = true;
                            steamTempDisableSub = true;
                        } else {
                            ;//Nothing
                        }
                        break;
                    default:
                        break;
                }
            }
            if (chkModel === WASHER_DEVICEINFO.DualWasherCombo) {
                if ($scope.setTemp === "90") {
                    $scope.rinseremove0102 = true;
                } else {
                    $scope.rinseremove0102 = false;
                }
            }
        }
    }

    function getEcottonCourse(cuurentModecourse) {
        if (cuurentModecourse === '46' || cuurentModecourse === '3F' || cuurentModecourse === '68' || cuurentModecourse === '6E') {
            return true;
        }
        return false;
    }
    function setTempSelectValue(item){
        console.log("setTempSelectValue")
        $scope.setTemp = item;

        switch(item){
            case "90":
                $scope.tempSlide.noUiSlider.set(100);
                break;
            case "60":
                $scope.tempSlide.noUiSlider.set(80);
                break;
            case "40":
                $scope.tempSlide.noUiSlider.set(60);
                break;
            case "30":
                $scope.tempSlide.noUiSlider.set(40);
                break;
            case "20":
                $scope.tempSlide.noUiSlider.set(20);
                break;
            case "Cold":
                $scope.tempSlide.noUiSlider.set(0);
                break;

        }
    }
    function selectIndexTemp() {
        var selectedItem = $scope.setTemp;

        sendSAData(SA_WASHER.TEMP_SELECTION_POPUP.SCREEN, SA_WASHER.TEMP_SELECTION_POPUP.TEMP_SELECTED, selectedItem.toString(), 1);

        if ($scope.currentTempList.indexOf(selectedItem) < 0) {
            return;
        }
        $scope.tempPopup = false;
        toggleBottomPopUpClass($scope.tempPopup);
        changePopUpClass($scope.tempPopup);
        //$scope.setTemp = selectedItem;
        checkSpecialCase();
    }
    function selectIndexSpinValue(selectedItem){
        $scope.setSpin = selectedItem;

        $(".BottomPopUpImageSpin").removeClass('spinAnimate'+$scope.spinTempVal);
        setTimeout("$('.BottomPopUpImageSpin').addClass('spinAnimate"+$scope.currentSpinList.indexOf(selectedItem)+"');",100);
        $scope.spinTempVal = $scope.currentSpinList.indexOf(selectedItem);
    }
    function selectIndexSpin() {
        console.log("selectIndexRinse = "+$scope.currentSpinList.indexOf($scope.setSpin) +"spinTempVal = "+$scope.spinTempVal);

        if ($scope.currentSpinList.indexOf($scope.setSpin) < 0) {
            return;
        }
        if (($scope.spinOnly && !rinseSelected) && ($scope.setSpin === "None" || $scope.setSpin === "RinseHold") && (tempDisable === undefined || (tempDisable))) {
            return true;
        }
        $scope.spinPopup = false;
        toggleBottomPopUpClass($scope.spinPopup);
        changePopUpClass($scope.spinPopup);
//        $scope.setSpin = selectedItem;
        checkSpecialCase();
    }

    function selectIndexTempSoilLevel(selectedItem) {
        if ($scope.currentSoilList.indexOf(selectedItem) < 0) {
            return;
        }
        $scope.soilPopup = false;
        toggleBottomPopUpClass($scope.soilPopup);
        changePopUpClass($scope.soilPopup);
        $scope.setSoil = selectedItem;
        checkSpecialCase();
    }

    function selectIndexRinse(selectedItem, index) {
        console.log("selectIndexRinse = "+selectedItem + "waveTempVal = "+$scope.waveTempVal);
        
        $(".BottomPopUpImageWave").removeClass('waveAnimate'+$scope.waveTempVal);
        setTimeout("$('.BottomPopUpImageWave').addClass('waveAnimate"+selectedItem+"');",100);
        $scope.waveTempVal = selectedItem;
        
        if ($scope.currentRinseList.length - (index + 1) !== 0) {
            rinseSelected = true;
        }
        if ($scope.currentRinseList.indexOf(selectedItem) < 0) {
            return;
        }
        if ($scope.rinseremove01 && (selectedItem === "0" || selectedItem === "1")) {
            return;
        }
        
//        $scope.rinsePopup = false;
//        toggleBottomPopUpClass($scope.rinsePopup);
//        changePopUpClass($scope.rinsePopup);
        $scope.setRinse = selectedItem; //여기 있어야 함
        debugMessage($scope.specialCaseRinse + "Rinse changed" + $scope.setRinse);
        
//        if ($scope.specialCaseRinse !== $scope.setRinse) {
//            $scope.rinseChanged = true;
//            $scope.specialCaseRinse = $scope.setRinse;
//            debugMessage("Rinse changed" + $scope.rinseChanged);
//        }
//        checkSpecialCase();
        
    }

    function selectIndexDryLevel(selectedItem) {
        if ($scope.currentDryComboLevelList === undefined || $scope.currentDryComboLevelList.indexOf(selectedItem) < 0) {
            return;
        }
        $scope.setDryComboLevel = selectedItem;
    }

    function selectIndexDryLevelFav(selectedItem) {
        if ($scope.currentDryComboLevelListFav === undefined || $scope.currentDryComboLevelListFav.indexOf(selectedItem) < 0) {
            return;
        }
        $scope.setDryComboLevelFav = selectedItem;
    }

    function selectIndexKoreanComboSubOption(index) {
        $scope.isKoreanComboSubOption = false;
        toggleBottomPopUpClass($scope.isKoreanComboSubOption);
        changePopUpClass($scope.isKoreanComboSubOption);
        $scope.koreanComboSubIndex = index;
    }

    function selectIndexKoreanComboSubOptionFav(index) {
        $scope.isKoreanComboSubOptionFav = false;
        toggleBottomPopUpClass($scope.isKoreanComboSubOptionFav);
        changePopUpClass($scope.isKoreanComboSubOptionFav);
        $scope.koreanComboSubIndexFav = index;
    }

    function doCancelWashing() {
        $scope.cancelButtonPressed = true;
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
            sendSAData(SA_WASHER.TOP_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.TOP_LOAD_DETAIL_PAGE.CANCEL_BTN, "", "");
        } else {
            sendSAData(SA_WASHER.FRONT_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.FRONT_LOAD_DETAIL_PAGE.CANCEL_BTN, "", "");
        }
        cancelWashing();
    }

    function cancelWashing() {
        $timeout(function () {
            if ($scope.kidsLock) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_child_lock_title,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_message,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                $scope.cancelButtonPressed = false;
                changePopUpClass(true);
                return;
            }
            if (!$scope.remoteControlEnabled) {
                $scope.errorList.push({
                    title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                    msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                $scope.cancelButtonPressed = false;
                changePopUpClass(true);
                return;
            }
            if ($scope.hotwarning) {
                $scope.errorList.push({
                    title: '',
                    msg: $scope.translation.WEBMOB_device_washer_alarm_device_control_error_msg,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                    btnOkHandler: function () {
                        onOkClicked(true);
                    },
                    closeDialog: !true
                });
                $scope.cancelButtonPressed = false;
                changePopUpClass(true);
                return;
            }
            $scope.alertState = WASHERALERT.CANCEL;
            $scope.errorList.push({
                msg: $scope.translation.WEBMOB_device_washer_alarm_confirm_course_cancel_washer,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_yes_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                btnCancelTxt: $scope.translation.WEBMOB_device_washer_comm_no_CL,
                btnCancelHandler: function () {
                    onOkClicked(false);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            $scope.cancelButtonPressed = false;
        }, MATERIAL_DESIGN.BTN_ANIMATION_TIME);
    }

    /*$scope.cycleFinished = function () {
     debugMessage("Cycle done");
     $scope.currentScreen = WASHERSCREENS.CYCLEFINISH;
     changeScreen();
     };*/

    function cycleConfirm() {
        alarmConfirm();
    }

    function showConnectionFailurePopup() {
        debugMessage("In the connection failure pop-up");
        $scope.loadingBar = false;
        $scope.custDialogpopup = false;
        $scope.modePopup = false;
        document.getElementById("cPopup").style.zIndex = 999;
        document.getElementById("cPopup1").style.zIndex = 999;
        if ($scope.currentScreen !== WASHERSCREENS.CYCLEFINISH || !$scope.laundrySwitch) {
            $scope.alertState = WASHERALERT.CONNECTION_FAILURE;
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_connection_end_title,
                msg: $scope.translation.WEBMOB_device_washer_alarm_connection_end_msg,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
        }
    }

    function showcustCountrySelectionPopup() {
        //debugMessage("showcustCountrySelectionPopup :: "+countryName[0]);
        $scope.countrySelectionPopupVisible = true;
        document.getElementById('selectLanguageID').innerHTML = $scope.translation.WEBMOB_common_tutorial_select_language; //"Select Language";
        document.getElementById('okButtonID').innerHTML = $scope.translation.WEBMOB_device_washer_comm_ok_CL;
        document.getElementById('cancelButtonID').innerHTML = $scope.translation.WEBMOB_device_washer_comm_cancel_CL;
    }

    function onCountrySelected(countryIndex) {
        debugMessage("country selected is " + countryIndex);
        $scope.countrySelectedIndex = countryIndex;
    }

    function onKoreanComboOptionsSelected(index) {
        $scope.koreanComboIndex = index;
        if ((index === $scope.koreanComboOptions.length - 1) && ($scope.koreanComboSubOptions.length > 0)) {
            openKoreanComboSubOptionPopOver();
        }
    }

    function onKoreanComboOptionsSelectedFav(index) {
        $scope.koreanComboIndexFav = index;
        if ((index === $scope.koreanComboOptionsFav.length - 1) && ($scope.koreanComboSubOptionsFav.length > 0)) {
            openKoreanComboSubOptionPopOverFav();
        }
    }

    function onCountrySelectedOkClicked(isCountrySelected) {
        //Removed static check as in demo mode also we need to run native commands
        if (isCountrySelected/* && !$scope.isStatic*/) {
            if ($scope.countrySelectedIndex === 0) {
                $timeout(function () {
                    nativeInterface.runOnNative("customerService", aboutCommand(reqParamCountrySelection));
                }, MATERIAL_DESIGN.LIST_ANIMATION_TIME);
            } else {
                $timeout(function () {
                    nativeInterface.runOnNative("customerService", aboutCommand(reqParamCountrySelection, true));
                }, MATERIAL_DESIGN.LIST_ANIMATION_TIME);
            }
        }
        closeCountrySelectionPopup();
    }

    function showcustDialog(msgheader, popuptext, showok, showCancel) {
        $scope.custDialogpopup = true;
        //document.getElementById("custpopupheadertext").innerHTML = msgheader;
        $scope.popupTextDisplay = popuptext;
        if (showok) {
            document.getElementById("popupok").style.visibility = "visible";
        } else {
            document.getElementById("popupok").style.visibility = "hidden";
        }
        if (showCancel) {
            document.getElementById("popupcancel").style.visibility = "visible";
        } else {
            document.getElementById("popupcancel").style.visibility = "hidden";
        }
    }

    function onOkClicked(checkok) {
        $timeout(function () {
            debugMessage("$scope.alertState ::" + $scope.alertState);
            debugMessage("$scope.alertState ::" + $scope.alertState + ":::::" + $scope.currentScreen);
            var poppedObj;
            if ($scope.errorList.length > 0) {
                poppedObj = $scope.errorList.pop();
            }

            if (checkok) {
                if (angular.isDefined(poppedObj) && angular.isDefined(poppedObj.id)) {
                    switch (poppedObj.id) {
                        case WASHER_ALERT_ID.OTN_POPUP:
                            sendOTNRequest();
                            break;
                    }
                } else if ($scope.alertState === WASHERALERT.CANCEL) {
                    cancelProgress();
                } else if ($scope.alertState === WASHERALERT.CYCLEFINISHED) {
                    updateCancelProgres();
                } else if ($scope.alertState === WASHERALERT.CONNECTION_FAILURE) {
                    if ($scope.currentScreen === WASHERSCREENS.CYCLEFINISH || ($scope.currentScreen === WASHERSCREENS.DETAILPAGE && $scope.cycFinish)) {
                        // do nothing
                    } else {
                        $scope.closeApp();
                    }

                } else if ($scope.alertState === WASHERALERT.ALARMSERVICE) {
                    // Close popup, do not call on ok button issue : prms 0000062109
                    /*if($scope.supportCalling) {
                     nativeInterface.runOnNative("callDial", alarmServicePayload());
                     }*/
                    $scope.callCenter($scope.callServiceIndex);
                } else if ($scope.alertState === WASHERALERT.RESETENERGY) {
                    $scope.isCallFromEnergyReset = true;
                    sendResetCommand();
                } else if ($scope.alertState === WASHERALERT.DELETE_MYFAVORITES) {
                    if ($scope.bAllListSelected) {
                        deletAllFromFavorites();
                    } else if (!$scope.bAllListSelected && $scope.isAnyCheckedItem) {
                        deleteSelectedItemFromFavorites();
                    } else {
                        ; //nothing
                    }
                } else if ($scope.alertState === WASHERALERT.DRAINFILTER_GUIDE) {
                    $scope.currentScreen = WASHERSCREENS.DRAINFILTERGUIDEPAGE;
                    changeScreen();
                } else {
                    ;// Nothing
                }
            } else {
                if (angular.isDefined(poppedObj.id)) {
                    switch (poppedObj.id) {
                        case WASHER_ALERT_ID.OTN_POPUP:
                            cancelOTNRequest();
                            break;
                    }
                } else if (poppedObj["msg"] === $scope.translation.WEBMOB_device_washer_alarm_smart_control_off_washer_msg) {
                    getSmartControlNoti = false;
                } else {
                    ;//Nothing
                }
            }
            document.getElementById("scrollSettings").style.overflowY = "overlay";
            $scope.custDialogpopup = false;
            $scope.alertState = -1;
        }, MATERIAL_DESIGN.BTN_ANIMATION_TIME);
    }

    function closepopup() {
        return;
    }

    function closeCountrySelectionPopup() {
        $scope.countrySelectionPopupVisible = false;
    }

    function smartcareerrorcheck() {
        if ($scope.kidsLock) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_child_lock_title,
                msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_message,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }
        if (!$scope.remoteControlEnabled) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }
        if (!$scope.isStatic) {
            clickedDiagnosis = true;
            var washerId = 0;
            if ($scope.isDualWasher && $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                washerId = 1
            }
            $scope.checkResponse.push(WASHER_COMMANDS.diagnosis);
            SHPService.sendSHPCommand(CONSTANTS.PUT, diagnosisCommand(), "/" + $scope.peerId + "/devices/" + washerId + "/diagnosis", true, 300000);
        } else {
            $scope.currentScreen = WASHERSCREENS.SMARTCAREERROR;
            changeScreen();
        }
    }

    function diagnosisCommand() {
        return '{"Diagnosis": {"diagnosisStart": "Run"}}';
    }

    function showDiagnosisPage(diagnosisVal) {
        if (angular.isDefined(diagnosisVal.diagnosisStart)) {
            $scope.diagnosisState = diagnosisVal.diagnosisStart;
            if (diagnosisVal.diagnosisStart === "Ready") {
                if (clickedDiagnosis) {
                    clickedDiagnosis = false;
                    dismissLoadingBar(WASHER_COMMANDS.diagnosis);
                    if ($scope.currentScreen === WASHERSCREENS.ALARMSCREEN) {
                        debugMessage("return showDiagnosisPage " + $scope.currentScreen + " && " + $scope.diagnosisState);
                        return;
                    }
                    $scope.currentScreen = WASHERSCREENS.SMARTCAREERROR;
                    changeScreen();
                }
            } else if (diagnosisVal.diagnosisStart === "Run") {
                clickedDiagnosis = true;
                if ($scope.currentScreen === WASHERSCREENS.ALARMSCREEN) {
                    debugMessage("return showDiagnosisPage " + $scope.currentScreen + " && " + $scope.diagnosisState);
                    return;
                }
                // If we get diagnosis run notification because user has sent request from another mobile, then show loading bar
                if ($scope.checkResponse.indexOf(WASHER_COMMANDS.diagnosis) === -1) {
                    $scope.checkResponse.push(WASHER_COMMANDS.diagnosis);
                }
                $scope.loadingBar = true;
                previousScreenAtSelfCheck = $scope.currentScreen;
                $scope.currentScreen = WASHERSCREENS.SMARTCARE;
                changeScreen();
            } else {
                //Do Nothing
            }
        }
    }

    function getErrorTitle(errorEnum) {
        debugMessage("Error code is:::::::::::::::::::::" + errorEnum);
        errorEnum = errorEnum.toUpperCase();
        switch (errorEnum) {
            case "1E":
                return $scope.translation.WEBMOB_device_washer_error_title_1e;
            case "tE":
                return $scope.translation.WEBMOB_device_washer_error_title_te1;
            case "tE1":
                return $scope.translation.WEBMOB_device_washer_error_title_te1;
            case "TE":
                return $scope.translation.WEBMOB_device_washer_error_title_te1;
            case "TE1":
                return $scope.translation.WEBMOB_device_washer_error_title_te1;
            case "TE2":
                return $scope.translation.WEBMOB_device_washer_error_title_te2;
            case "TE3":
                return $scope.translation.WEBMOB_device_washer_error_title_te3;
            case "3E":
                return $scope.translation.WEBMOB_device_washer_error_title_3e1;
            case "3E1":
                return $scope.translation.WEBMOB_device_washer_error_title_3e1;
            case "3E2":
                return $scope.translation.WEBMOB_device_washer_error_title_3e2;
            case "3E3":
                return $scope.translation.WEBMOB_device_washer_error_title_3e3;
            case "3E4":
                return $scope.translation.WEBMOB_device_washer_error_title_3e4;
            case "BE":
                return $scope.translation.WEBMOB_device_washer_error_title_be;
            case "2E":
                return $scope.translation.WEBMOB_device_washer_error_title_9e1;
            case "UC":
                return $scope.translation.WEBMOB_device_washer_error_title_9e1;
            case "9E1":
                return $scope.translation.WEBMOB_device_washer_error_title_9e1;
            case "9E2":
                return $scope.translation.WEBMOB_device_washer_error_title_9e2;
            case "E2":
                return $scope.translation.WEBMOB_device_washer_error_title_be2;
            case "BE2":
                return $scope.translation.WEBMOB_device_washer_error_title_be2;
            case "bE2":
                return $scope.translation.WEBMOB_device_washer_error_title_be2;
            case "dS":
                return $scope.translation.WEBMOB_device_washer_error_title_de;
            case "DS":
                return $scope.translation.WEBMOB_device_washer_error_title_de;
            case "dE":
                return $scope.translation.WEBMOB_device_washer_error_title_de;
            case "DE":
                return $scope.translation.WEBMOB_device_washer_error_title_de;
            case "LO":
                return $scope.translation.WEBMOB_device_washer_error_title_de1;
            case "dE1":
                return $scope.translation.WEBMOB_device_washer_error_title_de1;
            case "DE1":
                return $scope.translation.WEBMOB_device_washer_error_title_de1;
            case "dE2":
                return $scope.translation.WEBMOB_device_washer_error_title_de2;
            case "dF":
            case "dF2":
            case "DE2":
                return $scope.translation.WEBMOB_device_washer_error_title_de2;
            case "AE":
                return $scope.translation.WEBMOB_device_washer_error_title_ae;
            case "LE":
                return $scope.translation.WEBMOB_device_washer_error_title_le;
            case "FE":
                if ($scope.deviceType === "Dryer") {
                    return $scope.translation.WEBMOB_device_washer_error_title_efe;
                } else {
                    return $scope.translation.WEBMOB_device_washer_error_title_fe;
                }
                break;
            case "4E":
                return $scope.translation.WEBMOB_device_washer_error_title_4e;
            case "4E2":
                return $scope.translation.WEBMOB_device_washer_error_title_4e2;
            case "5E":
                if ($scope.deviceType === "Dryer") {
                    return $scope.translation.WEBMOB_device_washer_error_title_5e_dry;
                } else {
                    return $scope.translation.WEBMOB_device_washer_error_title_5e;
                }
                break;
            case "nd":
                return $scope.translation.WEBMOB_device_washer_error_title_5e;
            case "Hr":
                return $scope.translation.WEBMOB_device_washer_error_title_he;
            case "HE":
                return $scope.translation.WEBMOB_device_washer_error_title_he;
            case "HE1":
                return $scope.translation.WEBMOB_device_washer_error_title_he1;
            case "HE2":
                return $scope.translation.WEBMOB_device_washer_error_title_he2;
            case "CE":
                return $scope.translation.WEBMOB_device_washer_error_title_ce;
            case "UE":
                return $scope.translation.WEBMOB_device_washer_error_title_ue;
            case "dc":
                return $scope.translation.WEBMOB_device_washer_error_title_ue;
            case "8E":
                return $scope.translation.WEBMOB_device_washer_error_title_8e;
            case "PE":
                return $scope.translation.WEBMOB_device_washer_error_title_pe;
            case "NF":
                return $scope.translation.WEBMOB_device_washer_error_title_4e; //추가
            case "NF1":
                return $scope.translation.WEBMOB_device_washer_error_title_4e2; //추가
            case "OE":
                return $scope.translation.WEBMOB_device_washer_error_title_oe;
            case "oF":
                return $scope.translation.WEBMOB_device_washer_error_title_oe;
            case "4E1":
                return $scope.translation.WEBMOB_device_washer_error_title_4e;
            case "8E1":
                return $scope.translation.WEBMOB_device_washer_error_title_8e;
            case "8E2":
                return $scope.translation.WEBMOB_device_washer_error_title_8e;
            case "OF":
                return $scope.translation.WEBMOB_device_washer_error_title_oe;
            case "SDE":
                return $scope.translation.WEBMOB_device_washer_error_title_sde;
            case "tE2":
                return $scope.translation.WEBMOB_device_washer_error_title_te2;
            case "6E":
                return $scope.translation.WEBMOB_device_washer_error_title_6e;
            case 'AE3':
                return $scope.translation.WEBMOB_device_washer_error_title_ae3;
            case "AE4":
                return $scope.translation.WEBMOB_device_washer_error_title_ae4;
            case "AE5":
                return $scope.translation.WEBMOB_device_washer_error_title_ae5;
            case "AE6":
                return $scope.translation.WEBMOB_device_washer_error_title_ae6;
            case "TE4":
                return $scope.translation.WEBMOB_device_washer_error_title_te4;
            case "4E3":
                return $scope.translation.WEBMOB_device_washer_error_title_4e3;
            case "FL":
                return $scope.translation.WEBMOB_device_washer_error_title_de1;
            case "LE1":
                return $scope.translation.WEBMOB_device_washer_error_title_le1;
            case "TE5":
                return $scope.translation.WEBMOB_device_washer_error_title_te5;
                //New added from 15K
            case "1C":
                return $scope.translation.WEBMOB_device_washer_error_title_1c;
            case "tC":
                return $scope.translation.WEBMOB_device_washer_error_title_tc1;
            case "tC1":
                return $scope.translation.WEBMOB_device_washer_error_title_tc1;
            case "TC":
                return $scope.translation.WEBMOB_device_washer_error_title_tc1;
            case "TC1":
                return $scope.translation.WEBMOB_device_washer_error_title_tc1;
            case "TC2":
                return $scope.translation.WEBMOB_device_washer_error_title_tc2;
            case "TC3":
                return $scope.translation.WEBMOB_device_washer_error_title_tc3;
            case "3C":
            case "3C1":
            case "3C2":
            case "3C3":
            case "3C4":
            case "3C5":
            case "3C6":
            case "3C7":
            case "3C8":
            case "BC":
            case "3C9":
                return $scope.translation.WEBMOB_device_washer_error_title_3c1;
            case "2C":
            case "9C1":
                return $scope.translation.WEBMOB_device_washer_error_title_9c1;
            case "9C2":
                return $scope.translation.WEBMOB_device_washer_error_title_9c2;
            case "C2":
            case "BC2":
                return $scope.translation.WEBMOB_device_washer_error_title_bc2;
            case "dC":
                return $scope.translation.WEBMOB_device_washer_error_title_dc;
            case "DC":
                return $scope.translation.WEBMOB_device_washer_error_title_dc;
            case "dC1":
                return $scope.translation.WEBMOB_device_washer_error_title_dc1;
            case "DC1":
                return $scope.translation.WEBMOB_device_washer_error_title_dc1;
            case "dC2":
                return $scope.translation.WEBMOB_device_washer_error_title_dc2;
            case "DC2":
                return $scope.translation.WEBMOB_device_washer_error_title_dc2;
            case "AC":
                return $scope.translation.WEBMOB_device_washer_error_title_ac;
            case "LC":
                return $scope.translation.WEBMOB_device_washer_error_title_lc;
            case "LC1":
                return $scope.translation.WEBMOB_device_washer_error_title_lc1;
            case "FC":
            case "FC3":
                if ($scope.deviceType === "Dryer") {
                    return $scope.translation.WEBMOB_device_washer_error_title_efe;
                } else {
                    return $scope.translation.WEBMOB_device_washer_error_title_fc;
                }
                break;
            case "4C":
            case "4C1":
                return $scope.translation.WEBMOB_device_washer_error_title_4c;
            case "4C2":
                return $scope.translation.WEBMOB_device_washer_error_title_4c2;
            case "5C":
                if ($scope.deviceType === "Dryer") {
                    return $scope.translation.WEBMOB_device_washer_error_title_5e_dry;
                } else {
                    return $scope.translation.WEBMOB_device_washer_error_title_5c;
                }
                break;
            case "HC":
                return $scope.translation.WEBMOB_device_washer_error_title_hc;
            case "HC1":
                return $scope.translation.WEBMOB_device_washer_error_title_hc1;
            case "HC2":
                return $scope.translation.WEBMOB_device_washer_error_title_hc2;
            case "CC":
                return $scope.translation.WEBMOB_device_washer_error_title_cc;
            case "UB":
                return $scope.translation.WEBMOB_device_washer_error_title_ub;
            case "8C":
                return $scope.translation.WEBMOB_device_washer_error_title_8c;
            case "PC":
                return $scope.translation.WEBMOB_device_washer_error_title_pc;
            case "OC":
                return $scope.translation.WEBMOB_device_washer_error_title_oc;
            case "6C":
            case "6C1":
            case "6C2":
            case "6C3":
            case "6C4":
            case "6C5":
            case "6C6":
            case "6C7":
                return $scope.translation.WEBMOB_device_washer_error_title_6c;
            case "8C1":
                return $scope.translation.WEBMOB_device_washer_error_title_8c;
            case "8C2":
                return $scope.translation.WEBMOB_device_washer_error_title_8c;
            case "SDC":
                return $scope.translation.WEBMOB_device_washer_error_title_sdc;
            case "AC3":
                return $scope.translation.WEBMOB_device_washer_error_title_ac3;
            case "AC4":
                return $scope.translation.WEBMOB_device_washer_error_title_ac4;
            case "AC5":
                return $scope.translation.WEBMOB_device_washer_error_title_ac5;
            case "AC6":
                return $scope.translation.WEBMOB_device_washer_error_title_ac6;
            case "TC4":
                return $scope.translation.WEBMOB_device_washer_error_title_tc4;
            case "4C3":
                return $scope.translation.WEBMOB_device_washer_error_title_4c3;
            case "DDC":
                return $scope.translation.WEBMOB_device_washer_error_title_ddc;
            case "DC3":
                return $scope.translation.WEBMOB_device_washer_error_title_dc3;
            case "AC7":
                return $scope.translation.WEBMOB_device_washer_error_title_ac7;
            case "DC4":
                return $scope.translation.WEBMOB_device_washer_error_title_dc4;
            default:
                break;
        }
        return "Unknown";
    }

    function getErrorMessage(errorEnum) {
        debugMessage("Error code is 11111111111:::::::::::::::::::::" + errorEnum);
        errorEnum = errorEnum.toUpperCase();
        switch (errorEnum) {
            case '1E':
                return $scope.translation.WEBMOB_device_washer_error_message_1e_result;
            case 'tE':
                return $scope.translation.WEBMOB_device_washer_error_message_te1_result;
            case 'tE1':
                return $scope.translation.WEBMOB_device_washer_error_message_te1_result;
            case 'TE':
                return $scope.translation.WEBMOB_device_washer_error_message_te1_result;
            case 'TE1':
                return $scope.translation.WEBMOB_device_washer_error_message_te1_result;
            case 'TE2':
                return $scope.translation.WEBMOB_device_washer_error_message_te2_result;
            case 'TE3':
                return $scope.translation.WEBMOB_device_washer_error_message_te3_result;
            case '3E':
                return $scope.translation.WEBMOB_device_washer_error_message_3e1_result;
            case '3E1':
                return $scope.translation.WEBMOB_device_washer_error_message_3e1_result;
            case '3E2':
                return $scope.translation.WEBMOB_device_washer_error_message_3e2_result;
            case '3E3':
                return $scope.translation.WEBMOB_device_washer_error_message_3e3_result;
            case '3E4':
                return $scope.translation.WEBMOB_device_washer_error_message_3e4_result;
            case 'BE':
                return $scope.translation.WEBMOB_device_washer_error_message_be_result;
            case '2E':
                return $scope.translation.WEBMOB_device_washer_error_message_9e1_result;
            case 'UC':
                return $scope.translation.WEBMOB_device_washer_error_message_9e1_result;
            case '9E1':
                return $scope.translation.WEBMOB_device_washer_error_message_9e1_result;
            case '9E2':
                return $scope.translation.WEBMOB_device_washer_error_message_9e2_result;
            case 'E2':
                return $scope.translation.WEBMOB_device_washer_error_message_be2_result;
            case 'BE2':
                return $scope.translation.WEBMOB_device_washer_error_message_be2_result;
            case 'bE2':
                return $scope.translation.WEBMOB_device_washer_error_message_be2_result;
            case 'dS':
                return $scope.translation.WEBMOB_device_washer_error_message_de_result;
            case 'DS':
                return $scope.translation.WEBMOB_device_washer_error_message_de_result;
            case 'dE':
                return $scope.translation.WEBMOB_device_washer_error_message_de_result;
            case 'LO':
                return $scope.translation.WEBMOB_device_washer_error_message_de1_result;
            case 'DE':
                return $scope.translation.WEBMOB_device_washer_error_message_de_result;
            case 'dE1':
                return $scope.translation.WEBMOB_device_washer_error_message_de1_result;
            case 'DE1':
                return $scope.translation.WEBMOB_device_washer_error_message_de1_result;
            case 'dE2':
                return $scope.translation.WEBMOB_device_washer_error_message_de2_result;
            case 'dF':
            case 'dF2':
            case 'DE2':
                return $scope.translation.WEBMOB_device_washer_error_message_de2_result;
            case 'AE':
                return $scope.translation.WEBMOB_device_washer_error_message_ae_result;
            case 'LE':
                return $scope.translation.WEBMOB_device_washer_error_message_le_result;
            case 'FE':
                if ($scope.deviceType === "Dryer") {
                    return $scope.translation.WEBMOB_device_washer_error_message_efe_result;
                } else {
                    return $scope.translation.WEBMOB_device_washer_error_message_fe_result;
                }
                break;
            case '4E':
                return $scope.translation.WEBMOB_device_washer_error_message_4e_result;
            case '4E2':
                return $scope.translation.WEBMOB_device_washer_error_message_4e2_result;
            case '5E':
                if ($scope.deviceType === "Dryer") {
                    return $scope.translation.WEBMOB_device_washer_error_message_5e_dry_result;
                } else {
                    return $scope.translation.WEBMOB_device_washer_error_message_5e_result;
                }
                break;
            case 'nd':
                return $scope.translation.WEBMOB_device_washer_error_message_5e_result;
            case 'Hr':
                return $scope.translation.WEBMOB_device_washer_error_message_he_result;
            case 'HE':
                return $scope.translation.WEBMOB_device_washer_error_message_he_result;
            case 'HE1':
                return $scope.translation.WEBMOB_device_washer_error_message_he1_result;
            case 'HE2':
                return $scope.translation.WEBMOB_device_washer_error_message_he2_result;
            case 'CE':
                return $scope.translation.WEBMOB_device_washer_error_message_ce_result;
            case 'UE':
                return $scope.translation.WEBMOB_device_washer_error_message_ue_result;
            case 'dc':
                return $scope.translation.WEBMOB_device_washer_error_message_ue_result;
            case '8E':
                return $scope.translation.WEBMOB_device_washer_error_message_8e_result;
            case 'PE':
                return $scope.translation.WEBMOB_device_washer_error_message_pe_result;
            case 'NF':
                return $scope.translation.WEBMOB_device_washer_error_message_4e_result;
            case 'NF1':
                return $scope.translation.WEBMOB_device_washer_error_message_4e2_result;
            case 'OE':
                return $scope.translation.WEBMOB_device_washer_error_message_oe_result;
            case 'oF':
                return $scope.translation.WEBMOB_device_washer_error_message_oe_result;
            case '4E1':
                return $scope.translation.WEBMOB_device_washer_error_message_4e_result;
            case '8E1':
                return $scope.translation.WEBMOB_device_washer_error_message_8e_result;
            case '8E2':
                return $scope.translation.WEBMOB_device_washer_error_message_8e_result;
            case 'OF':
                return $scope.translation.WEBMOB_device_washer_error_message_oe_result;
            case 'SDE':
                return $scope.translation.WEBMOB_device_washer_error_message_sde_result;
            case 'tE2':
                return $scope.translation.WEBMOB_device_washer_error_message_te2_result;
            case '6E':
                return $scope.translation.WEBMOB_device_washer_error_message_6e_result;
            case 'AE3':
                return $scope.translation.WEBMOB_device_washer_error_message_ae3_result;
            case 'AE4':
                return $scope.translation.WEBMOB_device_washer_error_message_ae4_result;
            case 'AE5':
                return $scope.translation.WEBMOB_device_washer_error_message_ae5_result;
            case 'AE6':
                return $scope.translation.WEBMOB_device_washer_error_message_ae6_result;
            case 'TE4':
                return $scope.translation.WEBMOB_device_washer_error_message_te4_result;
            case '4E3':
                return $scope.translation.WEBMOB_device_washer_error_message_4e3_result;
            case 'FL':
                return $scope.translation.WEBMOB_device_washer_error_message_de1_result;
            case 'LE1':
                return $scope.translation.WEBMOB_device_washer_error_message_le1_result;
            case 'TE5':
                return $scope.translation.WEBMOB_device_washer_error_message_te5_result;
                //New added from 15K
            case '1C':
                return $scope.translation.WEBMOB_device_washer_error_message_1c_result;
            case 'tC':
                return $scope.translation.WEBMOB_device_washer_error_message_tc1_result;
            case 'tC1':
                return $scope.translation.WEBMOB_device_washer_error_message_tc1_result;
            case 'TC':
                return $scope.translation.WEBMOB_device_washer_error_message_tc1_result;
            case 'TC1':
                return $scope.translation.WEBMOB_device_washer_error_message_tc1_result;
            case 'TC2':
                return $scope.translation.WEBMOB_device_washer_error_message_tc2_result;
            case 'TC3':
                return $scope.translation.WEBMOB_device_washer_error_message_tc3_result;
            case '3C':
            case '3C1':
                return $scope.translation.WEBMOB_device_washer_error_message_3c1_result;
            case '3C2':
                return $scope.translation.WEBMOB_device_washer_error_message_3c2_result;
            case '3C3':
                return $scope.translation.WEBMOB_device_washer_error_message_3c3_result;
            case '3C4':
                return $scope.translation.WEBMOB_device_washer_error_message_3c4_result;
            case '3C5':
            case '3C6':
            case '3C7':
            case '3C8':
            case '3C9':
                return $scope.translation.WEBMOB_device_washer_error_message_3c1_result;
            case 'BC':
                return $scope.translation.WEBMOB_device_washer_error_message_bc_result;
            case '9C1':
            case '2C':
                return $scope.translation.WEBMOB_device_washer_error_message_9c1_result;
            case '9C2':
                return $scope.translation.WEBMOB_device_washer_error_message_9c2_result;
            case 'C2':
            case 'BC2':
                return $scope.translation.WEBMOB_device_washer_error_message_bc2_result;
            case 'dC':
                return $scope.translation.WEBMOB_device_washer_error_message_dc_result;
            case 'DC':
                return $scope.translation.WEBMOB_device_washer_error_message_dc_result;
            case 'dC1':
                return $scope.translation.WEBMOB_device_washer_error_message_dc1_result;
            case 'DC1':
                return $scope.translation.WEBMOB_device_washer_error_message_dc1_result;
            case 'dC2':
                return $scope.translation.WEBMOB_device_washer_error_message_dc2_result;
            case 'DC2':
                return $scope.translation.WEBMOB_device_washer_error_message_dc2_result;
            case 'AC':
                return $scope.translation.WEBMOB_device_washer_error_message_ac_result;
            case 'LC':
                return $scope.translation.WEBMOB_device_washer_error_message_lc_result;
            case 'LC1':
                return $scope.translation.WEBMOB_device_washer_error_message_lc1_result;
            case 'FC':
            case 'FC3':
                if ($scope.deviceType === "Dryer") {
                    return $scope.translation.WEBMOB_device_washer_error_message_efe_result;
                } else {
                    return $scope.translation.WEBMOB_device_washer_error_message_fc_result;
                }
                break;
            case '4C':
            case '4C1':
                return $scope.translation.WEBMOB_device_washer_error_message_4c_result;
            case '4C2':
                return $scope.translation.WEBMOB_device_washer_error_message_4c2_result;
            case '5C':
                if ($scope.deviceType === "Dryer") {
                    return $scope.translation.WEBMOB_device_washer_error_message_5e_dry_result;
                } else {
                    return $scope.translation.WEBMOB_device_washer_error_message_5c_result;
                }
                break;
            case 'HC':
                return $scope.translation.WEBMOB_device_washer_error_message_hc_result;
            case 'HC1':
                return $scope.translation.WEBMOB_device_washer_error_message_hc1_result;
            case 'HC2':
                return $scope.translation.WEBMOB_device_washer_error_message_hc2_result;
            case 'CC':
                return $scope.translation.WEBMOB_device_washer_error_message_cc_result;
            case 'UB':
                return $scope.translation.WEBMOB_device_washer_error_message_ub_result;
            case '8C':
                return $scope.translation.WEBMOB_device_washer_error_message_8c_result;
            case 'PC':
                return $scope.translation.WEBMOB_device_washer_error_message_pc_result;
            case 'OC':
                return $scope.translation.WEBMOB_device_washer_error_message_oc_result;
            case '6C':
            case '6C1':
            case '6C2':
            case '6C3':
            case '6C4':
            case '6C5':
            case '6C6':
            case '6C7':
                return $scope.translation.WEBMOB_device_washer_error_message_6c_result;
            case '8C1':
                return $scope.translation.WEBMOB_device_washer_error_message_8c_result;
            case '8C2':
                return $scope.translation.WEBMOB_device_washer_error_message_8c_result;
            case 'SDC':
                return $scope.translation.WEBMOB_device_washer_error_message_sdc_result;
            case 'AC3':
                return $scope.translation.WEBMOB_device_washer_error_message_ac3_result;
            case 'AC4':
                return $scope.translation.WEBMOB_device_washer_error_message_ac4_result;
            case 'AC5':
                return $scope.translation.WEBMOB_device_washer_error_message_ac5_result;
            case 'AC6':
                return $scope.translation.WEBMOB_device_washer_error_message_ac6_result;
            case 'TC4':
                return $scope.translation.WEBMOB_device_washer_error_message_tc4_result;
            case '4C3':
                return $scope.translation.WEBMOB_device_washer_error_message_4c3_result;
            case 'DDC':
                return $scope.translation.WEBMOB_device_washer_error_message_ddc_result;
            case 'DC3':
                return $scope.translation.WEBMOB_device_washer_error_message_dc3_result;
            case "AC7":
                return $scope.translation.WEBMOB_device_washer_error_message_ac7_result;
            case "DC4":
                return $scope.translation.WEBMOB_device_washer_error_message_dc4_result;
            default:
                break;
        }
        return "Unknown";
    }

    function getErrorAction(errorEnum) {
        debugMessage("Error code is 2222222222:::::::::::::::::::::" + errorEnum);
        errorEnum = errorEnum.toUpperCase();
        switch (errorEnum) {
            case '1E':
                return $scope.translation.WEBMOB_device_washer_error_message_1e_action;
            case 'tE':
                return $scope.translation.WEBMOB_device_washer_error_message_te1_action;
            case 'tE1':
                return $scope.translation.WEBMOB_device_washer_error_message_te1_action;
            case 'TE':
                return $scope.translation.WEBMOB_device_washer_error_message_te1_action;
            case 'TE1':
                return $scope.translation.WEBMOB_device_washer_error_message_te1_action;
            case 'TE2':
                return $scope.translation.WEBMOB_device_washer_error_message_te2_action;
            case 'TE3':
                return $scope.translation.WEBMOB_device_washer_error_message_te3_action;
            case '3E':
                return $scope.translation.WEBMOB_device_washer_error_message_3e1_action;
            case '3E1':
                return $scope.translation.WEBMOB_device_washer_error_message_3e1_action;
            case '3E2':
                return $scope.translation.WEBMOB_device_washer_error_message_3e2_action;
            case '3E3':
                return $scope.translation.WEBMOB_device_washer_error_message_3e3_action;
            case '3E4':
                return $scope.translation.WEBMOB_device_washer_error_message_3e4_action;
            case 'BE':
                return $scope.translation.WEBMOB_device_washer_error_message_be_action;
            case '2E':
                return $scope.translation.WEBMOB_device_washer_error_message_9e1_action;
            case 'UC':
                return $scope.translation.WEBMOB_device_washer_error_message_9e1_action;
            case '9E1':
                return $scope.translation.WEBMOB_device_washer_error_message_9e1_action;
            case '9E2':
                return $scope.translation.WEBMOB_device_washer_error_message_9e2_action;
            case 'E2':
                return $scope.translation.WEBMOB_device_washer_error_message_be2_action;
            case 'BE2':
                return $scope.translation.WEBMOB_device_washer_error_message_be2_action;
            case 'bE2':
                return $scope.translation.WEBMOB_device_washer_error_message_be2_action;
            case 'dS':
                return $scope.translation.WEBMOB_device_washer_error_message_de_action;
            case 'DS':
                return $scope.translation.WEBMOB_device_washer_error_message_de_action;
            case 'dE':
                return $scope.translation.WEBMOB_device_washer_error_message_de_action;
            case 'LO':
                return $scope.translation.WEBMOB_device_washer_error_message_de1_action;
            case 'DE':
                return $scope.translation.WEBMOB_device_washer_error_message_de_action;
            case 'dE1':
                return $scope.translation.WEBMOB_device_washer_error_message_de1_action;
            case 'DE1':
                return $scope.translation.WEBMOB_device_washer_error_message_de1_action;
            case 'dE2':
                return $scope.translation.WEBMOB_device_washer_error_message_de2_action;
            case 'dF':
            case 'dF2':
            case 'DE2':
                return $scope.translation.WEBMOB_device_washer_error_message_de2_action;
            case 'AE':
                return $scope.translation.WEBMOB_device_washer_error_message_ae_action;
            case 'LE':
                return $scope.translation.WEBMOB_device_washer_error_message_le_action;
            case 'FE':
                if ($scope.deviceType === "Dryer") {
                    return $scope.translation.WEBMOB_device_washer_error_message_efe_action;
                } else {
                    return $scope.translation.WEBMOB_device_washer_error_message_fe_action;
                }
                break;
            case '4E':
                return $scope.translation.WEBMOB_device_washer_error_message_4e_action;
            case '4E2':
                return $scope.translation.WEBMOB_device_washer_error_message_4e2_action;
            case '5E':
                if ($scope.deviceType === "Dryer") {
                    return $scope.translation.WEBMOB_device_washer_error_message_5e_dry_action;
                } else {
                    return $scope.translation.WEBMOB_device_washer_error_message_5e_action;
                }
                break;
            case 'nd':
                return $scope.translation.WEBMOB_device_washer_error_message_5e_action;
            case 'Hr':
                return $scope.translation.WEBMOB_device_washer_error_message_he_action;
            case 'HE':
                var actionString = $scope.translation.WEBMOB_device_washer_error_message_he_action;
                if ($scope.selectedCountry === 'NL' || $scope.selectedCountry === 'BE') {
                    actionString += " " + $scope.translation.WEBMOB_device_washer_comm_error_action_contact_store;
                }
                return actionString;
            case 'HE1':
                return $scope.translation.WEBMOB_device_washer_error_message_he1_action;
            case 'HE2':
                return $scope.translation.WEBMOB_device_washer_error_message_he2_action;
            case 'CE':
                return $scope.translation.WEBMOB_device_washer_error_message_ce_action;
            case 'UE':
                return $scope.translation.WEBMOB_device_washer_error_message_ue_action;
            case 'dc':
                return $scope.translation.WEBMOB_device_washer_error_message_ue_action;
            case '8E':
                return $scope.translation.WEBMOB_device_washer_error_message_8e_action;
            case 'PE':
                return $scope.translation.WEBMOB_device_washer_error_message_pe_action;
            case 'NF':
                return $scope.translation.WEBMOB_device_washer_error_message_4e_action;
            case 'NF1':
                return $scope.translation.WEBMOB_device_washer_error_message_4e2_action;
            case 'oF':
                return $scope.translation.WEBMOB_device_washer_error_message_oe_action;
            case '4E1':
                return $scope.translation.WEBMOB_device_washer_error_message_4e_action;
            case '8E1':
                return $scope.translation.WEBMOB_device_washer_error_message_8e_action;
            case '8E2':
                return $scope.translation.WEBMOB_device_washer_error_message_8e_action;
            case 'OF':
                return $scope.translation.WEBMOB_device_washer_error_message_oe_action;
            case 'SDE':
                return $scope.translation.WEBMOB_device_washer_error_message_sde_action;
            case 'tE2':
                return $scope.translation.WEBMOB_device_washer_error_message_te2_action;
            case '6E':
                return $scope.translation.WEBMOB_device_washer_error_message_6e_action;
            case 'AE3':
                return $scope.translation.WEBMOB_device_washer_error_message_ae3_action;
            case 'AE4':
                return $scope.translation.WEBMOB_device_washer_error_message_ae4_action;
            case 'AE5':
                return $scope.translation.WEBMOB_device_washer_error_message_ae5_action;
            case 'AE6':
                return $scope.translation.WEBMOB_device_washer_error_message_ae6_action;
            case 'TE4':
                return $scope.translation.WEBMOB_device_washer_error_message_te4_action;
            case '4E3':
                return $scope.translation.WEBMOB_device_washer_error_message_4e3_action;
            case 'FL':
                return $scope.translation.WEBMOB_device_washer_error_message_de1_action;
            case 'LE1':
                return $scope.translation.WEBMOB_device_washer_error_message_le1_action;
            case 'TE5':
                return $scope.translation.WEBMOB_device_washer_error_message_te5_action;
                //New added from 15K
            case '1C':
                return $scope.translation.WEBMOB_device_washer_error_message_1e_action;
            case 'tC':
                return $scope.translation.WEBMOB_device_washer_error_message_te1_action;
            case 'tC1':
                return $scope.translation.WEBMOB_device_washer_error_message_te1_action;
            case 'TC':
                return $scope.translation.WEBMOB_device_washer_error_message_te1_action;
            case 'TC1':
                return $scope.translation.WEBMOB_device_washer_error_message_te1_action;
            case 'TC2':
                return $scope.translation.WEBMOB_device_washer_error_message_te2_action;
            case 'TC3':
                return $scope.translation.WEBMOB_device_washer_error_message_te3_action;
            case '3C':
            case '3C1':
            case '3C2':
            case '3C3':
            case '3C4':
            case '3C5':
            case '3C6':
            case '3C7':
            case '3C8':
            case '3C9':
                return $scope.translation.WEBMOB_device_washer_error_message_3c1_action;
            case 'BC':
                return $scope.translation.WEBMOB_device_washer_error_message_bc_action;
            case '9C1':
            case '2C':
                return $scope.translation.WEBMOB_device_washer_error_message_9e1_action;
            case '9C2':
                return $scope.translation.WEBMOB_device_washer_error_message_9e2_action;
            case 'BC2':
            case 'C2':
                return $scope.translation.WEBMOB_device_washer_error_message_be2_action;
            case 'dC':
                return $scope.translation.WEBMOB_device_washer_error_message_de_action;
            case 'DC':
                return $scope.translation.WEBMOB_device_washer_error_message_de_action;
            case 'dC1':
                return $scope.translation.WEBMOB_device_washer_error_message_de1_action;
            case 'DC1':
                return $scope.translation.WEBMOB_device_washer_error_message_de1_action;
            case 'dC2':
                return $scope.translation.WEBMOB_device_washer_error_message_de2_action;
            case 'DC2':
                return $scope.translation.WEBMOB_device_washer_error_message_de2_action;
            case 'AC':
                return $scope.translation.WEBMOB_device_washer_error_message_ae_action;
            case 'LC':
                return $scope.translation.WEBMOB_device_washer_error_message_lc_action;
            case 'LC1':
                return $scope.translation.WEBMOB_device_washer_error_message_lc1_action;
            case 'FC':
            case 'FC3':
                if ($scope.deviceType === "Dryer") {
                    return $scope.translation.WEBMOB_device_washer_error_message_efe_action;
                } else {
                    return $scope.translation.WEBMOB_device_washer_error_message_fe_action;
                }
                break;
            case '4C':
            case '4C1':
                return $scope.translation.WEBMOB_device_washer_error_message_4e_action;
            case '4C2':
                return $scope.translation.WEBMOB_device_washer_error_message_4e2_action;
            case '5C':
                return $scope.translation.WEBMOB_device_washer_error_message_5e_action;
            case 'HC':
                var actionString = $scope.translation.WEBMOB_device_washer_error_message_hc_action;
                if ($scope.selectedCountry === 'NL' || $scope.selectedCountry === 'BE') {
                    actionString += " " + $scope.translation.WEBMOB_device_washer_comm_error_action_contact_store;
                }
                return actionString;
            case 'HC1':
                return $scope.translation.WEBMOB_device_washer_error_message_he1_action;
            case 'HC2':
                return $scope.translation.WEBMOB_device_washer_error_message_he2_action;
            case 'CC':
                return $scope.translation.WEBMOB_device_washer_error_message_ce_action;
            case 'UB':
                return $scope.translation.WEBMOB_device_washer_error_message_ue_action;
            case '8C':
                return $scope.translation.WEBMOB_device_washer_error_message_8e_action;
            case 'PC':
                return $scope.translation.WEBMOB_device_washer_error_message_pe_action;
            case 'OC'://FALLTHROUGH
            case 'OE':
                var actionString = $scope.translation.WEBMOB_device_washer_error_message_oe_action;
                if ($scope.selectedCountry === 'NL' || $scope.selectedCountry === 'BE') {
                    actionString += " " + $scope.translation.WEBMOB_device_washer_comm_error_action_contact_store;
                }
                return actionString;
            case '6C':
            case '6C1':
            case '6C2':
            case '6C3':
            case '6C4':
            case '6C5':
            case '6C6':
            case '6C7':
                return $scope.translation.WEBMOB_device_washer_error_message_6c_action;
            case '8C1':
                return $scope.translation.WEBMOB_device_washer_error_message_8e_action;
            case '8C2':
                return $scope.translation.WEBMOB_device_washer_error_message_8e_action;
            case 'SDC':
                return $scope.translation.WEBMOB_device_washer_error_message_sde_action;
            case 'AC3':
                return $scope.translation.WEBMOB_device_washer_error_message_ae3_action;
            case 'AC4':
                return $scope.translation.WEBMOB_device_washer_error_message_ae4_action;
            case 'AC5':
                return $scope.translation.WEBMOB_device_washer_error_message_ae5_action;
            case 'AC6':
                return $scope.translation.WEBMOB_device_washer_error_message_ac6_action;
            case 'TC4':
                return $scope.translation.WEBMOB_device_washer_error_message_te4_action;
            case '4C3':
                return $scope.translation.WEBMOB_device_washer_error_message_4c3_action;
            case 'DDC':
                var actionString = $scope.translation.WEBMOB_device_washer_error_message_ddc_action;
                if ($scope.selectedCountry === 'NL' || $scope.selectedCountry === 'BE') {
                    actionString += " " + $scope.translation.WEBMOB_device_washer_comm_error_action_contact_store;
                }
                return actionString;
            case 'DC3':
                var actionString = $scope.translation.WEBMOB_device_washer_error_message_dc3_action;
                if ($scope.selectedCountry === 'NL' || $scope.selectedCountry === 'BE') {
                    actionString += " " + $scope.translation.WEBMOB_device_washer_comm_error_action_contact_store;
                }
                return actionString;
            case "AC7":
                return $scope.translation.WEBMOB_device_washer_error_message_ac7_action;
            case "DC4":
                return $scope.translation.WEBMOB_device_washer_error_message_dc4_action;
            default:
                break;
        }
        return "Unknown";
    }

    function openErrorTextArray(errordemoString) {
        var alarmtxt = errordemoString;
        //$scope.serviceCenterNumber = "123456789";
        if (alarmtxt.indexOf("_") > -1) {
            alarmtxt = alarmtxt.split("_");
            alarmtxt = alarmtxt[5].toLowerCase();
            errorDemoPage = true;
        } else {
            chatErrorPage = true;
        }
        debugMessage("alarm text is ::" + alarmtxt);
        debugMessage("alarm text is ::" + getErrorTitle(alarmtxt) + ":::" + getErrorMessage(alarmtxt) + ":::" + getErrorAction(alarmtxt));
        if (isDeviceUpdateRequired($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER ? 1 : 0)) {
            $scope.errorTitle = getErrorTitle(alarmtxt);
        }
        if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
            $scope.errorTitleMain = getErrorTitle(alarmtxt);
        } else if ($scope.isDualWasher && $scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
            $scope.errorTitleSub = getErrorTitle(alarmtxt);
        } else {
            ;//Nothing
        }
        $scope.errorResult = getErrorMessage(alarmtxt);
        $scope.errorAction = getErrorAction(alarmtxt);
        if (!$scope.isDualWasher) {
            $scope.currentScreen = WASHERSCREENS.ALARMSCREEN;
            changeScreen();
        }
    }

    // Go to energy moitor screen
    function goToEnergyMonitor() {
        sendSAData(SA_WASHER.SETTINGS.SCREEN, SA_WASHER.SETTINGS.ENERGY_MONITOR, "", "");
        if ((!$scope.isStatic) && (!$scope.isDBDownloaded)) {
            return;
        }
        EnergyService.goToEnergyMonitor($scope);
        toggleAnimClass();
        $timeout(function () {
            toggleAnimClass();
            $scope.currentScreen = WASHERSCREENS.ENERGYMONITOR;
            changeScreen();
        }, MATERIAL_DESIGN.LIST_ANIMATION_TIME);
    }

    function showDailyData() {
        sendSAData(SA_WASHER.ENERGY_MONITOR.SCREEN, SA_WASHER.ENERGY_MONITOR.DAY_TAB, "", "");
        EnergyService.showDailyData($scope);
    }

    function showWeeklyData() {
        sendSAData(SA_WASHER.ENERGY_MONITOR.SCREEN, SA_WASHER.ENERGY_MONITOR.WEEK_TAB, "", "");
        EnergyService.showWeeklyData($scope);
    }

    function showMonthlyData() {
        sendSAData(SA_WASHER.ENERGY_MONITOR.SCREEN, SA_WASHER.ENERGY_MONITOR.MONTH_TAB, "", "");
        EnergyService.showMonthlyData($scope);
    }

    function showNextDaysData() {
        sendSAData(SA_WASHER.ENERGY_MONITOR.SCREEN, SA_WASHER.ENERGY_MONITOR.NEXT_PERIOD, "", "");
        EnergyService.showNextDaysData($scope);
    }

    function showPreviousDaysData() {
        sendSAData(SA_WASHER.ENERGY_MONITOR.SCREEN, SA_WASHER.ENERGY_MONITOR.PREVIOUS_PERIOD, "", "");
        EnergyService.showPreviousDaysData($scope);
    }

    function fetchDBfromDevice() {
        if (!$scope.isStatic && angular.isDefined($scope.energyMonitorLocation)) {
            nativeInterface.getResourceUrl("/" + $scope.peerId + $scope.energyMonitorLocation);
        }
    }

    function isEnergyReset() {
        return true;
    }

    function isEnergyResetDisabled() {
        return (!$scope.remoteControlEnabled || $scope.kidsLock);
    }

    function parseEnergyUsageData(energyResponse) {
        EnergyService.parseEnergyUsageData($scope, energyResponse);
    }

    function handleEnergyMonitorErrors() {
        debugMessage("No data in energy usage::");
    }

    function sendResetCommand() {
        if ($scope.kidsLock) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_child_lock_title,
                msg: $scope.translation.WEBMOB_device_washer_alarm_child_lock_message,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }
        if (!$scope.remoteControlEnabled) {
            $scope.errorList.push({
                title: $scope.translation.WEBMOB_device_washer_alarm_smart_control,
                msg: $scope.translation.WEBMOB_device_washer_alarm_smart_control_washer_msg,
                btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_ok_CL,
                btnOkHandler: function () {
                    onOkClicked(true);
                },
                closeDialog: !true
            });
            changePopUpClass(true);
            return;
        }
        if (!$scope.isStatic) {
            var washerId = 0;
            if ($scope.isDualWasher && $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
                washerId = 1
            }
            SHPService.sendSHPCommand(CONSTANTS.PUT, getResetCommand(), "/" + $scope.peerId + "/device/" + washerId + "/resetEnergyDB");
        }
    }

    function getResetCommand() {
        return '{"Device":{"Mode":{"options":["UsagesDB_reset"]}}}';
    }

    function showOptionPopup() {

        if ($scope.currentScreen === WASHERSCREENS.ENERGYMONITOR) {
            sendSAData(SA_WASHER.ENERGY_MONITOR.SCREEN, SA_WASHER.ENERGY_MONITOR.MORE_BTN, "", "");
        } else if ($scope.currentScreen === WASHERSCREENS.MYFAVORITE) {
            sendSAData(SA_WASHER.MY_FAVORITE_PAGE.SCREEN, SA_WASHER.MY_FAVORITE_PAGE.MORE_BTN, "", "");
        } else if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
            sendSAData(SA_WASHER.TOP_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.TOP_LOAD_DETAIL_PAGE.MORE_BTN, "", "");
        } else {
            sendSAData(SA_WASHER.FRONT_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.FRONT_LOAD_DETAIL_PAGE.MORE_BTN, "", "");
        }
        $scope.bOptionPopUp = true;
    }

    function closeOptionPopUp() {
        $scope.bOptionPopUp = false;
    }

    function selectIndexFromOptionMenu(optionMenuindex) {
        switch (optionMenuindex) {
            case 0:
                $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED ? sendSAData(SA_WASHER.TOP_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.TOP_LOAD_DETAIL_PAGE.MORE_BTN_SETTINGS, "", "") : sendSAData(SA_WASHER.FRONT_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.FRONT_LOAD_DETAIL_PAGE.MORE_BTN_SETTINGS, "", "");
                settings();
                break;
            case 1:
                //Help desk
                onAboutAction('helpdesk');
                break;
            case 2:
                //Tutorial
                onAboutAction('tutorial');
                break;
            case 3:
                //Self check
                onAboutAction('smartcare');
                break;
            case 4:
                //Country
                $scope.currentScreen = WASHERSCREENS.COUNTRYLIST;
                changeScreen();
                break;
            case 5:
                //Information
                $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED ? sendSAData(SA_WASHER.TOP_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.TOP_LOAD_DETAIL_PAGE.MORE_BTN_ABOUT_DEVICE, "", "") : sendSAData(SA_WASHER.FRONT_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.FRONT_LOAD_DETAIL_PAGE.MORE_BTN_ABOUT_DEVICE, "", "");
                goToInformationPage();
                break;
            case 6:
                //Energy Monitor
                $scope.alertState = WASHERALERT.RESETENERGY;
                sendSAData(SA_WASHER.ENERGY_MONITOR.SCREEN, SA_WASHER.ENERGY_MONITOR.MORE_BTN_RESET_HISTORY, "", "");
                $scope.errorList.push({
                    msg: $scope.translation.WEBMOB_common_energy_monitor_reset_history_confirm,
                    btnOkTxt: $scope.translation.WEBMOB_device_washer_comm_yes_CL,
                    btnOkHandler: function () {
                        sendSAData(SA_WASHER.RESET_HISTORY_POPUP.SCREEN, SA_WASHER.RESET_HISTORY_POPUP.OK_BTN, "", "");
                        onOkClicked(true);
                    },
                    btnCancelTxt: $scope.translation.WEBMOB_device_washer_comm_no_CL,
                    btnCancelHandler: function () {
                        onOkClicked(false);
                    },
                    closeDialog: !true
                });
                changePopUpClass(true);
                $scope.cancelButtonPressed = false;
                break;
            case 7:
                //My Favorite Multiselect
                $scope.isMultiSelectMode = true;
                $scope.bAllListSelected = false;
                break;
            case 8:
                //Error page
                onAboutAction('errorpage');
                break;
            case 9:
                showDrainFilterOption();
                break;
            default:
                break;
        }
        closeOptionPopUp();
    }

    function toggleSmartControlButton() {
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
            sendSAData(SA_WASHER.TOP_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.TOP_LOAD_DETAIL_PAGE.BOTTOM_SMART_CONTROL_OPTION, "", "");
            sendSAData(SA_WASHER.SMART_CONTROL_POPUP.SCREEN, "", "", "");
        } else {
            sendSAData(SA_WASHER.FRONT_LOAD_DETAIL_PAGE.SCREEN, SA_WASHER.FRONT_LOAD_DETAIL_PAGE.BOTTOM_SMART_CONTROL_OPTION, "", "");
            sendSAData(SA_WASHER.SMART_CONTROL_POPUP.SCREEN, "", "", "");
        }
        if ($scope.isStatic) {
            $scope.remoteControlEnabled = !$scope.remoteControlEnabled;
            $scope.smartControlDesc = $scope.translation.WEBMOB_device_washer_alarm_smart_control_on_washer_msg;
        }
        if ($scope.remoteControlEnabled) {
            $scope.smartControlTitle = $scope.translation.WEBMOB_device_washer_alarm_smart_control_on;
            if ($scope.kidsLockByPass) {
                $scope.smartControlDesc = $scope.translation.WEBMOB_device_washer_alarm_smart_control_on_17kidslock_msg;
            } else {
                $scope.smartControlDesc = $scope.translation.WEBMOB_device_washer_alarm_smart_control_on_washer_msg;
            }
        } else {
            $scope.smartControlTitle = $scope.translation.WEBMOB_device_washer_alarm_smart_control_off;
            $scope.smartControlDesc = $scope.translation.WEBMOB_device_washer_alarm_smart_control_off_washer_msg;
        }
        $scope.samrtControlPopup = true;
        toggleBottomPopUpClass($scope.samrtControlPopup);
        changePopUpClass($scope.samrtControlPopup);
        hideInputBoxFocus();
    }

    function hideSmartControlOption(smartControlNotification) {    //puneet
        debugMessage('hideSmartControlOption');
//        if (smartControlNotification) {
//            sendSAData(SA_WASHER.SMART_CONTROL_NOTIFICATION_POPUP.SCREEN, SA_WASHER.SMART_CONTROL_NOTIFICATION_POPUP.OK_BTN, "", "");
//            return;
//        }
        if ($scope.isDualWasher && smartControlNotification === "OK") {
            if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
                sendSAData(SA_WASHER.SMART_CONTROL_POPUP.SCREEN, SA_WASHER.SMART_CONTROL_POPUP.OK_BTN, "", "");
            } else {
                sendSAData(SA_WASHER.SMART_CONTROL_POPUP.SCREEN, SA_WASHER.SMART_CONTROL_POPUP.OK_BTN, "", "");
            }
        } else if (smartControlNotification === "OK") {
            sendSAData(SA_WASHER.SMART_CONTROL_POPUP.SCREEN, SA_WASHER.SMART_CONTROL_POPUP.OK_BTN, "", "");
        } else {
            //Nothing
        }

        $scope.samrtControlPopup = false;
        toggleBottomPopUpClass($scope.samrtControlPopup);
        changePopUpClass($scope.samrtControlPopup);
    }

    function hideInputBoxFocus() { //puneet
        stopLongPressEvent();
    }

    function stopLongPressEvent() { //puneet
        if (!!promise) {
            $interval.cancel(promise);
            promise = undefined;
        }
        if ($scope.longPress) {
            $scope.longPress = false;
            clearInterval($scope.timer);
            return;
        }
    }

    function showDetailPage(val) {
        if ($scope.isDualWasher) {
            if (val === 1) {
                sendSAData(SA_WASHER.HOME.SCREEN, SA_WASHER.HOME.TOP_LOADER_STATUS, "", "");
            } else {
                sendSAData(SA_WASHER.HOME.SCREEN, SA_WASHER.HOME.FRONT_LOADER_STATUS, "", "");
            }
        }
        rinseSelected = false;
        if (val === 0) {
            $scope.remainingLaundryDesc = $scope.translation.WEBMOB_device_washer_laundryout_desc;
            $scope.addWashDesc = $scope.translation.WEBMOB_device_washer_add_wash_desc;
            $scope.addWashAlarm = $scope.translation.WEBMOB_device_washer_settings_addwash_alarm;
            if ($scope.isDualWasher) {
                dualDeviceId = 0;   // For Energy monitor
                $scope.currentWasherSelected = WASHERCURRENTSEL.MAIN_SELECTED;
                $scope.Device = jQuery.extend(true, {}, $scope.mainWasherData);

                $scope.ampm = $scope.ampmMain;
                $scope.isTemp = $scope.isTempMain;
                $scope.isSpin = $scope.isSpinMain;
                $scope.remHrs = $scope.remHrsMain;
                $scope.remMin = $scope.remMinMain;
                $scope.isRinse = $scope.isRinseMain;
                $scope.setTemp = $scope.setTempMain;
                $scope.setSpin = $scope.setSpinMain;
                $scope.setSoil = $scope.setSoilMain;
                $scope.onPause = $scope.onPauseMain;
                $scope.addWash = $scope.addWashMain;
                $scope.laundry = $scope.laundryMain;
                $scope.current = $scope.currentMain;
                $scope.softner = $scope.softnerMain;
                $scope.setRinse = $scope.setRinseMain;
                $scope.kidsLock = $scope.kidsLockMain;
                $scope.syncTime = $scope.syncTimeMain;
                $scope.detergent = $scope.detergentMain;
                $scope.cycFinish = $scope.cycFinishMain;
                $scope.hotwarning = $scope.hotwarningMain;
                $scope.dispStatus = $scope.dispStatusMain;
                $scope.deviceMode = $scope.deviceModeMain;
                $scope.errorTitle = $scope.errorTitleMain;
                $scope.errorResult = $scope.errorResultMain;
                $scope.errorAction = $scope.errorActionMain;
                $scope.laundryOpt2 = $scope.laundryOpt2Main;
                $scope.laundryOpt3 = $scope.laundryOpt3Main;
                $scope.laundryOpt4 = $scope.laundryOpt4Main;
                $scope.isSoilLevel = $scope.isSoilLevelMain;
                $scope.rinseChanged = $scope.rinseChangedMain;
                $scope.showSyncTime = $scope.showSyncTimeMain;
                $scope.progresshead = $scope.progressheadMain;
                $scope.washingTimes = $scope.washingTimesMain;
                $scope.drumCleanLog = $scope.drumCleanLogMain;
                $scope.descHasDongle = $scope.descHasDongleMain;
                $scope.listItemsSpin = $scope.listItemsSpinMain;
                $scope.listItemsTemp = $scope.listItemsTempMain;
                $scope.remainingTime = $scope.remainingTimeMain;
                $scope.laundrySwitch = $scope.laundrySwitchMain;
                $scope.listItemsModes = $scope.listItemsModesMain;
                $scope.estimationTime = $scope.estimationTimeMain;
                $scope.listItemsRinse = $scope.listItemsRinseMain;
                $scope.kidsLockByPass = $scope.kidsLockByPassMain;
                $scope.disableLaundry = $scope.disableLaundryMain;
                $scope.isDryComboLevel = $scope.isDryComboLevelMain;
                $scope.currentTempList = $scope.currentTempListMain;
                $scope.currentSpinList = $scope.currentSpinListMain;
                $scope.currentSoilList = $scope.currentSoilListMain;
                $scope.setDryComboLevel = $scope.setDryComboLevelMain;
                $scope.isSoftnerEnabled = $scope.isSoftnerEnabledMain;
                $scope.currentRinseList = $scope.currentRinseListMain;
                $scope.currentCourseHex = $scope.currentCourseHexMain;
                $scope.addWashIndicator = $scope.addWashIndicatorMain;
                $scope.isLaundryEnabled = $scope.isLaundryEnabledMain;
                $scope.laundryOnOffText = $scope.laundryOnOffTextMain;
                $scope.timeSyncSupported = $scope.timeSyncSupportedMain;
                $scope.currentCourseEnum = $scope.currentCourseEnumMain;
                $scope.listItemsDryLevel = $scope.listItemsDryLevelMain;
                $scope.drumCleanProposal = $scope.drumCleanProposalMain;
                $scope.deviceCurrentMode = $scope.deviceCurrentModeMain;
                $scope.isDetergentEnabled = $scope.isDetergentEnabledMain;
                $scope.showEnergyLevelSet = $scope.showEnergyLevelSetMain;
                $scope.listItemsSoilLevel = $scope.listItemsSoilLevelMain;
                $scope.disabletempContents = $scope.disabletempContentsMain;
                $scope.disablesoilContents = $scope.disablesoilContentsMain;
                $scope.disablerinseContents = $scope.disablerinseContentsMain;
                $scope.disablespinContents = $scope.disablespinContentsMain;
                $scope.addGarmentIndicator = $scope.addGarmentIndicatorMain;
                $scope.showSeamLessControl = $scope.showSeamLessControlMain;
                $scope.seamLessControlValue = $scope.seamLessControlValueMain;
                $scope.remoteControlEnabled = $scope.remoteControlEnabledMain;
                $scope.currentDryComboLevelList = $scope.currentDryComboLevelListMain;
                $scope.showFreezeProtectionAlarm = $scope.showFreezeProtectionAlarmMain;
                $scope.freezeProtectionAlarmValue = $scope.freezeProtectionAlarmValueMain;
                $scope.freezeProtectionAlarmOnOFf = $scope.freezeProtectionAlarmValue ? $scope.translation.WEBMOB_device_washer_comm_on_CL : $scope.translation.WEBMOB_device_washer_comm_off_CL;
                $scope.smartControlOnOffText = $scope.remoteControlEnabled ? $scope.translation.WEBMOB_device_washer_comm_on_CL : $scope.translation.WEBMOB_device_washer_comm_off_CL;

                $scope.spinOnly = $scope.spinOnlyMain;
                $scope.rinseOnly = $scope.rinseOnlyMain;
                $scope.dryingOnly = $scope.dryingOnlyMain;
                $scope.NoEnergyKW_396 = $scope.NoEnergyKW_396Main;
                $scope.rinseOnlyAtSetCourse = $scope.rinseOnlyAtSetCourseMain;
                $scope.washNotIncluded = $scope.washNotIncludedMain;
                tempLaundryVal = tempLaundryValMain;
                currentLaundryVal = currentLaundryValMain;
                steamTempDisable = steamTempDisableMain;
                soilDisable = soilDisableMain;
                tempDisable = tempDisableMain;

                $scope.washerToUpdate = WASHERTOUPDATE.MAINWASHER;
                parseWasherData($scope.mainWasherData, true);
                $scope.washerToUpdate = WASHERTOUPDATE.NONE;

                if ($scope.isErrorMain) {
                    $scope.currentScreen = WASHERSCREENS.ALARMSCREEN;
                    changeScreen();
                    return;
                }
            }
        } else {
            $scope.remainingLaundryDesc = $scope.translation.WEBMOB_device_washer_laundryout_desc_top_loader;
            $scope.addWashDesc = '';
            $scope.addWashAlarm = '';
            if ($scope.isDualWasher) {
                dualDeviceId = 1;   // For Energy monitor
                $scope.currentWasherSelected = WASHERCURRENTSEL.SUB_SELECTED;
                $scope.Device = jQuery.extend(true, {}, $scope.subWasherData);

                $scope.ampm = $scope.ampmSub;
                $scope.isTemp = $scope.isTempSub;
                $scope.isSpin = $scope.isSpinSub;
                $scope.remHrs = $scope.remHrsSub;
                $scope.remMin = $scope.remMinSub;
                $scope.isRinse = $scope.isRinseSub;
                $scope.onPause = $scope.onPauseSub;
                $scope.setTemp = $scope.setTempSub;
                $scope.setSpin = $scope.setSpinSub;
                $scope.setSoil = $scope.setSoilSub;
                $scope.addWash = $scope.addWashSub;
                $scope.laundry = $scope.laundrySub;
                $scope.current = $scope.currentSub;
                $scope.softner = $scope.softnerSub;
                $scope.kidsLock = $scope.kidsLockSub;
                $scope.setRinse = $scope.setRinseSub;
                $scope.syncTime = $scope.syncTimeSub;
                $scope.detergent = $scope.detergentSub;
                $scope.cycFinish = $scope.cycFinishSub;
                $scope.dispStatus = $scope.dispStatusSub;
                $scope.deviceMode = $scope.deviceModeSub;
                $scope.hotwarning = $scope.hotwarningSub;
                $scope.errorTitle = $scope.errorTitleSub;
                $scope.errorResult = $scope.errorResultSub;
                $scope.errorAction = $scope.errorActionSub;
                $scope.laundryOpt2 = $scope.laundryOpt2Sub;
                $scope.laundryOpt3 = $scope.laundryOpt3Sub;
                $scope.laundryOpt4 = $scope.laundryOpt4Sub;
                $scope.isSoilLevel = $scope.isSoilLevelSub;
                $scope.progresshead = $scope.progressheadSub;
                $scope.washingTimes = $scope.washingTimesSub;
                $scope.drumCleanLog = $scope.drumCleanLogSub;
                $scope.rinseChanged = $scope.rinseChangedSub;
                $scope.showSyncTime = $scope.showSyncTimeSub;
                $scope.laundrySwitch = $scope.laundrySwitchSub;
                $scope.remainingTime = $scope.remainingTimeSub;
                $scope.listItemsTemp = $scope.listItemsTempSub;
                $scope.listItemsSpin = $scope.listItemsSpinSub;
                $scope.estimationTime = $scope.estimationTimeSub;
                $scope.listItemsRinse = $scope.listItemsRinseSub;
                $scope.kidsLockByPass = $scope.kidsLockByPassSub;
                $scope.listItemsModes = $scope.listItemsModesSub;
                $scope.currentTempList = $scope.currentTempListSub;
                $scope.currentSpinList = $scope.currentSpinListSub;
                $scope.currentSoilList = $scope.currentSoilListSub;
                $scope.isDryComboLevel = $scope.isDryComboLevelSub;
                $scope.setDryComboLevel = $scope.setDryComboLevelSub;
                $scope.disableLaundry = $scope.disableLaundrySub;
                $scope.isSoftnerEnabled = $scope.isSoftnerEnabledSub;
                $scope.currentCourseHex = $scope.currentCourseHexSub;
                $scope.currentRinseList = $scope.currentRinseListSub;
                $scope.addWashIndicator = $scope.addWashIndicatorSub;
                $scope.isLaundryEnabled = $scope.isLaundryEnabledSub;
                $scope.laundryOnOffText = $scope.laundryOnOffTextSub;
                $scope.timeSyncSupported = $scope.timeSyncSupportedSub;
                $scope.drumCleanProposal = $scope.drumCleanProposalSub;
                $scope.listItemsDryLevel = $scope.listItemsDryLevelSub;
                $scope.currentCourseEnum = $scope.currentCourseEnumSub;
                $scope.deviceCurrentMode = $scope.deviceCurrentModeSub;
                $scope.isDetergentEnabled = $scope.isDetergentEnabledSub;
                $scope.showEnergyLevelSet = $scope.showEnergyLevelSetSub;
                $scope.listItemsSoilLevel = $scope.listItemsSoilLevelSub;
                $scope.disabletempContents = $scope.disabletempContentsSub;
                $scope.disablesoilContents = $scope.disablesoilContentsSub;
                $scope.disablerinseContents = $scope.disablerinseContentsSub;
                $scope.disablespinContents = $scope.disablespinContentsSub;
                $scope.addGarmentIndicator = $scope.addGarmentIndicatorSub;
                $scope.showSeamLessControl = $scope.showSeamLessControlSub;
                $scope.seamLessControlValue = $scope.seamLessControlValueSub;
                $scope.remoteControlEnabled = $scope.remoteControlEnabledSub;
                $scope.currentDryComboLevelList = $scope.currentDryComboLevelListSub;
                $scope.showFreezeProtectionAlarm = $scope.showFreezeProtectionAlarmSub;
                $scope.freezeProtectionAlarmValue = $scope.freezeProtectionAlarmValueMain;
                $scope.freezeProtectionAlarmOnOFf = $scope.freezeProtectionAlarmValue ? $scope.translation.WEBMOB_device_washer_comm_on_CL : $scope.translation.WEBMOB_device_washer_comm_off_CL;
                $scope.smartControlOnOffText = $scope.remoteControlEnabled ? $scope.translation.WEBMOB_device_washer_comm_on_CL : $scope.translation.WEBMOB_device_washer_comm_off_CL;

                $scope.spinOnly = $scope.spinOnlySub;
                $scope.rinseOnly = $scope.rinseOnlySub;
                $scope.rinseOnlyAtSetCourse = $scope.rinseOnlyAtSetCourseSub;
                $scope.dryingOnly = $scope.dryingOnlySub;
                $scope.washNotIncluded = $scope.washNotIncludedSub;
                $scope.NoEnergyKW_396 = $scope.NoEnergyKW_396Sub;
                tempLaundryVal = tempLaundryValSub;
                currentLaundryVal = currentLaundryValSub;
                steamTempDisable = steamTempDisableSub;
                soilDisable = soilDisableSub;
                tempDisable = tempDisableSub;

                $scope.washerToUpdate = WASHERTOUPDATE.SUBWASHER;
                parseWasherData($scope.subWasherData, true);
                $scope.washerToUpdate = WASHERTOUPDATE.NONE;

                if ($scope.isErrorSub) {
                    $scope.currentScreen = WASHERSCREENS.ALARMSCREEN;
                    changeScreen();
                    return;
                }
            }
        }
        goToDetailPage();
    }

    function callTutorialURL() {
        $scope.onAboutAction('tutorial');
    }

    function checkIfTopLoaderForSingleWasher(value) {
        for (var i = 0; i < $scope.topLoaderModelArray.length; i++) {
            if (value.indexOf($scope.topLoaderModelArray[i]) !== -1) {
                $scope.isTopLoader = true;
                return;
            }
        }
        $scope.isTopLoader = false;
    }

    function retUpperCase(val) {
        return val.toUpperCase();
    }

    function callServiceIndexSelected(index) {
        $scope.callServiceIndex = index;
    }

    function isSpinnerActive() {
        if ($scope.disableContents || !$scope.remoteControlEnabled || $scope.kidsLock || $scope.cycFinish) {
            return false;
        }
        return true;
    }

    function showOptionItemsVisible(index) {
        if ((($scope.homePage || $scope.detailPage) && index < 1) && (!$scope.isDetergentEnabled && !$scope.isSoftnerEnabled && !$scope.addWash && !$scope.showSyncTime && !$scope.showEnergyMonitorOption)) {
            return false;
        }
        if ((!drainFilterVisibility || $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) && index === 9) {
            return false;
        }
        if (($scope.homePage || $scope.detailPage) && index < 6) {
            return true;
        }
        if ($scope.showSmartCare && $scope.homePage && index === 3) {
            return true;
        }
        if (($scope.homePage || $scope.detailPage) && index === 4) {
            return true;
        }
        if (($scope.energyMonitorPage) && index === 6) {
            return true;
        }
        if (($scope.myFavoritePage) && index === 7) {
            return true;
        }
        if (($scope.showManualErrorPage && $scope.showDemoErrorList) && index === 8) {
            return true;
        }
        return false;
    }

    function updateHomePageDataForDualWasher() {
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
            $scope.deviceStatusMain = $scope.deviceStatus;
            //$scope.cycFinishMain = $scope.cycFinish;
            $scope.textDisplayMain = $scope.textDisplay;
            $scope.remoteControlEnabledMain = $scope.remoteControlEnabled;
            $scope.addWashIndicatorMain = $scope.addWashIndicator;
            $scope.addGarmentIndicatorMain = $scope.addGarmentIndicator;
            $scope.dispStatusMain = $scope.dispStatus;
            $scope.onPauseMain = $scope.onPause;
            $scope.progressStartMain = $scope.progressStart;
            $scope.laundrySwitchMain = $scope.laundrySwitch;
            $scope.laundryOnOffTextMain = $scope.laundryOnOffText;
            $scope.laundryOpt2Main = $scope.laundryOpt2;
            $scope.laundryOpt3Main = $scope.laundryOpt3;
            $scope.laundryOpt4Main = $scope.laundryOpt4;
            tempLaundryValMain = tempLaundryVal;
            currentLaundryValMain = currentLaundryVal;
            steamTempDisableMain = steamTempDisable;
            soilDisableMain = soilDisable;
            tempDisableMain = tempDisable;
        } else if ($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
            $scope.deviceStatusSub = $scope.deviceStatus;
            //$scope.cycFinishSub = $scope.cycFinish;
            $scope.textDisplaySub = $scope.textDisplay;
            $scope.remoteControlEnabledSub = $scope.remoteControlEnabled;
            $scope.addWashIndicatorSub = $scope.addWashIndicator;
            $scope.addGarmentIndicatorSub = $scope.addGarmentIndicator;
            $scope.dispStatusSub = $scope.dispStatus;
            $scope.onPauseSub = $scope.onPause;
            $scope.progressStartSub = $scope.progressStart;
            $scope.laundrySwitchSub = $scope.laundrySwitch;
            $scope.laundryOnOffTextSub = $scope.laundryOnOffText;
            $scope.laundryOpt2Sub = $scope.laundryOpt2;
            $scope.laundryOpt3Sub = $scope.laundryOpt3;
            $scope.laundryOpt4Sub = $scope.laundryOpt4;
            tempLaundryValSub = tempLaundryVal;
            currentLaundryValSub = currentLaundryVal;
            steamTempDisableSub = steamTempDisable;
            soilDisableSub = soilDisable;
            tempDisableSub = tempDisable;
        } else {
            ;//Nothing
        }
        $scope.currentWasherSelected = WASHERCURRENTSEL.NONE;
    }

    function isDeviceUpdateRequired(washerId) {
        if ($scope.isDualWasher === undefined || $scope.isDualWasher === false) {
            return true;
        }
        if ($scope.isDualWasher && $scope.homePage) {
            return true;
        }
        if ($scope.isDualWasher && !$scope.homePage && washerId === 0 && $scope.currentWasherSelected === WASHERCURRENTSEL.MAIN_SELECTED) {
            return true;
        }
        if ($scope.isDualWasher && !$scope.homePage && washerId === 1 && $scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
            return true;
        }
        return false;
    }

    function updateEnergyLevelSet(energyLevelSetData, washerSection) {
        //energyLevelSetData = '0503030201020303020102030302010203030201';
        var maxValue = parseInt(energyLevelSetData.substring(0, 2), 16);
        energyLevelSetData = energyLevelSetData.substring(2, energyLevelSetData.length);
        var len = energyLevelSetData.length / 2;

        for (var i = 0; i < len; i++) {
            if (!angular.isDefined($scope.listItemsModes) || !angular.isDefined($scope.listItemsModes[i])) {
                return;
            }
            $scope.listItemsModes[i].energyLevelValue = [];
            $scope.listItemsModes[i].energyLevelValueCount = 0; //energyLevelValueCount is required for TalkBack to talk count energyLevel
            switch (washerSection) {
                case WASHERTOUPDATE.SINGLEWASHER:
                    $scope.listItemsModes[i].maxEnergyLevelValue = maxValue;
                    var eLevel = parseInt(energyLevelSetData.substring(i * 2, i * 2 + 2), 16);
                    for (var j = 0; j < $scope.listItemsModes[i].maxEnergyLevelValue; j++) {
                        if (j <= eLevel - 1) {
                            $scope.listItemsModes[i].energyLevelValue.push({'enLevelValue': true});
                            $scope.listItemsModes[i].energyLevelValueCount++;
                        } else {
                            $scope.listItemsModes[i].energyLevelValue.push({'enLevelValue': false});
                        }
                    }
                    break;
                case WASHERTOUPDATE.MAINWASHER:
                    $scope.listItemsModesMain[i].maxEnergyLevelValue = maxValue;
                    var eLevel = parseInt(energyLevelSetData.substring(i * 2, i * 2 + 2), 16);
                    for (var j = 0; j < $scope.listItemsModesMain[i].maxEnergyLevelValue; j++) {
                        if (j <= eLevel - 1) {
                            $scope.listItemsModesMain[i].energyLevelValue.push({'enLevelValue': true});
                            $scope.listItemsModesMain[i].energyLevelValueCount++;
                        } else {
                            $scope.listItemsModesMain[i].energyLevelValue.push({'enLevelValue': false});
                        }
                    }
                    break;
                case WASHERTOUPDATE.SUBWASHER:
                    $scope.listItemsModesSub[i].maxEnergyLevelValue = maxValue;
                    var eLevel = parseInt(energyLevelSetData.substring(i * 2, i * 2 + 2), 16);
                    for (var j = 0; j < $scope.listItemsModesSub[i].maxEnergyLevelValue; j++) {
                        if (j <= eLevel - 1) {
                            $scope.listItemsModesSub[i].energyLevelValue.push({'enLevelValue': true});
                            $scope.listItemsModesSub[i].energyLevelValueCount++;
                        } else {
                            $scope.listItemsModesSub[i].energyLevelValue.push({'enLevelValue': false});
                        }
                    }
                    break;
                default:
                    $scope.listItemsModes[i].maxEnergyLevelValue = maxValue;
                    var eLevel = parseInt(energyLevelSetData.substring(i * 2, i * 2 + 2), 16);
                    for (var j = 0; j < $scope.listItemsModes[i].maxEnergyLevelValue; j++) {
                        if (j <= eLevel - 1) {
                            $scope.listItemsModes[i].energyLevelValue.push({'enLevelValue': true});
                            $scope.listItemsModes[i].energyLevelValueCount++;
                        } else {
                            $scope.listItemsModes[i].energyLevelValue.push({'enLevelValue': false});
                        }
                    }
                    break;
            }
        }
    }
    
    function updateBubbleSoakSet(bubbleSoakSetValue) {
        //bubbleSoakSetValue = "F00000F0000000F000000000F000";
        var len = bubbleSoakSetValue.length/2;
        for(var i=0; i<len; i++) {
            if (!angular.isDefined($scope.listItemsModes) || !angular.isDefined($scope.listItemsModes[i])) {
                return;
            }
            var index = i;
            if (angular.isDefined($scope.mostUsed)) {
                if (i === 0) {
                    index = $scope.mostUsedItemIndex;
                } else if (i < $scope.mostUsedItemIndex) {
                    index = i-1;
                } else if (i === $scope.mostUsedItemIndex) {
                    index = 0;
                }
            }
            var soakValue = bubbleSoakSetValue.substring(index*2, index*2+2);
            
            switch(soakValue) {
                case "F0":
                    $scope.listItemsModes[i].bubbleSoakSetValue = BUBBLE_SOAK.OFF;
                    break;
                case "0F":
                    $scope.listItemsModes[i].bubbleSoakSetValue = BUBBLE_SOAK.ON;
                    break;
                default:
                    $scope.listItemsModes[i].bubbleSoakSetValue = BUBBLE_SOAK.NOTUSED;
                    break;
            }
        }
    }
    
    function updateBubbleSoakValue() {
        if ($scope.listItemsModes !== undefined && deviceCurrentMode !== undefined) {
            for (var i = 0; i < $scope.listItemsModes.length; i++) {
                if ($scope.currentCourseHex === $scope.listItemsModes[i].courseNameHex) {
                    switch ($scope.listItemsModes[i].bubbleSoakSetValue) {
                        case BUBBLE_SOAK.ON:
                            $scope.bubbleSoakValue = true;
                            $scope.bubbleSoakDisabled = false;
                            break;
                        case BUBBLE_SOAK.OFF:
                            $scope.bubbleSoakValue = false;
                            $scope.bubbleSoakDisabled = false;
                            break;
                        default:
                            $scope.bubbleSoakValue = false;
                            $scope.bubbleSoakDisabled = true;
                            break;
                    }
                }
            }
        }
    }
    
    function changeBubbleSoakOption() {
        if (!$scope.remoteControlEnabled || $scope.kidsLock || $scope.deviceStatus === 'Run' || $scope.deviceStatus === 'Pause' || $scope.bubbleSoakDisabled) {
            return;
        }
        $scope.bubbleSoakValue = !$scope.bubbleSoakValue;
    }
    
    function changeSeamLessControl() {
        if ($scope.isStatic) {
            $scope.seamLessControlValue = !$scope.seamLessControlValue;
            return;
        }
        if (!$scope.remoteControlEnabled || $scope.kidsLock) {
            return;
        }
        $scope.checkResponse.push(WASHER_COMMANDS.SAEMLESS_CONTROL);
        var washerId = 0;
        if ($scope.currentWasherSelected === WASHERCURRENTSEL.SUB_SELECTED) {
            washerId = 1;
        }
        var txt = $scope.seamLessControlValue ? "Disable" : "Enable";
        var txtValue = $scope.seamLessControlValue ? 0 : 1;
        sendSAData(SA_WASHER.SMART_CONTROL_POPUP.SCREEN, SA_WASHER.SMART_CONTROL_POPUP.STAY_CONNECTED, txt, txtValue);
        SHPService.sendSHPCommand(CONSTANTS.PUT, getseamLessControlCommand(), "/" + $scope.peerId + "/devices/" + washerId);
    }

    function getseamLessControlCommand() {
        var txt = $scope.seamLessControlValue ? "Disable" : "Enable";
        return '{"Device":{"Mode":{"options":["SeamlessControl_' + txt + '"]}}}';
    }

    function updatekoreanComboOptions() {
        for (var index = 0; index < $scope.Device["CourseData"].length; index++) {
            if ($scope.Device["CourseData"][index].courseNameHex == deviceCurrentMode) {
                break;
            }
        }
        if (index === $scope.Device["CourseData"].length) {
            return;
        }
        $scope.koreanComboOptions = [];
        $scope.koreanComboSubOptions = [];
        var mainLevel = 0, subLevel = 0;
        for (var i = 0; i < $scope.Device.Washer.supportedDryLevel.length; i++) {
            if (isNaN($scope.Device.Washer.supportedDryLevel[i])) {
                mainLevel++;
                $scope.koreanComboOptions.push({'id': mainLevel, 'title': $scope.Device.Washer.supportedDryLevel[i]});
            } else {
                subLevel++;
                $scope.koreanComboSubOptions.push({'id': subLevel, 'title': $scope.Device.Washer.supportedDryLevel[i]});
            }
        }
        if ($scope.koreanComboSubOptions.length > 0) {
            mainLevel++;
            $scope.koreanComboOptions.push({'id': mainLevel, 'title': "More"});
        }
        $scope.koreanComboIndex = -1;
        for (i = 0; i < $scope.koreanComboOptions.length; i++) {
            if ($scope.koreanComboOptions[i].title === $scope.setDryComboLevel) {
                $scope.koreanComboIndex = i;
                $scope.koreanComboSubIndex = 0;
                break;
            }
        }
        if ($scope.koreanComboIndex === -1) {
            $scope.koreanComboIndex = 0;
        }
        $scope.koreanComboSubIndex = -1;
        for (i = 0; i < $scope.koreanComboSubOptions.length; i++) {
            if ($scope.koreanComboSubOptions[i].title === $scope.setDryComboLevel) {
                $scope.koreanComboSubIndex = i;
                $scope.koreanComboIndex = $scope.koreanComboOptions.length - 1;
                break;
            }
        }
        if ($scope.koreanComboSubIndex === -1) {
            $scope.koreanComboSubIndex = 0;
        }
    }

    function updateDryComboValue() {
        console.log("updateDryComboValue");
        if ($scope.koreanComboSubOptions.length > 0 && $scope.koreanComboIndex === $scope.koreanComboOptions.length - 1) {
            $scope.setDryComboLevel = $scope.koreanComboSubOptions[$scope.koreanComboSubIndex].title;
        } else {
            $scope.setDryComboLevel = $scope.koreanComboOptions[$scope.koreanComboIndex].title;
        }
        // This course comes only in the UAE model and for it the spin option has to be changed according to drying option; By Shashank Saurabh
        if ($scope.currentCourseEnum === "WEBMOB_device_washer_course_b8") {
            if ($scope.setDryComboLevel === "Normal" || $scope.setDryComboLevel === "Strong") {
                selectIndexSpin("ExtraHigh");
            } else if ($scope.setDryComboLevel === "Shirt" || $scope.setDryComboLevel === "Low" || $scope.setDryComboLevel === "30" || $scope.setDryComboLevel === "60" || $scope.setDryComboLevel === "90" || $scope.setDryComboLevel === "120" || $scope.setDryComboLevel === "150") {
                selectIndexSpin("RinseHold");
            }
        }
    }

    function updatekoreanComboOptionsFav() {
        for (var index = 0; index < $scope.Device["CourseData"].length; index++) {
            if ($scope.Device["CourseData"][index].CourseEnum == $scope.currentCourseEnumfavorite) {
                break;
            }
        }
        if (index === $scope.Device["CourseData"].length) {
            return;
        }
        $scope.koreanComboOptionsFav = [];
        $scope.koreanComboSubOptionsFav = [];
        var mainLevel = 0, subLevel = 0;
        for (var i = 0; i < $scope.Device.Washer.supportedDryLevel.length; i++) {
            if (isNaN($scope.Device.Washer.supportedDryLevel[i])) {
                mainLevel++;
                $scope.koreanComboOptionsFav.push({'id': mainLevel, 'title': $scope.Device.Washer.supportedDryLevel[i]});
            } else {
                subLevel++;
                $scope.koreanComboSubOptionsFav.push({'id': subLevel, 'title': $scope.Device.Washer.supportedDryLevel[i]});
            }
        }
        if ($scope.koreanComboSubOptionsFav.length > 0) {
            mainLevel++;
            $scope.koreanComboOptionsFav.push({'id': mainLevel, 'title': "More"});
        }
        $scope.koreanComboIndexFav = 0;
        for (i = 0; i < $scope.koreanComboOptionsFav.length; i++) {
            if ($scope.koreanComboOptionsFav[i].title === $scope.setDryComboLevelFav) {
                $scope.koreanComboIndexFav = i;
                break;
            }
        }
        if ($scope.koreanComboIndexFav === -1) {
            $scope.koreanComboIndexFav = 0;
        }
        $scope.koreanComboSubIndexFav = 0;
        for (i = 0; i < $scope.koreanComboSubOptionsFav.length; i++) {
            if ($scope.koreanComboSubOptionsFav[i].title === $scope.setDryComboLevelFav) {
                $scope.koreanComboSubIndexFav = i;
                $scope.koreanComboIndexFav = $scope.koreanComboOptionsFav.length - 1;
                break;
            }
        }
        if ($scope.koreanComboSubIndex === -1) {
            $scope.koreanComboSubIndex = 0;
        }
    }

    function updateDryComboValueFav() {
        if ($scope.koreanComboSubOptionsFav.length > 0 && $scope.koreanComboIndexFav === $scope.koreanComboOptionsFav.length - 1) {
            $scope.setDryComboLevelFav = $scope.koreanComboSubOptionsFav[$scope.koreanComboSubIndexFav].title;
        } else {
            $scope.setDryComboLevelFav = $scope.koreanComboOptionsFav[$scope.koreanComboIndexFav].title;
        }
        if ($scope.currentCourseEnumfavorite === "WEBMOB_device_washer_course_b8") {
            if ($scope.setDryComboLevelFav === "Normal" || $scope.setDryComboLevelFav === "Strong") {
                selectSpinFromSettings("ExtraHigh", 6);
            } else if ($scope.setDryComboLevelFav === "Shirt" || $scope.setDryComboLevelFav === "Low" || $scope.setDryComboLevelFav === "30" || $scope.setDryComboLevelFav === "60" || $scope.setDryComboLevelFav === "90" || $scope.setDryComboLevelFav === "120" || $scope.setDryComboLevelFav === "150") {
                selectSpinFromSettings("RinseHold", 1);
            }
        }
    }

    function getSmartControlImage() {
        var smartOnOff;
        if (!$scope.remoteControlEnabled || $scope.kidsLock) {
            smartOnOff = 'common/img/main_list_ic_smart_control_off.svg#Layer_1';
        } else if ($scope.remoteControlEnabled || !$scope.kidsLock) {
            smartOnOff = 'common/img/main_list_ic_smart_control_on.svg#Layer_1';
        } else {
            // Nothing
        }
        var svg = document.getElementById('smartControlSVG');
        SHPService.loadSVG(smartOnOff, svg);
        return smartOnOff;
    }
    /******Multiselect Header functions START******/
    function showMultiSelectHeader() {
        return $scope.isMultiSelectMode;
    }

    function toggleAllCheckList() {
        sendSAData(SA_WASHER.MY_FAVORITE_DELETE_PAGE.SCREEN, SA_WASHER.MY_FAVORITE_DELETE_PAGE.SELECT_ALL, "Select All", 1);
        toggleSelectAllListCheckBox();
    }

    function confirmDeleteItemsFromFavorite() {
        sendSAData(SA_WASHER.MY_FAVORITE_DELETE_PAGE.SCREEN, SA_WASHER.MY_FAVORITE_DELETE_PAGE.DELETE_BTN, "", "");
        deleteItemsFromFavoriteList();
    }

    function cancelMultiSelect() {
        sendSAData(SA_WASHER.MY_FAVORITE_DELETE_PAGE.SCREEN, SA_WASHER.MY_FAVORITE_DELETE_PAGE.CANCEL_BTN, "", "");
        cancelButtonPressedFromMultiSelect();
    }

    function setSelectAllText() {
        return  $scope.translation.WEBMOB_device_washer_comm_all;
    }

    function isItemChecked() {
        return  $scope.isAnyCheckedItem;
    }

    function isAllItemsChecked() {
        return  $scope.bAllListSelected;
    }

    function setSelectOptionText() {
        return  $scope.translation.WEBMOB_device_washer_comm_select;
    }

    function setDeleteOptionText() {
        return  $scope.translation.WEBMOB_device_washer_comm_delete_CL;
    }

    function setCancelOptionText() {
        return  $scope.translation.WEBMOB_common_cancel_capital;
    }
    /******Multiselect Header functions END******/

    /******watch for scrollable area resize START******/
    window.onresize = updateScrollableHeight;

    $scope.$watch(function () {
        return angular.isDefined(document.getElementsByClassName('scrollable_area')[0]) && document.getElementsByClassName('scrollable_area')[0].offsetTop;
    }, function () {
        updateScrollableHeight();
    });

    $scope.$watch(function () {
        return angular.isDefined(document.getElementsByClassName('scrollable_area_others')[0]) && document.getElementsByClassName('scrollable_area_others')[0].offsetTop;
    }, function () {
        updateScrollableHeight();
    });

    // Keyboard events handling
    function handleKeyAction(keyCode) {
        switch (keyCode) {
            case KEYCODE.MENU:
                if (isHeaderOptionVisible()) {
                    showOptionPopup();
                }
                break;
            case KEYCODE.ESC:
                onBackPressed();
                break;
            case KEYCODE.F1:
                if (showHelpText()) {
                    showUsageHelpPage();
                }
                break;
            case KEYCODE.PAGE_DOWN:
            case KEYCODE.DOWN:
                var scrollArea1 = document.getElementsByClassName('scrollable_area');
                var scrollArea2 = document.getElementsByClassName('scrollable_area_others');
                var scrollableElement = scrollArea1.length > 0 ? scrollArea1[0] : scrollArea2[0];
                if (scrollableElement) {
                    //scrollableOffsetTop = scrollableElement.getBoundingClientRect().top;
                    setTimeout(function () {
                        scrollableElement.scrollTop = scrollableElement.scrollTop + (10 * getBaseFont());
                    }, 10);
                }
                break;
            case KEYCODE.PAGE_UP:
            case KEYCODE.UP:
                var scrollArea1 = document.getElementsByClassName('scrollable_area');
                var scrollArea2 = document.getElementsByClassName('scrollable_area_others');
                var scrollableElement = scrollArea1.length > 0 ? scrollArea1[0] : scrollArea2[0];
                if (scrollableElement) {
                    //scrollableOffsetTop = scrollableElement.getBoundingClientRect().top;
                    setTimeout(function () {
                        scrollableElement.scrollTop = scrollableElement.scrollTop - (10 * getBaseFont());
                    }, 10);
                }
                break;
            default:
                break;
        }
    }

    function updateScrollableHeight() {
        //console.log(">>>>>>>>>>>>>>>>>>>>>> WATCH CALLED >>>>>>>>>>>>>>>>>>>>>>>>");
        $timeout(function () {
            var scrollArea1 = document.getElementsByClassName('scrollable_area');
            var scrollArea2 = document.getElementsByClassName('scrollable_area_others');
            var scrollArea4 = document.getElementsByClassName('ap-search-list-property');
            var scrollableElement = scrollArea1.length > 0 ? scrollArea1[0] : scrollArea2[0];
            //console.log(">>>>>>>>>>>>>>>>>>>>>> scrollableElement >>>>>>>>>>>>>>>>>>>>>>>>", scrollableElement,document.body.clientHeight);
            if (scrollableElement) {
                var screenSize = document.body.clientHeight,
                        scrollableOffsetTop = scrollableElement.getBoundingClientRect().top;
                //set new height to scrollable area
                scrollableElement.style.height = (screenSize - scrollableOffsetTop) + "px";
            }
            if (scrollArea4.length > 0) {
                var scrollableElement = scrollArea4[0],
                        screenSize = document.body.clientHeight,
                        scrollableOffsetTop = scrollableElement.getBoundingClientRect().top;
                scrollableElement.style.height = (screenSize - scrollableOffsetTop) + "px";
            }
        }, 100);
    }
    /******watch for scrollable area resize END******/
    
    function openLaundryPage() {
        console.log("Laundry Page Button Clicked!");
    }
    
    function openSetEndTimePopUp() {
        setEndTimerDrag.roundSlider({width: 2, value: $scope.setEndTimeValue, sliderType: "min-range", max: 24*60});
        updateSetEndTimeValue($scope.setEndTimeValue);
        $scope.setEndTimePopUpVisible = true;
        changePopUpClass($scope.setEndTimePopUpVisible);
    }
    
    function handleInitialResponse() {
        SHPService.parseGetDevices($scope, JSON.parse(getLocalStorageData('washerGetDeviceResponse')));
    }
    
    function updateSetEndTimeValue(value) {
        console.log("value :: "+value);
    }
    
    function cancelSetEndTime() {
        console.log("cancelSetEndTime called");
        closeAllPopups();
    }
    
    function saveSetEndTime() {
        console.log("saveSetEndTime called");
        closeAllPopups();
    }
    
});

var CourseEnumData = {
    '00': ['Notused', ''],
    '01': ['WEBMOB_device_washer_course_01', 'Washer/assets/img/main_drop_list_ic_normal_laundry.svg#Layer_1'],
    '02': ['WEBMOB_device_washer_course_02', 'Washer/assets/img/main_drop_list_ic_power_bubble_shot.svg#Layer_1'],
    '03': ['WEBMOB_device_washer_course_03', 'Washer/assets/img/main_drop_list_ic_sanitize.svg#Layer_1'],
    '04': ['WEBMOB_device_washer_course_04', 'Washer/assets/img/main_drop_list_ic_bedding.svg#Layer_1'],
    '05': ['WEBMOB_device_washer_course_05', 'Washer/assets/img/main_drop_list_ic_bubble_eco.svg#Layer_1'],
    '06': ['WEBMOB_device_washer_course_06', 'Washer/assets/img/main_drop_list_ic_wool.svg#Layer_1'],
    '07': ['WEBMOB_device_washer_course_07', 'Washer/assets/img/main_drop_list_ic_quick_wash.svg#Layer_1'],
    '08': ['WEBMOB_device_washer_course_08', 'Washer/assets/img/main_drop_list_ic_baby_care.svg#Layer_1'],
    '09': ['WEBMOB_device_washer_course_09', 'Washer/assets/img/main_drop_list_ic_bubble_sports.svg#Layer_1'],
    '0A': ['WEBMOB_device_washer_course_0a', 'Washer/assets/img/main_drop_list_ic_night_wash.svg#Layer_1'],
    '0B': ['WEBMOB_device_washer_course_0b', 'Washer/assets/img/main_drop_list_ic_air_refresh.svg#Layer_1'],
    '0C': ['WEBMOB_device_washer_course_0c', 'Washer/assets/img/main_drop_list_ic_air_sanitize.svg#Layer_1'],
    '0D': ['WEBMOB_device_washer_course_0d', 'Washer/assets/img/main_drop_list_ic_bedding_care.svg#Layer_1'],
    '0E': ['WEBMOB_device_washer_course_0e', 'Washer/assets/img/main_drop_list_ic_heavy_duty.svg#Layer_1'],
    '0F': ['WEBMOB_device_washer_course_0f', 'Washer/assets/img/main_drop_list_ic_bedding.svg#Layer_1'],
    '10': ['WEBMOB_device_washer_course_10', 'Washer/assets/img/main_drop_list_ic_eco_cold.svg#Layer_1'],
    '11': ['WEBMOB_device_washer_course_11', 'Washer/assets/img/main_drop_list_ic_wool.svg#Layer_1'],
    '12': ['WEBMOB_device_washer_course_12', 'Washer/assets/img/main_drop_list_ic_baby_care.svg#Layer_1'],
    '13': ['WEBMOB_device_washer_course_13', 'Washer/assets/img/main_drop_list_ic_deep_steam.svg#Layer_1'],
    '14': ['WEBMOB_device_washer_course_14', 'Washer/assets/img/main_drop_list_ic_stain_away.svg#Layer_1'],
    '15': ['WEBMOB_device_washer_course_15', 'Washer/assets/img/main_drop_list_ic_perm_press.svg#Layer_1'],
    '16': ['WEBMOB_device_washer_course_16', 'Washer/assets/img/main_drop_list_ic_active_wear.svg#Layer_1'],
    '17': ['WEBMOB_device_washer_course_17', 'Washer/assets/img/main_drop_list_ic_delicates.svg#Layer_1'],
    '18': ['WEBMOB_device_washer_course_18', 'Washer/assets/img/main_drop_list_ic_pure_cycle.svg#Layer_1'],
    '19': ['WEBMOB_device_washer_course_19', 'Washer/assets/img/main_drop_list_ic_rinse_spin_selected.svg#Layer_1'],
    '1A': ['WEBMOB_device_washer_course_1a', 'Washer/assets/img/main_drop_list_ic_spin.svg#Layer_1'],
    '1B': ['WEBMOB_device_washer_course_1b', 'Washer/assets/img/main_drop_list_ic_dining.svg#Layer_1'],
    '1C': ['WEBMOB_device_washer_course_1c', 'Washer/assets/img/main_drop_list_ic_gardening.svg#Layer_1'],
    '1D': ['WEBMOB_device_washer_course_1d', 'Washer/assets/img/main_drop_list_ic_active_wear.svg#Layer_1'],
    '1E': ['WEBMOB_device_washer_course_1e', 'Washer/assets/img/main_drop_list_ic_active_kids.svg#Layer_1'],
    '1F': ['WEBMOB_device_washer_course_1f', 'Washer/assets/img/main_drop_list_ic_shirts.svg#Layer_1'],
    '20': ['WEBMOB_device_washer_course_20', 'Washer/assets/img/main_drop_list_ic_intensive.svg#Layer_1'],
    '21': ['WEBMOB_device_washer_course_21', 'Washer/assets/img/main_drop_list_ic_towels.svg#Layer_1'],
    '22': ['WEBMOB_device_washer_course_22', 'Washer/assets/img/main_drop_list_ic_eco_normal.svg#Layer_1'],
    '23': ['WEBMOB_device_washer_course_23', 'Washer/assets/img/main_drop_list_ic_delicates.svg#Layer_1'],
    '24': ['WEBMOB_device_washer_course_24', 'Washer/assets/img/main_drop_list_ic_time_dry.svg#Layer_1'],
    '25': ['WEBMOB_device_washer_course_25', 'Washer/assets/img/main_drop_list_ic_quickdry.svg#Layer_1'],
    '26': ['WEBMOB_device_washer_course_26', 'Washer/assets/img/main_drop_list_ic_air_fluff.svg#Layer_1'],
    '27': ['WEBMOB_device_washer_course_27', 'Washer/assets/img/main_drop_list_ic_refresh.svg#Layer_1'],
    '28': ['WEBMOB_device_washer_course_28', 'Washer/assets/img/main_drop_list_ic_wrinkle_away.svg#Layer_1'],
    '29': ['WEBMOB_device_washer_course_29', 'Washer/assets/img/main_drop_list_ic_one_stop_bubble.svg#Layer_1'],
    '2A': ['WEBMOB_device_washer_course_2a', 'Washer/assets/img/main_drop_list_ic_soaking.svg#Layer_1'],
    '2B': ['WEBMOB_device_washer_course_2b', 'Washer/assets/img/main_drop_list_ic_active_wear.svg#Layer_1'],
    '2C': ['WEBMOB_device_washer_course_2c', 'Washer/assets/img/main_drop_list_ic_perm_press.svg#Layer_1'],
    '2D': ['WEBMOB_device_washer_course_2d', 'Washer/assets/img/main_drop_list_ic_water_saving.svg#Layer_1'],
    '2E': ['WEBMOB_device_washer_course_2e', 'Washer/assets/img/main_drop_list_ic_drying_only.svg#Layer_1'],
    '2F': ['WEBMOB_device_washer_course_2f', 'Washer/assets/img/main_drop_list_ic_cotton.svg#Layer_1'],
    '30': ['WEBMOB_device_washer_course_30', 'Washer/assets/img/main_drop_list_ic_jeans.svg#Layer_1'],
    '31': ['WEBMOB_device_washer_course_31', 'Washer/assets/img/main_drop_list_ic_colors_darks.svg#Layer_1'],
    '32': ['WEBMOB_device_washer_course_32', 'Washer/assets/img/main_drop_list_ic_daily_wash.svg#Layer_1'],
    '33': ['WEBMOB_device_washer_course_33', 'Washer/assets/img/main_drop_list_ic_pure_cycle.svg#Layer_1'],
    '34': ['WEBMOB_device_washer_course_34', 'Washer/assets/img/main_drop_list_ic_super_eco_wash.svg#Layer_1'],
    '35': ['WEBMOB_device_washer_course_35', 'Washer/assets/img/main_drop_list_ic_active_wear.svg#Layer_1'],
    '36': ['WEBMOB_device_washer_course_36', 'Washer/assets/img/main_drop_list_ic_delicates.svg#Layer_1'], //hand wasj
    '37': ['WEBMOB_device_washer_course_37', 'Washer/assets/img/main_drop_list_ic_baby_care.svg#Layer_1'],
    '38': ['WEBMOB_device_washer_course_38', 'Washer/assets/img/main_drop_list_ic_bubble_eco.svg#Layer_1'], //eco bubble
    '39': ['WEBMOB_device_washer_course_39', 'Washer/assets/img/main_drop_list_ic_pure_cycle.svg#Layer_1'],
    '3A': ['WEBMOB_device_washer_course_3a', 'Washer/assets/img/main_drop_list_ic_bedding.svg#Layer_1'],
    '3B': ['WEBMOB_device_washer_course_3b', 'Washer/assets/img/main_drop_list_ic_spin.svg#Layer_1'],
    '3C': ['WEBMOB_device_washer_course_3c', 'Washer/assets/img/main_drop_list_ic_eco_normal.svg#Layer_1'],
    '3D': ['WEBMOB_device_washer_course_3d', 'Washer/assets/img/main_drop_list_ic_air_sanitize.svg#Layer_1'],
    '3E': ['WEBMOB_device_washer_course_3e', 'Washer/assets/img/main_drop_list_ic_auto_optimal_wash.svg#Layer_1'], //Auto Optimal WashTM
    '3F': ['WEBMOB_device_washer_course_3f', 'Washer/assets/img/main_drop_list_ic_e_cotton.svg#Layer_1'],
    '40': ['WEBMOB_device_washer_course_40', 'Washer/assets/img/main_drop_list_ic_goretex_refresh.svg#Layer_1'],
    '41': ['WEBMOB_device_washer_course_41', 'Washer/assets/img/main_drop_list_ic_gardening.svg#Layer_1'],
    '42': ['WEBMOB_device_washer_course_42', 'Washer/assets/img/main_drop_list_ic_active_sports.svg#Layer_1'],
    '43': ['WEBMOB_device_washer_course_43', 'Washer/assets/img/main_drop_list_ic_hygiene_care.svg#Layer_1'],
    '44': ['WEBMOB_device_washer_course_44', 'Washer/assets/img/main_drop_list_ic_eco_cold.svg#Layer_1'],
    '45': ['WEBMOB_device_washer_course_45', 'Washer/assets/img/main_drop_list_ic_pure_cycle.svg#Layer_1'],
    '46': ['WEBMOB_device_washer_course_46', 'Washer/assets/img/main_drop_list_ic_cotton.svg#Layer_1'],
    '47': ['WEBMOB_device_washer_course_47', 'Washer/assets/img/main_drop_list_ic_quick_wash.svg#Layer_1'],
    '48': ['WEBMOB_device_washer_course_48', 'Washer/assets/img/main_drop_list_ic_delicates.svg#Layer_1'],
    '49': ['WEBMOB_device_washer_course_49', 'Washer/assets/img/main_drop_list_ic_dining.svg#Layer_1'],
    '4A': ['WEBMOB_device_washer_course_4a', 'Washer/assets/img/main_drop_list_ic_shirts.svg#Layer_1'],
    '4B': ['WEBMOB_device_washer_course_4b', 'Washer/assets/img/main_drop_list_ic_active_sports.svg#Layer_1'],
    '4C': ['WEBMOB_device_washer_course_4c', 'Washer/assets/img/main_drop_list_ic_active_kids.svg#Layer_1'],
    '4D': ['WEBMOB_device_washer_course_4d', 'Washer/assets/img/main_drop_list_ic_shirts.svg#Layer_1'],
    '4E': ['WEBMOB_device_washer_course_4e', 'Washer/assets/img/main_drop_list_ic_air_refresh.svg#Layer_1'],
    '4F': ['WEBMOB_device_washer_course_4f', 'Washer/assets/img/main_drop_list_ic_sanitize.svg#Layer_1'],
    '50': ['WEBMOB_device_washer_course_50', 'Washer/assets/img/main_drop_list_ic_cotton.svg#Layer_1'],
    '51': ['WEBMOB_device_washer_course_51', 'Washer/assets/img/main_drop_list_ic_perm_press.svg#Layer_1'],
    '52': ['WEBMOB_device_washer_course_52', 'Washer/assets/img/main_drop_list_ic_active_wear.svg#Layer_1'],
    '53': ['WEBMOB_device_washer_course_53', 'Washer/assets/img/main_drop_list_ic_padding.svg#Layer_1'],
    'FD': ['NotSupported', 'common/img/main_drop_list_ic_bedding.svg#Layer_1'],
    'FE': ['Unknown', 'common/img/main_drop_list_ic_bedding.svg#Layer_1'],
    'FF': ['NULL', 'NULL'],
    '54': ['WEBMOB_device_washer_course_54', 'Washer/assets/img/main_drop_list_ic_allergen.svg#Layer_1'],
    '55': ['WEBMOB_device_washer_course_55', 'Washer/assets/img/main_drop_list_ic_white.svg#Layer_1'],
    '56': ['WEBMOB_device_washer_course_56', 'Washer/assets/img/main_drop_list_ic_towels.svg#Layer_1'],
    '57': ['WEBMOB_device_washer_course_57', 'Washer/assets/img/main_drop_list_ic_pure_cycle.svg#Layer_1'],
    '58': ['WEBMOB_device_washer_course_58', 'Washer/assets/img/main_drop_list_ic_one_stop_bubble.svg#Layer_1'],
    '59': ['WEBMOB_device_washer_course_59', 'Washer/assets/img/main_drop_list_ic_bedding.svg#Layer_1'],
    '5A': ['WEBMOB_device_washer_course_5a', 'Washer/assets/img/main_drop_list_ic_pure_cycle.svg#Layer_1'],
    '5B': ['WEBMOB_device_washer_course_5b', 'Washer/assets/img/main_drop_list_ic_cotton.svg#Layer_1'],
    '5C': ['WEBMOB_device_washer_course_5c', 'Washer/assets/img/main_drop_list_ic_quick_wash.svg#Layer_1'],
    '5D': ['WEBMOB_device_washer_course_5d', 'Washer/assets/img/main_drop_list_ic_super_eco_wash.svg#Layer_1'],
    '5E': ['WEBMOB_device_washer_course_5e', 'Washer/assets/img/main_drop_list_ic_delicates.svg#Layer_1'],
    '5F': ['WEBMOB_device_washer_course_5f', 'Washer/assets/img/main_drop_list_ic_baby_care.svg#Layer_1'],
    '60': ['WEBMOB_device_washer_course_60', 'Washer/assets/img/main_drop_list_ic_active_wear.svg#Layer_1'],
    '61': ['WEBMOB_device_washer_course_61', 'Washer/assets/img/main_drop_list_ic_colors_darks.svg#Layer_1'],
    '62': ['WEBMOB_device_washer_course_62', 'Washer/assets/img/main_drop_list_ic_bedding.svg#Layer_1'],
    '63': ['WEBMOB_device_washer_course_63', 'Washer/assets/img/main_drop_list_ic_pure_cycle.svg#Layer_1'],
    '64': ['WEBMOB_device_washer_course_64', 'Washer/assets/img/main_drop_list_ic_rinse_spin_selected.svg#Layer_1'],
    '65': ['WEBMOB_device_washer_course_65', 'Washer/assets/img/main_drop_list_ic_wool.svg#Layer_1'],
    '66': ['WEBMOB_device_washer_course_66', 'Washer/assets/img/main_drop_list_ic_bedding.svg#Layer_1'],
    '67': ['WEBMOB_device_washer_course_67', 'Washer/assets/img/main_drop_list_ic_perm_press.svg#Layer_1'],
    '68': ['WEBMOB_device_washer_course_68', 'Washer/assets/img/main_drop_list_ic_e_cotton.svg#Layer_1'],
    '69': ['WEBMOB_device_washer_course_69', 'Washer/assets/img/main_drop_list_ic_eco_cold.svg#Layer_1'],
    '6A': ['WEBMOB_device_washer_course_6a', 'Washer/assets/img/main_drop_list_ic_downjumper.svg#Layer_1'], //use downjumper for down jacket
    '6B': ['WEBMOB_device_washer_course_6b', 'Washer/assets/img/main_drop_list_ic_spin.svg#Layer_1'],
    '6C': ['WEBMOB_device_washer_course_6c', 'Washer/assets/img/main_drop_list_ic_jeans.svg#Layer_1'],
    '6D': ['WEBMOB_device_washer_course_6d', 'Washer/assets/img/main_drop_list_ic_pure_cycle.svg#Layer_1'],
    '6E': ['WEBMOB_device_washer_course_6e', 'Washer/assets/img/main_drop_list_ic_cotton.svg#Layer_1'],
    '6F': ['WEBMOB_device_washer_course_6f', 'Washer/assets/img/main_drop_list_ic_steam_sanitize.svg#Layer_1'], //US
    '70': ['WEBMOB_device_washer_course_70', 'Washer/assets/img/main_drop_list_ic_heavy_duty.svg#Layer_1'], //US
    '71': ['WEBMOB_device_washer_course_71', 'Washer/assets/img/main_drop_list_ic_bedding.svg#Layer_1'], //US
    '72': ['WEBMOB_device_washer_course_72', 'Washer/assets/img/main_drop_list_ic_sanitize.svg#Layer_1'], //US
    '73': ['WEBMOB_device_washer_course_73', 'Washer/assets/img/main_drop_list_ic_rinse_spin_selected.svg#Layer_1'], //US
    '74': ['WEBMOB_device_washer_course_74', 'Washer/assets/img/main_drop_list_ic_active_wear.svg#Layer_1'], //US
    '75': ['WEBMOB_device_washer_course_75', 'Washer/assets/img/main_drop_list_ic_delicates.svg#Layer_1'], //US
    '76': ['WEBMOB_device_washer_course_76', 'Washer/assets/img/main_drop_list_ic_wool.svg#Layer_1'], //US
    '77': ['WEBMOB_device_washer_course_77', 'Washer/assets/img/main_drop_list_ic_perm_press.svg#Layer_1'], //US
    '78': ['WEBMOB_device_washer_course_78', 'Washer/assets/img/main_drop_list_ic_quick_wash.svg#Layer_1'], //US
    '79': ['WEBMOB_device_washer_course_79', 'Washer/assets/img/main_drop_list_ic_eco_cold.svg#Layer_1'], //US
    '7A': ['WEBMOB_device_washer_course_7a', 'Washer/assets/img/main_drop_list_ic_deep_steam.svg#Layer_1'], //US
    '7B': ['WEBMOB_device_washer_course_7b', 'Washer/assets/img/main_drop_list_ic_stain_away.svg#Layer_1'], //US
    '7C': ['WEBMOB_device_washer_course_7c', 'Washer/assets/img/main_drop_list_ic_wrinkle_away.svg#Layer_1'], //US
    '7D': ['WEBMOB_device_washer_course_7d', 'Washer/assets/img/main_drop_list_ic_refresh.svg#Layer_1'], //US
    '7E': ['WEBMOB_device_washer_course_7e', 'Washer/assets/img/main_drop_list_ic_air_fluff.svg#Layer_1'], //US
    '7F': ['WEBMOB_device_washer_course_7f', 'Washer/assets/img/main_drop_list_ic_time_dry.svg#Layer_1'], //US
    '80': ['WEBMOB_device_washer_course_80', 'Washer/assets/img/main_drop_list_ic_quickdry.svg#Layer_1'], //US
    '81': ['WEBMOB_device_washer_course_81', 'Washer/assets/img/main_drop_list_ic_eco_normal.svg#Layer_1'], //US
    '8C': ['WEBMOB_device_washer_course_8c', 'Washer/assets/img/main_drop_list_ic_quick_wash.svg#Layer_1'], //US
    '8D': ['WEBMOB_device_washer_course_8d', 'Washer/assets/img/main_drop_list_ic_deep_wash.svg#Layer_1'], //US
    '8E': ['WEBMOB_device_washer_course_8e', 'Washer/assets/img/main_drop_list_ic_white.svg#Layer_1'], //US
    '8F': ['WEBMOB_device_washer_course_8f', 'Washer/assets/img/main_drop_list_ic_bedding.svg#Layer_1'], //US
    '90': ['WEBMOB_device_washer_course_90', 'Washer/assets/img/main_drop_list_ic_spin.svg#Layer_1'], //US
    '91': ['WEBMOB_device_washer_course_91', 'Washer/assets/img/main_drop_list_ic_pure_cycle.svg#Layer_1'], //US
    '92': ['WEBMOB_device_washer_course_92', 'Washer/assets/img/main_drop_list_ic_air_wash.svg#Layer_1'], //US
    '93': ['WEBMOB_device_washer_course_93', 'Washer/assets/img/main_drop_list_ic_iron_dry.svg#Layer_1'], //US
    '94': ['WEBMOB_device_washer_course_94', 'Washer/assets/img/main_drop_list_ic_towels.svg#Layer_1'], //US
    '95': ['WEBMOB_device_washer_course_95', 'Washer/assets/img/main_drop_list_ic_time_dry.svg#Layer_1'], //US
    '96': ['WEBMOB_device_washer_course_96', 'Washer/assets/img/main_drop_list_ic_cool_air.svg#Layer_1'], //US
    '97': ['WEBMOB_device_washer_course_97', 'Washer/assets/img/main_drop_list_ic_warm_air.svg#Layer_1'], //US
    '98': ['WEBMOB_device_washer_course_98', 'Washer/assets/img/main_drop_list_ic_quickdry.svg#Layer_1'], //US
    '99': ['WEBMOB_device_washer_course_99', 'Washer/assets/img/main_drop_list_ic_mixed_load.svg#Layer_1'], //US
    '9A': ['WEBMOB_device_washer_course_9a', 'Washer/assets/img/main_drop_list_ic_e_cotton.svg#Layer_1'], //US
    '9B': ['WEBMOB_device_washer_course_9b', 'Washer/assets/img/main_drop_list_ic_steam_sanitize.svg#Layer_1'], //US
    '9C': ['WEBMOB_device_washer_course_9c', 'Washer/assets/img/main_drop_list_ic_heavy_duty.svg#Layer_1'], //US
    '9D': ['WEBMOB_device_washer_course_9d', 'Washer/assets/img/main_drop_list_ic_rinse_spin_selected.svg#Layer_1'], //US
    '9E': ['WEBMOB_device_washer_course_9e', 'Washer/assets/img/main_drop_list_ic_perm_press.svg#Layer_1'], //US
    '9F': ['WEBMOB_device_washer_course_9f', 'Washer/assets/img/main_drop_list_ic_quick_wash.svg#Layer_1'], //US
    'A0': ['WEBMOB_device_washer_course_a0', 'Washer/assets/img/main_drop_list_ic_air_fluff.svg#Layer_1'], //US
    'A1': ['WEBMOB_device_washer_course_a1', 'Washer/assets/img/main_drop_list_ic_wrinkle_away.svg#Layer_1'], //US
    'A2': ['WEBMOB_device_washer_course_a2', 'Washer/assets/img/main_drop_list_ic_delicates.svg#Layer_1'], //US
    'A3': ['WEBMOB_device_washer_course_a3', 'Washer/assets/img/main_drop_list_ic_active_wear.svg#Layer_1'], //US
    'A4': ['WEBMOB_device_washer_course_a4', 'Washer/assets/img/main_drop_list_ic_time_dry.svg#Layer_1'], //US
    'A5': ['WEBMOB_device_washer_course_a5', 'Washer/assets/img/main_drop_list_ic_bedding.svg#Layer_1'], //US
    'A6': ['WEBMOB_device_washer_course_a6', 'Washer/assets/img/main_drop_list_ic_quickdry.svg#Layer_1'], //US
    'A9': ['WEBMOB_device_washer_course_a9', 'Washer/assets/img/main_drop_list_ic_sanitize.svg#Layer_1'], //Dual
    'AA': ['WEBMOB_device_washer_course_aa', 'Washer/assets/img/main_drop_list_ic_white.svg#Layer_1'], //Dual
    'AB': ['WEBMOB_device_washer_course_ab', 'Washer/assets/img/main_drop_list_ic_eco_cold.svg#Layer_1'], //Dual
    'AC': ['WEBMOB_device_washer_course_ac', 'Washer/assets/img/main_drop_list_ic_normal_laundry.svg#Layer_1'], //Dual combo
    'AD': ['WEBMOB_device_washer_course_ad', 'Washer/assets/img/main_drop_list_ic_shirts.svg#Layer_1'], //Dual
    'AE': ['WEBMOB_device_washer_course_ae', 'Washer/assets/img/main_drop_list_ic_lingerie.svg#Layer_1'], //Dual
    'AF': ['WEBMOB_device_washer_course_af', 'Washer/assets/img/main_drop_list_ic_sweater.svg#Layer_1'], //Dual
    'B0': ['WEBMOB_device_washer_course_b0', 'Washer/assets/img/main_drop_list_ic_accessory.svg#Layer_1'], //Dual
    'B1': ['WEBMOB_device_washer_course_b1', 'Washer/assets/img/main_drop_list_ic_pure_cycle.svg#Layer_1'], //Dual
    'B2': ['WEBMOB_device_washer_course_b2', 'Washer/assets/img/main_drop_list_ic_air_refresh.svg#Layer_1'], //Dual combo
    'B4': ['WEBMOB_device_washer_course_b4', 'Washer/assets/img/main_drop_list_ic_active_wear.svg#Layer_1'], //Europe dryer
    'B5': ['WEBMOB_device_washer_course_b5', 'Washer/assets/img/main_drop_list_ic_wool.svg#Layer_1'], //Europe dryer
    'B6': ['WEBMOB_device_washer_course_b6', 'Washer/assets/img/main_drop_list_ic_perm_press.svg#Layer_1'], //Europe dryer
    'B7': ['WEBMOB_device_washer_course_b7', 'Washer/assets/img/main_drop_list_ic_pure_cycle.svg#Layer_1'], //Flex global
    'B8': ['WEBMOB_device_washer_course_b8', 'Washer/assets/img/main_drop_list_ic_drying_only.svg#Layer_1'], //Flex global_UAE
    'B9': ['WEBMOB_device_washer_course_b9', 'Washer/assets/img/main_drop_list_ic_rinse_spin_selected.svg#Layer_1'], //Flex global
    'BA': ['WEBMOB_device_washer_course_ba', 'Washer/assets/img/main_drop_list_ic_spin.svg#Layer_1'], //MK
    'BB': ['WEBMOB_device_washer_course_bb', 'Washer/assets/img/main_drop_list_ic_quick_wash.svg#Layer_1'], //Flex global
    'BC': ['WEBMOB_device_washer_course_bc', 'Washer/assets/img/main_drop_list_ic_delicates.svg#Layer_1'], //Flex global
    'BD': ['WEBMOB_device_washer_course_bd', 'Washer/assets/img/main_drop_list_ic_auto_optimal_wash.svg#Layer_1'], //MK
    'BE': ['WEBMOB_device_washer_course_be', 'Washer/assets/img/main_drop_list_ic_cotton.svg#Layer_1'], //Flex global
    'BF': ['WEBMOB_device_washer_course_bf', 'Washer/assets/img/main_drop_list_ic_wool.svg#Layer_1'], //Flex global
    'C0': ['WEBMOB_device_washer_course_c0', 'Washer/assets/img/main_drop_list_ic_quickdry.svg#Layer_1'], //Flex global
    'C1': ['WEBMOB_device_washer_course_c1', 'Washer/assets/img/main_drop_list_ic_power_bubble_shot.svg#Layer_1'], //Flex global
    'C2': ['WEBMOB_device_washer_course_c2', 'Washer/assets/img/main_drop_list_ic_baby_care.svg#Layer_1'], //Flex global
    'C3': ['WEBMOB_device_washer_course_c3', 'Washer/assets/img/main_drop_list_ic_active_wear.svg#Layer_1'], //Flex global
    'C4': ['WEBMOB_device_washer_course_c4', 'Washer/assets/img/main_drop_list_ic_pure_cycle.svg#Layer_1'], //Flex global
    'C5': ['WEBMOB_device_washer_course_c5', 'Washer/assets/img/main_drop_list_ic_bedding_care.svg#Layer_1'], //Flex global
    'C6': ['WEBMOB_device_washer_course_c6', 'Washer/assets/img/main_drop_list_ic_pure_cycle.svg#Layer_1'], //Flex global
    'C7': ['WEBMOB_device_washer_course_c7', 'Washer/assets/img/main_drop_list_ic_pure_cycle.svg#Layer_1'], //Flex global
    'C8': ['WEBMOB_device_washer_course_c8', 'Washer/assets/img/main_drop_list_ic_pure_cycle.svg#Layer_1'], //Flex global
    'C9': ['WEBMOB_device_washer_course_c9', 'Washer/assets/img/main_drop_list_ic_59_wash_dry_selected.svg#Layer_1'], //Europe washer
    'CA': ['WEBMOB_device_washer_course_ca', 'Washer/assets/img/main_drop_list_ic_air_wash.svg#Layer_1'], //Europe washer
    'CB': ['WEBMOB_device_washer_course_cb', 'Washer/assets/img/main_drop_list_ic_15_quick_wash.svg#Layer_1'], //Europe washer
    'CC': ['WEBMOB_device_washer_course_cc', 'Washer/assets/img/main_drop_list_ic_baby_care.svg#Layer_1'], //Europe washer
    'CD': ['WEBMOB_device_washer_course_cd', 'Washer/assets/img/main_drop_list_ic_active_wear.svg#Layer_1'], //Europe washer
    'CE': ['WEBMOB_device_washer_course_ce', 'Washer/assets/img/main_drop_list_ic_bedding.svg#Layer_1'], //Flex global
    'CF': ['WEBMOB_device_washer_course_cf', 'Washer/assets/img/main_drop_list_ic_drying_only.svg#Layer_1'], //Flex global
    'D0': ['WEBMOB_device_washer_course_d0', 'Washer/assets/img/main_drop_list_ic_cotton.svg#Layer_1'], //MK
    'D1': ['WEBMOB_device_washer_course_d1', 'Washer/assets/img/main_drop_list_ic_e_cotton.svg#Layer_1'], //MK
    'D2': ['WEBMOB_device_washer_course_d2', 'Washer/assets/img/main_drop_list_ic_perm_press.svg#Layer_1'], //MK
    'D3': ['WEBMOB_device_washer_course_d3', 'Washer/assets/img/main_drop_list_ic_delicates.svg#Layer_1'], //MK
    'D4': ['WEBMOB_device_washer_course_d4', 'Washer/assets/img/main_drop_list_ic_rinse_spin_selected.svg#Layer_1'], //MK
    'D5': ['WEBMOB_device_washer_course_d5', 'Washer/assets/img/main_drop_list_ic_pure_cycle.svg#Layer_1'], //MK
    'D6': ['WEBMOB_device_washer_course_d6', 'Washer/assets/img/main_drop_list_ic_bedding.svg#Layer_1'], //MK
    'D7': ['WEBMOB_device_washer_course_d7', 'Washer/assets/img/main_drop_list_ic_active_wear.svg#Layer_1'], //MK
    'D8': ['WEBMOB_device_washer_course_d8', 'Washer/assets/img/main_drop_list_ic_wool.svg#Layer_1'], //MK
    'D9': ['WEBMOB_device_washer_course_d9', 'Washer/assets/img/main_drop_list_ic_colors_darks.svg#Layer_1'], //MK
    'DA': ['WEBMOB_device_washer_course_da', 'Washer/assets/img/main_drop_list_ic_super_eco_wash.svg#Layer_1'], //MK
    'DB': ['WEBMOB_device_washer_course_db', 'Washer/assets/img/main_drop_list_ic_quick_wash.svg#Layer_1'], //MK
    'DC': ['WEBMOB_device_washer_course_dc', 'Washer/assets/img/main_drop_list_ic_15_quick_wash.svg#Layer_1'] //MK
};

var TempEnum = {
    "12": "Cold",
    "14": "Cool",
    "16": "EcoWarm",
    "1A": "Warm",
    "22": "Hot",
    "26": "ExtraHot",
    "E2": "ExtraLow",
    "E6": "Low",
    "EA": "MediumLow",
    "F2": "Medium",
    "F4": "High",
    "27": "냉수",
    "5E": "I20",
    "28": "I30",
    "30": "I40",
    "38": "I50",
    "40": "I60",
    "44": "I65",
    "48": "I70",
    "4C": "I75",
    "50": "I80",
    "58": "I90",
    "5C": "I95",
    "FE": "NotSupported",
    "FF": "None",
    "G0": "DoNotDisplay"
};

var OptionTypeEnum = {
    "8": "Temp",
    "9": "Rinse",
    "A": "Spin",
    "B": "DryCombo",
    "C": "Soil",
    "D": "DryLevel",
    "E": "DryTime",
    "F": "Soak"
};

app.service('CourseParseService', function () {
    var list, list_rin, list_sp, list_soil, list_drl, list_drt;
    this.getCourseParsed = function (courseOptionList, $scope, parseVal, washerType) {

        var firstString = courseOptionList.substring(0, 1);
        var optionNumber = parseInt(firstString, 10);
        var lengthCourseString = 2 + (optionNumber * 4);
        var courseLen = courseOptionList.length;
        if ((courseLen - 1) % lengthCourseString !== 0) {
            debugMessage("Not a correct course data string!");
            return null;
        }

        for (var i = 1; i < courseLen; i += lengthCourseString) {
            var CourseData = {serialVersionUID: '', courseNameHex: '', courseIcon: '', CourseEnum: '', defaultTemp: '', optionTempList: [], defaultRinse: '', optionRinseList: [], defaultSpin: '', optionSpinList: [], defaultSoil: '', optionSoilList: [], defaultDryLevel: '', optionDryLevelList: [], defaultDryTime: '', optionDryTimeList: [], defaultDryCombo: '', optionDryComboList: [], deviceType: '', isTempEnabled: false, isRinseEnabled: false, isSpinEnabled: false, isDryComboEnabled: false, isSoilLevelEnabled: false, isDryLevelEnabled: false, isDryTimeEnabled: false, isSoakEnabled: false, optionTypes: [], optionNumber: 0
            };
            var dataString = courseOptionList.substring(i, i + lengthCourseString);
            CourseData.courseNameHex = dataString.substring(0, 2);
            CourseData.CourseEnum = CourseEnumData[CourseData.courseNameHex][0];
            CourseData.courseIcon = CourseEnumData[CourseData.courseNameHex][1];

            for (var j = 2; j < dataString.length; j += 4) {

                // Hex to int converter
                var optionString = dataString.substring(j, j + 4);
                var option = parseInt(optionString, 16);
                // [0] Option Type - 4bit(15-12 bit)
                var type = (option >> 12) & 0x0000000F;
                // [1] Defaults - 4bit(11-8 bit) => Index values
                var defaultValue = (option >> 8) & 0x0000000F;
                // [2] Available options - 8bit(7-0 bit) => Bit per available options
                var avail = option & 0x000000FF;

                if (type === 0x8) {
                    //Temp
                    CourseData.isTempEnabled = true;
//                    var list;
                    if (parseVal === 0) {
                        if (!$scope.isDualWasher) {
                            list = $scope.Device["Washer"].supportedWaterTemperature;
                        } else {
                            if ($scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                                list = $scope.mainWasherData["Washer"].supportedWaterTemperature;
                            } else if ($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                                list = $scope.subWasherData["Washer"].supportedWaterTemperature;
                            } else {
                                ;//Nothing
                            }
                        }
                    } else {
                        //list = $scope.listItemsTemp;
                    }
                    CourseData.defaultTemp = list[defaultValue];
                    var len = list.length;
                    for (var k = 0; k < len; k++) {
                        if (((avail >> k) & 0x00000001) === 0x00000001 && (CourseData.optionTempList.indexOf(list[k]) === -1)) {
                            CourseData.optionTempList.push(list[k]);
                        }
                    }
                    if (CourseData.optionTypes.indexOf("8") === -1) {
                        CourseData.optionTypes.push("8");
                    }

                } else if (type === 0x9) {
                    //Rinse
                    CourseData.isRinseEnabled = true;
//                    var list_rin;
                    if (parseVal === 0) {
                        if (!$scope.isDualWasher) {
                            list_rin = $scope.Device["Washer"].supportedRinseCycles;
                        } else {
                            if ($scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                                list_rin = $scope.mainWasherData["Washer"].supportedRinseCycles;
                            } else if ($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                                list_rin = $scope.subWasherData["Washer"].supportedRinseCycles;
                            } else {
                                ;//Nothing
                            }
                        }
                    } else {
                        //list_rin = $scope.listItemsRinse;
                    }
                    CourseData.defaultRinse = list_rin[defaultValue];
                    for (var ri = 0; ri < list_rin.length; ri++) {
                        if (((avail >> ri) & 0x00000001) === 0x00000001 && (CourseData.optionRinseList.indexOf(list_rin[ri]) === -1)) {
                            CourseData.optionRinseList.push(list_rin[ri]);
                        }
                    }
                    CourseData.optionTypes.push("9");
                } else if (type === 0xA) {
                    // Spin
                    CourseData.isSpinEnabled = true;
                    // var list_sp;
                    if (parseVal === 0) {
                        if (!$scope.isDualWasher) {
                            list_sp = $scope.Device["Washer"].supportedSpinLevel;
                        } else {
                            if ($scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                                list_sp = $scope.mainWasherData["Washer"].supportedSpinLevel;
                            } else if ($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                                list_sp = $scope.subWasherData["Washer"].supportedSpinLevel;
                            } else {
                                ;//Nothing
                            }
                        }
                    } else {
                        //list_sp = $scope.listItemsSpin;
                    }
                    if ($scope.dmName === "WF457") {
                        defaultValue = defaultValue - 1;
                        avail = avail >> 1;
                    }
                    CourseData.defaultSpin = list_sp[defaultValue];
                    for (var spi = 0; spi < list_sp.length; spi++) {
                        if (((avail >> spi) & 0x00000001) === 0x00000001) {
                            CourseData.optionSpinList.push(list_sp[spi]);
                        }
                    }
                    CourseData.optionTypes.push("A");
                } else if (type === 0xB) {
                    // DryCombo
                    $scope.itiscombo = true;
                    CourseData.isDryComboEnabled = true;
                    var list_Drcm;
                    if (!$scope.isDualWasher) {
                        list_Drcm = $scope.Device["Washer"].supportedDryLevel;
                    } else {
                        if ($scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                            list_Drcm = $scope.mainWasherData["Washer"].supportedDryLevel;
                        } else if ($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                            list_Drcm = $scope.subWasherData["Washer"].supportedDryLevel;
                        } else {
                            ;//Nothing
                        }
                    }
                    if (list_Drcm !== undefined) {
                        CourseData.defaultDryCombo = list_Drcm[defaultValue];
                        for (var dri = 0; dri < list_Drcm.length; dri++) {
                            if (((avail >> dri) & 0x00000001) === 0x00000001) {
                                CourseData.optionDryComboList.push(list_Drcm[dri]);
                            }
                        }
                    }
                    CourseData.optionTypes.push("B");
                } else if (type === 0xC) {
                    // 오염도(SoilLevel)
                    CourseData.isSoilLevelEnabled = true;
//                    var list_soil;
                    if (parseVal === 0) {
                        if (!$scope.isDualWasher) {
                            list_soil = $scope.Device["Washer"].supportedSoilLevel;
                        } else {
                            if ($scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                                list_soil = $scope.mainWasherData["Washer"].supportedSoilLevel;
                            } else if ($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                                list_soil = $scope.subWasherData["Washer"].supportedSoilLevel;
                            } else {
                                ;//Nothing
                            }
                        }
                    } else {
                        //list_soil = $scope.listItemsSoilLevel;
                    }
                    if (list_soil !== undefined) {
                        CourseData.defaultSoil = list_soil[defaultValue];
                        for (var soi = 0; soi < list_soil.length; soi++) {
                            if (((avail >> soi) & 0x00000001) === 0x00000001) {
                                CourseData.optionSoilList.push(list_soil[soi]);
                            }
                        }
                    }
                    CourseData.optionTypes.push("C");
                } else if (type === 0xD) {
                    // DryLevel
                    CourseData.isDryLevelEnabled = true;
//                    var list_drl;
                    if (parseVal === 0) {
                        if (!$scope.isDualWasher) {
                            list_drl = $scope.Device["Washer"].supportedDryLevel;
                        } else {
                            if ($scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                                list_drl = $scope.mainWasherData["Washer"].supportedDryLevel;
                            } else if ($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                                list_drl = $scope.subWasherData["Washer"].supportedDryLevel;
                            } else {
                                ;//Nothing
                            }
                        }
                    } else {
                        //list_drl = $scope.listItemsDryLevel;
                    }
                    if (list_drl !== undefined) {
                        CourseData.defaultDryLevel = list_drl[defaultValue];
                        for (var dli = 0; dli < list_drl.length; dli++) {
                            if (((avail >> dli) & 0x00000001) === 0x00000001) {
                                CourseData.optionDryLevelList.push(list_drl[dli]);
                            }
                        }
                    }
                    CourseData.optionTypes.push("D");
                } else if (type === 0xE) {
                    // DryTime
                    CourseData.isDryTimeEnabled = true;
//                    var list_drt;
                    if (parseVal === 0) {
                        if (!$scope.isDualWasher) {
                            list_drt = $scope.Device["Washer"].supportedDryTime;
                        } else {
                            if ($scope.washerToUpdate === WASHERTOUPDATE.MAINWASHER) {
                                list_drt = $scope.mainWasherData["Washer"].supportedDryTime;
                            } else if ($scope.washerToUpdate === WASHERTOUPDATE.SUBWASHER) {
                                list_drt = $scope.subWasherData["Washer"].supportedDryTime;
                            } else {
                                ;//Nothing
                            }
                        }
                    } else {
                        //list_drt = $scope.listItemsDryTime;
                    }
                    if (list_drt !== undefined) {
                        CourseData.defaultDryTime = list[defaultValue];
                        for (var dti = 0; dti < list_drt.length; dti++) {
                            if (((avail >> dti) & 0x00000001) === 0x00000001) {
                                CourseData.optionDryTimeList.push(list_drt[dti]);
                            }
                        }
                    }
                    CourseData.optionTypes.push("E");
                } else if (type === 0xF) {
                    // Soak
                    CourseData.isSoakEnabled = true;
                    CourseData.optionTypes.push("F");
                } else {
                    ;// Nothing
                }

            }
            if (parseVal === 0) {
                switch (washerType) {
                    case 0:
                    case 1:
                        $scope.Device['CourseData'].push(CourseData);
                        break;
                    case 2:
                        $scope.mainWasherData['CourseData'].push(CourseData);
                        $scope.Device['CourseData'].push(CourseData);
                        break;
                    case 3:
                        $scope.subWasherData['CourseData'].push(CourseData);
                        $scope.Device['CourseData'].push(CourseData);
                        break;
                    default:
                        $scope.Device['CourseData'].push(CourseData);
                        break;
                }
            } else {
                switch (washerType) {
                    case 0:
                    case 1:
                        $scope.quickWashcode = CourseData;
                        break;
                    case 2:
                        $scope.quickWashcodeMain = CourseData;
                        break;
                    case 3:
                        $scope.quickWashcodeSub = CourseData;
                        break;
                    default:
                        $scope.quickWashcode = CourseData;
                        break;
                }
            }
        }
    };
});

app.directive('textareaLoaded', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            $(element).bind('keypress keydown change', function (e) {
                console.log("textareaLoaded ", this.maxLength);
                if (this.value.length >= this.maxLength && (e.keyCode !== 13 && e.keyCode !== 8)) {
                    debugMessage(this.value.length);
                    e.preventDefault();
                    this.value = this.value.substr(0, this.maxLength);
                    this.blur();
                    return false;
                }
            });
        }
    };
});

function updateKitchenTimerValue(value) {
    var scope = angular.element($("#bodyTag")).scope();
    scope.setEndTimeValue = Number(value);
    scope.updateSetEndTimeValue(scope.setEndTimeValue);
    if (scope.$root.$$phase !== '$apply' && scope.$root.$$phase !== '$digest') {
        scope.$apply();
    }
}
