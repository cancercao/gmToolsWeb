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
                    cols: [
                        [
                            { field: 'id', rowspan: 2, align: 'center', title: "序号", sort: true },
                            { field: 'name', width: 110, rowspan: 2, align: 'center', title: "产品名称", sort: true },
                            { field: 'date', rowspan: 2, align: 'center', title: "日期", sort: true },
                            { colspan: 3, align: 'center', title: "房卡数据" },
                            { colspan: 5, align: 'center', title: "房卡日消耗" },
                            { colspan: 5, align: 'center', title: "房卡日发放" },
                            { colspan: 5, align: 'center', title: "房卡活跃度" }
                        ], [
                            { field: 'newnum', align: 'center', title: '系统房卡存量' },
                            { field: 'newlogin', align: 'center', title: '活跃玩家房卡存量' },
                            { field: 'wxuser', align: 'center', title: '平衡值' },
                            { field: 'usernum', align: 'center', title: '房卡总消耗' },
                            { field: 'userlogin', align: 'center', title: '私人房总消耗' },
                            { field: 'loginno', align: 'center', title: '房主开房房卡消耗' },
                            { field: 'usercount', align: 'center', title: '代开房房卡消耗' },
                            { field: 'newagent', align: 'center', title: '工会总消耗' },
                            { field: 'agentday', align: 'center', title: '房卡总发放' },
                            { field: 'ciri', align: 'center', title: '注册' },
                            { field: 'sanri', align: 'center', title: '商城购买' },
                            { field: 'qiri', align: 'center', title: '公众号购买' },
                            { field: 'rizong', align: 'center', title: '后台发放' },
                            { field: 'shangcheng', align: 'center', title: '月活库存房卡' },
                            { field: 'fangka', align: 'center', title: '日人均消耗房卡数' },
                            { field: 'ios', align: 'center', title: '日消耗房卡人数' },
                            { field: 'gongzhong', align: 'center', title: '日耗20房卡人数' },
                            { field: 'arpu', align: 'center', title: '月活用户人均房卡' }
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
