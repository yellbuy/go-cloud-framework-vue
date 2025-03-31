<template>
  <div id="flareTarget">
    <dv-border-box10>
      <div class="flare-container">
        <div class="flare-title text-left padding-left padding-top-xs" style="font-size:1.1rem">城镇居民人均可支配收入对比（万元）</div>
        <div ref="echart" class="echartDiv" id="barTownGdp"></div>
       
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
    
    const loadVillageData =()=>{
      const data = [
          { Area: '仁和区', Name: '2023',Kind:"农村", 人均可支配收入: 2.42 },
          { Area: '仁和区', Name: '2024', Kind:"农村",人均可支配收入: 2.58 },
          { Area: '攀枝花市', Name: '2023',Kind:"农村", 人均可支配收入: 2.3 },
          { Area: '攀枝花市', Name: '2024',Kind:"农村", 人均可支配收入: 2.46 },
          { Area: '浙江省衢江区', Name: '2023',Kind:"农村", 人均可支配收入: 3.03 },
          { Area: '浙江省衢江区', Name: '2024',Kind:"农村", 人均可支配收入: 3.27 },
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
          .encode('color', ['Area'])
          
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
    }

    const loadTownData =()=>{
      const data = [

          { Area: '仁和区', Name: '2023',Kind:"城镇", 人均可支配收入: 4.63 },
          { Area: '仁和区', Name: '2024', Kind:"城镇",人均可支配收入: 4.85 },
          { Area: '攀枝花市', Name: '2023',Kind:"城镇", 人均可支配收入: 4.78 },
          { Area: '攀枝花市', Name: '2024',Kind:"城镇", 人均可支配收入: 4.99 },
          { Area: '浙江省衢江区', Name: '2023',Kind:"城镇", 人均可支配收入: 5.13 },
          { Area: '浙江省衢江区', Name: '2024',Kind:"城镇", 人均可支配收入: 5.41 },
        ];

        const chart = new Chart({
          container: 'barTownGdp',
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
          .encode('y1', 'Kind')
          .encode('color', ['Area'])
          
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
    }

        //挂载
    onMounted(async () => {
      //loadVillageData()
      loadTownData()
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
  height:17vh;
}
</style>