$(function(){
	startLoading();
	/*var mockData = 'Yynk71LDqzS6LMWX8lnZ4f7HIzVPPnTBrOoTDnQMlR8DesTpZwGssKC0LCSr X2vOnZ1fVybgivXQ3qEiUSO4VepqOBOdkSZVydGiIs7kEnKvKed1EZausw==';*/
    //var mockData = 'Nox63nc/u3TlRW5v20LMOgxliR2zrdrMdE95BkfTlhE3xb0SsHFdCg==';
	
	    var mockData = mockData || GetQueryString('data');
	    if(mockData!=null){
	    	getJson(
	      			baseUrl + '/mobile/gate/login',
	      			mockData,
	      			function(data) {
	      			  if(data.code == '0000'){
	      			    stopLoading();
	      			    var dataJson = JSON.parse(data.data);
	      			    localStorage.setItem("userNo",dataJson.userNo);
	      			    if(dataJson.status == '-01'){
	      			    	localStorage.setItem("guideData",data.data);
	      			    	window.location.href = 'index/index.html'
	      			    }else if(dataJson.status == '-02'){//跳转客服页面
      			    		window.location.href = 'merchants/kefu.html';
	      			    }else if(dataJson.status == '00'){
	      			    	var idcardNo = dataJson.cardNo;
	      			    	if(idcardNo!=""&&idcardNo!=null){
	      			    		localStorage.setItem("guideData",data.data);
	      	  			    	window.location.href = 'merchants/infor.html'
	      			    	}else{
	      			    		//跳转客服页面
	      			    		window.location.href = 'merchants/kefu.html';
	      			    	}
	      			    }else {
	      			    	if(dataJson.status == '01'||dataJson.status == '02'
	      			    		||(dataJson.status == '04')
	      			    		||(dataJson.status == '05'&&getDays(dataJson.verifyTime)>checkYesDays)
	      			    		||dataJson.status == '08'){
	      			    		localStorage.setItem('personInfor',null);
	      			    		localStorage.setItem('assetsInfor',null);
	      			    		localStorage.setItem('contactsInfor',null);
	      			    		localStorage.setItem('loanIntentionInfor',null);
	      			    		localStorage.setItem("personData",data.data);
	      		                window.location.href = 'personalInfor/person.html';
	        			    }else  if(dataJson.status == '03' || dataJson.status == '04' || dataJson.status == '05' || dataJson.status == '06' || dataJson.status == '07'){
	        			    	localStorage.setItem("personData",data.data);
	        	    		    window.location.href = 'loan/audit.html';
	            		    }
	      			    }
	      			  }else{
	      			    showInfo(data.msg);
	      			  }
	      			},
	      			false
	      		);
	    }else{
	    	stopLoading();
	    	return false;
	    }
});

