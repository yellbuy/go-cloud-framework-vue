<template>
  <div >
    <div ref="barCountyDjyc" class="echartDiv" id="barCountyDjyc" ></div>
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
          { name: '：矛盾纠纷化解率', 年份: '2024', 达标率: 92, 农村:22803 },
          { name: '：矛盾纠纷化解率', 年份: '2025', 达标率: 94, 农村:24217 },
          { name: '：矛盾纠纷化解率', 年份: '2030', 达标率: 98, 农村:25834 },
          { name: '社会治安安全感满意度', 年份: '2024', 达标率: 86, 农村: 21926 },
          { name: '社会治安安全感满意度', 年份: '2025', 达标率: 90, 农村:22978 },
          { name: '社会治安安全感满意度', 年份: '2030', 达标率: 98, 农村:24553 },
          { name: '政务服务好评率', 年份: '2024', 达标率: 86, 农村: 21926 },
          { name: '政务服务好评率', 年份: '2025', 达标率: 90, 农村:22978 },
          { name: '政务服务好评率', 年份: '2030', 达标率: 98, 农村:24553 },
        ];

        const chart = new Chart({
          container: 'barCountyDjyc',
          autoFit: true,
          depth:1,
          padding:20,
        });

        chart
          .interval()
          .data(data)
          .axis('y', { 
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
          .encode('x', '年份')
          .encode('y', ['达标率'])
          .encode('color', 'name')
          
          .encode('text', ['达标率'])
          .transform({ type: 'dodgeX' })
          .label({
            text: '效率',
            render: (text, datum) => {
              return `
                <div style="left:-50%;position:relative;font-size:0.8rem;color:white;">
                  ${datum['达标率']}%</span>
                </div>
              `;
            },
          })
          // .label({'生产总值': {
          //   content: (data) => `${data['年份']}: ${data['生产总值']}`, // 设置标签内容格式
          //   style: { // 设置标签样式
          //     fill: '#000', // 标签文字颜色
          //     shadowBlur: 2, // 标签文字阴影模糊大小
          //     shadowColor: 'rgba(0, 0, 0, .45)' // 标签文字阴影颜色
          //   },
          //   offset: 10 // 设置标签偏移量，可以根据需要调整以避免遮挡柱子本身或其他标签
          // }})
          .tooltip({ name: '名称', channel: 'color' })
          .tooltip({ name: '效率%', channel: 'y' })
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
          // .encode('y', '达标率')
          // .encode('text', '达标率')
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
  height: 40.5vh;
}

</style>