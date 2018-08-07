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
        cols: [
            [
                { field: 'id', rowspan: 2, align: 'center', title: "序号", sort: true },
                { field: 'name', width: 110, rowspan: 2, align: 'center', title: "产品名称", sort: true },
                { field: 'date', rowspan: 2, align: 'center', title: "日期", sort: true },
                { colspan: 1, align: 'center', title: "金币消耗" },
                { colspan: 9, align: 'center', title: "金币产出" }
            ], [
                { field: 'newnum', align: 'center', title: '金币税收' },
                { field: 'newlogin', align: 'center', title: '金币总产出' },
                { field: 'wxuser', align: 'center', title: 'AI产出' },
                { field: 'usernum', align: 'center', title: '注册送' },
                { field: 'userlogin', align: 'center', title: '商城充值' },
                { field: 'loginno', align: 'center', title: '任务获得' },
                { field: 'usercount', align: 'center', title: '福利金' },
                { field: 'newagent', align: 'center', title: '签到' },
                { field: 'agentday', align: 'center', title: '后台发放' },
                { field: 'ciri', align: 'center', title: '大转盘抽奖' }
            ]]
    });
});
