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

    var data = [{ 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 3, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'tcmj', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164 }]

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
            { field: 'changci', align: 'center', title: '玩家ID', sort: true },
            { field: 'date', align: 'center', title: '玩家昵称', sort: true },
            { field: 'adduser', align: 'center', title: '订单编号' },
            { field: 'dau', align: 'center', title: '充值金额' },
            { field: 'ciri', align: 'center', title: '充值时间' },
            { field: 'sanri', align: 'center', title: '充值类型' },
            { field: 'qiri', align: 'center', title: '货币类型' }
        ]]
    });
});
