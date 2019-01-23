var pageReload  = function(pId){
 	$.ajax({
	url: baseUrl + '/appCatelist',
	type: 'post',
	data: JSON.stringify({
		"pId": pId
	}),
	contentType: 'application/json',
	success: function(data) {
		if(data.resultCode == 'SUCCESS') {
			if(pId == "0"){
				var myTemplate = Handlebars.compile($("#table-template").html());
			  $('#leftUl').html(myTemplate(data.rows));
			  $("#leftUl").find("ul li:first-child").addClass("active");
			  pageReload(data.rows.productCateList[0].id);
			}else{
				var contTemplate = Handlebars.compile($("#content-template").html());
        $('#rightUl').html(contTemplate(data.rows));
        
			}
      
      //切换左侧菜单
      $("#leftUl").find("li").click(function(){
	      pageReload($(this).data("id"));
	      $(this).addClass("active").siblings().removeClass("active");
      });
      
      $("#bannerImg").attr({
        		"src":picUrl+$("#leftUl").find("li.active").data("url")
        	});
      //商品的图片路径
       $(".imgSrc").each(function(){
        	$(this).attr({
        		"src":picUrl+$(this).data('url')
        	});
        });
		}else{
			showInfo("查看失败")
		}

	}
});
 }
 
pageReload("0");


