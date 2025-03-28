<template>
  <div id="flareTarget">
    <dv-border-box10>
      <div class="flare-container">
        <div class="flare-title" style="text-align: left;padding-left:10px">村共创情况</div>
        <div ref="actVillage" class="actVillage" id="actVillage"></div>
      </div>
    </dv-border-box10>
  </div>
</template>

<script lang="ts">
import { Chart } from '@antv/g2';
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
export default {
  setup() {
    const { proxy } = getCurrentInstance() as any;
    let state = reactive({
    })
    
        //挂载
    onMounted(async () => {
          const chart = new Chart({
            container: 'actVillage',
            autoFit: true,
            depth:1,
            padding:0,
            
          })
          chart
            .data([
              {
                name: '三超 - 60%',
                达标率: 0.6,
                color: '#1ad5de',
                icon: 'https://gw.alipayobjects.com/zos/antfincdn/ck11Y6aRrz/shangjiantou.png',
              },
              {
                name: '四优 - 80%',
                达标率: 0.8,
                color: '#a0ff03',
                icon: 'https://gw.alipayobjects.com/zos/antfincdn/zY2JB7hhrO/shuangjiantou.png',
              },
              {
                name: '两强 - 40%',
                达标率: 0.4,
                color: '#e90b3a',
                icon: 'https://gw.alipayobjects.com/zos/antfincdn/%24qBxSxdK05/jiantou.png',
              },
            ])
            .coordinate({ type: 'radial', innerRadius: 0.2 });

          chart
            .interval()
            .encode('x', 'name')
            .encode('y', 1)
            .encode('size', 52)
            .encode('color', 'color')
            .scale('color', { type: 'identity' })
            .style('fillOpacity', 0.25)
            .animate(false);

          chart
            .interval()
            .encode('x', 'name')
            .encode('y', '达标率')
            .encode('color', 'color')
            .encode('size', 52)
            .style('radius', 26)
            .style('shadowColor', 'rgba(0,0,0,0.45)')
            .style('shadowBlur', 20)
            .style('shadowOffsetX', -2)
            .style('shadowOffsetY', -5)
            .label({
              text: 'name',
              //transform: [{ type: 'contrastReverse' }],
              dy: 10,
              itemLabelFill:"white",
              itemLableFontSize:20,
              itemLabelLineDash:[1,1],
              itemLabelSpacing:2,
              itemLabelStroke:"orange",
              fontStyle: 'italic',
              itemLabelFontWeight:500
            })
            .tooltip({ title: 'name' })
            .axis(false)
            .animate('enter', {
              type: 'waveIn',
              easing: 'easing-out-bounce',
              duration: 1000,
            });

          chart
            .image()
            .encode('x', 'name')
            .encode('y', 0)
            .encode('src', (d) => d.icon)
            .encode('size', 12)
            .style('transform', 'translateX(10)');

          chart.legend({
            color: {
              length: 400,
              position: '',
              layout: { justifyContent: 'top' },
            },
          }).render();
      })
      return {
        ...toRefs(state),
      }
    },
  }
</script>
 
<style lang='scss' scoped>
#flareTarget{
  margin:10px 10px;
}
.actVillage {
  width: 100%;
  height:39.5vh;
  padding-bottom:1vh;
}
.flare-title{
  text-align: left;
  padding-left:10px;
  color:yellow;
  background-image: linear-gradient(to bottom,rgb(83, 77, 237),rgb(8, 3, 32));
  border-radius: 2px;
  margin-top: 1vh;
  height: 5vh;
  font-family: 'LiSu';
  font-weight: bold;
  text-align: 'left' !important;
  padding-top:6px;
  font-size: 20px;
}
</style>