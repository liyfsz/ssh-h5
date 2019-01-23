$(function() {
  $(".togRelate").live("click",function() {
    $(".maskBg").css({
      display: "block",
      height: $(document).height()
    });
    var thisConClass = $(this).data("con");
    $("."+thisConClass).css({display: "block"})
  });
  //点击遮罩层关闭
  $(".maskBg").on('click', function() {
    $(".maskBg,.modalCon").css({display: "none"});
  });
  
  /*模拟选中*/
  
  $(".modalCon ul li").live('click',function(event){
    var ralateLink = $(this).parents("div.modalCon").data("link");
    $("."+ralateLink).text($(this).text());
    $("."+ralateLink).next("span").html($(this).text());
     $("."+ralateLink).next("input").val($(this).text());
     $("."+ralateLink).next("input").next("input").val($(this).attr('id'));
    $(".maskBg,.modalCon").css({display: "none"});
    if($(event.target).text()=='其他'){
    	console.log("选择了其他");
    	$("."+ralateLink).parents(".form-group").next(".relateBank").addClass("show");
    }else{
    	$("."+ralateLink).parents(".form-group").next(".relateBank").removeClass("show");
    }
  });
  
});
$(function() {
  $(".mytogRelate").live('click',function() {
      if($('.province').val() != ''){
        var provinceId = $("input[name=companyProvince]").val();
        console.log(provinceId);
        $.ajax({
            url: baseUrl+'/appGetRegion',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
              'parentId':provinceId
            }),
            success: function(data) {
              console.log(data);
               console.log(data.data[0].regionName);
              if(data.resultCode == 'SUCCESS') {
                for(var i=0; i<data.data.length;i++){
                  $('.addressList').append('<li id="'+data.data[i].id+'">'+data.data[i].regionName+'</li>')
                };  
              }
            }
        });
        $('.addressList').empty();
  }
    $(".maskBg").css({
      display: "block",
      height: $(document).height()
    });
    var thisConClass = $(this).data("con");
    $("."+thisConClass).css({display: "block"})
  });
  //点击遮罩层关闭
  $(".maskBg").on('click', function() {
    $(".maskBg,.modalCon").css({display: "none"});
  });
  
  
});
//对私
$(function() {
  $(".mytogRelate3").live('click',function() {
      if($('.province3').val() != ''){
        var provinceId3 = $("input[name=bankProvincePr]").val();
        console.log(provinceId3);
        $.ajax({
            url: baseUrl+'/appGetRegion',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
              'parentId':provinceId3
            }),
            success: function(data) {
              console.log(data);
               console.log(data.data[0].regionName);
              if(data.resultCode == 'SUCCESS') {
                for(var i=0; i<data.data.length;i++){
                  $('.addressList3').append('<li id="'+data.data[i].id+'">'+data.data[i].regionName+'</li>')
                };  
              }
            }
        });
         $('.addressList3').empty();
  }
    $(".maskBg").css({
      display: "block",
      height: $(document).height()
    });
    var thisConClass = $(this).data("con");
    $("."+thisConClass).css({display: "block"})
  });
  //点击遮罩层关闭
  $(".maskBg").on('click', function() {
    $(".maskBg,.modalCon").css({display: "none"});
  });
  
 
  
});
//请求市2
$(function() {
  $(".mytogRelate2").live('click',function() {
      if($('.province2').val() != ''){
        var provinceId2 = $("input[name=bankProvince]").val();
        console.log(provinceId2);
        $.ajax({
            url: baseUrl+'/appGetRegion',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
              'parentId':provinceId2
            }),
            success: function(data) {
              console.log(data);
               console.log(data.data[0].regionName);
              if(data.resultCode == 'SUCCESS') {
                for(var i=0; i<data.data.length;i++){
                  $('.addressList2').append('<li id="'+data.data[i].id+'">'+data.data[i].regionName+'</li>')
                };  
              }
            }
        });
         $('.addressList2').empty();
  }
    $(".maskBg").css({
      display: "block",
      height: $(document).height()
    });
    var thisConClass = $(this).data("con");
    $("."+thisConClass).css({display: "block"})
  });
  //点击遮罩层关闭
  $(".maskBg").on('click', function() {
    $(".maskBg,.modalCon").css({display: "none"});
  });
  
  
  
});
//行业小类
$(function() {
$(".bigIndustrySpan").live("click",function() {
	$(".relate2").text("请选择");
});
$(".bigTogRelate").live("click",function() {

    if($('.bigIndustryCa').val() != ''){
        var bigId = $('.bigIndustry').val();
    console.log(222);
        
          $.ajax({
            url: baseUrl+'/getByPid?id='+ bigId +'',
            type: 'get',
            contentType: 'application/json',
            success: function(data) {
              console.log(data);
                for(var i=0; i<data.length;i++){
                  $('.businessSmall').append('<li id="'+data[i].id+'">'+data[i].name+'</li>')
                };
              }
          });
           $('.businessSmall').empty();
  }
    $(".maskBg").css({
      display: "block",
      height: $(document).height()
    });
    var thisConClass = $(this).data("con");
    $("."+thisConClass).css({display: "block"})
});
//点击遮罩层关闭
$(".maskBg").on('click', function() {
    $(".maskBg,.modalCon").css({display: "none"});
});



});