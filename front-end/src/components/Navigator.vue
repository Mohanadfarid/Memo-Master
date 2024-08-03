<template>
  <v-navigation-drawer color="purple" permanent v-model="props.drawer" style="opacity: 0.8">
    <v-list class="ba-14">
      <v-list-item
        prepend-avatar="https://picsum.photos/200/300"
        subtitle="sandra_a88@gmail.com"
        title="Sandra Adams"
      ></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item to="/" prepend-icon="mdi-notebook-multiple" title="all notes"></v-list-item>
      <v-list-item to="/notes/add" prepend-icon="mdi-plus" title="Add note"></v-list-item>
      <v-list-item to="/profile" prepend-icon="mdi-account" title="profile"></v-list-item>
      <v-list-item to="/about" prepend-icon="mdi-information-outline" title="about"></v-list-item>
      <v-list-item prepend-icon="mdi-logout" title="sign out" @click="signOutHandler"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const props = defineProps(['drawer'])

const signOutHandler = () => {}
</script>

<style lang="scss" scoped></style>
