layui.use(['element', 'laydate', 'table'], function () {
    var $ = layui.jquery;
    var element = layui.element;
    var laydate = layui.laydate;
    var table = layui.table;
    var table_data;

    // 导出Excel
    $('#ToExcel').click(function () {

    });

    // 日期查询
    $('#searchDate').click(function() {
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
                {field: 'newnum', align: 'center', title: '序号' },
                {field: 'newlogin', align: 'center', title: '游戏名称' },
                {field: 'wxuser', align: 'center', title: '统计日' },
                {field: 'usernum', align: 'center', title: '注册数' },
                {field: 'userlogin', align: 'center', title: '次日留存数' },
                {field: 'loginno', align: 'center', title: '次日留存率' },
                {field: 'usercount', align: 'center', title: '3日留存数' },
                {field: 'newagent', align: 'center', title: '3日留存率' },
                {field: 'agentday', align: 'center', title: '7日留存数' },
                {field: 'ciri', align: 'center', title: '7日留存率' },
                {field: 'sanri', align: 'center', title: '15日留存数' },
                {field: 'qiri', align: 'center', title: '15日留存率' },
                {field: 'rizong', align: 'center', title: '30日留存数' },
                {field: 'shangcheng', align: 'center', title: '30日留存率' }
            ]]
    });
});

