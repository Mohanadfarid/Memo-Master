<template>
  <v-list style="background-color: #f8f8f8" class="d-flex px-4">
    <v-list-item :key="index" class="px-1" v-for="filter,index in filters">
      <v-btn
        :color="activeFilterStyles(filter).color"
        :variant="activeFilterStyles(filter).variant"
        @click="
          () => {
            handleFilter(filter)
          }
        "
      >
        <strong>{{ filter }}</strong>
      </v-btn>
    </v-list-item>
  </v-list>

  <v-row class="w-100 pt-5 px-5">
    <v-col :key="index" v-for="note , index in filteredNotes" cols="12" sm="6" lg="3">
      <NoteCard :noteData="note" />
    </v-col>
  </v-row>
</template>

<script setup>
import { useNotesStore } from '@/stores/notes'
import { computed, onMounted } from 'vue'
import NoteCard from '@/components/NoteCard.vue'
import { ref } from 'vue'

const filters = ref(['all', 'todo', 'done', 'doing', 'personal'])
const appliedFilter = ref('all')
const notesStore = useNotesStore()
const filteredNotes = computed(() =>
  notesStore.filteredNotes.length > 0 ? notesStore.filteredNotes : notesStore.notes
)

const handleFilter = (filter) => {
  appliedFilter.value = filter
  //to do if filter=== personal filter filter notes by current user id
  notesStore.filterNotesByStatus(filter)
}

const activeFilterStyles = (currentFilter) => {
  if (appliedFilter.value === currentFilter) {
    return { color: 'purple', variant: 'elevated' }
  } else return { color: '', variant: 'text' }
}

onMounted(() => {
  notesStore.getAndSetAllNotes()
})
</script>
