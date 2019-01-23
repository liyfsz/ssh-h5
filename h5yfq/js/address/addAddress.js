$("#city-picker").click(function(){
	document.activeElement.blur(); 
});

var username = /^[\u4E00-\u9FA5A-Za-z]+$/;
  var tel = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
$("#city-picker").cityPicker({
    title: "选择省市区/县",
    onChange: function (picker, values, displayValues) {
        console.log(values, displayValues);
        console.log(values[0]);
        $("#provinceId").val(values[0]);
        $("#cityId").val(values[1])
        $("#areaId").val(values[2])
    }
});
$(".repay").click(function(){
	hideInfo();
})

//数据回显

if(GetQueryString('id')!=0){
	$.ajax({
	    type:'post',
	    url:baseUrl +"/member/editaddress",
	    contentType: 'application/json',
	    data:JSON.stringify({
        "id": GetQueryString('id'),
        "sessionId":getSessionVal()||'',
        "cuId":GetQueryString('cuId')||''
        }),
	    success:function (data) {
	    	console.log(data);
	    	if(data.resultCode == 'SUCCESS'){
	    		console.log(data.myAddressDto.address.memberName);
	    	$("#perName").val(data.myAddressDto.address.memberName);
	    	$("#tel").val(data.myAddressDto.address.mobile);
	    	$("#address").val(data.myAddressDto.address.addressInfo);
	    	$("#city-picker").val(data.myAddressDto.address.addAll);
	    	$("#provinceId").val(data.myAddressDto.address.provinceId);
	    	$("#cityId").val(data.myAddressDto.address.cityId);
	    	$("#areaId").val(data.myAddressDto.address.areaId);
	    	}else if(data.errorCode == 'ERROR_NOAUTH'){
	    		getSessionId();
	    	}else{
	    		showInfo("查看失败");
	    	}
	    	
	    }
	});
}
$('.save').click(function(){ 
	var idParam = GetQueryString('id')||'0';
  if($("#perName").val()==''){
    showInfo('请输入收货人姓名');
  }else if(!username.test($("#perName").val())){
    showInfo('收货人姓名格式错误');
  }else if($("#perName").val().length > 5){
    showInfo('收货人姓名不能超过5位');
  }else if($("#tel").val()==''){
    showInfo('请输入收货人联系方式');
  }else if(!tel.test($("#tel").val())){
    showInfo('联系方式格式错误');
  }else if($("#city-picker").val()==''){
    showInfo('请选择省市');
  }else if($("#address").val()==''){
    showInfo('请输入详细地址');
  }else if($("#address").val().length > 20){
    showInfo('详细地址不能超过20位');
  }else{
	  $.ajax({
		    type:'post',
		    url:baseUrl +"/member/saveaddress",
		    contentType: 'application/json',
		    data:JSON.stringify({
             "id": idParam,
             "mobile": $("#tel").val(),
             "addAll": $("#city-picker").val(),
             "memberName": $("#perName").val(),
             "addressInfo": $("#address").val(),
             "provinceId": $("#provinceId").val(),
             "cityId": $("#cityId").val(),
             "areaId": $("#areaId").val(),
             "cuId":GetQueryString('cuId')||'',
             "sessionId":getSessionVal()||''
             }),
		    success:function (data) {
		    	if(data.resultCode == 'SUCCESS'){
		    		if(GetQueryString('type') == 'pay'){
		    		window.location.href="../order/insureOrder.html?cuId="+GetQueryString('cuId')+"&sessionId="+GetQueryString('sessionId');
		    			
		    		}else{
		    		window.location.href="addressManage.html?cuId="+GetQueryString('cuId')+"&sessionId="+GetQueryString('sessionId');
		    		}

		    	}else if(data.errorCode == 'ERROR_NOAUTH'){
		    		getSessionId();
		    	}else{
		    		showInfo("添加失败");
		    	}
		    }
		});
	  
  }
})

