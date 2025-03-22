<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div class="target-header">
        <div class="target-title">主要监测群体</div>
      </div>
      <div class="target-content">
        <div style="margin-top: 3rem">
          <div style="display: inline-block">
            <dv-water-level-pond :config="config1"
                                 style="width:20rem;height:20rem;display: inline-block;margin: 1rem 5rem 1rem"/>
            <div style="font-size: 2rem;margin-bottom: 2rem">低收入边缘人群</div>
          </div>
          <div style="display: inline-block">
            <dv-water-level-pond :config="config2"
                                 style="width:20rem;height:20rem;display: inline-block;margin: 1rem 5rem 1rem"/>
            <div style="font-size: 2rem;margin-bottom: 2rem">低收入一般监测群体</div>
          </div>
          <div style="display: inline-block">
            <dv-water-level-pond :config="config3"
                                 style="width:20rem;height:20rem;display: inline-block;margin: 1rem 5rem 1rem"/>
            <div style="font-size: 2rem;margin-bottom: 2rem">低收入重点监测群体</div>
          </div>
          <div style="display: inline-block">
            <dv-water-level-pond :config="config4"
                                 style="width:20rem;height:20rem;display: inline-block;margin: 1rem 5rem 1rem"/>
            <div style="font-size: 2rem;margin-bottom: 2rem">达标户</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {reactive, toRefs} from 'vue';
import "@/views/res/dashboard/component/scss/box.scss";

export default {
  components: {},
  setup() {
    let state = reactive({
      config1: {
        data: [35],
        shape: 'round',
        colors: ['rgb(2, 220, 248)', 'rgb(10, 102, 238)']
      },
      config2: {
        data: [35],
        shape: 'round',
        colors: ['rgb(242,241,180)', 'rgb(232,188,58)']
      },
      config3: {
        data: [15],
        shape: 'round',
        colors: ['rgb(242,137,115)', 'rgb(201,59,51)']
      },
      config4: {
        data: [15],
        shape: 'round',
        colors: ['rgb(53,193,125)', 'rgb(17,165,102)']
      }
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang='scss' scoped>

</style>