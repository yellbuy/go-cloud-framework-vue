<template>
  <div id="flareTarget">
    <dv-border-box10>
      <div class="flare-container">
        <div class="flare-title" style="text-align: left;padding-left:10px">城乡居民人均可支配收入对比</div>
        <div ref="echart" class="echartDiv" id="barPeopleGdp"></div>
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
          { name: '仁和区', 年份: '2022', 城镇: 44245, 农村:22803 },
          { name: '仁和区', 年份: '2023', 城镇: 46325, 农村:24217 },
          { name: '仁和区', 年份: '2024', 城镇: 48500, 农村:25834 },
          { name: '攀枝花市', 年份: '2022', 城镇: 46009, 农村: 21926 },
          { name: '攀枝花市', 年份: '2023', 城镇: 47803, 农村:22978 },
          { name: '攀枝花市', 年份: '2024', 城镇: 49931, 农村:24553 },
          { name: '浙江省衢江区', 年份: '2022', 城镇: 0, 农村:0 },
          { name: '浙江省衢江区', 年份: '2023', 城镇: 51292, 农村:30301 },
          { name: '浙江省衢江区', 年份: '2024', 城镇: 54063, 农村:32696 },
        ];

        const chart = new Chart({
          container: 'barPeopleGdp',
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
          .encode('y', '城镇')
          .encode('color', 'name')
          
          .encode('text', '城镇')
          .transform({ type: 'dodgeX' })
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
#flareTarget{
  margin:10px 10px;
}
.echartDiv {
  width: 100%;
  height:21vh;
}
.flare-title{
  background-image: linear-gradient(to right,rgb(83, 78, 234), rgb(21, 6, 110));
  border-radius: 4px;
  margin-top: 1vh;
  height: 3vh;
  font-family: 'LiSu';
  font-weight: bold;
  text-align: 'left' !important;
  font-size: 18px;
}
</style>