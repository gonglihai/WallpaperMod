import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//监听属性
window.wallpaperPropertyListener = {
  applyUserProperties: function (properties) {
    app.readProperty(properties);
  },
}
var app = new Vue({
  render: h => h(App),
  methods: {
    readProperty: function (properties) {
      var app0 = this.$children[0];
      if (properties.pointerclock) {
        app0.pointerClock.show = properties.pointerclock.value;
      }
      if (properties.wallpaperimg) {
        app0.wallpaperSrc = decodeURIComponent(properties.wallpaperimg.value);
      }
    }
  }
}).$mount('#app');

