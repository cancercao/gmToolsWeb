var today = getNowFormatDate(0);
var yesterday = getNowFormatDate(-1);
var mallAmountChart = echarts.init(document.getElementById("mallAmount"));
var mallCountChart = echarts.init(document.getElementById("mallCount"));
var publicAmountChart = echarts.init(document.getElementById("publicAmount"));
var publicCountChart = echarts.init(document.getElementById("publicCount"));

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

//
function groupSeries1(name, data, color) {
    return {
        name: name,
        type: 'line',
        stack: name,
        data: data,
        itemStyle: {
            normal: {
                color: color,
                lineStyle: {
                    color: color
                }
            }
        },
        markPoint: {
            data: [
                {
                    type: 'max',
                    name: '最大值'
                },
                {
                    type: 'min',
                    name: '最小值'
                }
            ]
        },
        markLine: {
            data: [
                    {
                        type: 'average',
                        name: '平均值'
                    }
            ]
        }
    };
}

//
function groupSeries2(a_data1, a_data2, a_data3, date1, date2) {
    var series = [],
        legend = [],
        rt = {};
    if (a_data1.length > 0) {
        series.push(groupSeries1('今日', a_data1, '#59c4e6'))
        legend.push('今日');
    }
    if (a_data2.length > 0) {
        var x = date1.split('-');
        x = x[1] + '-' + x[2];
        series.push(groupSeries1(x, a_data2, '#d87c7c'))
        legend.push(x);
    }
    if (a_data3.length > 0) {
        var x = date2.split('-');
        x = x[1] + '-' + x[2];
        series.push(groupSeries1(x, a_data3, '#edafda'))
        legend.push(x);
    }
    rt.series = series;
    rt.legend = legend;
    return rt;
}

// 获取需要查询日期的数据
function convertCharData(data, date1, date2) {
    var d = data, 
        dd = [],
        a_data1 = [],
        a_data2 = [],
        a_data3 = [],
        b_data1 = [],
        b_data2 = [],
        b_data3 = [],
        c_data1 = [],
        c_data2 = [],
        c_data3 = [];
    for (var i = 0, j = d.length; i < j; i++) {
        var a = d[i];
        if (date1 && a.TheDate == date1) {
            a_data2.push(a.Amount1);
            b_data2.push(a.Amount2);
            c_data2.push(a.Amount3);
            d_data2.push(a.Amount4);
        }
        else if (date2 && a.TheDate == date2) {
            a_data3.push(a.Amount1);
            b_data3.push(a.Amount2);
            c_data3.push(a.Amount3);
            d_data3.push(a.Amount4);
        }
        else if (a.TheDate == today) {
            a_data1.push(a.Amount1);
            b_data1.push(a.Amount2);
            c_data1.push(a.Amount3);
            d_data1.push(a.Amount4);
            dd.push(a.Times)
        }
    }
    var ret = {};
    ret.a = groupSeries2(a_data1, a_data2, a_data3, date1, date2);
    ret.b = groupSeries2(b_data1, b_data2, b_data3, date1, date2);
    ret.c = groupSeries2(c_data1, c_data2, c_data3, date1, date2);
    ret.d = groupSeries2(d_data1, d_data2, d_data3, date1, date2);
    ret.xdata = dd;
    return ret;
}

function groupOption(title, data, xdata) {
    return {
        title: {
            text: title,
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
            data: xdata,
            axisLabel: {
                interval: 23
            }
        },
        yAxis: {
            type: 'value'
        },
        series: data.series
    }
}

function charDateHandler(date1, date2) {
    mallAmountChart.showLoading();
    mallCountChart.showLoading();
    publicAmountChart.showLoading();
    publicCountChart.showLoading();
    mallAmountChart && mallAmountChart.clear();
    mallCountChart && mallCountChart.clear();
    publicAmountChart && publicAmountChart.clear();
    publicCountChart && publicCountChart.clear();
    mallAmountChart && mallAmountChart.getOption();
    mallCountChart && mallCountChart.getOption();
    publicAmountChart && publicAmountChart.getOption();
    publicCountChart && publicCountChart.getOption();

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
            option1 = groupOption('商城充值金额', data.a, data.xdata);
            option2 = groupOption('商城充值人数', data.b, data.xdata);
            option3 = groupOption('公众号充值金额', data.c, data.xdata);
            option4 = groupOption('公众号充值人数', data.d, data.xdata);
            mallAmountChart.setOption(option1);
            mallCountChart.setOption(option2);
            publicAmountChart.setOption(option3);
            publicCountChart.setOption(option4);
        },
        error: function () {
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.alert('获取图表数据时出错了，请联系管理员', { icon: 2, title: '系统信息', skin: 'layui-layer-molv', offset: '200px' });
            });
        }
    });
    mallAmountChart.hideLoading();
    mallCountChart.hideLoading();
    publicAmountChart.hideLoading();
    publicCountChart.hideLoading();
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
    } else {
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.alert('请先选择需要查询的日期', { icon: 7, title: '系统信息', skin: 'layui-layer-molv', offset: '200px' });
        })
    }
});

// 刷新操作
$('#refresh').click(function () {
    charDateHandler(yesterday, '');
});

charDateHandler(yesterday, '');