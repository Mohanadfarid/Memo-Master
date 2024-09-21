<template>
  <v-navigation-drawer color="purple" permanent v-model="props.drawer" >
    <v-list class="ba-14">
      <v-list-item
        prepend-avatar="https://picsum.photos/200/300"
        :subtitle="userState.email || 'not setted'"
        :title="userState.name || 'not setted'"
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
import { UserDataStore } from '@/stores/user';

const props = defineProps(['drawer'])
const userState = UserDataStore()

const signOutHandler = () => {}
</script>

<style lang="scss" scoped></style>
