layui.use(['element', 'laydate', 'table', 'layer'], function () {
    var $ = layui.jquery;
    var element = layui.element;
    var laydate = layui.laydate;
    var table = layui.table;
    var layer = layui.layer;
    var today = getNowFormatDate(0);

    $('#ToExcel').on('mouseover', function () {
        layer.tips('导出Excel', '#ToExcel', {
            tips: [1, '#3595CC'],
            time: 1000
        });
    });

    // 日期选择器
    laydate.render({
        elem: '#date',
        range: true
    });

    // 导出Excel
    $('#ToExcel').click(function () {

    });

    // 日期格式化
    function getNowFormatDate(addDayCount) {
        var day = new Date();
        day.setDate(day.getDate() + addDayCount);
        var Year = 0;
        var Month = 0;
        var Day = 0;
        var CurrentDate = "";
        // 初始化时间
        Year = day.getFullYear();
        Month = day.getMonth() + 1;
        Day = day.getDate();
        CurrentDate += Year + "-";
        if (Month >= 10) {
            CurrentDate += Month + "-";
        } else {
            CurrentDate += "0" + Month + "-";
        }
        if (Day >= 10) {
            CurrentDate += Day;
        } else {
            CurrentDate += "0" + Day;
        }
        return CurrentDate;
    }

    // 日期比较
    function compareDate(d1, d2) {
        return ((new Date(d1.replace(/-/g, "\/"))) >= (new Date(d2.replace(/-/g, "\/"))));
    }

    // 获取数据并生成表格
    function generateTable(date1, date2) {
        if (compareDate(date2, today)) {
            date2 = getNowFormatDate(-1);
        }
        $.ajax({
            type: 'get',
            url: "http://localhost:3000/data",
            data: {
                gtype: $('#gtype').val(),
                gid : $('#gameid').val(),
                date1: date1,
                date2: date2
            },
            success: function (data) {
                table.render({
                    elem: '#table',
                    height: 'full-110',
                    page: true,
                    data: data,
                    limit: 18,
                    cellMinWidth: 110, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    cols: [[
                        { field: 'id', align: 'center', title: '序号', sort: true },
                        { field: 'gameid', align: 'center', title: '游戏名称', sort: true },
                        { field: 'duijushijian', align: 'center', title: '对局时间', sort: true },
                        { field: 'wanjiaid', align: 'center', title: '开房玩家ID', sort: true },
                        { field: 'wanjianichen', align: 'center', title: '开房玩家昵称' },
                        { field: 'roomnum', align: 'center', title: '房间号' },
                        { field: 'fangxing', align: 'center', title: '房型' },
                        { field: 'jushu', align: 'center', title: '局数信息' },
                        { field: 'wanjia1nicheng', align: 'center', title: '玩家昵称1' },
                        { field: 'wanjia1id', align: 'center', title: '玩家ID1' },
                        { field: 'zhanji1', align: 'center', title: '对局战绩1' },
                        { field: 'wanjia2nicheng', align: 'center', title: '玩家昵称2' },
                        { field: 'wanjia2id', align: 'center', title: '玩家ID2' },
                        { field: 'zhanji2', align: 'center', title: '对局战绩2' },
                        { field: 'wanjia3nicheng', align: 'center', title: '玩家昵称3' },
                        { field: 'wanjia3id', align: 'center', title: '玩家ID3' },
                        { field: 'zhanji3', align: 'center', title: '对局战绩3' },
                        { field: 'wanjia4nicheng', align: 'center', title: '玩家昵称4'},
                        { field: 'wanjia4id', align: 'center', title: '玩家ID4' },
                        { field: 'zhanji4', align: 'center', title: '对局战绩4' },
                        { field: 'huifang', align: 'center', title: '回放码' },
                        { field: 'caozuo', align: 'center', title: '操作', toolbar: '#barDemo' }
                    ]]
                });
            },
            error: function () {
                layer.alert('获取数据时出错了，请联系管理员', { icon: 2, title: '系统信息', skin: 'layui-layer-molv', offset: '200px' });
            }
        })
    }

    // 日期查询
    $('#searchDate').click(function () {
        var str = $('#date').val();
        if (str) {
            var reg = /(\d{1,4})-(\d{1,2})-(\d{1,2})/g; // 正则匹配出 开始/结束 日期
            var date_arr = str.match(reg);
            generateTable(date_arr[0], date_arr[1]);
        }else {
            layer.alert('请先选择需要查询的日期', { icon: 7, title: '系统信息', skin: 'layui-layer-molv', offset: '200px' });
        } 
    });

    // 监听查看那一条数据的具体详情
    table.on('tool(table)', function (obj) {
        //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，小于2则新增
        if ($(".layui-tab-title li").length == 1) {
            active.tabAdd(obj);
        } else {
            $(".layui-tab-item").eq(1).empty();
            $(".layui-tab-item").eq(1).html('<iframe data-frameid="view" scrolling="auto" frameborder="0" src="gamerecord2.html?game=' + obj.data.gameid + '&roomid=' + obj.data.wanjiaid + '" id="sunIframe"></iframe>');
        }

        //最后不管是否新增tab，最后都转到要打开的选项页面上
        active.tabChange('view');
    });

    //触发事件
    var active = {
        // 新增Tab项
        tabAdd: function (obj) {
            //新增一个Tab项 传入三个参数，分别对应其标题，tab页面的地址，还有一个规定的id，是标签中data-id的属性值
            element.tabAdd('demo', {
                title: '战绩详情',
                content: '<iframe data-frameid="view" scrolling="auto" frameborder="0" src="gamerecord2.html?game=' + obj.data.gameid + '&roomid=' + obj.data.wanjiaid + '" id="sunIframe"></iframe>',
                id: 'view' //规定好的id
            })
        },
        // 切换到指定Tab项
        tabChange: function (id) {
            element.tabChange('demo', id); //根据传入的id传入到指定的tab项
        }
    };

    generateTable(getNowFormatDate(-30), getNowFormatDate(-1));    // 打开页面生成默认日期数据表格
});

