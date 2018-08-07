layui.use(['element', 'laydate', 'table', 'layer'], function () {
    var $ = layui.jquery;
    var element = layui.element;
    var laydate = layui.laydate;
    var table = layui.table;
    var layer = layui.layer;
    var table_data;
    var index;
    var today = getNowFormatDate(0);

    // 日期选择器
    laydate.render({
        elem: '#date',
        range: true
    });

    // 导出Excel
    $('#ToExcel').click(function () {

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

    var data = [
        { "id": 1, "name": "仙桃晃晃", "date": "2018/8/2", "newnum": 100, "newlogin": 100, "wxuser": 50, "usernum": 234, "userlogin": 235, "loginno": 536, "usercount": 23515, "newagent": 234, "agentday": 2357, "ciri": 2345, "sanri": 352, "qiri": 907089, "rizong": 3424, "shangcheng": 97907, "fangka": 9879, "ios": 2602, "gongzhong": 9765, "arpu": 452, "arrpu": 23975, "fufei": 98723, "fangkafufei": 235, "jinbifufei": 1687, "gongzhongfufei": 6134, "hongbaoyu": 5731, "hongbao": 6813, "fangkaxiaohao": 654, "jinbishuishou": 6413, "fangkarihuo": 464, "jinbirihuo": 65413, "renjun": 3541, "zuigao": 631, "pingjun": 651, "xinzengzhanghao": 654, "xinzengfangka": 6541, "xinzengjinbi": 6541, "xinzengrenjun": 1674, "xinzengweiyouxi": 6167, "xinzengjinbifufei": 64164, "xinzengfangkafubei": 6561, "xinzengjinbishouru": 6541, "xinzengfangkashouru": 671, "xinzengfufeishentou": 681, "xinzengarpu": 614, "xinzengarrpu": 6517 },
        { "id": 1, "name": "仙桃晃晃", "date": "2018/8/2", "newnum": 100, "newlogin": 100, "wxuser": 50, "usernum": 234, "userlogin": 235, "loginno": 536, "usercount": 23515, "newagent": 234, "agentday": 2357, "ciri": 2345, "sanri": 352, "qiri": 907089, "rizong": 3424, "shangcheng": 97907, "fangka": 9879, "ios": 2602, "gongzhong": 9765, "arpu": 452, "arrpu": 23975, "fufei": 98723, "fangkafufei": 235, "jinbifufei": 1687, "gongzhongfufei": 6134, "hongbaoyu": 5731, "hongbao": 6813, "fangkaxiaohao": 654, "jinbishuishou": 6413, "fangkarihuo": 464, "jinbirihuo": 65413, "renjun": 3541, "zuigao": 631, "pingjun": 651, "xinzengzhanghao": 654, "xinzengfangka": 6541, "xinzengjinbi": 6541, "xinzengrenjun": 1674, "xinzengweiyouxi": 6167, "xinzengjinbifufei": 64164, "xinzengfangkafubei": 6561, "xinzengjinbishouru": 6541, "xinzengfangkashouru": 671, "xinzengfufeishentou": 681, "xinzengarpu": 614, "xinzengarrpu": 6517 },
        { "id": 1, "name": "仙桃晃晃", "date": "2018/8/2", "newnum": 100, "newlogin": 100, "wxuser": 50, "usernum": 234, "userlogin": 235, "loginno": 536, "usercount": 23515, "newagent": 234, "agentday": 2357, "ciri": 2345, "sanri": 352, "qiri": 907089, "rizong": 3424, "shangcheng": 97907, "fangka": 9879, "ios": 2602, "gongzhong": 9765, "arpu": 452, "arrpu": 23975, "fufei": 98723, "fangkafufei": 235, "jinbifufei": 1687, "gongzhongfufei": 6134, "hongbaoyu": 5731, "hongbao": 6813, "fangkaxiaohao": 654, "jinbishuishou": 6413, "fangkarihuo": 464, "jinbirihuo": 65413, "renjun": 3541, "zuigao": 631, "pingjun": 651, "xinzengzhanghao": 654, "xinzengfangka": 6541, "xinzengjinbi": 6541, "xinzengrenjun": 1674, "xinzengweiyouxi": 6167, "xinzengjinbifufei": 64164, "xinzengfangkafubei": 6561, "xinzengjinbishouru": 6541, "xinzengfangkashouru": 671, "xinzengfufeishentou": 681, "xinzengarpu": 614, "xinzengarrpu": 6517 },
        { "id": 1, "name": "仙桃晃晃", "date": "2018/8/2", "newnum": 100, "newlogin": 100, "wxuser": 50, "usernum": 234, "userlogin": 235, "loginno": 536, "usercount": 23515, "newagent": 234, "agentday": 2357, "ciri": 2345, "sanri": 352, "qiri": 907089, "rizong": 3424, "shangcheng": 97907, "fangka": 9879, "ios": 2602, "gongzhong": 9765, "arpu": 452, "arrpu": 23975, "fufei": 98723, "fangkafufei": 235, "jinbifufei": 1687, "gongzhongfufei": 6134, "hongbaoyu": 5731, "hongbao": 6813, "fangkaxiaohao": 654, "jinbishuishou": 6413, "fangkarihuo": 464, "jinbirihuo": 65413, "renjun": 3541, "zuigao": 631, "pingjun": 651, "xinzengzhanghao": 654, "xinzengfangka": 6541, "xinzengjinbi": 6541, "xinzengrenjun": 1674, "xinzengweiyouxi": 6167, "xinzengjinbifufei": 64164, "xinzengfangkafubei": 6561, "xinzengjinbishouru": 6541, "xinzengfangkashouru": 671, "xinzengfufeishentou": 681, "xinzengarpu": 614, "xinzengarrpu": 6517 },
        { "id": 1, "name": "仙桃晃晃", "date": "2018/8/2", "newnum": 100, "newlogin": 100, "wxuser": 50, "usernum": 234, "userlogin": 235, "loginno": 536, "usercount": 23515, "newagent": 234, "agentday": 2357, "ciri": 2345, "sanri": 352, "qiri": 907089, "rizong": 3424, "shangcheng": 97907, "fangka": 9879, "ios": 2602, "gongzhong": 9765, "arpu": 452, "arrpu": 23975, "fufei": 98723, "fangkafufei": 235, "jinbifufei": 1687, "gongzhongfufei": 6134, "hongbaoyu": 5731, "hongbao": 6813, "fangkaxiaohao": 654, "jinbishuishou": 6413, "fangkarihuo": 464, "jinbirihuo": 65413, "renjun": 3541, "zuigao": 631, "pingjun": 651, "xinzengzhanghao": 654, "xinzengfangka": 6541, "xinzengjinbi": 6541, "xinzengrenjun": 1674, "xinzengweiyouxi": 6167, "xinzengjinbifufei": 64164, "xinzengfangkafubei": 6561, "xinzengjinbishouru": 6541, "xinzengfangkashouru": 671, "xinzengfufeishentou": 681, "xinzengarpu": 614, "xinzengarrpu": 6517 },
        { "id": 1, "name": "仙桃晃晃", "date": "2018/8/2", "newnum": 100, "newlogin": 100, "wxuser": 50, "usernum": 234, "userlogin": 235, "loginno": 536, "usercount": 23515, "newagent": 234, "agentday": 2357, "ciri": 2345, "sanri": 352, "qiri": 907089, "rizong": 3424, "shangcheng": 97907, "fangka": 9879, "ios": 2602, "gongzhong": 9765, "arpu": 452, "arrpu": 23975, "fufei": 98723, "fangkafufei": 235, "jinbifufei": 1687, "gongzhongfufei": 6134, "hongbaoyu": 5731, "hongbao": 6813, "fangkaxiaohao": 654, "jinbishuishou": 6413, "fangkarihuo": 464, "jinbirihuo": 65413, "renjun": 3541, "zuigao": 631, "pingjun": 651, "xinzengzhanghao": 654, "xinzengfangka": 6541, "xinzengjinbi": 6541, "xinzengrenjun": 1674, "xinzengweiyouxi": 6167, "xinzengjinbifufei": 64164, "xinzengfangkafubei": 6561, "xinzengjinbishouru": 6541, "xinzengfangkashouru": 671, "xinzengfufeishentou": 681, "xinzengarpu": 614, "xinzengarrpu": 6517 },
        { "id": 1, "name": "仙桃晃晃", "date": "2018/8/2", "newnum": 100, "newlogin": 100, "wxuser": 50, "usernum": 234, "userlogin": 235, "loginno": 536, "usercount": 23515, "newagent": 234, "agentday": 2357, "ciri": 2345, "sanri": 352, "qiri": 907089, "rizong": 3424, "shangcheng": 97907, "fangka": 9879, "ios": 2602, "gongzhong": 9765, "arpu": 452, "arrpu": 23975, "fufei": 98723, "fangkafufei": 235, "jinbifufei": 1687, "gongzhongfufei": 6134, "hongbaoyu": 5731, "hongbao": 6813, "fangkaxiaohao": 654, "jinbishuishou": 6413, "fangkarihuo": 464, "jinbirihuo": 65413, "renjun": 3541, "zuigao": 631, "pingjun": 651, "xinzengzhanghao": 654, "xinzengfangka": 6541, "xinzengjinbi": 6541, "xinzengrenjun": 1674, "xinzengweiyouxi": 6167, "xinzengjinbifufei": 64164, "xinzengfangkafubei": 6561, "xinzengjinbishouru": 6541, "xinzengfangkashouru": 671, "xinzengfufeishentou": 681, "xinzengarpu": 614, "xinzengarrpu": 6517 },
        { "id": 1, "name": "仙桃晃晃", "date": "2018/8/2", "newnum": 100, "newlogin": 100, "wxuser": 50, "usernum": 234, "userlogin": 235, "loginno": 536, "usercount": 23515, "newagent": 234, "agentday": 2357, "ciri": 2345, "sanri": 352, "qiri": 907089, "rizong": 3424, "shangcheng": 97907, "fangka": 9879, "ios": 2602, "gongzhong": 9765, "arpu": 452, "arrpu": 23975, "fufei": 98723, "fangkafufei": 235, "jinbifufei": 1687, "gongzhongfufei": 6134, "hongbaoyu": 5731, "hongbao": 6813, "fangkaxiaohao": 654, "jinbishuishou": 6413, "fangkarihuo": 464, "jinbirihuo": 65413, "renjun": 3541, "zuigao": 631, "pingjun": 651, "xinzengzhanghao": 654, "xinzengfangka": 6541, "xinzengjinbi": 6541, "xinzengrenjun": 1674, "xinzengweiyouxi": 6167, "xinzengjinbifufei": 64164, "xinzengfangkafubei": 6561, "xinzengjinbishouru": 6541, "xinzengfangkashouru": 671, "xinzengfufeishentou": 681, "xinzengarpu": 614, "xinzengarrpu": 6517 },
        { "id": 1, "name": "仙桃晃晃", "date": "2018/8/2", "newnum": 100, "newlogin": 100, "wxuser": 50, "usernum": 234, "userlogin": 235, "loginno": 536, "usercount": 23515, "newagent": 234, "agentday": 2357, "ciri": 2345, "sanri": 352, "qiri": 907089, "rizong": 3424, "shangcheng": 97907, "fangka": 9879, "ios": 2602, "gongzhong": 9765, "arpu": 452, "arrpu": 23975, "fufei": 98723, "fangkafufei": 235, "jinbifufei": 1687, "gongzhongfufei": 6134, "hongbaoyu": 5731, "hongbao": 6813, "fangkaxiaohao": 654, "jinbishuishou": 6413, "fangkarihuo": 464, "jinbirihuo": 65413, "renjun": 3541, "zuigao": 631, "pingjun": 651, "xinzengzhanghao": 654, "xinzengfangka": 6541, "xinzengjinbi": 6541, "xinzengrenjun": 1674, "xinzengweiyouxi": 6167, "xinzengjinbifufei": 64164, "xinzengfangkafubei": 6561, "xinzengjinbishouru": 6541, "xinzengfangkashouru": 671, "xinzengfufeishentou": 681, "xinzengarpu": 614, "xinzengarrpu": 6517 },
        { "id": 1, "name": "仙桃晃晃", "date": "2018/8/2", "newnum": 100, "newlogin": 100, "wxuser": 50, "usernum": 234, "userlogin": 235, "loginno": 536, "usercount": 23515, "newagent": 234, "agentday": 2357, "ciri": 2345, "sanri": 352, "qiri": 907089, "rizong": 3424, "shangcheng": 97907, "fangka": 9879, "ios": 2602, "gongzhong": 9765, "arpu": 452, "arrpu": 23975, "fufei": 98723, "fangkafufei": 235, "jinbifufei": 1687, "gongzhongfufei": 6134, "hongbaoyu": 5731, "hongbao": 6813, "fangkaxiaohao": 654, "jinbishuishou": 6413, "fangkarihuo": 464, "jinbirihuo": 65413, "renjun": 3541, "zuigao": 631, "pingjun": 651, "xinzengzhanghao": 654, "xinzengfangka": 6541, "xinzengjinbi": 6541, "xinzengrenjun": 1674, "xinzengweiyouxi": 6167, "xinzengjinbifufei": 64164, "xinzengfangkafubei": 6561, "xinzengjinbishouru": 6541, "xinzengfangkashouru": 671, "xinzengfufeishentou": 681, "xinzengarpu": 614, "xinzengarrpu": 6517 },
        { "id": 1, "name": "仙桃晃晃", "date": "2018/8/2", "newnum": 100, "newlogin": 100, "wxuser": 50, "usernum": 234, "userlogin": 235, "loginno": 536, "usercount": 23515, "newagent": 234, "agentday": 2357, "ciri": 2345, "sanri": 352, "qiri": 907089, "rizong": 3424, "shangcheng": 97907, "fangka": 9879, "ios": 2602, "gongzhong": 9765, "arpu": 452, "arrpu": 23975, "fufei": 98723, "fangkafufei": 235, "jinbifufei": 1687, "gongzhongfufei": 6134, "hongbaoyu": 5731, "hongbao": 6813, "fangkaxiaohao": 654, "jinbishuishou": 6413, "fangkarihuo": 464, "jinbirihuo": 65413, "renjun": 3541, "zuigao": 631, "pingjun": 651, "xinzengzhanghao": 654, "xinzengfangka": 6541, "xinzengjinbi": 6541, "xinzengrenjun": 1674, "xinzengweiyouxi": 6167, "xinzengjinbifufei": 64164, "xinzengfangkafubei": 6561, "xinzengjinbishouru": 6541, "xinzengfangkashouru": 671, "xinzengfufeishentou": 681, "xinzengarpu": 614, "xinzengarrpu": 6517 },
        { "id": 1, "name": "仙桃晃晃", "date": "2018/8/2", "newnum": 100, "newlogin": 100, "wxuser": 50, "usernum": 234, "userlogin": 235, "loginno": 536, "usercount": 23515, "newagent": 234, "agentday": 2357, "ciri": 2345, "sanri": 352, "qiri": 907089, "rizong": 3424, "shangcheng": 97907, "fangka": 9879, "ios": 2602, "gongzhong": 9765, "arpu": 452, "arrpu": 23975, "fufei": 98723, "fangkafufei": 235, "jinbifufei": 1687, "gongzhongfufei": 6134, "hongbaoyu": 5731, "hongbao": 6813, "fangkaxiaohao": 654, "jinbishuishou": 6413, "fangkarihuo": 464, "jinbirihuo": 65413, "renjun": 3541, "zuigao": 631, "pingjun": 651, "xinzengzhanghao": 654, "xinzengfangka": 6541, "xinzengjinbi": 6541, "xinzengrenjun": 1674, "xinzengweiyouxi": 6167, "xinzengjinbifufei": 64164, "xinzengfangkafubei": 6561, "xinzengjinbishouru": 6541, "xinzengfangkashouru": 671, "xinzengfufeishentou": 681, "xinzengarpu": 614, "xinzengarrpu": 6517 },
        { "id": 1, "name": "仙桃晃晃", "date": "2018/8/2", "newnum": 100, "newlogin": 100, "wxuser": 50, "usernum": 234, "userlogin": 235, "loginno": 536, "usercount": 23515, "newagent": 234, "agentday": 2357, "ciri": 2345, "sanri": 352, "qiri": 907089, "rizong": 3424, "shangcheng": 97907, "fangka": 9879, "ios": 2602, "gongzhong": 9765, "arpu": 452, "arrpu": 23975, "fufei": 98723, "fangkafufei": 235, "jinbifufei": 1687, "gongzhongfufei": 6134, "hongbaoyu": 5731, "hongbao": 6813, "fangkaxiaohao": 654, "jinbishuishou": 6413, "fangkarihuo": 464, "jinbirihuo": 65413, "renjun": 3541, "zuigao": 631, "pingjun": 651, "xinzengzhanghao": 654, "xinzengfangka": 6541, "xinzengjinbi": 6541, "xinzengrenjun": 1674, "xinzengweiyouxi": 6167, "xinzengjinbifufei": 64164, "xinzengfangkafubei": 6561, "xinzengjinbishouru": 6541, "xinzengfangkashouru": 671, "xinzengfufeishentou": 681, "xinzengarpu": 614, "xinzengarrpu": 6517 },
        { "id": 1, "name": "仙桃晃晃", "date": "2018/8/2", "newnum": 100, "newlogin": 100, "wxuser": 50, "usernum": 234, "userlogin": 235, "loginno": 536, "usercount": 23515, "newagent": 234, "agentday": 2357, "ciri": 2345, "sanri": 352, "qiri": 907089, "rizong": 3424, "shangcheng": 97907, "fangka": 9879, "ios": 2602, "gongzhong": 9765, "arpu": 452, "arrpu": 23975, "fufei": 98723, "fangkafufei": 235, "jinbifufei": 1687, "gongzhongfufei": 6134, "hongbaoyu": 5731, "hongbao": 6813, "fangkaxiaohao": 654, "jinbishuishou": 6413, "fangkarihuo": 464, "jinbirihuo": 65413, "renjun": 3541, "zuigao": 631, "pingjun": 651, "xinzengzhanghao": 654, "xinzengfangka": 6541, "xinzengjinbi": 6541, "xinzengrenjun": 1674, "xinzengweiyouxi": 6167, "xinzengjinbifufei": 64164, "xinzengfangkafubei": 6561, "xinzengjinbishouru": 6541, "xinzengfangkashouru": 671, "xinzengfufeishentou": 681, "xinzengarpu": 614, "xinzengarrpu": 6517 },
        { "id": 1, "name": "仙桃晃晃", "date": "2018/8/2", "newnum": 100, "newlogin": 100, "wxuser": 50, "usernum": 234, "userlogin": 235, "loginno": 536, "usercount": 23515, "newagent": 234, "agentday": 2357, "ciri": 2345, "sanri": 352, "qiri": 907089, "rizong": 3424, "shangcheng": 97907, "fangka": 9879, "ios": 2602, "gongzhong": 9765, "arpu": 452, "arrpu": 23975, "fufei": 98723, "fangkafufei": 235, "jinbifufei": 1687, "gongzhongfufei": 6134, "hongbaoyu": 5731, "hongbao": 6813, "fangkaxiaohao": 654, "jinbishuishou": 6413, "fangkarihuo": 464, "jinbirihuo": 65413, "renjun": 3541, "zuigao": 631, "pingjun": 651, "xinzengzhanghao": 654, "xinzengfangka": 6541, "xinzengjinbi": 6541, "xinzengrenjun": 1674, "xinzengweiyouxi": 6167, "xinzengjinbifufei": 64164, "xinzengfangkafubei": 6561, "xinzengjinbishouru": 6541, "xinzengfangkashouru": 671, "xinzengfufeishentou": 681, "xinzengarpu": 614, "xinzengarrpu": 6517 },
        { "id": 1, "name": "仙桃晃晃", "date": "2018/8/2", "newnum": 100, "newlogin": 100, "wxuser": 50, "usernum": 234, "userlogin": 235, "loginno": 536, "usercount": 23515, "newagent": 234, "agentday": 2357, "ciri": 2345, "sanri": 352, "qiri": 907089, "rizong": 3424, "shangcheng": 97907, "fangka": 9879, "ios": 2602, "gongzhong": 9765, "arpu": 452, "arrpu": 23975, "fufei": 98723, "fangkafufei": 235, "jinbifufei": 1687, "gongzhongfufei": 6134, "hongbaoyu": 5731, "hongbao": 6813, "fangkaxiaohao": 654, "jinbishuishou": 6413, "fangkarihuo": 464, "jinbirihuo": 65413, "renjun": 3541, "zuigao": 631, "pingjun": 651, "xinzengzhanghao": 654, "xinzengfangka": 6541, "xinzengjinbi": 6541, "xinzengrenjun": 1674, "xinzengweiyouxi": 6167, "xinzengjinbifufei": 64164, "xinzengfangkafubei": 6561, "xinzengjinbishouru": 6541, "xinzengfangkashouru": 671, "xinzengfufeishentou": 681, "xinzengarpu": 614, "xinzengarrpu": 6517 }
    ];

    // 获取数据并生成表格
    function generateTable(date1, date2) {
        if (compareDate(date2, today)) {
            date2 = getNowFormatDate(-1);
        }
        
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


//     layer.alert('获取表格数据时出错了，请联系管理员', { icon: 2, title: '系统信息', skin: 'layui-layer-molv', offset: '200px' });



table.render({
    // url: '',
    // request: {

    // },
    elem: '#table',
    height: 'full-110',
    page: true,
    data: data,
    limit: 18,
    cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
    cols: [
        [
            { field: 'id', rowspan: 2, align: 'center', title: "序号", sort: true },
            { field: 'name', width: 110, rowspan: 2, align: 'center', title: "游戏名称", sort: true },
            { field: 'date', width: 110, rowspan: 2, align: 'center', title: "日期", sort: true },
            { colspan: 3, align: 'center', title: "新用户" },
            { colspan: 4, align: 'center', title: "登陆用户" },
            { colspan: 2, align: 'center', title: "代理" },
            { colspan: 3, align: 'center', title: "游戏留存" },
            { colspan: 11, align: 'center', title: "收入" },
            { colspan: 2, align: 'center', title: "活动数据" },
            { colspan: 2, align: 'center', title: "消耗" },
            { colspan: 5, align: 'center', title: "活跃度" },
            { colspan: 12, align: 'center', title: "新用户数据" }
        ],
        [
            { field: 'newnum', align: 'center', title: '新进总用户' },
            { field: 'newlogin', align: 'center', title: '新进游客登录' },
            { field: 'wxuser', align: 'center', title: '新进微信用户' },
            { field: 'usernum', align: 'center', title: '日登录用户数' },
            { field: 'userlogin', align: 'center', title: '日游戏用户数' },
            { field: 'loginno', align: 'center', title: '登录未游戏用户数' },
            { field: 'usercount', align: 'center', title: '累计游戏用户数' },
            { field: 'newagent', align: 'center', title: '新增代理数' },
            { field: 'agentday', align: 'center', title: '代理日活数' },
            { field: 'ciri', align: 'center', title: '次日留存率' },
            { field: 'sanri', align: 'center', title: '三日留存率' },
            { field: 'qiri', align: 'center', title: '七日留存率' },
            { field: 'rizong', align: 'center', title: '日总收入' },
            { field: 'shangcheng', align: 'center', title: '商城金币收入' },
            { field: 'fangka', align: 'center', title: '商城房卡收入' },
            { field: 'ios', align: 'center', title: 'IOS充值收入' },
            { field: 'gongzhong', align: 'center', title: '公众号房卡收入' },
            { field: 'arpu', align: 'center', title: 'ARPU' },
            { field: 'arrpu', align: 'center', title: 'ARRPU' },
            { field: 'fufei', align: 'center', title: '付费渗透率' },
            { field: 'fangkafufei', align: 'center', title: '商城房卡付费人数' },
            { field: 'jinbifufei', align: 'center', title: '商城金币付费人数' },
            { field: 'gongzhongfufei', align: 'center', title: '公众号付费人数' },
            { field: 'hongbaoyu', align: 'center', title: '红包雨参与人数' },
            { field: 'hongbao', align: 'center', title: '红包产出（元）' },
            { field: 'fangkaxiaohao', align: 'center', title: '房卡消耗' },
            { field: 'jinbishuishou', align: 'center', title: '金币税收' },
            { field: 'fangkarihuo', align: 'center', title: '房卡用户日活' },
            { field: 'jinbirihuo', align: 'center', title: '金币用户日活' },
            { field: 'renjun', align: 'center', title: '房卡和金币场均玩用户数' },
            { field: 'zuigao', align: 'center', title: '最高在线' },
            { field: 'pingjun', align: 'center', title: '平均在线' },
            { field: 'xinzengzhanghao', align: 'center', title: '新增日游戏账号数' },
            { field: 'xinzengfangka', align: 'center', title: '新增房卡用户日活' },
            { field: 'xinzengjinbi', align: 'center', title: '新增金币用户日活' },
            { field: 'xinzengrenjun', align: 'center', title: '新增房卡和金币场均玩用户数' },
            { field: 'xinzengweiyouxi', align: 'center', title: '新增登录未游戏人数' },
            { field: 'xinzengjinbifufei', align: 'center', title: '新增金币付费人数' },
            { field: 'xinzengfangkafubei', align: 'center', title: '新增房卡付费人数' },
            { field: 'xinzengjinbishouru', align: 'center', title: '新增金币收入' },
            { field: 'xinzengfangkashouru', align: 'center', title: '新增房卡收入' },
            { field: 'xinzengfufeishentou', align: 'center', title: '新增付费渗透率' },
            { field: 'xinzengarpu', align: 'center', title: '新增ARPU' },
            { field: 'xinzengarrpu', align: 'center', title: '新增ARPPU' }
        ]],
    // done: function (res) {
    //     console.log(res);
    // }
});