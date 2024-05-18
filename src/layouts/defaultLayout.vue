<template>
  <v-layout>
    <Navigator :drawer="drawer" />
    <AppBar @toggleNavigationDrawer="drawer = !drawer" />
    <v-main style="min-height: 100vh; background-color: #f8f8f8">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script setup>
  import { RouterView } from 'vue-router'
  import Navigator from '../components/Navigator.vue'
  import AppBar from '../components/AppBar.vue'
  import { ref } from 'vue'
  const drawer = ref(true)
</script>

<style lang="scss" scoped></style>
