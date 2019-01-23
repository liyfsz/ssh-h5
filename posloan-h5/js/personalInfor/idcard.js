$(function() {
 
  var cardImgFileData = JSON.parse(localStorage.getItem('cardImgFile'));
  if(cardImgFileData==null){
	  cardImgFileData = JSON.parse(localStorage.getItem('personData'));
  }
  var userNo = cardImgFileData.userNo;
  var localUserNo = localStorage.getItem("userNo");
  if(userNo!=undefined&&frontImg!=""&&userNo==localUserNo){
	  var frontImg = cardImgFileData.frontImg;
	  var backImg = cardImgFileData.backImg;
	  if(frontImg!=undefined&&frontImg!=""){
		  $(".rigFace").css({background:"url("+frontImg+") no-repeat",backgroundSize:"cover"}); 
		  $("#frontImg").val(frontImg);
	  }
	  if(backImg!=undefined&&frontImg!=""){
		  $(".backFace").css({background:"url("+backImg+") no-repeat",backgroundSize:"cover"});  
		  $("#backImg").val(backImg);
	  } 
  }
  
  /*身份证上传*/
  $(".uploadPic").change(function(obj) {
    var relateLabel = $(this).siblings("label");
    var objUrl = getObjectURL(this.files[0]);
    relateLabel.css("background-image", "url(" + objUrl + ")");
    relateLabel.find("span").css("display","block");
    //_create(objUrl,function(){},$(this).prop("id"));
    _create(this.files[0],objUrl,$(this).prop("id"));
    //$("#submitIdCard").prop("disabled",false);
  });


  function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }

  
  $(document).on('click',"#submitIdCard",function() {
  	if(!$("#frontImg").val()){
      showInfo("请上传身份证正面");
    }else if(!$("#backImg").val()){
      showInfo("请上传身份证反面");
    }else{
      $("#submitIdCard").prop("disabled",true);
      var paramsObj = $("form").serializeObject();
      paramsObj.userNo = localStorage.getItem('userNo');
      var idInfor = paramsObj;
      var signature = getSign(idInfor);
          paramsObj.signature = signature;
      submitForm(
        baseUrl + '/mobile/gate/updateImgFileByUserNo',
        encrypt(paramsObj),
        function(data) {
          console.log(data);
          if(data.code == '0000') {
        	 localStorage.setItem('cardImgFile',JSON.stringify(paramsObj));
        	 window.location.href = 'sendCode.html';
          } else {
        	 $("#submitIdCard").prop("disabled",false);
             showInfo(data.msg);
          }
        });
    }
  });
});


/*创建图片*/
 function _create(option,objUrl,obj) {
	var opt = {
         url: objUrl,
         size: option.size,
         width: option.width || 800,
         height: option.height || 600,
         rate: option.rate || 0.6,
         callback: option.callback || function(url) {}
    };
    var img = new Image();
    img.src = opt.url;
    
    img.onload = function() {  //图片加载
      var that = this;
      //生成比例
      var w = that.width,
        h = that.height,
        quality = w / h;
      w = w;
      h = w / quality;
      
      //根据最大尺寸 800x600的大小，按比例重新设置图片的尺寸
      var neww = opt.width;
      var newh = opt.height;
      //当图片的宽高分别大于800，600的情况下，在对其进行尺寸的压缩（尺寸压缩对最终size的减小有很大作用）
      if(w > opt.width && h > opt.height) {
          if(h/w > opt.height/opt.width) {
              newh = opt.height;
              neww = (opt.height/h) * w;
          } else {
              newh = (opt.width/w) * h;
              neww = opt.width;
          }
      }
      //压缩率
      var rate = opt.rate;
      if(opt.size < 1024*1024*2) {//小于2m处理;
          rate = opt.rate * 0.6;
      } else if(opt.size < 1024*1024*4) {//2m到4m之间
          rate = opt.rate * 0.4;
      } else if(opt.size < 1024*1024*8) {//4m到8m之间
          rate = opt.rate * 0.3;
      } else {//大于8m的图片
          rate = opt.rate * 0.2;
      }
      w = neww;
      h = newh;
      
      //生成canvas
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      $(canvas).attr({width: w,height: h});
      ctx.drawImage(that, 0, 0, w, h);
      /**
       * 生成base64
       * 兼容修复移动设备需要引入mobileBUGFix.js
       */
      var base64 = canvas.toDataURL('image/jpeg',rate);
      // 修复IOS
      if (navigator.userAgent.match(/iphone/i)) {
        var mpImg = new MegaPixImage(img);
        mpImg.render(canvas, {
          maxWidth: w,
          maxHeight: h,
          quality:rate
        });
        base64 = canvas.toDataURL('image/jpeg',rate);
      }
      // 修复android
      if (navigator.userAgent.match(/Android/i)) {
        var encoder = new JPEGEncoder();
        base64 = encoder.encode(ctx.getImageData(0, 0, w, h), 80);
      }
      opt.callback(base64);    
      $("#"+obj).next().val(base64);
    };
}