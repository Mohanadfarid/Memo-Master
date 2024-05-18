<template>
  <v-card class="pa-3 position-relative" elevation="5" style="overflow: visible">
    <!-- delete btn -->
    <v-btn
      @click="handleDeleteNote"
      class="position-absolute z-index-1"
      color="red"
      icon="mdi-delete"
      size="30"
      style="top: -10px; left: -10px"
    ></v-btn>

    <!-- title and edit btn -->
    <v-card-title class="d-flex align-center justify-space-between"
      ><h3>{{ noteData.title }}</h3>
      <router-link :to="{ path: `/notes/${noteData.id}/edit` }">
        <v-btn color="purple" icon="mdi-pencil" size="40"></v-btn
      ></router-link>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>{{ noteData.content }}</v-card-text>

    <!-- tags -->
    <v-chip
      variant="outline"
      elevation="3"
      color="purple"
      class="mx-1 px-3"
      v-for="tag in noteData.tags"
      :key="tag"
      >{{ tag }}</v-chip
    >

    <!-- creator info -->
    <v-container class="d-flex justify-space-between align-center px-0 pb-0">
      <v-list>
        <v-list-item
          class="pl-0"
          :prepend-avatar="CardCreatorData.userImage"
          :subtitle="CardCreatorData.email"
          :title="CardCreatorData.name"
        ></v-list-item>
      </v-list>
      <div>
        <v-btn elevation="3" rounded variant="elevated" :color="statusColor(noteData.status)">{{
          noteData.status
        }}</v-btn>

        <!-- status dropdown -->
        <v-menu density="compact" activator="parent" transition="slide-y-transition">
          <v-list>
            <v-list-subheader>STATUS</v-list-subheader>
            <v-list-item
              v-for="(item, index) in statusArray"
              :key="index"
              :value="item"
              :class="`${item === noteData.status ? 'bg-purple' : ''}`"
              @click="
                () => {
                  handleChangingStatus(noteData.id, item)
                }
              "
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-container>
  </v-card>
</template>

<script setup>
import { useNotesStore } from '@/stores/notes'
import { onMounted, ref } from 'vue'
const notesState = useNotesStore()
const { noteData } = defineProps(['noteData'])
const CardCreatorData = ref({})
const statusArray = ref(['done', 'doing', 'todo'])

// a function to return the btn color based on status
const statusColor = (status) => {
  switch (status) {
    case 'done':
      return 'success'
    case 'doing':
      return 'warning'
    case 'todo':
      return 'error'
  }
}

// a function to handle deleting a note
const handleDeleteNote = () => {

  //to do handel confirmation on if the user is sure he want to delete that spcific note
  notesState.deleteNote(noteData.id)
}

// a function to changing status
const handleChangingStatus = (id, status) => {
  console.log(id, status)
  notesState.changeNoteStatus(id, status)
}

//getting the card creator data on mount
onMounted(async () => {
  const res = await fetch(`http://localhost:3000/users/${noteData.creatorId}`)
  CardCreatorData.value = await res.json()
})
</script>

<style lang="scss"></style>
