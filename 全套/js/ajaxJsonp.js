$(function () {
    $("#submit").click(function () {
        if (verifyFormData()) {
            var localurl = document.location.href;
            getQueryString(localurl);
            var id = getQueryString('id');
            var url = getQueryString('url');
            var qd = getQueryString('qd');
            var value = $(('input:radio[name="package"]:checked')).attr("data-value");
            var u = navigator.userAgent;
            var wSys = "";
            if (u.indexOf('Android') > 0) {//安卓手机
                wSys = "安卓手机";
            }
            if (u.indexOf('Mac') > 0) {//苹果电脑
                if (u.indexOf('iPhone') > 0)//苹果手机 
                {
                    wSys = "苹果手机";
                }
                else {
                    wSys = "苹果电脑";
                }
            }
            if (u.indexOf('Windows Phone') > 0) {//winphone手机
                wSys = "winphone手机";
            }
            if (u.indexOf('Windows NT') > 0) {//Windows电脑pc
                wSys = "Windows电脑";
            }

            $('#submit').attr("disabled", true);
            $('#submit').val("加载中…");
            $.ajax({
                async: false,
                url: "http://api.me.solargift.cn/AddOrderApp.ashx?id=" + id + "&url=" + url + "&qd=" + qd + "&price=" + value + "&system=" + wSys + "",
                dataType: "jsonp",
                jsonp: 'callback',
                data: $("#ordeForm").serialize(),
                contentType: "application/jsonp; charset=utf-8",
                success: function (data) {
                    if (data.mesg == "True") {
                        $('#name').val("");
                        $('#tel').val("");
                        $('#address').val("");
                        $('#submit').attr("disabled", false);
                        $('#submit').val("确认下单 (货到付款)");
                        window.location.href = "http://www.timesenz.com/free/share.htm?id=" + id;
                    }
                    else {
                        alert('对不起，您添加的订单失败，请重新添加！');
                        $('#name').val("");
                        $('#tel').val("");
                        $('#address').val("");
                        $('#submit').attr("disabled", false);
                        $('#submit').val("确认下单 (货到付款)");
                    }
                },
                error: function () { alert('连接服务器失败') }
            })
        }
    })
})

function verifyFormData() {
    if ($("#name").val().trim() == "") {
        alert('请输入收货人姓名！');
        return false;
    }
    if (!$("#name").val().match(/^[\u4e00-\u9fa5]{2,10}\s*$/)) {
        alert('输入的收货人姓名不合法！');
        return false;
    }
    if ($("#tel").val().trim() == "") {
        alert('请输入手机号码！');
        return false;
    }
    if (!$("#tel").val().match(/^0*(13|15|17|18)\d{9}$/)) {
        alert('输入的手机号码不合法！');
        return false;
    }
    if ($("#address").val().trim() == "") {
        alert('请输入详细地址！');
        return false;
    }
    if ($("#address").val().length > 50) {
        alert('输入的详细地址长度过长！');
        return false;
    }
    if ($("#message").val().length > 300) {
        alert('输入的留言长度过长！');
        return false;
    }
    return true;
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}