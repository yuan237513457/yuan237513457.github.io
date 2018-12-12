
//请求数据
function getData(val) {
    $.ajax({
        type: 'GET',
        url: 'http://data.duyiedu.com/api/chat',
        data: {
            text: val,
        },
        success: function (data) {
            var dataList = typeof data == 'string' ? JSON.parse(data) : data;
            renderDom(dataList.text,'rabit');
        }
    })
}
// 绑定事件
function bindEvent() {
    $('.shuru').on('keyup', function (e) {
        var val = $(this).val();
        console.log(val)
        if(val){
           $('.btn').css('backgroundColor','#97d219') 
        }else{
            $('.btn').css('backgroundColor','#ccc')
        }
        if (e.keyCode === 13) {
             $('.btn').trigger('click'); 
        }
    });
   $('.btn').on('click',function(e){
    var val = $('.shuru').val();
    if(val){  
        renderDom(val,'ziji');
        getData(val); 
    }
   })
}

//页面插入数据
function renderDom(text, str) {
    if (str == 'ziji') {
        var dom = $('<div class="me">\
                    <p>' + text + '</p>\
                    <i></i>\
                    </div>');
    } else {
        var dom = $('<div class="jiqi">\
                    <p>' + text + '</p>\
                    <i></i>\
                    </div>');
    }
    $('.content-warpper').append(dom);
    $('.shuru').val('');
    $('.btn').css('backgroundColor','#ccc')
    $('.content-warpper').scrollTop($('.content-warpper')[0].scrollHeight)
}

bindEvent();