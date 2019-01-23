$(function(){
	$(".list").find("a").each(function(event){
		$(this).attr("href",$(this).attr("href")+"?sessionId="+getSessionVal());
	})
});
