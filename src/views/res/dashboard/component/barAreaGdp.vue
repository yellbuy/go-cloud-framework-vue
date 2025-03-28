<template>
  <div id="flareTarget">
    <dv-border-box10>
      <div class="flare-container">
        <div class="flare-title text-left padding-left padding-top-xs">地区生产总值对比（单位：亿元）</div>
        <div ref="echart" class="echartDiv" id="barAreaGdp"></div>
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
    
    //register('shape.interval.column25d', myColumn);

    // Process data.
    // function myColumn({ fill, stroke }, context) {
    //   return (points) => {
    //     const x3 = points[1][0] - points[0][0];
    //     const x4 = x3 / 2 + points[0][0];
    //     const { document } = context;
    //     const g = document.createElement('g', {});

    //     const r = document.createElement('polygon', {
    //       style: {
    //         points: [
    //           [points[0][0], points[0][1]],
    //           [x4, points[1][1] + 8],
    //           [x4, points[3][1] + 8],
    //           [points[3][0], points[3][1]],
    //         ],
    //         fill: 'rgba(14, 77, 207, 0.7)',
    //         stroke: 'rgba(0,0,0,0.1)',
    //         strokeOpacity: 0.1,
    //         inset: 30,
    //       },
    //     });

    //     const p = document.createElement('polygon', {
    //       style: {
    //         points: [
    //           [x4, points[1][1] + 8],
    //           [points[1][0], points[1][1]],
    //           [points[2][0], points[2][1]],
    //           [x4, points[2][1] + 8],
    //         ],
    //         fill: 'rgba(26, 112, 236, 0.7)',
    //         stroke: 'rgba(0,0,0,0.3)',
    //         strokeOpacity: 0.1,
    //       },
    //     });

    //     const t = document.createElement('polygon', {
    //       style: {
    //         points: [
    //           [points[0][0], points[0][1]],
    //           [x4, points[1][1] - 8],
    //           [points[1][0], points[1][1]],
    //           [x4, points[1][1] + 8],
    //         ],
    //         fill: 'rgba(73, 140, 255, 0.65)',
    //       },
    //     });

    //     g.appendChild(r);
    //     g.appendChild(p);
    //     g.appendChild(t);

    //     return g;
    //   };
    // }

        //挂载
    onMounted(async () => {
        const data = [
          // { name: '仁和区', 年份: '2022', 城镇: 44245, 农村:22803 },
          { name: '仁和区', 年份: '2023', 生产总值: 274.13 },
          { name: '仁和区', 年份: '2024', 生产总值: 287.32},
          // { name: '攀枝花市', 年份: '2022', 城镇: 46009, 农村: 21926 },
          { name: '攀枝花市', 年份: '2023', 生产总值: 1324.12 },
          { name: '攀枝花市', 年份: '2024', 生产总值: 1395.24 },
          // { name: '浙江省衢江区', 年份: '2022', 城镇: 0, 农村:0 },
          { name: '浙江省衢江区', 年份: '2023', 生产总值: 327.72 },
          { name: '浙江省衢江区', 年份: '2024', 生产总值: 362.75},
        ];

        const chart = new Chart({
          container: 'barAreaGdp',
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
          .encode('x', ['年份'])
          .encode('y', ['生产总值'])
          
          .encode('text', ['生产总值'])
          //.encode('color', ['linear-gradient(270deg, #7ec2f3 0%, #7ec2f3 30%, #1890ff 100%)','linear-gradient(270deg, #7ec2f3 0%, #7ec2f3 30%, #1890ff 100%)','linear-gradient(270deg, #7ec2f3 0%, #7ec2f3 30%, #1890ff 100%)'])
          .encode('color', 'name')
          //.style('shape', 'column25d')
          
          .transform({ type: 'dodgeX' })
          .label({
            text: '生产总值',
            render: (text, datum) => {
              return `
                <div style="left:-50%;position:relative;font-size:0.8rem;color:white;">
                  ${datum['生产总值']} 亿元</span>
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
          .tooltip({ name: '区域', channel: 'color' })
          .tooltip({ name: '生产总值', channel: 'y' })
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