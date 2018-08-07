var today = getNowFormatDate(0);
var myChart = echarts.init(document.getElementById("container"));;

// 日期选择器
layui.use('laydate', function () {
    var laydate = layui.laydate;
    laydate.render({
        elem: '#date',
        range: true
    });
})

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

// 获取需要查询日期的数据
function convertCharData(data, date1, date2) {
    var d = data.data,
        dd = [],
        data1 = [],
        data2 = [],
        data3 = [];

    for (var i = 0, j = d.length; i < j; i++) {
        var a = d[i];
        if (date1 && a.TheDate == date1) {
            data2.push(a.Amount)
        }
        else if (date2 && a.TheDate == date2) {
            data3.push(a.Amount)
        }
        else if (a.TheDate == today) {
            data1.push(a.Amount);
            dd.push(a.Times)
        }
    }

    var series = [], legend = [], ret = {};

    if (data1.length > 0) {
        series.push({
            name: '今日',
            type: 'line',
            stack: '今日',
            data: data1,


        });
        legend.push('今日');
    }

    if (data2.length > 0) {
        var x = date1.split('-');
        x = x[1] + '-' + x[2];
        series.push({
            name: x,
            type: 'line',
            stack: x,
            data: data2,
        });
        legend.push(x);
    }

    if (data3.length > 0) {
        var x = date2.split('-');
        x = x[1] + '-' + x[2];
        series.push({
            name: x,
            type: 'line',
            stack: x,
            data: data3,
        });
        legend.push(x);
    }

    ret.legend = legend;
    ret.series = series;
    ret.xdata = dd;
    return ret;
}

function charDateHandler() {
    var str = $('#date').val();
    var reg = /(\d{1,4})-(\d{1,2})-(\d{1,2})/g; // 正则匹配出 开始/结束 日期
    var date_arr = str.match(reg);
    if (date_arr[0] == date_arr[1]) {
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.alert('日期一与日期二相同，请重新输入', { icon: 7, title: '系统信息', skin: 'layui-layer-molv', offset: '200px' });
        });
        return;
    } else {
        myChart.showLoading();
        myChart && myChart.clear();
        myChart && myChart.getOption();
        // myChart = echarts.init(document.getElementById("container"));
        $.ajax({
            type: 'get',
            url: '',
            dataType: 'json',
            data: {
                gid: $('#gameid').val(),
                date1: date_arr[0],
                date2: date_arr[1]
            },
            success: function (data) {
                var d = JSON.parse(data);
                data = convertCharData(d, date_arr[0], date_arr[1], 'light');
                myChart.setOption({
                    title: {
                        text: '注册人数'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line'
                        }
                    },
                    legend: {
                        data: data.legend
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: { readOnly: false },
                            magicType: { type: ['line', 'bar'] },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: data.xdata,
                        axisLabel: {
                            interval: 23
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: data.series
                });
            },
            // error: function () {
            //     layui.use('layer', function () {
            //         var layer = layui.layer;
            //         layer.alert('获取图表数据时出错了，请联系管理员', { icon: 2, title: '系统信息', skin: 'layui-layer-molv', offset: '200px' });
            //     });
            // }
        });
        myChart.hideLoading();
    }
}

// 日期查询
$('#searchDate').click(charDateHandler);

// 刷新操作
$('#refresh').click(charDateHandler);

// 打开页面后默认初始化操作
$('#date').val(getNowFormatDate(-1) + ' - ' + today);       // 初始化日期选择器中当前日期为今日和昨日
charDateHandler();








// function canvChart(dateArr) {
// $.ajax({
//     type: 'get',
//     url: '',
//     dataType: 'json',
//     data: {

//     },
//     beforeSend: function () {
//         index = layer.load(0, {shade: false});
//     },
//     success: function (res) {
// if (res.status == "1") {
//     initChart()
// }
//     },
//     complete: function () {
//         layer.close(index);
//     },
//     error: function () {

//     }
// });
// }

// function getNowFormatDate() {
//     // 获取线性图标曲线数据名
//     var lines_tips = (function () {
//         var today = new Date();
//         var month = today.getMonth() + 1;
//         var day = today.getDate() - 1;
//         if (month < 10) {
//             month_str = '0' + month;
//         } else {
//             month_str = month.toString();
//         }
//         if (day < 10) {
//             day_str = '0' + day;
//         } else {
//             day_str = day.toString();
//         }
//         return ['今日', month_str + '-' + day_str];
//     })
// }

// // 获取数据生成图标
// function initChart() {
//         var dom = document.getElementById("container");
//         var myChart = echarts.init(dom);
//         var app = {};
//         var option = null;

//         option = {
//             title: {
//                 text: '注册人数',
//                 left: '7.5%',
//                 textStyle: {
//                     color: '#59c4e6'
//                 }
//             },
//             tooltip: {
//                 trigger: 'axis'
//             },
//             legend: {
//                 data: lines_tips
//             },
//             toolbox: {
//                 show: true,
//                 right: '7.5%',
//                 feature: {
//                     dataZoom: {
//                         yAxisIndex: 'none'
//                     },
//                     dataView: { readOnly: false },
//                     magicType: { type: ['line', 'bar'] },
//                     restore: {},
//                     saveAsImage: {}
//                 },
//                 iconStyle: {
//                     borderColor: '#1abc9c'
//                 }
//             },
//             xAxis: {
//                 type: 'category',
//                 boundaryGap: false,
//                 // data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '23:59']
//                 data: function () {
//                     var list = [];
//                     var num = 0;
//                     var h = 0;
//                     var m = 0;
//                     for (var i = 0; i < 288; i++) {
//                         num = i % 12;
//                         if (num == 11) {
//                             if (h < 23) {
//                                 h++;
//                             }
//                         }
//                         num = num * 5;
//                         list.push(h + ":" + num);
//                     }
//                     return list;
//                 }(),
// axisLabel: {
//     interval: 24
// }
//             },
//             yAxis: {
//                 type: 'value'
//             },
//             series: [
//                 {
//                     name: lines_tips[0],
//                     type: 'line',
//                     itemStyle: {
//                         normal: {
//                             color: '#59c4e6',
//                             lineStyle: {
//                                 color: '#59c4e6'
//                             }
//                         }
//                     },
//                     data: [5, 20, 36, 10, 10, 20, 90, 64, 49, 81, 81, 57, 13, 18, 67, 98, 91, 54, 86, 73, 28, 19, 67, 42, 35, 87, 73, 51]
//                 },
//                 {
//                     name: lines_tips[1],
//                     type: 'line',
//                     itemStyle: {
//                         normal: {
//                             color: '#d87c7c',
//                             lineStyle: {
//                                 color: '#d87c7c'
//                             }
//                         }
//                     },
//                     data: [23, 25, 36, 38, 10, 20]
//                 }
//             ]
//         };

//         if (option && typeof option === "object") {
//             myChart.setOption(option, true);
//         }
//     }
