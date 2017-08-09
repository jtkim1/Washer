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
    $scope.appClosed = false;
    $scope.errorConnFailure = false;
    
    $scope.errorList = [];

    $scope.updateDeviceData = updateDeviceData;
    $scope.parseRequestResponse = parseRequestResponse;
    $scope.parseNotification = parseNotification;
    $scope.callGetDevice = callGetDevice;
    $scope.parseRequestAccepted = parseRequestAccepted;
    $scope.handleInitialResponse = handleInitialResponse;
    $scope.showConnectionFailurePopup = showConnectionFailurePopup;
    $scope.connectionFailureOKClicked = connectionFailureOKClicked;
    
    function updateDeviceData(response) {
        if (response["type"] === "requestResponse") {
            if (angular.isDefined(response["status"]) && response["status"] === STCONST.STATUS_99000) {
                debugMessage("what the f!!!!!!!!");
                $scope.showConnectionFailurePopup();
                return;
            }
        }
        SHPService.updateDeviceData($scope, response);
    }

    function parseRequestResponse(response) {
        if (angular.isDefined(response["status"]) && response["status"] === 99000) {
            debugMessage("show connection failure");
            showConnectionFailurePopup();
        }
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
    
    function showConnectionFailurePopup() {
        debugMessage("In the connection failure pop-up");
        if ($scope.appClosed || $scope.errorConnFailure) {
            return;
        }
        $scope.errorConnFailure = true;
        while ($scope.errorList.length !== 0) {
            $scope.errorList.pop();
        }
        $scope.errorList.push({
            title: 'Connection End',
            msg: 'Please check the power cord connection and the network connection status of the device.',
            btnOkTxt: 'OK',
            btnOkHandler: function () {
                connectionFailureOKClicked();
            },
            closeDialog: true
        });
    }
    
    function connectionFailureOKClicked() {
        $scope.appClosed = true;
        nativeInterface.runOnNative("closeWebApp", "");
    }

});
