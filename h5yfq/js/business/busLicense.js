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
$("#sessionId").val(GetQueryString('sessionId'));
if(GetQueryString('sessionId') == '' || GetQueryString('sessionId') == null){
  getSessionId();
}else{
  
  $(".btn").click(function(){
    if($("#bussinessLicenseImage").val()==''){
      showInfo('请上传营业执照扫描件');
      return ;
    }
    if($("#htImage").val()==''){
      showInfo('场地租赁合同');
      return ;
    }
    if($("#cdImage").val()==''){
      showInfo('场地照片');
      return ;
    }
    if($("#personCardUp").val()==''){
      showInfo('身份证正面');
      return ;
    }
    if($("#personCardDown").val()==''){
      showInfo('身份证背面');
      return ;
    }
    window.location.href="success.html"

  });
}
});