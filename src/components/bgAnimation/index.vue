<!--
 描述: 登录界面背景图动画
 作者: Jack Chen
 日期: 2020-04-18
-->

<template>
  <ul class="slide-box">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</template>

<script>

export default {
  name: "bgAnimation"
};
</script>

<style lang="scss">
.slide-box {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,1);
  top: 0;
  left: 0;
  z-index: 0;
  li {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    color: transparent;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: none;
    opacity: 0;
    z-index: 0;
    -webkit-backface-visibility: hidden;
    -webkit-animation: imgAnimation 48s linear infinite 0s;
    -moz-animation: imgAnimation 48s linear infinite 0s;
    -o-animation: imgAnimation 48s linear infinite 0s;
    -ms-animation: imgAnimation 48s linear infinite 0s;
    animation: imgAnimation 48s linear infinite 0s;

    &:nth-child(1) {
      background-image: url(https://gd-hbimg.huaban.com/4b18925b0a4be21d35dc64eb1401a9f58a4f9ab2b888a-9mlKLy_fw658webp);
    }
    &:nth-child(2) {
      background-image: url(https://gd-hbimg.huaban.com/338dec860db6a29b4a040083bd98dc6d2eabc2341e400d-6298ov_fw658webp);
      -webkit-animation-delay: 12s;
      -moz-animation-delay: 12s;
      -o-animation-delay: 12s;
      -ms-animation-delay: 12s;
      animation-delay: 12s;
    }
    &:nth-child(3) {
      background-image: url(https://gd-hbimg.huaban.com/df96f56f2184c854719ef51cde57d2abfd6d3e244f42c-XrcCrA_fw658webp);
      -webkit-animation-delay: 24s;
      -moz-animation-delay: 24s;
      -o-animation-delay: 24s;
      -ms-animation-delay: 24s;
      animation-delay: 24s;
    }
    &:nth-child(4) {
      background-image: url(https://gd-hbimg.huaban.com/c1ada503722da828ffd8470578a455271352a683b527e-UPzneM_fw658webp);
      animation-delay: 36s;
    }
  }
}
@-webkit-keyframes imgAnimation {
  0% {
    opacity: 0;
    -webkit-animation-timing-function: ease-in;
  }
  8% {
    opacity: 1;
    -webkit-transform: scale(1.1);
    -webkit-animation-timing-function: ease-out;
  }
  17% {
    opacity: 1;
    -webkit-transform: scale(1.2);
  }
  25% {
    opacity: 0;
    -webkit-transform: scale(1.3);
  }
  100% {
    opacity: 0;
  }
}
@keyframes imgAnimation {
  0% {
    opacity: 0;
    animation-timing-function: ease-in;
  }
  8% {
    opacity: 1;
    transform: scale(1.1);
    animation-timing-function: ease-out;
  }
  17% {
    opacity: 1;
    transform: scale(1.2);
  }
  25% {
    opacity: 0;
    transform: scale(1.3);
  }
  100% {
    opacity: 0;
  }
}
</style>
