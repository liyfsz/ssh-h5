$(function(){
   //查看详情调用的接口返回的数据赋值
  var assertsData = JSON.parse(localStorage.getItem('assetsInfor'))|| JSON.parse(localStorage.getItem('personData'));
  console.log(assertsData);
  var template = Handlebars.compile($("#content-template").html());
      var html = template(assertsData);
      $("#html-section").html(html);
  $(document).on("click","#subForm",function(){
    //校验
    if($("#isHouse").prop("checked") == true) {
      if($("#fcdz").val() == '') {
        showInfo("请填写房产地址");
        return false;
      }
    } 
    if($("#isCar").prop("checked") == true) {
      if($("#clxh").val() == '') {
        showInfo("请填写车辆型号");
        return false;
      }else if($("#cph").val() == ''){
        showInfo("请填写车牌号");
        return false;
      }
    }
    save($(this));
    
  });
});


var save = function(event){
	var paramsObj = $("form").serializeObject();
      paramsObj.userNo = localStorage.getItem('userNo');
      //paramsObj.userNo = '123456789';
      if(paramsObj.isHouse === undefined){
        paramsObj.isHouse = '0';
        delete paramsObj.houseAddress;
        
      }
      if(paramsObj.isCar === undefined){
        paramsObj.isCar = '0';
        delete paramsObj.carType;
        delete paramsObj.carNo;
        
      }
      
      var assetsInfor = paramsObj;
      var signature = getSign(paramsObj);
          paramsObj.signature = signature;
          console.log(paramsObj);
      
    submitForm(
        baseUrl + '/mobile/gate/editFinanceInfo',
        encrypt(paramsObj),
        function(data) {
          console.log(data);
          if(data.code == '0000') {
        	  localStorage.setItem('assetsInfor',JSON.stringify(assetsInfor));
          	window.location.href = 'contacts.html';
          } else {
            showInfo(data.msg);
          }
        });
};


$(".goBack").click(function(){
	window.location.href = 'person.html';
});