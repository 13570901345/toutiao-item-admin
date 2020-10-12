<template>
  <div class="datafans">
    粉丝管理
    <div ref="main" style="width: 600px; height: 400px"></div>
    <mapdata />
  </div>
</template>

<script>
import echarts from 'echarts'

import mapdata from "./compentends/main-map"
export default {
  name: "fans",
  components: {
      mapdata
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    let myChart = echarts.init(this.$refs.main);
    let option = {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };
    myChart.setOption(option);
  },
  methods: {},
};
</script>

<style lang="less" scoped>
</style>