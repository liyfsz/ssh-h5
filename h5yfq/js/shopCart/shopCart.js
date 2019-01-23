//数量递增和递减的交互
var submitCount = function(count,cartId,checkType){
	$.ajax({
	url: baseUrl + '/appUpdateCart',
	type: 'post',
	data: JSON.stringify({
		"sessionId": sessionStorage.getItem("sessionId"),
		"count": count,
		"cartId": cartId,
		"checkType":checkType
	}),
	contentType: 'application/json',
	success: function(data) {
		if(data.errorMessage == 'ERROR_NOAUTH'){
         window.location.href = '../login/login.html'
		}else if(data.resultCode == 'SUCCESS') {
			return;
		}else{
			showInfo("操作失败")
		}

	}
});
};
$.ajax({
	url: baseUrl + '/appMyCart',
	type: 'post',
	data: JSON.stringify({
		"sessionId": sessionStorage.getItem("sessionId")
	}),
	contentType: 'application/json',
	success: function(data) {
		if(data.errorMessage == 'ERROR_NOAUTH'){
         window.location.href = '../login/login.html'
		}else if(data.resultCode == 'SUCCESS') {
			var myTemplate = Handlebars.compile($("#item-template").html());
			$('#content_list').html(myTemplate(data.rows));
      
      //商品的图片路径
       $(".imgSrc").each(function(){
        	$(this).attr({
        		"src":picUrl+$(this).data('url')
        	});
        });
        
        //递减数量
        $(".minus").click(function(){
        	if($(this).next("i").text()== '1'){
        		return;
        	}else{
        		$(this).next("i").text(parseInt($(this).next("i").text())-1);
        	}
        	
        	submitCount($(this).next("i").text(),$(this).next("i").data("cartid"));
        });
        
        //递增数量
        $(".add").click(function(){
        	$(this).prev("i").text(parseInt($(this).prev("i").text())+1);
        	submitCount($(this).prev("i").text(),$(this).prev("i").data("cartid"));
        });
        
        //选择后的交互
				$(".checkboxBtn").change(function() {
					if($("#edit").text() == '编辑'){
						if($(this).prop("checked")){
						$(this).parents("li").siblings().find("input[type=checkbox]").prop("checked",false);
						$(this).parents(".goodsList").siblings().find("input[type=checkbox]").prop("checked",false);
					 submitCount($(this).parents("li").find("i.count").text(), $(this).val(), 1);
					}else{
					 submitCount($(this).parents("li").find("i.count").text(), $(this).val(), 0);
					}
					}
					

				});
		}else{
			showInfo("查看失败")
		}

	}
});



//右上角的切换
var stateFlag = 1;
var checkFlag = 1;
$("#edit").click(function(){
	$(".bottom_sum span,.bottom_sum a").toggle();
	
	if(stateFlag%2){
		$(this).text("完成");
		$("#selectAll").prop("checked",false);
	}else{
		$(this).text("编辑");
		$("input[type=checkbox]").prop("checked",false);
		checkFlag = 1;
	}
	
	stateFlag++;
});

//全选操作
$("#selectAll").on("change",function(){
	if(checkFlag%2){
		$("input[type=checkbox]").prop("checked", true);
	}else{
		$("input[type=checkbox]").prop("checked", false);
		
	}
	checkFlag++;
});



$("#goPay").click(function(){
	var cheArayLen = $(".checkboxBtn:checked").length;
	if(cheArayLen){
		window.location.href = '../order/insureOrder.html'
	}else{
		showInfo("请选中要结算的商品");
	}
});

$("#deleteGoods").click(function(){
	var cheArray = $(".checkboxBtn:checked");
	if(cheArray.length > 0){
		var ids = [];
	  cheArray.each(function(item){
		ids.push($(this).val());
	  });
	  //删除
	  	$.ajax({
	  		url: baseUrl + '/appDeleteCart',
	  		type: 'post',
	  		data: JSON.stringify({
	  			"sessionId": sessionStorage.getItem("sessionId"),
	  			"ids": ids
	  		}),
	  		contentType: 'application/json',
	  		success: function(data) {
	  			if(data.errorMessage == 'ERROR_NOAUTH') {
	  				window.location.href = '../login/login.html'
	  			} else if(data.resultCode == 'SUCCESS') {
	  				window.location.reload();
	  			} else {
	  				showInfo("删除失败")
	  			}
	  		}
	  	});
	}else{
		showInfo("请选中要删除的商品");
	}
	
	
});
