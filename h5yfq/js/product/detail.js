//规格和首付切换查询
var termOrder;
var changeSize = function(data){
	 $(".size-radio").live("change",function(){
        	//如果是全款付，隐藏期数
        	var payMoney = $("input[name=payMoney]:checked").data('value');
        	var periods = $("input[name=termMoney]:checked").data('term');
        	
        	var normAttrId='';
        	$(".size").each(function(){
        		normAttrId += $(this).find("dd input[type=radio]:checked").val()+',';
        	});
        	normAttrId = normAttrId.substring(0, normAttrId.lastIndexOf(','));
        	var selectParam;
        	
        	//付款金额明细
        		console.log(data);
        		$("#firstPayMon").text((data.rows.product.malMobilePrice*payMoney).toFixed(2));
        	  $("#leftTermMon").text((data.rows.product.malMobilePrice-data.rows.product.malMobilePrice*payMoney).toFixed(2));
        	
        		selectParam = '{"pId":'+ GetQueryString("pId") 
        	                       + ',"payMoney":' + payMoney
        	                       + ',"sessionId":"' + getSessionVal()
        	                       + '","periods":' + (periods || '3')
        	                       + ',"normAttrId":"' + normAttrId
        	                       +'"}';
        		
        	if(payMoney == '1'){
        		$(".term-box,.coupon-box").removeClass('dis-block');
        		$("#termMoney,#useCouponId").attr("disabled","disabled");
        		
        	}else{
        		//获取全部规格逗号分隔
        		$(".term-box,.coupon-box").addClass('dis-block');
        		$("#termMoney,#useCouponId").removeAttr("disabled");
        	}
        	
        	toggleSize(selectParam,$(event.target).attr("name"));
        	
	 });
}     
//添加购物车
var addCar = function(dataJson,eventTar){
	$.ajax({
		url: baseUrl + '/appAddCart',
		type: 'POST',
		data: dataJson,
		contentType: 'application/json',
		success: function(data) {
			if(data.success == true) {
				if(eventTar&&eventTar.attr("class")=='place-order fr'){
					console.log("下单提交购物车");
					window.location.href="../order/insureOrder.html?sessionId="+getSessionVal();
					return;
				}else{
					showInfo("添加成功");
				}
			} else if(data.errorCode=='ERROR_NOAUTH'){
				getSessionId();
			}else{
				showInfo("添加失败");
			}
		}
	});
};

//切换规格
var toggleSize = function(size,eventName){
	termOrder = $(".term-list").find("input[type=radio]:checked").parents("span").index();
	console.log(termOrder);
	$.ajax({
		url: baseUrl + '/appGetGoodsInfo',
		type: 'POST',
		data: size,
		contentType: 'application/json',
		success: function(data) {
			if(data.success == true) {
				//刷新数据
					
					
					var template = Handlebars.compile($("#term-template").html());
					var html = template(data);
					$(".term-list").html(html);
					
					if(termOrder > -1){
					$(".term-list").find("span").eq(termOrder).find("input").prop("checked",true);
					}else{
					$(".term-list").find("span").eq(0).find("input").prop("checked",true);
					}
          
          if(data.rows.unusedCouponList.length){
						var templateCoup = Handlebars.compile($("#coupon-template").html());
						var htmlCoup = templateCoup(data);
						$(".coupon-box").html(htmlCoup);
					}else{
						$(".coupon-box").html('');
					}
					$(".productStock").text(data.rows.productGoods.productStock);
					$(".mallMobilePrice").text("￥" + data.rows.productGoods.mallMobilePrice);
					$("#productGoodId").val(data.rows.productGoods.id);
					
				
			} else {
				showInfo("获取失败");
			}
		}
	});
};

//页面重新加载
var pageReload = function(dataJson) {
	$.ajax({
		url: baseUrl + '/appProductDetail',
		type: 'POST',
		data: "{\"pId\":\"" + GetQueryString("pId") + "\"}",
		contentType: 'application/json',
		success: function(data) {
			if(data.success == true) {
				var template = Handlebars.compile($("#content-template").html());
				var html = template(data);
				$("#html-section").html(html);
				
        $("#sessionId").val(getSessionVal());
        
        $(".swiper-slide").each(function(){
        	$(this).css({
        		"background":"url("+picUrl+$(this).data('url')+")"
        	});
        });
        

        var mySwiper = new Swiper('.swiper-container', {
        	direction: 'horizontal',
        	loop: true,
        	pagination: '.swiper-pagination',
        	autoplay: 5000,
        	paginationClickable: true
        });
        
        //判断终端期限选择性展示
        
       /* if(!getTerminal()){
        	$(".termDirec").hide();
        }*/
				//商品介绍html转换
				$("#product-infor").html(data.rows.product.description);

				//默认选中第一项
        $(".product-setting dl.size dd span:first-child input").prop("checked","checked");
        
        //加入购物车
        $(".addCar").click(function(event,arg1,arg2){
        	if(listenSelected(["payMoney","termMoney","useCouponId"],["pId","cuId","sessionId"])){
        		$("#checkType").val(arg2||0);
        		var dataJson= formDataToJson("form");
        	  addCar(dataJson,arg1);
        	}else{
        		console.log("选中赋值失败");
        	}
        	
        });
        
        
        changeSize(data);
        
        //立即下单
        $(".place-order").click(function(event){
        	$(".addCar").trigger("click",[$(event.target),'1']);
        });
        
        //调用app客服
        $(".contactSer").click(function(){
        	if(getTerminal()){
        		window.android.chatWithCustomer($(this).data("bosstel").toString());
        	}else{
		       window.webkit.messageHandlers.chatWithCustomer.postMessage($(this).data("bosstel").toString());
        	}
        });
			} else {
				showInfo("查看失败");
			}
		}
	});
}


pageReload();
