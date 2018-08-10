var today = getNowFormatDate(0);
var yesterday = getNowFormatDate(-1);
var myChart = echarts.init(document.getElementById("container"));;

// 日期选择器
layui.use('laydate', function () {
    var laydate = layui.laydate;
    laydate.render({
        elem: '#date',
        range: true,
        max: yesterday
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
    var d = data,
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
            itemStyle: {
                normal: {
                    color: '#59c4e6',
                    lineStyle: {
                        color: '#59c4e6'
                    }
                }
            }
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
            itemStyle: {
                normal: {
                    color: '#d87c7c',
                    lineStyle: {
                        color: '#d87c7c'
                    }
                }
            }
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
            itemStyle: {
                normal: {
                    color: '#edafda',
                    lineStyle: {
                        color: '#edafda'
                    }
                }
            }
        });
        legend.push(x);
    }

    ret.legend = legend;
    ret.series = series;
    ret.xdata = dd;
    return ret;
}

function charDateHandler(date1, date2) {
    myChart.showLoading();
    myChart && myChart.clear();
    myChart && myChart.getOption();
    // myChart = echarts.init(document.getElementById("container"));
    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/data',
        data: {
            gid: $('#gameid').val(),
            date1: date1,
            date2: date2
        },
        success: function (data) {
            // var d = JSON.parse(data);
            data = convertCharData(data, date1, date2);
            myChart.setOption({
                title: {
                    text: '注册人数',
                    textStyle: {
                        color: '#59c4e6'
                    }
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
                    },
                    iconStyle: {
                        borderColor: '#1abc9c'
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
        error: function () {
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.alert('获取图表数据时出错了，请联系管理员', { icon: 2, title: '系统信息', skin: 'layui-layer-molv', offset: '200px' });
            });
        }
    });
    myChart.hideLoading();
}

// 日期查询
$('#searchDate').click(function () {
    var str = $('#date').val();
    var reg = /(\d{1,4})-(\d{1,2})-(\d{1,2})/g; // 正则匹配出 开始/结束 日期
    var date_arr = str.match(reg);
    if (str) {
        if (date_arr[0] == date_arr[1]) {
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.alert('日期一与日期二相同，请重新输入', { icon: 7, title: '系统信息', skin: 'layui-layer-molv', offset: '200px' });
            });
            return;
        } else {
            charDateHandler(date_arr[0], date_arr[1]);
        }
    }else {
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.alert('请先选择需要查询的日期', { icon: 7, title: '系统信息', skin: 'layui-layer-molv', offset: '200px' });
        })
    }
});

// 刷新操作
$('#refresh').click({ date1: yesterday }, charDateHandler);

charDateHandler(yesterday, '');