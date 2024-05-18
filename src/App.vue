<script setup>
import defaultLayout from './layouts/defaultLayout.vue'
</script>

<template>
  <component :is="$route.meta.layout || defaultLayout"></component>
</template>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>
