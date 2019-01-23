$(function(){
  $("#goDetailBtn").click(function(){
  	if($("#agree").prop("checked") == true){
  	    var paramsObj = JSON.parse(localStorage.getItem('guideData'))
  	    if(paramsObj!=null&&paramsObj.hasOwnProperty("status")){
  	    	delete paramsObj.status;
  	    }
  		var signature = getSign(paramsObj);
        paramsObj.signature = signature;
        $("#goDetailBtn").prop("disabled",true);
  		  getJson(
  			baseUrl + '/mobile/gate/createSign',
  			encrypt(paramsObj),
  			function(data) {
  			  if(data.code == '0000'){
  				var dataJson = JSON.parse(data.data);
  				var idcardNo = dataJson.cardNo;
			    if(idcardNo!=""&&idcardNo!=null){
			    	localStorage.setItem("indexData",data.data);
                   window.location.href = '../merchants/infor.html';
			    }else{
			    	//跳转客服页面
			       window.location.href = '../merchants/kefu.html';
			    }
			    localStorage.removeItem("guideData");
  			  }else{
  				$("#goDetailBtn").prop("disabled",false);
  			    showInfo(data.msg);
  			  }
  				
  			},
  			false
  		);
  	}else{
  		showInfo("请勾选协议");
  	}
  });
   if($("#agree").prop("checked")== true){
	   $("#goDetailBtn").prop("disabled",false);
   }
   $(document).on("change", "#agree", function(e){
      if($("#agree").prop("checked") == true){
      $("#goDetailBtn").prop("disabled",false);
    }else{
      $("#goDetailBtn").prop("disabled",true);
    }
   });
});
