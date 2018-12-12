
var oLi = $('li');
var page = 1;
var flag = false;
// 获取最短的列
function getMinList() {
    var index = 0;
    var minH = $(oLi[0]).height();
    for (var i = 0; i < oLi.length; i++) {
        if ($(oLi[i]).height() < minH) {
            index = i;
            minH = $(oLi[i]).height();
        }
    }
    return {
        index: index,
        minH: minH
    }
}
//获取后台数据
function getData() {
    if (flag) {
        return;
    }
    flag = true;
    $('.loading').show();
    $.ajax({
        type: 'GET',
        url: './js/getPics.php',
        data: {
            cpage: page
        },
        success: function (data) {
            var dataList = JSON.parse(data);
            dataList.forEach(function (item, index) {
                renderDom(item);
            });
            if (dataList.length < 1) {
                page = 1;
            }
            $('.loading').hide();
            page++;
            flag = false;
        }

    })
}

//向页面添加图片信息
function renderDom(item) {
    var oDiv = $('<div class="item"></div>');
    var img = new Image();
    img.src = item.preview;
    var p = $('<p></p>');
    p.text(item.title);
    var xDiv = $('<div class="xian"></div>')
    img.onload = function () {
        oDiv.append(img).append(p).append(xDiv);
        var index = getMinList().index;
        $(oLi[index]).append(oDiv);
    }
}

getData();



//当页面发生滚动时
$(window).scroll(function () {
    //最短列的高度< 滑轮滚动的距离+ 页面window的高度
    var scrollHeight = $(window).scrollTop();
    var winH = $(window).height();
    var minH = getMinList().minH;
    if (scrollHeight) {
        $('.huiding').show();
        $('.dibu').show();
    } else {
        $('.dibu').hide();
        $('.huiding').hide();
    }
    if (minH <= winH + scrollHeight) {

        getData();
    }
})
// 当点击返回顶部时
$('#huiding').click(function () {
    $('body,html').animate({ scrollTop: 0 }, 300);
    return false;
})

// 分享按钮 显示隐藏
    $('.tan').on('mouseenter',function(e){
        if($(this).hasClass('more')){
            $('.gengduo').show();
            dianJi('.more','.gengduo')
        }else if($(this).hasClass('xiaoxi')){
            $('.xiaoxi-t').show();
            dianJi('.xiaoxi','.xiaoxi-t')
        }else if($(this).hasClass('tianjia')){
            $('.tianjia-t').show();
            dianJi('.tianjia','.tianjia-t')
        }
    })
    function dianJi(btn,tanchuang){
        var timer = null;
        $(btn).one('mouseleave' ,function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                $(tanchuang).hide()
            }, 500)
        })
        $(tanchuang).hover(function () {
            clearTimeout(timer);
            $(tanchuang).show();
        }, function () {
            timer = setTimeout(function () {
                $(tanchuang).hide()
            }, 500)
        });
    
    }


