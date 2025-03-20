<template>
  <div id="flareTarget">
    <dv-border-box10>
      <div class="flare-container">
        <div class="flare-title" style="text-align: left;padding-left:10px">乡进入情况</div>
        <div ref="barStreet" class="barStreet" id="barStreet"></div>
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
        const data = [
            { name: '两高-达标户', 达标率: 75 },
            { name: '两高-实现村', 达标率: 90 },
            { name: '三化-公共服务', 达标率: 82 },
            { name: '三化-基础设施', 达标率: 86 },
            { name: '三化-乡村治理', 达标率: 71 },
            { name: '三化-产业发展', 达标率: 92 },
          ];

        const chart = new Chart({
          container: 'barStreet',
          autoFit: true,
          depth:1,
          padding:20,
        })

        chart.options({
          type: 'interval',
          data: data,
          // tooltip: {
          //   title: (d) => d.name, // 设置 title
          //   items: [{ channel: 'y', valueFormatter: '.0%' }],
          // },
          encode: { x: 'name', y: '达标率' },
          scale:{'x': { padding: 0.5 }},
          // interaction:{
          //   tooltip:{
          //     render:(event, { title, items }) => `<div style="padding:10;background-color:rgba(128, 128, 128, 0.5)">
          //     <h3 >${title}</h3>
          //     <ul>${items.map(
          //       (d) =>
          //         `<li><span style="color: blue">${d.name}</span> ${d.value}%</li>`,
          //     )}</ul>
          //     </div>`
          //   }
          // },
          style: {
            fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff',
          },
        });

        chart.interaction('tooltip', true).axis('y', { 
            tick:true,
            tickCount: 5,
            tickLength: -30,
            //title: false,
            //titleFill: 'steelblue',
            // titleFontFamily:"Arial",
            // titleFontSize:6,
            // titlePosition:'left',
            line: true,
            arrow: false,
            lineArrowOffset: 2,
            lineArrowSize: 6,
            lineLineWidth: 1,
            //titleStroke: 'rgb(252.5, 245.7, 235.5)',
            lineStroke: 'orange', 
            label:true,
            labelFill:"rgb(252.5, 245.7, 235.5)",
            labelFontSize:10,
            //labelFontFamily:"Arial",
            labelSpacing:30,
            
            grid:true,
            gridLineWidth:2,
            gridLineDash:[4,4],
            gridStrokeOpacity:0.5,
            gridStroke:"white",
            //gridAreaFill:"white",
            animate:true,
            // Tick
            })
          .axis('x', { 
            
            arrow: false,
            tick:false,
            tickCount: 10,
            //tickLength: -20,
            title: false,
            titleStroke: 'orange',
            titlePosition:'left',
            label:true,
            labelFill:"rgb(252.5, 245.7, 235.5)",
            labelFontSize:10,
            labelSpacing:10,
            // titleFill: 'steelblue',
            line: true,
            lineArrowOffset: 2,
            lineArrowSize: 6,
            lineLineWidth: 2,
            
            lineStroke: 'orange',
            
            grid:false,
            gridLineWidth:2,
            gridLineDash:[2,2],
            gridStrokeOpacity:0.5,
            gridStroke:"white",
            //gridAreaFill:"white",
            animate:true,
            // Tick
          
          })
          .render();
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
.barStreet {
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