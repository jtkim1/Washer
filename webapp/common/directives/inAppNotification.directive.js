//inAppNotification
app.directive('inAppNotification', function() {
        return {
            restrict: 'AE',
            scope: {
                showLeftIcon: '=',
                leftIconPath:'@',
                notificationText:'@',
                showInAppNotification:'=',
                closeInAppNotification:'=',
            },
            template:   '<div ng-if="showInAppNotification()" ng-click="" aria-label="notificationText">\
                            <div>\
                                <div  ng-if="showLeftIcon" class="inapp-left-icon-container left">\
                                    <svg viewBox="0 0 120 120" class="inapp-left-icon" id="inapp-left-icon">\
                                        <use xlink:href="{{leftIconPath}}"></use>\
                                    </svg>\
                                </div>\
                                <div class="inapp-message-container">\
                                    <p  class="inapp-message Regular" ng-bind-html="notificationText"></p>\
                                </div>\
                            </div>\
                            <div class="inapp-close-btn-container" ng-click="closeInAppNotification()">\
                                    <svg viewBox="0 0 96 96" class="inapp-right-icon">\
                                        <use xlink:href="common/img/ic_search_delete.svg#Layer_1"></use>\
                                    </svg>\
                            </div>\
                        </div>'
        }; //close return object.
}); //close directive.