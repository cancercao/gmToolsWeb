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

    var data = [{ 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 3, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'tcmj', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 },
    { 'id': 1, 'gameid': 'xthh', 'changci': 16571, 'date': '2018/8/3', 'adduser': 6541, 'dau': 6541, 'ciri': 16541, 'sanri': 641, 'qiri': 97164, 'fangka': 49163, 'zonggong': 1971, 'renjun': 1671, 'renjunshichang': 98716, 'xinzengrenjunjushu': 167164, 'xinzengrenjunyouxishichang': 67131, 'sirenfanghejinbifang': 916547 }]

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
});
