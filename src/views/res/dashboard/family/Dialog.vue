<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div class="target-header">
        <div class="target-title">五好达标情况</div>
      </div>
      <el-dialog v-model="dialogTableVisible" title="农村居民收入状况排查户表" width="1600">

        <div class="dialog_table">基本情况</div>
        <div class="dialog_body">
          <div>户主:邓*志</div>
          <div>家庭人数:5</div>
          <div>联系方式:130****1234</div>
        </div>

        <div class="dialog_table">资产收入</div>
        <div class="dialog_body" style="">
          <div>家庭年收入(元):152123</div>
          <div style="color: red">人均年收入(元):30424</div>
          <div>车辆(辆):1</div>
          <div>房产(m):120</div>

        </div>
        <div class="dialog_body" style="">
          <div>工资性收入(元):0</div>
          <div>经营性收入(元): 170000</div>
          <div>财产性收入(元):0</div>
          <div>转移性收入(元): 2123</div>
          <div>经营成本(元):20000</div>
        </div>

        <div class="dialog_table">五好情况</div>
        <div class="dialog_body">
          <div>
            <div>生活好</div>
            <div>1、购买基本养老保险</div>
            <div>2、生活用水安全稳定</div>
            <div>3、供电稳定不断电</div>
          </div>
          <div>
            <div>教育好</div>
            <div>1、适龄儿童接受义务教育</div>
          </div>
          <div>
            <div>医疗好</div>
            <div>1、购买基本医疗保险</div>
          </div>
          <div>
            <div>住房好</div>
            <div>1、住房安全</div>
          </div>
          <div>
            <div>家风好</div>
            <div>1、家庭和美</div>
            <div>2、亲友和睦</div>
            <div>3、遵纪守法</div>
          </div>
        </div>

        <div class="dialog_table">帮扶需求</div>
        <div class="dialog_body" style="flex-direction: column">
          <div>教育帮扶、医疗救助</div>
          <div>其他:给予帮扶情况其他情况说明</div>
        </div>
        <div class="dialog_body" style="justify-content: space-between">
          <div style="flex: 1;margin-right: 1rem">
            <div class="dialog_table">匹配政策</div>
            <div>《教育帮扶政策》</div>
            <div>《医疗救助政策》</div>
          </div>

          <div style="flex: 1">
            <div class="dialog_table">政策落实情况</div>
            <div>已落实</div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import {reactive, ref, toRefs} from 'vue';
import "@/views/res/dashboard/component/scss/box.scss";

export default {
  props: {
    isShow: Boolean,
  },
  setup(props) {
    const dialogTableVisible = ref(props.isShow)
    let state = reactive({})
    return {
      ...toRefs(state),
      dialogTableVisible
    }
  },
}
</script>

<style lang='scss' scoped>
.dialog_body {
  padding: 2rem 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;

  div {
    font-size: 1.6rem;
  }
}

.dialog_table {
  width: 100%;
  height: 4rem;
  background: #ececec;
  font-size: 2rem;
  text-align: center;
  line-height: 4rem;
}
</style>