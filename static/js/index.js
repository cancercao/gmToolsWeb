layui.use(['element', 'layer'], function () {
    var $ = layui.jquery;
    var element = layui.element;
    var layer = layui.layer;

    $('.log').on('mouseover', function () {
        layer.tips('登入日志', '.log', {
            tips: [1, '#3595CC'],
            time: 1000
        });
    });


    //触发事件
    var active = {
        // 新增Tab项
        tabAdd: function (url, id, name) {
            //新增一个Tab项 传入三个参数，分别对应其标题，tab页面的地址，还有一个规定的id，是标签中data-id的属性值
            element.tabAdd('demo', {
                title: name,
                content: '<iframe data-frameid="' + id + '" scrolling="auto" frameborder="0" src="' + url + '.html"></iframe>',
                id: id //规定好的id
            })
            // FrameWH();  //计算ifram层的大小
        },
        // 切换到指定Tab项
        tabChange: function (id) {
            element.tabChange('demo', id); //根据传入的id传入到指定的tab项
        },
        // 删除Tab项
        tabDelete: function (id) {
            element.tabDelete("demo", id);//删除
        }
    };


    //当点击有site-demo-active属性的标签时，即左侧菜单栏中内容 ，触发点击事件
    $('.site-demo-active').on('click', function () {
        var elem = $(this);

        //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，即已经打开的tab项数目
        if ($(".layui-tab-title li").length <= 0) {
            //如果比零小，则直接打开新的tab项
            active.tabAdd(elem.attr("data-url"), elem.attr("data-id"), elem.attr("data-title"));
        } else {
            //否则判断该tab项是否以及存在
            var isData = false; //初始化一个标志，为false说明未打开该tab项 为true则说明已有
            $.each($(".layui-tab-title li"), function () {
                //如果点击左侧菜单栏所传入的id 在右侧tab项中的lay-id属性可以找到，则说明该tab项已经打开
                if ($(this).attr("lay-id") == elem.attr("data-id")) {
                    isData = true;
                }
            })
            if (isData == false) {
                //标志为false 新增一个tab项
                active.tabAdd(elem.attr("data-url"), elem.attr("data-id"), elem.attr("data-title"));
            }
        }
        //最后不管是否新增tab，最后都转到要打开的选项页面上
        active.tabChange(elem.attr("data-id"));
    });

    // function FrameWH() {
    //     // var h = $(window).height() - 41 - 10 - 60;
    //     // $("iframe").css("padding", "10px 10px 0 10px");
    //     // $("iframe").css("height", h + "px");
    // }

    // $(window).resize(function () {
    //     FrameWH();
    // })

});

$('#logout').click(function () {
    // $.ajax({
    //     type
    // })
})

