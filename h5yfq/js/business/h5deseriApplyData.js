//数据回显
$.ajax({
    url: baseUrl+'/seller/audit/h5GetSeller.html',
    type: 'post',
    data:{"memberId":$('#memberId').val()},
    success: function(data) {
        if(data.resultCode == 'SUCCESS') {
          	if(data.data){
          		$('#resourceForm').deserialize(data.data);
            $(".copyNextInput").each(function(){
            	if($(this).next().val()){
            		$(this).html($(this).next().val());
            	}
            });
            
            	if(data.data.userTyp == "2"){
            		$("#have").prop("checked",false).parent().removeClass("checked");
            	$("#no").prop("checked","checked").parent().addClass("checked");
            	}
            	
            
            if(data.data.bankName == "18"){
            	$(".pubBank").show();
            }else{
            	$(".pubBank").hide();
            }
            
            if(data.data.bankNamePr == "18"){
            	$(".priBank").show();
            }else{
            	$(".priBank").hide();
            }
          	}
            
          }else if(data.errorCode == 'ERROR_NOAUTH'){
          	getSessionId();
          }else{
          	showInfo("查看失败");
          }
    }
});