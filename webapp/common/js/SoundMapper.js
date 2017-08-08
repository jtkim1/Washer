var HANGUL_BEGIN_UNICODE = 44032; // 가
var HANGUL_LAST_UNICODE = 55203; // 힣
var HANGUL_BASE_UNIT = 588;// 각자음 마다 가지는 글자수
var INITIAL_SOUND = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

function isInitialSound(searchar) {
    var tempBool = false;
    INITIAL_SOUND.forEach(function (c) {
        if (c === searchar) {
            tempBool = true;
        }
    });
    return tempBool;
}

/**
 * 해당 문자의 자음을 얻는다.
 * 
 * @param c
 *            검사할 문자
 * @return
 */
function getInitialSound(c) {
    var hanBegin = (c.charCodeAt(0) - HANGUL_BEGIN_UNICODE);
    var index = parseInt(hanBegin / HANGUL_BASE_UNIT, 10);
    return INITIAL_SOUND[index];
}

/**
 * 해당 문자가 한글인지 검사
 * 
 * @param c
 *            문자 하나
 * @return
 */
function isHangul(c) {
    return HANGUL_BEGIN_UNICODE <= c.charCodeAt(0) && c.charCodeAt(0) <= HANGUL_LAST_UNICODE;
}

/**
 * * 검색을 한다. 초성 검색 완벽 지원함.
 * 
 * @param value
 *            : 검색 대상 ex> 초성검색합니다
 * @param search
 *            : 검색어 ex> ㅅ검ㅅ합ㄴ
 * @return 매칭 되는거 찾으면 true 못찾으면 false.
 */
function matchString(value, search) {
    var t = 0;
    var seof = value.length - search.length;
    var slen = search.length;
    if (seof < 0)
        return false; // 검색어가 더 길면 false를 리턴한다.
    for (var i = 0; i <= seof; i++) {
        t = 0;
        while (t < slen) {
            if (isInitialSound(search.charAt(t)) && isHangul(value.charAt(i + t))) {
                // 만약 현재 char이 초성이고 value가 한글이면
                if (getInitialSound(value.charAt(i + t)) === search.charAt(t))
                    // 각각의 초성끼리 같은지 비교한다
                    t++;
                else
                    break;
            } else {
                // char이 초성이 아니라면
                if (value.charAt(i + t) === search.charAt(t))
                    // 그냥 같은지 비교한다.
                    t++;
                else
                    break;
            }
        }
        if (t === slen) {
            return true; // 모두 일치한 결과를 찾으면 true를 리턴한다.
        } else {
            return false;
        }
    }
    return false; // 일치하는 것을 찾지 못했으면 false를 리턴한다.
}

function containString(value, search) {
    var t = 0;
    var seof = value.length - search.length;
    var slen = search.length;
    if (seof < 0)
        return false; // 검색어가 더 길면 false를 리턴한다.
    var i = 0;
    t = 0;
    while (t < slen) {
        if (i + t >= value.length) {
            break;
        }
        if (isInitialSound(search.charAt(t)) === true && isHangul(value.charAt(i + t))) {
            // 만약 현재 char이 초성이고 value가 한글이면
            if (getInitialSound(value.charAt(i + t)) === search.charAt(t))
                // 각각의 초성끼리 같은지 비교한다
                t++;
            else if (t === 0) {
                i++;
            } else {
                break;
            }

        } else {
            // char이 초성이 아니라면
            if (value.charAt(i + t) === search.charAt(t))
                // 그냥 같은지 비교한다.
                t++;
            else if (t === 0) {
                i++;
            } else {
                break;
            }
        }
    }
    if (t === slen) {
        return true; // 모두 일치한 결과를 찾으면 true를 리턴한다.
    } else {
        return false;
    }
}

function performSearchOperation(locText, orginialValues) {
    var prefixString = locText.toLowerCase(),
            values = orginialValues,
            count = values.length,
            newValues = [];

    // search with mid letter
    for (var i = 0; i < count; i++) {
        var value = values[i];
        var valueText = value.toString().toLowerCase();

        // search with first letter
        if (matchString(valueText, prefixString)) {
            newValues.push(value);
        } else if (valueText.indexOf(prefixString) === 0) {
            // First match against the whole, non-splitted value
            newValues.push(value);
        } else {
            var words = valueText.split(" ");
            var wordCount = words.length;

            // Start at index 0, in case valueText starts with
            // space(s)
            for (var k = 0; k < wordCount; k++) {
                if (words[k].indexOf(prefixString) === 0) {
                    newValues.push(value);
                    break;
                }
            }
        }
    }

    for (var j = 0; j < count; j++) {
        var item = values[j];
        var valueTextTwo = item.toString().toLowerCase();

        if (containString(valueTextTwo, prefixString)) {
            if (newValues.indexOf(item) === -1) {
                newValues.push(item);
            }
        } else if (valueTextTwo.indexOf(prefixString) !== -1) {
            if (newValues.indexOf(item) === -1) {
                newValues.push(item);
            }
        } else {
            // Nothing
        }
    }
    return newValues;
}