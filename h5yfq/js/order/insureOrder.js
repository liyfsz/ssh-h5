function passSellerId(saoFlag){
	$("#saoFlag").val(saoFlag);
	var dataJson = formDataToJson("form");
		$.ajax({
		url: baseUrl + '/appOrderSubmit',
		type: 'POST',
		data: dataJson,
		contentType: 'application/json',
		success: function(data) {
			if(data.success == true) {
				var payMoney = $("#payMoney").val();
				var jrType = $("#jrType").val();
				
				if(payMoney == '0.00'||payMoney == '0') {
					if(jrType == '1'){
						$("#payReturn").html(data.data.pay);
					}else{
					window.location.href = 'myOrder.html?sessionId=' + getSessionVal();
					}

				} else {
					$("#payReturn").html(data.data.pay);
				}

			} else if(data.errorCode=='ISUSE'){
				showInfo("优惠券已使用");
			}else {
				showInfo("提交失败");
			}
		}
	});
}

var submitOrder = function(){
	$("#cuId").val(GetQueryString("cuId"));
	$("#sessionId").val(getSessionVal());
	$("#isOrder").val(GetQueryString("isOrder"));
	$("#orderId").val(GetQueryString("orderId"));
	if(!sessionStorage.getItem("sessionId")){
		if(getTerminal()){
	  window.android.isScanQRCode($("#sellerId").val());
	}else{
		window.webkit.messageHandlers.isScanQRCode.postMessage($("#sellerId").val());
	}
	}
	
	

		
	
}

$.ajax({
		url: baseUrl + '/appIsOrder',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({
	      "sessionId":getSessionVal(),
	      "isOrder":GetQueryString('isOrder'),
	      "orderId":GetQueryString('orderId')
	    }),
		success: function(data) {
			if(data.success == true) {
				console.log('请求成功');
					var template = Handlebars.compile($("#content-template").html());
					var html = template(data);
					$("#html-section").html(html);

					//图片地址
					$(".product-logo").attr("src", picUrl + $(".product-logo").data('url'));

					//地址选择
					$('.toAddressList').attr("href", "../address/addressManage.html?cuId=" + GetQueryString("cuId") + "&sessionId=" + getSessionVal() + '&id=0&type=pay' );
          
          
          
					//支付方式切换
					$(".select-pay").change(function() {
						var thisVal = $(this).val();
						if(thisVal == 'wxpay') {
							$(".payText").text("微信支付");
						} else if(thisVal == 'alipay') {
							$(".payText").text("支付宝支付");
						}
					});



         if(data.rows.content.length){
         //默认选中第一个信用类型
         	
         $(".creditList dd span:first-child input[type=radio]").prop("checked","checked");
         	//信用额度赋值
         $(".quatoVal").text("￥"+$(".creditList input[type=radio]:checked").data("quato"));
         }

          //借款协议
					$(".loan-protocal a").attr("href","../loan/constract.html?orgId="+$('input[name=orgId]:checked').siblings("input[type=hidden]").val()+"&sessionId="+GetQueryString("sessionId"));
          
          //信用选择是否
          /*$(".credit").change(function(){
          	var thisVal = $(this).val();
          	if(thisVal == 'y') {
							$(".creditList,.creditQuato,.loan-protocal").show();
							$(".creditList").find("input").removeAttr("disabled");
						} else if(thisVal == 'n') {
							$(".creditList,.creditQuato,loan-protocal").hide();
							$(".creditList").find("input").attr("disabled","disabled");
						}
          });*/
          
          //切换不同的信用类型显示不同的额度
          $(".creditType").change(function(){
          	$(".quatoVal").text("￥"+$(this).data("quato"));
						$(".loan-protocal a").attr("href","../loan/constract.html?orgId="+$('input[name="orgId"]:checked').siblings("input[type=hidden]").val()+"&sessionId="+GetQueryString("sessionId"));
          	
          });
					//提交订单
					$("#submitForm").click(function() {
						//没有默认地址去添加
						if($("#addressId").val()) {
							//信用额度不满足支付额度
							if($("#jrType").val() != 1) {
								if($(".credit:checked").val() == 'y') {
									if(data.rows.content.length) {
										//有可用的激活的白条
										if($(".creditType:checked").data('quato')*1 - $("#currAmount").val()*1 + $("#payMoney").val()*1 >= 0) {
											submitOrder();
										} else {
											showInfo("信用额度不足,请重新选择首付比例");
											$("#dialogs").find(".repay").html("<a href=../product/detail.html?sessionId="+getSessionVal()+'&pId='+data.rows.pId+'>去选择</a>');
										}
									} else {
										//提示去首页激活todo
										showInfo("请先激活白条,在购物车继续支付");
										//调用app的去首页的方法
                    $("#dialogs .repay").click(function(){
                    	if(getTerminal()){
                    		window.android.activateIous();
                    	}else{
		                    window.webkit.messageHandlers.activateIous.postMessage("goIndex");
                    		
                    	}
                    });
									}

								} else {
									//不用白条直接提交
									submitOrder();
								}

							} else {
								submitOrder();
							}
						} else {
              showInfo("去添加地址");
              var goAddress = '../address/addAddress.html?sessionId=' + getSessionVal() + "&id=0&type=pay";
              $("#dialogs").find(".repay").html('<a href=' + goAddress + '>去添加</a>');
						}

					});
			}else if(data.message=='未登录'){
				getSessionId();
			}else{
				showInfo("下单失败");
			}
		}
	});