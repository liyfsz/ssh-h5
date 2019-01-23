//退货
  $.ajax({
      type:'post',
      url:baseUrl+"/member/getBackList",
      dataType:'json',
      contentType:'application/json',
      data:JSON.stringify({
        "pageIndex":1,
        "sessionId":GetQueryString('sessionId')
      }),
      success:function (data) {
          if(data.resultCode == "SUCCESS"){
           console.log(data);
            //刷新数据
            var template = Handlebars.compile($("#item-template").html());
            var html = template(data);
            $('.ul').html(html);
            
            //图片获取加前缀
            $(".product_logo").each(function(){
              $(this).attr("src",picUrl+$(this).data('url'));
            });
          }else if(data.errorCode =="ERROR_NOAUTH"){
             getSessionId();
          }else{
            showInfo('查看失败');
          }
          
      }
  });
//换货

  $.ajax({
      type:'post',
      url:baseUrl+"/member/getChangeList",
      dataType:'json',
      contentType:'application/json',
      data:JSON.stringify({
        "pageIndex":1,
        "sessionId":GetQueryString('sessionId')
      }),
      success:function (data) {
          if(data.resultCode == "SUCCESS"){
           console.log(data);
            //刷新数据
            var template = Handlebars.compile($("#change-template").html());
            var html = template(data);
            $('.ul1').html(html);
            
            //图片获取加前缀
            $(".product_logo").each(function(){
              $(this).attr("src",picUrl+$(this).data('url'));
            });
          }else if(data.errorCode =="ERROR_NOAUTH"){
             getSessionId();
          }else{
            showInfo('查看失败');
          }
          
      }
  });


