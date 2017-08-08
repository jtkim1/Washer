var OVENSCREENS = {
    OVEN_READY_SCREEN: 1,
    OVEN_RUNNING_SCREEN: 2,
    OVEN_ERROR_SCREEN: 3,
    OVEN_MAIN_FUNCTION: 4,
    OVEN_SPECIAL_FUNCTION: 5,
    OVEN_MY_COOKING: 6,
    OVEN_AUTO_COOK: 7,
    OVEN_CHEF_RECIPE: 8,
    OVEN_SHOW_RECIPE: 9,
    OVEN_AUTOCOOK_DETAILS_CONTAINER: 10,
    OVEN_ADDMYCOOKING_CONTAINER: 11,
    OVEN_PRESS_START_ON_OVEN_CONTAINER: 12,
    OVEN_SETTINGS_CONTAINER: 13,
    OVEN_ABOUT_CONATAINER: 14,
    OVEN_CLEANINPROGRESS_CONTAINER: 15,
    OVEN_DRAINING_CONTAINER: 16,
    OVEN_RINSING_CONTAINER: 17,
    OVEN_COOLING_CONTAINER: 18,
    OVEN_OPERATION_COMPLETED: 19,
    OVEN_PREHEAT_CONTAINER: 20,
    OVEN_COOKING_CONTAINER: 21,
    OVEN_DRAINNEED_CONTAINER: 22,
    OVEN_CHECKING_CONTAINER: 23,
    OVEN_POPUP_ON_DEVICE_CONTAINER: 24,
    OVEN_ALARM_ON_DEVICE_CONTAINER: 25,
    OVEN_EDIT_MY_COOKING_CONTAINER: 26,
    OVEN_COMMON_RUNNING_MODE_TYPE_CONTAINER: 27,
    OVEN_SMARTCARE_STARTNOW_CONTAINER: 28,
    OVEN_SMARTCARE_STARTNOW_NOERROR_CONTAINER: 29
};

var OVENTABS = {
    OVEN_TAB_INGREDIANTS: 1,
    OVEN_TAB_PREPRATION: 2,
    OVEN_TAB_COOKING: 3,
    OVEN_TAB_FINISHING: 4
};

var OVEN_ALERT_STATE = {
    ALERT_NONE: 0,
    ALERT_TURNONOVEN: 1,
    ALERT_CANCEL_PROGRESS: 2,
    ALERT_COOKING_SNOOZE: 3,
    ALERT_SMARTMONITOR_GUIDE: 4,
    ALERT_AUTOCOOK_INFO: 5,
    ALERT_SAVEMYRECIPE: 6,
    ALERT_RENAMERECIPE: 7,
    ALERT_PREHEATCOMPLETE: 8,
    ALERT_DELETERECIPE: 9,
    ALERT_DEVELOPER_INFO: 10,
    ALERT_CONNECTION_ERROR: 11
};

var RANGE_ALERT_STATE = {
    ALERT_NONE: 0,
    ALERT_TURNONOVEN: 1,
    ALERT_CANCEL_PROGRESS: 2,
    ALERT_COOKING_SNOOZE: 3,
    ALERT_SMARTMONITOR_GUIDE: 4,
    ALERT_AUTOCOOK_INFO: 5,
    ALERT_SAVEMYRECIPE: 6,
    ALERT_RENAMERECIPE: 7,
    ALERT_PREHEATCOMPLETE: 8,
    ALERT_DELETE_MY_COOKING: 9,
    ALERT_CHILD_LOCK: 10,
    ALERT_CONNECTION_ERROR: 11,
    ALERT_DEVELOPER_INFO: 12,
    ALERT_SABBATH_MODE: 13,
    ALERT_SERVICE_CALL: 14,
    ALERT_AUTO_COOK_PROBE: 15,
    ALERT_START_COOKING: 16,
    ALERT_START_ATUOCOOK_COOKING: 17,
    ALERT_CANCEL_COOKING: 18,
    ALERT_DOOR_OPEN: 19

};

var RVC_ALERT_STATE = {
    ALERT_NONE: 0,
    ALERT_DONT_SHOW_AGAIN: 1,
};

var DRYERSCREEN = {
    HOME: 1,
    SETTINGS: 2,
    OPTIONS: 3,
    SMARTCARE: 4,
    LAUNDRYOUTPAGE: 5
};

var DRYERALERT = {
    CANCEL: 1,
    WRINKLE: 2,
    CYCLEFINISHED: 3,
    POWEROFF: 4,
    AUTODETERGENT: 5,
    ALARMSERVICE: 6,
    VENT: 7,
    CONNECTION_FAILURE: 8,
    DISPENSER_OPEN: 9,
    RESETENERGY: 10
};

var OVEN_MODE_TABLE = {
    VAPOUR: 0,
    CRISPONTOP: 1,
    RECENT_USED_TIME: 2,
    NO_OF_VISIT: 3,
    FAVORITE: 4,
    MEAT_PROBE: 5,
    FAST_PREHEATING: 6,
    READY_AT: 7,
    COOKING_TIME: 8,
    DESCRIPTION: 9,
    ID: 10,
    MODEL: 11,
    MODE: 12,
    TEXT: 13,
    DEFAULT_TEMP: 14,
    MIN_TEMP: 15,
    MAX_TEMP: 16,
    DEFAULT_TIME: 17,
    MIN_TIME: 18,
    MAX_TIME: 19,
    TYPE: 20,
    SINGLE: 21,
    UPPER: 22,
    LOWER: 23
};

var CHEF_RECIPE_TABLE = {
    SERVINGS_TYPE: 0,
    CHEF: 1,
    ID: 2,
    MENU: 3,
    DEFAULT_SETTINGS: 4,
    MINI_SETTINGS: 5,
    MAX_SETTINGS: 6,
    DEFAULT_TIME: 7,
    MAX_TIME: 8,
    MIN_TIME: 9,
    OPTION1: 10,
    OPTION2: 11,
    OPTION3: 12,
    OPTION4: 13,
    OPTION5: 14,
    CAVITY: 15,
    GUIDE: 16,
    STAGE_INFO: 17
};

var OVEN_FAVORITE_TABLE = {
    ID: 0,
    MODE: 1,
    FAV_NAME: 2,
    FAV_TEMP: 3,
    FAV_TIME: 4,
    RECIPE_NAME: 5,
    FASTPREHEAT: 6,
    MEATPROBE: 7,
    CRISPY: 8,
    VAPOR: 9,
    FAV_MEAT_TEMP: 10
};

var MY_COOKING_TABLE = {
    ID: 0,
    MODE: 1,
    FAV_NAME: 2,
    FAV_TEMP: 3,
    FAV_TIME: 4,
    RECIPE_NAME: 5,
    FASTPREHEAT: 6,
    MEATPROBE: 7,
    CRISPY: 8,
    VAPOUR: 9,
    FAV_MEAT_TEMP: 10
};

var AUTO_COOK_TABLE = {
    EDITABLE: 0,
    ID: 1,
    MENU: 2,
    CATEGORY: 3,
    SUB_CATEGORY: 4,
    DEFAULT_WEIGHT: 5,
    MIN_WEIGHT: 6,
    MAX_WEIGHT: 7,
    LEVEL_TYPE: 8,
    TRAY_TYPE: 9,
    GUIDE_FOR_STEP1: 10,
    GUIDE_FOR_STEP2: 11,
    GUIDE_FOR_STEP3: 12,
    GUIDE_FOR_STEP4: 13,
    GUIDE_FOR_STEP5: 14,
    CAVITY: 15,
    MEAT_PROBE: 16,
    LOCALE: 17
};

var RANGESCREENS = {
    RANGE_MAIN_LOADING_PAGE: 1,
    RANGE_READY_HOME_PAGE: 2,
    RANGE_PROGRESS_RUNNUNG_PAGE: 3,
    RANGE_ERROR_PAGE: 4,
    RANGE_AUTO_COOK_PAGE: 5,
    RANGE_SETTING_PAGE: 6,
    RANGE_ABOUT_PAGE: 7,
    RANGE_COOKTOP_PAGE: 8,
    RANGE_SETTING_TEMP_ADJUDT_PAGE: 9,
    RANGE_SETTING_TEMP_UNIT_PAGE: 10,
    RANGE_AUTO_COOK_DETAIL_PAGE: 11,
    RANGE_OPERATION_COMPLETE_PAGE: 12,
    RANGE_EDIT_MY_COOKING_PAGE: 13,
    RANGE_ADD_MY_COOKING_PAGE: 14,
    RANGE_SEND_CONFERMATION_PAGE: 15,
    RANGE_SMART_CARE_PAGE: 16,
    RANGE_SMART_CARE_NO_ERROR_PAGE: 17,
    RANGE_PROBE_DIVIDER_ERROR_PAGE: 18,
    RANGE_PROGRESS_RUNNUNG_PAGE_LANDSCAPE: 19,
    RANGE_SCREENS_INFORMATION: 20,
    RANGE_OPEN_SOURCE_PAGE:21    

};

var FOODREMINDERSCREEN = {
    HOME_SCREEN: 0,
    LIBRARY_SCREEN: 1,
    SENDTOSHOPLIST_SCREEN: 2,
    HELP_SCREEN: 3,
    ABOUTSCREEN : 4
};

var SHOPPINGLISTSCREEN = {
    HOME: 0,
    SHOPPINGLISTDETAILSCREEN: 1,
    VIEWFRIDGEINSIDE: 2,
    ADDSHOPPINGLISTSCREEN: 3,
    EDITSHOPPINGLISTSCREEN: 4,
    SENDTOFOODREMINDER_SCREEN: 5,
    ABOUTSCREEN : 6
};

var DRYER_TEMP = {
    "ExtraLow": "WEBMOB_device_washer_option_drytemp_extralow",
    "Low": "WEBMOB_device_washer_option_drytemp_low",
    "MediumLow": "WEBMOB_device_washer_option_drytemp_mediumlow",
    "Medium": "WEBMOB_device_washer_option_drytemp_medium",
    "High": "WEBMOB_device_washer_option_drytemp_high"
};

var DRYER_TIME = {
    "T00": "-",
    "T100": "100",
    "T90": "90",
    "T80": "WEBMOB_device_washer_option_drytime_EPA_1",
    "T70": "WEBMOB_device_washer_option_drytime_EPA_2",
    "T60": "WEBMOB_device_washer_option_drytime_1",
    "T50": "WEBMOB_device_washer_option_drytime_2",
    "T40": "WEBMOB_device_washer_option_drytime_3",
    "T30": "WEBMOB_device_washer_option_drytime_4",
    "T20": "WEBMOB_device_washer_option_drytime_5"

};

var DRYER_DRYLEVEL = {
    "Damp": "WEBMOB_device_washer_option_drylevel_damp",
    "Less": "WEBMOB_device_washer_option_drylevel_less",
    "Normal": "WEBMOB_device_washer_option_drylevel_normal",
    "More": "WEBMOB_device_washer_option_drylevel_more",
    "Very": "WEBMOB_device_washer_option_drylevel_very",
    "None": "-"
};

var OVEN_HEADER_MAPPING = {
    "AutoCook": "WEBMOB_device_oven_auto_cook",
    "Conventional": "OVENMOB_LCD_conventional",
    "Convection": "OVENMOB_LCD_convection",
    "EcoConvection": "OVENMOB_LCD_eco_convection",
    "LargeGrill": "OVENMOB_LCD_large_grill",
    "EcoGrill": "OVENMOB_LCD_eco_grill",
    "FanGrill": "OVENMOB_LCD_fan_grill",
    "BottomHeatPluseConvection": "OVENMOB_LCD_bottom_heat_convection",
    "TopHeatPluseConvection": "OVENMOB_LCD_top_heat_convection",
    "BottomHeat": "OVENMOB_LCD_bottom_heat",
    "IntensiveCook": "OVENMOB_LCD_intensive_cook",
    "ProRoasting": "OVENMOB_LCD_pro_roasting",
    "KeepWarm": "OVENMOB_LCD_keep_warm",
    "PlateWarm": "OVENMOB_LCD_plate_warm",
    "Defrost": "OVENMOB_LCD_defrost",
    "ProveDough": "OVENMOB_LCD_prove_dough",
    "PizzaCook": "OVENMOB_LCD_pizza_cook",
    "SlowCook": "OVENMOB_LCD_slow_cook",
    "Drying": "OVENMOB_LCD_drying",
    "VaporConvection": "OVENMOB_LCD_vapor_convection",
    "VaporTopHeatPluseConvection": "OVENMOB_LCD_vapor_top_heat_convection",
    "VaporBottomHeatPluseConvection": "OVENMOB_LCD_vapor_bottom_heat_convection",
    "CleanAirPyro": "OVENMOB_LCD_pyrolytic",
    "Descale": "OVENMOB_LCD_descale",
    "SteamClean": "OVENMOB_LCD_steam_cleaning",
    "ChefRecipe": "OVENMOB_LCD_chef_s_recipe",
    "Settings": "WEBMOB_common_settings",
    "About Device": "WEBMOB_common_about_device",
    "Oven": "WEBMOB_common_device_oven",
    "Add My Cooking": "WEBMOB_common_device_oven",
    "Edit My Cooking": "WEBMOB_common_device_oven",
    "Pyrolytic": "OVENMOB_LCD_pyrolytic",
    "Steam cleaning": "OVENMOB_LCD_steam_cleaning"
};

var VENTLEVEL_0 = 0;
var VENTLEVEL_1 = 1;
var VENTLEVEL_2 = 2;
var VENTLEVEL_3 = 3;
var VENTLEVEL_4 = 4;
var VENTLEVEL_5 = 5;
var VENTLEVEL_6 = 6;
var VENTLEVEL_7 = 7;

var OVEN_INC_DEC_LONGPRESS = {
    "TIME": 300
};

var RANGE_INC_DEC_LONGPRESS = {
    "TIME": 150
};

var ANIMATION_TIME = {
    "RIPPLE_EFFECT": 650
};

var OVENLOCALSTORAGE = {
    FAVDB: "OVEN_FAV_DB",
    NOOFVISIT: "NOOFVISIT"
};

var RANGELOCALSTORAGE = {
    FAVDB: "RANGE_FAV_DB"
};

var OVEN_COMMANDS = {
    "getDevices": "getDevices",
    "sendRecipetoOven": "sendRecipetoOven",
    "cancelCooking": "cancelCooking",
    "snoozeCookingTime": "snoozeCookingTime",
    "changeRunningStateProperty": "changeRunningStateProperty",
    "showModuleVersion": "showModuleVersion",
    "smartCareDiagnosis": "smartCareDiagnosis"
};

var RANGE_COMMANDS = {
    "getDevices": "getDevices",
    "sendRecipetoOven": "sendRecipetoOven",
    "cancelCooking": "cancelCooking",
    "snoozeCookingTime": "snoozeCookingTime",
    "runOnNative": "runOnNative",
    "changeTempUnit": "changeTempUnit",
    "startConfirmationOK": "startConfirmationOK",
    "showModuleVersion": "showModuleVersion",
    "SettingOptions": "SettingOptions",
    "smartCareDiagnosis": "smartCareDiagnosis"
};
