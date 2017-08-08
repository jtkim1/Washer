/*
 * header.directive.js
 * 
 * Copyright ( c ) 2016~2017 by Samsung Electronics, Inc.,
 *
 * This software is the confidential and proprietary information
 * of Samsung Electronics, Inc. ("Confidential Information").  You
 * shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement
 * you entered into with Samsung.
 *
 * Created on : Dec 28, 2016
 * Owner      : SRI
 * Author     : SRI
*/

app.directive('commonHeader', function(){
    return {
        restrict: 'AE',
         template:'\  <div class="main_header_div" ng-class="{\'main_header_div_V2\': isAppV2}" ng-if="!showCancelSave() && !showMultiSelectHeader()">\
                <div class="main_header_back_parent left" role="button" ng-click="onBackPressed()" aria-label="{{translationCommon.WEBMOB_common_TB_navigate_up}}">\
                    <svg viewBox="0 0 96 96" class="main_header_back_icon iconBlue">\
                        <use xlink:href="common/img/ic_title_back.svg#Layer_1"></use>\
                    </svg>\
                </div>\
                <div class="title-container left" ng-class="{\'title-container-not-home\': !isMainHeader() || locationName === undefined}">\
                    <div ng-click="" class="title-header truncate-text RegularCondensed Bold" ng-bind-html="getHeaderTitle()" ng-class="{\'main_header-text-home\':isMainHeader() && locationName !== undefined, \'title-header-not-home\' : !isMainHeader() || locationName === undefined, \'title-header-lower-case\' : isHeaderLowerCase()}"></div>\
                    <div ng-click="" class="title-sub-header truncate-text RegularCondensed" ng-if="isMainHeader() && locationName !== undefined">{{(roomName === \'\') ? locationName : (locationName +" - "+ roomName)}} </div>\
                </div>\
                <div class="main_header_option_container right" ng-if="isHeaderOptionVisible()" ng-class="{main_header_option_container_with_text: showHelpText()}">\
                <div class="uppercase main_header_option_text truncate-text BoldCondensed" ng-class="{right: hideMoreOption()}" ng-if="showHelpText()" ng-click="showUsageHelpPage()">{{translationCommon.WEBMOB_common_TB_help}}</div>\
                    <svg viewBox="0 0 96 96" class="main_header_option_item iconBlue" ng-click="showOptionPopup()" role="button" ng-hide="hideMoreOption()">\
                    <title>{{translationCommon.WEBMOB_common_TB_more_options}}</title>\
                        <use xlink:href="common/img/ic_title_more.svg#Layer_1"></use>\
                    </svg>\
                </div>\
            </div>\
            <div class="main_header_div new_back_color" ng-class="{\'main_header_div_V2\': isAppV2}" ng-if="showCancelSave()">\
                <div class="header-cancel-save-button uppercase Medium" ng-click="cancelFavorite()" ng-bind-html="getCancelText()" role="button"></div>\
                <div class="header-cancel-save-button uppercase Medium" ng_click="hasFavoriteChanged() && saveFavorite()" ng-bind-html="getSaveText()" ng-class="{\'header-mode-text-disabled-myFavorite no_click\': !hasFavoriteChanged()}" role="button"></div>\
            </div>\
            <div class="main_header_div" ng-class="{\'main_header_div_V2\': isAppV2}" ng-if="showMultiSelectHeader()">\
                <div class="left">\
                    <div class="_common_checkbox_container left" ng-class="{\'_common_chekbox_unselected\' : !isAllItemsChecked(), \'_common_chekbox_selected\' : isAllItemsChecked()}" ng-click="toggleAllCheckList()">\
                        <div ng-show="isAllItemsChecked()"></div>\
                    </div>\
                    <div class="_header_selectAll">\
                        <p class="Regular textLineHeight" ng-bind-html="setSelectAllText()"></p>\
                    </div>\
                </div>\
                <div class="_header_delete">\
                    <p class="_header_Options_text uppercase _header_Options_text_black Bold" ng-show="!isAllItemsChecked() && !isItemChecked()" ng-bind-html="setSelectOptionText()"></p>\
                    <p  class="_header_Options_text" ng-show="isAllItemsChecked() || isItemChecked()" ng-bind-html="numOfCheckedItems()"></p>\
                </div>\
                <div class="right" ng-class="{\'no_click\': !isAllItemsChecked() && !isItemChecked()}" ng-click="confirmDeleteItemsFromFavorite()">\
                    <p class="_header_Options_text uppercase" ng-class="{\'_header_Options_text_disabled\': !isAllItemsChecked() && !isItemChecked()}" ng-bind-html="setDeleteOptionText()"></p>\
                </div>\
                <div class="right" ng-click="cancelMultiSelect()">\
                    <p class="_header_Options_text uppercase" ng-bind-html="setCancelOptionText()"></p>\
                </div>\
            </div>\
            '
    };
});
