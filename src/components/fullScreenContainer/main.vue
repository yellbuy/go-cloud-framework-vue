<template>
	<div id="yb-full-screen-container" :ref="ref">
	  <template v-if="ready">
		<slot></slot>
	  </template>
	</div>
  </template>
  
  <script>
import autoResize from '../fullScreenContainer/autoResize'
  
  export default {
	name: 'YbFullScreenContainer',
	mixins: [autoResize],
	data () {
	  return {
		ref: 'full-screen-container',
		allWidth: 0,
		scale: 0,
		datavRoot: '',
		ready: false
	  }
	},
	methods: {
	  afterAutoResizeMixinInit () {
		const { initConfig, setAppScale } = this
  
		initConfig()
  
		setAppScale()
  
		this.ready = true
	  },
	  initConfig () {
		const { dom } = this
		const { width, height } = screen
  
		this.allWidth = 1920
		this.allHeight = 1080
  
		dom.style.width = `1920px`
		dom.style.height = `1080px`
	  },
	  setAppScale () {
		const { allWidth,allHeight, dom } = this
  
		const currentWidth = document.body.clientWidth
		const currentHeight = document.body.clientHeight
		const scaleWidth=currentWidth / allWidth;
		const scaleHeight=currentHeight / allHeight;
		console.log("scale:",scaleWidth,scaleHeight)
		dom.style.transform = `scale(${scaleWidth},${scaleHeight})`
	  },
	  onResize () {
		const { setAppScale } = this
  
		setAppScale()
	  }
	}
  }
  </script>
  
  <style lang="less">
  #yb-full-screen-container {
	position: fixed;
	top: 0px;
	left: 0px;
	overflow: hidden;
	transform-origin: left top;
	z-index: 999;
  }
  </style>