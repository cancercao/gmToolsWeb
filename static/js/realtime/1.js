(function ($) {

    var myChart1, myChart2, myChart3;


    this.init = function () {
        initEvent();
        charDateHandler();
        interVal = setInterval(charDateHandler, 5 * 60 * 1000);
    }

    function initEvent() {
        initDropDown("/DataCenter/SysData.aspx?method=GetAllGameInfo");
        $('#pd-bdate').on({
            "focus": WDateHanler,
            "click": WDateHanler
        });


        $('#pd-edate').on({
            "focus": WDateHanler,
            "click": WDateHanler
        });
        $('#pd-bdate').val(getNowFormatDate(-1));
        $('#btn_search').on('click', charDateHandler);
        $('.mypopover').popover({ trigger: "hover" });
        $('body').on('keydown', function (e) {
            e = e || window.event;
            if ((e.keyCode || e.witch) == 13) {
                document.getElementById('btn_search').focus();
                document.getElementById('btn_search').click();
            }
        })

    }

    function initDropDown(url) {
        $("#ag-select").bindSelect({
            id: 'GameId',
            text: 'GameName',
            url: url,
        });
    }

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

    function groupSeries1(name, data) {
        return {
            name: name,
            type: 'line',
            stack: name,
            data: data,
            markPoint: {
                data: [
                    {
                        type: 'max',
                        name: '最大值',
                    },
                    {
                        type: 'min',
                        name: '最小值',
                    }
                ]
            },
            markLine: {
                data: [
                        {
                            type: 'average'
                            , name: '平均值'
                        }
                ]
            }
        };
    }

    function groupSeries2(a_data1, a_data2, a_data3, date1, date2) {
        var series = [], legend = [], rt = {};
        if (a_data1.length > 0) {
            series.push(groupSeries1('今日', a_data1))
            legend.push('今日');
        }

        if (a_data2.length > 0) {
            var x = date1.split('-');
            x = x[1] + '-' + x[2];
            series.push(groupSeries1(x, a_data2))
            legend.push(x);
        }
        if (a_data3.length > 0) {
            var x = date2.split('-');
            x = x[1] + '-' + x[2];
            series.push(groupSeries1(x, a_data3))
            legend.push(x);
        }
        rt.series = series;
        rt.legend = legend;
        return rt;
    }

    function convertCharData(data, date1, date2) {
        var d = data.data, dd = [], today = getNowFormatDate(0), a_data1 = [], a_data2 = [], a_data3 = [], b_data1 = [], b_data2 = [], b_data3 = [], c_data1 = [], c_data2 = [], c_data3 = [];
        for (var i = 0, j = d.length; i < j; i++) {
            var a = d[i];
            if (date1 && a.TheDate == date1) {
                a_data2.push(a.Amount1)
                b_data2.push(a.Amount2)
                c_data2.push(a.Amount3)
            }
            else if (date2 && a.TheDate == date2) {
                a_data3.push(a.Amount1)
                b_data3.push(a.Amount2)
                c_data3.push(a.Amount3)
            }
            else if (a.TheDate == today) {
                a_data1.push(a.Amount1);
                b_data1.push(a.Amount2);
                c_data1.push(a.Amount3);
                dd.push(a.Times)
            }
        }
        var ret = {};
        ret.a = groupSeries2(a_data1, a_data2, a_data3, date1, date2);
        ret.b = groupSeries2(b_data1, b_data2, b_data3, date1, date2);
        ret.c = groupSeries2(c_data1, c_data2, c_data3, date1, date2);
        ret.xdata = dd;
        return ret;
    }

    function groupOption(title, data, xdata) {
        return {
            title: {
                text: title
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
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

    function charDateHandler() {
        var data1 = [], data2 = [], data;
        var date1 = $('#pd-bdate').val();
        var date2 = $('#pd-edate').val();
        if (date1 && date1 == date2) {
            $.modalAlert('日期一与日期二相同，请重新输入', 'error')
            return;
        }
        myChart1 && myChart1.clear();
        myChart2 && myChart2.clear();
        myChart3 && myChart3.clear();
        myChart1 && myChart1.getOption();
        myChart2 && myChart2.getOption();
        myChart3 && myChart3.getOption();
        myChart1 = echarts.init(document.getElementById('chart1'), 'westeros');
        myChart2 = echarts.init(document.getElementById('chart2'), 'westeros');
        myChart3 = echarts.init(document.getElementById('chart3'), 'westeros');
        myChart1.showLoading();
        myChart2.showLoading();
        myChart3.showLoading();

        $.ajax({
            url: '/DataCenter/StatisticalData.aspx?method=GetEvery5MinOnlines',
            type: 'post',
            data: {
                gid: $('#ag-select').val(),
                date1: date1,
                date2: date2
            },
            success: function (data) {
                var d = JSON.parse(data);
                data = convertCharData(d, date1, date2);
                option1 = groupOption('大厅在线', data.a, data.xdata);
                option2 = groupOption('好友场在线', data.b, data.xdata);
                option3 = groupOption('金币场在线', data.c, data.xdata);
                myChart1.setOption(option1);
                myChart2.setOption(option2);
                myChart3.setOption(option3);
                myChart1.hideLoading();
                myChart2.hideLoading();
                myChart3.hideLoading();
            },
            error: function () {
                $.modalAlert('获取图表数据时出错了，请联系管理员', 'error');
                myChart1.hideLoading();
                myChart2.hideLoading();
                myChart3.hideLoading();
            }
        })
    }

    function WDateHanler() {
        WdatePicker({
            dateFmt: 'yyyy-MM-dd',
            minDate: '2010-01-01',
            maxDate: getNowFormatDate(-1),
        })
    }

    this.init();

})(jQuery, (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    echarts.registerTheme('westeros', {
        "color": [
             "#d87c7c",
            "#59c4e6",
            "#edafda",
            "#93b7e3",
            "#a5e7f0",
            "#cbb0e3",
            "#516b91",
        ],
        "backgroundColor": "rgba(0,0,0,0)",
        "textStyle": {},
        "title": {
            "textStyle": {
                "color": "#516b91"
            },
            "subtextStyle": {
                "color": "#93b7e3"
            }
        },
        "line": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "2"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "2"
                }
            },
            "symbolSize": "6",
            "symbol": "emptyCircle",
            "smooth": true
        },
        "radar": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "2"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "2"
                }
            },
            "symbolSize": "6",
            "symbol": "emptyCircle",
            "smooth": true
        },
        "bar": {
            "itemStyle": {
                "normal": {
                    "barBorderWidth": 0,
                    "barBorderColor": "#ccc"
                },
                "emphasis": {
                    "barBorderWidth": 0,
                    "barBorderColor": "#ccc"
                }
            }
        },
        "pie": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "scatter": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "boxplot": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "parallel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "sankey": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "funnel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "gauge": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "candlestick": {
            "itemStyle": {
                "normal": {
                    "color": "#edafda",
                    "color0": "transparent",
                    "borderColor": "#d680bc",
                    "borderColor0": "#8fd3e8",
                    "borderWidth": "2"
                }
            }
        },
        "graph": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": 1,
                    "color": "#aaaaaa"
                }
            },
            "symbolSize": "6",
            "symbol": "emptyCircle",
            "smooth": true,
            "color": [
                "#516b91",
                "#59c4e6",
                "#edafda",
                "#93b7e3",
                "#a5e7f0",
                "#cbb0e3"
            ],
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#eeeeee"
                    }
                }
            }
        },
        "map": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#f3f3f3",
                    "borderColor": "#516b91",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "rgba(165,231,240,1)",
                    "borderColor": "#516b91",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#000000"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(81,107,145)"
                    }
                }
            }
        },
        "geo": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#f3f3f3",
                    "borderColor": "#516b91",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "rgba(165,231,240,1)",
                    "borderColor": "#516b91",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#000000"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(81,107,145)"
                    }
                }
            }
        },
        "categoryAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#999999"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "valueAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#999999"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#999999"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#999999"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "toolbox": {
            "iconStyle": {
                "normal": {
                    "borderColor": "#999999"
                },
                "emphasis": {
                    "borderColor": "#666666"
                }
            }
        },
        "legend": {
            "textStyle": {
                "color": "#999999"
            }
        },
        "tooltip": {
            "axisPointer": {
                "lineStyle": {
                    "color": "#cccccc",
                    "width": 1
                },
                "crossStyle": {
                    "color": "#cccccc",
                    "width": 1
                }
            }
        },
        "timeline": {
            "lineStyle": {
                "color": "#8fd3e8",
                "width": 1
            },
            "itemStyle": {
                "normal": {
                    "color": "#8fd3e8",
                    "borderWidth": 1
                },
                "emphasis": {
                    "color": "#8fd3e8"
                }
            },
            "controlStyle": {
                "normal": {
                    "color": "#8fd3e8",
                    "borderColor": "#8fd3e8",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "color": "#8fd3e8",
                    "borderColor": "#8fd3e8",
                    "borderWidth": 0.5
                }
            },
            "checkpointStyle": {
                "color": "#8fd3e8",
                "borderColor": "rgba(138,124,168,0.37)"
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#8fd3e8"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#8fd3e8"
                    }
                }
            }
        },
        "visualMap": {
            "color": [
                "#516b91",
                "#59c4e6",
                "#a5e7f0"
            ]
        },
        "dataZoom": {
            "backgroundColor": "rgba(0,0,0,0)",
            "dataBackgroundColor": "rgba(255,255,255,0.3)",
            "fillerColor": "rgba(167,183,204,0.4)",
            "handleColor": "#a7b7cc",
            "handleSize": "100%",
            "textStyle": {
                "color": "#333333"
            }
        },
        "markPoint": {
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#eeeeee"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#eeeeee"
                    }
                }
            }
        }
    });
})))