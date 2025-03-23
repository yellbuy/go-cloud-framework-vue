<template>
  <div id="flareTarget">
    <div id="container"/>
  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import {Chart} from "@antv/g2";
import {onMounted} from "vue";

export default {
  setup() {
    onMounted(() => {
      const data = [
        {type: '基本富裕达标户数占比', percent: 50, color: '#26c49b'},
        {type: '基本富裕实现村数占比', percent: 75, color: '#fdd023'}
      ];

      const chart = new Chart({
        container: 'container',
        autoFit: true,
      });

      const facetRect = chart
          .facetRect()
          .data(data)
          .encode('x', 'type')
          .axis(false)
          .legend(false)
          .view()
          .attr('frame', false)
          .coordinate({type: 'theta', innerRadius: 0.5, outerRadius: 0.8});

      facetRect
          .interval()
          .encode('y', 100)
          .scale('y', {zero: true})
          .style('fill', '#051c48')
          .tooltip(false)
          .animate(false);

      facetRect
          .interval()
          .encode('y', 'percent')
          .encode('color', 'color')
          .scale('color', {type: 'identity'})
          .tooltip((data) => ({
            name: data.type,
            value: data.percent,
          }))
          .animate('enter', {type: 'waveIn', duration: 1000});

      facetRect
          .text()
          .encode('text', 'type')
          .style('textAlign', 'center')
          .style('textBaseline', 'middle')
          .style('fontSize', 25)
          .style('color', '#fdd625')
          .style('fill', '#28A2CEFF')
          .style('x', '50%')
          .style('y', '50%')
          .style('dy', -20);

      facetRect
          .text()
          .encode('text', 'percent')
          .style('textAlign', 'center')
          .style('textBaseline', 'middle')
          .style('fontSize', 30)
          .style('fontWeight', 500)
          .style('color', '#28A2CEFF')
          .style('fill', '#28A2CEFF')
          .style('x', '50%')
          .style('y', '50%')
          .style('dy', 20);

      chart.render();
    })
    return {}
  },
}
</script>

<style lang='scss' scoped>
</style>