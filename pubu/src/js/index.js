

var oLi = $('li');
var page = 1;
var flag = false;
//查找最短的列
function getMinLi() {
    var index = 0;
    var minH = $(oLi[0]).height();
    for (var i = 0; i < oLi.length; i++) {
        if ($(oLi[i]).height() < minH) {
            index = i;
            minH = $(oLi[i]).height();
        }

    }
    return {
        index:index,
        minH:minH
    };
}

function getData() {
   if(flag){
       return;
   }
   flag = true;
    $('.loading').show();
    $.ajax({
        type: 'GET',
        url: './src/js/getPics.php',
        data: {
            cpage: page
        },
        success: function (data) {
            var dataList = JSON.parse(data);
            dataList.forEach(function(item,index){
                renderDom(item);
            });
            if(dataList.length < 1){
                page = 1;
            }
            $('.loading').hide();
            page++;
            flag = false;
        }
    })
}

function renderDom(item){
    var oDiv = $('<div class="item"></div>');
    var img = new Image();
    img.src = item.preview;
    var p = $('<p></p>');
    p.text(item.title);
    img.onload = function(){  
        oDiv.append(img).append(p);
        var index = getMinLi().index;
        $(oLi[index]).append(oDiv);
        
    }
}

getData();

$(window).scroll(function (){
    console.log($(window).scrollTop(),$(window).height())
    //最短列的高度 < 滑轮滚动的距离 + 页面window的高度
    var scrollHeight = $(window).scrollTop();
    var winH = $(window).height();
    var minH = getMinLi().minH;
    if(minH <= winH + scrollHeight){
        getData();
    }
})