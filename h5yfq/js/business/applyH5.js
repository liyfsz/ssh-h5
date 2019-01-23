//单选的切换
$(function(){
  $("input[type='radio']").live("click",function(){
    $("input[name='userTyp']").parent().removeClass("checked");
    $("input[name='userTyp']").attr("checked",false);
    $(this).attr("checked","checked");
    $(this).parent().addClass("checked");
  });
});
//请求行业大类
$.ajax({
    url: baseUrl+'/getByPid?id=0',
    type: 'get',
    contentType: 'application/json',
    success: function(data) {
        for(var i=0; i<data.length;i++){
          $('.businessBig').append('<li id="'+data[i].id+'">'+data[i].name+'</li>');
      }
    }
});

//请求省份
$.ajax({
    url: baseUrl+'/appGetRegion',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify({
        'parentId':0
      }),
    success: function(data) {
      if(data.resultCode == 'SUCCESS') {
        for(var i=0; i<data.data.length;i++){
          $('.cityList').append('<li id="'+data.data[i].id+'">'+data.data[i].regionName+'</li>')
        };
      }
    }
});
//请求省份2
$.ajax({
    url: baseUrl+'/appGetRegion',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify({
        'parentId':0
      }),
    success: function(data) {
      if(data.resultCode == 'SUCCESS') {
        for(var i=0; i<data.data.length;i++){
          $('.cityList2').append('<li id="'+data.data[i].id+'">'+data.data[i].regionName+'</li>')
        };
      }
    }
});
//对私
$.ajax({
    url: baseUrl+'/appGetRegion',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify({
        'parentId':0
      }),
    success: function(data) {
      if(data.resultCode == 'SUCCESS') {
        for(var i=0; i<data.data.length;i++){
          $('.cityList3').append('<li id="'+data.data[i].id+'">'+data.data[i].regionName+'</li>')
        };
      }
    }
});
//请求开户行
$.ajax({
    url: baseUrl+'/getCode?code=BANKNAME',
    type: 'get',
    contentType: 'application/json',
    success: function(data) {
      if(data.resultCode == 'SUCCESS') {
        for(var i=0; i<data.rows.length;i++){
          $('.bankList').append('<li id="'+data.rows[i].codeCd+'">'+data.rows[i].codeText+'</li>')
        };
      }
    }
});
$.ajax({
    url: baseUrl+'/getCode?code=BANKNAME',
    type: 'get',
    contentType: 'application/json',
    success: function(data) {
      if(data.resultCode == 'SUCCESS') {
        for(var i=0; i<data.rows.length;i++){
          $('.bankList2').append('<li id="'+data.rows[i].codeCd+'">'+data.rows[i].codeText+'</li>')
        };
      }
    }
});
//提交数据    
   $(".btn").click(function(){ 
    if($("#company").val()==''){
          showInfo("请输入公司名称");
    }else if(!isChinese($("#company").val())){
      showInfo("请输入中文格式的公司名称");
    }else if($("#company").val().length>30){
        showInfo("公司名称不能超过30个字符");
   /* }else if($(".relate3").html()=='请选择省'){
      showInfo("请选择省");
    }else if($(".relate4").html()=='请选择市'){
      showInfo("请选择市");
    }else if($("#companyAdd").val()==''){
      showInfo("请输入公司详细地址");
    }else if(!address.test($("#companyAdd").val())){
      showInfo("地址格式错误");
    }else if($("#companyAdd").val().length>30){
      showInfo("详细地址不能超过30个字符");
    }else if($("#telephone").val()==''){
      showInfo("请输入公司电话");
    }else if(!phone.test($("#telephone").val())){
      showInfo("联系电话格式错误");*/
    }else if($("#legalPerson").val()==''){
      showInfo("请输入公司法人姓名");
    }else if(!username.test($("#legalPerson").val())){
      showInfo("姓名格式错误");
    }else if($("#personPhone").val() == ''){
      showInfo("请输入公司法人手机号");
    }else if(!tel.test($("#personPhone").val())){
      showInfo("公司法人手机号格式错误");
   /* }else if($("#email").val() == ''){
      showInfo("请输入邮箱");
    }else if(!isEmail.test($("#email").val())){
      showInfo("邮箱格式错误");
    }else if($(".relate1").html()=='请选择'){
      showInfo("请选择行业大类");
    }else if($(".relate2").html()=='请选择'){
      showInfo("请选择行业小类");
    }else if($("#foundingTime").val()==''){
      showInfo("请选择成立时间");
    }else if($("#businessScope").val() == ''){
      showInfo("请输入经营范围");
    }else if($("#businessScope").val().length>30){
      showInfo("经营范围不能超过30个字符");
    }else if($("#siteArea").val()==''){
      showInfo("请输入场地面积");
    }else if(!number.test($("#siteArea").val())){
      showInfo("场地面积格式不正确");
    }else if($("#siteArea").val().length>10){
      showInfo("场地面积不能超过10个字符");
    }else if($("#traffic").val()==''){
      showInfo("请输入年业务量");
    }else if(!number.test($("#traffic").val())){
      showInfo("年业务量格式不正确");
    }else if($("#traffic").val().length>20){
      showInfo("年业务量不能超过20个字符");*/
    }else if($("#sellPhone").val() == ''){
      showInfo("请输入推荐人手机号");
    }else if(!tel.test($("#sellPhone").val())){
      showInfo("推荐人手机号格式错误");
    }else if($("#legalPersonCard").val()==''){
      showInfo("请输入法人身份证号");
    }else if(!idcardnoCheck($("#legalPersonCard").val())){
      showInfo("法人身份证号格式错误");
    }else if($("#bussinessLicense").val()==''){
      showInfo("请输入组织机构代码证号");
    /*}else if($(".relate5").html()=='请选择省'){
      showInfo("请选择省");
    }else if($(".relate6").html()=='请选择市'){
      showInfo("请选择市");
    }else if($("#bankUser").val()==''){
      showInfo("请输入开户行账号名称");
    }else if($(".relate7").html()=='请选择'){
      showInfo("请选择开户行");
    }else if($("#bankNameBranch").val()==''){
      showInfo("请输入开户行支行名称");
    }else if($("#bankNameBranch").val().length>20){
      showInfo("开户行名称不能超过20个字符");
    }else if($("#bankCode").val()==''){
      showInfo("请输入银行账号");
    }else if(!bankNumber.test($("#bankCode").val())){
      showInfo("账号格式错误");*/
     }else if($(".relate5").html()=='请选择省'){
      showInfo("请选择对公开户行的省");
    }else if($(".relate6").html()=='请选择市'){
      showInfo("请选择对公开户行的市");
    }else if($("#bankUser").val()==''){
      showInfo("请输入对公开户行账号名称");
    }else if($(".relate7").html()=='请选择'){
      showInfo("请选择对公开户行");
    }else if($("#bankNameBranch").val()==''){
      showInfo("请输入对公开户行支行名称");
    }else if($("#bankNameBranch").val().length>50){
      showInfo("开户行支行名称不能超过20个字符");
    }else if($("#bankCode").val()==''){
      showInfo("请输入对公银行账号");
    }else if(!($("#bankCode").val().length>=5)&&($("#bankCode").val().length<=20)){
      showInfo("对公银行账号格式错误");
    }else{
        $.ajax({
          type: "POST",
          url: baseUrl+"/seller/audit/h5Create.html",
          data:JSON.stringify($("#resourceForm").serializeObject()),
          contentType: 'application/json',
          success: function(data) {
            if (data.resultCode =="SUCCESS") {
            	window.location.href=baseUrl+"/seller/audit/h5toUpdate.html";
            }else if(data.errorCode =="ERROR_SYSTEM"){
            	showInfo(data.message);
            }else if(data.errorCode =="ERROR_NOAUTH"){
            	showInfo('用户未登录，请登陆后再试');
            }else if(data.errorCode =="ERROR_REGREFEREE"){
            	showMask();
            	$(".mask").find(".inform").html("推荐人手机不合法");
            }else{
            	showInfo(data.message);
            }
          }
        });
    }
    });


//保存数据
$('.repay').click(function(){
  hideInfo();
});

//使用默认值
$(".sure").click(function(){
	$("#sellPhone").val("15600000000");
	 $(".btn").trigger("click");
	 hideMask();
});
/*时间选择插件*/
var timerInitial = function(){
	 var currYear = (new Date()).getFullYear();
  var opt={};
  opt.date = {preset : 'date'};
  opt.datetime = {preset : 'datetime'};
  opt.time = {preset : 'time'};
  opt.default = {
    theme: 'android-ics light', //皮肤样式
    display: 'modal', //显示方式
    mode: 'scroller', //日期选择模式
    dateFormat: 'yyyy-mm-dd',
    lang: 'zh',
    showNow: true,
    nowText: "今天",
    startYear: currYear - 80, //开始年份
    endYear: currYear + 80 //结束年份
  };
  $("#foundingTime").mobiscroll($.extend(opt['date'], opt['default']));
}
$(function(){
 timerInitial();
});
//模糊查询

$('#bankNameBranch,#bankNameBranchPr').keyup(function(event){
    $.ajax({
    url: baseUrl+'/getBanknum?bankName='+$(event.target).val(),
    type: 'post',
    contentType: 'application/json',
    success: function(data) {
      if(data.length>0){
        for(var i=0; i<data.length;i++){
          $(event.target).parent().next().find('.searchList').append('<li>'+data[i].bankName+'</li>');
        };
      }else{
         $('.search').hide();
      }
    }
});
$('.search').show();
$('.searchList').empty();
  
  
});
//点击列表给支行赋值
$('.searchList li').live('click',function(){
$(this).parents(".search").prev().find("input").val($(this).text());
   $('.search').hide();
});
//点击dom关闭列表
$('#bankNameBranch,#bankNameBranchPr').live('click',function(){
$('.search').hide();
});
