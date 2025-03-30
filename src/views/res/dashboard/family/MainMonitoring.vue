<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <dv-water-level-pond :config="config1"
                             style="width:9rem;height:9rem;display: inline-block;margin: 1rem 3rem 1rem;font-size: 4rem !important;"/>
        <div style="font-size: 1.2rem;margin-bottom: 1rem">低收入边缘人员（户）</div>
      </el-col>
      <el-col :span="6">
        <dv-water-level-pond :config="config2"
                             style="width:9rem;height:9rem;display: inline-block;margin: 1rem 3rem 1rem"/>
        <div style="font-size: 1.2rem;margin-bottom: 1rem">低收入一般监测群体（户）</div>
      </el-col>
      <el-col :span="6">
        <dv-water-level-pond :config="config3"
                             style="width:9rem;height:9rem;display: inline-block;margin: 1rem 3rem 1rem"/>
        <div style="font-size: 1.2rem;margin-bottom: 1rem">低收入重点监测群体（户）</div>
      </el-col>
      <el-col :span="6">
        <dv-water-level-pond :config="config4"
                             style="width:9rem;height:9rem;display: inline-block;margin: 1rem 3rem 1rem"/>
        <div style="font-size: 1.2rem;margin-bottom: 1rem">达标户</div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import { reactive, toRefs, watch } from 'vue';

export default {
  components: {},
  props: {
    ordinary: Array,
    margin: Array,
    keyPoint: Array,
    standard: Array,
  },
  setup(props) {
    watch(() => props.margin, async (newValue) => {
      state.config1.data = [newValue];
    });
    watch(() => props.ordinary, async (newValue) => {
      state.config2.data = [newValue];
    });
    watch(() => props.keyPoint, async (newValue) => {
      state.config3.data = [newValue];
    });
    watch(() => props.standard, async (newValue) => {
      state.config4.data = [newValue];
    });

    let state = reactive({
      config1: {
        data: [45.53],
        shape: 'round',
        colors: ['rgb(2, 220, 248)', 'rgb(10, 102, 238)']
      },
      config2: {
        data: [25.79],
        shape: 'round',
        colors: ['rgb(242,241,180)', 'rgb(232,188,58)']
      },
      config3: {
        data: [4.21],
        shape: 'round',
        colors: ['rgb(242,137,115)', 'rgb(201,59,51)']
      },
      config4: {
        data: [24.47],
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