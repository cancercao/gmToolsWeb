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
    
    // 判断是否有三人房
    function judgeThreeRoom (gameid, gtype) {
        if (gameid == 'tcmj') {
            $('.three').show();
        }else {
            $('#playerNum').val('two');
            if (gameid == 'tmhh') {
                if (gtype == 'yh' || gtype == 'yhszj') {
                    $('.three').show();
                }else {
                    $('.three').hide();
                }
            }else {
                if (gtype.indexOf('srlm') != -1 || gtype.indexOf('szj') != -1) {
                    $('.three').show();
                }else {
                    $('.three').hide();
                }
            }
        }
    }

    // 二级下拉菜单级联
    $('#gameid').change(function () {
        var gameid = $(this).find("option:selected").val();   // 获取选中的游戏
        var game = $('#gtype');   // 选中游戏的二级下拉菜单
        game.empty();
        switch (gameid) {
            case 'xthh':
                game.append("<option value='hh'>仙桃晃晃</option>");
                game.append("<option value='xtsrlm'>仙桃三人俩门</option>");
                break;
            case 'qjhh':
                game.append("<option value='hh'>潜江晃晃</option>");
                game.append("<option value='szj'>潜江三只脚</option>");
                break;
            case 'tmhh':
                game.append("<option value='lh'>天门赖晃</option>");
                game.append("<option value='yh'>天门硬晃</option>");
                game.append("<option value='yhszj'>天门硬晃三只脚</option>");
                break;
            case 'hchh':
                game.append("<option value='lh'>汉川赖晃</option>");
                game.append("<option value='yh'>汉川硬晃</option>");
                break;
            case 'sshh':
                game.append("<option value='hh'>石首晃晃</option>");
                break;
            case 'hhhh':
                game.append("<option value='yh'>洪湖硬晃</option>");
                game.append("<option value='yhsrlm'>洪湖硬晃三人俩门</option>");
                game.append("<option value='lh'>洪湖赖晃</option>");
                game.append("<option value='lhsrlm'>洪湖赖晃三人俩门</option>");
                break;
            case 'tlmj':
                game.append("<option value='mj'>铜陵麻将</option>");
                game.append("<option value='hz'>红中麻将</option>");
                break;
            case 'tcmj':
                game.append("<option value='yl'>通城有赖</option>");
                game.append("<option value='wl'>通城无赖</option>");
                break;
            case 'lamj':
                game.append("<option value='mj'>六安麻将</option>");
                break;
            case 'gcmj':
                game.append("<option value='mj'>高淳麻将</option>");
                break;
            case 'jxmj':
                game.append("<option value='mj'>泾县麻将</option>");
                game.append("<option value='hz'>红中麻将</option>");
                break;
            case 'lxmj':
                game.append("<option value='mj'>郎溪麻将</option>");
                game.append("<option value='hz'>红中麻将</option>");
                break;
            case 'hqmj':
                game.append("<option value='mj'>霍邱麻将</option>");
                break;
            case 'gdmj':
                game.append("<option value='mj'>广德麻将</option>");
                game.append("<option value='hz'>红中麻将</option>");
                game.append("<option value='srlm'>广德三人俩门</option>");
                break;
            case 'ngmj':
                game.append("<option value='mj'>宁国麻将</option>");
                break;
            case 'ljmj':
                game.append("<option value='mj'>庐江麻将</option>");
                break;
            case 'jsmj':
                game.append("<option value='mj'>界首麻将</option>");
                game.append("<option value='srlm'>界首三人俩门</option>");
                break;
            case 'hsmj':
                game.append("<option value='mj'>霍山麻将</option>");
                break;
            case 'xnmj':
                game.append("<option value='mj'>休宁麻将</option>");
                game.append("<option value='srlm'>休宁三人俩门</option>");
                break;
            case 'qphy':
                game.append("<option value='jz'>金寨麻将</option>");
                game.append("<option value='sx'>寿县麻将</option>");
                game.append("<option value='sxsrlm'>寿县三人俩门</option>");
                game.append("<option value='lx'>溧水麻将</option>");
                game.append("<option value='wd'>文登麻将</option>");
                game.append("<option value='wdsrlm'>文登三人俩门</option>");
                game.append("<option value='ly'>莱阳麻将</option>");
                game.append("<option value='hs'>合山麻将</option>");
                game.append("<option value='sc'>上蔡麻将</option>");
                game.append("<option value='js'>京山麻将</option>");
                break;
        }
        var gtype = $('#gtype').find("option:selected").val();
        judgeThreeRoom(gameid, gtype);
    });

    // 玩法更改，房间人数变更
    $('#gtype').change(function () {
        var gameid = $('#gameid').find("option:selected").val();   // 获取选中的游戏
        var gtype = $(this).find("option:selected").val();   // 获取的类型
        judgeThreeRoom(gameid, gtype);
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
                pnum: $('#playerNum').val(),
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
                    cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    cols: [[
                        { field: 'id', align: 'center', title: '序号', sort: true },
                        { field: 'gameid', align: 'center', title: '游戏名称', sort: true },
                        { field: 'date', align: 'center', title: '统计日', sort: true },
                        { field: 'changci', align: 'center', title: '总局数', sort: true },
                        { field: 'adduser', align: 'center', title: '工会总局数' },
                        { field: 'dau', align: 'center', title: '开5局次数' },
                        { field: 'ciri', align: 'center', title: '5局局数' },
                        { field: 'sanri', align: 'center', title: '5局完局率' },
                        { field: 'qiri', align: 'center', title: '开10局次数' },
                        { field: 'fangka', align: 'center', title: '10局局数' },
                        { field: 'zonggong', align: 'center', title: '10局完局率' },
                        { field: 'renjun', align: 'center', title: '开20局次数' },
                        { field: 'renjunshichang', align: 'center', title: '20局局数' },
                        { field: 'xinzengrenjunjushu', align: 'center', title: '20局完局率' }
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

    generateTable(getNowFormatDate(-30), getNowFormatDate(-1));    // 打开页面生成默认日期数据表格
});
