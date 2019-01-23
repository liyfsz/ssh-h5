$(function() {
  /*身份证正面上传*/
  $(".uploadPic").change(function(obj) {
    var objUrl;
    objUrl = getObjectURL(this.files[0]);
    $(this).siblings("span").css("background-image", "url(" + objUrl + ")").find("img").attr("src","");
    _create(objUrl,function(){},$(this).prop("id"));
    
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


//关闭弹框
$('.repay').click(function(){
  hideInfo();
});

  
  $(".btn").click(function(){
    if($("#bussinessLicenseImage").val()==''){
      showInfo('请上传营业执照扫描件');
      return ;
    }
    /*if($("#htImage").val()==''){
      showInfo('场地租赁合同');
      return ;
    }
    if($("#cdImage").val()==''){
      showInfo('场地照片');
      return ;
    }*/
    if($("#personCardUp").val()==''){
      showInfo('身份证正面');
      return ;
    }
    if($("#personCardDown").val()==''){
      showInfo('身份证背面');
      return ;
    }
    $.ajax({
        type: "POST",
        url: baseUrl+"/seller/audit/h5UpdatePhoto.html",
        data:JSON.stringify($("#picForm").serializeObject()),
        contentType: 'application/json',
        success: function(data) {
          console.log(data);
          if (data.resultCode =="SUCCESS") {
          	window.location.href=baseUrl+"/member/index.html";
          }else if(data.errorCode =="ERROR_SYSTEM"){
          	showInfo('系统内部错误，请稍后再试');
          }else if(data.errorCode =="ERROR_NOAUTH"){
          	showInfo('用户未登录，清登陆后再试');
          }else{
          	showInfo(data.errorMessage);
          }
        }
      });

  });

});