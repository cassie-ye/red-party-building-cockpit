<template>
    <div>
        <div class="quanguo" @click="getGeojson()">
            中国
        </div>
        <div id="echart_china" ref="CenterMap"></div>
    </div>
</template>

<script>
import chinamap from "../../utils/map/china.json";
import zhejiang from "../../utils/map/zhejiang.json";
import xzqCode from "../../utils/map/xzqCode";

export default {
    name: "china",
    data() {
        return {
            myChart: null,
            dataList: [
                { name: '青海省', value: 857 },
                { name: '湖南省', value: 58 },
                { name: '青海省', value: 371 },
                { name: '山东省', value: 209 },
                { name: '辽宁省', value: 604 },
                { name: '上海', value: 6 },
                { name: '江苏省', value: 629 },
                { name: '宁夏回族自治区', value: 169 }
            ],
            features: [],
            cityCenter: {},
            mydata: [
                { name: "江苏省", value: 2 },
                { name: "广东省", value: 277 },
                { name: "浙江省", value: 888 },
                { name: "北京市", value: 87 },
            ],
            newData: [
                {
                    name: "江苏省",
                    value: [119.486506, 32.983991, 2],
                },
                {
                    name: "广东省",
                    value: [113.429919, 23.334643, 277],
                },
                {
                    name: "浙江省",
                    value: [120.109913, 29.181466, 8],
                },
                {
                    name: "北京市",
                    value: [116.41995, 40.18994, 88]
                }
            ],
            code: "china",
            echartBindClick: false
        };
    },
    mounted() {
        // 1. 创建一个 ECharts 实例，返回 echartsInstance，不能在单个容器上初始化多个 ECharts 实例
        this.myChart = this.$echarts.init(this.$refs.CenterMap);
        console.log("======", this.myChart)
        this.$echarts.registerMap("china", chinamap); //用导入的json文件注册一个name:china的地图组件
        this.init("china", this.mydata, this.newData);
        this.features = this.$echarts.getMap('china').geoJSON.features
        console.log(this.features)
        this.features.map((item) => {
            this.cityCenter[item.properties.name] =
                item.properties.centroid || item.properties.center;
        });
        // 城市中心
        console.log(this.cityCenter)
        // 注册时间
        this.mapclick()

    },
    methods: {
        /*
          显示中国地图
        */
        init(name, data, data2) {
            // 2. 注册可用的地图，只在 geo 组件或者map图表类型中使用

            // 3. 设置图表 option
            const option = {
                backgroundColor: "rgba(0,0,0,0)",
                title: {
                    text: 'Cassie燁的足迹地图',
                    subtext: '共打卡5个红色基地',
                    sublink: 'http://www.census.gov/popest/data/datasets.html',
                    left: 'right',
                    textStyle: {
                        color: "#FFF",
                    },
                    subtextStyle: {
                        color: "#0180fb", // 副标题颜色，修改为你需要的颜色
                    },
                },
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    transitionDuration: 0.2
                },
                visualMap: {
                    left: 0,
                    bottom: 130,
                    pieces: [
                        { gte: 10, label: "10个以上" }, // 不指定 max，表示 max 为无限大（Infinity）。
                        { gte: 6, lte: 10, label: "6-10个" },
                        { gte: 2, lte: 5, label: "2-5个" },
                        { lte: 1, label: "1个" }, // 不指定 min，表示 min 为无限大（-Infinity）。
                    ],
                    inRange: {
                        // 渐变颜色，从小到大
                        color: [
                            "#c3d7df",
                            "#5cb3cc",
                            "#8abcd1",
                            "#66a9c9",
                            "#2f90b9",
                            "#1781b5",
                        ],
                    },
                    textStyle: {
                        color: "#fff",
                    },
                },
                toolbox: {
                    show: true,
                    //orient: 'vertical',
                    left: 'left',
                    top: 'top',
                    feature: {
                        dataView: { readOnly: false },
                        restore: {},
                        saveAsImage: {}
                    },
                },
                geo: {
                    map: name,
                    roam: false,
                    selectedMode: false, //是否允许选中多个区域
                    zoom: 1.2,
                    top: 100,
                    // aspectScale: 0.78,
                    show: false,
                },
                series: [
                    {
                        name: "MAP",
                        type: "map",
                        map: name,
                        // aspectScale: 0.78,
                        data: data,
                        // data: [1,100],
                        selectedMode: false, //是否允许选中多个区域
                        zoom: 1.2,
                        geoIndex: 1,
                        top: 100,
                        tooltip: {
                            show: true,
                            formatter: function (params) {
                                if (params.data) {
                                    return params.name + "：" + params.data["value"];
                                } else {
                                    return params.name;
                                }
                            },
                            backgroundColor: "rgba(0,0,0,.6)",
                            borderColor: "rgba(147, 235, 248, .8)",
                            textStyle: {
                                color: "#FFF",
                            },
                        },
                        label: {
                            show: false,
                            color: "#000",
                            // position: [-10, 0],
                            formatter: function (val) {
                                // console.log(val)
                                if (val.data !== undefined) {
                                    return val.name.slice(0, 2);
                                } else {
                                    return "";
                                }
                            },
                            rich: {},
                        },
                        emphasis: {
                            label: {
                                show: false,
                            },
                            itemStyle: {
                                areaColor: "#389BB7",
                                borderWidth: 1,
                            },
                        },
                        itemStyle: {
                            borderColor: "rgba(147, 235, 248, .8)",
                            borderWidth: 1,
                            areaColor: {
                                type: "radial",
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
                                    },
                                ],
                                globalCoord: false, // 缺为 false
                            },
                            shadowColor: "rgba(128, 217, 248, .3)",
                            shadowOffsetX: -2,
                            shadowOffsetY: 2,
                            shadowBlur: 10,
                        },
                    },
                    {
                        data: data2,
                        type: "effectScatter",
                        coordinateSystem: "geo",
                        symbolSize: function (val) {
                            return 4;
                            // return val[2] / 50;
                        },
                        legendHoverLink: true,
                        showEffectOn: "render",
                        rippleEffect: {
                            // period: 4,
                            scale: 6,
                            color: "rgba(255,255,255, 1)",
                            brushType: "fill",
                        },
                        tooltip: {
                            show: true,
                            formatter: function (params) {
                                if (params.data) {
                                    return params.name + "：" + params.data["value"][2];
                                } else {
                                    return params.name;
                                }
                            },
                            backgroundColor: "rgba(0,0,0,.6)",
                            borderColor: "rgba(147, 235, 248, .8)",
                            textStyle: {
                                color: "#FFF",
                            },
                        },
                        label: {
                            formatter: (param) => {
                                return param.name.slice(0, 2);
                            },

                            fontSize: 11,
                            offset: [0, 2],
                            position: "bottom",
                            textBorderColor: "#fff",
                            textShadowColor: "#000",
                            textShadowBlur: 10,
                            textBorderWidth: 0,
                            color: "#FFF",
                            show: true,
                        },
                        // colorBy: "data",
                        itemStyle: {
                            color: "rgba(255,255,255,1)",
                            borderColor: "rgba(2255,255,255,2)",
                            borderWidth: 4,
                            shadowColor: "#000",
                            shadowBlur: 10,
                        },
                    },
                ],
            };
            console.log("option1:", option);

            // // 只显示一个地图的时候，用option,option2都可以。如果要在地图上加散点图，用 option 
            // var option2 = {
            //     series: [
            //         {
            //             type: "map",
            //             map: "china", //使用 registerMap 注册的地图名称
            //         },
            //     ],
            // };
            // console.log("option2:", option2);

            // 4. 显示地图
            this.myChart.setOption(option); // 用 option 和 option2 效果一样
        },
        getData(code) {
            console.log('点击的省份的code', code)
            const jiangsuGeoJson = chinamap.features.find(feature => feature.properties.adcode === 320000);
            console.log('jiangsuGeoJson', jiangsuGeoJson)
            this.$echarts.registerMap('zhejiang', zhejiang);
            console.log("-----")
            this.init('zhejiang', [{ name: 'hangzhou', value: 100 }], [{ name: 'Nanjing', value: 100 }]);
            console.log("=======")

            // fetch("/province.json")
            //     .then(response => response.json())
            //     .then(data => {
            //         const features = data.features;
            //         const arr = []
            //         features.map((feature) => {
            //             if (feature?.properties?.parent?.adcode) {
            //                 if (feature?.properties?.parent?.adcode == code) {
            //                     arr.push(feature)
            //                 }
            //             }
            //         })
            //         console.log("ss", arr)
            //         // 拿到 杭州、宁波、温州等地区中心点
            //         const newArr = []
            //         arr.map((item) => {
            //             newArr.push({
            //                 value: item.properties.centroid || item.properties.center,
            //                 name: item.properties.name
            //             })
            //         })
            //         console.log("newArr", name)

            //         this.init(name, newArr, []);
            //     })
            //     .catch(error => console.error('加载 china.json 时出错:', error));

        },

        mapclick() {
            if (this.echartBindClick) return;
            //单击切换到级地图，当mapCode有值,说明可以切换到下级地图
            this.myChart.on("click", (params) => {
                // console.log(params);
                let xzqData = xzqCode[params.name];
                console.log('xzqData', xzqData)
                if (xzqData) {
                    // "650000"
                    this.getData(xzqData);
                } else {
                    // this.message("暂无下级地市!");
                    console.log("暂无下级地市!")
                }
            });
            this.echartBindClick = true;
        },

    },
};
</script>

<style scoped>
.quanguo {

    width: 80px;
    height: 28px;
    border: 1px solid #00eded;
    border-radius: 10px;
    color: #00f7f6;
    text-align: center;
    line-height: 26px;
    letter-spacing: 6px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 237, 237, 0.5),
        0 0 6px rgba(0, 237, 237, 0.4);
}

#echart_china {
    width: 800px;
    height: 800px;
}
</style>