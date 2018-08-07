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

    // 二级下拉菜单级联
    $('#gameid').change(function () {
        var gameid = $(this).find("option:selected").val();   // 获取选中的游戏
        var game = $('#game');   // 选中游戏的二级下拉菜单
        game.empty();
        switch (gameid) {
            case 'xthh':
                game.append("<option value='hh'>仙桃晃晃</option>");
                game.append("<option value='lz'>仙桃赖子</option>");
                break;
            case 'qjhh':
                game.append("<option value='Value'>潜江晃晃</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'tmhh':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'hchh':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'shhh':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'hhhh':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'tlmj':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'tcmj':
                game.append("<option value='mj'>通城麻将</option>");
                game.append("<option value='gz'>通城个子</option>");
                break;
            case 'lamj':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'gcmj':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'jxmj':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'lxmj':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'hqmj':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'gdmj':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'ngmj':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'ljmj':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'jsmj':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'hsmj':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'xnmj':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
            case 'qphy':
                game.append("<option value='Value'>Text</option>");
                game.append("<option value='Value'>Text</option>");
                break;
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
        cols: [[
            { field: 'id', align: 'center', title: '序号', sort: true },
            { field: 'gameid', align: 'center', title: '游戏名称', sort: true },
            { field: 'changci', align: 'center', title: '场次', sort: true },
            { field: 'date', align: 'center', title: '日期', sort: true },
            { field: 'adduser', align: 'center', title: '游戏日新增' },
            { field: 'dau', align: 'center', title: 'DAU' },
            { field: 'ciri', align: 'center', title: '次日留存率' },
            { field: 'sanri', align: 'center', title: '三日留存率' },
            { field: 'qiri', align: 'center', title: '七日留存率' },
            { field: 'fangka', align: 'center', title: '金币税收' },
            { field: 'zonggong', align: 'center', title: 'AI产出' },
            { field: 'renjun', align: 'center', title: '总局数' },
            { field: 'renjunshichang', align: 'center', title: '人均局数' },
            { field: 'xinzengrenjunjushu', align: 'center', title: '人均游戏时长（分）' },
            { field: 'xinzengrenjunyouxishichang', align: 'center', title: '新增人均局数' },
            { field: 'sirenfanghejinbifang', align: 'center', title: '新增人均游戏时长（分）' },
            { field: 'xiangqing', align: 'center', title: '详情', toolbar: '#barDemo' }
        ]]
    });

    // 监听查看那一条数据的具体详情
    table.on('tool(table)', function (obj) {
        //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，小于2则新增
        if ($(".layui-tab-title li").length == 1) {
            active.tabAdd(obj);
        } else {
            $(".layui-tab-item").eq(1).empty();
            $(".layui-tab-item").eq(1).html('<iframe data-frameid="view" scrolling="auto" frameborder="0" src="goldfield2.html?game=' + obj.data.gameid + '&date=' + obj.data.date + '" id="sunIframe"></iframe>');
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
                title: '金币场详情',
                content: '<iframe data-frameid="view" scrolling="auto" frameborder="0" src="goldfield2.html?game=' + obj.data.gameid + '&date=' + obj.data.date + '" id="sunIframe"></iframe>',
                id: 'view' //规定好的id
            })
        },
        // 切换到指定Tab项
        tabChange: function (id) {
            element.tabChange('demo', id); //根据传入的id传入到指定的tab项
        }
    };
});

