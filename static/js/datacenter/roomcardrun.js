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
                rechtype: $('#rechType').val(),
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
                    cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    cols: [[
                        { field: 'id', align: 'center', title: '序号', sort: true },
                        { field: 'gameid', align: 'center', title: '游戏名称', sort: true },
                        { field: 'changci', align: 'center', title: '游戏ID', sort: true },
                        { field: 'date', align: 'center', title: '微信昵称', sort: true },
                        { field: 'adduser', align: 'center', title: '开始时房卡数量' },
                        { field: 'dau', align: 'center', title: '结束时房卡数量' },
                        { field: 'ciri', align: 'center', title: '变化数量' },
                        { field: 'sanri', align: 'center', title: '变化原因' },
                        { field: 'xiangqing', align: 'center', title: '详情' },
                        { field: 'qiri', align: 'center', title: '日期' }
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

    generateTable(getNowFormatDate(-30), getNowFormatDate(-1));    // 打开页面生成默认日期数据表格
});
