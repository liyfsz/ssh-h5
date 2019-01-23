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
        loop:true
    });
//底部的切换
/*for(var i=1;i<7;i++){
  $('.a'+i).live('click',function(){
    $(this).addClass('current').siblings('a').removeClass('current');
    $('.hand').hide();
    var len = $(this).index()+1;
    $('.bars'+len).show().siblings().hide();
  });
}*/
$.ajax({
  url:baseUrl+'/appBannerList',
  type:'post',
  data:JSON.stringify({
    "pId":0,
    "bannerPosition":1
  }),
  contentType: 'application/json',
  success:function(data){   
    var data = data.rows;
    console.log(data);
    var myTemplate = Handlebars.compile($("#table-template").html());
    $('#html-section').html(myTemplate(data));
    //轮播图片获取加前缀
    $(".banner").each(function(){
      $(this).attr("src",picUrl+$(this).data('url'));
    });
     //场景分类图片获取加前缀
    $(".proScene").each(function(){
      $(this).attr("src",picUrl+$(this).data('url'));
    });
    //活动中心
    $('.activite').attr("src", picUrl + $('.activite').data('url'));
  }
});