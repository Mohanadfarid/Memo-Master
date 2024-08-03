<template>
  <v-app-bar class="pl-5">
    <v-text-field
      variant=""
      label="Search"
      prepend-inner-icon="mdi-magnify"
      hide-details
      single-line
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-list>
      <v-list-item
        prepend-avatar="https://picsum.photos/200/300"
        title="Sandra Adams"
      >
        <template v-slot:append>

        </template>
      </v-list-item>
    </v-list>
    <v-app-bar-nav-icon variant="text" @click="emit('toggleNavigationDrawer')"></v-app-bar-nav-icon
  ></v-app-bar>
</template>

<script setup>
const emit = defineEmits(['toggleNavigationDrawer'])
</script>

<style lang="scss"></style>
