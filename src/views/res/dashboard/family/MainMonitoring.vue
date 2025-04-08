<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <dv-water-level-pond :config="config2"
                             style="width:9rem;height:9rem;display: inline-block;margin: 1rem 3rem 1rem"/>
        <div style="font-size: 1.2rem;margin-bottom: 1rem">低收入一般监测群体（户）</div>
        <div style="font-size: 1.2rem;margin-bottom: 1rem">（年人均收入1.77-3.33万元）</div>
      </el-col>
      <el-col :span="12">
        <dv-water-level-pond :config="config3"
                             style="width:9rem;height:9rem;display: inline-block;margin: 1rem 3rem 1rem"/>
        <div style="font-size: 1.2rem;margin-bottom: 1rem">低收入重点监测群体（户）</div>
        <div style="font-size: 1.2rem;margin-bottom: 1rem">（年人均收入1.77万元以下）</div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import {reactive, toRefs, watch} from 'vue';

export default {
  components: {},
  props: {
    ordinary: Array,
    keyPoint: Array,
  },
  setup(props) {
    watch(() => props.ordinary, async (newValue) => {
      state.config2.data = [newValue];
    });
    watch(() => props.keyPoint, async (newValue) => {
      state.config3.data = [newValue];
    });

    let state = reactive({
      config2: {
        data: [25.79],
        shape: 'round',
        colors: ['rgb(242,241,180)', 'rgb(232,188,58)']
      },
      config3: {
        data: [4.21],
        shape: 'round',
        colors: ['rgb(242,137,115)', 'rgb(201,59,51)']
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