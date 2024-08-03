import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNotesStore = defineStore('notes', () => {
  // const id = ref(0)
  // const creatorId = ref(0)
  // const creatorName = ref("")
  // const title = ref('')
  // const content = ref('')
  // const tags = ref([])

  const notes = ref([])
  const filteredNotes = ref([])

  const filterNotesByStatus = (status) => {
    filteredNotes.value = notes.value.filter((note) => note.status === status)
  }

  const filterNotesByUser = (id) => {
    filteredNotes.value = notes.value.filter((note) => note.status === status)
  }

  const addNote = async (NewNote) => {
    try {
      fetch('http://localhost:3000/notes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(NewNote)
      }).then(() => {
        getAndSetAllNotes()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteNote = async (noteId) => {
    fetch(`http://localhost:3000/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json  charset=UTF-8'
      }
    }).then(() => {
      getAndSetAllNotes()
    })
  }

  const changeNoteStatus = async (noteId, newStatus) => {
    fetch(`http://localhost:3000/notes/${noteId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json  charset=UTF-8'
      },
      body: JSON.stringify({ id: noteId, status: newStatus })
    }).then(() => {
      getAndSetAllNotes()
    })
  }

  const updateNoteData = async (updatedNotedata) => {
    fetch(`http://localhost:3000/notes/${updatedNotedata.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json  charset=UTF-8'
      },
      body: JSON.stringify({ ...updatedNotedata })
    }).then(() => {
      getAndSetAllNotes()
    })
  }

  const getAndSetAllNotes = async () => {
    const res = await fetch('http://localhost:3000/notes/')
    const data = await res.json()
    notes.value = data
  }
  return {
    notes,
    filteredNotes,
    getAndSetAllNotes,
    changeNoteStatus,
    filterNotesByStatus,
    filterNotesByUser,
    addNote,
    deleteNote,
    updateNoteData
  }
})
