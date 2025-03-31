<template>
  <div id="flareTarget">
    <div class="aflare-container">
      <div class="target-header">
        <span class="target-title">男女比例</span>
      </div>
      <div>
        <div class="target-content" style="text-align: center;">
          <div style="display: inline-block;" class="margin-lg">
            <barHuman :progress="man+'%'" :text="'男：'+man" endColor="blue" height="10rem"
                      startColor="lightblue"/>
          </div>
          <div style="display: inline-block;" class="margin-lg">
            <barHuman :gender="1" :progress="woman+'%'" :text="'女：'+woman" height="10rem"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import {reactive, toRefs, watch} from 'vue';
import barHuman from "/@/components/barHuman/index.vue";

export default {
  components: {barHuman},
  props: {
    man: 0,
    woman: 0
  },
  setup(props) {
    watch(() => props.man, async (newValue) => {
      console.log(newValue);
      props.man = [newValue];
    });
    watch(() => props.woman, async (newValue) => {
      props.woman = [newValue];
    });
    let state = reactive({})

    return {
      ...toRefs(state)
    }
  },
}
</script>

<style lang='scss' scoped>
</style>