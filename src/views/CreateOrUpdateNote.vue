<template>
  <v-row class="d-flex justify-center align-center">
    <v-col cols="12" md="10" xl="8">
      <v-card class="ma-5 pa-5 pa-md-15 animate__animated animate__fadeIn" elevation="15"
        ><h2 class="text-center">{{ componentMode }} Note</h2>
        <v-form>
          <!-- title -->
          <v-text-field
            class="my-3"
            clearable
            label="title"
            v-model="title"
            prepend-icon="mdi-format-title"
            variant="outlined"
          ></v-text-field>

          <!-- constent -->
          <v-textarea
            class="my-3"
            auto-grow
            clearable
            label="content"
            v-model="content"
            prepend-icon="mdi-note-text"
            variant="outlined"
          ></v-textarea>

          <!-- tags string -->
          <v-text-field
            v-model="tagsString"
            @input="handleConvertTagsStringToArr"
            label="tags"
            prepend-icon="mdi-tag-text-outline"
            variant="outlined"
            hint="write a comma ',' between each tag"
          ></v-text-field>

          <!-- tags chips -->
          <div class="ml-10 mb-10">
            <v-chip
              variant="outline"
              elevation="3"
              color="purple"
              v-for="(tag, index) in tagsArr"
              :key="index"
              class="mr-2 mt-2"
              >{{ tag }}</v-chip
            >
          </div>

          <!-- status -->
          <v-select
            class="my-3"
            prepend-icon="mdi-checkbox-marked-circle-outline"
            chips
            v-model="status"
            label="choose a status"
            :items="['todo', 'doing', 'done']"
            variant="outlined"
          ></v-select>

          <!-- actions -->
          <div class="d-flex justify-center">
            <v-btn class="mr-5" color="purple" prepend-icon="$vuetify" @click="handleSubmit">
              Submit
            </v-btn>
            <v-btn color="red" @click="handleReset">reset?</v-btn>
          </div>
        </v-form></v-card
      ></v-col
    >
  </v-row>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '../stores/notes.js'
const route = useRoute()
const router = useRouter()
// const id = parseInt(route.params.id);
const notesStore = useNotesStore()

const componentMode = ref('Create')
const id = ref(Math.floor(Math.random() * 100000) + 1)
const title = ref('')
const content = ref('')
const tagsArr = ref([])
const tagsString = ref('')
const status = ref('todo')
const creatorId = ref(1)

onMounted(async () => {
  if (route.params.id) {
    const noteId = parseInt(route.params.id)
    componentMode.value = 'update'
    const noteData = await fetchAndReturnNoteData(noteId)

    //setting the form data
    id.value = noteData.id
    title.value = noteData.title
    content.value = noteData.content
    status.value = noteData.status
    tagsString.value = noteData.tags
    tagsArr.value = noteData.tags
    // creatorId.value= note:set the creator id later when u implement authenticattions
  }
})

// a function to convert string tags into array of tags
const handleConvertTagsStringToArr = (e) => {
  const tagString = e.target.value
  const arrOfTags = tagString.split(',').filter((item) => item)
  tagsArr.value = arrOfTags
}

const fetchAndReturnNoteData = async (id) => {
  //fetch note data
  try {
    const res = await fetch(`http://localhost:3000/notes/${id}`)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
const handleReset = async () => {
  if (componentMode.value === 'Create') {
    // incase of create the reset cleans the data of the form
    id.value = Math.floor(Math.random() * 100000) + 1
    title.value = ''
    content.value = ''
    tagsString.value = ''
    tagsArr.value = []
  } else {
    //incase of update note we fetch the original note data and set it again
    
    const noteData = await fetchAndReturnNoteData(id.value)

    //setting the form data
    id.value = noteData.id
    title.value = noteData.title
    content.value = noteData.content
    status.value = noteData.status
    tagsString.value = noteData.tags
    tagsArr.value = noteData.tags
  }
}

const handleSubmit = () => {
  if (componentMode.value === 'Create') {
    // add a new note incase of create mode
    notesStore
      .addNote({
        id: id.value,
        creatorId: creatorId.value,
        title: title.value,
        content: content.value,
        tags: tagsArr.value,
        status: status.value
      })
      .then(() => {
        router.push('/')
      })
  } else {
    // patch an existing note incase of update mode
    notesStore
      .updateNoteData({
        id: id.value,
        creatorId: creatorId.value,
        title: title.value,
        content: content.value,
        tags: tagsArr.value,
        status: status.value
      })
      .then(() => {
        router.push('/')
      })
  }
}
</script>

<style lang="scss" scoped></style>
