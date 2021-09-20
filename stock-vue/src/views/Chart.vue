<template>
  <div>
    <div ref="chart"></div>
  </div>
</template>

<script>
import { createChart } from "lightweight-charts";
import { getISData } from "@/api/stock";

export default {
  data() {
    return {
      chart: null,
    };
  },
  async mounted() {
    this.chart = createChart(this.$refs.chart, {
      width: 900,
      height: 350,
      crosshair: {
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        vertLine: {
          visible: true,
          style: 0,
          width: 2,
          color: "rgba(32, 38, 46, 0.1)",
          labelVisible: false,
        },
      },
    });
    const candleSeries = this.chart.addCandlestickSeries();
    candleSeries.setData(await this.getISData("2330"));
  },
  methods: {
    async getISData(id) {
      const data = await getISData(id).then(({ data }) => {
        return data.map((e) => {
          return { time: e.date, open: e.o, high: e.h, low: e.l, close: e.c };
        });
      });
      return data;
    },
  },
};
</script>

<style></style>
