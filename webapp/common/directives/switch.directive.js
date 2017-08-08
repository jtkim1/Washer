app.directive('switchButton', function(){
return {
    restrict: 'E',
    scope: {
        switchState: '@'
    },
    template:'\<div>\
                    <img class="toggle-button-off" ng-class="{\'toggle-button-on\': switchState==\'true\'}">\
                    <svg viewBox="0 0 88 88" class="bottom_item_rightOptionArrow nextIcon ng-hide"></svg>\
               </div>'
};
});