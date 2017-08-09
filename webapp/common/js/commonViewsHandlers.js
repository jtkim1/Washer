/* 
 * Copyright (c) 2017 by Samsung Electronics, Inc.,
 *
 * This software is the confidential and proprietary information
 * of Samsung Electronics, Inc. ("Confidential Information").  You
 * shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement
 * you entered into with Samsung.
 *
 */
function extendScopeForCommonViews() {
    var scope = angular.element(document.body).scope();
    scope.errorPageObj = {
        errorPageshow : false,
        errorPageTitleText : null,
        errorPageErrorCode : null,
        errorPageDescription : null,
        errorPageBtnClickHandler : null,
        errorPageButtonText : null,
        onClickAction : null,
        errorPageIconPath : null,
        noErrorPageShow : false,
        noErrorText : null,
        updateErrorObject : function(){     
            var errObj = scope.errorPageObj;
            errObj.errorPageIconPath = arguments[6];
            errObj.errorPageTitleText = arguments[0];
            errObj.errorPageErrorCode = arguments[1];
            errObj.errorPageDescription = arguments[2];
            errObj.errorPageButtonText = arguments[3];
            errObj.errorPageBtnClickHandler = arguments[4];
            errObj.onClickAction = arguments[5];
            errObj.errorPageshow = true;  
            
        },        
        updateNoErrorObject : function(){
            var errObj = scope.errorPageObj;
            errObj.noErrorPageShow = arguments[0];
            errObj.noErrorText = arguments[1];
        },        
        resetErrorObject : function(){
            var errObj = scope.errorPageObj;
            errObj.errorPageshow = false;  
            errObj.errorPageTitleText = null;
            errObj.errorPageErrorCode = null;
            errObj.errorPageDescription = null;
            errObj.errorPageButtonText = null;
            errObj.errorPageBtnClickHandler = null;
            errObj.noErrorPageShow = false;
            errObj.noErrorText = null;            
        }
    };
    
    scope.smartCarePageObj = {
        smartCarePageShow : false,
        smartCareGuideText : null,
        smartCareDiagnosisStarText : null,
        smartCareBtnClickHandler : null,
        updateSmartCareObject : function(){
            var smartCareObj = scope.smartCarePageObj;
            smartCareObj.smartCarePageShow = arguments[0];
            smartCareObj.smartCareGuideText = arguments[1];
            smartCareObj.smartCareDiagnosisStarText = arguments[2];
            smartCareObj.smartCareBtnClickHandler = arguments[3];            
        },
        
        resetSmartCareObject : function(){
            var smartCareObj = scope.smartCarePageObj;
            smartCareObj.smartCarePageShow = false;
            smartCareObj.smartCareGuideText = null;
            smartCareObj.smartCareDiagnosisStarText = null;
            smartCareObj.smartCareBtnClickHandler = null;            
        }
    };
}