//handlerbars
Handlebars.registerHelper('eq', function(value1, value2) {
	return value1 == value2;
});
//俩数相乘
Handlebars.registerHelper('multi', function(value1, value2) {
  var result = (value1*value2).toFixed(2);
  return result;
});
Handlebars.registerHelper('gt', function(value1, value2) {
	return value1 > value2;
});

Handlebars.registerHelper('lt', function(value1, value2) {
  return value1 < value2;
});

Handlebars.registerHelper('neq', function(value1, value2) {
	return value1 != value2;
});

Handlebars.registerHelper('formatMoney', function(num) {
	return(num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
});


Handlebars.registerHelper('defaultText', function(a) {
	if(a){
		if(a == '') {
			return '请选择';
		} else {
			return a;
		}
	}else{
		return '请选择';
	}

});

Handlebars.registerHelper('empty', function(value) {
	if(value){
		return true;
	}else{
		return false;
	}
});



/**
 * default null
 */
Handlebars.registerHelper('defaultNull', function(a) {
	if(a){
		if(a == 'null'||a == null) {
			return '';
		} else {
			return parseInt(a);
		}
	}else{
		return '';
	}

});


/**
 * default 0
 */
Handlebars.registerHelper('defaultZero', function(a) {
	if(a){
		return a;
	}else{
		return '0';
	}

});
/**
 * 翻译y和n分别是是  和 否
 */
Handlebars.registerHelper('yesOrNo', function(a) {
	if(a == 'Y') {
		return '是'
	} else {
		return '否'
	}
});

/**
 * 翻译y和n分别是有  和 无
 */
Handlebars.registerHelper('isHas', function(a) {
	if(a == 'Y') {
		return '有'
	} else {
		return '无'
	}
});
Handlebars.registerHelper('and', function(value1, value2) {
	return value1 && value2;
});

Handlebars.registerHelper('or', function(value1, value2) {
  return value1 || value2;
});

Handlebars.registerHelper('judgeMar', function(status) {
	switch(status) {
		case '0':
			return '已婚';
			break;
		case '1':
			return '未婚';
			break;
		case '2':
			return '离异';
			break;
		default:
			return '请选择';
	}
});


Handlebars.registerHelper('judgeRelation', function(status) {
	switch(status) {
		case '01':
			return '子女';
			break;
		case '02':
			return '配偶';
			break;
		case '03':
			return '父母';
			break;
		case '04':
			return '朋友';
			break;
		case '05':
			return '同事';
			break;
		case '06':
			return '亲属';
			break;
		default:
			return '请选择';
	}
});

//时间格式转换safari兼容
function GetDateDiff(time) {  
            return  time.replace(/\-/g, "/");  
}; 

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    	
    }

    for (var k in o)
      
    if (new RegExp("(" + k + ")").test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }


    return fmt;
    
}

Handlebars.registerHelper('formatTime', function(time) {
	if(time!=null){
		return new Date(GetDateDiff(time)).Format("yyyy-MM-dd");
	}else{
		return null;
	}
});

Handlebars.registerHelper('formatmoney', function(money,n) {
	return formatmoney(money,n);
});

Handlebars.registerHelper('isYestoday', function(time) {
	//获取前一天开始
	var zero = new Date();
	zero.setHours(0);
	zero.setMinutes(0);
	zero.setSeconds(0);
	var now = Date.parse(zero);
	//一天的间隔
	var oneDayLong =24*60*60*1000;
	var currTime = Date.parse(time);
	var comVal = now -currTime;
	
	if((comVal>0)&&(comVal<oneDayLong)){
		return '昨天';
	}else{
		return '';
	}
	
	
});

//判断基本信息是不是可修改状态
Handlebars.registerHelper('judgeState', function(state) {
	if(state == 6||state == 10){
		return true;
	}
});

Handlebars.registerHelper('formatPercent', function(floatVal) {
	return (floatVal*100).toFixed(2) + "%";
});
