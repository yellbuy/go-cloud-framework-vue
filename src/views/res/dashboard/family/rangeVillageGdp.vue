<template>
  <div id="flareTarget">
    <dv-border-box10>
      <div class="flare-container">
        <div class="flare-title" style="text-align: left;padding-left:10px">仁和区生产总值(亿元)</div>
        <div ref="echart" class="echartDiv" id="container"></div>
      </div>
    </dv-border-box10>
  </div>
</template>

<script lang="ts">
import {Chart, register} from '@antv/g2';
import {getCurrentInstance, onMounted, reactive, toRefs} from 'vue';

export default {
  setup() {
    const {proxy} = getCurrentInstance() as any;
    let state = reactive({})

    register('shape.interval.column25d', myColumn);

    // Process data.
    function myColumn({fill, stroke}, context) {
      return (points) => {
        const x3 = points[1][0] - points[0][0];
        const x4 = x3 / 2 + points[0][0];
        const {document} = context;
        const g = document.createElement('g', {});

        const r = document.createElement('polygon', {
          style: {
            points: [
              [points[0][0], points[0][1]],
              [x4, points[1][1] + 8],
              [x4, points[3][1] + 8],
              [points[3][0], points[3][1]],
            ],
            fill: 'rgba(114, 177, 207, 0.5)',
            stroke: 'rgba(0,0,0,0.1)',
            strokeOpacity: 0.1,
            inset: 30,
          },
        });

        const p = document.createElement('polygon', {
          style: {
            points: [
              [x4, points[1][1] + 8],
              [points[1][0], points[1][1]],
              [points[2][0], points[2][1]],
              [x4, points[2][1] + 8],
            ],
            fill: 'rgba(126, 212, 236, 0.5)',
            stroke: 'rgba(0,0,0,0.3)',
            strokeOpacity: 0.1,
          },
        });

        const t = document.createElement('polygon', {
          style: {
            points: [
              [points[0][0], points[0][1]],
              [x4, points[1][1] - 8],
              [points[1][0], points[1][1]],
              [x4, points[1][1] + 8],
            ],
            fill: 'rgba(173, 240, 255, 0.65)',
          },
        });

        g.appendChild(r);
        g.appendChild(p);
        g.appendChild(t);

        return g;
      };
    }

    // Process data.
    function overThreshold(data, threshold) {
      return data
          .filter((d) => d['Value'] >= threshold)
          .map(({Year: x, Value: y}) => ({x: [x, x], y: [threshold, y]}));
    }

    //挂载
    onMounted(async () => {
      //https://g2.antv.antgroup.com/api/chart
      const chart = new Chart({
        container: 'container',
        autoFit: true,
        depth: 1,
        padding: 20,
      });

      chart
          .data([
            {Year: 2022, Value: 257.74},
            {Year: 2023, Value: 274.13},
            {Year: 2024, Value: 287.32},
          ])
          .axis('y', {
            tick: true,
            tickCount: 5,
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
            lineLineWidth: 2,
            //titleStroke: 'rgb(252.5, 245.7, 235.5)',
            lineStroke: 'orange',
            label: true,
            labelFill: "rgb(252.5, 245.7, 235.5)",
            labelFontSize: 10,
            //labelFontFamily:"Arial",
            labelSpacing: 30,

            grid: true,
            gridLineWidth: 2,
            gridLineDash: [4, 4],
            gridStrokeOpacity: 0.5,
            gridStroke: "white",
            //gridAreaFill:"white",
            animate: true,
            // Tick
          })
          .axis('x', {

            arrow: false,
            tick: false,
            tickCount: 10,
            //tickLength: -20,
            title: false,
            titleStroke: 'orange',
            titlePosition: 'left',
            label: true,
            labelFill: "rgb(252.5, 245.7, 235.5)",
            labelFontSize: 10,
            labelSpacing: 10,
            // titleFill: 'steelblue',
            line: true,
            lineArrowOffset: 2,
            lineArrowSize: 6,
            lineLineWidth: 2,

            lineStroke: 'orange',

            grid: false,
            gridLineWidth: 2,
            gridLineDash: [2, 2],
            gridStrokeOpacity: 0.5,
            gridStroke: "white",
            //gridAreaFill:"white",
            animate: true,
            // Tick

          });

      chart.interval().encode('x', 'Year').encode('y', 'Value')
          .style('shape', 'column25d')
          .encode('color', 'linear-gradient(270deg, #7ec2f3 0%, #7ec2f3 30%, #1890ff 100%)')
          // .interaction('tooltip', {
          //   render: (event, { title, items }) => `<div style="padding:10;background-color:rgba(128, 128, 128, 0.5)">
          //   <h3 >${title}</h3>
          //   <ul>${items.map(
          //     (d) =>
          //       `<li><span style="color: ${d.color}">${d.name}</span> ${d.value}</li>`,
          //   )}</ul>
          //   </div>`,
          // })
          .tooltip({
            title: {channel: 'x'},
            items: [{channel: 'y', name: "产值（亿元）"}],
          })
          .scale('x', {padding: 0.4});

      chart
          .range()
          .data({
            transform: [
              {
                type: 'custom',
                callback: (data: any) => overThreshold(data, 280),
              },
            ],
          })
          .encode('x', 'x')
          .encode('y', 'y')
          //.encode('color', 'linear-gradient(270deg, #ffffff 0%, #7ec2f3 50%, #1890ff 100%)')
          .style('fill', 'lightgreen')
          .style('fillOpacity', 0.5)
          .scale('x', {padding: 0.4})
          //.style('maxWidth', 200)
          .viewStyle({
            //viewFill: 'red',
            viewFillOpacity: 0,
            //contentFill: 'yellow',
          })

      chart
          .lineY()
          .data([280])
          .style('fill', 'rgb(239.8, 248.9, 235.3)')
          //.style('lineDash', [10, 1])
          .style('stroke', 'rgb(239.8, 248.9, 235.3)')
          .style('lineWidth', 1)
          .style('arrow', false)
          .label({
            text: '达标线 280',
            position: 'right',
            textBaseline: 'bottom',
            fill: 'lightgreen',
            background: false,
            //backgroundFill: '#F4664A',
            backgroundOpacity: 0.5,
          });
      chart.render();
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang='scss' scoped>
#flareTarget {
  margin: 10px 10px;
}

.echartDiv {
  width: 100%;
  height: 27vh;
}

.flare-title {
  background-image: linear-gradient(to right, rgb(83, 78, 234), rgb(21, 6, 110));
  border-radius: 4px;
  margin-top: 1vh;
  height: 3vh;
  font-family: 'LiSu';
  font-weight: bold;
  text-align: 'left' !important;
  font-size: 18px;
}
</style>