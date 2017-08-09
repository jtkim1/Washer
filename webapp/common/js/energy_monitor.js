/*******************************************************************************
 * @author Ajay Singh (ajay1.s@samsung.com), Manish Kumar(manish.kumar@samsung.com),Mithoon Kumar(mithoon.k@samsung.com),Shashank Saurabh(shashank.s95@samsung.com)
 * @file This file implements Energy monitor functions and services.  
 * Copyright 2015 by Samsung Electronics, Inc.,
 * @license This software is the confidential and proprietary information of Samsung
 * Electronics, Inc. ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Samsung.
 ******************************************************************************/
var obj = {};
var lastDate;
var firstDate;
var meterDate;
var deviceType;
var lastValueDayStored;
var lastValueWeekStored;
var lastValueMonthStored;
var currMonthEnergyData = "0.0";
var prevMonthEnergyData = "0.0";
var endDateNative = '';
var lastDayValueOnX = [];
var lastWeekValueOnX = [];
var lastMonthValueOnX = [];
var lastTabClicked = '';
var energyKeys = {};
var currPage = null;
var energyDebug = true;
var monthLeftCount = 0;
var weekLeftCount = 0;
var lastMonthData = [];
var lastWeekData = [];
var dualDeviceId = 0;
var EnergyDictionary = {};
var averagePowerUsageDevice = {};
var isAvailDay = false;
var isAvailMonth = false;
var isAvailWeek = false;
var isRunningTime = false;
var isDaySelected = false;
var isMonthSelected = false;
var isYearSelected = false;
var isWeekSelected = false;
var isLeftClicked = false;
var energyManagerDataState = false;
var isWeekAlreadyClicked = false;
var isMonthAlreadyClicked = false;

function flushVariables()
{

    lastValueDayStored = undefined;
    lastValueWeekStored = undefined;
    lastValueMonthStored = undefined;
    currMonthEnergyData = "0.0";
    prevMonthEnergyData = "0.0";
    endDateNative = '';
    lastDayValueOnX = [];
    lastWeekValueOnX = [];
    lastMonthValueOnX = [];
    lastTabClicked = '';
    currPage = null;
    energyDebug = true;
    monthLeftCount = 0;
    weekLeftCount = 0;
    lastMonthData = [];
    lastWeekData = [];
    isAvailDay = false;
    isAvailMonth = false;
    isAvailWeek = false;
    isRunningTime = false;
    isDaySelected = false;
    isMonthSelected = false;
    isYearSelected = false;
    isWeekSelected = false;
    isLeftClicked = false;
    energyManagerDataState = false;
    isWeekAlreadyClicked = false;
    isMonthAlreadyClicked = false;

}
Date.prototype.yyyymmdd = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]); // padding
};


var createStaticEnergyData = function () {
    var arr = [];
    var power_usage = 0;
    var datetoday = new Date(2016, 4, 16);
    var now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    var count = 2 + (Number(now) - Number(datetoday)) / 86400000;
    for (var i = 1; i < count; i++)
    {
        date = datetoday.yyyymmdd().toString();
        if (i === 1) {
            firstDate = Number(date);
        }
        if (i === count - 1) {
            lastDate = Number(date);
        }
        var power_usage_current = Math.floor((0.1 * 100) + 1);
        power_usage += power_usage_current;
        var tempobj = {};
        tempobj[Number(date)] = {date: Number(date), power_usage: power_usage, power_usage_current: power_usage_current};
        obj[Number(date)] = {date: Number(date), power_usage: power_usage, power_usage_current: power_usage_current, running_time: 105};
        var tom = Number(datetoday) + Number(86400000);
        datetoday = new Date(tom);
        arr.push(date);
    }
    energyKeys = {'0': arr};
    EnergyDictionary = {'0': obj};
};
createStaticEnergyData();




app.service("EnergyService", function (SHPService) {
    this.getYAxisValue = getYAxisValue;

    function getYAxisValue(value) {
        return value * getThreshold();
    }

    this.goToEnergyMonitor = function ($scope) {
        flushVariables();
        $scope.selectedLanguage = LANG.toUpperCase();
        currPage = 'energyMonitor';
        deviceType = $scope.deviceType;
        isWeekAlreadyClicked = false;
        isMonthAlreadyClicked = false;
        if (deviceType === "FAC") {
            meterDate = $scope.currentMeterDate;
        }
        if (typeof ($scope.isRunningTimeGraph) !== 'undefined')
        {
            if ($scope.isRunningTimeGraph) {
                isRunningTime = true;
            } else {
                isRunningTime = false;
            }
        } else {
            isRunningTime = false;
        }
        if ($scope.isStatic) {
            this.showDailyData($scope);
        } else {
            var date = new Date();
            lastValueDayStored = undefined;
            if (energyDebug) {
                makeEnergyDataFromEnergyDictionary(date.yyyymmdd(), $scope.optionCodeValue, dualDeviceId, 'day', $scope);
            } else if (!energyResetDone) {
                nativeInterface.runOnNative("getEnergyData", '{"deviceUuid" : "' + $scope.deviceUuid + '", "date" : "' + date.yyyymmdd() + '","dataType" : "day","optionCode" :"' + $scope.optionCodeValue + '","dualDeviceId" :"' + dualDeviceId + '"}');
            }
            this.showDailyData($scope);
        }
    };

    this.showDailyData = function ($scope) {
        lastTabClicked = $scope.enrgyMonitorTab;
        $scope.enrgyMonitorTab = "day";
        isDaySelected = true;
        isMonthSelected = false;
        isWeekSelected = false;
        isYearSelected = false;
        if ((energyResetDone || (angular.isDefined(energyKeys[dualDeviceId]) && energyKeys[dualDeviceId].length === 0))) {
            var date = new Date();
            var jsr = '{"dataType": "day","endDate":"' + date.yyyymmdd() + '", "energyData": [{"value": "0.0", "date":"' + date.yyyymmdd() + '"}]}';
            jsr = JSON.parse(jsr);
            this.parseEnergyUsageData($scope, jsr);
        } else if (energyDebug) {
            makeDailyDatas(dualDeviceId, $scope.optionCodeValue, $scope.isStatic, $scope);
        } else if (!$scope.isStatic) {
            makeDailyDatas($scope.deviceUuid, $scope.optionCodeValue, $scope.isStatic, $scope);
        } else {
            var jsr;
            if (deviceType === "FAC") {
                jsr = {"dataType": "day", "endDate": "20160215", "energyData": [{"value": "1200.345", "date": "20160310"}, {"value": "2100.657", "date": "20160309"}, {"value": "700.0904", "date": "20160308"}, {"value": "2200", "date": "20151007"}]};
            } else {
                jsr = {"dataType": "day", "endDate": "20160215", "energyData": [{"value": "12.345", "date": "20160310"}, {"value": "21.657", "date": "20160309"}, {"value": "7.0904", "date": "20160308"}, {"value": "22", "date": "20151007"}]};
            }
            this.parseEnergyUsageData($scope, jsr);

        }
    };

    this.showWeeklyData = function ($scope) {
        lastTabClicked = $scope.enrgyMonitorTab;
        $scope.enrgyMonitorTab = "week";
        isDaySelected = false;
        isMonthSelected = false;
        isWeekSelected = true;
        isYearSelected = false;
        if (energyResetDone || (energyDebug && energyKeys[dualDeviceId].length === 0)) {
            var someDate = new Date();
            someDate.setDate(someDate.getDate() - someDate.getDay());
            //var val = someDate.getDate()+6;
            var weekDate = new Date(someDate);
            weekDate.setDate(weekDate.getDate() + 6);
            var jsr = '{"dataType": "week", "endDate":' + someDate.yyyymmdd() + ',"energyData": [{"value": "0.0", "date": "' + weekDate.yyyymmdd() + '-' + someDate.yyyymmdd() + '"}]}';
            jsr = JSON.parse(jsr);
            this.parseEnergyUsageData($scope, jsr);
        } else if (!energyDebug && $scope.isStatic) {
            var jsr;
            if (deviceType === "FAC") {
                jsr = {"dataType": "week", "endDate": "20160215", "energyData": [{"value": "2200.345", "date": "20160310-20160304"}, {"value": "400.345", "date": "20160303-20160227"}, {"value": "1000", "date": "20160226-20160220"}, {"value": "1100", "date": "20160219-20160213"}]};
            } else {
                jsr = {"dataType": "week", "endDate": "20160215", "energyData": [{"value": "22.345", "date": "20160310-20160304"}, {"value": "4.345", "date": "20160303-20160227"}, {"value": "10", "date": "20160226-20160220"}, {"value": "11", "date": "20160219-20160213"}]};
            }
            //console.log("jsr", jsr);
            this.parseEnergyUsageData($scope, jsr);
        } else {
            makeWeeklyDatas(dualDeviceId, $scope.optionCodeValue, $scope.isStatic, $scope);

        }
        isWeekAlreadyClicked = true;
    };

    this.showMonthlyData = function ($scope) {
        lastTabClicked = $scope.enrgyMonitorTab;
        $scope.enrgyMonitorTab = "month";
        isDaySelected = false;
        isMonthSelected = true;
        isWeekSelected = false;
        isYearSelected = false;
        if (energyResetDone || (energyDebug && energyKeys[dualDeviceId].length === 0)) {
            var monthsDate = new Date();
            var mVal = monthsDate.getMonth() + 1;
            var monthValue = mVal > 9 ? mVal : "0" + mVal;
            var jsr = '{"dataType": "month", "endDate":' + monthsDate.yyyymmdd() + ',"energyData": [{"value": "0.0", "date": "' + monthsDate.getFullYear() + '' + monthValue + '01-' + monthsDate.getFullYear() + '' + monthValue + '15"}]}';
            jsr = JSON.parse(jsr);
            this.parseEnergyUsageData($scope, jsr);
        } else if (!energyDebug && $scope.isStatic) {
            var jsr;
            if (deviceType === "FAC") {
                jsr = {"dataType": "month", "endDate": "20150915", "energyData": [{"value": "2300", "date": "20151001-20151015"}, {"value": "1100", "date": "20150901-20150930"}, {"value": "1600", "date": "20150501-20150531"}]};
            } else {
                jsr = {"dataType": "month", "endDate": "20150915", "energyData": [{"value": "23", "date": "20151001-20151015"}, {"value": "11", "date": "20150901-20150930"}, {"value": "16", "date": "20150501-20150531"}]};
            }
            this.parseEnergyUsageData($scope, jsr);
        } else {
            makeMonthlyDatas(dualDeviceId, $scope.optionCodeValue, $scope.isStatic, $scope);
        }
        isMonthAlreadyClicked = true;
    };



    this.showYearlyData = function ($scope) {
        lastTabClicked = $scope.enrgyMonitorTab;
        $scope.enrgyMonitorTab = "year";
        isDaySelected = false;
        isMonthSelected = false;
        isWeekSelected = false;
        isYearSelected = true;
        var todayDate = new Date();

        if (energyResetDone) {
            var monthsDate = new Date();
            var mVal = monthsDate.getMonth() + 1;
            var monthValue = mVal > 9 ? mVal : "0" + mVal;
            var jsr = '{"dataType": "year", "endDate":' + monthsDate.yyyymmdd() + ',"energyData": [{"value": "0.0", "date": "' + monthsDate.getFullYear() + '' + monthValue + '01-' + monthsDate.getFullYear() + '' + monthValue + '15"}]}';
            jsr = JSON.parse(jsr);
            this.parseEnergyUsageData($scope, jsr);
        } else if (!$scope.isStatic || energyDebug) {
            makeYearlyDatas($scope.Device.uuid, $scope.optionCodeValue, $scope.isStatic, $scope);
        } else {
            var jsr;
            if (deviceType === "FAC") {
                jsr = {"dataType": "year", "endDate": "20150915", "energyData": [{"value": "2300", "date": "20151001-20151015"}, {"value": "1100", "date": "20150901-20150930"}, {"value": "1600", "date": "20150501-20150531"}]};
            } else {
                jsr = {"dataType": "year", "endDate": "20150915", "energyData": [{"value": "23", "date": "20151001-20151015"}, {"value": "11", "date": "20150901-20150930"}, {"value": "16", "date": "20150501-20150531"}]};
            }
            this.parseEnergyUsageData($scope, jsr);
        }
    };

    this.showPreviousDaysData = function ($scope) {
        if (isDaySelected) {
            getPreviousFourDaysData(dualDeviceId, $scope.optionCodeValue, $scope.isStatic, $scope);
        } else if (isWeekSelected) {
            getPreviousFourWeeksData(dualDeviceId, $scope.optionCodeValue, $scope.isStatic, $scope);
        } else {
            getPreviousFourMonthsData(dualDeviceId, $scope.optionCodeValue, $scope.isStatic, $scope);
        }
    };

    this.showNextDaysData = function ($scope) {
        if (isDaySelected) {
            getNextFourDaysData(dualDeviceId, $scope.optionCodeValue, $scope);
        } else if (isWeekSelected) {
            getNextFourWeeksData(dualDeviceId, $scope.optionCodeValue, $scope);
        } else {
            getNextFourMonthsData(dualDeviceId, $scope.optionCodeValue, $scope);
        }
    };

    getDateFromStringFormat = function (strFromat) {
        var yearStr;
        var monthStr;
        var dayStr;
        yearStr = strFromat.substring(0, 4);
        monthStr = strFromat.substring(4, 6);
        dayStr = strFromat.substring(6, 8);
        var foryear = parseInt(yearStr, 10);
        var formonth = parseInt(monthStr, 10);
        var forday = parseInt(dayStr, 10);
        var modifiedDate = new Date('2016/01/01');
        modifiedDate.setFullYear(foryear);
        modifiedDate.setMonth(formonth - 1);
        modifiedDate.setDate(forday);
        return modifiedDate;
    }

    navigationButtonHandler = function (dataType, endDate, isStatic) {
 
        var d = new Date();
        d.setDate(d.getDate() - 396); //13 months data
        if (dataType === "day") {
            if (lastDayValueOnX[lastDayValueOnX.length - 1] > firstDate) {
                isAvailDay = true;
                document.getElementById("leftImg").className = "em_left_arrow";
            } else {
                isAvailDay = false;
                document.getElementById("leftImg").className = "em_left_arrow_disabled";
            }
            var modifiedDate = getDateFromStringFormat(lastDayValueOnX[lastDayValueOnX.length - 1]);

            if ((modifiedDate.getTime() <= d.getTime()))
            {
                isAvailDay = false;
                document.getElementById("leftImg").className = "em_left_arrow_disabled";
            }
        } else if (dataType === "week") {
            var weekDateStartVal = lastWeekValueOnX[lastWeekValueOnX.length - 1].split("-");
            if (weekDateStartVal[1] > Number(firstDate))
            {
                isAvailWeek = true;
                document.getElementById("leftImg").className = "em_left_arrow";
            } else {
                isAvailWeek = false;
                document.getElementById("leftImg").className = "em_left_arrow_disabled";
            }
            var modifiedDate = getDateFromStringFormat(weekDateStartVal[1]);
            if ((modifiedDate.getTime() <= d.getTime()))
            {
                isAvailWeek = false;
                document.getElementById("leftImg").className = "em_left_arrow_disabled";
            }
            if (lastWeekValueOnX.length < 4)
            {
                isAvailWeek = false;
                document.getElementById("leftImg").className = "em_left_arrow_disabled";
            }
        } else if (dataType === "month") {
            var monthDateStartVal = lastMonthValueOnX[lastMonthValueOnX.length - 1].split("-");
//           console.log("firstdate,lastdate",firstDate,lastDate);
            if (monthDateStartVal[0] > Number(firstDate))
            {
                if (energyResetDone) {
                    isAvailMonth = false;
                    document.getElementById("leftImg").className = "em_left_arrow_disabled";
                } else {
                    isAvailMonth = true;
                    document.getElementById("leftImg").className = "em_left_arrow";
                }
            } else {
                isAvailMonth = false;
                document.getElementById("leftImg").className = "em_left_arrow_disabled";
            }
            var modifiedDate = getDateFromStringFormat(monthDateStartVal[0]);

            if ((modifiedDate.getYear() === d.getYear()) && (modifiedDate.getMonth() <= d.getMonth()))
            {
                isAvailMonth = false;
                document.getElementById("leftImg").className = "em_left_arrow_disabled";
            }
        } else
        {
            ;// do nothing
        }
    };

    this.parseEnergyUsageData = function ($scope, energyResponse) {
        var enrgyArray = [];
        lastMonthValueOnX = [];
        lastWeekValueOnX = [];
        lastDayValueOnX = [];
        energDebug = true;
        var daysVal = [];
        var energyData = [];
        var dayDisplayBottom = [];
        var dayDisplayTop = [];
        var dataType;
        var averagePowerUsage;
        if (LANG.toUpperCase() === "KO-KR") {
            $scope.isKoreanGraph = true;
        } else {
            $scope.isKoreanGraph = false;
        }
        console.log("energyResponse", energyResponse);
        if (energyDebug && angular.isDefined(energyResponse["resourceURL"]) === true) {
            var id = 0;
            var key = 'powerUsage';
            var start_index = 0;//In case of OCF devices the first date is ignored because it is a dummy data
            
            if(angular.isDefined($scope.isOCFDevice) && $scope.isOCFDevice){
                start_index = 1;
            }
                
            if (((angular.isDefined(energyResponse["resourceURL"].split('/')[4]) === true && energyResponse["resourceURL"].split('/')[4].slice(0, 1) === '1') || (angular.isDefined(energyResponse["resourceURL"].split('/')[3]) === true && energyResponse["resourceURL"].split('/')[3].slice(0, 1) === '1') || (angular.isDefined(energyResponse["resourceURL"].split('/')[5]) === true && energyResponse["resourceURL"].split('/')[5].slice(0, 1) === '1'))) {
                id = 1;
            }
            EnergyDictionary[id] = {};
            energyKeys[id] = [];
            if (energyResponse['data'].length === 0) {
                $scope.no_page = true;
            } else {
                // This is included for taking in to account that in RVC runningTimes is used instead of the powerUsage
                if (angular.isDefined($scope.optionCodeValue) === true && parseInt($scope.optionCodeValue.split('_')[1], 16) & 0x40000 !== 0) {
                    key = 'runningTime';
                }
                
                // This logic added because if the device can send even 15 months of data but in that case we have to consider just the 396 days from current date 
                var startDate_from_start_of_DB = energyResponse['data'][start_index]['dateTime'].toString().slice(0, 8);
                var endDate =  new Date();
                var startDate_for_396_days = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()-396);
                var startDate = startDate_from_start_of_DB.toString() > startDate_for_396_days.yyyymmdd().toString() ? startDate_from_start_of_DB.toString() : startDate_for_396_days.yyyymmdd().toString();
                endDate = endDate.yyyymmdd().toString();
      
                firstDate = parseInt(startDate);
                lastDate = parseInt(endDate);
                initializeDictionary(startDate, endDate, id);
                if (start_index === 0) {
                    for (var i = start_index; i < energyResponse['data'].length; i++) {
                        if (angular.isDefined(EnergyDictionary[id][energyResponse['data'][i]['dateTime'].toString().slice(0, 8)]) && angular.isDefined(energyResponse['data'][i][key])) {
                            EnergyDictionary[id][energyResponse['data'][i]['dateTime'].toString().slice(0, 8)].power_usage = parseInt(energyResponse['data'][i][key]) / 10;
                        }
                    }
                }
                else if (start_index === 1) {
                    if (angular.isDefined(energyResponse['data'][0][key])) {
                        var initial_value = parseInt(energyResponse['data'][0][key]);
                    }
                    for (var i = start_index; i < energyResponse['data'].length; i++) {
                        if (angular.isDefined(EnergyDictionary[id][energyResponse['data'][i]['dateTime'].toString().slice(0, 8)]) && angular.isDefined(energyResponse['data'][i][key])) {
                            EnergyDictionary[id][energyResponse['data'][i]['dateTime'].toString().slice(0, 8)].power_usage = parseInt(energyResponse['data'][i][key] - initial_value) / 10;
                        }
                    }
                }else{
                    
                }
                
                fillEnergyDictionaryWithValues(startDate, endDate, id);
                energyKeys[id] = Object.keys(EnergyDictionary[id]).sort();
                averagePowerUsageDevice[id] = calculateAveragePower(id);

                //This will come only for dual washer and dual dryer and bothe of them uses power usage , hence 'powerUsage1' is used for the key  
                if (angular.isDefined(energyResponse['data'][0]['powerUsage1']) === true) {
                    id = 1; //This is the data of upper Washer
                    initializeDictionary(startDate, endDate, id);
                    if (start_index === 0) {
                        for (var i = start_index; i < energyResponse['data'].length; i++) {
                            if (angular.isDefined(EnergyDictionary[id][energyResponse['data'][i]['dateTime'].toString().slice(0, 8)]) && angular.isDefined(energyResponse['data'][i]['powerUsage1']) ) {
                                EnergyDictionary[id][energyResponse['data'][i]['dateTime'].toString().slice(0, 8)].power_usage = parseInt(energyResponse['data'][i]['powerUsage1']);
                            }
                        }
                    } else if (start_index === 1) {
                        if (angular.isDefined(energyResponse['data'][i]['powerUsage1'])) {
                            var initial_value = parseInt(energyResponse['data'][0]['powerUsage1']);
                        }
                        for (var i = start_index; i < energyResponse['data'].length; i++) {
                            if (angular.isDefined(EnergyDictionary[id][energyResponse['data'][i]['dateTime'].toString().slice(0, 8)]) && angular.isDefined(energyResponse['data'][i][key])) {
                                EnergyDictionary[id][energyResponse['data'][i]['dateTime'].toString().slice(0, 8)].power_usage = parseInt(energyResponse['data'][i][key] - initial_value) / 10;
                            }
                        }
                    }
                    
                    fillEnergyDictionaryWithValues(startDate, endDate, id);
                    energyKeys[1] = Object.keys(EnergyDictionary[1]).sort();
                    averagePowerUsageDevice[1] = calculateAveragePower(1);
                }
            }
            if (currPage === 'energyMonitor') {
                this.showDailyData($scope);
            }
        } else {
            enrgyArray = energyResponse.energyData;
            console.log(enrgyArray);
            endDateNative = energyResponse.endDate;
            firstDate = parseInt(energyResponse.endDate);
            if (enrgyArray.length > 0) {
                dataType = energyResponse.dataType;
                var monthNames = [
                    $scope.translation.WEBMOB_common_energy_monitor_january,
                    $scope.translation.WEBMOB_common_energy_monitor_february,
                    $scope.translation.WEBMOB_common_energy_monitor_march,
                    $scope.translation.WEBMOB_common_energy_monitor_april,
                    $scope.translation.WEBMOB_common_energy_monitor_may,
                    $scope.translation.WEBMOB_common_energy_monitor_june,
                    $scope.translation.WEBMOB_common_energy_monitor_july,
                    $scope.translation.WEBMOB_common_energy_monitor_august,
                    $scope.translation.WEBMOB_common_energy_monitor_september,
                    $scope.translation.WEBMOB_common_energy_monitor_october,
                    $scope.translation.WEBMOB_common_energy_monitor_november,
                    $scope.translation.WEBMOB_common_energy_monitor_december
                ];

                if (dataType === "day") {
                    $scope.enrgyMonitorTab = "day";
                    isDaySelected = true;
                    isWeekSelected = false;
                    isMonthSelected = false;
                    isYearSelected = false;
                    if (enrgyArray.length < 1) {
                        return;
                    }
                    for (var i = 0; i < enrgyArray.length; i++) {
                        daysVal[i] = energyResponse.energyData[i].date;
                        dayDisplayTop[i] = getFormattedDateAtTopForDay($scope, daysVal[i], monthNames);
                        lastDayValueOnX[i] = energyResponse.energyData[i].date;
                        dayDisplayBottom[i] = getDayFormat(daysVal[i]);
                        energyData[i] = energyResponse.energyData[i].value;
                    }
                    lastValueDayStored = lastDayValueOnX[0];

                } else if (dataType === "week") {
                    if (enrgyArray.length < 1) {
                        return;
                    }
                    isDaySelected = false;
                    isWeekSelected = true;
                    isMonthSelected = false;
                    isYearSelected = false;
                    console.log("energyResponse", energyResponse.energyData[0].date);
                    for (var i = 0; i < enrgyArray.length; i++) {
                        daysVal[i] = energyResponse.energyData[i].date;
                        dayDisplayTop[i] = getFormattedDateAtTop(daysVal[i], monthNames);
                        lastWeekValueOnX[i] = energyResponse.energyData[i].date;
                        dayDisplayBottom[i] = getWeekFormat(daysVal[i], monthNames);
                        energyData[i] = energyResponse.energyData[i].value;
                    }
                    lastValueWeekStored = lastWeekValueOnX[0];
                    averagePowerUsage = energyResponse.averagePowerUsage;

                } else if (dataType === "month") {
                    if (enrgyArray.length < 1) {
                        return;
                    }
                    isDaySelected = false;
                    isWeekSelected = false;
                    isMonthSelected = true;
                    isYearSelected = false;
                    for (var i = 0; i < enrgyArray.length; i++) {
                        daysVal[i] = energyResponse.energyData[i].date;
                        dayDisplayTop[i] = getFormattedDateAtTopForMonth($scope, daysVal[i], monthNames);
                        lastMonthValueOnX[i] = energyResponse.energyData[i].date;

                        if (deviceType === "FAC" && $scope.currentMeterDate <= new Date().getDate()) {
                            dayDisplayBottom[i] = monthNames[parseInt((daysVal[i].substring(13, 15) - 1), 10)];
                        } else {
                            dayDisplayBottom[i] = monthNames[parseInt((daysVal[i].substring(4, 6) - 1), 10)];
                        }
                        energyData[i] = energyResponse.energyData[i].value;
                    }
                    averagePowerUsage = energyResponse.averagePowerUsage;
                    lastValueMonthStored = lastMonthValueOnX[0];

                    //energy management data save
                    if (!energyManagerDataState) {
                        if (energyData[0] !== undefined) {
                            currMonthEnergyData = energyData[0] === '0' ? '0.0' : energyData[0];
                        }
                        if (energyData[1] !== undefined) {
                            prevMonthEnergyData = energyData[1] === '0' ? '0.0' : energyData[1];
                        }
                        energyManagerDataState = true;
                    }

                } else if (dataType === "year") {
                    if (enrgyArray.length < 1) {
                        return;
                    }
                    isDaySelected = false;
                    isWeekSelected = false;
                    isMonthSelected = false;
                    isYearSelected = true;
                    for (var i = 0; i < enrgyArray.length; i++) {
                        daysVal[i] = energyResponse.energyData[i].date;
                        energyData[i] = energyResponse.energyData[i].value;
                        dayDisplayBottom[i] = daysVal[i];
                    }
                    var startDate = new Date(energyResponse.endDate.slice(0, 4), energyResponse.endDate.slice(4, 6) - 1, energyResponse.endDate.slice(6, 8));
                    dayDisplayTop[0] = getFormattedDateAtTopForYear($scope, startDate, monthNames);
                    averagePowerUsage = energyResponse.averagePowerUsage;

                } else {
                    ;// do nothing corrupt value
                }
                if (currPage === 'energyMonitor') {
                    navigationButtonHandler(energyResponse.dataType, energyResponse.endDate, $scope.isStatic);
                    if (!$scope.isStatic) {
                        var isTrue = isNextDataAvilable(energyResponse.dataType);
                        if (isTrue) {
                            document.getElementById("rightImg").className = "em_right_arrow";
                        } else {
                            document.getElementById("rightImg").className = "em_right_arrow_disabled";
                        }
                    } else {
                        document.getElementById("rightImg").className = "em_right_arrow_disabled";
                    }
                    $scope.tempEnergyData = energyData.slice(0); // Copy energy data
                    if (energyDebug) {
                        averagePowerUsage = averagePowerUsageDevice[dualDeviceId];
                    }

                    sendValueToUI(energyData, dayDisplayBottom, dayDisplayTop, energyData.length, averagePowerUsage, startDate);
                }
            } else {
                $scope.handleEnergyMonitorErrors();
            }
            $scope.loadingBar = false;

        }


    };

    this.isEnergyDataAvailable = function (isNext) {
        var dataType;
        if (isDaySelected) {
            dataType = 'day';
        } else if (isWeekSelected) {
            dataType = 'week';
        } else if (isMonthSelected) {
            dataType = 'month';
        } else {
            ;//Nothing
        }
        isDataAvilable(dataType, isNext);
    };

    this.dismissLoadingBar = function ($scope, value) {
        if ($scope.checkResponse.indexOf(value) !== -1) {
            $scope.checkResponse.splice($scope.checkResponse.indexOf(value), 1);
            if ($scope.checkResponse.length === 0) {
                $scope.loadingBar = false;
            }
        }
    };
});


function showNextMonthlyData($scope) {

    lastValueMonthStored = lastMonthData[lastMonthData.length - 2].lastValueMonthStored;
    lastMonthValueOnX = lastMonthData[lastMonthData.length - 2].lastMonthValueOnX;
    console.log("lastMonthValueOnX", lastMonthValueOnX);
    console.log("lastValueMonthStored", lastValueMonthStored);







    if (currPage === 'energyMonitor') {
        navigationButtonHandler("month", lastDate, $scope.isStatic);
        var isTrue = isNextDataAvilable("month");
        if (isTrue) {
            document.getElementById("rightImg").className = "em_right_arrow";
        } else {
            document.getElementById("rightImg").className = "em_right_arrow_disabled";
        }

        $scope.tempEnergyData = lastMonthData[lastMonthData.length - 2].energyData.slice(0); // Copy energy data
        sendValueToUI(angular.copy(lastMonthData[lastMonthData.length - 2].energyData), lastMonthData[lastMonthData.length - 2].dayDisplayBottom, lastMonthData[lastMonthData.length - 2].dayDisplayTop, lastMonthData[lastMonthData.length - 2].energyDatalength, lastMonthData[lastMonthData.length - 2].averagePowerUsage, lastMonthData[lastMonthData.length - 2].firstDate);
    }

    $scope.loadingBar = false;
    lastMonthData.pop();
}

function showNextWeeklyData($scope) {

    lastValueWeekStored = lastWeekData[lastWeekData.length - 2].lastValueWeekStored;
    lastWeekValueOnX = lastWeekData[lastWeekData.length - 2].lastWeekValueOnX;
    console.log("lastWeekValueOnX", lastWeekValueOnX);
    console.log("lastValueWeekStored", lastValueWeekStored);
    
    if (currPage === 'energyMonitor') {
        navigationButtonHandler("week", lastDate, $scope.isStatic);
        var isTrue = isNextDataAvilable("week");
        if (isTrue) {
            document.getElementById("rightImg").className = "em_right_arrow";
        } else {
            document.getElementById("rightImg").className = "em_right_arrow_disabled";
        }

        $scope.tempEnergyData = lastWeekData[lastWeekData.length - 2].energyData.slice(0); // Copy energy data
        sendValueToUI(angular.copy(lastWeekData[lastWeekData.length - 2].energyData), lastWeekData[lastWeekData.length - 2].dayDisplayBottom, lastWeekData[lastWeekData.length - 2].dayDisplayTop, lastWeekData[lastWeekData.length - 2].energyDatalength, lastWeekData[lastWeekData.length - 2].averagePowerUsage, lastWeekData[lastWeekData.length - 2].firstDate);
    }

    $scope.loadingBar = false;
    lastWeekData.pop();
}



function calculateAveragePower(dualDeviceId) {
    var endDate = energyKeys[dualDeviceId][energyKeys[dualDeviceId].length - 1];
    var startDate = energyKeys[dualDeviceId][0];
    var endDate_last = lastDayOfPreviousMonth(endDate, dualDeviceId);
    var powerUsage;
    var diff;
    if (angular.isDefined(endDate_last) === false) {
        return "Nan";
    } else {
        startDate = new Date(parseInt(startDate.slice(0, 4)), parseInt(startDate.slice(4, 6)) - 1, parseInt(startDate.slice(6, 8)));
        endDate = new Date(parseInt(endDate.slice(0, 4)), parseInt(endDate.slice(4, 6)) - 1, parseInt(endDate.slice(6, 8)));
        powerUsage = EnergyDictionary[dualDeviceId][endDate_last].power_usage;
        var diff = monthDiff(startDate, endDate);
        if (diff === 0) {
            return "Nan";
        }
        return powerUsage / diff;
    }
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months += d2.getMonth() - d1.getMonth();
    return months;
}


function getIndexFromKeyEnergy(key, deviceId) {
    return energyKeys[deviceId].indexOf(key);
}

function getKeyFromIndexEnergy(index, deviceId) {
    return energyKeys[deviceId][index];
}

function getFormattedDateAtTop(daysVal, monthNames) {
    var twoDates = daysVal.toString().split("-");
    var lastDay = twoDates[0];
    var firstDay = twoDates[1];

    var month = firstDay.substring(4, 6);
    var day = firstDay.substring(6, 8);
    var lmonth = lastDay.substring(4, 6);
    var lday = lastDay.substring(6, 8);
    var monthName = monthNames[parseInt(month, 10) - 1];
    var lmonthName = monthNames[parseInt(lastDay.substring(4, 6), 10) - 1];

    if (monthName === lmonthName) {
        if (LANG.toUpperCase() === "KO-KR") {
            return monthName + " " + day + "일 - " + lday + "일";
        } else {
            return day + "-" + lday + " " + monthName;
        }
    } else {
        if (LANG.toUpperCase() === "KO-KR") {
            return monthName + " " + day + "일 - " + lmonthName + " " + lday + "일";
        } else {
            return day + " " + monthName + "-" + lday + " " + lmonthName;
        }
    }

    if (monthName === lmonthName) {
        return day + "-" + lday + " " + lmonthName;
    } else {
        return day + " " + monthName + "-" + lday + " " + lmonthName;
    }
}

function getFormattedDateAtTopForDay($scope, daysVal, monthNames) {
    var year = daysVal.substring(0, 4);
    var month = daysVal.substring(4, 6);
    var day = daysVal.substring(6, 8);

    var monthName = monthNames[parseInt(month, 10) - 1];

    if (LANG.toUpperCase() === "KO-KR") {
        return year + $scope.translation.WEBMOB_common_energy_monitor_year + monthName + day + $scope.translation.WEBMOB_common_energy_monitor_day;
    } else {
        return day + " " + monthName + " " + year;
    }
}

function getFormattedDateAtTopForMonth($scope, daysVal, monthNames) {
    var year, month, day;
    if (angular.isDefined(meterDate)) {
        year = daysVal.substring(9, 13);
        month = daysVal.substring(13, 15);
        day = daysVal.substring(15, 17);
    } else {
        year = daysVal.substring(0, 4);
        month = daysVal.substring(4, 6);
        day = daysVal.substring(6, 8);
    }

    var monthName = monthNames[parseInt(month, 10) - 1];

    if (LANG.toUpperCase() === "KO-KR") {
        return year + $scope.translation.WEBMOB_common_energy_monitor_year + monthName;
    } else {
        return monthName + " " + year;
    }

    //date_display_selected_month

    /*if(!$scope.isStatic){      
     var day_start = daysVal.substring(15,17);
     var day_end = daysVal.substring(6,8);
     
     if(LANG.toUpperCase() === "KO-KR") 
     {
     return year+$scope.translation.WEBMOB_common_energy_monitor_year+monthName+"<br>"+day_start+"-"+day_end;
     } 
     else 
     {
     return monthName+" "+year+"<br>"+day_start+"-"+day_end;
     }
     }
     else
     {
     if(LANG.toUpperCase() === "KO-KR") 
     {
     return year+$scope.translation.WEBMOB_common_energy_monitor_year+monthName+"<br>"+day_end+"-"+day_start;
     } 
     else 
     {
     return monthName+" "+year+"<br>"+day_end+"-"+day_start;
     }
     }*/
}

function getFormattedDateAtTopForYear($scope, startDate, monthNames) {
    var endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 396);
    var yearStart = startDate.yyyymmdd().slice(0, 4);
    var monthStart = startDate.yyyymmdd().slice(4, 6);
    var yearEnd = endDate.yyyymmdd().slice(0, 4);
    var monthEnd = endDate.yyyymmdd().slice(4, 6);

    var monthNameStart = monthNames[parseInt(monthStart, 10) - 1];
    var monthNameEnd = monthNames[parseInt(monthEnd, 10) - 1];

//    if (LANG.toUpperCase() === "KO-KR") {
//        return year+$scope.translation.WEBMOB_common_energy_monitor_year+monthName;
//    } 
    return (monthNameStart + ' ' + yearStart + ' - ' + monthNameEnd + ' ' + yearEnd);
}

function getDayFormat(daysVal) {
    return daysVal.substring(6, 8);
}

function getWeekFormat(daysVal, monthNames) {
    var twoDates = daysVal.toString().split("-");
    var lastDay = twoDates[0];
    var firstDay = twoDates[1];
    var day = firstDay.substring(6, 8);
    var lday = lastDay.substring(6, 8);
    var month = firstDay.substring(4, 6);
    var lmonth = lastDay.substring(4, 6);
    var monthName = monthNames[parseInt(month, 10) - 1];
    var lmonthName = monthNames[parseInt(lmonth, 10) - 1];

    if (monthName === lmonthName) {
        if (LANG.toUpperCase() === "KO-KR") {
            return day + "일 - " + lday + "일<br>" + month + "월";
        } else {
            return day + "-" + lday + "<br>" + lmonthName;
        }
    } else {
        if (LANG.toUpperCase() === "KO-KR") {
            return month + "월 " + day + "일 <br>- " + lmonth + "월 " + lday + "일";
        } else {
            return day + " " + monthName + "<br>-" + lday + " " + lmonthName;
        }
    }
}

/**    	 
 * @function
 * @private
 * @name getThreshold        
 * @description : Threshold value for
 *               daily : 35kWh
 *               week : 150kWh
 *               month : 500kWh
 *               default: 100kWh  
 */
function getThreshold() {

    var dayVal, weekVal, monthVal, yearVal;
    if (deviceType === "Dishwasher") {
        dayVal = 2;
        weekVal = 10;
        monthVal = 40;
        yearVal = 40;
    } else if (deviceType === "Dryer" || deviceType === "Washer") {
//        dayVal = 20;
//        weekVal = 100;
//        monthVal = 400;

        var tempValue = parseInt(Math.max.apply(null, myScope.tempEnergyData), 10);
        if (tempValue.toString().length === 1) {
            tempValue = 10;
        } else if (tempValue.toString().length === 2) {
            tempValue = parseInt((tempValue / 10) + 1, 10) * 10;
        } else if (tempValue.toString().length >= 3) {
            var num = "1";
            for (var i = 0; i < tempValue.toString().length - 2; i++) {
                num += "0";
            }
            num = parseInt(num, 10);
            tempValue = parseInt((tempValue / num) + 1, 10) * num;
        }

        if (myScope.enrgyMonitorTab === "day") {
            dayVal = tempValue;
        } else if (myScope.enrgyMonitorTab === "week") {
            weekVal = tempValue;
        } else if (myScope.enrgyMonitorTab === "month") {
            monthVal = tempValue;
        } else if (myScope.enrgyMonitorTab === "year") {
            yearVal = tempValue;
        }
    } else if (deviceType === "FAC") {

        /* For flexible Y-Axis values depends upon data in FAC
         1) 1 digit -> Y axis's max is "10"
         ex) 9 -> 10
         2) 2 digits -> first digit + 1 & remove second digit
         ex) 16 -> 20
         ex) 94 -> 100
         3) more than 2 digits -> (Max digit -1) digit's value + 1 && remove below digits.
         ex) 333.5 -> 340
         ex) 1243 -> 1300
         ex) 35872 -> 34000 */

        var tempValue = parseInt((Math.max.apply(null, myScope.tempEnergyData) * 10) / 1000, 10);
        if (tempValue.toString().length === 1) {
            tempValue = 10;
        } else if (tempValue.toString().length === 2) {
            tempValue = parseInt((tempValue / 10) + 1, 10) * 10;
        } else if (tempValue.toString().length >= 3) {
            var num = "1";
            for (var i = 0; i < tempValue.toString().length - 2; i++) {
                num += "0";
            }
            num = parseInt(num, 10);
            tempValue = parseInt((tempValue / num) + 1, 10) * num;
        }

        if (myScope.enrgyMonitorTab === "day") {
            dayVal = tempValue;
        } else if (myScope.enrgyMonitorTab === "week") {
            weekVal = tempValue;
        } else if (myScope.enrgyMonitorTab === "month") {
            monthVal = tempValue;
        } else if (myScope.enrgyMonitorTab === "year") {
            yearVal = tempValue;
        }
    } else {
        dayVal = 35;
        weekVal = 150;
        monthVal = 500;
        yearVal = 500;
    }
    return isDaySelected ? dayVal : (isWeekSelected ? weekVal : (isMonthSelected ? monthVal : (isYearSelected ? yearVal : 100)));
}

function getNumberOfMonth(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth() + 1;
    return months <= 0 ? 0 : months;
}

function sendValueToUI(powerUsageValue, dateFormated, dateAtTop, energyDataLength, averagePowerUsage, startDateYear) {
    var HEIGHTMULTIPLICATIONFACTOR = 0.095 * (100 / getThreshold());
    var fontSizeValue;

    var canvas = document.getElementById("myCanvas");
    var bOne = document.getElementById("x1");
    var bTwo = document.getElementById("x2");
    var bThree = document.getElementById("x3");
    var bFour = document.getElementById("x4");

    var dateID = document.getElementById("dateID");
    var monthDays = document.getElementById("monthDays");

    var hLablOne = document.getElementById("h1");
    var hLablTwo = document.getElementById("h2");
    var hLablThree = document.getElementById("h3");
    var hLablFour = document.getElementById("h4");
    var hLablOneYear = document.getElementById("yearH1");
    var hLablTwoYear = document.getElementById("yearH2");

    var bubbleOne = document.getElementById("bubbleOne");
    var bubbleTwo = document.getElementById("bubbleTwo");
    var bubbleThree = document.getElementById("bubbleThree");
    var bubbleFour = document.getElementById("bubbleFour");

    var valOne = document.getElementById("valOne");
    var valTwo = document.getElementById("valTwo");
    var valThree = document.getElementById("valThree");
    var valFour = document.getElementById("valFour");

    var kwhIdOne = document.getElementById("kwhIdOne");
    var kwhIdTwo = document.getElementById("kwhIdTwo");

    var strH = "h",
            strkWh = "kWh";

    hLablOne.innerHTML = "";
    hLablTwo.innerHTML = "";
    hLablThree.innerHTML = "";
    hLablFour.innerHTML = "";
    hLablOneYear.innerHTML = "";
    hLablTwoYear.innerHTML = "";
    valOne.innerHTML = "";
    valTwo.innerHTML = "";
    valThree.innerHTML = "";
    valFour.innerHTML = "";   

    bubbleOne.style.display = "none";
    bubbleTwo.style.display = "none";
    bubbleThree.style.display = "none";
    bubbleFour.style.display = "none";

    bOne.style.display = "block";
    bTwo.style.display = "block";
    bThree.style.display = "block";
    bFour.style.display = "block";

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    switch (energyDataLength) {
        case 0:
            bOne.style.display = "none";
            bTwo.style.display = "none";
            bThree.style.display = "none";
            bFour.style.display = "none";
            break;
        case 1:
            bOne.style.display = "none";
            bTwo.style.display = "none";
            bThree.style.display = "none";
            break;
        case 2:
            bOne.style.display = "none";
            bTwo.style.display = "none";
            break;
        case 3:
            bOne.style.display = "none";
            break;
        default:
            break;
    }

    var heightOne;
    var heightTwo;
    var heightThree;
    var heightFour;

    bOne.style.height = 0;
    bubbleOne.style.bottom = 1 + "rem";
    bTwo.style.height = 0;
    bubbleTwo.style.bottom = 1 + "rem";
    bThree.style.height = 0;
    bubbleThree.style.bottom = 1 + "rem";
    bFour.style.height = 0;
    bubbleFour.style.bottom = 1 + "rem";
    for (var i = 0; i < energyDataLength; i++) {
        if (deviceType === "FAC")
        {
            powerUsageValue[i] = (powerUsageValue[i] * 10) / 1000;
            v1.style.fontSize = "0.75rem";
            v2.style.fontSize = "0.75rem";
            v3.style.fontSize = "0.75rem";
            v4.style.fontSize = "0.75rem";
            v5.style.fontSize = "0.75rem";
            v6.style.fontSize = "0.75rem";
        } else {
            v1.style.fontSize = "0.75rem";
            v2.style.fontSize = "0.75rem";
            v3.style.fontSize = "0.75rem";
            v4.style.fontSize = "0.75rem";
            v5.style.fontSize = "0.75rem";
            v6.style.fontSize = "0.75rem";
        }
    }

    if (isDaySelected || isWeekSelected || isMonthSelected) {
        for (var i = 0; i < energyDataLength; i++) {
            if (Number(powerUsageValue[i]).toFixed(1).toString().length >= 5)
            {
                fontSizeValue = 1;
                if (Number(powerUsageValue[i]).toFixed(1).toString().length > 6)
                    fontSizeValue = 2;
                break;
            } else {
                fontSizeValue = 0;
            }
        }
        for (var i = 0; i < energyDataLength; i++) {
            
            powerUsageValue[i] = Math.max(0,powerUsageValue[i])
            if (i === 0) {
                bubbleFour.style.display = "table";
                hLablFour.innerHTML = dateFormated[i];

                if (powerUsageValue[i] === 0) {
                    valFour.innerHTML = "0.0";
                } else {
                    valFour.innerHTML = addZeroBeforeDecimal(powerUsageValue[i]);
                }
                if (addZeroBeforeDecimal(powerUsageValue[i]).toString().length >= 5)
                {
                    valFour.style.width = "2.86rem";
                    bubbleFour.style.width = "2.86rem";
                } else {
                    valFour.style.width = "2.22rem";
                    bubbleFour.style.width = "2.22rem";
                }
                heightFour = powerUsageValue[i] * HEIGHTMULTIPLICATIONFACTOR;
                if (heightFour > 10.8) {
                    heightFour = 10.8;
                }
                if (parseFloat(addZeroBeforeDecimal(powerUsageValue[i])) === 0) {
                    bFour.style.display = "none";
                    bubbleFour.style.bottom = heightFour + 0.16 + "rem";
                } else {
                    bubbleFour.style.bottom = heightFour + 0.3 + "rem";
                }
                bFour.style.height = heightFour + "rem";

            } else if (i === 1) {
                bubbleThree.style.display = "table";
                hLablThree.innerHTML = dateFormated[i];
                if (powerUsageValue[i] === 0) {
                    valThree.innerHTML = "0.0";
                } else {
                    valThree.innerHTML = addZeroBeforeDecimal(powerUsageValue[i]);
                }
                if (addZeroBeforeDecimal(powerUsageValue[i]).toString().length >= 5) {
                    valThree.style.width = "2.86rem";
                    bubbleThree.style.width = "2.86rem";
                } else {
                    valThree.style.width = "2.22rem";
                    bubbleThree.style.width = "2.22rem";
                }
                heightThree = powerUsageValue[i] * HEIGHTMULTIPLICATIONFACTOR;
                if (heightThree > 10.8) {
                    heightThree = 10.8;
                }
                if (parseFloat(addZeroBeforeDecimal(powerUsageValue[i])) === 0) {
                    bThree.style.display = "none";
                    bubbleThree.style.bottom = heightThree + 0.16 + "rem";
                } else {
                    bubbleThree.style.bottom = heightThree + 0.3 + "rem";
                }
                bThree.style.height = heightThree + "rem";

            } else if (i === 2) {
                bubbleTwo.style.display = "table";
                hLablTwo.innerHTML = dateFormated[i];
                if (powerUsageValue[i] === 0) {
                    valTwo.innerHTML = "0.0";
                } else {
                    valTwo.innerHTML = addZeroBeforeDecimal(powerUsageValue[i]);
                }
                if (addZeroBeforeDecimal(powerUsageValue[i]).toString().length >= 5) {
                    valTwo.style.width = "2.86rem";
                    bubbleTwo.style.width = "2.86rem";
                } else {
                    valTwo.style.width = "2.22rem";
                    bubbleTwo.style.width = "2.22rem";
                }
                heightTwo = powerUsageValue[i] * HEIGHTMULTIPLICATIONFACTOR;
                if (heightTwo > 10.8) {
                    heightTwo = 10.8;
                }
                if (parseFloat(addZeroBeforeDecimal(powerUsageValue[i])) === 0) {
                    bTwo.style.display = "none";
                    bubbleTwo.style.bottom = heightTwo + 0.16 + "rem";
                } else {
                    bubbleTwo.style.bottom = heightTwo + 0.3 + "rem";
                }
                bTwo.style.height = heightTwo + "rem";
            } else if (i === 3) {
                bubbleOne.style.display = "table";
                hLablOne.innerHTML = dateFormated[i];
                if (powerUsageValue[i] === 0) {
                    valOne.innerHTML = "0.0";
                } else {
                    valOne.innerHTML = addZeroBeforeDecimal(powerUsageValue[i]);
                }
                if (addZeroBeforeDecimal(powerUsageValue[i]).toString().length >= 5) {
                    valOne.style.width = "2.86rem";
                    bubbleOne.style.width = "2.86rem";
                } else {
                    valOne.style.width = "2.22rem";
                    bubbleOne.style.width = "2.22rem";
                }
                heightOne = powerUsageValue[i] * HEIGHTMULTIPLICATIONFACTOR;
                if (heightOne > 10.8) {
                    heightOne = 10.8;
                }
                if (parseFloat(addZeroBeforeDecimal(powerUsageValue[i])) === 0) {
                    bOne.style.display = "none";
                    bubbleOne.style.bottom = heightOne + 0.16 + "rem";
                } else {
                    bubbleOne.style.bottom = heightOne + 0.3 + "rem";
                }
                bOne.style.height = heightOne + "rem";
            }
        }
        switch (fontSizeValue) {
            case 0:
                valOne.style.fontSize = "0.75rem";
                valTwo.style.fontSize = "0.75rem";
                valThree.style.fontSize = "0.75rem";
                valFour.style.fontSize = "0.75rem";
                break;
            case 1:
                valOne.style.fontSize = "0.625rem";
                valTwo.style.fontSize = "0.625rem";
                valThree.style.fontSize = "0.625rem";
                valFour.style.fontSize = "0.625rem";
                break;
            case 2:
                valOne.style.fontSize = "0.525rem";
                valTwo.style.fontSize = "0.525rem";
                valThree.style.fontSize = "0.525rem";
                valFour.style.fontSize = "0.525rem";
                break;
            default :
                valOne.style.fontSize = "0.75rem";
                valTwo.style.fontSize = "0.75rem";
                valThree.style.fontSize = "0.75rem";
                valFour.style.fontSize = "0.75rem";
                break;
        }
        dateID.innerHTML = dateAtTop[0];
        //date_display_selected_month
        /*if(isMonthSelected)
         {
         dateID.style.fontSize = "1.3rem";
         }
         else
         {
         dateID.style.fontSize = "1.55rem";
         }*/

        if (isRunningTime) {
            kwhIdOne.innerHTML = strH;
            kwhIdTwo.innerHTML = strH;
        } else {
            kwhIdOne.innerHTML = strkWh;
            kwhIdTwo.innerHTML = strkWh;
        }
        var bubbleOne = document.getElementById("bubbleOne");
        var bubbleTwo = document.getElementById("bubbleTwo");
        var bubbleThree = document.getElementById("bubbleThree");
        var bubbleFour = document.getElementById("bubbleFour");

        var pointer1 = document.getElementById("pointer1");
        var pointer2 = document.getElementById("pointer2");
        var pointer3 = document.getElementById("pointer3");
        var pointer4 = document.getElementById("pointer4");

        if (deviceType === "Refrigerator") {
            if (LANG.toUpperCase() === "ZH-CN") {
                document.getElementById("h1").style.fontSize = "0.6rem";
                document.getElementById("h2").style.fontSize = "0.6rem";
                document.getElementById("h3").style.fontSize = "0.6rem";
                document.getElementById("h4").style.fontSize = "0.6rem";
            } else if (LANG.toUpperCase() === "KO-KR") {
                document.getElementById("h1").style.fontSize = "0.5rem";
                document.getElementById("h2").style.fontSize = "0.5rem";
                document.getElementById("h3").style.fontSize = "0.5rem";
                document.getElementById("h4").style.fontSize = "0.5rem";
            } else {
                ;//Nothing
            }
        }

        if (deviceType !== "Refrigerator" && deviceType !== "Washer" && deviceType !== "Dryer" && deviceType !== "Dishwasher") {
            bubbleOne.style.backgroundColor = "rgb(252, 188, 86)";
            bubbleTwo.style.backgroundColor = "rgb(252, 188, 86)";
            bubbleThree.style.backgroundColor = "rgb(252, 188, 86)";
            bubbleFour.style.backgroundColor = "rgb(252, 188, 86)";
            pointer1.style.border = "rgb(252, 188, 86) transparent";
            pointer2.style.border = "rgb(252, 188, 86) transparent";
            pointer3.style.border = "rgb(252, 188, 86) transparent";
            pointer4.style.border = "rgb(252, 188, 86) transparent";
        }
    }
    var mult = window.devicePixelRatio;
    if (isYearSelected) {
        dateID.innerHTML = dateAtTop[0];
        var canvas = document.getElementById("myCanvas");
        startDateYear = new Date(startDateYear.toString().slice(0, 4), startDateYear.toString().slice(4, 6) - 1, startDateYear.toString().slice(6, 8));
        var endDate = new Date(startDateYear.getFullYear(), startDateYear.getMonth(), startDateYear.getDate() + 396);
        var numberMonths = getNumberOfMonth(startDateYear, endDate);
        ctx = canvas.getContext("2d");
        cWidth = window.screen.availWidth;
        if (cWidth === 0 || cWidth === undefined) {
            cWidth = document.body.clientWidth;
        }
        base = ((80 * cWidth) / 1440);
        base = base * mult;
        canvas.height = document.getElementsByClassName("canvasStyle")[0].clientWidth * mult;
        canvas.width = document.getElementsByClassName("canvasStyle")[0].clientHeight * mult;
        canvas.zIndex = 10;
        ctx.strokeStyle = 'rgb(85,175,229)';
        ctx.fillStyle = 'rgb(85,175,229)';
        ctx.lineWidth = .1 * base;
        var start = .585;
        var add = 11.925 / (numberMonths);
        var margin = .6 * base;
        for (var i = powerUsageValue.length - 1; i > 0; i--) {
            ctx.beginPath();
            ctx.arc(start * base, (canvas.height - margin - powerUsageValue[i] * HEIGHTMULTIPLICATIONFACTOR * base), .2 * base, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(start * base, (canvas.height - margin - powerUsageValue[i] * HEIGHTMULTIPLICATIONFACTOR * base));
            ctx.lineTo((start + add) * base, (canvas.height - margin - powerUsageValue[i - 1] * HEIGHTMULTIPLICATIONFACTOR * base));
            ctx.stroke();
            ctx.beginPath();
            ctx.arc((start + add) * base, (canvas.height - margin - powerUsageValue[i - 1] * HEIGHTMULTIPLICATIONFACTOR * base), .2 * base, 0, 2 * Math.PI);
            ctx.fill();
            start = start + add;
        }
        if (powerUsageValue.length === 1) {
            ctx.beginPath();
            ctx.arc(start * base, (canvas.height - margin - powerUsageValue[0] * HEIGHTMULTIPLICATIONFACTOR * base), .2 * base, 0, 2 * Math.PI);
            ctx.fill();
        }
        ctx.lineWidth = .075*base;
        ctx.strokeStyle = 'rgb(252, 188, 86)';
        ctx.setLineDash([.5291 * base, .225 * base]);
        ctx.beginPath();
        console.log(averagePowerUsage);
        if ( averagePowerUsage !== 'Nan') {
        ctx.moveTo(0, (canvas.height - margin - averagePowerUsage * HEIGHTMULTIPLICATIONFACTOR * base));
        ctx.lineTo(canvas.width, (canvas.height - margin - averagePowerUsage * HEIGHTMULTIPLICATIONFACTOR * base));
        ctx.stroke();
        }
        //Bottom Display
        hLablOneYear.innerHTML = "'" + startDateYear.yyyymmdd().slice(2, 4) + "." + startDateYear.yyyymmdd().slice(4, 6);
        hLablTwoYear.innerHTML = "'" + endDate.yyyymmdd().slice(2, 4) + "." + endDate.yyyymmdd().slice(4, 6);


    }
    if(averagePowerUsage !== 'Nan' && isMonthSelected ){
        dateID.innerHTML = dateAtTop[0];
        var canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");
        cWidth = window.screen.availWidth;
        if (cWidth === 0 || cWidth === undefined) {
            cWidth = document.body.clientWidth;
        }
        base = ((80 * cWidth) / 1440);
        base = base * mult;
        canvas.height = canvas.getBoundingClientRect().height * mult;
        canvas.width = canvas.getBoundingClientRect().width * mult;
        canvas.zIndex = 10;
        ctx.lineWidth = .075 * base;
        var margin = .6 * base;

        ctx.strokeStyle = 'rgb(252, 188, 86)';
        ctx.setLineDash([.5291 * base, .225 * base]);
        ctx.beginPath();
        ctx.moveTo(0, (canvas.height - margin - averagePowerUsage * HEIGHTMULTIPLICATIONFACTOR * base));
        ctx.lineTo(canvas.width, (canvas.height - margin - averagePowerUsage * HEIGHTMULTIPLICATIONFACTOR * base));
        ctx.stroke();

    }

}

function addZeroBeforeDecimal(val) {
    val = Number(val).toFixed(1);
    return val;
}

function monthDisplayAtTop(date) {
    var pDate = new Date();
    var monthVal = date.getMonth() + 1;
    var formatData;
    if (monthVal < 10) {
        monthVal = "0" + monthVal;
    }
    var dateVal = date.getDate();

    if (monthVal === (pDate.getMonth() + 1) && date.getFullYear() === pDate.getFullYear()) {
        formatData = pDate.getFullYear() + "." + monthVal + "." + pDate.getDate();
    } else {
        if (dateVal < 10) {
            dateVal = "0" + dateVal;
        }
        formatData = date.getFullYear() + "." + monthVal + "." + dateVal;
    }
    return formatData;
}

function dayDisplayAtTop(date) {

    var monthVal = date.getMonth() + 1;
    if (monthVal < 10)
        monthVal = "0" + monthVal;
    var dateVal = date.getDate();
    if (dateVal < 10)
        dateVal = "0" + dateVal;
    var formatData = date.getFullYear() + "." + monthVal + "." + dateVal;

    return formatData;
}

function getPreviousFourDaysData(dualDeviceId, optionCodeValue, isStatic, $scope) {
    if (isAvailDay) {
        isLeftClicked = true;
        var lengthArray = lastDayValueOnX.length;
        var yearStr = lastDayValueOnX[lengthArray - 1].substring(0, 4);
        var monthStr = lastDayValueOnX[lengthArray - 1].substring(4, 6);
        var dayStr = lastDayValueOnX[lengthArray - 1].substring(6, 8);
        var year = parseInt(yearStr, 10);
        var month = parseInt(monthStr, 10);
        var day = parseInt(dayStr, 10);
        var modifiedDate = new Date('2016/01/01');
        modifiedDate.setFullYear(year);
        modifiedDate.setMonth(month - 1);
        modifiedDate.setDate(day - 1);
        var reqFormat = modifiedDate.yyyymmdd();
        if (energyDebug) {
            makeEnergyDataFromEnergyDictionary(reqFormat, optionCodeValue, dualDeviceId, 'day', $scope);
            return;
        }
        if (!isStatic) {
            nativeInterface.runOnNative("getEnergyData", '{"deviceUuid" : "' + $scope.deviceUuid + '", "date" : "' + reqFormat + '","dataType" : "day","optionCode" :"' + optionCodeValue + '","dualDeviceId" :"' + dualDeviceId + '"}');
        }
    }
}

function getPreviousFourWeeksData(deviceUuid, optionCodeValue, isStatic, $scope) {
    if (isAvailWeek && lastWeekValueOnX.length === 4) {
        isLeftClicked = true;
        var lengthArray = lastWeekValueOnX.length;
        var weekDateVal = lastWeekValueOnX[lengthArray - 1].split("-");
        var yearStr = weekDateVal[1].substring(0, 4);
        var monthStr = weekDateVal[1].substring(4, 6);
        var dayStr = weekDateVal[1].substring(6, 8);
        var year = parseInt(yearStr, 10);
        var month = parseInt(monthStr, 10);
        var day = parseInt(dayStr, 10);
        var modifiedDate = new Date('2016/01/01');
        modifiedDate.setFullYear(year);
        modifiedDate.setMonth(month - 1);
        modifiedDate.setDate(day - 1);
        var reqFormat = modifiedDate.yyyymmdd();
        if (!isStatic && !energyDebug) {
            nativeInterface.runOnNative("getEnergyData", '{"deviceUuid" : "' + deviceUuid + '", "date" : "' + reqFormat + '","dataType" : "week","optionCode" :"' + optionCodeValue + '","dualDeviceId" :"' + dualDeviceId + '"}');
        }

        if (energyDebug) {
            weekLeftCount++;
            makeEnergyDataFromEnergyDictionary(reqFormat, optionCodeValue, deviceUuid, 'week', $scope);
        }

    }
}

function getPreviousFourMonthsData(deviceUuid, optionCodeValue, isStatic, $scope) {
    if (isAvailMonth) {
        isLeftClicked = true;
        var lengthArray = lastMonthValueOnX.length;
        var monthDateVal = lastMonthValueOnX[lengthArray - 1].split("-");
        var yearStr, monthStr, dayStr;
        yearStr = monthDateVal[0].substring(0, 4);
        monthStr = monthDateVal[0].substring(4, 6);
        dayStr = monthDateVal[0].substring(6, 8);
        var year = parseInt(yearStr, 10);
        var month = parseInt(monthStr, 10);
        var day = parseInt(dayStr, 10);
        var modifiedDate = new Date('2016/01/01');
        modifiedDate.setFullYear(year);
        modifiedDate.setMonth(month - 1);
        modifiedDate.setDate(day - 1);
        var reqFormat = modifiedDate.yyyymmdd();
        if (!isStatic && !energyDebug) {
            if (deviceType === "FAC") {
                nativeInterface.runOnNative("getEnergyData", '{"deviceUuid" : "' + deviceUuid + '", "date" : "' + reqFormat + '","dataType" : "month","optionCode" :"' + optionCodeValue + '","dualDeviceId" :"' + dualDeviceId + '","meterDate" :"' + myScope.currentMeterDate + '"}');
            } else {
                nativeInterface.runOnNative("getEnergyData", '{"deviceUuid" : "' + deviceUuid + '", "date" : "' + reqFormat + '","dataType" : "month","optionCode" :"' + optionCodeValue + '","dualDeviceId" :"' + dualDeviceId + '"}');
            }
        } else if (energyDebug) {
            monthLeftCount++;
            console.log("reqFormat", reqFormat);
            makeEnergyDataFromEnergyDictionary(reqFormat, optionCodeValue, deviceUuid, 'month', $scope);
        }

    }
}

function isNextDataAvilable(dataType) {
    var yearStr, monthStr, dayStr;

    if (dataType === 'month') {
        if (monthLeftCount > 0){
            return true;
        }
        else{
            return false;
        }
        if (lastMonthValueOnX.length > 0) {
            var monthDateStartVal = lastMonthValueOnX[0].split("-");
            yearStr = monthDateStartVal[1].substring(0, 4);
            monthStr = monthDateStartVal[1].substring(4, 6);
            dayStr = monthDateStartVal[1].substring(6, 8);
        } else {
            yearStr = new Date().getFullYear();
            monthStr = new Date().getMonth() + 1;
            dayStr = new Date().getDate();
        }

    } else if (dataType === 'week') {
        if (weekLeftCount > 0)
            return true;
        else
            return false;
    } else {
        if (lastDayValueOnX.length > 0) {
            yearStr = lastDayValueOnX[0].substring(0, 4);
            monthStr = lastDayValueOnX[0].substring(4, 6);
            dayStr = lastDayValueOnX[0].substring(6, 8);
        } else {
            yearStr = new Date().getFullYear();
            monthStr = new Date().getMonth() + 1;
            dayStr = new Date().getDate();
        }
    }

    var foryear = parseInt(yearStr, 10);
    var formonth = parseInt(monthStr, 10);
    var forday = parseInt(dayStr, 10);
    var modifiedDate = new Date();
    modifiedDate.setFullYear(foryear);
    modifiedDate.setMonth(formonth - 1);
    modifiedDate.setDate(forday);
    var forweek = modifiedDate.getWeek();

    var curDay = new Date().getDate();
    var curMonth = new Date().getMonth() + 1;
    var curYear = new Date().getFullYear();
    var curweek = (new Date()).getWeek();

    if (foryear < curYear) {
        return true;
    } else if (dataType === 'month' && (formonth >= curMonth && foryear === curYear)) {
        return false;
    } else if (dataType === 'week' && (forweek + 3 >= curweek && foryear === curYear)) {
        return false;
    } else if (foryear > curYear) {
        return false;
    } else if (formonth > curMonth) {
        return false;
    } else if (forday >= curDay && formonth == curMonth && foryear === curYear) {
        return false;
    } else {
        return true;
    }
}

function isDataAvilable(dataType, isNext) {
    var dayDiff, yearStr, monthStr, dayStr;
    var modifiedDate = new Date('2016/01/01');

    if (dataType === 'month') {
        if (lastMonthValueOnX.length > 0) {
            var monthDateStartVal = lastMonthValueOnX[0].split("-");
//            if (deviceType === "FAC" && myScope.currentMeterDate <= new Date().getDate()) {
//                yearStr = monthDateStartVal[1].substring(0,4);
//                monthStr = monthDateStartVal[1].substring(4,6);
//                dayStr = monthDateStartVal[1].substring(6,8);
//            } else {
//                yearStr = monthDateStartVal[0].substring(0,4);
//                monthStr = monthDateStartVal[0].substring(4,6);
//                dayStr = monthDateStartVal[0].substring(6,8);
//            }
            yearStr = monthDateStartVal[0].substring(0, 4);
            monthStr = monthDateStartVal[0].substring(4, 6);
            dayStr = monthDateStartVal[0].substring(6, 8);
        } else {
            yearStr = new Date().getFullYear();
            monthStr = new Date().getMonth() + 1;
            dayStr = new Date().getDate();
        }
        dayDiff = 1;

    } else if (dataType === 'week') {
        if (lastWeekValueOnX.length > 0) {
            var weekDateStartVal = lastWeekValueOnX[0].split("-");
            yearStr = weekDateStartVal[0].substring(0, 4);
            monthStr = weekDateStartVal[0].substring(4, 6);
            dayStr = weekDateStartVal[0].substring(6, 8);
        } else {
            yearStr = new Date().getFullYear();
            monthStr = new Date().getMonth() + 1;
            dayStr = new Date().getDate();
        }
        dayDiff = parseInt(dayStr, 10) + 28;

    } else {
        if (lastDayValueOnX.length > 0) {
            yearStr = lastDayValueOnX[0].substring(0, 4);
            monthStr = lastDayValueOnX[0].substring(4, 6);
            dayStr = lastDayValueOnX[0].substring(6, 8);
        } else {
            yearStr = new Date().getFullYear();
            monthStr = new Date().getMonth() + 1;
            dayStr = new Date().getDate();
        }
        dayDiff = parseInt(dayStr, 10) + 4;
    }
    var foryearV = parseInt(yearStr, 10);
    var formonthV = parseInt(monthStr, 10);
    var fordayV = parseInt(dayStr, 10);

    var year = parseInt(yearStr, 10);
    var month = parseInt(monthStr, 10);

    modifiedDate.setFullYear(year);
    dataType === 'month' ? modifiedDate.setMonth(month + 3) : modifiedDate.setMonth(month - 1);
    modifiedDate.setDate(dayDiff);

    var reqFormat = modifiedDate.yyyymmdd();
    var foryearStr = reqFormat.substring(0, 4);
    var formonthStr = reqFormat.substring(4, 6);
    var fordayStr = reqFormat.substring(6, 8);
    var foryear = parseInt(foryearStr, 10);
    var formonth = parseInt(formonthStr, 10);
    var forday = parseInt(fordayStr, 10);
    if (foryearV < new Date().getFullYear()) {
        return reqFormat;
    } else if (dataType === 'month' && (formonthV >= new Date().getMonth() + 1 && foryearV === new Date().getFullYear())) {
        return false;
    }
    if (dataType === 'week' && (formonthV === new Date().getMonth() + 1 && fordayV === new Date().getDate() && foryearV === new Date().getFullYear())) {
        return false;
    } else if (foryear > new Date().getFullYear()) {
        return false;
    } else if (formonth > new Date().getMonth() + 1) {
        return false;
    } else if (forday > new Date().getDate() && formonth === new Date().getMonth() + 1 && foryear === new Date().getFullYear()) {
        return false;
    } else {
        return reqFormat;
    }
}

function getNextFourDaysData(deviceUuid, optionCodeValue, $scope) {
    var reqFormat = isDataAvilable('day', true);

    if (reqFormat !== false) {
        if (energyDebug) {
            makeEnergyDataFromEnergyDictionary(reqFormat, optionCodeValue, deviceUuid, 'day', $scope);
            return;
        } else {
            nativeInterface.runOnNative("getEnergyData", '{"deviceUuid" : "' + $scope.deviceUuid + '", "date" : "' + reqFormat + '","dataType" : "day","optionCode" :"' + optionCodeValue + '","dualDeviceId" :"' + dualDeviceId + '"}');
        }
    }
}

function getNextFourWeeksData(deviceUuid, optionCodeValue, $scope) {
    var reqFormat = isDataAvilable('week', true);
    console.log("reqFormat later", reqFormat);

    if (reqFormat !== false && !energyDebug) {
        nativeInterface.runOnNative("getEnergyData", '{"deviceUuid" : "' + deviceUuid + '", "date" : "' + reqFormat + '","dataType" : "week","optionCode" :"' + optionCodeValue + '","dualDeviceId" :"' + dualDeviceId + '"}');
    } else if (energyDebug) {
        weekLeftCount--;
        showNextWeeklyData($scope);
    }

}

function getNextFourMonthsData(deviceUuid, optionCodeValue, $scope) {

    var reqFormat = isDataAvilable('month', true);
    if (energyDebug) {
        monthLeftCount--;
        showNextMonthlyData($scope);
    }
    else if (reqFormat !== false && !energyDebug) {
        if (deviceType === "FAC") {
            nativeInterface.runOnNative("getEnergyData", '{"deviceUuid" : "' + deviceUuid + '", "date" : "' + reqFormat + '","dataType" : "month","optionCode" :"' + optionCodeValue + '","dualDeviceId" :"' + dualDeviceId + '","meterDate" :"' + myScope.currentMeterDate + '"}');
        } else {
            nativeInterface.runOnNative("getEnergyData", '{"deviceUuid" : "' + deviceUuid + '", "date" : "' + reqFormat + '","dataType" : "month","optionCode" :"' + optionCodeValue + '","dualDeviceId" :"' + dualDeviceId + '"}');
        }

    }
}

function dateFromatconvertor(mDatesCopy) {
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "June", "July",
        "Aug", "Sept", "October",
        "Nov", "Dec"
    ];

    var formattedVal = mDatesCopy.getDate();
    if (formattedVal < 10) {
        formattedVal = "0" + formattedVal;
    }
    return formattedVal;
}

function makeDailyDatas(deviceUuid, optionCodeValue, isStatic, $scope) {
    getDayEnergyData(deviceUuid, optionCodeValue, isStatic, $scope);
}

function getDayEnergyData(deviceUuid, optionCodeValue, isStatic, $scope) {

    var todayDate = new Date();
    if (!isStatic || energyDebug) {
        if (lastValueDayStored !== undefined)
        {
            var xAxisval = lastValueDayStored;
            var yearStr = xAxisval.substring(0, 4);
            var monthStr = xAxisval.substring(4, 6);
            var dayStr = xAxisval.substring(6, 8);
            var year = parseInt(yearStr, 10);
            var month = parseInt(monthStr, 10);
            var day = parseInt(dayStr, 10);
            todayDate = new Date('2016/01/01');
            todayDate.setFullYear(year, 10);
            todayDate.setMonth(month - 1);
            todayDate.setDate(day);
        }
        var date = todayDate.yyyymmdd();
        if (energyDebug) {
            makeEnergyDataFromEnergyDictionary(date, optionCodeValue, deviceUuid, 'day', $scope);
        } else {
            nativeInterface.runOnNative("getEnergyData", '{"deviceUuid" : "' + deviceUuid + '", "date" : "' + date + '","dataType" : "day","optionCode" :"' + optionCodeValue + '","dualDeviceId" :"' + dualDeviceId + '"}');
        }
    }
}




function powerUsageOfCurrentMonth(date, deviceUuid, endDate) {
    console.log("reached inside calculation");
    var powerUsage, date2;
    if (date < endDate)
    {
        console.log("stuck in first condition");
        return powerUsage;
    }
    date2 = lastDayOfPreviousMonth(date, deviceUuid);
    if (angular.isDefined(date2) === false) {
        console.log("stuck in second condition");
        return  EnergyDictionary[deviceUuid][date].power_usage;
    } else if (angular.isDefined(date2) === true && angular.isDefined(date) === true) {
        console.log("stuck in third condition");
        return EnergyDictionary[deviceUuid][date].power_usage - EnergyDictionary[deviceUuid][date2].power_usage;
    }
    console.log("stuck in free condition");
    return powerUsage;
}


function powerUsageOfMeterMonth(startDate, endDate, deviceUuid) {
    if (startDate > endDate) {
        return;
    }
   // console.log("consoling values",typeof(endDate),typeof(firstDate),firstDate,lastDate);
    if(Number(endDate)>Number(lastDate))
    {
       endDate=lastDate.toString();
    }
    if (startDate < energyKeys[deviceUuid][0]) {
        return EnergyDictionary[deviceUuid][endDate]['power_usage'];
    } else if (angular.isDefined(startDate) === true && angular.isDefined(endDate) === true) {
        return EnergyDictionary[deviceUuid][endDate]['power_usage'] - EnergyDictionary[deviceUuid][startDate]['power_usage'] + EnergyDictionary[deviceUuid][startDate]['power_usage_current'];
    }
    return;
}

function lastDayOfPreviousMonth(date, deviceUuid) {
    var date2 = date.slice(0, 6) + '01';
    date2 = getIndexFromKeyEnergy(date2, deviceUuid);
    if (angular.isDefined(date2)) {
        date2 = getKeyFromIndexEnergy(date2 - 1, deviceUuid);
        return date2;
    } else {
        return;
    }
}

//This function take startDate , endDate and DualDeviceID.
//It removes all the data for that DualDeviceID and create an object for all the dates in between the startDate and endDate and intitalizes them
function initializeDictionary(startDate, endDate, dualDeviceId) {
    var dateIterator = new Date(parseInt(startDate.slice(0, 4)), parseInt(startDate.slice(4, 6)) - 1, parseInt(startDate.slice(6, 8))).yyyymmdd();
    EnergyDictionary[dualDeviceId] = {};
    energyKeys[dualDeviceId] = {};
    while (dateIterator <= endDate) {
        EnergyDictionary[dualDeviceId][dateIterator] = {power_usage: 0, running_time: 0, power_usage_current: 0};
        dateIterator = nextDate(dateIterator);
    }
    energyKeys[dualDeviceId] = Object.keys(EnergyDictionary[dualDeviceId]);
}


//This function take startDate , endDate and DualDeviceID.
//It fills all the power_usage and power_usage_current values corresponding to the dates for which the date was not provided from native.
function fillEnergyDictionaryWithValues(startDate, endDate, dualDeviceId) {
    var previous = new Date(parseInt(startDate.slice(0, 4)), parseInt(startDate.slice(4, 6)) - 1, parseInt(startDate.slice(6, 8))).yyyymmdd();
    EnergyDictionary[dualDeviceId][previous]['power_usage_current'] = parseInt(EnergyDictionary[dualDeviceId][previous]['power_usage']);
    var previousEnergy = EnergyDictionary[dualDeviceId][previous]['power_usage'];
    var dateIterator = nextDate(previous);
    while (dateIterator <= endDate) {
        if (EnergyDictionary[dualDeviceId][dateIterator]['power_usage'] === 0) {
            EnergyDictionary[dualDeviceId][dateIterator]['power_usage'] = EnergyDictionary[dualDeviceId][previous]['power_usage'];
        } else {
            EnergyDictionary[dualDeviceId][dateIterator]['power_usage_current'] = Math.max(0,EnergyDictionary[dualDeviceId][dateIterator]['power_usage'] - previousEnergy);
            previousEnergy = EnergyDictionary[dualDeviceId][dateIterator]['power_usage'];
        }
        previous = dateIterator;
        dateIterator = nextDate(dateIterator);
    }
}

function nextDate(date) {
    var tomorrow = new Date(parseInt(date.slice(0, 4)), parseInt(date.slice(4, 6)) - 1, parseInt(date.slice(6, 8)));
    tomorrow = new Date(tomorrow.getTime() + (24 * 60 * 60 * 1000));
    return tomorrow.yyyymmdd();

}

function setMeterCornerDate(year, month, day) {
    var lastDayOfMonth = (new Date(year, month+ 1, 0)).yyyymmdd();
    var givenDate =  (new Date(year,month,day)).yyyymmdd();
    return givenDate>=lastDayOfMonth?lastDayOfMonth.substring(6,8):givenDate.substring(6,8);
}


function makeEnergyDataFromEnergyDictionary(date, optionCodeValue, deviceUuid, dataType, $scope) {
    lastMonthValueOnX = [];
    lastWeekValueOnX = [];
    lastDayValueOnX = [];
    var daysVal = [];
    var energyData = [];
    var dayDisplayBottom = [];
    var dayDisplayTop = [];
    var averagePowerUsage;
    var endDate = getKeyFromIndexEnergy(0, deviceUuid);
    if (energyKeys[deviceUuid].length === 0) {
        $scope.no_page = true;
        energyDataEmpty = true;
        return;
    }
    var monthNames = [
        $scope.translation.WEBMOB_common_energy_monitor_january,
        $scope.translation.WEBMOB_common_energy_monitor_february,
        $scope.translation.WEBMOB_common_energy_monitor_march,
        $scope.translation.WEBMOB_common_energy_monitor_april,
        $scope.translation.WEBMOB_common_energy_monitor_may,
        $scope.translation.WEBMOB_common_energy_monitor_june,
        $scope.translation.WEBMOB_common_energy_monitor_july,
        $scope.translation.WEBMOB_common_energy_monitor_august,
        $scope.translation.WEBMOB_common_energy_monitor_september,
        $scope.translation.WEBMOB_common_energy_monitor_october,
        $scope.translation.WEBMOB_common_energy_monitor_november,
        $scope.translation.WEBMOB_common_energy_monitor_december
    ];

    if (dataType === 'day') {
        $scope.enrgyMonitorTab = "day";
        isDaySelected = true;
        isWeekSelected = false;
        isMonthSelected = false;
        isYearSelected = false;
        for (var i = 0; i < 4; i++) {
            daysVal[i] = getKeyFromIndexEnergy(getIndexFromKeyEnergy(date, deviceUuid) - i, deviceUuid);
            if (angular.isDefined(daysVal[i]) === false) {
                break;
            }
            dayDisplayTop[i] = getFormattedDateAtTopForDay($scope, daysVal[i], monthNames);
            lastDayValueOnX[i] = daysVal[i];
            dayDisplayBottom[i] = getDayFormat(daysVal[i]);
//            console.log(getKeyFromIndexEnergy(getIndexFromKeyEnergy(date,dualDeviceId) - i,dualDeviceId));
//            console.log(energyDictionary[dualDeviceId][getKeyFromIndexEnergy(getIndexFromKeyEnergy(date,dualDeviceId) - i,dualDeviceId)]);
            energyData[i] = EnergyDictionary[deviceUuid][getKeyFromIndexEnergy(getIndexFromKeyEnergy(date, deviceUuid) - i, deviceUuid)]['power_usage_current'];
        }
        lastValueDayStored = lastDayValueOnX[0];
    } else if (dataType === 'week') {
        console.log("date", date);
        var indexCurr = getIndexFromKeyEnergy(date, deviceUuid);
        if(indexCurr===-1)
        {    var todayDate= new Date();
             indexCurr = getIndexFromKeyEnergy(lastDate.toString(), deviceUuid)+6-todayDate.getDay();
            
        }
        var weekViewLastDay = new Date(Number(date.substring(0, 4)), Number(date.substring(4, 6)) - 1, Number(date.substring(6, 8)) - 27);
        weekViewLastDay = weekViewLastDay.yyyymmdd();
        var weekViewLastIndex, NumberOfDays, NumberOfWeeks;
        if (Number(weekViewLastDay) < Number(firstDate)) {
            weekViewLastDay = firstDate.toString();
        }
        weekViewLastIndex = getIndexFromKeyEnergy(weekViewLastDay, deviceUuid);
        NumberOfDays = indexCurr - weekViewLastIndex + 1;
        NumberOfWeeks = (NumberOfDays%7)==0?NumberOfDays/7:parseInt(NumberOfDays/7)+1;


        isDaySelected = false;
        isWeekSelected = true;
        isMonthSelected = false;
        isYearSelected = false;

        var dateInterval = [];
        var Data = [];
        var firstDayOfWeek, lastDayOfWeek;
        firstDayOfWeek = date;
        lastDayOfWeek = (new Date(Number(firstDayOfWeek.substring(0, 4)), Number(firstDayOfWeek.substring(4, 6)) - 1, Number(firstDayOfWeek.substring(6, 8)) - 6)).yyyymmdd();

        for (var i = 0; i < NumberOfWeeks; i++) {
            dateInterval[i] = firstDayOfWeek + '-' + lastDayOfWeek;
            Data[i] = powerUsageOfMeterMonth(lastDayOfWeek,firstDayOfWeek,deviceUuid);

            firstDayOfWeek = (new Date(Number(firstDayOfWeek.substring(0, 4)), Number(firstDayOfWeek.substring(4, 6)) - 1, Number(firstDayOfWeek.substring(6, 8)) - 7)).yyyymmdd();
            lastDayOfWeek = (new Date(Number(lastDayOfWeek.substring(0, 4)), Number(lastDayOfWeek.substring(4, 6)) - 1, Number(lastDayOfWeek.substring(6, 8)) - 7)).yyyymmdd();
        }


        var counter = 0;

        dateInterval.forEach(function (entry) {
            daysVal[counter] = entry;
            dayDisplayTop[counter] = getFormattedDateAtTop(entry, monthNames);
            lastWeekValueOnX[counter] = entry;
            dayDisplayBottom[counter] = getWeekFormat(entry, monthNames);
            energyData[counter] = Data[counter];
            counter++;
        });
        lastValueWeekStored = lastWeekValueOnX[0];
        var wData = {energyData: energyData, dayDisplayBottom: dayDisplayBottom, dayDisplayTop: dayDisplayTop, energyDatalength: energyData.length, averagePowerUsage: averagePowerUsage, firstDate: firstDate, lastValueWeekStored: lastValueWeekStored, lastWeekValueOnX: lastWeekValueOnX};
        if (lastWeekData.length === 0 || !(lastValueWeekStored === lastWeekData[lastWeekData.length - 1].lastValueWeekStored)) {
            lastWeekData.push(wData);
        }
        console.log("sizeDictionary, totaldays", daysVal, dayDisplayTop, dayDisplayBottom, energyData);

    } else if (dataType === 'month') {
        isDaySelected = false;
        isWeekSelected = false;
        isMonthSelected = true;
        isYearSelected = false;
        var currDate = date;
        var meter = meterDate;
        var monthIntervals = [], DataMonthly = [], cnt = 0;

        if (angular.isDefined(meterDate)) {
            var meterDay = meter;
            var currDay = currDate.substring(6, 8);
            var fromDay, toDay;
            if (currDay >= meterDay) {
                var mDay = setMeterCornerDate(Number(currDate.substring(0, 4)), Number(currDate.substring(4, 6)) - 1, Number(meterDay));
                fromDay = new Date(currDate.substring(0, 4), Number(currDate.substring(4, 6)) - 1, Number(mDay));
                toDay = new Date(currDate.substring(0, 4), Number(currDate.substring(4, 6)) - 1, Number(currDay));
                fromDay = fromDay.yyyymmdd().toString();
                toDay = toDay.yyyymmdd().toString();
                cnt = 0;
                while (1) {
                    DataMonthly[cnt] = powerUsageOfMeterMonth(fromDay, toDay, deviceUuid);
                    monthIntervals[cnt] = fromDay + "-" + toDay;
                    cnt++;
                    if (cnt === 4) {
                        break;
                    }
                    if (Number(fromDay) <= firstDate) {
                        break;
                    }
                    var mDay = setMeterCornerDate(Number(fromDay.substring(0, 4)), Number(fromDay.substring(4, 6)) - 2, Number(meterDay));
                    toDay = new Date(fromDay.substring(0, 4), Number(fromDay.substring(4, 6)) - 1, Number(fromDay.substring(6, 8)) - 1);
                    fromDay = new Date(fromDay.substring(0, 4), Number(fromDay.substring(4, 6)) - 2, Number(mDay));

                    fromDay = fromDay.yyyymmdd().toString();
                    toDay = toDay.yyyymmdd().toString();

                }

                for (var i = 0; i < monthIntervals.length; i++) {
                    dayDisplayBottom[i] = monthNames[parseInt((monthIntervals[i].substring(4, 6) - 1), 10)];
                }



            } else {
                var mDay = setMeterCornerDate(Number(currDate.substring(0, 4)), Number(currDate.substring(4, 6)) - 2, Number(meterDay));
                fromDay = new Date(currDate.substring(0, 4), Number(currDate.substring(4, 6)) - 2, Number(mDay));
                toDay = new Date(currDate.substring(0, 4), Number(currDate.substring(4, 6)) - 1, Number(currDay));
                fromDay = fromDay.yyyymmdd().toString();
                toDay = toDay.yyyymmdd().toString();
                cnt = 0;
                while (1) {
                    DataMonthly[cnt] = powerUsageOfMeterMonth(fromDay, toDay, deviceUuid);
                    monthIntervals[cnt] = fromDay + "-" + toDay;
                    cnt++;
                    if (cnt === 4) {
                        break;
                    }
                    if (Number(fromDay) <= firstDate) {
                        break;
                    }
                    var mDay = setMeterCornerDate(Number(fromDay.substring(0, 4)), Number(fromDay.substring(4, 6)) - 2, Number(meterDay));
                    toDay = new Date(fromDay.substring(0, 4), Number(fromDay.substring(4, 6)) - 1, Number(fromDay.substring(6,8)) - 1);
                    fromDay = new Date(fromDay.substring(0, 4), Number(fromDay.substring(4, 6)) - 2, Number(mDay));
                    fromDay = fromDay.yyyymmdd().toString();
                    toDay = toDay.yyyymmdd().toString();

                }

                for (var i = 0; i < monthIntervals.length; i++) {
                    dayDisplayBottom[i] = monthNames[parseInt((monthIntervals[i].substring(13, 15) - 1), 10)];
                }






            }


        } else {
            while (1) {
                var power = powerUsageOfCurrentMonth(currDate, deviceUuid, endDate);
                DataMonthly[cnt] = power;
                var cornerDate = currDate.substring(0, 6) + "01";
                cornerDate = cornerDate < firstDate ? firstDate : cornerDate;
                monthIntervals[cnt] = cornerDate + "-" + currDate;
                currDate = lastDayOfPreviousMonth(currDate, deviceUuid);
                if (!angular.isDefined(currDate)) {
                    break;
                }
                cnt++;
                if (cnt === 4) {
                    break;
                }
            }


            for (var i = 0; i < monthIntervals.length; i++) {
                dayDisplayBottom[i] = monthNames[parseInt((monthIntervals[i].substring(4, 6) - 1), 10)];
            }




        }
        console.log("monthIntervals", monthIntervals);
        for (var i = 0; i < monthIntervals.length; i++) {
            daysVal[i] = monthIntervals[i];
            dayDisplayTop[i] = getFormattedDateAtTopForMonth($scope, monthIntervals[i], monthNames);
            lastMonthValueOnX[i] = monthIntervals[i];
            energyData[i] = DataMonthly[i];
        }
        lastValueMonthStored = lastMonthValueOnX[0];

        if (!energyManagerDataState) {
            if (energyData[0] !== undefined) {
                currMonthEnergyData = energyData[0] === '0' ? '0.0' : energyData[0];
            }
            if (energyData[1] !== undefined) {
                prevMonthEnergyData = energyData[1] === '0' ? '0.0' : energyData[1];
            }
            energyManagerDataState = true;
        }




        var mData = {energyData: energyData, dayDisplayBottom: dayDisplayBottom, dayDisplayTop: dayDisplayTop, energyDatalength: energyData.length, averagePowerUsage: averagePowerUsage, firstDate: firstDate, lastValueMonthStored: lastValueMonthStored, lastMonthValueOnX: lastMonthValueOnX};
        if (lastMonthData.length === 0 || !(lastValueMonthStored === lastMonthData[lastMonthData.length - 1].lastValueMonthStored)) {
            lastMonthData.push(mData);
        }
    } else if (dataType === 'year') {
        isDaySelected = false;
        isWeekSelected = false;
        isMonthSelected = false;
        isYearSelected = true;
        for (var i = 0; i < 14; i++) {
            energyData[i] = powerUsageOfCurrentMonth(date, dualDeviceId);
            dayDisplayBottom[i] = daysVal[i];
            date = lastDayOfPreviousMonth(date, dualDeviceId);
            if (angular.isDefined(date) === false) {
                break;
            }
        }
        var startDate = energyKeys[dualDeviceId][0];
        startDate = new Date(startDate.slice(0, 4), startDate.slice(4, 6) - 1, startDate.slice(6, 8));
        dayDisplayTop[0] = getFormattedDateAtTopForYear($scope, startDate, monthNames);
    } else {

    }
    if (currPage === 'energyMonitor') {
//        console.log("came inside current screen");
        navigationButtonHandler(dataType, lastDate, $scope.isStatic);
        var isTrue = isNextDataAvilable(dataType);
        if (isTrue) {
            document.getElementById("rightImg").className = "em_right_arrow";
        } else {
            document.getElementById("rightImg").className = "em_right_arrow_disabled";
        }

        $scope.tempEnergyData = energyData.slice(0); // Copy energy data
        sendValueToUI(angular.copy(energyData), dayDisplayBottom, dayDisplayTop, energyData.length, averagePowerUsageDevice[dualDeviceId], firstDate);
    }
//        else {
//            $scope.handleEnergyMonitorErrors();
//        }
    $scope.loadingBar = false;
}

function findNextSaturDay(){
    var today= new Date();
    var day=today.getDay();
    if(day===6)
    { return today;
    }
    else
    {
      var date=  today.getDate();
      var month=today.getMonth();
      var year=today.getFullYear();
       today=new Date(year,month,date+6-day);
       return today;
    }
    
    
}

function makeWeeklyDatas(deviceUuid, optionCodeValue, isStatic, $scope) {
    var todayDate =findNextSaturDay();
    if (!isWeekAlreadyClicked) {
        ;//Nothing
    } else {
        var xAxisval = lastValueWeekStored.split("-");
        var yearStr = xAxisval[0].substring(0, 4);
        var monthStr = xAxisval[0].substring(4, 6);
        var dayStr = xAxisval[0].substring(6, 8);
        var year = parseInt(yearStr, 10);
        var month = parseInt(monthStr, 10);
        var day = parseInt(dayStr, 10);
        todayDate = new Date('2016/01/01');
        todayDate.setFullYear(year);
        todayDate.setMonth(month - 1);
        todayDate.setDate(day);
    }
    getWeekEnergyData(todayDate.yyyymmdd(), deviceUuid, optionCodeValue, isStatic, $scope);
}

function getWeekEnergyData(date, deviceUuid, optionCodeValue, isStatic, $scope) {
    if (!energyDebug) {
        console.log('{"deviceUuid" : "' + deviceUuid + '", "date" : "' + date + '","dataType" : "week","optionCode" :"' + optionCodeValue + '","dualDeviceId" :"' + dualDeviceId + '"}');
        nativeInterface.runOnNative("getEnergyData", '{"deviceUuid" : "' + deviceUuid + '", "date" : "' + date + '","dataType" : "week","optionCode" :"' + optionCodeValue + '","dualDeviceId" :"' + dualDeviceId + '"}');
    } else {
        makeEnergyDataFromEnergyDictionary(date, optionCodeValue, deviceUuid, 'week', $scope);
    }
}

function getMonthEnergyData(date, deviceUuid, optionCodeValue, isStatic, $scope) {
    if (!energyDebug) {
        if (deviceType === "FAC") {
            nativeInterface.runOnNative("getEnergyData", '{"deviceUuid" : "' + deviceUuid + '", "date" : "' + date + '","dataType" : "month","optionCode" :"' + optionCodeValue + '","dualDeviceId" :"' + dualDeviceId + '","meterDate" :"' + myScope.currentMeterDate + '"}');
        } else {
            nativeInterface.runOnNative("getEnergyData", '{"deviceUuid" : "' + deviceUuid + '", "date" : "' + date + '","dataType" : "month","optionCode" :"' + optionCodeValue + '","dualDeviceId" :"' + dualDeviceId + '"}');
        }
    } else
    {
        makeEnergyDataFromEnergyDictionary(date, optionCodeValue, deviceUuid, 'month', $scope);
    }
}

function getYearEnergyData(date, deviceUuid, optionCodeValue, isStatic, $scope ) {
    if (energyDebug) {
        makeEnergyDataFromEnergyDictionary(date, optionCodeValue, dualDeviceId, 'year', $scope);
    } else if (!isStatic) {
        var endDate = new Date();
        endDate.setDate(endDate.getDate() - 396);
        if (deviceType === "FAC") {
            nativeInterface.runOnNative("getEnergyData", '{"deviceUuid" : "' + deviceUuid + '", "date" : "' + date + '", "endDate" : "' + endDate.yyyymmdd() + '","dataType" : "year","optionCode" :"' + optionCodeValue + '","dualDeviceId" :"' + dualDeviceId + '","meterDate" :"' + myScope.currentMeterDate + '"}');
        } else {
            nativeInterface.runOnNative("getEnergyData", '{"deviceUuid" : "' + deviceUuid + '", "date" : "' + date + '", "endDate" : "' + endDate.yyyymmdd() + '","dataType" : "year","optionCode" :"' + optionCodeValue + '","dualDeviceId" :"' + dualDeviceId + '"}');
        }
    }
}

function makeMonthlyDatas(deviceUuid, optionCodeValue, isStatic, $scope) {
    var todayDate = new Date();
    if (!isMonthAlreadyClicked)
    {
        ;//Nothing
    } else {
        var xAxisval = lastValueMonthStored.split("-");
        var yearStr, monthStr, dayStr;
        yearStr = xAxisval[1].substring(0, 4);
        monthStr = xAxisval[1].substring(4, 6);
        dayStr = xAxisval[1].substring(6, 8);

        var year = parseInt(yearStr, 10);
        var month = parseInt(monthStr, 10);
        var day = parseInt(dayStr, 10);
        todayDate = new Date('2016/01/01');
        todayDate.setFullYear(year);
        todayDate.setMonth(month - 1);
        todayDate.setDate(day);
    }
    getMonthEnergyData(todayDate.yyyymmdd(), deviceUuid, optionCodeValue, isStatic, $scope);
}

function makeYearlyDatas(deviceUuid, optionCodeValue, isStatic, $scope) {
    var todayDate = new Date();
    getYearEnergyData(todayDate.yyyymmdd(), deviceUuid, optionCodeValue, isStatic, $scope);
}

function MonthFromatconvertor(mDatesCopy) {
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "June", "July",
        "Aug", "Sept", "Oct",
        "Nov", "Dec"
    ];
    var formattedVal = monthNames[mDatesCopy.getMonth()];
    return formattedVal;
}

Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
};
