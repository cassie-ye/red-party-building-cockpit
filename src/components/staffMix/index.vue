<!--
 描述: 人员占比
 作者: Jack Chen
 日期: 2020-05-02
-->

<template>
  <dv-border-box-12>
    <div class="moudle-desc">
      <p class="moudle-title">研学人员占比</p>
      <dv-decoration-3 style="width:150px;height:30px;" />
    </div>
    <div class="wrap-container sn-container1">
      <div class="sn-content">
        <div class="sn-body">
          <div class="wrap-container">
            <div class="person">
              <div class="pers person1"></div>
              <div class="pers person2"></div>
              <div class="pers person3"></div>
            </div>

            <div class="svgs">
              <svg width="244" height="264" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                  <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#0a6aff;stop-opacity:0.47"></stop>
                    <stop offset="40%" style="stop-color:#5cffff;stop-opacity:1"></stop>
                    <stop offset="100%" style="stop-color:#0a6aff;stop-opacity:1"></stop>
                  </linearGradient>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto"
                    markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="rgb(11,108,255)"></path>
                  </marker>
                </defs>
                <path d="M134 86C136 86 80 85 77 208" fill="none" stroke="url(#linear)" stroke-opacity="1"
                  marker-end="url(#arrow)"></path>
                <path d="M136 86C138 86 212 88 204 208" fill="none" stroke="url(#linear)" stroke-opacity="1"
                  marker-end="url(#arrow)"></path>
                <path d="M136 84C138 84 195 84 206 116" fill="none" stroke="url(#linear)" stroke-opacity="1"
                  marker-end="url(#arrow)"></path>
                <path d="M134 84C136 84 81 82 58 123" fill="none" stroke="url(#linear)" stroke-opacity="1"
                  marker-end="url(#arrow)"></path>
                <path d="M132 86C134 86 120 68 93 67" fill="none" stroke="url(#linear)" stroke-opacity="1"
                  marker-end="url(#arrow)"></path>
                <path d="M134 86C136 86 132 78 134 74C136 69 150 52 150 52" fill="none" stroke="url(#linear)"
                  stroke-opacity="1" marker-end="url(#arrow)"></path>
                <path d="M134 85C136 85 146 65 183 65" fill="none" fill-opacity="0" stroke="url(#linear)"
                  marker-end="url(#arrow)"></path>
              </svg>
            </div>

            <div class="svgs">
              <div class="text" :class="`per${index + 1}`" v-for="(item, index) in arrData" :key="index">
                <span style="font-size: 18px;"  :style="{ color: index < 4 ? 'yellow' : 'white' }" >{{ item.name }}</span>
                <span style="font-size: 18px;" :style="{ color: index < 4 ? '#FF3976' : '#5cffff' }">{{ item.number }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-category">
      <p class="yellow">Ⅰ类：县处级以上党政领导干部</p>
      <p class="yellow">Ⅱ类：四级调研员及相当层次职级以上公务员</p>
      <p class="yellow">Ⅲ类：国有企业相当职务层次以上领导人员</p>
      <p class="yellow">Ⅳ类：事业单位六级管理岗位（职员）以上人员</p>
      <p>Ⅴ类：乡科级党政领导干部</p>
      <p>Ⅵ类：一级主任科员及相当层次职级以下公务员</p>
      <p>Ⅶ类：国有企事业单位其他管理人员、专业技术人员</p>
    </div>
  </dv-border-box-12>

</template>

<script>
export default {
  name: "staffMix",
  data() {
    return {
      arrData: [{
        name: 'Ⅰ类',
        number: "5%"
      }, {
        name: 'Ⅱ类',
        number: "5%"
      }, {
        name: 'Ⅲ类',
        number: "5%"
      }, {
        name: 'Ⅳ类',
        number: "5%"
      }, {
        name: 'Ⅴ类',
        number: "5%"
      }, {
        name: 'Ⅵ类',
        number: "5%"
      }, {
        name: 'Ⅶ类',
        number: "5%"
      }]

    }
  },
  mounted() {

  },
  methods: {

  },
  beforeDestroy() {

  }
};
</script>

<style lang="scss" scoped>
.dv-border-box-12 {
  width: 410px;
  height: 560px;

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

.sn-container1 {
  width: 432px;
  height: 380px;

  // background-color: #fff;
  .person {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    .pers {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-repeat: no-repeat;
      background-position: center center;

      &.person1 {
        background-image: url(../../assets/img/online.png);
        transform: rotateX(64deg) rotateZ(0deg);
        top: 16%;
      }

      &.person2 {
        background-image: url(../../assets/img/cir-2.png);
        animation: move 10s linear infinite;
        -webkit-animation: move 10s linear infinite;
        transform: rotateX(64deg);
        top: 16%;
      }

      &.person3 {
        background-image: url(../../assets/img/person-1.png);
        top: 5%;
      }
    }
  }

  .svgs {
    width: 270px;
    height: 260px;
    margin: auto;
    top: 0;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .text {
    position: absolute;
    width: 50px;
    height: 50px;
    background-image: url(../../assets/img/cir-1.png);
    background-repeat: no-repeat;
    background-position: center center;
    color: rgb(114, 198, 230);
    text-align: center;

    span {
      &:nth-child(1) {
        display: block;
        width: 52px;
        margin-top: 10px;
        line-height: 12px;
        transform: scale(0.85);
        height: 22px;
      }

      &:nth-child(2) {
        font-size: 14px;
        font-weight: bold;
      }
    }

    &.per1 {
      top: 215px;
      left: 50px;
    }

    &.per2 {
      top: 113px;
      left: 3px;
    }

    &.per3 {
      top: 45px;
      left: 35px;
    }

    &.per4 {
      left: 120px;
    }

    &.per5 {
      top: 45px;
      left: 190px;
    }

    &.per6 {
      top: 105px;
      left: 210px;
    }

    &.per7 {
      top: 215px;
      left: 180px;
    }
  }

}

@-webkit-keyframes move {
  0% {
    transform: rotateX(-64deg) rotateZ(360deg);
  }

  100% {
    transform: rotateX(-64deg) rotateZ(0deg);
  }
}

@keyframes move {
  0% {
    transform: rotateX(-64deg) rotateZ(360deg);
  }

  100% {
    transform: rotateX(-64deg) rotateZ(0deg);
  }
}

.user-category {
  color: aliceblue;
  width: 100%;
  position: absolute;
  top: 360px;
  font-size: 17px;
  left: 0px;
  line-height: 23px;

  .yellow {
    color: rgb(255, 213, 0);
  }

  p {
    margin-left: 15px;
    margin-right: 15px;
  }
}
</style>
