<template>
  <div id="flareTarget">
    <div id="banner">
      <div class="banner-content">
        <button style="margin-left: 8em;margin-right:2em;" class="banner-button"
                @click="onGoToLink(`/admin/dashboard/family/index`)">
          区建成
        </button>
        <button style="margin-right:2em;" class="banner-button" @click="onGoToLink(`/admin/dashboard/family/index`)">
          区建成
        </button>
        <button style="margin-right:2em;" class="banner-button" @click="onGoToLink(`/admin/dashboard/family/index`)">
          区建成
        </button>
        <button style="margin-right:2em;" class="banner-button" @click="onGoToLink(`/admin/dashboard/family/index`)">
          区建成
        </button>
      </div>
      <div class="banner-content" style="text-align: right;float:right;">
        <p style="display:inline-block;color:white;margin-left:2em;margin-right:2em;font-size:2.3em"><b>{{
            curTime
          }}</b></p>
        <button style="margin-right:8em" class="banner-button" @click="onGoToLink(`/admin/dashboard/family/index`)">
          详情
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {useRouter} from "vue-router";
import {reactive, toRefs} from "vue";
import dayjs from "dayjs";

export default {
  setup() {
    const state: any = reactive({
      curTime: dayjs().format("YYYY年MM月DD日 dddd")
    })
    const router = useRouter();
    //导航链接
    const onGoToLink = (url: string) => {
      router.push(url)
    }
    return {
      onGoToLink,
      ...toRefs(state),
    }
  },
}
</script>

<style lang='scss' scoped>
#flareTarget {
  margin: 0 10px;
}

#banner {
  width: 100%;
  height: 60vh;
  background-image: url(/img/res/banner.png);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
  display: inline-block;

  .banner-content {
    margin: 4.5em 0;
    display: inline-block;
    width: auto
  }

  .banner-button {
    font-size: 2.3em;
    padding: 0.6em;
    background-image: url(img/button_bg.png);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 100% 100%;
    display: inline-block;
    background-color: rgba(0, 0, 0, 0);
    color: #409eff;
    text-shadow: 1px 1px 1px #615ea8;
    border: none;
  }

  .banner-button:hover {
    background-image: url(../component/img/button_bg_hover.png);
  }
}
</style>