<template>
  <div @mousedown="onMousedown" class="digital-clock">
    <span class="number">{{ numberFmt(date.getHours()) }}</span>
    <span class="delimiter">:</span>
    <span class="number">{{ numberFmt(date.getMinutes()) }}</span>
    <span class="delimiter">:</span>
    <span class="number">{{ numberFmt(date.getSeconds()) }}</span>
  </div>
</template>

<script>
export default {
  props: { date: Date },
  methods: {
    /**
     * 2位数字格式化
     * @param {Number} number  小时,分钟,秒数
     **/
    numberFmt: function (number) {
      var numberStr = number + "";
      if (numberStr.length < 2) {
        return "0" + numberStr;
      }
      return numberStr;
    },
    /**
     * 鼠标按下事件
     * @param {Event} e  按下事件
     */
    onMousedown: function (e) {
      //触发父级事件
      this.$emit("component-onmousedown", e, this.$el, "digitalClock");
    },
  },
};
</script>

<style scoped>
/* 数字时钟 */
.digital-clock {
  font-size: 96px;
  text-align: center;
  padding: 20px 0;
  width: 500px;
  background: #fefefe;
  border-radius: 20px;
  box-shadow: 0px 0px 5px #1e1e1e;
  position: absolute;
  color: #2e2e2e;
  font-family: Helvetica;
}

.digital-clock .number {
  display: inline-block;
  width: 110px;
  height: 110px;
  line-height: 110px;
}

.digital-clock .delimiter {
  display: inline-block;
  width: 50px;
  height: 110px;
  line-height: 110px;
}
</style>