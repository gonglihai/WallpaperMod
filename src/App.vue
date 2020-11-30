<template>
  <div id="app">
    <Wallpaper :date="date" :src="wallpaperSrc"></Wallpaper>
    <PointerClock
      v-if="pointerClock.show"
      @component-onmousedown="onMousedown"
      :date="date"
      :style="pointerClock"
    ></PointerClock>
    <Calendar
      v-if="calendar.show"
      @component-onmousedown="onMousedown"
      :date="date"
      :style="calendar"
    ></Calendar>
    <digital-clock
      v-if="digitalClock.show"
      @component-onmousedown="onMousedown"
      :date="date"
      :style="digitalClock"
    ></digital-clock>
  </div>
</template>

<script>
import Wallpaper from "./components/Wallpaper";
import PointerClock from "./components/PointerClock";
import Calendar from "./components/Calendar";
import DigitalClock from "./components/DigitalClock";

export default {
  name: "App",
  data: function () {
    return {
      wallpaperSrc: "https://book.glh.red/BingWallpaper/today",
      date: new Date(),
      pointerClock: {
        left: "20px",
        top: "20px",
        zIndex: 1,
        show: true,
      },
      calendar: {
        left: "440px",
        top: "20px",
        zIndex: 2,
        show: true,
      },
      digitalClock: {
        left: "440px",
        top: "260px",
        zIndex: 3,
        show: true,
      },
    };
  },
  methods: {
    /**
     * 定时器
     */
    timer: function () {
      var that = this;
      setInterval(function () {
        that.date = new Date();
      }, 1000);
    },
    /**
     * 子组件鼠标按下事件处理
     * @param {Event} e  事件
     * @param {Element} element 元素
     * @param {String} styleName 样式key
     */
    onMousedown: function (e, element, styleName) {
      var componentNames = ["pointerClock", "calendar", "digitalClock"];
      var length = componentNames.length;
      if (this[styleName].zIndex != length) {
        componentNames.splice(componentNames.indexOf(styleName), 1);
        for (var i = 0; i < componentNames.length; i++) {
          if (this[componentNames[i]].zIndex >= 1) {
            this[componentNames[i]].zIndex--;
          }
        }
        this[styleName].zIndex = length;
      }
      var drag = element;
      var diffX = e.clientX - drag.offsetLeft;
      var diffY = e.clientY - drag.offsetTop;
      var that = this;
      //鼠标移动
      document.onmousemove = function (event) {
        var moveX = event.clientX - diffX;
        var moveY = event.clientY - diffY;
        if (moveX < 0) {
          moveX = 0;
        } else if (moveX > window.innerWidth - drag.offsetWidth) {
          moveX = window.innerWidth - drag.offsetWidth;
        }
        if (moveY < 0) {
          moveY = 0;
        } else if (moveY > window.innerHeight - drag.offsetHeight) {
          moveY = window.innerHeight - drag.offsetHeight;
        }
        that[styleName].left = moveX + "px";
        that[styleName].top = moveY + "px";
      };
      //鼠标抬起
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
  },
  mounted: function () {
    this.timer();
  },
  watch: {
    pointerclockShow: function (newValue) {
      alert(newValue);
    },
  },
  components: {
    Wallpaper,
    PointerClock,
    Calendar,
    DigitalClock,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  background: #1e1e1e;
  user-select: none;
  color: rgb(255, 255, 255);
  overflow: hidden;
}
</style>
