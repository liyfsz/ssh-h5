

// window.onload = function(){
//     initnav();
// }
/*初始化滑块内每个li的宽度，并以此计算li父容器的总款
* param showliNum 要展示的li个数
*/

var currX = 0;
function initnav(){
    var currentLiNum=$(".tab_nav ul li").length;
    var liwidth = $(".tab_nav ul li").outerWidth();
    var ulWidth = liwidth*currentLiNum;
    $(".tab_nav ul li").css("width",liwidth);//初始化li的宽度
    $(".tab_nav ul").css("width",ulWidth);//初始化父容器的宽度
    var parentBox = $('.tab_nav')[0];
    var childBox = $('.tab_nav > ul')[0];
    var parentBoxW = $('.tab_nav').width();
    var childBoxW = $('.tab_nav > ul').width();
    leftSwipe(parentBox,childBox,parentBoxW,childBoxW);
}


/*左侧滑动*/
function leftSwipe(parentBox,childBox,parentW,childW){

    /*定位区间 缓冲区间*/
    var maxPosition = 0;
    var minPosition = -(childW - parentW);
    var distance = 0;

    /*滑动区间*/
    var maxSwipe = maxPosition + distance;
    var minSwipe = minPosition - distance;

    /*公用方法*/
    /*定位*/
    var setTranslateX = function(translateX){
        /*效率更高*/
        childBox.style.transform = 'translateX('+translateX+'px)';
        childBox.style.webkitTransform = 'translateX('+translateX+'px)';
    }
    /*加过渡*/
    var addTransition = function(){
        childBox.style.transition = 'all .2s ease';
        childBox.style.webkitTransition = 'all .2s ease';
    }
    /*清楚过渡*/
    var removeTransition = function(){
        childBox.style.transition = 'none';
        childBox.style.webkitTransition = 'none';
    }

    /*滑动*/
    var startX = 0;/*开始X坐标*/
    var moveX = 0;/*滑动时候的X坐标*/
    var distanceX = 0;/*滑动的距离*/
    /*记录当前的定位*/
    //var currX = 0;

    childBox.addEventListener('touchstart',function(e){
        startX = e.touches[0].clientX;
        // console.log(startX);
    });
    childBox.addEventListener('touchmove',function(e){
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        removeTransition();
        setTranslateX(currX + distanceX);
        // console.log(distanceX);

    });
    window.addEventListener('touchend',function(){
        /*计算 当前滑动结束之后的位置*/
        currX = currX + distanceX;
        // console.log(currX);
        if(currX > maxSwipe){
            currX = maxSwipe;
            addTransition();
            setTranslateX(currX);
        }else if(currX < minSwipe){
            currX = minSwipe;
            addTransition();
            setTranslateX(currX);
        }

    
        /*重置记录的参数*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
    });
}
