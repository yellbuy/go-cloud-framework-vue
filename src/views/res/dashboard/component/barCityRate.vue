<template>
  <div id="flareTarget">
    <!-- <dv-border-box10> -->
      <div class="flare-container">
        <div class="flare-title text-left padding-left padding-top-xs" style="font-size:1.1rem">常住人口城镇化率(%)</div>
        <div ref="echart" class="echartDiv" id="barCityRate"></div>
      </div>
    <!-- </dv-border-box10> -->
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
          // { name: '仁和区', 年份: '2022', 城镇: 44245, 农村:22803 },
          { name: '2023', 年份: '2023', 城镇化率: 60.10 },
          { name: '2024', 年份: '2024', 城镇化率: 61.28},
          // { name: '攀枝花市', 年份: '2022', 城镇: 46009, 农村: 21926 },
          { name: '2030', 年份: '2030', 城镇化率: 63.00 },
        ];

        const chart = new Chart({
          container: 'barCityRate',
          autoFit: true,
          depth:1,
          paddingTop:0,
          padding:10,
        });

        chart
          .interval()
          .data(data)
          .axis('y', { 
          tick:true,
          tickCount: 2,
          tickLength: -20,
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
          labelFill:"white",
          labelFontSize:10,
          //labelFontFamily:"Arial",
          labelSpacing:30,
          
          grid:true,
          gridLineWidth:2,
          gridLineDash:[4,4],
          gridStrokeOpacity:0.5,
          gridStroke:"#777",
          //gridAreaFill:"white",
          animate:true,
          // Tick
          })
          .scale('x', { padding: 0.5})
        .axis('x', { 
     
          arrow: false,
          tick:false,
          tickCount: 10,
          //tickLength: -20,
          title: false,
          titleStroke: 'orange',
          titlePosition:'left',
          label:true,
          labelFill:"#fff",
          labelStroke:"yellow",
          labelFontSize:12,
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
          .encode('x', ['年份'])
          .encode('y', ['城镇化率'])
          .encode('color', 'lightgreen')
          //.encode('color', ['linear-gradient(270deg, #7ec2f3 0%, #7ec2f3 30%, #1890ff 100%)','linear-gradient(270deg, #7ec2f3 0%, #7ec2f3 30%, #1890ff 100%)','linear-gradient(270deg, #7ec2f3 0%, #7ec2f3 30%, #1890ff 100%)'])
          //.encode('color', '年份')
          //.style('shape', 'column25d')
          
          .transform({ type: 'dodgeX' })
          .label({
            position: 'top',
            dy: -12,
            fill: '#fff',
            fontSize: 10,
            //transform: [{ type: "contrastReverse" }],
            text: '城镇化率',

            // render: (text, datum) => {
            //   return `
            //     <div style="left:-50%;position:relative;font-size:0.8rem;color:white;">
            //       ${datum['城镇化率']}</span>
            //     </div>
            //   `;
            // },
          })
          // .label({'城镇化率': {
          //   content: (data) => `${data['年份']}: ${data['城镇化率']}`, // 设置标签内容格式
          //   style: { // 设置标签样式
          //     fill: '#000', // 标签文字颜色
          //     shadowBlur: 2, // 标签文字阴影模糊大小
          //     shadowColor: 'rgba(0, 0, 0, .45)' // 标签文字阴影颜色
          //   },
          //   offset: 10 // 设置标签偏移量，可以根据需要调整以避免遮挡柱子本身或其他标签
          // }})
          .tooltip({ name: '常住人口城镇化率', channel: 'y' })
          .legend({
            color: {
              size:8,
              //itemLabelText: '图例项标签',
              itemLabelFontSize: 10,
              itemLabelLineHeight: 20,
              itemLabelTextAlign: 'left',
              itemLabelTextBaseline: 'middle',
              itemLabelFill: '#fff',
              itemLabelFillOpacity: 0.9,
              itemLabelLineWidth: 2,
              itemLabelOpacity: 1,
              itemLabelCursor: 'pointer',
            },
            size: {},
          })
         
          .interaction('elementHighlight', { background: true });
        
          // chart
          
          // .text()
          // .data(data)
          // .encode('x', '年份')
          // .encode('y', '城镇')
          // .encode('text', '城镇')
          // .style('fill', 'white')
          // .style('textAlign', 'start')

        chart.render();
      })

      return {
        ...toRefs(state),
      }
    },
  }
</script>
 
<style lang='scss' scoped>
.echartDiv {
  width: 100%;
  height:12vh;
}

</style>