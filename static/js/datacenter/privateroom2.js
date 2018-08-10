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

    var obj = (function () {
        var param_obj = {};
        var param_arr = window.location.search.substr(1).split('&');
        for (var i = 0; i < param_arr.length; ++i) {
            var arr = param_arr[i].split('=');
            param_obj[arr[0]] = arr[1];
        }
    }());


    // 获取数据并生成表格
    function generateTable(date1, date2) {
        // if (compareDate(date2, today)) {
        //     date2 = getNowFormatDate(-1);
        // }
        $.ajax({
            type: 'get',
            url: "http://localhost:3000/data",
            data: {
                gid: obj.gid,
                gtype: obj.gtype,
                date: obj.date
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
                        { field: 'date', align: 'center', title: '日期', sort: true },
                        { field: 'changci', align: 'center', title: '场次', sort: true },
                        { field: 'adduser', align: 'center', title: '房间名称' },
                        { field: 'dau', align: 'center', title: 'DAU' },
                        { field: 'ciri', align: 'center', title: '总局数' },
                        { field: 'sanri', align: 'center', title: '人均局数' }
                    ]]
                });
            },
            error: function () {
                layer.alert('获取数据时出错了，请联系管理员', { icon: 2, title: '系统信息', skin: 'layui-layer-molv', offset: '200px' });
            }
        })
    }

    generateTable();    // 打开页面生成默认日期数据表格
});