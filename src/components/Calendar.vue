<template>
  <div @mousedown="onMousedown" class="calendar">
    <!-- 左侧公历日期 -->
    <div class="date-left">
      <div class="title">
        <span class="year">{{ date.getFullYear() }}</span
        >年<span class="month">{{ date.getMonth() + 1 }}</span
        >月
      </div>
      <div class="content">{{ oldDay }}</div>
      <div class="footer">星期{{ weekStrArr[date.getDay()] }}</div>
    </div>
    <!-- 右侧农历相关 -->
    <div class="date-right">
      <div class="title">{{ lunarCalendarMonthDay }}</div>
      <div class="content bold">{{ holiday }}</div>
      <div class="content">{{ solarTerms }}</div>
      <div class="content">{{ lunarCalendarYear }}</div>
      <div class="content">{{ lunarCalendarGZ }}</div>
      <div class="content">{{ lunarCalendarSJSF }}</div>
    </div>
  </div>
</template>

<script>
import { LUNAR_CALENDAR_DATA } from "../assets/calendarData";
export default {
  props: { date: Date },
  data: function () {
    return {
      weekStrArr: ["日", "一", "二", "三", "四", "五", "六"], //星期中文字符
      oldDay: this.date.getDate(), //当前日
      lunarCalendarThatDayData: LUNAR_CALENDAR_DATA[this.getIndex(this.date)], //当日农历数据
    };
  },
  watch: {
    date: function (newValue) {
      var newDay = newValue.getDate();
      if (this.oldDay != newDay) {
        this.lunarCalendarThatDayData =
          LUNAR_CALENDAR_DATA[this.getIndex(newValue)];
        this.oldDay = newDay;
      }
    },
  },
  methods: {
    /**
     * 获取当前日期,在calendarData数组中的顺序
     * @param date 日期
     **/
    getIndex: function (date) {
      return Math.floor(Math.abs(1599321600000 - date.getTime()) / 86400000);
    },
    /**
     * 鼠标按下事件
     * @param {Event} e  按下事件
     */
    onMousedown: function (e) {
      //触发父级事件
      this.$emit("component-onmousedown", e, this.$el, "calendar");
    },
  },
  computed: {
    /**
     * 农历月
     */
    lunarCalendarMonthDay: function () {
      return (
        this.lunarCalendarThatDayData["农历月"] +
        " " +
        this.lunarCalendarThatDayData["农历日"]
      );
    },
    /**
     * 节假日
     */
    holiday: function () {
      return (
        this.lunarCalendarThatDayData["公历节日"] +
        " " +
        this.lunarCalendarThatDayData["农历节日"] +
        " " +
        this.lunarCalendarThatDayData["特殊节日"]
      );
    },
    /**
     * 节气
     */
    solarTerms: function () {
      return (
        this.lunarCalendarThatDayData["节气"] +
        " " +
        this.lunarCalendarThatDayData["节气时间"]
      );
    },
    /**
     * 农历年
     */
    lunarCalendarYear: function () {
      return (
        this.lunarCalendarThatDayData["年干支"] +
        "年 " +
        this.lunarCalendarThatDayData["属相"]
      );
    },
    /**
     * 干支月,日
     */
    lunarCalendarGZ: function () {
      return (
        this.lunarCalendarThatDayData["月干支"] +
        "月 " +
        this.lunarCalendarThatDayData["日干支"] +
        "日"
      );
    },
    /**
     * 数九数伏
     */
    lunarCalendarSJSF: function () {
      return this.lunarCalendarThatDayData["数九数伏"];
    },
  },
};
</script>

<style>
.calendar {
  overflow: auto;
  padding: 35px 50px;
  background: #fefefe;
  border-radius: 20px;
  box-shadow: 0px 0px 5px #1e1e1e;
  width: 400px;
  position: absolute;
  color: #2e2e2e;
}

.calendar .date-left {
  float: left;
}

.calendar .date-left .title {
  text-align: center;
  font-size: 25px;
}

.calendar .date-left .title .year {
  display: inline-block;
  width: 66px;
  text-align: center;
}

.calendar .date-left .title .month {
  display: inline-block;
  width: 34px;
  text-align: center;
}

.calendar .date-left .content {
  text-align: center;
  font-size: 65px;
  padding: 5px;
  font-weight: bold;
}

.calendar .date-left .footer {
  text-align: center;
  font-size: 25px;
  letter-spacing: 5px;
}

.calendar .date-right {
  float: left;
  margin-left: 50px;
  font-size: 20px;
}

.calendar .date-right .title {
  font-size: 25px;
  margin-bottom: 15px;
}

.calendar .date-right .content {
  margin-top: 4px;
}

.calendar .date-right .bold {
  font-weight: bold;
  height: 26px;
}
</style>