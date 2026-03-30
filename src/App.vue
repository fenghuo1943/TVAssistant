<template>
  <div>
    <h1>TV Assistant 控制面板</h1>
    <p>{{ message }}</p>
    <button @click="clickMe">点击测试</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const message = ref("欢迎使用");

function clickMe() {
  message.value = "按钮已点击";
  console.log("按钮点击事件触发");
}
</script>

<style>
h1 {
  color: #42b983;
}
</style>
