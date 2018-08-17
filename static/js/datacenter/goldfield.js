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

    // 二级下拉菜单级联
    $('#gameid').change(function () {
        var gameid = $(this).find("option:selected").val();   // 获取选中的游戏
        var game = $('#gtype');   // 选中游戏的二级下拉菜单
        game.empty();
        switch (gameid) {
            case 'xthh':
                game.append("<option value='hh'>仙桃晃晃</option>");
                break;
            case 'qjhh':
                game.append("<option value='Value'>潜江晃晃</option>");
                break;
            case 'tmhh':
                game.append("<option value='Value'>天门硬晃</option>");
                game.append("<option value='Value'>天门赖晃</option>");
                break;
            case 'hchh':
                game.append("<option value='Value'>汉川硬晃</option>");
                game.append("<option value='Value'>汉川赖晃</option>");
                break;
            case 'sshh':
                game.append("<option value='Value'>石首晃晃</option>");
                break;
            case 'hhhh':
                game.append("<option value='Value'>洪湖硬晃</option>");
                game.append("<option value='Value'>洪湖赖晃</option>");
                break;
            case 'tlmj':
                game.append("<option value='Value'>铜陵麻将</option>");
                break;
            case 'tcmj':
                game.append("<option value='mj'>通城麻将</option>");
                game.append("<option value='gz'>通城个子</option>");
                break;
            case 'lamj':
                game.append("<option value='Value'>六安麻将</option>");
                break;
            case 'gcmj':
                game.append("<option value='Value'>高淳麻将</option>");
                break;
            case 'jxmj':
                game.append("<option value='Value'>泾县麻将</option>");
                break;
            case 'lxmj':
                game.append("<option value='Value'>郎溪麻将</option>");
                break;
            case 'hqmj':
                game.append("<option value='Value'>霍邱麻将</option>");
                break;
            case 'gdmj':
                game.append("<option value='Value'>广德麻将</option>");
                break;
            case 'ngmj':
                game.append("<option value='Value'>宁国麻将</option>");
                break;
            case 'ljmj':
                game.append("<option value='Value'>庐江麻将</option>");
                break;
            case 'jsmj':
                game.append("<option value='Value'>界首麻将</option>");
                break;
            case 'hsmj':
                game.append("<option value='Value'>霍山麻将</option>");
                break;
            case 'xnmj':
                game.append("<option value='Value'>休宁麻将</option>");
                break;
            case 'qphy':
                game.append("<option value='Value'>金寨麻将</option>");
                game.append("<option value='Value'>寿县麻将</option>");
                game.append("<option value='Value'>溧水麻将</option>");
                game.append("<option value='Value'>文登麻将</option>");
                game.append("<option value='Value'>莱阳麻将</option>");
                game.append("<option value='Value'>合山麻将</option>");
                game.append("<option value='Value'>上蔡麻将</option>");
                game.append("<option value='Value'>京山麻将</option>");
                break;
        }
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
                gtype: $('#gtype').val(),
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
                    cellMinWidth: 80,
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

    // 监听查看那一条数据的具体详情
    table.on('tool(table)', function (obj) {
        //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，小于2则新增
        if ($(".layui-tab-title li").length == 1) {
            active.tabAdd(obj);
        } else {
            $(".layui-tab-item").eq(1).empty();
            $(".layui-tab-item").eq(1).html('<iframe data-frameid="view" scrolling="auto" frameborder="0" src="goldfield2.html?gid=' + obj.data.gameid + '&date=' + obj.data.date + '&gtype=' + $('#gtype').val() + '" id="sunIframe"></iframe>');
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
                content: '<iframe data-frameid="view" scrolling="auto" frameborder="0" src="goldfield2.html?gid=' + obj.data.gameid + '&date=' + obj.data.date + '&gtype=' + $('#gtype').val() + '" id="sunIframe"></iframe>',
                id: 'view' //规定好的id
            })
        },
        // 切换到指定Tab项
        tabChange: function (id) {
            element.tabChange('demo', id); //根据传入的id传入到指定的tab项
        }
    };

    generateTable(getNowFormatDate(-30), getNowFormatDate(-1));    // 打开页面生成默认日期数据表格
});
