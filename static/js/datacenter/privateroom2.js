layui.use(['element', 'laydate', 'table', 'layer'], function () {
    var $ = layui.jquery;
    var element = layui.element;
    var laydate = layui.laydate;
    var table = layui.table;
    var layer = layui.layer;
    var table_data;

    //日期范围
    laydate.render({
        elem: '#date',
        range: true
    });

    var obj = (function () {
        var param_obj = {};
        var param_arr = window.location.search.substr(1).split('&');
        for (var i = 0; i < param_arr.length; ++i) {
            var arr = param_arr[i].split('=');
            param_obj[arr[0]] = arr[1];
        }
    }());

    // 导出Excel
    $('#ToExcel').click(function () {

    });

    // 获取json文件并保存到table_data变量
    // $.getJSON("1.js", function (data) {
    //     console.log(data);
    // });

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

    // 日期查询
    $('#searchDate').click();
});

