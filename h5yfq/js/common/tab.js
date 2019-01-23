$(function() {
	$(document).on('click',".tab-panel ul li",function(event){
		$(this).addClass('active').siblings().removeClass('active');
		var index = $(this).index();
		$('.tab-content > div').eq(index).show().siblings().hide();
	});
	
});