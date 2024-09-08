<!--
 描述: 酷屏首页模板
 作者: Jack Chen
 日期: 2020-04-29
-->

<template>
  <div class="home-container">
    <div class="wrap" ref="editor">
      <div class="title_wrap">
        <div class="zuojuxing"></div>
        <div class="youjuxing"></div>
        <div class="guang"></div>
        <div class="title">
          <span class="title-text">红色党建智慧驾驶舱</span>
        </div>
        <!-- <div class="timers">
          {{ dateYear }} {{ dateWeek }} {{ dateDay }}
          <i class="blq-icon-shezhi02" style="margin-left: 10px" @click="showSetting"></i>
        </div> -->
      </div>
      <china />

      <!-- <sinan />
      <seamless />
      <pyramid />

      <scrollArc />
      <szBar />

      <ringPin />
      <rotateColorful />
      <circleRunway />
      <scanRadius />

      <cakeLinkage />
      <pyramidTrend />
      <dynamicLine />

      <staffMix />
      <flashCloud />
      <ringPie />
      <colorfulRadar />

      <dynamicList />
      <bar3d />
      <colorfulArea />

      <rainbow />
      <gauge />
      <waterPolo />
      <circleNesting />

      <div class="divider"></div> -->

    </div>

  </div>
</template>

<script>
import { screenSize } from '@/assets/js/utils'

export default {
  name: 'Home',
  components: {},
  data() {
    return {

    }
  },
  computed: {

  },
  created() {
  },
  mounted() {
    screenSize(this.$refs.editor);
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.home-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  .wrap {
    transform-origin: 0px 0px 0px;
    // background: url() no-repeat;
    background-size: contain;
    background-position: 50% 0;
    background-color: rgb(0, 0, 0);
    min-width: auto;
    width: 1920px;
    min-height: auto;
    height: 1080px;
    overflow: auto;

    .divider {
      position: absolute;
      left: 50px;
      top: 3253px;
      width: 90%;
      height: 50px;
      width: 300px;
      border: none;
      background: transparent;
    }

  }
}

.title_wrap {
  margin-top: 20px;
  height: 60px;
  background-image: url("../assets/img/top.png");
  background-size: cover;
  background-position: center center;
  position: relative;
  margin-bottom: 4px;

  .guang {
    position: absolute;
    bottom: -26px;
    background-image: url("../assets/img/guang.png");
    background-position: 80px center;
    width: 100%;
    height: 56px;
  }

  .zuojuxing,
  .youjuxing {
    position: absolute;
    top: -2px;
    width: 140px;
    height: 6px;
    background-image: url("../assets/img/juxing1.png");
  }

  .zuojuxing {

    left: 11%;
  }

  .youjuxing {
    right: 11%;
    transform: rotate(180deg);
  }

  .timers {
    position: absolute;
    right: 0;
    top: 30px;
    font-size: 18px;
    display: flex;
    align-items: center;

    .blq-icon-shezhi02 {
      cursor: pointer;
    }
  }
}

.title {
  position: relative;
  // width: 500px;
  text-align: center;
  background-size: cover;
  color: transparent;
  height: 60px;
  line-height: 46px;

  .title-text {
    font-size: 38px;
    font-weight: 900;
    letter-spacing: 6px;
    width: 100%;
    background: linear-gradient(92deg, #0072FF 0%, #00EAFF 48.8525390625%, #01AAFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
