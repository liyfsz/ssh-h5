//连后端的服务需要配空的baseUrl
/*window.baseUrl = "";*/

//上测试和链接测试服务器
window.baseUrl = "/h5";


//切测试地址需要换地址
window.picUrl="http://192.168.2.33:8300/ejsimage";
//切生产需要换地址
/*window.picUrl="http://120.55.137.221:8300/ejsimage";*/



function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}


function listenSelected(arr1,arr2){
	for(var i=0;i<arr1.length;i++){
		//给表单中对应的字段赋值
		
		var item = $("input[name="+arr1[i]+"]:checked").attr("data-value")||'1';
    $("#"+arr1[i]).val(item);
	}
	
	for(var j=0;j<arr2.length;j++){
		//地址栏给表单中对应的字段赋值
		var item = GetQueryString(arr2[j])||getSessionVal(arr2[j]);
		/*地址栏的赋值*/
		$("#"+arr2[j]).val(item);
	}
	
	return true;
}


function formDataToJson(formElement) {
	var queryArray = $(formElement).serializeArray();
	var jsonString = '{';
	for(var i = 0; i < queryArray.length; i++) {
		jsonString += JSON.stringify(queryArray[i].name) + ':' + JSON.stringify(queryArray[i].value) + ',';
	}
	jsonString = jsonString.substring(0, (jsonString.length - 1));
	jsonString += '}';
	return jsonString;
}
//展示弹框
function showMask(){
	  $(".mask").show();
	  $(".content").show();
}
//隐藏弹框
function hideMask(){
	 $(".mask").hide();
	 $(".mask .content").hide();
}
//传值弹框弹出
function showInfo (msg){
	 $('.msg').html(msg);
	 $("#dialogs").show();
}
function hideInfo(){
	 $("#dialogs").hide();
}

$(".repay").click(function(){
	hideInfo();
});

$(".cancel").click(function(){
	hideMask();
});

 $.fn.serializeStrJson = function () {
        var obj = {};

        $.each(this.serializeArray(), function (i, o) {
            var n = o.name, v = o.value;

            if (obj[n]) {
                if ($.isArray(obj[n])) {
                    obj[n].push(v);
                } else {
                    obj[n] = [obj[n], v];
                }
            } else {
                obj[n] = v;
            }
        });

        return JSON.stringify(obj);
    };
 
  $.fn.serializeObject = function () {
        var obj = {};

        $.each(this.serializeArray(), function (i, o) {
            var n = o.name, v = o.value;

            if (obj[n]) {
                if ($.isArray(obj[n])) {
                    obj[n].push(v);
                } else {
                    obj[n] = [obj[n], v];
                }
            } else {
                obj[n] = v;
            }
        });

        return obj;
    };

//判断客户端是iOS还是安卓,分别获取sessionid

function getSessionId() {
	if(sessionStorage.getItem("sessionId")) {
		window.location.href = '../login/login.html'
	} else {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
		if(isAndroid) {
			window.android.reLogin();
		} else if(isiOS) {
			window.webkit.messageHandlers.reLogin.postMessage("getSessionId");
		}
	}

}

//获取sessionId的值传递
function getSessionVal(){
	return GetQueryString("sessionId")||sessionStorage.getItem("sessionId");
}
//判断客户端是iOS还是安卓,安卓返回true

function getTerminal(){
	var u = navigator.userAgent; 
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
  if(isAndroid){
  	return true;
  }else if(isiOS){
		return false;
  }
}


/*创建图片*/
  function _create(blob,callback,obj) {
    var img = new Image();
    img.src = blob;
    
    img.onload = function() {  //图片加载
      var that = this;
      //生成比例
      var w = that.width,
        h = that.height,
        quality = w / h;
      w = w;
      h = w / quality;
      //生成canvas
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      $(canvas).attr({
        width: w,
        height: h
      });
      ctx.drawImage(that, 0, 0, w, h);
      /**
       * 生成base64
       * 兼容修复移动设备需要引入mobileBUGFix.js
       */
      var base64 = canvas.toDataURL('image/jpeg',quality || 0.8);
      // 修复IOS
      if (navigator.userAgent.match(/iphone/i)) {
        var mpImg = new MegaPixImage(img);
        mpImg.render(canvas, {
          maxWidth: w,
          maxHeight: h,
          quality: quality || 0.8
        });
        base64 = canvas.toDataURL('image/jpeg', quality || 0.8);
      }
      // 修复android
      if (navigator.userAgent.match(/Android/i)) {
        var encoder = new JPEGEncoder();
        base64 = encoder.encode(ctx.getImageData(0, 0, w, h), 80);
      }
      callback(base64);    
      $("#"+obj).next().val(base64);
    };
  }

//返回上一页
$(".goBack").click(function(){
	document.referrer === '' ?  
          window.location.href = '../index.html' :  
          window.history.go(-1);  
});