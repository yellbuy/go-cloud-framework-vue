<template>
  <el-config-provider :locale="i18nLocale" :message="messageConfig" :size="getThemeConfig.globalComponentSize">
    <router-view v-show="getThemeConfig.lockScreenTime !== 0"/>
    <LockScreen v-if="getThemeConfig.isLockScreen"/>
    <Setings v-show="getThemeConfig.lockScreenTime !== 0" ref="setingsRef"/>
    <CloseFull/>
  </el-config-provider>
</template>

<script lang="ts">
import en from 'element-plus/dist/locale/en.mjs';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import zhTw from 'element-plus/dist/locale/zh-tw.mjs';
import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onBeforeMount,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  watch
} from 'vue';
import {useRoute} from 'vue-router';
import LockScreen from '/@/layout/lockScreen/index.vue';
import CloseFull from '/@/layout/navBars/breadcrumb/closeFull.vue';
import Setings from '/@/layout/navBars/breadcrumb/setings.vue';
import {useStore} from '/@/store/index';
import other from '/@/utils/other';
import setIntroduction from '/@/utils/setIconfont';
import {Local, Session} from '/@/utils/storage';

export default defineComponent({
  name: 'app',
  components: {LockScreen, Setings, CloseFull},
  setup() {
    const {proxy} = getCurrentInstance() as any;
    const setingsRef = ref();
    const route = useRoute();
    const store = useStore();
    const state = reactive({
      i18nLocale: zhCn,
    });
    const messageConfig = reactive({
      max: 5,
      grouping: true,
      duration: 1800,
    })
    // 获取布局配置信息
    const getThemeConfig = computed(() => {
      return store.state.themeConfig.themeConfig;
    });
    // 布局配置弹窗打开
    const openSetingsDrawer = () => {
      setingsRef.value.openDrawer();
    };
    // 设置初始化，防止刷新时恢复默认
    onBeforeMount(() => {
      // 设置批量第三方 icon 图标
      setIntroduction.cssCdn();
      // 设置批量第三方 js
      setIntroduction.jsCdn();
    });
    // 页面加载时
    onMounted(() => {
      nextTick(() => {
        // 监听布局配置弹窗点击打开
        proxy.mittBus.on('openSetingsDrawer', () => {
          openSetingsDrawer();
        });
        // 设置 i18n，App.vue 中的 el-config-provider
        proxy.mittBus.on('getI18nConfig', (locale: string) => {
          console.log("locale:", locale)
          //state.i18nLocale=locale
          if (locale == "en") {
            state.i18nLocale = en;
          } else if (locale == "zh-tw") {
            state.i18nLocale = zhTw;
          } else {
            state.i18nLocale = zhCn;
          }

        });
        // 获取缓存中的布局配置
        if (Local.get('themeConfig')) {
          store.dispatch('themeConfig/setThemeConfig', Local.get('themeConfig'));
          document.documentElement.style.cssText = Local.get('themeConfigStyle');
        }
        // 获取缓存中的全屏配置
        if (Session.get('isTagsViewCurrenFull')) {
          store.dispatch('tagsViewRoutes/setCurrenFullscreen', Session.get('isTagsViewCurrenFull'));
        }
      });
    });
    // 页面销毁时，关闭监听布局配置/i18n监听
    onUnmounted(() => {
      proxy.mittBus.off('openSetingsDrawer', () => {
      });
      proxy.mittBus.off('getI18nConfig', () => {
      });
    });
    // 监听路由的变化，设置网站标题
    watch(
        () => route.fullPath,
        () => {
          other.useTitle();
        }
    );
    return {
      setingsRef,
      getThemeConfig,
      messageConfig,
      ...toRefs(state),
    };
  },
});
</script>
