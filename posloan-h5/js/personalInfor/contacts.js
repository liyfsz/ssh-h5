$(function() {
  //查看详情调用的接口返回的数据赋值
  var contactsArr =   JSON.parse(localStorage.getItem('contactsInfor')) || JSON.parse(localStorage.getItem('personData'));
  if(JSON.parse(localStorage.getItem('contactsInfor'))==null){
	  contactsArr = contactsArr.contactList;
  }
  var personData = JSON.parse(localStorage.getItem('personInfor'));
  if(personData!=null&&personData.marrageInfo=="1"){
	  $("ul li:eq(1)").remove()
  }
  var template = Handlebars.compile($("#content-template").html());
  var html = template(contactsArr);
  console.log(contactsArr);
  $("#html-section").html(html);
  $(document).on("click", "#subContacts", function() {
    //校验信息
    if($("#lRelationship").val() == '') {
      showInfo("请选择第一项与本人的关系");
    } else if($("#lName").val() == '') {
      showInfo("请填写第一项的真实姓名");
    } else if($("#idcardNo").val() == '') {
      showInfo("请填写身份证号");
    } else if(!idcardnoCheck($("#idcardNo").val())) {
      showInfo("请填写正确格式身份证号");
    } else if($("#lPhone").val() == '') {
      showInfo("请填写第一项的手机号");
    } else if(!isMobilePhone($("#lPhone").val())) {
      showInfo("请填写第一项正确格式手机号");
    } else if($("#fRelationship").val() == '') {
      showInfo("请选择第二项与本人的关系");
    } else if($("#fName").val() == '') {
      showInfo("请填写二项的真实姓名");
    }else if($("#fPhone").val() == '') {
      showInfo("请填写二项的手机号");
    } else if(!isMobilePhone($("#fPhone").val())) {
      showInfo("请填写第二项正确格式手机号");
    } else {
    	save($(this));
    }

  });
});

var save = function(event){
	var arrayObj = [];
	var contactsInofor = [];
      var paramsObj1 = $("#messForm1").serializeObject();
      paramsObj1.userNo = localStorage.getItem('userNo');
      contactsInofor.push(paramsObj1);
      var signature = getSign(paramsObj1);
      paramsObj1.signature = signature;
      arrayObj.push(paramsObj1);
      var paramsObj2 = $("#messForm2").serializeObject();
      paramsObj2.userNo = localStorage.getItem('userNo');
      contactsInofor.push(paramsObj2);
      var signature = getSign(paramsObj2);
      paramsObj2.signature = signature;
      arrayObj.push(paramsObj2);
      console.log(arrayObj);
      submitForm(
        baseUrl + '/mobile/gate/addContactInfo',
        encrypt(arrayObj),
        function(data) {
          if(data.code == '0000') {
        	localStorage.setItem("contactsInfor",JSON.stringify(contactsInofor));
          	window.location.href = 'loanIntention.html';
          } else {
            showInfo(data.msg);
          }
        });
};