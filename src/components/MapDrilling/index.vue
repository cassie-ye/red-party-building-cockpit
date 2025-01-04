<template>
    <dv-border-box-12>
        <div class="moudle-desc">
            <p class="moudle-title">红色基地地理分布</p>
            <dv-decoration-3 style="width:250px;height:30px;" />
        </div>
        <div id="chart" class="chart"></div>
    </dv-border-box-12>
</template>
<script>
import * as echarts from 'echarts'
import { getGeoJson, getMapData } from '@/apis/map'
import { TAIWAN_ADCODE, JD_ADCODE, EXISTING_SECOND_LAYER_REGION, EXISTING_THIRD_LAYER_REGION } from './constant'

export default {
    name: "MapDrilling",
    data() {
        return {
            // echarts实例
            mapChart: null,
            // 存储地图数据
            mapStack: [],
            // resize那边的定时器 
            timer: null,

            data: [
                { adcode: 110000, name: '北京', value: 20057.34 },
                { adcode: 120000, name: '天津', value: 15477.48 },
                { adcode: 130000, name: '河北', value: 31686.1 },
                { adcode: 140000, name: '山西', value: 6992.6 },
                { adcode: 150000, name: '内蒙古', value: 44045.49 },
                { adcode: 210000, name: '辽宁', value: 40689.64 },
                { adcode: 220000, name: '吉林', value: 37659.78 },
                { adcode: 230000, name: '黑龙江', value: 45180.97 },
                { adcode: 310000, name: '上海', value: 55204.26 },
                { adcode: 320000, name: '江苏', value: 21900.9 },
                { adcode: 330000, name: '浙江', value: 4918.26 },
                { adcode: 340000, name: '安徽', value: 5881.84 },
                { adcode: 350000, name: '福建', value: 4178.01 },
                { adcode: 360000, name: '江西', value: 2227.92 },
                { adcode: 370000, name: '山东', value: 2180.98 },
                { adcode: 410000, name: '河南', value: 9172.94 },
                { adcode: 420000, name: '湖北', value: 3368 },
                { adcode: 430000, name: '湖南', value: 806.98 },
                { adcode: 440000, name: '广东', value: 806.98 },
                { adcode: 450000, name: '广西', value: 806.98 },
                { adcode: 460000, name: '海南', value: 806.98 },
                { adcode: 500000, name: '重庆', value: 806.98 },
                { adcode: 510000, name: '四川', value: 806.98 },
                { adcode: 520000, name: '贵州', value: 806.98 },
                { adcode: 530000, name: '云南', value: 806.98 },
                { adcode: 540000, name: '西藏', value: 806.98 },
                { adcode: 610000, name: '陕西', value: 806.98 },
                { adcode: 620000, name: '甘肃', value: 806.98 },
                { adcode: 630000, name: '青海', value: 806.98 },
                { adcode: 640000, name: '宁夏', value: 806.98 },
                { adcode: 650000, name: '新疆', value: 0 },
                { adcode: 710000, name: '台湾', value: 0 },
                { adcode: 810000, name: '香港', value: 0 },
                { adcode: 820000, name: '澳门', value: 0 },
                { adcode: 1000001, name: '南海诸岛', value: 0 }
            ],

            newData: [
                {
                    name: "江苏",
                    value: [119.486506, 32.983991, 2],
                },
                {
                    name: "广东",
                    value: [113.429919, 23.334643, 277],
                },
                {
                    name: "浙江",
                    value: [120.109913, 29.181466, 8],
                },
                {
                    name: "北京",
                    value: [116.41995, 40.18994, 88]
                }
            ],
        }
    },
    mounted() {
        // 成功有东西
        // console.log("======", echarts)
        this.initChart()
    },
    methods: {
        async initChart() {
            this.mapChart = echarts.init(document.getElementById('chart'))
            // console.log("this.mapChart", this.mapChart)
            this.addChartEvent()

            // 获取渲染地图的相关数据
            // this.mapChart.showLoading()
            const mapName = 'china'
            // 请求china数据
            const { partData, geoJson } = await this.getGeoAndMapData('china', mapName)
            /*  
                partData数组中有每个省份的adcode name value
                [{
                    adcode: 110000
                    name: "北京"
                    value: 20057.34
                } ...]

                geoJson能拿到features数组
            */
            // console.log("partData", partData)
            // console.log("geoJson", geoJson)

            // 注册渲染地图
            const specialAreas = {
                澳门: {
                    left: 113,
                    top: 20.5,
                    width: 0.7,
                },
                香港: {
                    left: 115,
                    top: 21.3,
                    width: 2,
                },
            }

            // 注册渲染地图  china 请求到的中国地图的数据内容 请求到的地图的geoJson 特殊区域
            this.registeRenderMap(mapName, partData, geoJson, specialAreas)
        },

        addChartEvent() {
            // 监听屏幕大小改变
            this.bindResizeWindow()
            // 绑定自定义单击事件
            this.bindClickChart()
            // 绑定自定义右击事件
            this.bindContextmenuChart()
        },

        /**
         * 监听屏幕大小改变
         */
        bindResizeWindow() {
            window.addEventListener('resize', () => {
                if (this.timer) return
                this.timer = setTimeout(() => {
                    this.mapChart.resize()
                    this.timer = null
                }, 100)
            })
        },

        /**
         * 绑定自定义单击事件
         */
        bindClickChart() {
            this.mapChart.on('click', async e => {
                const {
                    seriesName,
                    name,
                    data: { adcode },
                } = e
                console.log('e', e)

                // 可下钻到二级地图（23个省、5个自治区、4个直辖市、2个特别行政区）
                if (EXISTING_SECOND_LAYER_REGION.find(i => i.adcode === adcode)) {
                    const mapName = `${adcode}-${name}`
                    const { partData, geoJson } = await this.getGeoAndMapData('province', mapName)
                    this.registeRenderMap(mapName, partData, geoJson)
                }

                // 可下钻到三级地图（23个省、5个自治区 的市级区域）
                else if (EXISTING_THIRD_LAYER_REGION.find(i => `${i.adcode}-${i.name}` === seriesName)) {
                    // 台湾，无法下钻（暂无市级区域geojson数据）
                    if (seriesName.includes(TAIWAN_ADCODE)) return

                    const mapName = `${seriesName}-${adcode}-${name}`
                    const { partData, geoJson } = await this.getGeoAndMapData('city', mapName)
                    this.registeRenderMap(mapName, partData, geoJson)
                }
            })
        },

        /**
         * @description: 返回上一级地图
         */
        goBack() {
            // 如果栈中只剩下中国地图
            if (this.mapStack.length <= 1) {
                return
            }
            this.mapStack.pop()
            const { mapName, partData, geoJson } = this.topChild()
            this.registeRenderMap(mapName, partData, geoJson)
        },

        // 绑定自定义右击事件
        bindContextmenuChart() {
            // 取消右击默认事件
            const container = document.getElementById('chart')
            container.oncontextmenu = e => e.preventDefault()
            // 绑定自定义右击事件
            this.mapChart.on('contextmenu', () => {
                this.goBack()
            })
        },

        /**
         * @description: 获取渲染地图的相关数据 geoJson 和 partData（地图部分数据内容）
         * @param {String} type 类型  china：中国地图   province：省级地图   city：市级地图
         * @param {String} mapName 地图名称 同注册地图方法registerMap 的第一个参数一致
         */
        async getGeoAndMapData(type, mapName) {
            const [{ data: geoJson }, res] = await Promise.all([getGeoJson(type, mapName), getMapData(type)])

            const { data: partData } = res.data
            return { geoJson, partData }
        },


        /**
         * @description: 获取栈顶成员
         */
        topChild() {
            // mapName: "330000-浙江"
            console.log("获取栈顶成员", this.mapStack[this.mapStack.length - 1])
            if (this.mapStack.length === 0) return undefined
            return this.mapStack[this.mapStack.length - 1]
        },

        /**
         * @description: 根据partData 和 geoJson 生成 seriesData
         * @param {Array} partData 地图部分数据内容
         * @param {Object} geoJson 地图geoJson
         */
        getSeriesDataByPart(partData, geoJson) {
            let data = geoJson.features.map(({ properties }) => ({
                adcode: properties.adcode,
                name: properties.name,
                value: 0,
            }))
            if (geoJson.attach) {
                const attachData = geoJson.attach.map(item => ({
                    adcode: item.adcode,
                    name: item.name,
                    value: 0,
                }))
                data.push(...attachData)
            }
            // 过滤掉九段线数据
            data = data.filter(item => item.adcode !== JD_ADCODE)

            data.forEach(item => {
                const currData = partData.find(i => i.adcode === item.adcode)
                if (currData) {
                    item.value = currData.value
                }
            })
            return data
        },

        /**
         * @description: 根据seriesData 动态计算生成 visualMap 的最大值
         * @param {Array} seriesData 地图数据内容
         */
        getVisualMapMax(seriesData) {
            const maxValue = Math.max(...seriesData.map(item => item.value))
            return parseInt(maxValue) + 50
        },


        /**
         * @description: 地图数据入栈，栈顶成员即当前渲染的地图数据
         * @param {String} mapName 地图名称 同注册地图方法registerMap 的第一个参数一致
         * @param {Array} partData 地图部分数据内容
         * @param {Object} geoJson 地图geoJson
         */
        pushStack(mapName, partData, geoJson) {
            this.mapStack.push({
                mapName,
                partData,
                geoJson,
            })
        },

        /**
         * @description: 绘制地图
         * @param {String} mapName 地图名称 同注册地图方法registerMap 的第一个参数一致
         * @param {Array} partData 地图部分数据内容
         * @param {Object} geoJson 地图geoJson
         */
        renderMap(mapName, partData, geoJson) {
            const seriesData = this.getSeriesDataByPart(partData, geoJson)
            console.log("seriesData", seriesData)
            const option = {
                animation: true,
                animationDuration: 1000,
                animationDurationUpdate: 600,
                animationEasingUpdate: 'cubicInOut',
                title: {
                    // 主标题
                    text: mapName,
                    textStyle: {
                        color: '#b7def9',
                        fontSize: 18,
                    },
                    left: 10,
                    top: 20,
                    // 副标题
                    // subtext: `${mapName}共入驻567个红色基地`,
                    subtextStyle: {
                        color: "#fac11c",
                        fontSize: 16,
                    },
                },
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    transitionDuration: 0.2
                },
                // 视觉映射
                visualMap: {
                    left: 10,
                    bottom: 130,
                    pieces: [
                        { gte: 51, label: "51-60个" },
                        { gte: 41, lte: 50, label: "41-50个" },
                        { gte: 31, lte: 40, label: "31-40个" },
                        { gte: 21, lte: 30, label: "21-30个" },
                        { gte: 11, lte: 20, label: "11-20个" },
                        { gte: 1, lte: 10, label: "1-10个" },
                        { lte: 0, label: "0个" },
                    ],
                    inRange: {
                        // 渐变颜色，从小到大
                        color: [
                            // "#c3d7df",
                            "#5cb3cc",
                            "#8abcd1",
                            "#66a9c9",
                            "#2f90b9",
                            "#1781b5",
                            "#28a7eb"
                        ],
                    },
                    textStyle: {
                        color: "#fff",
                    },
                },
                series: [
                    {
                        name: mapName, // 系列名称
                        type: 'map',
                        map: mapName, // 同 registerMap 方法的第一个参数一致
                        data: seriesData,
                        zoom: 1, // 当前视角的缩放比例
                        zlevel: 1, // 用于 Canvas 分层，不同zlevel值的图形会放置在不同的 Canvas 中
                        geoIndex: 1,
                        selectedMode: false, //是否允许选中多个区域
                        scaleLimit: {
                            min: 0.8,
                            max: 2,
                        },
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
                ],
            }
            // 绘制图表
            this.mapChart.setOption(option)

            // 如果渲染的地图 和 栈顶地图一致，无需入栈
            if (this.topChild() && mapName === this.topChild().mapName) {
                return
            }
            // 入栈
            this.pushStack(mapName, partData, geoJson)
        },

        /**
         * @description: 注册渲染地图
         * @param {String} mapName 地图名称 同 option/series/map 一致
         * @param {Array} partData 地图部分数据内容
         * @param {Object} geoJson 地图geoJson
         * @param {Object} specialAreas 特殊区域
         */
        registeRenderMap(mapName, partData, geoJson, specialAreas = {}, data) {
            // 注册地图
            echarts.registerMap(mapName, geoJson, specialAreas)
            // 绘制地图
            this.renderMap(mapName, partData, geoJson, this.newData)
        },
    },
}
</script>
<style scoped lang="scss">
.chart {
    width: 750px;
    height: 680px;
}

.dv-border-box-12 {
    .moudle-desc {
        width: 80%;
        display: flex;
        color: #017ef7;
        padding-top: 15px;
        align-items: center;

        .moudle-title {
            font-size: 20px;
            margin-left: 15px;
            margin-right: 15px;
        }
    }
    width: 120%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>