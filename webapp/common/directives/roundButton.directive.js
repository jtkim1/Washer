app.directive('roundButton', function() {
        return {
            restrict: 'AE',
            scope: {
                ifDisabled: '=',
                btnText: '@',
                ifSelected: '=',
                ifFontStyle:'=',
                onButtonClick: '&'
            },
            template:   '<div class="common-btn-bg" ng-class="{\'no_click\':ifDisabled,\'common-btn-bg-selected\':ifSelected==true, \'common-btn-bg-disabled\':ifDisabled==true}" ng-click="onButtonClick()">\
                            <span role="button" class="common-btn-text truncate-text" ng-class="{\'RegularCondensed\':ifFontStyle===true, \'BoldCondensed\':ifFontStyle!==true, \'common-btn-text-selected\':ifSelected == true, \'common-btn-text-disabled\':ifDisabled==true}"}" ng-bind-html="btnText | uppercase"></span>\
                        </div>'
        }; //close return object.
        
        
    }); //close directive.