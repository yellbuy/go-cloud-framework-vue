<template>
    <div class="scrollRankingProgress" :ref="ref">
      <div
        class="row-item"
        v-for="(item, i) in rows"
        :key="item.toString() + item.scroll"
        :style="`height: ${heights[i]}px;`"
      >
        <div class="ranking-info">
          <div class="rank" :style="`color:${mergedConfig.color}`">No.{{ item.ranking }}</div>
          <div class="info-name" v-html="item.name" />
          <div class="ranking-value">{{ mergedConfig.valueFormatter ? mergedConfig.valueFormatter(item) : item.value + mergedConfig.unit }}</div>
        </div>
  
        <div class="ranking-column">
          <div
            class="inside-column"
            :style="`width: ${item.percent}%;background-color:${mergedConfig.color}`"
          >
            <div class="shine" />
          </div>
        </div>
      </div>
    </div>
    <svg width="100%" height="100%" style="transform: translate(0, -100%);" v-if="mergedConfig && (mergedConfig.labelLineData.length > 0 || mergedConfig.labelTextData.length > 0)">
              <!-- 创建一个竖线，x1和x2相同，y1和y2不同，从而形成一条竖线 -->
        <line v-for="(item, i) in mergedConfig.labelLineData" :x1="item.x1" :y1="item.y1"  :x2="item.x2" :y2="item.y2" :style="item.style" :key="i"></line>
        
        <text v-for="(item, i) in mergedConfig.labelTextData" :x="item.x" :y="item.y" :style="item.style" :key="i">{{ item.text }}</text>
    </svg>
  </template> 
  
  <script>
  import autoResize from './autoResize'
  
  import { deepMerge } from '@jiaminghi/charts/lib/util/index'
  
  import { deepClone } from '@jiaminghi/c-render/lib/plugin/util'
  
  export default {
    name: 'DvScrollRankingProgress',
    mixins: [autoResize],
    props: {
      config: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        ref: 'scroll-ranking-progress',
  
        defaultConfig: {
          /**
           * @description Board data
           * @type {Array<Object>}
           * @default data = []
           */
          data: [],
          /**
           * @description Row num
           * @type {Number}
           * @default rowNum = 5
           */
          rowNum: 5,
          /**
           * @description Scroll wait time
           * @type {Number}
           * @default waitTime = 2000
           */
          waitTime: 2000,
          /**
           * @description Carousel type
           * @type {String}
           * @default carousel = 'single'
           * @example carousel = 'single' | 'page'
           */
          carousel: 'single',
          /**
           * @description Value unit
           * @type {String}
           * @default unit = ''
           * @example unit = 'ton'
           */
          unit: '',
          /**
           * @description Auto sort by value
           * @type {Boolean}
           * @default sort = true
           */
          sort: true,
          /**
           * @description Value formatter
           * @type {Function}
           * @default valueFormatter = null
           */
          valueFormatter: null,
          color:"#1370fb",
          labelLineData:[],
          labelTextData:[],
        },
  
        mergedConfig: null,
  
        rowsData: [],
  
        rows: [],
  
        heights: [],
  
        animationIndex: 0,
  
        animationHandler: '',
        
  
        updater: 0
      }
    },
    watch: {
      config () {
        const { stopAnimation, calcData } = this
  
        stopAnimation()
  
        calcData()
      }
    },
    methods: {
      afterAutoResizeMixinInit () {
        const { calcData } = this
  
        calcData()
      },
      onResize () {
        const { mergedConfig, calcHeights } = this
  
        if (!mergedConfig) return
  
        calcHeights(true)
      },
      calcData () {
        const { mergeConfig, calcRowsData } = this
  
        mergeConfig()
  
        calcRowsData()
  
        const { calcHeights } = this
  
        calcHeights()
  
        const { animation } = this
  
        animation(true)
      },
      mergeConfig () {
        let { config, defaultConfig } = this
  
        this.mergedConfig = deepMerge(deepClone(defaultConfig, true), config || {})
      },
      calcRowsData () {
        let { data, rowNum, sort } = this.mergedConfig
  
        sort && data.sort(({ value: a }, { value: b }) => {
          if (a > b) return -1
          if (a < b) return 1
          if (a === b) return 0
        })
  
        const value = data.map(({ value }) => value)
        
        const min = Math.min(...value) || 0
  
        // abs of min
        const minAbs = Math.abs(min)
  
        const max = Math.max(...value) || 0
  
        // abs of max
        const maxAbs = Math.abs(max)
  
        const total = max + minAbs
  
        //data = data.map((row, i) => ({ ...row, ranking: i + 1, percent: row.value / total * 100 }))
        data = data.map((row, i) => ({ ...row, ranking: i + 1, percent: row.value }))
  
        const rowLength = data.length
  
        if (rowLength > rowNum && rowLength < 2 * rowNum) {
          data = [...data, ...data]
        }
  
        data = data.map((d, i) => ({ ...d, scroll: i }))
  
        this.rowsData = data
        this.rows = data
      },
      calcHeights (onresize = false) {
        const { height, mergedConfig } = this
  
        const { rowNum, data } = mergedConfig
  
        const avgHeight = height / rowNum
  
        this.avgHeight = avgHeight
  
        if (!onresize) this.heights = new Array(data.length).fill(avgHeight)
      },
      async animation (start = false) {
        let { avgHeight, animationIndex, mergedConfig, rowsData, animation, updater } = this
  
        const { waitTime, carousel, rowNum } = mergedConfig
  
        const rowLength = rowsData.length
  
        if (rowNum >= rowLength) return
  
        if (start) {
          await new Promise(resolve => setTimeout(resolve, waitTime))
          if (updater !== this.updater) return
        }
  
        const animationNum = carousel === 'single' ? 1 : rowNum
  
        let rows = rowsData.slice(animationIndex)
        rows.push(...rowsData.slice(0, animationIndex))
  
        this.rows = rows.slice(0, rowNum + 1)
        this.heights = new Array(rowLength).fill(avgHeight)
  
        await new Promise(resolve => setTimeout(resolve, 300))
        if (updater !== this.updater) return
  
        this.heights.splice(0, animationNum, ...new Array(animationNum).fill(0))
  
        animationIndex += animationNum
  
        const back = animationIndex - rowLength
        if (back >= 0) animationIndex = back
  
        this.animationIndex = animationIndex
        this.animationHandler = setTimeout(animation, waitTime - 300)
      },
      stopAnimation () {
        const { animationHandler, updater } = this
  
        this.updater = (updater + 1) % 999999
  
        if (!animationHandler) return
  
        clearTimeout(animationHandler)
      },
    },
    destroyed () {
      const { stopAnimation } = this
  
      stopAnimation()
    }
  }
  </script>
  
  <style lang="less">
  @color: #1370fb;
  
  .scrollRankingProgress {
    width: 100%;
    height: 100%;
    color: #fff;
    overflow: hidden;
  
    .row-item {
      transition: all 0.3s;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
    }
  
    .ranking-info {
      display: flex;
      width: 100%;
      font-size: 13px;
      text-align: left;
      .rank {
        width: 40px;
        color: @color;
      }
  
      .info-name {
        flex: 1;
        
      }
    }
  
    .ranking-column {
      border-bottom: 2px solid fade(@color, 50);
      margin-top: 5px;
      text-align:left;

      .inside-column {
        position: relative;
        height: 6px;
        background-color: @color;
        margin-bottom: 2px;
        border-radius: 1px;
        overflow: hidden;
      }
  
      .shine {
        position: absolute;
        left: 0%;
        top: 2px;
        height: 2px;
        width: 50px;
        transform: translateX(-100%);
        background: radial-gradient(rgb(40, 248, 255) 5%, transparent 80%);
        animation: shine 3s ease-in-out infinite alternate;
      }
    }
  }
  
  @keyframes shine {
    80% {
      left: 0%;
      transform: translateX(-100%);
    }
  
    100% {
      left: 100%;
      transform: translateX(0%);
    }
  }
  </style>