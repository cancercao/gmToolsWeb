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

    var data = [{ 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 },
                { 'id': 1, 'gameid': 619713, 'duijushijian': 961987, 'wanjiaid': 164197, 'wanjianichen': 919871, 'roomnum': 167167461, 'fangxing': 654197, 'jushu': 9816871, 'wanjia1nicheng': 6716716, 'wanjia1id': 97197, 'zhanji1': 654197, 'wanjia2nicheng': 6716716, 'wanjia2id': 97197, 'zhanji2': 654197, 'wanjia3nicheng': 6716716, 'wanjia3id': 97197, 'zhanji3': 654197, 'wanjia4nicheng': 6716716, 'wanjia4id': 97197, 'zhanji4': 654197, 'huifang': 68106716 }
            ]

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

    // 监听查看那一条数据的具体详情
    table.on('tool(table)', function (obj) {
        //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，小于2则新增
        if ($(".layui-tab-title li").length == 1) {
            active.tabAdd(obj);
        } else {
            $(".layui-tab-item").eq(1).empty();
            $(".layui-tab-item").eq(1).html('<iframe data-frameid="view" scrolling="auto" frameborder="0" src="gamerecord2.html?game=' + obj.data.gameid + '&date=' + obj.data.date + '" id="sunIframe"></iframe>');
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
                content: '<iframe data-frameid="view" scrolling="auto" frameborder="0" src="gamerecord2.html?game=' + obj.data.gameid + '&date=' + obj.data.date + '" id="sunIframe"></iframe>',
                id: 'view' //规定好的id
            })
        },
        // 切换到指定Tab项
        tabChange: function (id) {
            element.tabChange('demo', id); //根据传入的id传入到指定的tab项
        }
    };
});

