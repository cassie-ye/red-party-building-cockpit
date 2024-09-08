<template>
    <div id="app">
        <div id="echart_china" ref="echart_china"></div>
    </div>
</template>

<script>
import chinamap from "../../utils/map/china.json";
export default {
    name: "china",
    data() {
        return {
            myChart: null,
        };
    },
    mounted() {
        // 1. 创建一个 ECharts 实例，返回 echartsInstance，不能在单个容器上初始化多个 ECharts 实例
        this.myChart = this.$echarts.init(this.$refs.echart_china);

        this.init();
        console.log(this.$echarts)
    },
    methods: {
        /*
          显示中国地图
        */
        init() {
            // 2. 注册可用的地图，只在 geo 组件或者map图表类型中使用
            this.$echarts.registerMap("china", chinamap); //用导入的json文件注册一个name:china的地图组件

            // 3. 设置图表 option
            var option = {
                geo: {
                    type: "map",
                    map: "china", //使用 registerMap 注册的地图名称
                    layoutCenter: ['45%', '55%'], // 调整地图中心
                    layoutSize: '100%', // 控制地图的大小
                    zoom: 1 // 你可以调整缩放比例
                },
            };
            console.log("option1:", option);

            // 只显示一个地图的时候，用option,option2都可以。如果要在地图上加散点图，用 option 
            var option2 = {
                series: [
                    {
                        type: "map",
                        map: "china", //使用 registerMap 注册的地图名称
                    },
                ],
            };
            console.log("option2:", option2);

            // 4. 显示地图
            this.myChart.setOption(option); // 用 option 和 option2 效果一样
        },
    },
};
</script>

<style scoped>
#echart_china {
    width: 800px;
    height: 800px;
    background-color: pink;
}
</style>