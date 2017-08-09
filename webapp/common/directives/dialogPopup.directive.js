//While writing directive, following conditions were considered:
//1. At any time an error/popup can be added to the list. Here error/popup addition means adding error/popup programmatically.
//2. At any time, an error can be removed from the list. Here error removal means removed programmatically.
//3. Show latest error to user. After receiving user action for that error, show latest in the list, if any, to user and so on.
//4. Receive all errors in a list. This list is bidirectional. Hence, it will communicate latest status of list to app any time. This poses a risk, but benefits are higher.
//5. Clicking outside of dialog should not take any event.
//6. This should be an element.
//7. The directive should process list in reverse order. i.e. latest in the list should be displayed first to user.

/*
    //In html add directive out of scrollable-area class like this
    <dialog-pop-up error-list="dialogList"></dialog-pop-up>
    
    // Expected errorlist/dialogList array object creation can be like as follows:

    $scope.dialogList.push({
        title: "Selectional Account",       //Title of pupup, in case not required dont pass it or keep it empty string
        type : 1,   //Type of pupup, 1 means normal type of popup
        msg : "Message to be shown", // Main message required to be shown
        sub_msg : "Text Text Text Text Text Text Text Text",    //if there is any subtext to be shown with tick mark. If not required dont pass it or keep it empty string
        btnOkTxt : "OK",    // OK button text
        btnCancelTxt : "CANCEL",        // CANCEL button text
        closeDialog: true,      // Keep it true to close this popup when ok/cancel button is pressed.
        btnOkHandler : function(){          //OK button handler callback function
            console.log("Hi!!");
        },
        btnCancelHandler : function(){      //Cancel button handler callback function
            console.log("Cancel Hi!!");
        }
    });        

    $scope.dialogList.push({
        title: "Edit",      //Title of pupup, in case not required dont pass it or keep it empty string
        type : 2,   //Type of pupup, 2 means it will have input/edit box
        msg : "Message to be shown", // Main message required to be shown
        sub_msg : "Text Text Text Text Text Text Text Text",    //if there is any subtext to be shown with tick mark. If not required dont pass it or keep it empty string
        btnOkTxt : "OK",        // OK button text
        btnCancelTxt : "CANCEL",    // CANCEL button text
        placeholderText: "Hint Text",   //input box placeholder text
        editText: '',    //input field actual data.
        closeDialog: true,  // Keep it true to close this popup when ok/cancel button is pressed.
        maxLength : 20, //Character limits in input box
        btnOkHandler : function(val){   //OK button handler callback function, val is the value of text in input box
            console.log("Hi!!" + val);
        },
        btnCancelHandler : function(){  //Cancel button handler callback function
            console.log("Cancel Hi!!");
        }
    }); 

        $scope.dialogList.push({
            title: "Selectional Account",
            type : 3,
            btnOkTxt : "OK",
            btnCancelTxt : "CANCEL",
            closeDialog: true,
            optionsList : optionsList,  //Array list of options to be shown
            selectedIndex : $scope.selectedIndex,   //Currently selected index value
            btnOkHandler : function(index){ //OK button handler callback function
                console.log("selected index is =" + index);
            },
            btnCancelHandler : function(){  //Cancel button handler callback function
                console.log("Cancel Hi!!");
            }
        }); 

 */
app.directive('dialogPopUp', ["UtilityService", "$timeout", function(UtilityService, $timeout) {
        return {
            restrict: 'AE',
            scope: {
                errorList: '=' //list of errors in queue format.
            },
            template:   '<div class="dialog-dir-bg-div" ng-if="!!errorList && !!errorList.length" ng-cloak> \
                            <div class="dialog-dir-container center" ng-if="errorList[errorList.length - 1].type == popupType.normal" ng-click="$event.stopPropagation()"> \
                                <div ng-if="errorList[errorList.length - 1].title" ng-class="{\'title-type-subtext\' : errorList[errorList.length - 1].sub_msg}"class="dialog-dir-title-text Regular" ng-bind-html="errorList[errorList.length - 1].title"></div> \
                                <div class="dialog-dir-main-text Regular" ng-class="{\'no_title_case\' : !errorList[errorList.length - 1].title, \'sub-text-enabled\' : errorList[errorList.length - 1].sub_msg}" ng-bind-html="errorList[errorList.length - 1].msg"></div> \
                                <div ng-if="errorList[errorList.length - 1].sub_msg" class="dialog-dir-sub-text-container">\
                                    <div class="dialog-dir-sub-text-check-box"></div>\
                                    <div class="dialog-dir-sub-text" ng-bind-html="errorList[errorList.length - 1].sub_msg"></div>\
                                </div>\
                                <div class="dialog-dir-buttons-cotainer"> \
                                    <div class="ok-button" ng-if="!!errorList[errorList.length - 1].btnOkTxt" ng-click="clickHandler(0)" ng-bind-html="errorList[errorList.length - 1].btnOkTxt"></div> \
                                    <div class="cancel-button" ng-if="!!errorList[errorList.length - 1].btnCancelTxt" ng-click="clickHandler(1)" ng-bind-html="errorList[errorList.length - 1].btnCancelTxt"></div> \
                                </div> \
                            </div> \
                            <div class="dialog-dir-container center" ng-if="errorList[errorList.length - 1].type == popupType.edit" ng-click="$event.stopPropagation()"> \
                                <div class="dialog-dir-title-text Regular" ng-bind-html="errorList[errorList.length - 1].title"></div> \
                                <div ng-if="errorList[errorList.length - 1].msg" class="dialog-dir-main-text edit-box-enabled Regular" ng-bind-html="errorList[errorList.length - 1].msg"></div> \
                                <input placeholder="{{errorList[errorList.length - 1].placeholderText}}" id="dialog-dir-edit-input" ng-class="{\'main-text-enabled\' :errorList[errorList.length - 1].msg}" class="dialog-dir-edit-input-box" ng-model="errorList[errorList.length - 1].editText" type="text" maxlength="{{errorList[errorList.length - 1].maxLength}}" ng-trim="false">\
                                <div class="dialog-dir-buttons-cotainer"> \
                                    <div class="ok-button" ng-if="!!errorList[errorList.length - 1].btnOkTxt" ng-click="clickHandler(2)" ng-bind-html="errorList[errorList.length - 1].btnOkTxt"></div> \
                                    <div class="cancel-button" ng-if="!!errorList[errorList.length - 1].btnCancelTxt" ng-click="clickHandler(1)" ng-bind-html="errorList[errorList.length - 1].btnCancelTxt"></div> \
                                </div> \
                            </div> \
                            <div class="dialog-dir-container center" ng-if="errorList[errorList.length - 1].type == popupType.selection" ng-click="$event.stopPropagation()"> \
                                <div class="dialog-dir-title-text title-type-selection Regular" ng-bind-html="errorList[errorList.length - 1].title"></div> \
                                <ul class="dialog-dir-list">\
                                    <li class="dialog-dir-list-items" ng-repeat="item in errorList[errorList.length - 1].optionsList  track by $index" ng-click="selectionHandler($index)">\
                                        <img class="dialog-dir-radio-button-off" ng-class="{\'dialog-dir-radio-button-on\' : (errorList[errorList.length - 1].selectedIndex ==  $index)}">\
                                        <span class="dialog-dir-listTxt"  ng-class="{\'dialog-dir-listTxt-selected\' : (errorList[errorList.length - 1].selectedIndex ==  $index)}" ng-bind="item"></span>\
                                    </li>\
                                </ul>\
                                <div class="dialog-dir-buttons-cotainer"> \
                                    <div class="ok-button" ng-if="!!errorList[errorList.length - 1].btnOkTxt" ng-click="clickHandler(3)" ng-bind-html="errorList[errorList.length - 1].btnOkTxt"></div> \
                                    <div class="cancel-button" ng-if="!!errorList[errorList.length - 1].btnCancelTxt" ng-click="clickHandler(1)" ng-bind-html="errorList[errorList.length - 1].btnCancelTxt"></div> \
                                </div> \
                            </div> \
                        </div>',
            link: function (scope) {
                var errorList = scope.errorList,
                        promise;
                scope.popupType = {normal : 1,          //Normal popup
                              edit: 2,                  //Popup with edit/input box
                              selection: 3              //Popup with selection options 
                            };
                scope.clickHandler = clickHandler;
                scope.selectionHandler = selectionHandler;
                function selectionHandler(index){
                    console.log("Selected Index is =" + index);
                    scope.errorList[errorList.length - 1].selectedIndex = index;
                }
                function clickHandler() {
                    switch(arguments[0]){
                        case 0:
                            scope.$eval(errorList[errorList.length - 1]['btnOkHandler']());
                            break;
                        case 1:
                            scope.$eval(errorList[errorList.length - 1]['btnCancelHandler']());
                            break;
                        case 2:
                            scope.$eval(errorList[errorList.length - 1]['btnOkHandler'](errorList[errorList.length - 1].editText));
                            break;
                        case 3:
                            scope.$eval(errorList[errorList.length - 1]['btnOkHandler'](scope.errorList[errorList.length - 1].selectedIndex));
                            break;
                        default:
                            console.log("default case");
                            break;
                    }
                    //scope.$eval(errorList[errorList.length - 1][index === 0? 'btnOkHandler' : 'btnCancelHandler'](errorList[errorList.length - 1].editText));
                    
                    if(errorList !== null && errorList.length > 0 && errorList[errorList.length - 1].closeDialog) {
                        releaseDialog();
                    }
                }
                
                //watch over errorList. If any change, show animation of loading pop-up.
                /*scope.$watch('error-list', setDialog());*/
                
                /*function setDialog(newVal, oldVal) {
                    //excecute below statments only if new error added.
                    if(!oldVal || (!!newVal && newVal.length > oldVal.length)) {
                        UtilityService.toggleBottomPopUpClass(true, scope);
//
//                        //Cancel if any timer already running.
//                        if(!!promise && !promise.$$state.status) {
//                            $timeout.cancel(promise);
//                        }
//                        //if dialog is supposed to close after a time interval, then set timeout.
//                        if(!!errorList[errorList.length - 1].timeOut) {
//                            promise = $timeout(releaseDialog, errorList[errorList.length - 1].timeOut);
//                        }
                    }
                }*/
                
                function releaseDialog() {
                    //if a promise exist and has been resolved.
                    if(!!promise && !!promise.$$state.status) {
                        promise = undefined;
                    }
                    UtilityService.toggleBottomPopUpClass(false, scope);
                    errorList.pop();
                }
            } //close link function.
        }; //close return object.
    }]); //close directive.