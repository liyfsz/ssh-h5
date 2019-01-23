var cuId = GetQueryString('cuId');
/*收货地址列表*/
  $.ajax({
	type:'post',
    url:baseUrl +"/member/address",
    contentType:'application/json',
    data:JSON.stringify({
      "cuId":cuId,
      "sessionId":getSessionVal()
    }),
    success:function (data) {
       if(data.resultCode == "SUCCESS"){
         for(var i=0;i<data.myAddressDto.addressList.length;i++){
         var memberName = data.myAddressDto.addressList[i].memberName == null ? '' : data.myAddressDto.addressList[i].memberName;
         var mobile = data.myAddressDto.addressList[i].mobile == null ? '' : data.myAddressDto.addressList[i].mobile;
         var addAll = data.myAddressDto.addressList[i].addAll == null ? '' : data.myAddressDto.addressList[i].addAll;
         var addressInfo = data.myAddressDto.addressList[i].addressInfo == null ? '' : data.myAddressDto.addressList[i].addressInfo;
         var id = data.myAddressDto.addressList[i].id;
         var state = data.myAddressDto.addressList[i].state;
         $(".list").append('<li>'+
             '     <div class="perInfo">'+
             '       <span class="name">'+memberName+'</span>'+
             '       <span class="phone">'+mobile+'</span>'+
             '     </div>'+
             '     <p class="address">'+addAll+'-'+addressInfo+'</p>'+
             '     <div class="operation">'+
             '       <em class="state'+state+'">默认地址</em>'+
             '       <span class="delete" id="'+ id +'">删除</span>'+
             '       <span class="edit">编辑</span>'+
             '     </div>'+
               '   </li>');
         
         
         //设为默认地址
         $("em").each(function(){
         	$(this).click(function(event){
         		var id = $(this).next('span').attr('id');
         			console.log(id);
         			$.ajax({
         				type: 'post',
         				url: baseUrl + "/member/setdefaultaddress",
         				contentType: 'application/json',
         				data: JSON.stringify({
         					"id": id,
         					"cuId": cuId,
         					"sessionId": getSessionVal()
         				}),
         				success: function(data) {
         					if(data.resultCode == 'SUCCESS') {
         						$("em").attr("class","state2");
         						$(event.target).addClass("state1");
         						return;
         					} else if(data.errorCode == 'ERROR_NOAUTH') {
         						getSessionId();
         					} else {
         						showInfo("设置失败");
         					}
         				},
         				error:function(data){
         					alert(data.errorCode);
         				}
         			});
         	})
         })
       }
       }else if(data.errorCode =="ERROR_NOAUTH"){
             getSessionId();
          }else{
            showInfo('添加失败');
          }
       
       
    },
    error:function(data){
    	console.log(data);
    }
});
$(".cancel").click(function(){
	hideMask()
 
});
		
		
//删除收货地址
$(".delete").live("click",function(){
	  showMask()
	  var id= $(this).attr('id');
	  console.log(id)
	  $(".sure").attr('key',id)
});
$(".sure").click(function(){
	  
	  var sureKey = $(this).attr("key");
	  var delKey =$(".delete").attr("id");
	  console.log(sureKey,delKey)
	  $.ajax({
		    type:'post',
		    url:baseUrl +"/member/deleteaddressforHtml",
		    contentType: 'application/json',
		    data:JSON.stringify({
		      "id": delKey,
		      "cuId":cuId,
          "sessionId":getsessionVal()
		    }),
		    
		    success:function (data) {
		    	 if(delKey == sureKey){
		    		 $('span[id="'+delKey+'"]').find('.operation').find('li').remove();
		    	  }
		    	 location.reload() 
		    }
		});
	 
	  hideMask();
	});
//编辑收货地址
$(".edit").live("click",function(){
	var id= $(this).parent('.operation').children('.delete').attr('id');
	window.location.href="addAddress.html?id="+id+'&cuId='+GetQueryString('cuId')+"&sessionId="+getSessionVal();
})
//新增收货地址
$(".add").live("click",function(){
	window.location.href="addAddress.html?id=0&cuId="+GetQueryString('cuId')+"&sessionId="+getSessionVal();
})


