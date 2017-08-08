app.service("ScheduleService", function (SHPService, $timeout, toaster) {
    var self = this,
    scope = angular.element(document.getElementById("bodyTag")).scope();
    this.tempScheduleArray = [];
    this.isCallByMyselfOnScheduleList = false;
    
    //function declaration for service.
    self.getWeatherDayText = getWeatherDayText;
    self.getWeatherDayList = getWeatherDayList;
    self.getDayIndexFromText = getDayIndexFromText;
    self.getDayTextFromIndex = getDayTextFromIndex;
    self.getDayOfWeek = getDayOfWeek;
    self.getAdjustedWeekDays = getAdjustedWeekDays;
    self.getAdjustedWeekDaysRVC = getAdjustedWeekDaysRVC;
    
    this.getDayText = function(val) {
        var weekday = [];
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        weekday[0] = "Sunday";
        return weekday[val];
    };
    
    function getWeatherDayText(translation, val) {
        var weekday = 'none';

        if (typeof val === 'string') {
            val = val.toLowerCase();
        }

        switch (val) {
            case 0:
            case 'sun':
                weekday = translation.WEBMOB_device_fac_weather_sunday;
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_common_schedule_sunday2;
                } 
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_rac_sun;
                }
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_device_rvc_weather_sunday;
                }
                break;

            case 1:
            case 'mon':
                weekday = translation.WEBMOB_device_fac_weather_monday;
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_common_schedule_monday2;
                } 
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_rac_mon;
                }
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_device_rvc_weather_Monday;
                }
                break;

            case 2:
            case 'tue':
                weekday = translation.WEBMOB_device_fac_weather_tuesday;
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_common_schedule_tuesday2;
                } 
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_rac_tue;
                }
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_device_rvc_weather_Tuesday;
                }
                break;

            case 3:
            case 'wed':
                weekday = translation.WEBMOB_device_fac_weather_wednesday;
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_common_schedule_wednesday2;
                }
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_rac_wed;
                }
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_device_rvc_weather_Wednesday;
                }
                break;

            case 4:
            case 'thu':
                weekday = translation.WEBMOB_device_fac_weather_thursday;
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_common_schedule_thursday2;
                }
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_rac_thu;
                }
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_device_rvc_weather_thursday;
                }
                break;

            case 5:
            case 'fri':
                weekday = translation.WEBMOB_device_fac_weather_friday;
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_common_schedule_friday2;
                }
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_rac_fri;
                }
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_device_rvc_weather_Friday;
                }
                break;

            case 6:
            case 'sat':
                weekday = translation.WEBMOB_device_fac_weather_saturday;
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_common_schedule_saturday2;
                } 
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_rac_sat;
                }
                if (weekday === undefined) {
                    weekday = translation.WEBMOB_device_rvc_weather_saturday;
                }
                break;

            default:
                break;
        }

        return weekday;
    }
    
    function getWeatherDayList(translation, act) {
        var len = act.dayOfWeek.length,
                cnt,
                weekList = [];
        
        for(cnt = 0; cnt < len; ++cnt) {
            weekList.push(getWeatherDayText(translation, act.dayOfWeek[cnt]));
        }
        return weekList.join(', ');
    }
    
    this.addSchedule = function ($scope, act) {
        debugMessage(act);
        if (act === -1) {
            if ($scope.Actions.length === 10) {
                $scope.addNewSchedule = false;
                $timeout(function () {
                    toaster.success({title: "", body: $scope.translation.WEBMOB_common_schedule_max_10_noti, bodyOutputType: 'trustedHtml'});
                }, 500);
                return;
            }
           //$scope.subHeaderTitle = $scope.translation.WEBMOB_common_schedule_add_schedule;
            var d = new Date();
            var amPm = 'AM';
            var newHour = d.getHours();
            if (newHour >= 12) {
                if (newHour > 12) {
                    newHour = newHour - 12;
                }
                amPm = 'PM';
            } else if (newHour === 0) {
                newHour = 12;   //0 is not hour in AM/PM scenario.
            }

            $scope.selectedSchedule.power = 'Off';
            $scope.selectedSchedule.dayOfWeek = [];
            $scope.selectedSchedule.dayOfWeek.push(this.getDayText(d.getDay()).substring(0, 3));
            $scope.selectedSchedule.disposable = true;
            $scope.selectedSchedule.minutes = d.getMinutes();
            $scope.selectedSchedule.id = '';
            $scope.selectedSchedule.amPm = amPm;
            $scope.selectedSchedule.hours = (newHour < 10) ? ('0' + newHour) : newHour;
            $scope.selectedSchedule.minutes = ($scope.selectedSchedule.minutes < 10) ? ('0' + $scope.selectedSchedule.minutes) : $scope.selectedSchedule.minutes;

        } else {
            var gmt = this.setTimeInGMT(act.startTime);
            $scope.selectedSchedule.id = act.id;
            if(angular.isDefined(act.Actuators[0].Operation))
            	$scope.selectedSchedule.power = act.Actuators[0].Operation.power;
            angular.copy(act.dayOfWeek , $scope.selectedSchedule.dayOfWeek);
//            $scope.selectedSchedule.dayOfWeek = act.dayOfWeek;
            $scope.selectedSchedule.disposable = act.disposable;
            $scope.selectedSchedule.startTime = act.startTime;
            $scope.selectedSchedule.hours = gmt[0];
            $scope.selectedSchedule.minutes = gmt[1];
            $scope.selectedSchedule.amPm = gmt[2];
            $scope.selectedSchedule.keypadOn = act.keypadOn;

        }        
        this.isCallByMyselfOnScheduleList =false;
        $scope.gotoAddSchedule();
    };
    
    this.addScheduleRVC = function ($scope, act) {
        $scope.selectedSchedule.id = act.id;
        $scope.selectedSchedule.Actuators = act.Actuators;
        $scope.selectedSchedule.dayOfWeek = act.dayOfWeek;
        $scope.selectedSchedule.disposable = act.disposable;
        $scope.selectedSchedule.repeatPeriod = act.repeatPeriod;
        $scope.selectedSchedule.startTime = act.startTime;
        
        if ($scope.selectedSchedule.startTime === '0000-00-00T00:00:00' || act.enabled === false ) {
            var d = new Date();
            var amPm = 'AM';
            var newHour = d.getHours();
            if (newHour > 12) {
                newHour = newHour - 12;
                amPm = 'PM';
            }
            
            $scope.selectedSchedule.minutes = d.getMinutes();
            $scope.selectedSchedule.hours = (newHour < 10) ? ('0' + newHour) : newHour;
            $scope.selectedSchedule.minutes = ($scope.selectedSchedule.minutes < 10) ? ('0' + $scope.selectedSchedule.minutes) : $scope.selectedSchedule.minutes;
            $scope.selectedSchedule.amPm = amPm;
                
        } else {
        	var gmt;
        	if(angular.isDefined($scope.selectedScheduleType) && $scope.selectedScheduleType == 1)
        		gmt = getTimeWithAMPM(act.startTime);
        	else
        		gmt = this.setTimeInGMT(act.startTime);
        		
            $scope.selectedSchedule.id = act.id;
            $scope.selectedSchedule.power = act.Actuators[0].Operation.power;
            $scope.selectedSchedule.dayOfWeek = act.dayOfWeek;
            $scope.selectedSchedule.disposable = act.disposable;
            $scope.selectedSchedule.startTime = act.startTime;
            $scope.selectedSchedule.hours = gmt[0];
            $scope.selectedSchedule.minutes = gmt[1];
            $scope.selectedSchedule.amPm = gmt[2];
        }
        $scope.selectedSchedule.enabled = true;
        $scope.gotoAddSchedule();
               
    };
    
       
    this.asTabSelected = function ($scope, bool) {
        if (bool) {
            $scope.selectedSchedule.power = 'On';
        } else {
            $scope.selectedSchedule.power = 'Off';
        }
    };
    
    maxDayEachMonth = function ($scope) {
    	var thisYear = new Date();
    	var month = textMonthToNumber($scope);
    	thisYear.setMonth(month);
    	
    	if( month === 1){ //FEB
    		thisYear.setDate(29);
    		if(thisYear.getMonth() === month)
    			return 29;
    		else
    			return 28;
    	}else{ //OTHERS
    		thisYear.setDate(31);
    		if(thisYear.getMonth() === month)
    			return 31;
    		else
    			return 30;
    	}
    }
    
    textMonthToNumber = function ($scope) {
    	var value = $scope.selectedSchedule.month;
    	var returnValue;
    	for(var i = 0 ; i < $scope.monthNames.length ; i ++){
    		if(value === $scope.monthNames[i]){
    			returnValue = i;
    		}
    	}
    	return returnValue;
    };
    
    this.increaseMonths = function ($scope) {
    	var month = textMonthToNumber($scope);
    	if(month == $scope.monthNames.length-1)
    		$scope.selectedSchedule.month = $scope.monthNames[0];
    	else
    		$scope.selectedSchedule.month = $scope.monthNames[month+1];
    	
    	var day = maxDayEachMonth($scope);
    	if(day < $scope.selectedSchedule.day)
    		$scope.selectedSchedule.day = day;
    };
    
    this.decreaseMonths = function ($scope) {
    	var month = textMonthToNumber($scope);
    	if(month == 0)
    		$scope.selectedSchedule.month = $scope.monthNames[$scope.monthNames.length-1];
    	else
    		$scope.selectedSchedule.month = $scope.monthNames[month-1];
    	
    	var day = maxDayEachMonth($scope);
    	if(day < $scope.selectedSchedule.day)
    		$scope.selectedSchedule.day = day;
    };
    
    this.increaseDays = function ($scope) {
    	if(Number($scope.selectedSchedule.day) == maxDayEachMonth($scope))
    		$scope.selectedSchedule.day = 1;
    	else
    		$scope.selectedSchedule.day = Number($scope.selectedSchedule.day) + 1;
    };
    
    this.decreaseDays = function ($scope) {
    	if((Number($scope.selectedSchedule.day) - 1) == 0)
    		$scope.selectedSchedule.day = maxDayEachMonth($scope);
    	else
    		$scope.selectedSchedule.day = Number($scope.selectedSchedule.day) - 1;
    };
    
    this.increaseHours = function ($scope) {
        $scope.selectedSchedule.hours = Number($scope.selectedSchedule.hours);
        if ($scope.selectedSchedule.hours !== 12) {
            $scope.selectedSchedule.hours += 1;
        } else {
            $scope.selectedSchedule.hours = 1;
        }
        $scope.selectedSchedule.hours = ($scope.selectedSchedule.hours < 10) ? ('0' + $scope.selectedSchedule.hours) : $scope.selectedSchedule.hours;
    };
    
    this.decreaseHours = function ($scope) {
        $scope.selectedSchedule.hours = Number($scope.selectedSchedule.hours);
        if ($scope.selectedSchedule.hours > 1) {
            $scope.selectedSchedule.hours -= 1;
        } else {
            $scope.selectedSchedule.hours = 12;
        }
        $scope.selectedSchedule.hours = ($scope.selectedSchedule.hours < 10) ? ('0' + $scope.selectedSchedule.hours) : $scope.selectedSchedule.hours;
    };
    
    this.onAsRepeatWeakly = function ($scope) {
        $scope.selectedSchedule.disposable = !($scope.selectedSchedule.disposable);
    };
    
    this.increaseMinutes = function ($scope) {
        $scope.selectedSchedule.minutes = Number($scope.selectedSchedule.minutes);
        // defined steps as 1
        var step = 1;
        if ($scope.selectedSchedule.minutes !== (60 - step)) {
            $scope.selectedSchedule.minutes += step;
        } else {
            $scope.selectedSchedule.minutes = 0;
        }
        $scope.selectedSchedule.minutes = ($scope.selectedSchedule.minutes < 10) ? ('0' + $scope.selectedSchedule.minutes) : $scope.selectedSchedule.minutes;
    };

    this.decreaseMinutes = function ($scope) {
        $scope.selectedSchedule.minutes = Number($scope.selectedSchedule.minutes);
        var step = 1;
        if ($scope.selectedSchedule.minutes !== 0) {
            $scope.selectedSchedule.minutes -= step;
        } else {
            $scope.selectedSchedule.minutes = 60 - step;
        }
        $scope.selectedSchedule.minutes = ($scope.selectedSchedule.minutes < 10) ? ('0' + $scope.selectedSchedule.minutes) : $scope.selectedSchedule.minutes;
    };
    
    this.changeMeridian = function ($scope) {
        $scope.selectedSchedule.amPm = ($scope.selectedSchedule.amPm === "AM") ? "PM" : "AM";
    };
    
    
    this.appendZero = function(value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };
    
    var payload;
    this.saveSchedule = function ($scope) {
        var d = new Date(),
            selectedHrs;
        if ($scope.selectedSchedule.dayOfWeek.length === 0) {
            $timeout(function () {
                toaster.success({title: "", body: $scope.translation.WEBMOB_common_schedule_inform_weekday});
            }, 500);
            return;
        }

        if (Number($scope.selectedSchedule.hours) === null || Number($scope.selectedSchedule.minutes) === null) {
            $timeout(function () {
                toaster.success({title: "", body: $scope.translation.WEBMOB_common_schedule_inform_time});
            }, 500);
            return;
        }

        selectedHrs = parseInt($scope.selectedSchedule.hours, 10);
        if ($scope.selectedSchedule.amPm === 'PM' && selectedHrs !== 12) {
            d.setHours(selectedHrs + 12);
        } else if (selectedHrs === 12 && $scope.selectedSchedule.amPm === 'AM') {
            d.setHours(0);
        } else {
            d.setHours(selectedHrs);
        }
        d.setMinutes(parseInt($scope.selectedSchedule.minutes, 10));

        var dayOfWeekStr = '';
        var dayOfWeekLen = $scope.selectedSchedule.dayOfWeek.length;
        var dayDiff = d.getTimezoneOffset() > 0 ? -1 : 1;
        for (var s = 0; s < dayOfWeekLen; s++) {
            var dayStr = (d.getDate() - d.getUTCDate() ? getDayOfWeek($scope.selectedSchedule.dayOfWeek[s], dayDiff) : $scope.selectedSchedule.dayOfWeek[s]);
            if (s === (dayOfWeekLen - 1)) {
                dayOfWeekStr = dayOfWeekStr + '"' + dayStr + '"';
            } else {
                dayOfWeekStr = dayOfWeekStr + '"' + dayStr + '", ';
            }
        }
        
        var _month = this.appendZero(d.getUTCMonth() + 1);
        var _date = this.appendZero(d.getUTCDate());
        var _hours = this.appendZero(d.getUTCHours());
        var _minutes = this.appendZero(d.getUTCMinutes());
        var _seconds = this.appendZero(d.getUTCSeconds());

        var startTime = d.getUTCFullYear() + '-' + _month + '-' + _date + 'T' + _hours + ':' + _minutes + ':' + _seconds;
        var selectedStartTime = $scope.selectedSchedule.hours + ":" + $scope.selectedSchedule.minutes;
       /* for (var i = 0; i < $scope.Actions.length; i++) { // As par Mr. Shin remove the duplicated checking logic for schedule, this is implemented in Native & Device Side.
            if ($scope.Actions[i].newStartTime === selectedStartTime && $scope.Actions[i].timeConvention === $scope.selectedSchedule.amPm) {
                $scope.selectedSchedule.dayOfWeek.sort();
                $scope.Actions[i].dayOfWeek.sort();
                var selectedDay = $scope.selectedSchedule.dayOfWeek.toString();
                var actionDay = $scope.Actions[i].dayOfWeek.toString();
                if (selectedDay == actionDay) {
                    if ($scope.Actions[i].disposable == $scope.selectedSchedule.disposable) {
                        if (angular.isDefined($scope.Actions[i].Actuators[0].Operation.power) && $scope.Actions[i].Actuators[0].Operation.power !== $scope.selectedSchedule.power) {
                            // Nothing
                        } else {
                            $timeout(function () {
                                toaster.success({title: "", body: $scope.translation.WEBMOB_common_schedule_duplication});
                            }, 500);
                            return;
                        }                        
                    }
                }
            }
        }*/

        if (!($scope.selectedSchedule.disposable)) {
            payload = '{"Action": {"Actuators": [{ "Operation": {"power": "' + $scope.selectedSchedule.power + '"}, "deviceIDs": ["' + $scope.deviceID + '"]}], "dayOfWeek": [' + dayOfWeekStr + '], "disposable": false, "enabled": true, "repeatPeriod": "Weekly", "startTime": "' + startTime + '" }}';
        } else {
            payload = '{"Action": {"Actuators": [{ "Operation": {"power": "' + $scope.selectedSchedule.power + '"}, "deviceIDs": ["' + $scope.deviceID + '"]}], "dayOfWeek": [' + dayOfWeekStr + '], "disposable": true, "enabled": true, "startTime": "' + startTime + '" }}';
        }
        debugMessage(payload);
        if ($scope.isStatic) {
            $scope.onBackPressed();
        } else {
            if ($scope.selectedSchedule.id === '') {
                SHPService.sendSHPCommand('POST', payload, "/" + $scope.peerId + "/actions");
            } else {
                SHPService.sendSHPCommand('PUT', payload, "/" + $scope.peerId + "/actions/" + $scope.selectedSchedule.id);
            }
        }
    };
    
    function getAdjustedWeekDays(weekDayList, startTime) {
        var currDate = new Date(),
            utcTime = startTime.split('T')[1].split(':'),
            dayDiff;
        currDate.setUTCHours(+utcTime[0]);
        currDate.setUTCMinutes(+utcTime[1]);
        currDate.setUTCSeconds(+utcTime[2]);
//        dayDiff = currDate.getUTCDate() - currDate.getDate();
        if(currDate.getDate() - currDate.getUTCDate()) {
            dayDiff = currDate.getTimezoneOffset() > 0 ? 1 : -1;
            for(var idx = 0; idx < weekDayList.length; ++idx) {
                weekDayList[idx] = getDayOfWeek(weekDayList[idx], dayDiff);
            }
        }
        return weekDayList;
    }
    
    function getAdjustedWeekDaysRVC(weekDayList, startTime) {
    	 var currDate = new Date(),
         utcTime = startTime.split('T')[1].split(':'),
         dayDiff = 0;
     currDate.setUTCHours(+utcTime[0]);
     currDate.setUTCMinutes(+utcTime[1]);
     currDate.setUTCSeconds(+utcTime[2]);
     
     if(currDate.getUTCDate() != currDate.getDate())
    	 dayDiff = (currDate.getTimezoneOffset > 0) ? 1 : -1;
     if(dayDiff != 0) {
         for(var idx = 0; idx < weekDayList.length; ++idx) {
             weekDayList[idx] = getDayOfWeekRVC(weekDayList[idx], dayDiff);
         }
     }
     return weekDayList;
    }
    
    function getDayOfWeek(dayStr, dayDiff) {
        var dayIdx = getDayIndexFromText(dayStr);
        if(dayDiff > 0) {
            if(dayIdx) {
                dayIdx -= dayDiff;
            } else {
                dayIdx = 6;
            }
        } else {
            if(dayIdx === 6) {
                dayIdx = 0;
            } else {
                dayIdx  -= dayDiff;
            }
        }
        return getDayTextFromIndex(dayIdx);
    }
    
    function getDayOfWeekRVC(dayStr, dayDiff) {
        var dayIdx = getDayIndexFromText(dayStr);
        var returnValue = "";
        switch(dayDiff){
        case 1: 
        	returnValue = getDayTextFromIndex(dayIdx - dayDiff == 0 ? 0 : (dayIdx && dayIdx - dayDiff) || 6);
        	break;
        case 0:
        	returnValue = getDayTextFromIndex(dayIdx == 6 ? 6 : (dayIdx !== 6 && dayIdx - dayDiff) || 0)
        	break;
        case -1:
        	returnValue = getDayTextFromIndex((dayIdx !== 6 && dayIdx - dayDiff) || 0);
        	break;
        default:
        	break;
        } 
        return returnValue; 
    }
    
    this.saveScheduleRVC = function($scope, isDel) {
    	if(isDel)
    	{
    		SHPService.sendSHPCommand('DELETE', "/" + $scope.peerId + "/actions/" + $scope.selectedSchedule.id);
    		return;
    	}
 
    	var d = new Date();
        if ($scope.selectedSchedule.amPm === 'PM' && $scope.selectedSchedule.hours  !== 12) {
            d.setHours(Number($scope.selectedSchedule.hours) + 12);
        }else if ($scope.selectedSchedule.hours === 12 && $scope.selectedSchedule.amPm === 'AM') {
            d.setHours(0);
        }else {
            d.setHours(Number($scope.selectedSchedule.hours));
        }
        d.setMinutes(Number($scope.selectedSchedule.minutes));
      
        var dayOfWeekStr = '';
        var dayOfWeekLen = $scope.selectedSchedule.dayOfWeek.length;
        var dayDiff = d.getDate() - d.getUTCDate();
        for (var s = 0; s < dayOfWeekLen; s++) {
            var dayStr = (dayDiff ? getDayOfWeekRVC($scope.selectedSchedule.dayOfWeek[s], dayDiff) : $scope.selectedSchedule.dayOfWeek[s]);
            if (s === (dayOfWeekLen - 1)) {
                dayOfWeekStr = dayOfWeekStr + '"' + dayStr + '"';
            } else {
                dayOfWeekStr = dayOfWeekStr + '"' + dayStr + '", ';
            }
        }
        //Make selected days. 
//        var days = "";
//        $scope.selectedSchedule.dayOfWeek.forEach(function(value){days += '"' + value + '",'})
//        days = days.slice(0,days.length-1);
        var startTime = d.getUTCFullYear() + '-' + (d.getUTCMonth()+1) + '-' + d.getUTCDate() + 'T' + d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds();
//        var payload = '{"Action" : {"Actuators" : [ {"Mode" : {"modes" : [ "Cleaning_Auto" ]}, "deviceIDs" : [ "1" ]} ],' +
//            			'"dayOfWeek" : ['+dayOfWeekStr+'], "disposable" : ' + $scope.selectedSchedule.disposable + ', "enabled" : true, "repeatPeriod" : "Weekly", "startTime" : "' + startTime + '"}}';

        var payload = "";
        /***
         * as for the SCHEDULE_B --> the two options are there , either Once or Weekly , So disposable is true and false respectively.
         * But right now if disposable is true we are treatd it as a "Daily" and if in Payload "Once" is given , it throws error.
         * So for Schedule_B don't bother the text if disposable  true.
         * 
         */
            var isWeekly = "Weekly";
//        if(!$scope.selectedSchedule.disposable){
//           isWeekly =  "Weekly";
//        }
        
             payload = '{"Action" : {"Actuators" : [ {"Mode" : {"modes" : [ "Cleaning_Auto" ]}, "deviceIDs" : [ "1" ]} ],' +
            			'"dayOfWeek" : ['+dayOfWeekStr+'], "disposable" : ' + $scope.selectedSchedule.disposable + ', "enabled" : true, "repeatPeriod" : "' + isWeekly + '", "startTime" : "' + startTime + '"}}';
        
        console.log("RVC PAYLOAD", payload);
        
        var selectedStartTime = $scope.selectedSchedule.hours + ":" + $scope.selectedSchedule.minutes;
        
        if($scope.selectedSchedule.dayOfWeek.toString() == ""){
        	$timeout(function () {
	               toaster.success({title: "", body:$scope.translation.WEBMOB_common_schedule_inform_weekday});
	        }, 500); 
			return;
        }
        
        for(var i=0;i<$scope.Actions.length;i++){
        	if($scope.Actions[i].newStartTime == selectedStartTime && $scope.Actions[i].timeConvention == $scope.selectedSchedule.amPm){	
        				$scope.selectedSchedule.dayOfWeek.sort();
        				$scope.Actions[i].dayOfWeek.sort();
						var selectedDay = $scope.selectedSchedule.dayOfWeek.toString();
						var actionDay = $scope.Actions[i].dayOfWeek.toString();					
						if(selectedDay == actionDay){				
							if($scope.Actions[i].disposable == $scope.selectedSchedule.disposable){
								$timeout(function () {
						               toaster.success({title: "", body:$scope.translation.WEBMOB_common_schedule_duplication});
						        }, 500); 
								return;
							}
						}					
        	}      	
        }
        
            // the Page will be rediret to the Schedule List if request sent .
            $scope.gotoScheduleListPage();
        
	    if ($scope.isStatic===false) {        	   		
	        if(!$scope.selectedSchedule.id)
	        {
	        	var suffixURL = "/" + $scope.peerId + "/actions";
	        	SHPService.sendSHPCommand('POST', payload, suffixURL);
	        }else {
	        	var suffixURL = "/" + $scope.peerId + "/actions/" + $scope.selectedSchedule.id;
	        	SHPService.sendSHPCommand('PUT', payload, suffixURL);
	        }	            
	    }    
    }
    
    this.dayColorSelected = function ($scope, dayValue) {
        if ($scope.selectedSchedule.dayOfWeek !== undefined && $scope.selectedSchedule.dayOfWeek.indexOf(dayValue) > -1) {
            return true;
        } else {
            return false;
        }
    };
    
    this.daySelected = function ($scope, dayValue) {
        var dayIndex = $scope.selectedSchedule.dayOfWeek.indexOf(dayValue);
        if ($scope.selectedSchedule.dayOfWeek !== undefined && dayIndex > -1) {
            $scope.selectedSchedule.dayOfWeek.splice(dayIndex, 1);
        } else {
            $scope.selectedSchedule.dayOfWeek.push(dayValue);
        }
    };
    
    this.removeItemFromSchedule = function ($scope, schedule, activity) {
        if ($scope.isStatic) {
            // Nothing
        } else {
            var dayOfWeekStr = '';
            var dayOfWeekLen = schedule.dayOfWeek.length;
            for (var s = 0; s < dayOfWeekLen; s++) {
                if (s === (dayOfWeekLen - 1)) {
                    dayOfWeekStr = dayOfWeekStr + '"' + schedule.dayOfWeek[s] + '"';
                } else {
                    dayOfWeekStr = dayOfWeekStr + '"' + schedule.dayOfWeek[s] + '", ';
                }
            }
            $scope.checkResponse.push(activity);
            SHPService.sendSHPCommand('DELETE', "/" + $scope.peerId + "/actions/" + schedule.id);
        }
    };
    
    //This code will be required later. please don't delete it.
    this.keypadClicked = function () {
        //iphone 4 solution.
        if(navigator.userAgent.toLowerCase().indexOf("iphone") > -1  && screen.width <= 320 && screen.height <= 480) {
            setTimeout(function () {
                document.getElementById("asHoursID").focus();
            });
        } else {    //solution for rest.
            //leave only 1 input box enabled and focus it. timeout set by other developer. keep it.
            document.getElementById("asMinutesID").disabled = true;
            document.getElementById("asHoursID").focus();
        
            setTimeout(function () {
                document.getElementById("asHoursID").focus();
                document.getElementById("asMinutesID").disabled = false;
            }, 100);
        }
    };
    
    this.ConvertUTCTimeToLocalTime = function (date, toUTC) {
        var localOffset = date.getTimezoneOffset() * 60000;
        var localTime = date.getTime();
        if (toUTC) {
            date = localTime + localOffset;
        } else {
            date = localTime - localOffset;
        }
        date = new Date(date);
        return date;
    };
    
    this.setTimeInGMT = function (utcString) {
        var firstSplit = utcString.split("T");
        var hourMinSplit = firstSplit[1].split(":");
        var hour = parseInt(hourMinSplit[0], 10);
        var minute = parseInt(hourMinSplit[1], 10);

        var start_date = new Date();
        start_date.setHours(hour);
        start_date.setMinutes(minute);
        var newDate = self.ConvertUTCTimeToLocalTime(start_date, false);

        var amPm = 'AM';
        var newHour = newDate.getHours();
        if (newHour >= 12) {
            if (newHour > 12) {
                newHour = newHour - 12;
            }
            amPm = 'PM';
        } else if (newHour === 0) {
            newHour = 12;   //0 is not hour in AM/PM scenario.
        }

        var newMinutes = newDate.getMinutes();
        newHour = newHour >= 10 ? newHour : '0' + newHour;
        newMinutes = newMinutes >= 10 ? newMinutes : '0' + newMinutes;
        return [newHour, newMinutes, amPm];
    };
    
    this.setTimeInGMTforRVC = function (utcString, $scope) {
        var firstSplit = utcString.split("T");
        var monthDaySplit = firstSplit[0].split("-");
        
        var year = monthDaySplit[0];
        var month = Number(monthDaySplit[1])-1;
        var day = monthDaySplit[2];
        
        var hourMinSplit = firstSplit[1].split(":");
        var hour = parseInt(hourMinSplit[0], 10);
        var minute = parseInt(hourMinSplit[1], 10);

        var start_date = new Date();
        start_date.setYear(year);
        start_date.setMonth(month);
        start_date.setDate(day);
        
        start_date.setHours(hour);
        start_date.setMinutes(minute);
        var newDate = self.ConvertUTCTimeToLocalTime(start_date, false);

        var amPm = 'AM';
        var newHour = newDate.getHours();
        if (newHour >= 12) {
            if (newHour > 12) {
                newHour = newHour - 12;
            }
            amPm = 'PM';
        } else if (newHour === 0) {
            newHour = 12;   //0 is not hour in AM/PM scenario.
        }

        var newMinutes = newDate.getMinutes();
        newHour = newHour >= 10 ? newHour : '0' + newHour;
        newMinutes = newMinutes >= 10 ? newMinutes : '0' + newMinutes;
        var newDay = getWeatherDayText($scope.translation, newDate.getDay());
         
        return [newHour, newMinutes, amPm, newDay];
    };
    
    function getTimeWithAMPM(gmtString)
    {
    	var firstSplit = gmtString.split("T");
        var hourMinSplit = firstSplit[1].split(":");
        var hour = parseInt(hourMinSplit[0], 10);
        var minute = parseInt(hourMinSplit[1], 10);

        var start_date = new Date();
        start_date.setHours(hour);
        start_date.setMinutes(minute);
        
        var amPm = 'AM';
        var newHour = start_date.getHours();
        if (newHour >= 12) {
            if (newHour > 12) {
                newHour = newHour - 12;
            }
            amPm = 'PM';
        } else if (newHour === 0) {
            newHour = 12;   //0 is not hour in AM/PM scenario.
        }

        var newMinutes = start_date.getMinutes();
        newHour = newHour >= 10 ? newHour : '0' + newHour;
        newMinutes = newMinutes >= 10 ? newMinutes : '0' + newMinutes;
        return [newHour, newMinutes, amPm];

    }
    

    
    function getCurrentYYMMDD() {
        var d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return [year, month, day].join('/');
    };
    
    function getDayIndexFromText(value) {
        switch (value) {
            case "Mon":
                return 1;
            case "Tue":
                return 2;
            case "Wed":
                return 3;
            case "Thu":
                return 4;
            case "Fri":
                return 5;
            case "Sat":
                return 6;
            case "Sun":
                return 0;
            default:
                break;
        }
    };
    
    function getDayTextFromIndex(value) {
        switch (value) {
            case 1:
                return "Mon";
            case 2:
                return "Tue";
            case 3:
                return "Wed";
            case 4:
                return "Thu";
            case 5:
                return "Fri";
            case 6:
                return "Sat";
            case 0:
                return "Sun";
            default:
                break;
        }
    };
    
    function convertDaysToDates(value) {
        var currentDayIndex = new Date().getDay();
        var currentTimeYYMMDD = getCurrentYYMMDD();
        var currentDayText = self.getDayText(new Date().getDay()).substring(0, 3);
        
        value.dayOfWeek.forEach(function (item) {
            var d = currentTimeYYMMDD + " " + value.newStartTime + " " + value.timeConvention;
            var myDate = new Date(d);
            if (currentDayText === item) { // If it is same day, check whether it is today or next week day
                if (myDate < new Date()) {
                    myDate.setDate(myDate.getDate() + 7);
                }
            } else {
                if (self.getDayIndexFromText(item) > currentDayIndex) {
                    myDate.setDate(myDate.getDate() + (self.getDayIndexFromText(item) - currentDayIndex));
                } else {
                    myDate.setDate(myDate.getDate() + (7 - currentDayIndex + self.getDayIndexFromText(item)));
                }
            }
            self.tempScheduleArray.push(myDate);
        });
    };
    
    this.calculateUpcomingSchedule = function($scope) {
        this.tempScheduleArray = []; // Clear the array every time

        // Convert each day into date
        $scope.Actions.forEach(function (value) {
            convertDaysToDates(value);
        });

        // Sort schedule dates array
        this.tempScheduleArray.sort(function (a, b) {
            return new Date(a) - new Date(b);
        });

        // Take first item from sorted schedule list array

        var scheduleDate = new Date(this.tempScheduleArray[0]);
        var hrs = scheduleDate.getHours();
        var tempTimeConv = (hrs >= 12) ? "PM" : "AM";
        var tempHours = hrs > 12 ? (hrs - 12) : (hrs === 0 ? 12 : hrs);
        var tempMins = scheduleDate.getMinutes();

        tempHours = tempHours >= 10 ? tempHours : '0' + tempHours;
        tempMins = tempMins >= 10 ? tempMins : '0' + tempMins;

        if ($scope.selectedLanguage.toUpperCase().indexOf('KO') !== -1) {
            tempTimeConv = (tempTimeConv === 'AM') ? $scope.translation.WEBMOB_common_am : $scope.translation.WEBMOB_common_pm;
            $scope.ScheduleText = tempTimeConv + " " + tempHours + ":" + tempMins + " / " + getWeatherDayText($scope.translation, scheduleDate.getDay());
        } else {
            $scope.ScheduleText = tempHours + ":" + tempMins + " " + tempTimeConv + " / " + getWeatherDayText($scope.translation, scheduleDate.getDay());
        }        
        debugMessage("ScheduleText " + $scope.ScheduleText);
    };
    
    this.onHoursLostFocus = function ($scope) {
        if ($scope.selectedSchedule.hours === "0" || $scope.selectedSchedule.hours === "00") {
            $scope.selectedSchedule.hours = 12;
        }
        if ($scope.selectedSchedule.hours === "") {
            $scope.selectedSchedule.hours = $scope.oldValueHours;
        }
        $scope.selectedSchedule.hours = Number($scope.selectedSchedule.hours);
        $scope.selectedSchedule.hours = ($scope.selectedSchedule.hours < 10) ? ('0' + $scope.selectedSchedule.hours) : $scope.selectedSchedule.hours;
    };

    this.onMinsLostFocus = function ($scope) {
        if ($scope.selectedSchedule.minutes === "") {
            $scope.selectedSchedule.minutes = $scope.oldValueMins;
        }
        $scope.selectedSchedule.minutes = Number($scope.selectedSchedule.minutes);
        $scope.selectedSchedule.minutes = ($scope.selectedSchedule.minutes < 10) ? ('0' + $scope.selectedSchedule.minutes) : $scope.selectedSchedule.minutes;
    };

    this.onHoursMinsFocusGain = function ($scope) {
        $scope.oldValueHours = $scope.selectedSchedule.hours;
        $scope.oldValueMins = $scope.selectedSchedule.minutes;
    };
    
    this.increaseHrContinuously = function ($scope) {
        $scope.longPress = true;
        $scope.timer = setInterval(function () {
            $scope.selectedSchedule.hours = increaseHrTime($scope.selectedSchedule.hours);
        }, 400);
    };

    this.decreaseHrContinuously = function ($scope) {
        $scope.longPress = true;
        $scope.timer = setInterval(function ($scope) {
            $scope.selectedSchedule.hours = decreaseHrTime($scope.selectedSchedule.hours);
        }, 400);
    };

    this.increaseMinContinuously = function ($scope) {
        $scope.longPress = true;
        $scope.timer = setInterval(function () {
            $scope.selectedSchedule.minutes = increaseMinTime($scope.selectedSchedule.minutes);
        }, 400);
    };

    this.decreaseMinContinuously = function ($scope) {
        $scope.longPress = true;
        $scope.timer = setInterval(function () {
            $scope.selectedSchedule.minutes = decreaseMinTime($scope.selectedSchedule.minutes);
        }, 400);
    };
    
    function increaseHrTime(hours) {
        hours = Number(hours);
        if (hours !== 12) {
            hours += 1;
        } else {
            hours = 1;
        }
        hours = (hours < 10) ? ('0' + hours) : hours;

        document.getElementById("asHoursID").value = hours;
        return hours;
    }

    function decreaseHrTime(hours) {
        hours = Number(hours);
        if (hours > 1) {
            hours -= 1;
        } else {
            hours = 12;
        }
        hours = (hours < 10) ? ('0' + hours) : hours;

        document.getElementById("asHoursID").value = hours;
        return hours;
    }

    function increaseMinTime() {
        var minutes = Number(minutes);
        // defined steps as 1
        var step = 1;
        if (minutes !== (60 - step)) {
            minutes += step;
        } else {
            minutes = 0;
        }
        minutes = (minutes < 10) ? ('0' + minutes) : minutes;

        document.getElementById("asMinutesID").value = minutes;
        return minutes;
    }

    function decreaseMinTime() {
        var minutes = Number(minutes);
        var step = 1;
        if (minutes !== 0) {
            minutes -= step;
        } else {
            minutes = 60 - step;
        }
        minutes = (minutes < 10) ? ('0' + minutes) : minutes;

        document.getElementById("asMinutesID").value = minutes;
        return minutes;
    }
});


