<template>
  <transition name="wallpaper">
    <img class="wallpaper" v-show="show" :src="imgSrc" @load="imgOnLoad" draggable="false" />
  </transition>
</template>

<script>
export default {
  name: "Wallpaper",
  props: {
    date: Date, //日期
    src: String, //图片地址
  },
  data: function () {
    return {
      bingImgSrc: "https://book.glh.red/BingWallpaper/today",
      imgSrc: this.src, //组件内图片图片地址
      show: false, //是否显示
      oldDay: this.date.getDate(), //老的天
      customize: false, //是否自定义
    };
  },
  watch: {
    /**
     * 监听date更新
     * @param {Date} newValue date的新值
     */
    date: function (newValue) {
      if (!this.customize) {
        var newDay = newValue.getDate();
        //当 当前天 不等于 老的天 且 当前分钟大于5时 重加载壁纸
        if (this.oldDay != newDay) {
          if (newValue.getMinutes() > 5) {
            this.oldDay = newDay;
            this.reload();
          }
        }
      }
    },
    src: function (newValue) {
      if (newValue) {
        this.customize = true;
        this.imgSrc = newValue;
      } else {
        this.customize = false;
        this.reload();
      }
    },
  },
  methods: {
    /**
     * img标签加载完事件
     **/
    imgOnLoad: function () {
      this.show = true;
    },
    /**
     * 重新加载壁纸
     */
    reload: function () {
      this.show = false;
      this.imgSrc = this.bingImgSrc + "?" + new Date().getTime();
    },
  },
};
</script>

<style>
.wallpaper {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.wallpaper-enter-active,
.wallpaper-leave-active {
  transition: opacity 1s;
}

.wallpaper-enter,
.wallpaper-leave-to {
  opacity: 0;
}
</style>