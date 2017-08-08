var LANG;
if (window.navigator.platform === 'iPhone' || window.navigator.platform === 'iPad') {
    LANG = navigator.userLanguage || navigator.language;
} else {
    LANG = navigator.userAgent;
}

var isCallFromReset = 0;
var energyResetDone = false;
var debugMode = !false;
var initialLaunch = false;
var hasInitialReceived = false;
var longPressTimer = null;
var svgTitle = document.createElementNS("http://www.w3.org/2000/svg", "title");
var enableSA = true;
var ctrlKey = false;
var nativeCallBackTimer = null;

var CONSTANTS = {
    "MAX_TIME_INTERVAL": 20000,
    "MIN_TIME_INTERVAL": 1000,
    "GET": "GET",
    "PUT": "PUT",
    "POST": "POST",
    "DELETE": "DELETE",
    "RUNONNATIVE": "RUNONNATIVE"
};
var MATERIAL_DESIGN = {
    "LIST_ANIMATION_TIME": 150, // Animation time for ripple effect in list
    "POWER_ANIMTION_TIMEOUT": 130,
    "BACK_ANIMTION_TIMEOUT": 130,
    "TOGGLE_TIME": 330,
    "BTN_ANIMATION_TIME": 480
};

function debugMessage(message) {
    if (debugMode) {
        console.log(message);
    }
}

/***
 * send the Analytics data
 * @param {type} screenName
 * @param {type} eventName
 * @param {type} detailVal
 * @param {type} val
 * @returns {undefined}
 */
function sendSAData(screenID, eventID, detailVal, val) {
    var scope = angular.element(document.getElementById("bodyTag")).scope();
    if (enableSA && !scope.isStatic) {
        // If one of the parameter is undefined, then send empty
        if (angular.isUndefined(screenID)) {
            screenID = "";
        }
        if (angular.isUndefined(eventID)) {
            eventID = "";
        }
        if (angular.isUndefined(detailVal)) {
            detailVal = "";
        }
        if (angular.isUndefined(val)) {
            val = "";
        }
        console.log("SA-oneconnect", "screenName ---> " + screenID + ", eventName ----> " + eventID + ", detailName ----> " + detailVal + ", val ----> " + val);
        var jsonSA = {
            "screenName": screenID,
            "eventName": eventID,
            "detail": detailVal,
            "value": val
        };
        nativeInterface.runOnNative("samsungAnalytics", JSON.stringify(jsonSA));
    }
}


angular.element(document).ready(function () {
    setTimeout(function () {
        var scope = angular.element(document.getElementById("bodyTag")).scope();
        if (!!scope) {
            scope.switchON = 'I';
            scope.switchOff = 'O';
            if (LANG.toUpperCase().indexOf('EN') !== -1) {
                scope.switchON = 'ON';
                scope.switchOff = 'OFF';
            }
        }
    }, 1000);
});

app.constant('STCONST', {
    APP_NAME: 'DASmartHomeDevice',
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE",
    RUNONNATIVE: "RUNONNATIVE",
    MAX_TIME_INTERVAL: 20000,
    MIN_TIME_INTERVAL: 1000,
    GET_DEVICES: "getDevices",
    STATUS_201: 201,
    STATUS_204: 204,
    STATUS_99000: 99000,
    STATUS_MINUS1: -1,
    STATUS_401: 401,
    STATUS_400: 400,
    STATUS_500: 500,
    SCHEDULEDATA: "SCHEDULEDATA"
});

app.constant('KEYCODE', {
    MENU: 82,
    ESC: 111,
    CTRL: 113,
    F1: 131,
    ACTION_UP: 1,
    ACTION_DOWN: 0,
    PAGE_UP: 92,
    PAGE_DOWN: 93,
    UP: 19,
    DOWN: 20
});
app.service("SHPService", function (STCONST, KEYCODE) {
    var stopVar, initialTime, timeDiff, secondRequestFailed;
    var stopVarArray = [];
    var scope = angular.element(document.body).scope();
    var _that = this;
    scope.checkResponse = [];
    scope.locatioName = '';
    scope.roomName = '';
    scope.deviceNameInitial = '';
    scope.appVersionInitial = '';

    scope.isDBDownloaded = false;
    this.getDevice = function ($scope) {
        $scope.checkResponse.push(STCONST.GET_DEVICES);
        this.sendSHPCommand(STCONST.GET, "/" + $scope.peerId + "/devices/0");
    };

    this.getDevices = function ($scope) {
        $scope.checkResponse.push(STCONST.GET_DEVICES);
        this.sendSHPCommand(STCONST.GET, "/" + $scope.peerId + "/devices");
    };

    this.parseGetDevices = function ($scope, response) {
        console.log('parseGetDevices called');
        nativeInterface.runOnNative("controlReady", "");

        if (angular.isDefined(response["locationName"])) {
            $scope.locationName = response["locationName"] || '';
        }

        if (angular.isDefined(response["roomName"])) {
            $scope.roomName = response["roomName"] || '';
        }

        if (angular.isDefined(response["data"])) {
            if (angular.isDefined(response["data"]["Devices"])) {
                devices = response["data"]["Devices"];
                if (response["data"]["Devices"].length > 1) {
                    response["data"]["Devices"].forEach(function (value) {
                        $scope.deviceUuid = value["uuid"];
                        if (value["uuid"] === $scope.deviceUuid) {
                            device = value;
                        }
                    });
                } else {
                    device = response["data"]["Devices"][0];
                    $scope.deviceUuid = device["uuid"];
                }
                if (angular.isUndefined($scope.peerId)) {
                    $scope.peerId = $scope.deviceUuid;
                }
                if ($scope.checkResponse.indexOf(STCONST.GET_DEVICES) === -1) {
                    $scope.checkResponse.push(STCONST.GET_DEVICES);
                }
                console.log('devType :: ' + devType);
                if (devType === 'Washer' || devType === 'Dryer') {
                    $scope.init(devices);
                    $scope.parseDeviceData(devices);
                } else if (devType === "Oven") {
                    //$scope.init();
                    $scope.parseDeviceData(devices);
                } else if (devType === "Airconditioner") {
                    $scope.init();
                    $scope.parseDevicesData(devices);
                } else {
                    $scope.init();
                    $scope.parseDeviceData(device);
                }

                if (!!!$scope.loadingBar) { // No loading bar means request handled properly. So, clear array.
                    this.clearStopVarArray();
                }
            } else if (angular.isDefined(response["data"]["Device"])) {
                device = response["data"]["Device"];
                $scope.deviceUuid = device["uuid"];
                if (angular.isUndefined($scope.peerId)) {
                    $scope.peerId = $scope.deviceUuid;
                }
                if ($scope.checkResponse.indexOf(STCONST.GET_DEVICES) === -1) {
                    $scope.checkResponse.push(STCONST.GET_DEVICES);
                }
                console.log('devType :: ' + devType);
                if (devType === 'Dishwasher') {
                    (!$scope.stateFinish) && $scope.init(); //Do not call init if get device is called after washer cycle finish
                    $scope.parseDeviceData(device);
                } else {
                    $scope.init();
                    $scope.parseDeviceData(device);
                }
            } else {
                // Nothing
            }
        }
        //make information call on app launch (use device id if available)
        if (!$scope.deviceID) {
            this.sendSHPCommand("GET", "/" + $scope.peerId + "/devices/0/information", "", false);
        } else {
            this.sendSHPCommand("GET", "/" + $scope.peerId + "/devices/" + $scope.deviceID + "/information", "", false);
        }
    };

    this.updateDeviceData = function ($scope, data) {
        scope = $scope; //Lokesh -> sometimes scope is undefined in SHPService. So, specifically catching scope here. Please don't remove this statement. Checking for undefined would have bigger cost, so avoiding that.
        data = data instanceof Object ? JSON.stringify(data) : data;
        // Don't comment this, when native library crashes, it gives us some invalid JSON (contains \n character), at that time JSON parsing error happens.
        data = data.replace(/\\n/g, "\\n")
                .replace(/\\"/g, '&#34;')
                .replace(/\\/g, '&#92;')
                .replace(/\\'/g, '&#39;')
                .replace(/\\&/g, '&#38;')
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
        //remove non-printable and other non-valid JSON chars
        data = data.replace(/[\u0000-\u0019]+/g, "");

        var response = JSON.parse(data);

        console.log(JSON.stringify(response));
        if (response["type"] === "requestResponse") {
            $scope.parseRequestResponse(response);
        }
        else if (response["type"] === "notification") {
            $scope.parseNotification(response);

            // On changing popup window <-> full screen <-> multi window, set base font size again
            if (angular.isDefined(response["popupwindow"])) {
                setBaseFont();
            }
        }
        else if (response["type"] === "initial") {
            initialLaunch = true;
            if (angular.isDefined(response["locationName"])) {
                $scope.locationName = response["locationName"] || '';
            }

            if (angular.isDefined(response["roomName"])) {
                $scope.roomName = response["roomName"] || '';
            }

            if (angular.isDefined(response["isOCFDevice"])) {
                $scope.isOCFDevice = response["isOCFDevice"];
            }
            if (angular.isDefined(response["peerId"]) && angular.isDefined(response["deviceUuid"])) {
                $scope.peerId = response["peerId"];
                $scope.deviceUuid = response["deviceUuid"];
                $scope.isFilterPaySupported = response["filterpay"];
                $scope.supportCalling = response["supportCalling"];
                $scope.is24HourFormat = response["is24HourFormat"];
                if (angular.isDefined(response["appVersion"])) {
                    $scope.appVersionInitial = response["appVersion"];
                }

                if (angular.isDefined(response["deviceType"])) {
                    $scope.deviceTypeInitial = response["deviceType"];
                }
                if (angular.isDefined(response["deviceName"])) {
                    $scope.deviceNameInitial = response["deviceName"];
                }
                if (angular.isDefined(response["errorCode"])) {
                    $scope.demoErrorCode = response["errorCode"];
                }
                if (!hasInitialReceived) {
                    hasInitialReceived = true;
                    if (response["demoMode"]) {
                        $scope.isStatic = true;
                        $scope.parseStaticData();
                    }
                    (devType === "Airconditioner" || devType === 'Washer') && $scope.handleInitialResponse();
                }
            }
        } else if (response["type"] === "requestFailed") {

            if (response["status"] === STCONST.STATUS_401 || response["status"] === STCONST.STATUS_MINUS1) {
                // Status 401 is coming when we get message "your token is not allowed"
                showConnectionFailurePopup();
            }
            else
            {
                $scope.requestFailHandler(response);
            }
        } else if (response["type"] === "requestAccepted") {
            $scope.parseRequestAccepted(response);
        }
        else if (response["type"] === "requestDenied") {
            //debugMessage("request Denied!!!!!!!!!!");
            if (response["error"] === "ENERGY_DB_DOES_NOT_EXIST") {
                $scope.fetchDBfromDevice();
            } else {
                $scope.requestFailHandler(response);
            }
        }
        else if (response["type"] === "connectionerror") {
            showConnectionFailurePopup();
        }
        else if (response["type"] === "keyBoardEvent") {
            this.handleKeyEvents(response["keyBoardAction"], response["keyBoardCode"]);
        }
        else {
            ;// Nothing
        }

        loadingFinished();
    };
    this.handleKeyEvents = function (action, keycode) {
        if (action === KEYCODE.ACTION_DOWN) {
            if (keycode === KEYCODE.CTRL) {
                ctrlKey = true;
            } else if (keycode === KEYCODE.PAGE_DOWN || keycode === KEYCODE.PAGE_UP || keycode === KEYCODE.DOWN || keycode === KEYCODE.UP) {
                scope.handleKeyAction(keycode);
            }
        } else if (action === KEYCODE.ACTION_UP) {
            if (keycode === KEYCODE.MENU || (ctrlKey && keycode === KEYCODE.ESC)) {
                scope.handleKeyAction(KEYCODE.MENU);
                ctrlKey = false;
            } else if (keycode === KEYCODE.PAGE_DOWN || keycode === KEYCODE.PAGE_UP || keycode === KEYCODE.DOWN || keycode === KEYCODE.UP) {
                // Ignore event in this case, as it is handled in down event
            } else {
                scope.handleKeyAction(keycode);
            }
        }
    };

    this.sendSHPCommand = function (type, param1, param2, isLoading, fallBackTime) {
        console.log("type = " + type + ", url = " + param2);
        console.log("payload = " + param1);
        scope.loadingBar = isLoading === false ? false : true;  //Lokesh 04Nov15_0347 -> default value should be true. if parameter not sent or not boolean or true, assign true.
        scope.currentSHPCommand = param1;

        //debugMessage("param1::"+param1+":::param2:::"+param2);
        initialTime = new Date();
        var _that_ = this;
        var duration = fallBackTime || STCONST.MAX_TIME_INTERVAL;

        if (type === STCONST.PUT) {
            nativeInterface.putDataOnResourceUrl(param1, param2);
        } else if (type === STCONST.GET) {
            nativeInterface.getResourceUrl(param1);
        } else if (type === STCONST.POST) {
            nativeInterface.postDataOnResourceUrl(param1, param2);
        } else if (type === STCONST.DELETE) {
            if (param2 !== undefined) {
                nativeInterface.deleteResourceUrl(param1, param2);
            } else {
                nativeInterface.deleteResourceUrl(param1);
            }
        } else if (type === STCONST.RUNONNATIVE) {
            nativeInterface.runOnNative(param1, param2);
        }
        else {//SONAR ISSUE
            //NULL
        }

        stopVar = setInterval(function () {
            timeDiff = new Date() - initialTime;
            //console.log("timeDiff: " + timeDiff + " duration: " + duration);
            if (timeDiff > duration) {
                scope.loadingBar = false;
                if (!secondRequestFailed) {
                    secondRequestFailed = true;
                    _that_.clearStopVarArray();
                    if (_that_ !== null) {
                        debugMessage("in the get Device 20 sec");
                        scope.checkResponse = [];
                        _that_.handle20SecondCase(type, param1, param2, isLoading);
                    }
                } else if (secondRequestFailed) {
                    debugMessage("In the second request true");
                    scope.$apply(function () {
                        debugMessage("in the connection failure pop-up 20 sec");
                        showConnectionFailurePopup();
                    });
                }
                else {//SONAR ISSUE
                    //NULL
                }
                _that_ = null;
            }
        }, STCONST.MIN_TIME_INTERVAL);  //Lokesh 16Nov15_1412 -> if fallback time is sent, use that. Otherwise use default time.
        stopVarArray.push(stopVar);
    };

    this.clearStopVarArray = function () {
        clearInterval(stopVar);
        stopVarArray.forEach(function (value) {
            clearInterval(value);
            stopVarArray.splice(stopVarArray.indexOf(value), 1); // After clearing the interval, remove set interval id from array
        });
    };

    // Handle after 20 seconds case here for each GET request, add more cases if required later
    this.handle20SecondCase = function (type, param1, param2, isLoading) {
        if (type === STCONST.GET && angular.isDefined(param1)) {
            if (param1.indexOf("/information") !== -1) {
                this.sendSHPCommand(STCONST.GET, param1, "", false);
            } else if (param1.indexOf("/actions") !== -1) {
                isLoading && scope.checkResponse.push(STCONST.SCHEDULEDATA);
                this.sendSHPCommand(STCONST.GET, param1, "", isLoading);
            } else if (param1.indexOf("/configuration") !== -1) {
                this.sendSHPCommand(STCONST.GET, param1, "", false);
            } else {
                scope.callGetDevice();
            }
        } else {
            scope.callGetDevice();
        }
    };

    // todo : necessary code?
    this.loadSVG = function (svgPath, svg, title) {
        if (!angular.isDefined(svgPath)) {
            return;
        }
        if (!angular.isDefined(svgCache)) {
            var svgCache = {};
        }
        if (svg && /svg/i.test(svg.nodeName)) {

            //if (polyfill && (!validate || validate(src, svg, use))) {
            var url = svgPath.split("#"), url_root = url[0], url_hash = url[1];
            if (url_root.length) {
                var xhr = svgCache[url_root] = svgCache[url_root] || new XMLHttpRequest();
                xhr.s || (xhr.s = [], xhr.open("GET", url_root), xhr.send()), xhr.s.push([svg, url_hash]),
                        xhr.onreadystatechange = function () {
                            if (4 === xhr.readyState) {
                                var x = document.createElement("x");
                                x.innerHTML = xhr.responseText, xhr.s.splice(0).map(function (array) {
                                    //embed(array[0], x.querySelector("#" + array[1].replace(/(\W)/g, "\\$1")));
                                    var g = x.querySelector("#" + array[1].replace(/(\W)/g, "\\$1"));
                                    if (g) {
                                        var viewBox = !svg.getAttribute("viewBox") && g.getAttribute("viewBox"), fragment = document.createDocumentFragment(), clone = g.cloneNode(!0);
                                        for (viewBox && svg.setAttribute("viewBox", viewBox); clone.childNodes.length; ) {
                                            fragment.appendChild(clone.firstChild);
                                        }

                                        var fc = svg.firstChild;
                                        while (fc) {
                                            svg.removeChild(fc);
                                            fc = svg.firstChild;
                                        }
                                        svg.appendChild(fragment);

                                        // Add title to svg tag
                                        if (title !== undefined) {
                                            svgTitle.textContent = title;
                                            if (!svg.contains(svgTitle)) {
                                                svg.appendChild(svgTitle);
                                            }
                                        }
                                    }
                                });
                            }
                        }, xhr.onreadystatechange();
            } else {
                //embed(svg, document.getElementById(url_hash));
            }
            //}
        }

    };

    this.parseInformationResponse = function ($scope, information, separator) {
        if (angular.isDefined(information.Versions) && information.Versions.length > 0) {
            $scope.newVersionAvailable = false;
            $scope.versionUpdateRequestId = 0;
            $scope.firmwareVersion = "";
            information.Versions.forEach(function (item, index, array) {
                if (item.hasOwnProperty('newVersionAvailable') && item.newVersionAvailable === true) {
                    $scope.newVersionAvailable = true;
                    $scope.versionUpdateRequestId = item.id;
                }

                // prepare firmware version
                if (item.hasOwnProperty('number') && item.number !== 'Unknown') {
                    var tempSeparator = angular.isDefined(separator) ? separator : "<br>"
                    $scope.firmwareVersion += (index === array.length - 1) ? item.number : item.number + tempSeparator;
                }
            });

            if ($scope.newVersionAvailable) { //$scope.newVersionAvailable === true - show OTN popup
                var lastOTNPopupTimestamp = getLocalStorageData($scope.deviceUuid + '_OTN_TIMESTAMP');
                // Display OTN popup on the first launch OR after every 6 hours if new version available
                if ((lastOTNPopupTimestamp !== null && (Math.abs(new Date().getTime() - lastOTNPopupTimestamp) / 3600000) > 6) || !lastOTNPopupTimestamp) {
                    $scope.showOTNPopup();
                }
            }
        }
    };

    function showConnectionFailurePopup() {
        scope.showConnectionFailurePopup();
        _that.clearStopVarArray();
    }

    function loadingFinished() {
        if (!!!scope.loadingBar) { // No loading bar means request handled properly. So, clear array.
            _that.clearStopVarArray();
            secondRequestFailed = false;
        }
    }
});

app.directive('countryListItemLoaded', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            $(element).hide();
            $timeout(function () {
                $(element).show();
                $(element).addClass('force-render-country-list');
            }, 400);
        }
    };
});

app.service('CountryService', function ($http, $sce, $timeout) {
    var scope = angular.element(document.body).scope();
    this.getCountryList = function () {
        var i;
        $http.get('common/country_list.json').success(function (data) {
            //console.log("country data", data);
            scope.noSearchedData = false;
            if (angular.isDefined(data["country_list"])) {
                var mCountryList = [];
                mCountryList = data["country_list"];
                scope.mOriginalCountryObject = mCountryList;
                scope.mCountryNameList = [];
                for (i = 0; i < mCountryList.length; i++) {
                    var mName = scope.translationCommon[mCountryList[i].country];
                    scope.countryListDetail.push(mName);
                    scope.mCountryNameList.push(mName);
                }
            }
        });
    };

    this.initCountrySearchText = function () {
        scope.countryToBeSearched = "";
        scope.mCountryList = scope.countryListDetail;
        this.loadSelectedCountry();
    };

    this.getCountryCode = function (country) {
        var i;
        for (i = 0; i < scope.mOriginalCountryObject.length; i++) {
            var mCountry = scope.mOriginalCountryObject[i].country;
            if (country === scope.translationCommon[mCountry]) {
                mCountry = mCountry.slice(mCountry.length - 2, mCountry.length);
                return mCountry.toUpperCase();
            }
        }
    };

    this.getSupportNumber = function (country) {
        var i;
        for (i = 0; i < scope.mOriginalCountryObject.length; i++) {
            if (country === scope.translationCommon[scope.mOriginalCountryObject[i].country]) {
                return i;
            }
        }
    };

    this.searchUpdatedValues = function () {
        scope.noSearchedData = false;
        var element = document.getElementById("countrySearchId");
        if (element) {
            scope.countryToBeSearched = document.getElementById("countrySearchId").value;
        }
        //console.log("countryName", scope.countryToBeSearched);
        scope.mCountryList = performSearchOperation(scope.countryToBeSearched, scope.countryListDetail);
        if (scope.mCountryList.length === 0) {
            scope.noSearchedData = true;
        } else {
            scope.noSearchedData = false;
        }
        //console.log("Updated Country List", scope.mCountryList);
    };


    this.hightlightSearchText = function (text) {
        if (scope.countryToBeSearched) {
            var parser = new DOMParser,
                    dom = parser.parseFromString('<!doctype html><body>' + text, 'text/html'),
                    decodedString = dom.body.textContent;
            text = decodedString.replace(new RegExp('(' + scope.countryToBeSearched + ')', 'i'), '<span class="highlighted">$1</span>');
        }
        return $sce.trustAsHtml(text);
    };


    this.isCountryExists = function () {
        var isCountryListShownBefore = getLocalStorageData('countryListOpen');
        //console.log("Already selected country", isCountryListShownBefore);
        if (isCountryListShownBefore === null || angular.isUndefined(isCountryListShownBefore) || isCountryListShownBefore === '') {
            return false;
        }
        return true;
    };

    this.setCountryData = function (countryName) {
        scope.selectedCountry = this.getCountryCode(countryName);
        if (angular.isDefined(scope.selectedCountry)) {
            scope.selectedCountryData = scope.translationCommon["CONMOB_country_" + (scope.selectedCountry.toLowerCase())];
        }
        scope.serviceCenterNumber = scope.mOriginalCountryObject[this.getSupportNumber(countryName)].support_number;
        //console.log("Country selected :" + scope.selectedCountry + ", Support Number :" + scope.serviceCenterNumber);
        if (angular.isDefined(scope.selectedCountry)) {
            setLocalStorageData('countryListOpen', scope.selectedCountry.trim());
        }
        setLocalStorageData('serviceCenterNumber', scope.serviceCenterNumber);
    };

    this.loadSelectedCountry = function () {
        var isCountryListShownBefore = getLocalStorageData('countryListOpen');
        if (isCountryListShownBefore !== null) {
            scope.selectedCountry = isCountryListShownBefore;
            scope.selectedCountryData = scope.translationCommon["CONMOB_country_" + (isCountryListShownBefore.toLowerCase())];
            debugMessage("Selected Country: " + scope.selectedCountry);
        }
        var serviceCenterNumberValue = getLocalStorageData('serviceCenterNumber');
        if (serviceCenterNumberValue !== null) {
            scope.serviceCenterNumber = serviceCenterNumberValue;
        }
    };

    this.scrollToSelectedCountry = function () {
        $timeout(function () {
            document.getElementById("countrySearchId").placeholder = "       " + scope.translationCommon.WEBMOB_common_search;
        }, 400);
        if (angular.isUndefined(scope.selectedCountryData) || scope.selectedCountryData === null || scope.selectedCountryData === '') {
            return;
        }
        var index = this.getSupportNumber(scope.selectedCountryData);
        if (index > 0) {
            $timeout(function () {
                document.getElementById(index).scrollIntoView();
            }, 900);
        }
    };

    this.clearSearchInputData = function () {
        scope.countryToBeSearched = "";
        var element = document.getElementById("countrySearchId");
        if (element) {
            element.value = '';
        }
        this.searchUpdatedValues();
    };
});

app.service('DBService', function ($q) {
    this.readDB = function (DBfilePath) {
        var deferred = $q.defer();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', DBfilePath, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function () {
            var uInt8Array = new Uint8Array(this.response);
            var db = new SQL.Database(uInt8Array);
            deferred.resolve(db);

        };
        xhr.send();
        return deferred.promise;
    };
});

// call back from native
function nativeCallback(response) {
    //console.log('Response ::: ' + response);
    if (nativeCallBackTimer) {
        clearTimeout(nativeCallBackTimer);
    }
    nativeCallBackTimer = setTimeout(function () {
        var scope = angular.element(document.getElementById("bodyTag")).scope();
        if (!!scope) {
            scope.$apply(function () {
                scope.updateDeviceData(response);
            });
        }
    }, 0);
}

//ST Functions
var ST_URL = window.location.host;
var nowURL = "graph.api.DASmartHomeDevice.com";
var _stImageUrl = "";
function setBaseFont() {
    var cWidth = document.body.clientWidth || window.innerWidth;
    var baseFontSize = (80 * cWidth) / 1440;
    document.getElementById("htmlTag").style.fontSize = baseFontSize + "px";
}

function getBaseFont() {
    var cWidth = document.body.clientWidth || window.innerWidth;
    return (80 * cWidth) / 1440;
}

function getLocalStorageData(item) {
    if (typeof (Storage) !== "undefined") {
        return localStorage.getItem(item);
    } else {
        // Sorry! No Web Storage support..
    }
}

function setLocalStorageData(item, value) {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem(item, value);
    } else {
        // Sorry! No Web Storage support..
    }
}

function removeLocalStorageData(item) {
    if (typeof (Storage) !== "undefined") {
        localStorage.removeItem(item);
    } else {
        // Sorry! No Web Storage support..
    }
}

app.directive('resizeText', ['$window', 'UtilityService', function ($window, UtilityService) {
        return {
            restrict: 'A',
            scope: {
                rtTargetPct: '@', //available space in percent.
                rtTargetPx: '@', //available space in pixels.
                rtFontClass: '@',
                rtMultilineCls: '@',
                rtSinglelineCls: '@',
                rtDisable: '@',
                rtDisableCls: '@',
                model: '=ngModel',
                rtSetWidth: '@',
                rtApplyMarginTop: '@',
                rtTest: '@',
                rtAuto: '@'
            },
            link: function (scope, element, attrs) {
                var elem = element[0];
                //watch value to change
                scope.$watch('model', setCls);
                attrs.$observe('rtDisable', disableText);
                scope.$watch(function () {
                    return elem.innerHTML;
                }, setCls);

                function setCls() {
                    if (elem.innerHTML === "") {
                        return;
                    }
                    var availSize,
                            oldWidth,
                            targetPct = scope.rtTargetPct,
                            targetPx = scope.rtTargetPx,
                            style = elem.style,
                            fontClass = scope.rtFontClass,
                            singleLineClass = scope.rtSinglelineCls,
                            multiLineClass = scope.rtMultilineCls,
                            calcWidth,
                            fontSize,
                            deviceWidth = Math.max($window.innerWidth, screen.width),
                            defaultElemWidth = Math.ceil(0.6 * deviceWidth),
                            applyMarginTop = scope.rtApplyMarginTop === 'false' ? false : true;

                    //remove multiline class, if already there.
                    element.removeClass(multiLineClass);

                    /**
                     * @author: Lokesh Sharma
                     * @date_time: 29-Dec-2015_1117
                     * @description We have added margin top to counter an issue
                     * whose description is provided below in this function. One
                     * side effect has been observed of that fix. The side effect
                     * is: The marginTop is set permanenty and is of highest priority,
                     * because its inline style. When the text is changed and is
                     * of higher / lower width, this marginTop must not be applied.
                     * Instead a new margin as per class added, should be applied.
                     * To nullify previously added margin, we are removing
                     * singleLineClass if added earlier and removing marginTop
                     * explicitly. The singleLineClass will be added again, so
                     * that the marginTop will be applied from this class only.
                     */
                    element.removeClass(singleLineClass);
                    style.marginTop = "";
                    style.width = "";

                    //add single line class, if not there.
                    element.addClass(singleLineClass);
                    $window.getComputedStyle(elem); //used to allow browser to apply provided style.

                    //get element's current width.
                    calcWidth = Math.ceil(parseFloat(style.width));
                    oldWidth = style.width;
                    if (!!!calcWidth) {
                        calcWidth = 0;
                    }

                    //is target % provided?
                    if (!!targetPct) {
                        // space available in %. convert it to pixels.
                        availSize = Math.ceil(targetPct * deviceWidth);
                        logIt("availSize = " + availSize);
                    } else if (!!targetPx) {
                        availSize = calcWidth || defaultElemWidth; //fail safe

                        if (targetPx.indexOf("rem") > -1) {
                            fontSize = parseFloat(document.getElementById("htmlTag").style.fontSize);
                            targetPx = parseFloat(targetPx);

                            if (!!targetPx) {
                                availSize = Math.ceil(targetPx * fontSize);
                            }
                        } else if (targetPx.indexOf("px") > -1) {
                            targetPx = parseInt(targetPx, 10);

                            if (!!targetPx) {
                                availSize = targetPx;
                            }
                        } else {    //handle for SONAR.
                            //NULL
                        }
                    } else {
                        //proper available size in pix
                        //Otherwise, assume 60% space is available.
                        availSize = calcWidth || defaultElemWidth;
                    }

                    //assing auto value, so that actual width can be calculated.
                    if (scope.rtAuto && !UtilityService.parseBoolean(scope.rtAuto)) {
                        //style.width = 'auto';
                    } else {
                        style.width = 'auto';
                    }

                    //Add font class only when font is not available already.
                    if (!!!style.font && !!fontClass && elem.className.indexOf(fontClass) < 0) {
                        //font class provided
                        elem.className += " " + fontClass;
                    }

                    /**
                     * Lokesh 16Dec15_1401 -> SetTimout is causing problem.
                     * Cause :- Whenever there are more than 1 resize-text directives
                     *          used. The below function is called after a delay
                     *          because of SetTimeout(). The time, below function
                     *          is called (after the delay), the value of calcWidth
                     *          variable is overridden by further calls for initialization
                     *          of resize-text directive. For ex:- resize-text is
                     *          used for text 'AAAAAAA...' and 'BBBBBB....'. The
                     *          directive is called for 'AAAAAAA...', so the 'calcWidth'
                     *          is supposed to carry calculated width for 'AAAAAAA...'.
                     *          But, because of timeout, initialization of resize-text
                     *          for 'BBBBBB....' is started and therefore 'calcWidth'
                     *          will carry calcualted width of 'BBBBBB....' instead
                     *          of 'AAAAAAA...' (as inteded because the setTimeout()
                     *          was called from initialization of 'AAAAAAA...').
                     *          This is causing issues.
                     * Solution :- Committed the SetTimeout() and let the control flow go ahead.
                     */
                    //                  setTimeout(function () {
                    //if text width is more than available width

                    if (elem.clientWidth > (calcWidth || availSize)) {//for text only case
                        // remove previously added single line class.
                        element.removeClass(singleLineClass);

                        //add multiline class
                        element.addClass(multiLineClass);

                        /**
                         * @author Lokesh Sharma
                         * @date 24Dec15_1518
                         * @description The font size in single line class is
                         * higher than that of multiline class (Usually 100: 75
                         * ratio). The text whose width was higher than threshold,
                         * when single line class was applied, has just come
                         * under the threshold after applying multiline class gives
                         * unpleasant UI. To tackle such situation, we again
                         * calculate width of text after applying multiline class.
                         * If the width is under bounds, then we apply a margin
                         * to bring the text in the middle of the (parent) container.
                         */
                        var compStyle = $window.getComputedStyle(elem);

                        /**
                         * author Lokesh Sharma
                         * @date 04Jan16_1634
                         * @description Using '<' symbol because width
                         * should be at least 1 pixel lesser to fit in same line.
                         */

                        if (applyMarginTop && (parseInt(compStyle.width) < (calcWidth || availSize))) {
                            var parentStyle = $window.getComputedStyle(elem.parentElement);
                            elem.style.marginTop = (parseInt(parentStyle.height) - parseInt(compStyle.fontSize)) / 2;
                        }
                        //re-assign width.
                        if (!!scope.rtSetWidth && !UtilityService.parseBoolean(scope.rtSetWidth)) {
                            style.width = oldWidth || '';
                        } else {
                            style.width = (calcWidth || availSize);
                        }

                    } else {
                        //if width-set flag is false, re-assign width if available, otherwise leave it blank.
                        if (!!scope.rtSetWidth && !UtilityService.parseBoolean(scope.rtSetWidth)) {
                            style.width = oldWidth || '';
                        }

                        element.removeClass(multiLineClass);
                        element.addClass(singleLineClass);
                    }
                    //                }, 200);
                }

                function logIt(log) {
                    if (scope.rtTest) {
                        console.log("text = " + elem.innerHTML + " && log = " + log);
                    }
                }
                //enable /disable text.
                function disableText() {
                    if (UtilityService.parseBoolean(scope.rtDisable)) {
                        element.addClass(scope.rtDisableCls);
                    } else {
                        element.removeClass(scope.rtDisableCls);
                    }
                }
            } //close link function.
        }; //close return object.
    }]); //close directive.

app.directive('rtFixedWidth', ['$window', 'UtilityService', function ($window, UtilityService) {
        return {
            restrict: 'A',
            scope: {
                rtMultilineCls: '@',
                rtSinglelineCls: '@',
                rtDisable: '@',
                rtDisableCls: '@',
                model: '=ngModel',
                rtChangeFontSize: '@',
                rtMinFontSize: '@', //should be same as what is given in multi line class.
                rtMaxWidth: '@'
            },
            link: function (scope, element, attrs) {
                var elem = element[0];
                //watch value to change
                scope.$watch('model', setCls);
                attrs.$observe('rtDisable', disableText);
                scope.$watch(function () {
                    return elem.innerHTML;
                }, setCls);

                function setCls() {
                    if (elem.innerHTML === "") {
                        return;
                    }
                    var style = elem.style,
                            fontClass = scope.rtFontClass,
                            singleLineClass = scope.rtSinglelineCls,
                            multiLineClass = scope.rtMultilineCls,
                            fontSize = parseFloat(document.getElementById("htmlTag").style.fontSize),
                            changeFontSize = scope.rtChangeFontSize === 'false' ? false : true,
                            compStyle,
                            minFont = scope.rtMinFontSize && Math.ceil(parseFloat(scope.rtMinFontSize) * fontSize),
                            maxWidth = scope.rtMaxWidth && Math.floor(parseFloat(scope.rtMaxWidth) * fontSize);

                    //remove classes, if already there.
                    element.removeClass(multiLineClass);
                    element.removeClass(singleLineClass);

                    //remove font size applied, if any.
                    elem.style.fontSize = "";

                    //remove pseudo styles.
                    removeAddOnStyles();

                    //add single line class, if not there.
                    element.addClass(singleLineClass);

                    //add pseudo styles for calculations.
                    style.overflow = "hidden";
                    style.whiteSpace = 'nowrap';

                    //Add font class only when font is not available already.
                    if (!!!style.font && !!fontClass && elem.className.indexOf(fontClass) < 0) {
                        //font class provided
                        elem.className += " " + fontClass;
                    }

                    maxWidth = maxWidth || elem.clientWidth;
                    if (elem.scrollWidth > maxWidth) {//for text only case
                        var currFontSize;

                        if (changeFontSize && minFont) { //minFont should not be 0.
                            compStyle = $window.getComputedStyle(elem);
                            do {
                                compStyle = $window.getComputedStyle(elem);
                                currFontSize = parseInt(compStyle.fontSize) - 1;
                                elem.style.fontSize = currFontSize + "px";
                            } while ((elem.scrollWidth > elem.clientWidth) && (currFontSize > minFont))
                        }

                        if (elem.scrollWidth > maxWidth) {
                            //remove font size.
                            elem.style.fontSize = "";

                            // remove previously added single line class.
                            element.removeClass(singleLineClass);

                            //add multiline class
                            element.addClass(multiLineClass);
                        }
                    }
                    //remove pseudo styles.
                    removeAddOnStyles();
                }

                function removeAddOnStyles() {
                    elem.style.overflow = "";
                    elem.style.whiteSpace = "";
                }

                //enable /disable text.
                function disableText() {
                    if (UtilityService.parseBoolean(scope.rtDisable)) {
                        element.addClass(scope.rtDisableCls);
                    } else {
                        element.removeClass(scope.rtDisableCls);
                    }
                }
            } //close link function.
        }; //close return object.
    }]); //close directive.

app.directive('resizeBtn', ['$window', function () {
        return {
            restrict: 'A',
            scope: {
                rbMultilineCls: '@',
                rbSinglelineCls: '@',
                rbCharCnt: '@',
                rbText: '@'
            },
            link: function (scope, element, attr) {
                //observe value for change
                attr.$observe('rbText', setCls);
                element.addClass("Regular");
                function setCls() {
                    var charCnt = parseInt(scope.rbCharCnt),
                            text = scope.rbText,
                            singleLineCls = scope.rbSinglelineCls,
                            multiLineCls = scope.rbMultilineCls;

                    if (charCnt < text.length) {
                        element.removeClass(singleLineCls);
                        element.addClass(multiLineCls);
                    } else {
                        element.removeClass(multiLineCls);
                        element.addClass(singleLineCls);
                    }
                }
            } //close link function.
        }; //close return object.
    }]); //close directive.

app.directive("switchOnOff", ['$timeout', 'UtilityService', function ($timeout, UtilityService) {
        return {
            restrict: 'AE',
            scope: {
                stOnText: '@',
                stOffText: '@',
                stDataOnText: '=',
                stDataOffText: '=',
                stTextDisabledCls: '@',
                stBgDisabledCls: '@',
                stEnabled: '=',
                model: '@',
                control: '='
            },
            template: '<div class="switch"> \
                            <div class="toggle-switch draw-round off-state">	 \
                                <div class="toggle-state"> \
                                    <div class="cir"></div> \
                                    <span class="off-txt"></span> \
                                </div>	\
                            </div> \
                        </div>',
            link: function (scope, element, attrs) {
                var util = UtilityService,
                        clickAction = attrs.ngClick,
                        txtDisabledCls = scope.stTextDisabledCls,
                        bgDisabledCls = scope.stBgDisabledCls,
                        elem = element[0],
                        elemSpan = angular.element(elem.querySelector('.toggle-state span')),
                        elemCirc = angular.element(elem.querySelector('.cir')),
                        elemTS = angular.element(elem.querySelector('.toggle-state')),
                        elemSW = angular.element(elem.querySelector('.toggle-switch')),
                        txtOn,
                        txtOff,
                        defaultBoolean,
                        currentVal;
                init();
                elemSpan.addClass("Regular");
                attrs.$set('control', {
                    reInit: function () {
                        reInit();
                    }
                });

                attrs.$observe('stOnText', function () {
                    init();
                });
                attrs.$observe('stOffText', function () {
                    init();
                });

                scope.$watch('stEnabled', toggleDisableClasses);

                attrs.$observe('model', function (newValue) {
                    reInit(newValue);
                });

                //add click event.
                element.bind('click', function () {
                    if (isSTDisabled()) {
                        return;
                    }
                    util.showElem(elemCirc);
                    elemCirc.addClass('cir-scale');
                    switchOpt();
                    //call default ng-click if any.
                    if (!!clickAction) {
                        scope.$eval(clickAction);
                    }
                });

                function reInit(newVal) {
                    defaultBoolean = newVal;
                    initializeSwitch();
                }

                function init() {
                    txtOn = scope.stOnText || scope.stDataOnText;
                    txtOff = scope.stOffText || scope.stDataOffText;
                    defaultBoolean = scope.model;

                    initializeSwitch();
                }

                function initializeSwitch() {
                    currentVal = !util.parseBoolean(defaultBoolean);
                    switchOpt(true);

                    if (isSTDisabled()) {
                        toggleDisableClasses();
                    }
                }

                function switchOpt(skipDisabled) {
                    if (!!!skipDisabled && isSTDisabled()) {
                        //if element is disabled. Don't do anything.
                        return;
                    }

                    if (currentVal) {
                        elemSW.removeClass('on-state');
                        elemSW.addClass('off-state');

                        textOn();
                    } else {
                        elemSW.removeClass('off-state');
                        elemSW.addClass('on-state');

                        textOff();
                    }
                }

                function textOn() {

                    $timeout(function () {
                        elemSpan.html(txtOff);

                        elemSpan.removeClass('on-txt');
                        elemSpan.removeClass('on-txt-anim');
                        elemSpan.addClass('off-txt');
                        elemSpan.addClass('off-txt-anim');

                        $timeout(function () {
                            elemTS.removeClass('color-ch-on');
                            elemTS.addClass('color-ch-off');

                            //Lokesh 21Oct15_1022 -> The code is giving further bugs. Hence, commented for time being.
//                            $timeout(function() {
//                                //remove animation classes after animation is done.
//                                removeAnimClasses();
//                            }, 1000);
                            if (isSTDisabled()) {
                                toggleDisableClasses();
                            }
                        }, 200);
                        util.hideElem(elemCirc);
                    }, 500);
                }

                function textOff() {
                    $timeout(function () {
                        elemSpan.html(txtOn);

                        elemSpan.removeClass('off-txt');
                        elemSpan.removeClass('off-txt-anim');
                        elemSpan.addClass('on-txt');
                        elemSpan.addClass('on-txt-anim');

                        $timeout(function () {
                            elemTS.removeClass("color-ch-off");
                            elemTS.addClass("color-ch-on");

                            //Lokesh 21Oct15_1022 -> The code is giving further bugs. Hence, commented for time being.
//                             $timeout(function() {
//                                 //remove animation classes after animation is done.
//                                removeAnimClasses();
//                            }, 1000);
                            if (isSTDisabled()) {
                                toggleDisableClasses();
                            }
                        }, 200);
                        util.hideElem(elemCirc);
                    }, 500);
                }

                function isSTDisabled() {
                    return (angular.isDefined(scope.stEnabled) && !scope.stEnabled);
                }

                function toggleDisableClasses() {
                    if (isSTDisabled()) {
                        elemTS.removeClass('color-ch-on');
                        elemTS.removeClass('color-ch-off');
                        elemTS.addClass(bgDisabledCls);
                        elemSpan.addClass(txtDisabledCls);
                    } else {
                        elemTS.removeClass(bgDisabledCls);
                        elemSpan.removeClass(txtDisabledCls);

                        if (elemSpan.html() === txtOn) {
                            elemTS.addClass('color-ch-on');
                        } else {
                            elemTS.addClass('color-ch-off');
                        }
                    }
                }

                //remove animation related classes.
                function removeAnimClasses() {
                    if (elemTS.hasClass('color-ch-on')) {
                        elemTS.addClass('color-ch-on-bg');
                    } else {
                        elemTS.removeClass('color-ch-on-bg');
                    }
                    elemTS.removeClass('color-ch-on');
                    elemSpan.removeClass('on-txt-anim');
                    elemTS.removeClass('color-ch-off');
                    elemSpan.removeClass('off-txt-anim');
                }
            }   //close link function.
        };  //close return object.
    }]);    //close directive.

app.service("UtilityService", utilityService);

function utilityService() {
    var _this = this;

    var isAnimRunning = false,
            scope = angular.element(document.getElementById("bodyTag")).scope();

    /*************utilities declaration starts here ************************/
    _this.getTextWidth = getTextWidth;
    _this.toggleAnimClass = toggleAnimClass;
    _this.toggleOnOffClass = toggleOnOffClass;
    _this.changePopUpClass = changePopUpClass;
    _this.isAnimating = isAnimating;
    _this.addCSSClass = addCSSClass;
    _this.removeCSSClass = removeCSSClass;
    _this.showElem = showElem;
    _this.hideElem = hideElem;
    _this.toggleCSSClass = toggleCSSClass;
    _this.parseBoolean = parseBoolean;
    _this.findKeyByValue = findKeyByValue;
    _this.isEventSupported = isEventSupported;
    _this.dismissLoadingBar = dismissLoadingBar;
    _this.toggleBottomPopUpClass = toggleBottomPopUpClass;
    _this.appendZero = appendZero;
    _this.getScope = getScope;
    _this.pad = pad;
    /*************utilities declaration ends here **************************/

    //function definitions start here

    /**
     * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
     *
     * @param {String} text The text to be rendered.
     * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
     *
     * @see http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
     */
    function getTextWidth(text) {
        // re-use canvas object for better performance
        var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
        var context = canvas.getContext("2d");
        canvas.style.font = "inherit";
        context.font = canvas.style.font;
        var metrics = context.measureText(text);
        return metrics.width;
    }

    function pad(num, width, padChar) {
        padChar = padChar || '0';   //default pad character is '0'
        num = num + ''; //convert to string
        return num.length >= width ? num : new Array(width - num.length + 1).join(padChar) + num;
    }

    function parseBoolean(value) {
        value = value + ""; //avoids failure b'coz of real boolean passed.
        return (typeof value === "undefined") ?
                false :
                // trim using jQuery.trim()'s source
                value.replace(/^\s+|\s+$/g, "").toLowerCase() === "true";
    }
    // Toggle class for body
    function toggleAnimClass(scope) {
        scope = scope || getScope();
        //change classes.
        if (scope.containSubCl === "containSub") {
            scope.containSubCl = "";
        } else {
            scope.containSubCl = "containSub";
        }
    }

    function toggleOnOffClass(scope) {
        scope = scope || getScope();
        if ((scope.toggleOnOff === "switch") || (scope.toggleOnOff === "switch switch-mm")) {
            scope.toggleOnOff = "switch switch-m";
        } else {
            scope.toggleOnOff = "switch switch-mm";
        }

    }

    // Toggle class for Mode drop down
    function changePopUpClass(scope) {
        scope = scope || getScope();
        if (scope.showModeSelectionPopup) {
            scope.ModeSelectionPopupDivCls = "ModeSelectionPopupDiv";
        } else {
            scope.ModeSelectionPopupDivCls = "ModeSelectionPopOutDiv";
        }
    }

    function isAnimating() {
        return isAnimRunning;
    }

    function addCSSClass(elem, className) {
        //if class not already there, then only add it.
        if (elem.className.indexOf(className) < 0) {
            elem.className += " " + className;
        }
    }

    function removeCSSClass(elem, className) {
        if (elem.className.indexOf(className) > -1) {
            elem.className = elem.className.replace(className, '');
        }
    }

    function showElem(elem) {
        elem.css('display', 'block');
    }

    function hideElem(elem) {
        elem.css('display', 'none');
    }

    function toggleCSSClass(elem, className) {
        if (elem.className.indexOf(className) < 0) {
            addCSSClass(elem, className);
        } else {
            removeCSSClass(elem, className);
        }
    }

    function findKeyByValue(obj, value) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (obj[prop] == value)   //== used explicitly. So, don't change it.
                    return prop;
            }
        }
    }

    //courtesy to Kangax
    //Detects if an event is supported on the target browser.
    function isEventSupported(eventName) {
        var TAGNAMES = {
            'select': 'input',
            'change': 'input',
            'submit': 'form',
            'reset': 'form',
            'error': 'img',
            'load': 'img',
            'abort': 'img'
        };
        var el = document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;
        var isSupported = (eventName in el);
        if (!isSupported) {
            el.setAttribute(eventName, 'return;');
            isSupported = typeof el[eventName] == 'function';   //leave == as it is. This is needed.
        }
        el = null;
        return isSupported;
    }

    function dismissLoadingBar(value, parentScope) {
        var localScope = parentScope || getScope();

        if (localScope.checkResponse.length === 0) {
            localScope.loadingBar = false;
            return;
        }

        if (!!localScope && !!localScope.checkResponse && localScope.checkResponse.indexOf(value) !== -1) {
            localScope.checkResponse.splice(localScope.checkResponse.indexOf(value), 1);
            if (localScope.checkResponse.length === 0) {
                localScope.loadingBar = false;
            }
        }
    }

    function toggleBottomPopUpClass(popupName, parentScope) {
        var localScope = parentScope || getScope();

        //debugMessage("  " + scope.BottomPopupDimBackgroundDiv);
        if (popupName) {
            localScope.BottomPopupDimBackgroundDiv = "BottomPopupDimBackgroundDivIn";
            localScope.BottomPopupDivCls = "BottomPopupBGIn";
        } else {
            localScope.BottomPopupDimBackgroundDiv = "BottomPopupDimBackgroundDivOut";
            localScope.BottomPopupDivCls = "BottomPopupBGOut";
        }
    }

    function appendZero(value) {
        return (value < 10 ? '0' : '') + value;
    }

    function getScope() {
        //first assign new value, then only return it. This assignment will be used later.
        scope = scope || angular.element(document.getElementById("bodyTag")).scope();
        return scope;
    }
}

function maxLengthCheck(object, maxLength) {
    var maxLen = maxLength || object.maxLength;
    if (object.value.length > maxLen) {
        object.value = object.value.slice(0, maxLen);
    }
}

var firstBy = function () {
    function n(n, t) {
        if ("function" != typeof n) {
            var r = n;
            n = function (n, t) {
                return n[r] < t[r] ? -1 : n[r] > t[r] ? 1 : 0
            }
        }
        return-1 === t ? function (t, r) {
            return-n(t, r)
        } : n
    }
    function t(t, u) {
        return t = n(t, u), t.thenBy = r, t
    }
    function r(r, u) {
        var f = this;
        return r = n(r, u), t(function (n, t) {
            return f(n, t) || r(n, t)
        })
    }
    return t
}();

app.directive("bouncyScroll", ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            scope: {
                innerWrapper: '@',
            },
            link: function (scope, element, attrs) {
                $(element).fancy_scroll({
                    innerWrapper: scope.innerWrapper,
                    animation: "bounce",
                    bounceDistance: 200,
                    animDuration: "0.2s",
                    animEasing: "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
                });
            }
        }
    }]);

app.directive("keypadTouch", ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            scope: {
                ktFocus: '@',
            },
            link: function (scope, element, attrs) {
                var f = function (event) {
                    $timeout(function () { // angular way, setTimeout is OK
                        input[0].focus();
                        event.preventDefault();
                    })
                };
                var mobile = false;
                element.on('click', function (event) {
                    if (mobile)
                        return;
                    f(event);
                });

                element.on('touchstart', function (event) {
                    mobile = true;
                    f(event);
                });

                element.on('touchend', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });
            }
        };
    }]);

app.directive("ngTouchstart", function () {
    return {
        controller: ["$scope", "$element", function ($scope, $element) {

                $element.bind("touchstart", onTouchStart);
                function onTouchStart(event) {
                    var method = $element.attr("ng-touchstart");
                    $scope.$event = event;
                    $scope.$apply(method);
                }

            }]
    };
});

app.directive("ngTouchmove", function () {
    return {
        controller: ["$scope", "$element", function ($scope, $element) {

                $element.bind("touchstart", onTouchStart);
                function onTouchStart(event) {
                    event.preventDefault();
                    $element.bind("touchmove", onTouchMove);
                    $element.bind("touchend", onTouchEnd);
                }
                function onTouchMove(event) {
                    var method = $element.attr("ng-touchmove");
                    $scope.$event = event;
                    $scope.$apply(method);
                }
                function onTouchEnd(event) {
                    event.preventDefault();
                    $element.unbind("touchmove", onTouchMove);
                    $element.unbind("touchend", onTouchEnd);
                }

            }]
    };
});

app.directive("ngTouchend", function () {
    return {
        controller: ["$scope", "$element", function ($scope, $element) {

                $element.bind("touchend", onTouchEnd);
                function onTouchEnd(event) {
                    var method = $element.attr("ng-touchend");
                    $scope.$event = event;
                    $scope.$apply(method);
                }

            }]
    };
});

app.directive('myFocus', function ($timeout) {
    return function (scope, element, attrs) {
        attrs.$observe('myFocus', function () {
            if (scope.$eval(attrs.myFocus)) {
                // Element needs to be visible to focus
                $timeout(function () {
                    element[0].focus();
                });
            }
        });
    };
});

app.directive('onLongPress', function ($timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $elm, $attrs) {
            var duration = $attrs.longPressDuration || 100;
            $elm.bind('touchstart', function () {
                $scope.longPress = true;

                if (longPressTimer) {
                    $timeout.cancel(longPressTimer);
                }
                longPressTimer = $timeout(function () {
                    if ($scope.longPress) {
                        $scope.$apply(function () {
                            $scope.$eval($attrs.onLongPress);
                        });
                    }
                }, duration);
            });

            $elm.bind('touchmove', function () {
                $scope.longPress = false;

                if ($attrs.onTouchMove) {
                    $scope.$apply(function () {
                        $scope.$eval($attrs.onTouchMove);
                    });
                }
            });

            $elm.bind('touchend', function () {
                $scope.longPress = false;
                if ($attrs.onTouchEnd) {
                    $scope.$apply(function () {
                        $scope.$eval($attrs.onTouchEnd);
                    });
                }
            });
            $elm.bind('touchleave', function () {
                $scope.longPress = false;
                if ($attrs.onTouchEnd) {
                    $scope.$apply(function () {
                        $scope.$eval($attrs.onTouchEnd);
                    });
                }
            });
            $elm.bind('touchcancel', function () {
                $scope.longPress = false;
                if ($attrs.onTouchEnd) {
                    $scope.$apply(function () {
                        $scope.$eval($attrs.onTouchEnd);
                    });
                }
            });
            $elm.bind('touchenter', function () {
                $scope.longPress = false;
                if ($attrs.onTouchEnd) {
                    $scope.$apply(function () {
                        $scope.$eval($attrs.onTouchEnd);
                    });
                }
            });
        }
    };
});

app.directive('stHold', function ($timeout, UtilityService) {
    return {
        restrict: 'A',
        link: function ($scope, $elm, $attrs) {
            var mouseEvts = {
                //'mousedown': touchStartFun,
                //'mouseenter': touchStartFun,
                'touchstart': touchStartFun,
                //'mouseup': touchEndFun,
                'touchend': touchEndFun,
                //'mouseleave': touchEndFun,
                'touchleave': touchEndFun,
                'touchcancel': touchEndFun,
                //'mousemove': touchMoveFun,
                'touchmove': touchMoveFun,
                //'mouseover': touchStartFun,
                //'mouseout': touchMoveFun
            },
                    evnt, stRelease = $attrs.stRelease, timer;
            for (evnt in mouseEvts) {
                if (mouseEvts.hasOwnProperty(evnt) &&
                        UtilityService.isEventSupported(evnt)) {
                    $elm.bind(evnt, mouseEvts[evnt]);
                }
            }
            function touchStartFun() {
                touchEndFun();
                if (!!$scope.longPress) {
                    return;
                }
                $scope.longPress = true;
                // Set a timeout for 450 ms for a long press and Start Long Press
                timer = $timeout(function () {
                    if ($scope.longPress) {
                        // applyFun touchend event
                        applyFun($attrs.stHold);
                    }
                }, 450);
            }
            function touchEndFun() {
                // Prevent the Long Press event if timer is already applied and touch-end called
                if (!!timer) {
                    $timeout.cancel(timer);
                }
                $scope.longPress = false;
                //  apply touch-end
                if (stRelease) {
                    applyFun(stRelease);
                }
            }
            function touchMoveFun(evt) {
                // apply touch-end if user moves out from area with press state 
                if (evt.touches !== undefined && evt.touches.length !== undefined) {
                    if ($elm[0] !== document.elementFromPoint(evt.touches[evt.touches.length - 1].clientX, evt.touches[evt.touches.length - 1].clientY)) {
                        $scope.longPress = false;
                        applyFun(stRelease);
                    }
                }
            }
            function applyFun(fun) {
                $scope.$apply(evalFun(fun));
            }
            function evalFun(fun) {
                $scope.$eval(fun);
            }
        }
    };
});

app.directive('onlyNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser() {
                var text = ngModelCtrl.$viewValue;
                var isNum = false;
                if (!!attr.type && (attr.type === 'number' || attr.type === 'tel')) {
                    text = text + "";
                    isNum = true;
                }
                var transformedInput = text.replace(/[^0-9]/g, '');
                if (text === "") {
                    transformedInput = "";
                }
                if (transformedInput !== text || text === "") {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                transformedInput = isNum ? parseInt(transformedInput) : transformedInput;
                return transformedInput;  // or return Number(transformedInput)
            }

            element.bind('keyup', fromUser);
            //ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

// fixme : remove the logic related to switchOnOffDragable directive since it's not used yet.
app.directive('ngClick', function ($timeout) {
    return {
        restrict: 'A',
        link: function ($scope, element, $attrs) {
            var timer;
            element.bind('click', clickFunction);

            function clickFunction(e) {
                //console.log("" + MATERIAL_DESIGN.LIST_ANIMATION_TIME);
                e.stopImmediatePropagation();// avoid parent click function
                /*Temporary fix - on IOS ngClick is fired twice -- https://github.com/angular/angular.js/issues/6251*/
                if (!!timer) {
                    // avoid click function multi click event
                    e.preventDefault();
                    return;
                }
                timer = $timeout(function () {
                    timer = null;
                }, 400);
                // apply click function click event
                //console.log("ngClick event fired");
                $scope.$eval($attrs.ngClick);
                $scope.$apply();
            }
        }
    };
});

// fixme : need to be fixed for GUI issue and duplicated event firing issues. then we can apply it.
app.directive("switchOnOffDragable", ['$timeout', 'UtilityService', function ($timeout, UtilityService) {
        var uniqueId = 1;
        return {
            restrict: 'AE',
            scope: {
                stOnText: '@',
                stOffText: '@',
                stTextDisabledCls: '@',
                stBgDisabledCls: '@',
                stEnabled: '@',
                model: '@',
                control: '@'
            },
            template: '<div class="switch" id="switchContainer_{{::uniqueId}}">\
                            <div class="OnOffSwitch">\
                                <div class="OnOffSwitchButton" id="switchButton_{{::uniqueId}}">\
                                    <span class="SwitchText"></span>\
                                </div>\
                            </div>\
                        </div>',
            link: function (scope, element, attrs) {
                scope.uniqueId = uniqueId++;
                var switchContainer = "#switchContainer_" + scope.uniqueId,
                        switchButton = "#switchButton_" + scope.uniqueId,
                        switchSpan = angular.element(element[0].querySelector('.OnOffSwitchButton span')),
                        listActualState,
                        listState,
                        txtOn,
                        txtOff,
                        listDrag,
                        noTranslate = true,
                        util = UtilityService,
                        currentWidth = window.screen.availWidth,
                        currentFontSize,
                        switchBoundry,
                        isDragable = scope.control || true;

                if (currentWidth === 0 || currentWidth == undefined) {
                    currentWidth = document.body.clientWidth;
                }

                currentFontSize = (80 * currentWidth) / 1440;
                switchBoundry = (70 * currentFontSize) / 80;

                // Trigger when number of children changes,
                // including by directives like ng-repeat
                scope.$watch(function () {
                    return element.children().length;
                }, function () {
                    // Wait for templates to render
                    scope.$evalAsync(function () {
                        // Finally, directives are evaluated
                        // and templates are renderer here
                        /*var children = element.children();
                         console.log(children);*/
                        init();
                    });
                });

                function init() {
                    txtOn = scope.stOnText || "ON";
                    txtOff = scope.stOffText || "OFF";
                    listActualState = scope.model;
                    listState = scope.model;
                    initializeSwitch();
                    attrs.$observe('stEnabled', toggleDisableClasses);
                    attrs.$observe('model', function (newValue) {
                        reInit(newValue);
                    });

                    attrs.$observe('control', checkDragable);
                    toggleDisableClasses();
                    checkDragable(isDragable);
                }

                function reInit(newVal) {
                    //console.log('reInit fired');
                    var value = util.parseBoolean(newVal);
                    if (!noTranslate && listState !== value) {
                        listState = value;
                        listActualStateHandler(listState);

                    }
                }

                function forceToggleSwitchState() {
                    //console.log('forceToggleSwitchState');
                    toggleSwitchState();
                }

                function initializeSwitch() {
                    listDrag = Draggable.create(switchButton, {
                        type: "x",
                        onDragEnd: function () {
                            var state = util.parseBoolean(($(switchButton).position().left > 9));
                            //console.log("Drag end called with state " + state + " >>>> old state is " + listState);
                            if (state != listState) {
                                //change state of switch and trigger click event
                                toggleSwitchState();
                                $(switchContainer).trigger("click");
                            }
                        },
                        bounds: {minX: 0, maxX: switchBoundry},
                        snap: {left: [0, switchBoundry]},
                        throwProps: true,
                        maxDuration: 0.4,
                        minDuration: 0.2
                    });
                    listActualStateHandler(listActualState);
                }

                function toggleSwitchState() {
                    listState = !util.parseBoolean(listState);
                    listActualStateHandler(listState);
                }

                function listEnableDrag() {
                    if (!isSTDisabled()) {
                        listDrag[0].enable();
                    }
                }

                function isSTDisabled() {
                    return (angular.isDefined(scope.stEnabled) && !util.parseBoolean(scope.stEnabled));
                }

                function checkDragable(isDragable) {
                    isDragable = util.parseBoolean(isDragable);
                    if (isDragable && !isSTDisabled()) {
                        listDrag[0].enable();
                    } else {
                        listDrag[0].disable();
                    }
                }

                function toggleDisableClasses() {
                    if (isSTDisabled()) {
                        //disable switch drag                     
                        listDrag[0].disable();
                        $('#switchButton_' + scope.uniqueId).addClass(scope.stBgDisabledCls);
                        $('#switchButton_' + scope.uniqueId + ' span').addClass(scope.stTextDisabledCls);
                    } else {
                        //enable switch
                        isDragable && listDrag[0].enable();
                        $('#switchButton_' + scope.uniqueId).removeClass(scope.stBgDisabledCls);
                        $('#switchButton_' + scope.uniqueId + ' span').removeClass(scope.stTextDisabledCls);
                    }
                }
                function listActualStateHandler(value) {
                    listDrag[0].disable();
                    var switchTranslateTime = 0.3;
                    if (noTranslate) {
                        noTranslate = false;
                        switchTranslateTime = 0;
                    }
                    if (util.parseBoolean(value)) {
                        listDrag[0].vars.bounds[1] = switchBoundry;
                        listDrag[0].vars.snap[1] = switchBoundry;
                        switchSpan.text(txtOn);
                        TweenMax.to(switchButton, 0.1, {css: {backgroundColor: "rgb(83,194,89)"}, ease: Linear.easeNone});
                        TweenMax.to(switchButton, switchTranslateTime, {x: switchBoundry, ease: Expo.easeOut, onComplete: listEnableDrag});
                    } else {
                        listDrag[0].vars.bounds[1] = 0;
                        listDrag[0].vars.snap[1] = 0;
                        switchSpan.text(txtOff);
                        TweenMax.to(switchButton, 0.1, {css: {backgroundColor: "rgb(112,112,112)"}, ease: Linear.easeNone});
                        TweenMax.to(switchButton, switchTranslateTime, {x: 0, ease: Expo.easeOut, onComplete: listEnableDrag});
                    }
                }
            }   //close link function.
        };  //close return object.
    }]);    //close directive.
