// sample: http://codepen.io/ktknest/full/LDljw/

angular.module('pinch-zoom', [])
/**
 * @ngdoc directive
 * @name pinchZoom
 * @restrict A
 * @scope false
 *
 * @description
 * 要素のピンチアウト・インでの拡大・縮小、拡大時のスワイプ動作を提供
 *
 **/
.directive('pinchZoom', function() {
  var _directive =  {
    restrict : 'A',
    scope    : false,
    link     : _link
  };

  function _link(scope, element, attrs) {
    var elWidth = element[0].offsetWidth;
    var elHeight = element[0].offsetHeight;
    console.log("came inside pinch zoom");
   
   console.log(document.getElementById("pinch").getBoundingClientRect().left,document.getElementById("pinch").getBoundingClientRect().top,"consoling x and y");
     //console.log("element[0].offsetWidth,element[0].offsetHeight",element[0].offsetHeight,element[0].offsetHeight);
    // モード（pinch or swipe）
    var mode = '';
    //console.log("printing three things",scope, element.css, attrs);
    
    // ピンチ時の2点間の距離
    var distance = 0;
    var initialDistance = 0;

    // 拡大率
    var scale = 1;
    var relativeScale = 1;
    var initialScale = 1;
    var MAX_SCALE = 10;

    // 要素の左上端の座標
    var positionX = 0;
    var positionY = 0;

    var initialPositionX = 0;
    var initialPositionY = 0;

    // ピンチ時の中心座標
    var originX = 0;
    var originY = 0;

    // スワイプ時のスタート座標・移動量
    var startX = 0;
    var startY = 0;
    var moveX = 0;
    var moveY = 0;

    element.css({
     '-webkit-transform-origin' : 'center',
     'transform-origin'         : 'center'

  });
   
    element.on('load', function () {
        elWidth = element[0].clientWidth;
        elHeight = element[0].clientHeight;
        console.log("element[0].offsetWidth,element[0].offsetHeight",elWidth,elHeight);
    });

    element.on('touchstart', function(evt) {
      startX = evt.touches[0].pageX;
      startY = evt.touches[0].pageY;
      
//       element.css({
//      '-webkit-transform-origin' : 'startX startY',
//      'transform-origin'         : 'startX startY'
//      });
//      
//      
      console.log(startX,startY,"consoling x and y");
      initialPositionX = positionX;
      initialPositionY = positionY;
      moveX = 0;
      moveY = 0;
      mode = '';

      if (evt.touches.length === 2) {
        startX = (evt.touches[1].pageX+ evt.touches[0].pageX)/2;
        startY = (evt.touches[1].pageY+ evt.touches[0].pageY)/2;
        initialScale = scale;
        initialDistance = getDistance(evt);
//        originX = evt.touches[0].pageX -
//                 parseInt((evt.touches[0].pageX - evt.touches[1].pageX) / 2, 10) -
//                 element[0].offsetTop ;
//        originY = evt.touches[0].pageY -
//                 parseInt((evt.touches[0].pageY - evt.touches[1].pageY) / 2, 10) -
//                 element[0].offsetTop ;
//       originX=center;
//       originY=center;
//       console.log("originY",originY);

      }
    });

    element.on('touchmove', function (evt) {
        if (mode === 'swipe' && scale > 3) {
            evt.preventDefault();

            moveX = evt.touches[0].pageX - startX;
            moveY = evt.touches[0].pageY - startY;

            positionX = initialPositionX + moveX;
            positionY = initialPositionY + moveY;
            transformElement();
        } else if (mode === 'pinch') {
            evt.preventDefault();
            distance = getDistance(evt);
            relativeScale = distance / initialDistance;
            scale = relativeScale * initialScale;

            positionX = originX * (1 - relativeScale) + initialPositionX + moveX;
            positionY = originY * (1 - relativeScale) + initialPositionY + moveY;
            transformElement();
        } else {
            if (evt.touches.length === 1) {
                mode = 'swipe';
            } else if (evt.touches.length === 2) {
                mode = 'pinch';
            }

        }
        transformElement();
    });


    element.on('touchend', function(evt) {

      if (mode === 'pinch') {

        if (scale < 3) {

          scale = 3;
          positionX = 0;
          positionY = 0;

        } else if (scale > MAX_SCALE) {

          scale = MAX_SCALE;
          relativeScale = scale / initialScale;
          positionX = originX * (1 - relativeScale) + initialPositionX + moveX;
          positionY = originY * (1 - relativeScale) + initialPositionY + moveY;

        }

      }

      if (scale <3&&scale>1) {

        if (positionX > 0) {
          positionX = 0;
        } else if (positionX < elWidth ) {
          positionX = 0;
        }
        if (positionY > 0) {
          positionY = 0;
        } 
        else if (positionY < elHeight ) {
          positionY =0;
        }

      }

      transformElement(0.1);
    });
    

          scale = 3;
          relativeScale = scale / initialScale;
          positionX = originX * (1 - relativeScale) + initialPositionX + moveX;
          positionY = originY * (1 - relativeScale) + initialPositionY + moveY;
          console.log("sfyuysubfuysbyfbsuybfsuybfbsfbsfb111");
          transformElement(0.1);

    function getDistance(evt) {
      var d = Math.sqrt(Math.pow(evt.touches[0].pageX - evt.touches[1].pageX, 2) +
                        Math.pow(evt.touches[0].pageY - evt.touches[1].pageY, 2));
      return parseInt(d, 10);
    }

    function transformElement(duration) {
      var transition  = duration ? 'all cubic-bezier(0,0,.5,1) ' + duration + 's' : '',
          matrixArray = [scale, 0, 0, scale, positionX, positionY],
          matrix      = 'matrix(' + matrixArray.join(',') + ')';

      element.css({
        '-webkit-transition' : transition,
        'transition'         : transition,
        '-webkit-transform'  : matrix + ' translate3d(0,0,0)',
        'transform'          : matrix
      });
    }
  }
  return _directive;
});