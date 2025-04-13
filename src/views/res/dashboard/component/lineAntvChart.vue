和<template>
  <div id="flareTarget">
    <!-- <dv-border-box10> -->
      <div class="flare-container">
        <div class="flare-title text-left padding-left padding-top-xs">{{title}}</div>
        <div ref="barAntvChart" class="echartDiv" :style="style" :id="uid"></div>
      </div>
    <!-- </dv-border-box10> -->
  </div>
</template>

<script lang="ts">
import { Chart } from '@antv/g2';
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref, toRefs } from 'vue';
export default {
  props: {
    type:{
      type: String,
      default: 'interval',
    },
    title: {
      type: String,
      default: '',
    },
    color:{
      type: String,
      default: "orange"
    },
    style: {
      type: String,
      default: "width:100%;height: 10vh"
    },
    encodeX: {
      type: String,
      default: ""
    },
    encodeY: {
      type: String,
      default: ""
    },
    encodeV: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: [
      ],
    },
  },
  setup(props) {
    
    let uid = ref('');
    const {proxy} = getCurrentInstance() as any;
    let state = reactive({
      uid
    })
    onBeforeMount(() => {
      uid.value = `bar-antv-charts-uid-${parseInt((Math.random() * 1000000).toString())}`;
    });

        //挂载
    onMounted(async () => {
      const chartDom = document.getElementById(uid.value);

        const chart = new Chart({
          container: chartDom,
          autoFit: true,
          depth:1,
          paddingTop:0,
          paddingBottom:10,
          padding:20,
        });
        chart
          .line()
          .data(props.data)
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
          tickCount: 4,
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
        // .encode('shape',"smooth")
          .encode('x', [props.encodeX])
          .encode('y', [props.encodeY])
          
          .encode('text', [props.encodeV])
          //.encode('color', ['linear-gradient(270deg, #7ec2f3 0%, #7ec2f3 30%, #1890ff 100%)','linear-gradient(270deg, #7ec2f3 0%, #7ec2f3 30%, #1890ff 100%)','linear-gradient(270deg, #7ec2f3 0%, #7ec2f3 30%, #1890ff 100%)'])
          .encode('color', props.color)
          .style('shape', 'smooth')
          
          .transform({ type: 'dodgeX' })
          .label({
            text: props.encodeV,
            position: 'top',
            dy: -10,
            fill: '#fff',
            fontSize: 12,
          })
          .tooltip({ name: props.encodeV, channel: 'y' })
          .legend({
            show:false,
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

</style>