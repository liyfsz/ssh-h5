//handlerbars
Handlebars.registerHelper('eq', function(value1, value2) {
	return value1 == value2;
});

Handlebars.registerHelper('gt', function(value1, value2) {
	return value1 > value2;
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


Handlebars.registerHelper('defaultNull', function(value) {
	if(a){
		if(a == 'null'||a == null) {
			return false;
		} else {
			return true;
		}
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

Handlebars.registerHelper('judge', function(status) {
	switch(status) {
		case '5':
			return '分期支付';
			break;
		case '4':
			return '白条支付';
			break;
		case '3':
			return '组合支付';
			break;
		case '1':
			return '支付宝支付';
	}
});


Handlebars.registerHelper('compileState', function(status) {
	switch(status) {
		case 1:
		return '待付款';
		break;
		case 2:
		return '处理中';
		break;
		case 3:
		return '待发货';
		break;
		case 4:
		return '已发货';
		break;
		case 5:
		return '已完成';
		break;
		case 6:
		return '已取消';
		break;
	}
});

Handlebars.registerHelper('comTrail', function(status) {
	switch(status) {
		case 5:
		return '已收货';
		break;
		case 6:
		return '订单已取消';
		break;
		default:
		return '等待收货';
		break;
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
	return new Date(GetDateDiff(time)).Format("MM-dd");
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

//判断商品优惠券可用类型
Handlebars.registerHelper('judgeType', function(state) {
	
	switch(state) {
		case 'MXQ':
		return '免息劵';
		break;
		case 'DXQ':
		return '抵息劵';
		break;
		case 'ALL':
		return '全部支持';
		break;
		default:
		return '暂无可用优惠券';
		break;
	}
});