<template>
  <div id="flareTarget">
    <!-- <dv-border-box10> -->
      <div class="flare-container">
        <div class="flare-title text-left padding-left padding-top-xs">居民人均可支配收入对比（万元）</div>
        <div ref="echart" class="echartDiv" id="barFamiryGdp"></div>
       
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
    
    const loadVillageData =()=>{
      const data = [
          
          { Area: '仁和区', Name: '2023',Kind:"城镇", 人均可支配收入: 4.63,color:'orange' },
          { Area: '仁和区', Name: '2024', Kind:"城镇",人均可支配收入: 4.85,color:'orange' },
          { Area: '仁和区', Name: '2030', Kind:"城镇",人均可支配收入: 6.28,color:'orange' },
          { Area: '仁和区', Name: '2023',Kind:"农村", 人均可支配收入: 2.42,color:'red' },
          { Area: '仁和区', Name: '2024', Kind:"农村",人均可支配收入: 2.58,color:'red' },
          { Area: '仁和区', Name: '2030', Kind:"农村",人均可支配收入: 3.54,color:'red' },
          // { Area: '攀枝花市', Name: '2023',Kind:"农村", 人均可支配收入: 2.3 },
          // { Area: '攀枝花市', Name: '2024',Kind:"农村", 人均可支配收入: 2.46 },
          // { Area: '浙江省衢江区', Name: '2023',Kind:"农村", 人均可支配收入: 3.03 },
          // { Area: '浙江省衢江区', Name: '2024',Kind:"农村", 人均可支配收入: 3.27 },
        ];

        const chart = new Chart({
          container: 'barFamiryGdp',
          autoFit: true,
          depth:1,
          padding:10,
        });

        chart
          .line()
          .data(data)
          // .style({
          //   fill:(d, index, data, column) =>{
          //     // for(const val of d){
          //     //   // if(val.Kind=="农村"){
          //     //   //   return 'l(270) 0:#ffffff 0.5:orange 1:red'; // 配置面积图填充颜色为渐变色
          //     //   // }
          //     //   return 'l(270) 0:#ffffff 0.5:#0000ff 1:#00ffff'; // 配置面积图填充颜色为渐变色
          //     // }
          //     return  'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'; // 配置面积图填充颜色为渐变色
          //   },
          //   fillOpacity: 0.5, // 配置area标记的填充透明度为 0.9
          // })
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
          labelFill:"rgb(252.5, 245.7, 235.5)",
          labelFontSize:14,
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
        .axis('x', { 
          
          arrow: false,
          tick:false,
          tickCount: 10,
          //tickLength: -20,
          title: false,
          titleStroke: 'orange',
          titlePosition:'left',
          label:true,
          labelFill:"white",
          labelStroke:"yellow",
          labelFontSize:12,
          labelSpacing:10,
          // titleFill: 'steelblue',
          line: true,
          lineArrowOffset: 2,
          lineArrowSize: 6,
          lineLineWidth: 1,
          
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
         .scale('x', {padding:0.1})
          .encode('x', 'Name')
          .encode('y', '人均可支配收入')
          .encode('z', 'Kind')
          .encode('color', 'Kind')
          
          .encode('text', '人均可支配收入')
          .encode('shape', 'smooth')
          .transform({ type: 'dodgeX' })
          .label({
            text: '人均可支配收入',
            position: 'top',
            dy: -10,
            fill: '#fff',
            fontSize: 12,
            // render: (text, datum) => {
            //   return `
            //     <div style="left:-50%;position:relative;font-size:0.8rem;color:white;">
            //       ${datum['人均可支配收入']}</span>
            //     </div>
            //   `;
            // },
          })
          .tooltip({ name: '类别', channel: 'z' })
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
          labelFill:"white",
          labelStroke:"yellow",
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
            position: 'top',
            dy: -16,
            fill: '#fff',
            fontSize: 14,
            text: '人均可支配收入',
            // render: (text, datum) => {
            //   return `
            //     <div style="left:-50%;position:relative;font-size:1.2rem;color:white;">
            //       ${datum['人均可支配收入']} 万</span>
            //     </div>
            //   `;
            // },
          })
          .tooltip({ name: '区域', channel: 'color' })
          .tooltip({ name: '类型', channel: 'y1' })
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
      loadVillageData()
      //loadTownData()
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
  height:16vh;
}
</style>