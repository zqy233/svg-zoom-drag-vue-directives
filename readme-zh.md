# 自定义 vue 指令

提供两个适用于 Vue 2 和 Vue 3 的自定义指令。

第一个指令允许用户使用鼠标滚轮控制 SVG 图像的缩放。

第二个指令允许用户通过按住鼠标并移动光标来拖动 SVG 图像。这是通过调整 SVG 的 viewbox 属性实现的。

## 用法

Vue2

```ts
import Vue from "vue";
import App from "./App.vue";

import { svgWheel, svgDrag } from "svg-zoom-drag-vue-directives";
svgWheel(Vue);
svgDrag(Vue);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

Vue3

```ts
import { createApp } from "vue";
import App from "./App.vue";

import { svgWheel, svgDrag } from "svg-zoom-drag-vue-directives";
const app = createApp(App);
svgWheel(app);
svgDrag(app);

app.mount("#app");
```

```ts
<template>
  <div id="svg" v-html="svgString" v-svgWheel v-svgDrag></div>
</template>
<script setup lang="ts">
import { svgText } from "./svgText";
const svgString = ref("");
onMounted(() => {
  svgString.value = svgText;
});
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
#svg {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
svg {
  width: 100% !important;
  height: 100% !important;
  user-select: none;
}
</style>
```

## 注意点

指令将绑定元素的第一个子元素当做 svg，所以请注意绑定的元素

```ts
const svgDom = el.firstChild as SVGSVGElement;
```

这样设计是为了搭配`v-html`

```ts
<div id="svg" v-html="svgString" v-svgWheel v-svgDrag></div>
```
