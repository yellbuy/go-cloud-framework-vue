<template>
  <div id="top-header">
    <dv-decoration-8 class="header-left-decoration" />
    <dv-decoration-5 class="header-center-decoration" />
    <dv-decoration-8 class="header-right-decoration" :reverse="true" />
    <div class="center-title">汉  风  管  控  系  统 </div>
    <!-- <div style="position:absolute;top:10px;right:10px">
      <dv-button @click="onFullScreen" border="Border3" color="#c8161d" font-color="#e18a3b" style="margin:10px">全屏</dv-button>
    </div> -->
  </div>
</template>

<script lang="ts">
export default {
  name: "TopHeader",
  setup() {
    //重置查询条件
    
		const onFullScreen = () => {
			//admin/dashboard/app/fullScreen
      const { origin, pathname } = window.location;
      const url=`${origin}${pathname}#admin/dashboard/app/fullscreen`;
      window.open(url,"_blank");
			return false;
		};
    return {
        onFullScreen
      }
  }
};
</script>

<style lang="less">
#top-header {
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;

  .header-center-decoration {
    width: 40%;
    height: 40px;
    margin-top: 20px;
  }

  .header-left-decoration,
  .header-right-decoration {
    width: 25%;
    height: 40px;
  }

  .center-title {
    position: absolute;
    font-size: 22px;
    font-weight: bold;
    left: 50%;
    top: 5px;
    transform: translateX(-50%);
  }
}
</style>
