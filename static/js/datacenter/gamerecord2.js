layui.use(['element', 'laydate', 'table', 'layer'], function () {
    var $ = layui.jquery;
    var element = layui.element;
    var laydate = layui.laydate;
    var table = layui.table;
    var layer = layui.layer;
    var table_data;

    // 导出Excel
    $('#ToExcel').click(function () {

    });

    // 日期查询
    $('#searchDate').click(function () {
        var str = $('#date').val();
        if (str) {
            var reg = /(\d{1,4})-(\d{1,2})-(\d{1,2})/g; // 正则匹配出开始-结束日期
            var r = str.match(reg);
            console.log(r);
        }
    });

    // 获取json文件并保存到table_data变量
    // $.getJSON("1.js", function (data) {
    //     console.log(data);
    // });

    //日期范围
    laydate.render({
        elem: '#date',
        range: true
    });

    var data;

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
            { field: 'changci', align: 'center', title: '对局时间', sort: true },
            { field: 'date', align: 'center', title: '开房玩家ID', sort: true },
            { field: 'adduser', align: 'center', title: '开房玩家昵称' },
            { field: 'dau', align: 'center', title: '房间号' },
            { field: 'ciri', align: 'center', title: '房型' },
            { field: 'sanri', align: 'center', title: '局数信息' },
            { field: 'qiri', align: 'center', title: '玩家昵称1' },
            { field: 'id', align: 'center', title: '玩家ID1' },
            { field: 'gameid', align: 'center', title: '对局战绩1' },
            { field: 'changci', align: 'center', title: '玩家昵称2' },
            { field: 'date', align: 'center', title: '玩家ID2' },
            { field: 'adduser', align: 'center', title: '对局战绩2' },
            { field: 'dau', align: 'center', title: '玩家昵称3' },
            { field: 'ciri', align: 'center', title: '玩家ID3' },
            { field: 'sanri', align: 'center', title: '对局战绩3' },
            { field: 'qiri', align: 'center', title: '玩家昵称4' },
            { field: 'adduser', align: 'center', title: '玩家ID4' },
            { field: 'dau', align: 'center', title: '对局战绩4' }
        ]]
    });
});

