/**
 *Copyright: Copyright (c) 2020
 *Author:JakHuang
 *Version 1.0 
 *Title: form-generator/Element UI表单设计及代码生成器 
 *GitHub: https://github.com/JakHuang/form-generator
 */

<template>
  <div class="container">
    <div class="left-board">
      <!-- <div class="logo-wrapper">
        <div class="logo">创建表单</div>
      </div>-->
      <el-scrollbar class="left-scrollbar">
        <el-tabs v-model="activeTabName" :stretch="true">
          <el-tab-pane label="常用组件" name="common">
            <div class="components-list">
              <!-- <div class="components-title">
                <meta-svg-icon icon-class="component" />输入型组件
              </div>-->
              <draggable
                class="components-draggable"
                :list="commonComponents"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                :clone="cloneComponent"
                draggable=".components-item"
                :sort="false"
              >
              <template #item="{element,index}">
                <div  class="components-item" @click="addComponent(element)"  >
                  <div class="components-body">
                    <meta-svg-icon :icon-class="element.tagIcon" />
                  {{ element.label }}
                  </div>
                </div>
                </template>
              </draggable>
              <!-- <div class="components-title">
                <meta-svg-icon icon-class="component" />选择型组件
              </div>-->
              <!-- <draggable
                class="components-draggable"
                :list="selectComponents"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                :clone="cloneComponent"
                draggable=".components-item"
                :sort="false"
                @end="onEnd"
              >
                <div
                  v-for="(element, index) in selectComponents"
                  :key="index"
                  class="components-item"
                  @click="addComponent(element)"
                >
                  <div class="components-body">
                    <meta-svg-icon :icon-class="element.tagIcon" />
                    {{ element.label }}
                  </div>
                </div>
              </draggable>-->
              <!-- <div class="components-title">
                <meta-svg-icon icon-class="component" />布局型组件
              </div>-->
              <!-- <draggable
                class="components-draggable"
                :list="layoutComponents"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                :clone="cloneComponent"
                draggable=".components-item"
                :sort="false"
                @end="onEnd"
              >
                <div
                  v-for="(element, index) in layoutComponents"
                  :key="index"
                  class="components-item"
                  @click="addComponent(element)"
                >
                  <div class="components-body">
                    <meta-svg-icon :icon-class="element.tagIcon" />
                    {{ element.label }}
                  </div>
                </div>
              </draggable>-->
            </div>
          </el-tab-pane>
          <el-tab-pane label="定制组件" name="custom">
            <div class="components-list">
              <!-- <div class="components-title">
                <meta-svg-icon icon-class="component" />布局型组件
              </div>-->
              <draggable
                class="components-draggable"
                :list="customMadeComponents"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                :clone="cloneComponent"
                draggable=".components-item"
                :sort="false"
                item-key="label"
                @end="onEnd"
              >
              <template #item="{element,index}">
                <div  class="components-item custom-component" @click="addComponent(element)" >
                  <div class="components-body">
                    <meta-svg-icon :icon-class="element.tagIcon" />
                    {{ element.label }}
                  </div>
                </div>
              </template>
              </draggable>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </div>

    <div class="center-board">
      <div class="action-bar">
        <!-- <el-button icon="el-icon-video-play" type="text" @click="run">
          运行
        </el-button>
        <el-button icon="el-icon-download" type="text" @click="download">
          导出vue文件
        </el-button>
        <el-button class="copy-btn-main" icon="el-icon-document-copy" type="text" @click="copy">
          复制代码
        </el-button> -->
        <el-button
          class="copy-btn-main"
          icon="el-icon-success"
          type="text"
          @click="preview"
        >预览</el-button>
        <el-button class="delete-btn" icon="el-icon-delete" type="text" @click="empty">清空</el-button>
      </div>
      <div id="ipad" ref="ipad">
        <div class="outeripad" :class="[ipadMode]">
          <div class="ipadbody">
            <div class="ipadscreen">
              <el-scrollbar class="center-scrollbar">
                <el-row class="center-board-row" :gutter="formConf.gutter">
                  <el-form
                    :size="formConf.size"
                    :label-position="formConf.labelPosition"
                    :disabled="formConf.disabled"
                    :label-width="formConf.labelWidth + 'px'"
                  >
                    <draggable
                      class="drawing-board"
                      :list="drawingList"
                      :animation="200"
                      :group="{ name: 'componentsGroup', pull: 'true', put:true }"
                      @end="onMianDragEnd"
                    >
                    <template #item="{element,index}">
                        <draggable-item
                          :drawing-list="drawingList"
                          :element="element"
                          :index="index"
                          :active-id="activeId"
                          :form-conf="formConf"
                          :put="shouldClone"
                          @activeItem="activeFormItem"
                          @copyItem="drawingItemCopy"
                          @deleteItem="drawingItemDelete"
                        />
                    </template>
                    </draggable>
                    <div v-show="!drawingList.length" class="empty-info">从左侧拖入或点选组件进行表单设计</div>
                  </el-form>
                </el-row>
              </el-scrollbar>
            </div>
            <div class="ipadcamera"></div>
            <el-tooltip effect="dark" content="切换横/竖模式" placement="top">
              <div class="ipadhomebutton" @click="ipadMode = ipadMode === 'landscape' ? 'portrait' : 'landscape'">
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>

    <right-panel
      :active-data="activeData"
      :form-conf="formConf"
      :show-field="!!drawingList.length"
      :couldChangeRequire="!isProCondition(activeData)"
      @tag-change="tagChange"
    />

    <!-- <form-drawer
      :visible.sync="drawerVisible"
      :form-data="formData"
      size="100%"
      :generate-conf="generateConf"
    />-->
    <!-- <code-type-dialog
      :visible.sync="dialogVisible"
      title="选择生成类型"
      :show-file-name="showFileName"
      @confirm="generate"
    />-->
    <input id="copyNode" type="hidden" />
  </div>
</template>

<script lang="tsx">
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';
import { toRefs, reactive, onMounted, ref, getCurrentInstance,computed,watch,nextTick } from 'vue';
import draggable from "vuedraggable";
// import { saveAs } from 'file-saver'
// import beautifier from 'beautifier'
// import ClipboardJS from 'clipboard'
import render from "./components/render.jsx";
// import FormDrawer from './FormDrawer'
import RightPanel from "./RightPanel.vue";
import {
  inputComponents,
  selectComponents,
  layoutComponents,
  customMadeComponents,
  commonComponents,
  formConf
} from "./components/generator/config";
import {
  exportDefault,
  beautifierConf,
  isNumberStr,
  titleCase
} from "./utils/index";
import {
  makeUpHtml,
  vueTemplate,
  vueScript,
  cssStyle
} from "./components/generator/html";
import { makeUpJs } from "./components/generator/js";
import { makeUpCss } from "./components/generator/css";
import drawingDefalut from "./components/generator/drawingDefalut.js";
// import CodeTypeDialog from './CodeTypeDialog'
import DraggableItem from "./DraggableItem.vue";
import {
  getDrawingList,
  saveDrawingList,
  // getIdGlobal,
  // saveIdGlobal,
  getFormConf
} from "./utils/db";
import { debounce } from '/@/utils/meta.js'

const emptyActiveData = { style: {}, autosize: {} };
let oldActiveId;
let tempActiveData:any;
const formConfInDB = getFormConf();
// const idGlobal = getIdGlobal();
export default {
  components: {
    draggable,
    render,
    RightPanel,
    DraggableItem
    // FormDrawer,
    // CodeTypeDialog,
  },
  props:['tabName', 'conf'],
  
  setup(props) {
    const store = useStore();
    const { proxy } = getCurrentInstance() as any;
    const { t } = useI18n();
    const storageList = getDrawingList()
    const drawingList = Array.isArray(storageList) && storageList.length ? storageList : drawingDefalut
    const state= reactive({
      // idGlobal,
      formConf,
      inputComponents,
      selectComponents,
      layoutComponents,
      commonComponents,
      customMadeComponents,
      labelWidth: 100,
      drawingList,
      drawingData: {},
      activeId: drawingList ? drawingList[0].formId : "",
      drawerVisible: false,
      formData: {},
      dialogVisible: false,
      generateConf: null,
      showFileName: false,
      activeData: drawingList[0],
      activeTabName: "common",
      ipadMode: 'portrait'
    });
    

    const getIpadMode =(proxy:any)=> {
        const {clientHeight, clientWidth} = proxy.$refs.ipad;
          // const clientWidth = proxy.$refs.ipad.clientWidth;
          // const clientHeight = proxy.$refs.ipad.clientHeight;
          
          state.ipadMode = clientWidth * 0.74 > clientHeight ? 'landscape' : 'portrait'
        
      }
    const handlerListChange=(val)=> {
      const vm = this
      store.commit('meta/clearPCondition') // 清除所有条件 重新检测赋值
      const canUsedAsPCon = (conf, parent) => {
          const isRangeCmp = ['fc-date-duration','fc-time-duration'].includes(conf.tag)
          if(isRangeCmp && !conf.showDuration) return false
          if(parent && parent.rowType === 'table') return false 
          if(!conf.proCondition || !conf.required) return false
          if(conf.tag === 'el-select' && conf.multiple) return false
          return true 
        }
        const loop = (data, parent) => {
          if(!data) return
          Array.isArray(data.children) && data.children.forEach(child => loop(child, data))
          if(Array.isArray(data)){
            data.forEach(loop)
          }else{
            canUsedAsPCon(data, parent) 
            ? store.commit("meta/addPCondition", data) 
            : store.commit("meta/delPCondition", data.formId)
            // ? vm.$store.commit("addPCondition", data) 
            // : vm.$store.commit("delPCondition", data.formId)
          }
        }
        loop(state.drawingList,null)
        saveDrawingList(state.drawingList)
        store.commit('meta/updateFormItemList', state.drawingList)
        // if (val.length === 0) this.idGlobal = 100;
    }
      /**
       * 判断是否是常用组件
       * 非常用组件即套餐组件  不能新填或删除子组件
       */
      const isCommonCmp=(name)=> {
        return state.commonComponents.findIndex(t => t.label === name) > -1
      }
      /**
       * 阻止表格中嵌套行容器
       * 定制组件不能添加子组件
       */
      const shouldClone=(to, from ,target, event, conf)=> {
        // .drawing-row-item —— 行容器的类名 ipad里面的组件才会带有
        // 直接拖拽的行容器 最外层含有.drawing-row-item
        // 定制组件 内部含有.drawing-row-item
        // const hasRow = target.classList.contains('.drawing-row-item') || target.querySelector('.drawing-row-item') !== null
        // const isRowContainer = ['布局容器', '表格/明细'].includes(target.innerText) //是阻止从左侧拖拽嵌套
        // const isCusFromLeft = target.classList.contains('custom-component')
        const targetConf = target._underlying_vm_
        const isRowContainer = conf.cmpType === 'common' && conf.rowType === 'layout'
        if (isRowContainer) return true
        if (conf.cmpType === 'custom') return false
        if (conf.rowType === 'table') {
          if (targetConf.layout === 'rowFormItem') return false
          if (isFilledPCon([targetConf.formId])) return false
        }
        return  true
      }

      const activeFormItem=(element)=> {
        if(element){
          state.activeData = element;
          state.activeId = element.formId;
        }
      }

      const onEnd=(obj, a)=> {
        debugger
        if (obj.from !== obj.to) {
          if(tempActiveData){
            state.activeId = tempActiveData.formId;
            state.activeData = tempActiveData;
          }
        }
      }
      const onMianDragEnd=(obj, a) => {
        activeFormItem(drawingList[obj.newIndex]);
      }
      const getSameTagCmpNum=(tag)=>{
        return state.drawingList.reduce((count, item) => {
          if(item.children){
            return count + item.children.reduce((c, t)=>{
              return t.tag === tag ? c + 1 : c
            }, 0)
          }
          return item.tag === tag ? count + 1 : count
        }, 0)
      }
      const createCmpLabel=(cmp)=> {
        const len = getSameTagCmpNum(cmp.tag)
        return len ? cmp.label + len : cmp.label
      }

      const addComponent=(item)=> {
        debugger
        const clone = cloneComponent(item);
        state.drawingList.push(clone);
        activeFormItem(clone);
      }
      const getMaxId= () => {
        if(state.drawingList.length){
          let maxId = 0
          const loop = (data, parent) => {
            if(!data) return
            Array.isArray(data.children) && data.children.forEach(child => loop(child, data))
            if(Array.isArray(data)) {
              data.forEach(loop)
            }else{
              maxId = Math.max(data.formId, maxId)
            }
          }
          loop(state.drawingList)
          return maxId
        }
        return 0
      }

      const getNextId=()=>{
        let maxId = getMaxId() + 1
        return maxId
      }

      const cloneComponent=(origin)=> {
        const clone = JSON.parse(JSON.stringify(origin));
        clone.formId = getNextId();
        // clone.span = formConf.span;
        clone.renderKey = clone.formId + new Date().getTime(); // 改变renderKey后可以实现强制更新组件
        if (!clone.layout) clone.layout = "colFormItem";
        if (clone.layout === "colFormItem") {
          clone.label = createCmpLabel(clone)
          clone.vModel = `field${clone.formId}`;
          clone.placeholder !== undefined && (clone.placeholder += clone.label);
          tempActiveData = clone;
        } else if (clone.layout === "rowFormItem") {
          if (clone.rowType === 'table') {
            clone.vModel = `field${clone.formId}`;
          }
          // delete clone.label;
          clone.componentName = `row${clone.formId}`;
          clone.gutter = formConf.gutter;
          cloneChildrenOfRowFormItem(clone);
          tempActiveData = clone;
        }
        debugger
        return tempActiveData;
      }

      const cloneChildrenOfRowFormItem=(rowFormItem)=> {
        if (rowFormItem.children && rowFormItem.children.length) {
          let children = rowFormItem.children;
          children.forEach((clone, index) => {
            clone.formId = rowFormItem.formId + index + 1;
            // clone.span = formConf.span;
            clone.renderKey = clone.formId + new Date().getTime(); // 改变renderKey后可以实现强制更新组件
            if (!clone.layout) clone.layout = "colFormItem";
            if (clone.layout === "colFormItem") {
              clone.vModel = `field${clone.formId}`;
              clone.placeholder !== undefined &&
                (clone.placeholder += clone.label);
            } else if (clone.layout === "rowFormItem") {
              delete clone.label;
              clone.componentName = `row${clone.formId}`;
              clone.gutter = state.formConf.gutter;
              cloneChildrenOfRowFormItem(clone);
            }
          });
        }
      }
      const isEmptyRowContainer=()=>{
        const rowContainer = state.drawingList.find(t => t.layout === 'rowFormItem')
        if(rowContainer){
          return rowContainer.children.length === 0
        }
      }

      const AssembleFormData=()=> {
          state.formData = {
            ...state.formConf,
            fields: JSON.parse(JSON.stringify(state.drawingList))
          };
      }
      /**
       * 供父组件使用 获取表单JSON
       */
      const getData=()=> {
        return new Promise((resolve, reject) => {
          if(state.drawingList.length === 0){
            reject({ msg: '表单不允许为空', target: state.tabName})
            return
          }

          if(isEmptyRowContainer()){
            reject({ msg: '您的行容器中没有组件', target: state.tabName})
            return
          }
          AssembleFormData();
          resolve({ formData: state.formData, target: state.tabName})
        })
      }

      const preview=()=>{
        AssembleFormData();
        // 这是沿用form-generator 创建文本模板的方法
        
        //  let htmlCode = makeUpHtml(this.formData, "file");
        //  let jsCode = makeUpJs(this.formData, "file");
        //  let cssCode = makeUpCss(this.formData);
        //  this.$router.push({
        //    name: "preview",
        //    params: {
        //      formData: {
        //        htmlCode,
        //        jsCode,
        //        cssCode
        //      }
        //    }
        //  });
      
      // 这是使用jsx渲染
      proxy.$router.push({ name: "jsxPreview", params: { formData: formData } });
      }
      const generate=(data)=> {
        const func = this[`exec${titleCase(operationType)}`];
        state.generateConf = data;
        func && func(data);
      }
      // execRun(data) {
      //   this.AssembleFormData()
      //   this.drawerVisible = true
      // },
      // execDownload(data) {
      //   const codeStr = this.generateCode()
      //   const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
      //   saveAs(blob, data.fileName)
      // },
      const execCopy=(data) =>{
        document.getElementById("copyNode").click();
      }
      const empty=()=> {
        if(isFilledPCon()) {
          proxy.$message.warning("尚有组件已作为流程判断条件，无法删除");
          return;
        }
        proxy.$confirm("确定要清空所有组件吗？", "提示", { type: "warning" }).then(
          () => {
            state.drawingList = [];
            // this.idGlobal = 100;
            store.commit('meta/clearPCondition')
          }
        );
      }
      const drawingItemCopy=(item:any, parent:any)=> {
        let clone = JSON.parse(JSON.stringify(item));
        clone = createIdAndKey(clone);
        parent.push(clone);
        activeFormItem(clone);
      }
      const createIdAndKey=(item:any)=> {
        item.formId = getNextId();
        item.renderKey = item.formId + new Date().getTime();
        if (item.layout === "colFormItem") {
          item.vModel = `field${item.formId}`;
        } else if (item.layout === "rowFormItem") {
          item.componentName = `row${item.formId}`;
        }
        if (Array.isArray(item.children)) {
          item.children = item.children.map(childItem =>
            createIdAndKey(childItem)
          );
        }
        return item;
      }
      const isFilledPCon=(formIds)=>{
        const processCmp = proxy.$parent.$refs.processDesign;
        if(processCmp && processCmp.isProcessCmp){
          return processCmp.isFilledPCon(formIds)
        }
        return false;
      }
      const checkColItem =(cmp)=> {
        if(!cmp) return false
        const isPcon = store.state.meta.processConditions.find(t => t.formId == cmp.formId) ? true : false
        return isPcon && isFilledPCon([cmp.formId])
      }
      // 判断是否已被流程图作为条件必填项了
      const isProCondition=(cmp)=>{
        if (Array.isArray(cmp.children) && cmp.children.length) { // 容器组件需要检查子元素
          if (cmp.rowType === 'table') return false // 表格的子元素不可能为流程条件
          let flag = false
          const loop = (el) => {
            if (flag) return // flag === true 代表找到了一个了 不需要再找下一个
            if(Array.isArray(el)){
              el.some(e => {
                if(e.children) loop(e.children)
                return checkColItem(e)
              }) && (flag = true)
            }
          }
          loop(cmp.children)
          return flag
        }else{
          return checkColItem(cmp)
        }
      }
      const drawingItemDelete=(index, parent)=> {
        // 首先判断是否是流程条件 再判断是否有节点使用过
        if (isProCondition(parent[index])) {
          proxy.$message.warning("该组件已作为流程判断条件，无法删除");
          return 
        }
        store.commit("delPCondition", parent[index].formId);
        parent.splice(index, 1);
        nextTick(() => {
          const len = state.drawingList.length;
          if (len) {
            activeFormItem(state.drawingList[len - 1]);
          }
        });
      }
      // generateCode() {
      //   const { type } = this.generateConf
      //   this.AssembleFormData()
      //   const script = vueScript(makeUpJs(this.formData, type))
      //   const html = vueTemplate(makeUpHtml(this.formData, type))
      //   const css = cssStyle(makeUpCss(this.formData))
      //   return beautifier.html(html + script + css, beautifierConf.html)
      // },
      // download() {
      //   this.dialogVisible = true
      //   this.showFileName = true
      //   this.operationType = 'download'
      // },
      const run=() =>{
        state.dialogVisible = true;
        state.showFileName = false;
        state.operationType = "run";
      }
      // copy() {
      //   this.dialogVisible = true
      //   this.showFileName = false
      //   this.operationType = 'copy'
      // },
      const tagChange=(newTag)=> {
        newTag = cloneComponent(newTag);
        newTag.vModel = state.activeData.vModel;
        newTag.formId = state.activeId;
        newTag.span = state.activeData.span;
        delete state.activeData.tag;
        delete state.activeData.tagIcon;
        //   delete this.activeData.document;
        Object.keys(newTag).forEach(key => {
          if (
            state.activeData[key] !== undefined &&
            typeof state.activeData[key] === typeof newTag[key]
          ) {
            newTag[key] = state.activeData[key];
          }
        });
        state.activeData = newTag;
        updateDrawingList(newTag, state.drawingList);
      }
      const updateDrawingList=(newTag, list) =>{
        const index = list.findIndex(item => item.formId === state.activeId);
        if (index > -1) {
          list.splice(index, 1, newTag);
        } else {
          list.forEach(item => {
            if (Array.isArray(item.children))
              state.updateDrawingList(newTag, item.children);
          });
        }
      }
    onMounted(()=>{
    if (typeof props.conf === 'object' && props.conf !== null) {
          state.drawingList = props.conf.fields
          Object.assign(state.formConf, props.conf)
        }else{
          const drawingListInDB = getDrawingList()
          const hasStorage = Array.isArray(drawingListInDB) && drawingListInDB.length > 0
          state.drawingList = hasStorage ? drawingListInDB : drawingDefalut
          formConfInDB && (state.formConf = formConfInDB)
        }
        activeFormItem(state.drawingList[0])
        nextTick(()=> getIpadMode(proxy))
    })
    // 监听data的数据
    watch(() => state.activeId, (val) => {
      oldActiveId = val;
    }, {
      deep: true, // 深度监听
      immediate: true
    })

    // 监听data的数据
    watch(() => state.drawingList, (val) => {
      if (!val) return
      if (!proxy.afterDrawingChange) {
        proxy.afterDrawingChange = debounce(handlerListChange, 400) // 使用了deep 所以刷新会比较频繁
      }
      proxy.afterDrawingChange()
        
    }, {
      deep: true, // 深度监听
      immediate: true
    })
    
    return {
			t,
			proxy,
      onEnd,
      shouldClone,
      addComponent,
      empty,
      onMianDragEnd,
      tagChange,
      activeFormItem,
      drawingItemCopy,
      drawingItemDelete,
      isProCondition,
			...toRefs(state),
		};
  },
  
  
  
};
</script>

<style lang="stylus">

@import './styles/home';

#ipad {
    height: 100%;
    /*display: flex; */ 

  .outeripad, .ipadbody, .ipadscreen  {
    position: relative;
    height: 100%;
  }

  .drawing-board{
    height: 100%;
    width:100%;
  }
  .ipadcamera, .ipadhomebutton {
    position: absolute;
  }
}

/* iPad */
.outeripad {
  box-shadow: 0 0 13px 3px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin: auto;

  &.portrait{
      padding: 45px 25px;
      height: 85% !important;
      width: 74%;
      min-height: 560px;
  }

  &.landscape{
    width: 90%;
    padding: 25px 45px;
    height: 78% !important;

    .ipadcamera{
      left: -20px;
      top: 50%;
      margin-top: -10px;
    }

    .ipadhomebutton{
      margin-right: -38px;
      top: 50%;
      right: 0;
      left: unset;
      margin-top: -18px;
    }
  }

  .ipadbody {
    background-color: white;
    border-radius: 10px;
  }

  .ipadscreen {
    background-color: rgba(239, 239, 239, 0.6);
  }

  .ipadcamera {
    top: -38px;
    left: 50%;
    background-color: #aeaeae;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    margin-top: 10px;
    margin-left: -5px;
  }

  .ipadhomebutton {
    background-color: #fff;
    height: 30px;
    width: 30px;
    border-radius: 15px;
    border: 1px solid #a8a8a8;
    margin-top: 6px;
    margin-left: -15px;
    left: 50%;
    cursor: pointer;
  }

  .el-radio-group {
    line-height: 2.5;
  }
}
.el-date-editor .el-range-separator{
  box-sizing: content-box;
}
</style>

<style lang="stylus" scoped>
.meta-svg-icon {
  float: right;
}

</style>
