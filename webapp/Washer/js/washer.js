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
var devType = 'Washer';
var app = angular.module("DASmartHomeDevice", ['toaster', 'ngSanitize', 'angular-svg-round-progress']);
app.controller("WSController", function ($scope, SHPService) {

    var LOADING_STRING = {
    "language": {
        "DEFAULT": {
            "WEBMOB_common_loading": "Loading..."}
        }
    }, data;
    LANG = "KO-KR";
    var langArr = Object.keys(LOADING_STRING.language);
    if (langArr.indexOf(LANG.toUpperCase()) !== -1) {
        data = LOADING_STRING["language"][LANG.toUpperCase()];
    } else if (langArr.indexOf(LANG.toUpperCase().substring(0, 2)) !== -1) {
        data = LOADING_STRING["language"][LANG.toUpperCase().substring(0, 2)];
    } else {
        data = LOADING_STRING["language"]["DEFAULT"];
    }
    data = LOADING_STRING["language"]["DEFAULT"];
    $scope.translation = data;

    $scope.updateDeviceData = updateDeviceData;
    $scope.parseRequestResponse = parseRequestResponse;
    $scope.parseNotification = parseNotification;
    $scope.callGetDevice = callGetDevice;
    $scope.parseRequestAccepted = parseRequestAccepted;
    $scope.handleInitialResponse = handleInitialResponse;
    
    function updateDeviceData(data) {
        SHPService.updateDeviceData($scope, data);
    }

    function parseRequestResponse(response) {
        if (angular.isDefined(response["data"]) && angular.isDefined(response["data"]["Devices"]) && angular.isDefined(response["data"]["Devices"][0]) && angular.isDefined(response["data"]["Devices"][0]["Mode"]) && angular.isDefined(response["data"]["Devices"][0]["Mode"]["options"])) {
            var modeOptionsArray = response["data"]["Devices"][0]["Mode"]["options"];
            var ret = modeOptionsArray.indexOf("SpecialFunction_1");
            if (ret === -1) {
                setLocalStorageData('washerGetDeviceResponse', JSON.stringify(response));
                window.location.assign("normal_washer.html");
                return;
            } else {
                setLocalStorageData('washerGetDeviceResponse', JSON.stringify(response));
                window.location.assign("mkwasher.html");
                return;
            }
        }
    }

    function parseNotification(response) {
        return;
    }

    function callGetDevice() {
        SHPService.getDevices($scope);
    }

    function parseRequestAccepted(response) {
        console.log("parseRequestAccepted");
    }
    
    function handleInitialResponse() {
        ;// Dummy method created to avoid error
    }

});
