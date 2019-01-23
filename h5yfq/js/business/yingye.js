$(".uploadPic1").change(function(obj) {
    var objUrl;
    objUrl = getObjectURL1(this.files[0]);
    $(this).siblings("span").css("background-image", "url(" + objUrl + ")").find("img").attr("src","");
    _create1(objUrl,function(){},$(this).prop("id"));
  });
   function getObjectURL1(file) {
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
/*创建图片*/
  function _create1(blob,callback,obj) {
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
      $.ajax({
      type: "POST",
      url: baseUrl+"/seller/audit/h5UpdatePhoto.html",
      data:JSON.stringify({
        'up_bussinessLicenseImage':base64
      }),
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
        if (data.resultCode =="SUCCESS") {
          showInfo("上传成功");
        } else {
          showInfo("上传失败");
        }
      }
    });
    };
  }