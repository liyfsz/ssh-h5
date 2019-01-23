//单选的切换
$(function(){
  $("input[type='radio']").live("click",function(){
    $("input[name='type']").parent().removeClass("checked");
    $("input[name='type']").attr("checked",false);
    $(this).attr("checked","checked");
    $(this).parent().addClass("checked");
  });
});
//取值
$("#orderId").val(GetQueryString('id'));
$("#productId").val(GetQueryString('proId'));
$("#sessionId").val(GetQueryString('sessionId'));
$(".btn").live('click',function(){
    $.ajax({
      type:'post',
      url:baseUrl+"/member/submitBack",
      dataType:'json',
      contentType:'application/json',
      data:JSON.stringify($(".returnForm").serializeObject()),
      success:function (data) {
          if(data.resultCode == "SUCCESS"){
           if(data.success == true){
             showInfo('提交成功');
           }else if(data.success == false){
             showInfo('该产品已经申请过退/换货了。');
           }
          }else if(data.errorCode =="ERROR_NOAUTH"){
             getSessionId();
          }else{
            showInfo('提交失败');
          }
          
      }
  });
})