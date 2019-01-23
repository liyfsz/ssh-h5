$.ajax({
		url: baseUrl + '/member/orderdetail',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({
    	"id":GetQueryString('id'),
    	"cuId":GetQueryString('cuId'),
    	"sessionId":GetQueryString('sessionId'),
    	
    }),
		success: function(data) {
			if(data.resultCode == 'SUCCESS') {
				console.log('请求成功');
				var template = Handlebars.compile($("#content-template").html());
				var html = template(data);
				$("#html-section").html(html);
				
				//图片地址
				$(".product-logo").attr("src", picUrl + $(".product-logo").data('url'));
				
				//物流详情
				$(".trail-link").attr("href","trail.html?id="+GetQueryString('id')+"&sessionId="+GetQueryString('sessionId'));
				
				//再次购买
				$("#buyAgain").attr("href","../product/detail.html?pId="+$("#buyAgain").data('pid')+"&sessionId="+GetQueryString('sessionId')+"&cuId="+GetQueryString('cuId'));
				
				//还款计划
				$("#repayPlan").attr("href","repayPlan.html?id="+GetQueryString('id')+"&sessionId="+GetQueryString('sessionId')+"&cuId="+GetQueryString('cuId'));
				
				//去付款
				$("#goPay").attr("href",'insureOrder.html?isOrder=1&sessionId='+GetQueryString('sessionId')+"&cuId="+GetQueryString('cuId')+"&orderId="+$("#goPay").data('orderid'));
				//确认收货
				$("#ensureGet").live('click', function(event) {
					var dataId = GetQueryString('id');
					showMask();
					$(".sure").click(function() {
						$.ajax({
							url: baseUrl + '/member/appGetGoods',
							type: 'POST',
							data: JSON.stringify({
								"oId": dataId,
								"sessionId": GetQueryString('sessionId'),
								"cuId": GetQueryString('cuId')
							}),
							contentType: 'application/json',
							success: function(data) {
								if(data.success == true) {
									window.location.href = "myOrder.html?cuId="+GetQueryString('cuId')+"&sessionId="+GetQueryString('sessionId');
								} else if(data.message == '未登录') {
									getSessionId();
								} else {
									showInfo("确认失败");
								}
							}
						});

						hideMask();
					});

				});
				
				
				
			}else if(data.errorCode=='ERROR_NOAUTH'){
				getSessionId();
			}else{
				showInfo("查看失败");
			}
		}
	});