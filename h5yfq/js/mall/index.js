//轮播
var swiper = new Swiper('.swiper-container', {
	pagination: '.swiper-pagination',
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	paginationClickable: true,
	spaceBetween: 30,
	centeredSlides: true,
	autoplay: 2500,
	autoplayDisableOnInteraction: false,
	loop: true
});

$.ajax({
	url: baseUrl + '/appShopIndex',
	type: 'post',
	data: JSON.stringify({
		"bannerPosition": "2"
	}),
	contentType: 'application/json',
	success: function(data) {
		if(data.resultCode == 'SUCCESS') {
			var myTemplate = Handlebars.compile($("#table-template").html());
			$('#html-section').html(myTemplate(data.rows));
			//轮播图片获取加前缀
			 $(".swiper-slide").each(function(){
        	$(this).css({
        		"background":"url("+picUrl+$(this).data('url')+")"
        	});
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