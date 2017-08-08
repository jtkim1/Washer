app.directive('bottomOptions', function() {
        return {
            restrict: 'AE',
            scope: {
                ifDisabled: '=',
                sId : '@',
                iconImagePath: '@',
                ifSingleText: '=',
                textInfoMain: '@',
                textInfoSub: '@',
                rightTextVisible: '=',
                rightText: '@',
                rightIconVisible: '=',
                ifToggleIcon: '=',
                ifNextIcon: '=',
                currentToggleVal: '=',
                customIconClass:'@',
                titleText:'@'
            },
            template:   '<div class="bottom_item waves-effect press-list" ng-class="{\'no_click\' : ifDisabled}" role="button" aria-label="{{titleText}}">\
                            <div ng-if="iconImagePath" class="bottom_item_image_circle {{customIconClass}}" ng-class="{\'circle_disabled\' : ifDisabled}">\
                                <svg viewBox="0 0 160 160" class="bottom_item_image commonSelectedIcon" ng-class="{\'disabledIcon\' : ifDisabled}" id={{sId}}>\
                                    <use xlink:href="{{iconImagePath}}"></use>\
                                </svg>\
                            </div>\
                            <div class="bottom_item_singleline Regular" ng-class="{\'bottom_item_multiline_2_disabled\' : ifDisabled}" ng-show="ifSingleText" ng-bind-html="textInfoMain">\
                            </div>\
                            <div class="bottom_item_multiline" ng-show="!ifSingleText">\
                                <p class="bottom_item_multiline_1 Regular" ng-class="{\'bottom_item_multiline_2_disabled\' : ifDisabled}" ng-bind-html="textInfoMain"></p>\
                                <p class="bottom_item_multiline_2 Regular" ng-class="{\'bottom_item_multiline_2_disabled\' : ifDisabled}" ng-bind-html="textInfoSub"></p>\
                            </div>\
                            <div class="bottom_item_right_IconPlacehoder" ng-show="rightIconVisible">\
                                <img class="toggle-button-off" ng-class="{\'toggle-button-on\':currentToggleVal === true, \'btn-disabled\':ifDisabled}" ng-show="ifToggleIcon"/>\
                                <svg viewBox="0 0 88 88" class="bottom_item_rightOptionArrow nextIcon" ng-class = "{\'nextIconDisabled\' : ifDisabled}" ng-show="ifNextIcon">\
                                    <use xlink:href="common/img/ws_list_ic_next.svg#Layer_1"></use>\
                                </svg>\
                            </div>\
                            <div class="bottom_item_right_Text" ng-show="rightTextVisible">\
                                <p class="bottom_item_singleline RegularCondensed" ng-bind-html="rightText"></p>\
                            </div>\
                            <div class="border_bottom_left"></div>\
                         </div>'
        }; //close return object.
    }); //close directive.
