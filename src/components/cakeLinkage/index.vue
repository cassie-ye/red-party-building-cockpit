<!--
 描述: 柱饼组合联动
 作者: Jack Chen
 日期: 2020-04-30
-->

<template>
  <dv-border-box-12>
    <div class="moudle-desc">
      <p class="moudle-title">近半年平台净利润动态展示</p>
      <dv-decoration-3 style="width:250px;height:30px;" />
    </div>
    <div class="sn1-container">
      <div class="sn-content">
        <div class="sn-title">柱饼组合联动</div>
        <div class="sn-body">
          <div class="wrap-container">
            <div class="chartsdom" id="chart_bp"></div>
          </div>
        </div>
      </div>
    </div>
  </dv-border-box-12>

</template>

<script>
export default {
  name: "cakeLinkage",
  data() {
    return {
      option: null,
      dataMap: {},

    }
  },
  mounted() {
    this.getEchart();
  },
  methods: {
    dataFormatter(obj) {
      let pList = ['基地预订', '文创商品', '讲解预订', '酒店收益', '餐饮收益', '基地入驻'];
      let temp;
      for (let y = 2016; y <= 2020; y++) {
        let max = 0;
        let sum = 0;
        temp = obj[y];
        for (let i = 0, l = temp.length; i < l; i++) {
          max = Math.max(max, temp[i]);
          sum += temp[i];
          obj[y][i] = {
            name: pList[i],
            value: temp[i]
          };
        }
        obj[y + 'max'] = Math.floor(max / 100) * 100;
        obj[y + 'sum'] = sum;
      }
      return obj;
    },
    getEchart() {
      let myChart = echarts.init(document.getElementById('chart_bp'));
      let itemStyleJR = {
        color: '#d6d638'
      }
      let itemStyleZW = {
        color: '#00c86c'
      }
      let itemStyleYL = {
        color: '#07d8ff'
      }
      let itemStyleIT = {
        color: '#0c71cf'
      }
      let itemStyleJZ = {
        color: '#ff6b6b'
      }
      let itemStyleJH = {
        color: '#9579c0'
      }

      this.dataMap.dataJR = this.dataFormatter({
        //max : 4000,
        2020: [136, 159, 905, 305],
        2019: [124, 145, 562, 285],
        2018: [118, 128, 207, 265],
        2017: [112, 122, 234, 245],
        2016: [101, 110, 804, 225]
      });

      this.dataMap.dataZW = this.dataFormatter({
        //max : 26600,
        2020: [752, 928, 126, 210],
        2019: [388, 840, 707, 208],
        2018: [855, 987, 959, 207],
        2017: [626, 709, 701, 206],
        2016: [509, 892, 201, 205]
      });

      this.dataMap.dataYL = this.dataFormatter({
        //max : 25000,
        2020: [363, 219, 483, 505],
        2019: [600, 438, 123, 405],
        2018: [179, 405, 668, 305],
        2017: [375, 2886, 276, 205],
        2016: [236, 250, 408, 105]
      });

      this.dataMap.dataIT = this.dataFormatter({
        //max : 26600,
        2020: [752, 928, 126, 255],
        2019: [388, 840, 707, 245],
        2018: [855, 987, 959, 235],
        2017: [626, 709, 701, 225],
        2016: [509, 892, 201, 215]
      });

      this.option = {
        baseOption: {
          timeline: {
            axisType: 'category',
            autoPlay: true,
            playInterval: 2000,
            data: ['2024-04', '2024-05', '2024-06', '2024-07', '2024-08','2024-09'],
            lineStyle: {
              color: '#179bf1'
            },
            left: 30,
            right: 30,
            label: {
              color: '#2867a8',
              // formatter(s) {
              //   return (new Date(s)).getMonth()+1;
              // }
            },
            checkpointStyle: {
              color: '#01d8ff',
              symbolSize: 10,
              borderColor: 'rgba(1, 216, 255, 0.5)',
              borderWidth: 5,
            },
            controlStyle: {
              showPlayBtn: false,
              borderColor: '#01bde6',
              itemGap: 20
            },
            itemStyle: {
              // color: '#004b85',
              borderColor: '#004b85',
              borderWidth: 1,
              shadowColor: 'rgba(1, 216, 225, 0.5)',
              shadowBlur: 5
            },
            emphasis: {
              label: {
                color: '#01d8ff',
                show: false
              },
              checkpointStyle: {
                color: '#01d8ff',
                borderColor: 'rgba(1, 216, 255, 0.5)',
                borderWidth: 5,
              },
              controlStyle: {
                borderColor: 'rgba(1, 216, 255, 0.5)'
              },
              itemStyle: {
                color: '#01d8ff',
                borderColor: 'rgba(1, 216, 225, 0.5)',
                borderWidth: 5
              }
            }
          },
          // tooltip: {
          //   trigger: 'item'
          // },
          grid: {
            bottom: '20%',
            right: "42%"
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            data: ['基地预订', '文创商品', '讲解预订', '酒店收益', '餐饮收益', '基地入驻'],
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#2867a8',
              }
            },
          }],
          yAxis: [{
            type: 'value',
            // name: '区块链应用（个）',
            name: '利润(万元)',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#2867a8'
              }
            },
          }],
          series: [{
            name: '联盟链',
            type: 'bar',
            barMaxWidth: 15,
            center: ['20%', '65%'],
            seriesLayoutBy: 'row',
            markPoint: {
              symbol: 'pin',
              itemStyle: {
                normal: {
                  color: '#eb9b44',
                  shadowColor: '#eb9b44',
                  shadowBlur: 15
                }
              },
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            }
            // label: {
            //   show: true,
            //   position: 'top'
            // },
          }, {
            name: '应用占比',
            type: 'pie',
            center: ['76%', '20%'],
            radius: '28%',
            z: 100
          }]
        },
        options: [{
          series: [
            {
              data: [{
                name: '基地预订',
                value: this.dataMap.dataJR['2016sum'],
                itemStyle: itemStyleJR
              }, {
                name: '文创商品',
                value: this.dataMap.dataZW['2016sum'],
                itemStyle: itemStyleZW
              }, {
                name: '讲解预订',
                value: this.dataMap.dataYL['2016sum'],
                itemStyle: itemStyleYL
              }, {
                name: '酒店收益',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleIT
              }, {
                name: '餐饮收益',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJZ
              }, {
                name: '基地入驻',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJH
              }
              ],
            },
            {
              data: [{
                name: '基地预订',
                value: this.dataMap.dataJR['2016sum'],
                itemStyle: itemStyleJR
              }, {
                name: '文创商品',
                value: this.dataMap.dataZW['2016sum'],
                itemStyle: itemStyleZW
              }, {
                name: '讲解预订',
                value: this.dataMap.dataYL['2016sum'],
                itemStyle: itemStyleYL
              }, {
                name: '酒店收益',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleIT
              }, {
                name: '餐饮收益',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJZ
              }, {
                name: '基地入驻',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJH
              }]
            }
          ]
        }, {
          series: [
            {
              data: [{
                name: '基地预订',
                value: this.dataMap.dataJR['2017sum'],
                itemStyle: itemStyleJR
              }, {
                name: '文创商品',
                value: this.dataMap.dataZW['2017sum'],
                itemStyle: itemStyleZW
              }, {
                name: '讲解预订',
                value: this.dataMap.dataYL['2017sum'],
                itemStyle: itemStyleYL
              }, {
                name: '酒店收益',
                value: this.dataMap.dataIT['2017sum'],
                itemStyle: itemStyleIT
              }, {
                name: '餐饮收益',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJZ
              }, {
                name: '基地入驻',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJH
              }],
            },
            {
              data: [{
                name: '基地预订',
                value: this.dataMap.dataJR['2017sum'],
                itemStyle: itemStyleJR
              }, {
                name: '文创商品',
                value: this.dataMap.dataZW['2017sum'],
                itemStyle: itemStyleZW
              }, {
                name: '讲解预订',
                value: this.dataMap.dataYL['2017sum'],
                itemStyle: itemStyleYL
              }, {
                name: '酒店收益',
                value: this.dataMap.dataIT['2017sum'],
                itemStyle: itemStyleIT
              }, {
                name: '餐饮收益',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJZ
              }, {
                name: '基地入驻',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJH
              }]
            }
          ]
        }, {
          series: [
            {
              data: [{
                name: '基地预订',
                value: this.dataMap.dataJR['2018sum'],
                itemStyle: itemStyleJR
              }, {
                name: '文创商品',
                value: this.dataMap.dataZW['2018sum'],
                itemStyle: itemStyleZW
              }, {
                name: '讲解预订',
                value: this.dataMap.dataYL['2018sum'],
                itemStyle: itemStyleYL
              }, {
                name: '酒店收益',
                value: this.dataMap.dataIT['2018sum'],
                itemStyle: itemStyleIT
              }, {
                name: '餐饮收益',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJZ
              }, {
                name: '基地入驻',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJH
              }]
            },
            {
              data: [{
                name: '基地预订',
                value: this.dataMap.dataJR['2018sum'],
                itemStyle: itemStyleJR
              }, {
                name: '文创商品',
                value: this.dataMap.dataZW['2018sum'],
                itemStyle: itemStyleZW
              }, {
                name: '讲解预订',
                value: this.dataMap.dataYL['2018sum'],
                itemStyle: itemStyleYL
              }, {
                name: '酒店收益',
                value: this.dataMap.dataIT['2018sum'],
                itemStyle: itemStyleIT
              }, {
                name: '餐饮收益',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJZ
              }, {
                name: '基地入驻',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJH
              }]
            }
          ]
        }, {
          series: [
            {
              data: [{
                name: '基地预订',
                value: this.dataMap.dataJR['2019sum'],
                itemStyle: itemStyleJR
              }, {
                name: '文创商品',
                value: this.dataMap.dataZW['2019sum'],
                itemStyle: itemStyleZW
              }, {
                name: '讲解预订',
                value: this.dataMap.dataYL['2019sum'],
                itemStyle: itemStyleYL
              }, {
                name: '酒店收益',
                value: this.dataMap.dataIT['2019sum'],
                itemStyle: itemStyleIT
              }, {
                name: '餐饮收益',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJZ
              }, {
                name: '基地入驻',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJH
              }]
            },
            {
              data: [{
                name: '基地预订',
                value: this.dataMap.dataJR['2019sum'],
                itemStyle: itemStyleJR
              }, {
                name: '文创商品',
                value: this.dataMap.dataZW['2019sum'],
                itemStyle: itemStyleZW
              }, {
                name: '讲解预订',
                value: this.dataMap.dataYL['2019sum'],
                itemStyle: itemStyleYL
              }, {
                name: '酒店收益',
                value: this.dataMap.dataIT['2019sum'],
                itemStyle: itemStyleIT
              }, {
                name: '餐饮收益',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJZ
              }, {
                name: '基地入驻',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJH
              }]
            }
          ]
        }, {
          series: [
            {
              data: [{
                name: '基地预订',
                value: this.dataMap.dataJR['2020sum'],
                itemStyle: itemStyleJR
              }, {
                name: '文创商品',
                value: this.dataMap.dataZW['2020sum'],
                itemStyle: itemStyleZW
              }, {
                name: '讲解预订',
                value: this.dataMap.dataYL['2020sum'],
                itemStyle: itemStyleYL
              }, {
                name: '酒店收益',
                value: this.dataMap.dataIT['2020sum'],
                itemStyle: itemStyleIT
              }, {
                name: '餐饮收益',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJZ
              }, {
                name: '基地入驻',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJH
              }]
            },
            {
              data: [{
                name: '基地预订',
                value: this.dataMap.dataJR['2020sum'],
                itemStyle: itemStyleJR
              }, {
                name: '文创商品',
                value: this.dataMap.dataZW['2020sum'],
                itemStyle: itemStyleZW
              }, {
                name: '讲解预订',
                value: this.dataMap.dataYL['2020sum'],
                itemStyle: itemStyleYL
              }, {
                name: '酒店收益',
                value: this.dataMap.dataIT['2020sum'],
                itemStyle: itemStyleIT
              }, {
                name: '餐饮收益',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJZ
              }, {
                name: '基地入驻',
                value: this.dataMap.dataIT['2016sum'],
                itemStyle: itemStyleJH
              }]
            }
          ]
        }]
      }

      myChart.setOption(this.option, true);

      window.addEventListener('resize', () => {
        myChart.resize();
      });
    }
  },
  beforeDestroy() {

  }
};
</script>

<style lang="scss" scoped>
.dv-border-box-12 {
  width: 750px;
  height: 425px;
  margin-left: -30px;

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
}

.sn1-container {
  width: 730px;
  height: 425px;

  .chartsdom {
    width: 100%;
    height: 90%;
    margin-top: 5%;
  }
}
</style>
