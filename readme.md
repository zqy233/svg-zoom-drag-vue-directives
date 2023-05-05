# EN/[中文](https://github.com/zqy233/svg-zoom-drag-vue-directives/blob/master/readme-zh.md)

## Custom vue directives

Provide two Vue custom directives that are compatible with Vue 2 and Vue 3.

The first directive allows the user to control the zoom in and out of an SVG image using the mouse wheel.

The second directive allows the user to drag the SVG image by holding down the mouse and moving the cursor.

This is achieved by adjusting the viewbox attribute of the SVG.

## demo

> github pages: https://zqy233.github.io/svg-zoom-drag-vue-demo/#/

> code: https://github.com/zqy233/svg-zoom-drag-vue-demo

## Usage

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

## Note

This directive binds the first child element of the element to which it is attached as an SVG. So please be careful when binding the element.

```ts
const svgDom = el.firstChild as SVGSVGElement;
```

This design is intended to be used with `v-html`.

```ts
<div id="svg" v-html="svgString" v-svgWheel v-svgDrag></div>
```
