//While writing directive, following conditions were considered:
//1. At any time an error can be added to the list. Here error addition means adding error programmatically.
//2. At any time, an error can be removed from the list. Here error removal means removed programmatically.
//3. Show latest error to user. After receiving user action for that error, show latest in the list, if any, to user and so on.
//4. Receive all errors in a list. This list is bidirectional. Hence, it will communicate latest status of list to app any time. This poses a risk, but benefits are higher.
//5. Clicking outside of dialog should not take any event.
//6. This should be an element.
//7. The directive should process list in reverse order. i.e. latest in the list should be displayed first to user.
// Expected object creation is as follows:
/* $scope.errorList[0] = {
            title : "Hi", 
            msg: "Helllo!", 
            btnOkTxt: "Ok",
            btnOkHandler: handleOk,
            closeDialog : true
        }; }, 1000);
    
            $scope.errorList.push({
            title : "Hi 2", 
            msg: "Helllo! 2", 
            btnOkTxt: "Ok",
            btnOkHandler: handleOk,
            btnCancelTxt: "Cancel",
            btnCancelHandler: handleCancel,
            closeDialog : true
            });
            $scope.errorList.push({
            title : "Hi 3", 
            msg: "Helllo! 3", 
            btnOkTxt: "Ok",
            btnOkHandler: handleOk,
            btnCancelTxt: "Cancel",
            btnCancelHandler: handleCancel,
            closeDialog : true
            });
            */
app.directive('dialogPopUp', ["UtilityService", "$timeout", function(UtilityService, $timeout) {
        return {
            restrict: 'AE',
            scope: {
                errorList: '=' //list of errors in queue format.
            },
            template:   '<div ng-class="BottomPopupDimBackgroundDiv" ng-if="!!errorList && !!errorList.length" ng-cloak> \
                            <div class="custPopupDiv" ng-click="$event.stopPropagation()"> \
                                <p class="custPopupText Regular" ng-bind-html="errorList[errorList.length - 1].msg"></p> \
                                <div class="custokcanceldiv"> \
                                    <p class="custOk" ng-if="!!errorList[errorList.length - 1].btnOkTxt" ng-click="clickHandler(0)" ng-bind-html="errorList[errorList.length - 1].btnOkTxt"></p> \
                                    <p class="custCancel" ng-if="!!errorList[errorList.length - 1].btnCancelTxt" ng-click="clickHandler(1)" ng-bind-html="errorList[errorList.length - 1].btnCancelTxt"></p> \
                                </div> \
                            </div> \
                        </div>',
            link: function (scope) {
                var errorList = scope.errorList,
                        promise;
                scope.clickHandler = clickHandler;
                function clickHandler(index) {
                    scope.$eval(errorList[errorList.length - 1][index === 0? 'btnOkHandler' : 'btnCancelHandler']());
                    
                    if(errorList !== null && errorList.length > 0 && errorList[errorList.length - 1].closeDialog) {
                        releaseDialog();
                    }
                }
                
                //watch over errorList. If any change, show animation of loading pop-up.
                scope.$watch('error-list', setDialog());
                
                function setDialog(newVal, oldVal) {
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
                }
                
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