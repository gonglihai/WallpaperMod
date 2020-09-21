<template>
  <div @mousedown="onMousedown" class="pointer-clock">
    <ul class="scale">
      <li
        v-for="index in 60"
        :key="index"
        :style="{
          transform: 'rotate('+ index * 6 +'deg) translate(-190px, '+ (index % 5 == 0 ? '-1px' : '-0.5px')+')',
          width: index % 5 == 0 ? '10px' : '5px',
          height: index % 5 == 0 ? '2px' : '1px'
        }"
      ></li>
    </ul>
    <div
      class="hour-hand"
      :style="{transform: 'rotate(' + (date.getHours() * 30 + date.getMinutes() * 0.5 - 90 )+ 'deg) translate(0,-50%)'}"
    ></div>
    <div
      class="minute-hand"
      :style="{transform: 'rotate(' + ((date.getMinutes() * 6) + (date.getSeconds() * 0.1 ) - 90) + 'deg) translate(0,-50%)'}"
    ></div>
    <div
      class="second-hand"
      :style="{transform: 'rotate(' + secondsDeg + 'deg) translate(0,-50%)'}"
    ></div>
    <div class="center"></div>
  </div>
</template>

<script>
export default {
  name: "PointerClock",
  props: { date: Date },
  data: function () {
    return {
      secondsDeg: this.date.getSeconds() * 6 - 90, //秒针的角度
    };
  },
  watch: {
    date: function () {
      this.secondsDeg += 6;
    },
  },
  methods: {
    /**
     * 鼠标按下事件
     * @param {Event} e  按下事件
     */
    onMousedown: function (e) {
      //触发父级事件
      this.$emit("component-onmousedown", e, this.$el, "pointerClock");
    },
  },
};
</script>

<style>
.pointer-clock {
  background: #fefefe;
  border-radius: 50%;
  box-shadow: 0px 0px 5px #1e1e1e;
  height: 400px;
  width: 400px;
  position: absolute;
}

/* 刻度 */
.pointer-clock .scale li {
  list-style: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 0 0;
  background: #1e1e1e;
  border-radius: 1px;
}

/* 中间的圆圈 */
.pointer-clock .center {
  width: 5%;
  height: 5%;
  border-radius: 50%;
  background: #2e2e2e;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 时针 */
.pointer-clock .hour-hand {
  width: 20%;
  height: 2%;
  border-radius: 5px;
  background: #2e2e2e;
  transform-origin: 0 0;
  position: absolute;
  top: 50%;
  left: 50%;
}

/* 分针 */
.pointer-clock .minute-hand {
  width: 30%;
  height: 2%;
  border-radius: 5px;
  background: #2e2e2e;
  transform-origin: 0 0;
  position: absolute;
  top: 50%;
  left: 50%;
}

/* 秒针 */
.pointer-clock .second-hand {
  width: 37%;
  height: 1%;
  border-radius: 5px;
  background: #dd2a00;
  transition: transform 0.3s;
  transform-origin: 0 0;
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>