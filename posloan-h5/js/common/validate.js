function luhnCheck(str){var arr=[[0,1,2,3,4,5,6,7,8,9],[0,2,4,6,8,1,3,5,7,9]],len=str.length,mul=0,sum=0;while(len--){sum+=arr[mul][parseInt(str.charAt(len),10)];mul^=1}return sum%10===0&&sum>0};function isMobilePhone(value){if(value==''){showInfo("请填写手机号");return false}else if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))){showInfo("请正确填写手机号");return false}else{return true}};function isMoney(value){return/^\d{1,13}(\.\d{0,2})?$/.test(value)};function isHostNumber(value){return/^\d{7,8}$/.test(value)};function isExtensioNumber(value){return/^\d{3,7}$/.test(value)};function isRadioCheck(obj){if(obj.prop("checked")){return true}else{return false}};function checkNum(value) {return /^[A-Za-z0-9]*$/.test(value)};function isChinese(value,element){return/^[\u4e00-\u9fa5]+$/.test(value)}function isSmsCode(value){return/^\d{6}$/.test(value)}function isPassword(value,element){return/^[\da-zA-Z_#]{6,20}$/.test(value)}var username=/^[\u4E00-\u9FA5A-Za-z]+$/;var tel=/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;var money=/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/;var number=/^\+?[1-9][0-9]*$/;var address=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;var hanzi=/^[\u4e00-\u9fa5]+$/;var phone=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;var isEmail=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;var bankNumber=/([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/;function idcardnoCheck(card){var vcity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},isCardNo=function(card){var reg=/(^\d{15}$)|(^\d{17}(\d|X)$)/;if(reg.test(card)===false){return false}return true},checkProvince=function(card){var province=card.substr(0,2);if(vcity[province]==undefined){return false}return true},checkBirthday=function(card){var len=card.length;if(len=='15'){var re_fifteen=/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;var arr_data=card.match(re_fifteen);var year=arr_data[2];var month=arr_data[3];var day=arr_data[4];var birthday=new Date('19'+year+'/'+month+'/'+day);return verifyBirthday('19'+year,month,day,birthday)}if(len=='18'){var re_eighteen=/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;var arr_data=card.match(re_eighteen);var year=arr_data[2];var month=arr_data[3];var day=arr_data[4];var birthday=new Date(year+'/'+month+'/'+day);return verifyBirthday(year,month,day,birthday)}return false},verifyBirthday=function(year,month,day,birthday){var now=new Date();var now_year=now.getFullYear();if(birthday.getFullYear()==year&&(birthday.getMonth()+1)==month&&birthday.getDate()==day){var time=now_year-year;if(time>=3&&time<=100){return true}return false}return false},changeFivteenToEighteen=function(card){if(card.length=='15'){var arrInt=new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);var arrCh=new Array('1','0','X','9','8','7','6','5','4','3','2');var cardTemp=0,i;card=card.substr(0,6)+'19'+card.substr(6,card.length-6);for(i=0;i<17;i++){cardTemp+=card.substr(i,1)*arrInt[i]}card+=arrCh[cardTemp%11];return card}return card},checkParity=function(card){card=changeFivteenToEighteen(card);var len=card.length;if(len=='18'){var arrInt=new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);var arrCh=new Array('1','0','X','9','8','7','6','5','4','3','2');var cardTemp=0,i,valnum;for(i=0;i<17;i++){cardTemp+=card.substr(i,1)*arrInt[i]}valnum=arrCh[cardTemp%11];if(valnum==card.substr(17,1)){return true}return false}return false};if(!card){return false}if(!isCardNo(card)){return false}if(!checkProvince(card)){return false}if(!checkBirthday(card)){return false}if(!checkParity(card)){return false}return true};$(document).on("blur",".checkChar",function(){var b,a=$(this).val().replace(/\s+/g,"");""!=a&&(b=a.replace(/[\u4e00-\u9fa5a-zA-Z0-9\w]/g,""),""!=b?(showInfo("包含特殊字符["+b+"]"),$(this).focus()):$(this).val(a))});