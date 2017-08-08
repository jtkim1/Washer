/* 
 * Service to handle FAC / RAC related common code.
 */
app.service('homeMultiService', ["UtilityService", "SHPService", function (UtilityService, SHPService) {
        var _this = this,
                utility = UtilityService;

        //function declaration.
        _this.handleAlarms = handleAlarms;
        _this.sendSensorRequest = sendSensorRequest;


        // Handle alarms
        function handleAlarms(alarms, strError, strSplit, strErrorDescPrefix, strErrorDescSuffix, errorPage) {
            var scope = UtilityService.getScope();
            alarms.forEach(function (value) {
                if (~((value.code).indexOf(strError))) {
                    scope.currentErrorCode = (value.code).split(strSplit)[1];
                    if (!!scope.currentErrorCode) {
                        scope.currentErrorDesc = strErrorDescPrefix + scope.currentErrorCode.toLowerCase() + strErrorDescSuffix;
                        if (scope.currentScreen !== errorPage) {
                            scope.previousScreen = scope.currentScreen;
                        }
                        scope.gotoErrorPage();
                    }
                } else if (value.code === "ErrorCode" && scope.currentScreen !== scope.previousScreen && !!scope.previousScreen && scope.currentScreen === errorPage) {
                    //Lokesh 17Nov15_2053 -> As per Native Code, when receiving only 'ErrorCode', it means remove error dialog if it is visible to user. 
                    //'ErrorCode' may come at random time also. So, check if showing error page or not.
                    //Also make sure that previouScreen exist and it is not same as currentScreen.
                    scope.currentScreen = scope.previousScreen;
                    scope.changeScreen();
                }
            });
        }
        
        //Send Air purity refresh Command
        function sendSensorRequest(pushState) {
            var scope = UtilityService.getScope();
            if (!scope.isStatic) {
                if(!!pushState) {
                    scope.checkResponse.push(pushState);
                } else {
                    scope.checkResponse.push("getDevices");
                }
                SHPService.sendSHPCommand("GET", "/" + scope.peerId + "/devices/0/sensors");
            }
        }
    }]);

