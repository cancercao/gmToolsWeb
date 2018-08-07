(function ($) {
    var myChart2, today = getNowFormatDate(0), interVal;

    this.init = function () {
        initEvent();
        char1();
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
        $('body').on('keydown', function (e) {
            e = e || window.event;
            if ((e.keyCode || e.witch) == 13) {
                document.getElementById('btn_search').focus();
                document.getElementById('btn_search').click();
            }
        })
        $('.mypopover').popover({ trigger: "hover" });

    }

    function initDropDown(url) {
        $("#ag-select").bindSelect({
            id: 'GameId',
            text: 'GameName',
            url: url,
        });
    }

    function initChart(d2) {
        myChart2 = echarts.init(document.getElementById('chart1'), 'macarons');
        var today_data = d2.today;
        series[0].data = today_data;
        myChart2.showLoading();
        myChart2.setOption({
            title: {
                text: '注册人数'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: legend
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
                data: d1,
                axisLabel: {
                    interval: 24
                }
            },
            yAxis: {
                type: 'value'
            },
            series: series
        });
    }

    function char1() {
        charDateHandler();
        interVal = setInterval(charDateHandler, 5 * 60 * 1000);
    }

    function WDateHanler() {
        WdatePicker({
            dateFmt: 'yyyy-MM-dd',
            minDate: '2010-01-01',
            maxDate: getNowFormatDate(-1),

        })
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

    function convertCharData(data, date1, date2) {
        var d = data.data, dd = [], data1 = [], data2 = [], data3 = [];
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
        var data1 = [], data2 = [], data;
        var date1 = $('#pd-bdate').val();
        var date2 = $('#pd-edate').val();
        if (date1 && date1 == date2) {
            $.modalAlert('日期一与日期二相同，请重新输入', 'error')
            return;
        }
        myChart2 && myChart2.clear();
        myChart2 && myChart2.getOption();
        myChart2 = echarts.init(document.getElementById('chart1'), 'macarons');
        myChart2.showLoading();
        $.ajax({
            url: '/DataCenter/StatisticalData.aspx?method=GetEvery5MinRegisters',
            type: 'post',
            data: {
                gid: $('#ag-select').val(),
                date1: date1,
                date2: date2
            },
            success: function (data) {
                var d = JSON.parse(data);
                data = convertCharData(d, date1, date2);
                myChart2.setOption({

                    title: {
                        text: '注册人数'
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
                myChart2.hideLoading();
            },
            error: function () {
                $.modalAlert('获取图表数据时出错了，请联系管理员', 'error');
                myChart2.hideLoading();
            }
        })
    }

    Array.prototype.indexOf = function (val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };

    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

    this.init();

})(jQuery,
    (function (root, factory) {
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
        echarts.registerTheme('macarons', {
            "color": [
                "#d87c7c",
                "#59c4e6",
                "#edafda",
                "#d87a80",
                "#d87a80",
                "#8d98b3",
                "#e5cf0d",
                "#97b552",
                "#95706d",
                "#dc69aa",
                "#07a2a4",
                "#9a7fd1",
                "#588dd5",
                "#f5994e",
                "#c05050",
                "#59678c",
                "#c9ab00",
                "#7eb00a",
                "#6f5553",
                "#c14089"
            ],
            "backgroundColor": "rgba(0,0,0,0)",
            "textStyle": {},
            "title": {
                "textStyle": {
                    "color": "#516b91"
                },
                "subtextStyle": {
                    "color": "#aaaaaa"
                }
            },
            "line": {
                "itemStyle": {
                    "normal": {
                        "borderWidth": 1
                    }
                },
                "lineStyle": {
                    "normal": {
                        "width": 2
                    }
                },
                "symbolSize": 3,
                "symbol": "emptyCircle",
                "smooth": true
            },
            "radar": {
                "itemStyle": {
                    "normal": {
                        "borderWidth": 1
                    }
                },
                "lineStyle": {
                    "normal": {
                        "width": 2
                    }
                },
                "symbolSize": 3,
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
                        "color": "#d87a80",
                        "color0": "#2ec7c9",
                        "borderColor": "#d87a80",
                        "borderColor0": "#2ec7c9",
                        "borderWidth": 1
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
                "symbolSize": 3,
                "symbol": "emptyCircle",
                "smooth": true,
                "color": [
                    "#516b91",
                    "#95706d",
                    "#93b7e3",
                    "#d87a80",
                    "#d87a80",
                    "#8d98b3",
                    "#e5cf0d",
                    "#97b552",
                    "#95706d",
                    "#dc69aa",
                    "#07a2a4",
                    "#9a7fd1",
                    "#588dd5",
                    "#f5994e",
                    "#c05050",
                    "#59678c",
                    "#c9ab00",
                    "#7eb00a",
                    "#6f5553",
                    "#c14089"
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
                        "areaColor": "#dddddd",
                        "borderColor": "#eeeeee",
                        "borderWidth": 0.5
                    },
                    "emphasis": {
                        "areaColor": "rgba(254,153,78,1)",
                        "borderColor": "#444444",
                        "borderWidth": 1
                    }
                },
                "label": {
                    "normal": {
                        "textStyle": {
                            "color": "#d87a80"
                        }
                    },
                    "emphasis": {
                        "textStyle": {
                            "color": "rgb(100,0,0)"
                        }
                    }
                }
            },
            "geo": {
                "itemStyle": {
                    "normal": {
                        "areaColor": "#dddddd",
                        "borderColor": "#eeeeee",
                        "borderWidth": 0.5
                    },
                    "emphasis": {
                        "areaColor": "rgba(254,153,78,1)",
                        "borderColor": "#444444",
                        "borderWidth": 1
                    }
                },
                "label": {
                    "normal": {
                        "textStyle": {
                            "color": "#d87a80"
                        }
                    },
                    "emphasis": {
                        "textStyle": {
                            "color": "rgb(100,0,0)"
                        }
                    }
                }
            },
            "categoryAxis": {
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": "#999"
                    }
                },
                "axisTick": {
                    "show": true,
                    "lineStyle": {
                        "color": "#999"
                    }
                },
                "axisLabel": {
                    "show": true,
                    "textStyle": {
                        "color": "#999"
                    }
                },
                "splitLine": {
                    "show": false,
                    "lineStyle": {
                        "color": [
                            "#eee"
                        ]
                    }
                },
                "splitArea": {
                    "show": false,
                    "areaStyle": {
                        "color": [
                            "rgba(250,250,250,0.3)",
                            "rgba(200,200,200,0.3)"
                        ]
                    }
                }
            },
            "valueAxis": {
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": "#999"
                    }
                },
                "axisTick": {
                    "show": true,
                    "lineStyle": {
                        "color": "#999"
                    }
                },
                "axisLabel": {
                    "show": true,
                    "textStyle": {
                        "color": "#999"
                    }
                },
                "splitLine": {
                    "show": true,
                    "lineStyle": {
                        "color": [
                            "#eee"
                        ]
                    }
                },
                "splitArea": {
                    "show": true,
                    "areaStyle": {
                        "color": [
                            "rgba(250,250,250,0.3)",
                            "rgba(200,200,200,0.3)"
                        ]
                    }
                }
            },
            "logAxis": {
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": "#008acd"
                    }
                },
                "axisTick": {
                    "show": true,
                    "lineStyle": {
                        "color": "#333"
                    }
                },
                "axisLabel": {
                    "show": true,
                    "textStyle": {
                        "color": "#333"
                    }
                },
                "splitLine": {
                    "show": true,
                    "lineStyle": {
                        "color": [
                            "#eee"
                        ]
                    }
                },
                "splitArea": {
                    "show": true,
                    "areaStyle": {
                        "color": [
                            "rgba(250,250,250,0.3)",
                            "rgba(200,200,200,0.3)"
                        ]
                    }
                }
            },
            "timeAxis": {
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": "#008acd"
                    }
                },
                "axisTick": {
                    "show": true,
                    "lineStyle": {
                        "color": "#333"
                    }
                },
                "axisLabel": {
                    "show": true,
                    "textStyle": {
                        "color": "#333"
                    }
                },
                "splitLine": {
                    "show": true,
                    "lineStyle": {
                        "color": [
                            "#eee"
                        ]
                    }
                },
                "splitArea": {
                    "show": false,
                    "areaStyle": {
                        "color": [
                            "rgba(250,250,250,0.3)",
                            "rgba(200,200,200,0.3)"
                        ]
                    }
                }
            },
            "toolbox": {
                "iconStyle": {
                    "normal": {
                        "borderColor": "#2ec7c9"
                    },
                    "emphasis": {
                        "borderColor": "#18a4a6"
                    }
                }
            },
            "legend": {
                "textStyle": {
                    "color": "#333333"
                }
            },
            "tooltip": {
                "axisPointer": {
                    "lineStyle": {
                        "color": "#999",
                        "width": "1"
                    },
                    "crossStyle": {
                        "color": "#999",
                        "width": "1"
                    }
                }
            },
            "timeline": {
                "lineStyle": {
                    "color": "#008acd",
                    "width": 1
                },
                "itemStyle": {
                    "normal": {
                        "color": "#008acd",
                        "borderWidth": 1
                    },
                    "emphasis": {
                        "color": "#a9334c"
                    }
                },
                "controlStyle": {
                    "normal": {
                        "color": "#008acd",
                        "borderColor": "#008acd",
                        "borderWidth": 0.5
                    },
                    "emphasis": {
                        "color": "#008acd",
                        "borderColor": "#008acd",
                        "borderWidth": 0.5
                    }
                },
                "checkpointStyle": {
                    "color": "#2ec7c9",
                    "borderColor": "rgba(46,199,201,0.4)"
                },
                "label": {
                    "normal": {
                        "textStyle": {
                            "color": "#008acd"
                        }
                    },
                    "emphasis": {
                        "textStyle": {
                            "color": "#008acd"
                        }
                    }
                }
            },
            "visualMap": {
                "color": [
                    "#5ab1ef",
                    "#e0ffff"
                ]
            },
            "dataZoom": {
                "backgroundColor": "rgba(47,69,84,0)",
                "dataBackgroundColor": "rgba(239,239,255,1)",
                "fillerColor": "rgba(182,162,222,0.2)",
                "handleColor": "#008acd",
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




