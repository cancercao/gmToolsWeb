// var event = e || window.event; //兼容事件对象写法
// var target = event.target || event.srcElement; //兼容事件源对象写法
//取消冒泡兼容写法
// function stopBubble (event) {
//     if (event.stopPropagation) {
//         event.stopPropagation();
//     }else {
//         event.cancelable = true;
//     }
// }

function subLogin() {
    var error = $('.error');
    var username = $('#username').val(),
        password = $('#password').val(),
        id = $("#account").val();
    if (!username || !password) {
        error.text('请填写正确的用户名和密码');
        error.show();
    }else {
        $.ajax({
            cache: false,
            type: 'post',
            url: '',
            data:{
                'username': username,
                'password': password,
                'id':id
            },
            beforeSend: function () {
                $('.sub').text('Loading...');
            },
            success: function (res) {
                if (res.status == 'error') {
                    $('.sub').text('login');
                    error.text(res.msg);
                    error.show();
                }else {
                    $('.sub').text('登陆成功');
                    location.href = '/yw/index/';
                }
            },
            error: function () {
                $('.sub').text('login');
            }
        })
    }
}

//增加键盘回车登录
document.onkeyup = function (e) {
    if (e.keyCode == 13) {
        subLogin();
    }
};

