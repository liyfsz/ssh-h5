var pageReload = function(follId,pName,pId,sort,ppId){
	$.ajax({
	url: baseUrl + '/appProductList',
	type: 'post',
	data: JSON.stringify({
		"follId":follId,
		"pName":pName,
		"pId":pId,
		"sort":sort,
		"ppId":ppId
		}),
	contentType: 'application/json',
	success: function(data) {
		if(data.resultCode == 'SUCCESS') {
			var myTemplate = Handlebars.compile($("#table-template").html());
			$('.goodsDatas').html(myTemplate(data));
			  //商品的图片路径
       $(".imgSrc").each(function(){
        	$(this).attr({
        		"src":picUrl+$(this).data('url')
        	});
        });
        
        
		}else{
			showInfo("查看失败");
		}

	}
});
}


pageReload("0","-1",GetQueryString("id"),"0","-1");

//排序样式切换
function getClickItem(e, selectType) {
	switch(selectType) {
		case "compre":
			$(e.target).addClass("downOnly");
			$(e.target).siblings().removeClass();
      pageReload("0","-1",GetQueryString("id"),"0","-1");
			
			break;
		case "sales":
			if($(e.target).hasClass("downSort")) {
				$(e.target).attr("class", "upSort");
      pageReload("0","-1",GetQueryString("id"),"4","-1");
			} else {
				$(e.target).attr("class","downSort");
      pageReload("0","-1",GetQueryString("id"),"3","-1");
			}
			$(e.target).siblings().removeClass();
			break;
		case "price":
			if($(e.target).hasClass("downSort")) {
				$(e.target).attr("class", "upSort");
      pageReload("0","-1",GetQueryString("id"),"2","-1");
				
			} else {
				$(e.target).addClass("downSort");
      pageReload("0","-1",GetQueryString("id"),"1","-1");
				
			}
			$(e.target).siblings().removeClass();
			break;
	}
}


//排序异步刷新
	$(".tabSelect").find("li").on("click", function(e) {
		var selectType = $(this).data("type");
		getClickItem(e, selectType);
	});


