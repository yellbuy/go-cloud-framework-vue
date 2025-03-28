<template>
  <div id="flareTarget">
    <dv-border-box10>
      <div class="flare-container">
        <div class="flare-title text-left padding-left padding-top-xs">城乡居民人均可支配收入对比（万元）</div>
        <div ref="echart" class="echartDiv" id="barFamiryGdp"></div>
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
          { Area: '全区', Name: '低收入', 人均可支配收入: 3.2 },
          { Area: '全区', Name: '中等收入', 人均可支配收入: 6.4 },
          { Area: '全区', Name: '高收入', 人均可支配收入: 10.8 },
          { Area: '城镇', Name: '低收入', 人均可支配收入: 4.6 },
          { Area: '城镇', Name: '中等收入', 人均可支配收入: 7.8 },
          { Area: '城镇', Name: '高收入', 人均可支配收入: 12.6 },
          { Area: '农村', Name: '低收入', 人均可支配收入: 2.6 },
          { Area: '农村', Name: '中等收入', 人均可支配收入: 4.6 },
          { Area: '农村', Name: '高收入', 人均可支配收入: 8 },
        ];

        const chart = new Chart({
          container: 'barFamiryGdp',
          autoFit: true,
          depth:1,
          padding:10,
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
          .encode('x', 'Name')
          .encode('y', '人均可支配收入')
          .encode('color', 'Area')
          
          .encode('text', '人均可支配收入')
          .transform({ type: 'dodgeX' })
          .label({
            text: '人均可支配收入',
            render: (text, datum) => {
              return `
                <div style="left:-50%;position:relative;font-size:0.8rem;color:white;">
                  ${datum['人均可支配收入']} 万元</span>
                </div>
              `;
            },
          })
          .tooltip({ name: '区域', channel: 'color' })
          .tooltip({ name: '人均可支配收入', channel: 'y' })
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
  height:24vh;
}
</style>