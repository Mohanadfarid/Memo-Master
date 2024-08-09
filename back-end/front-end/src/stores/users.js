import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const UserDataStore = defineStore('userData', () => {
  const id = ref(0)
  const name = ref('')
  const age = ref(0)
  const email = ref('')

  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  return { id, name, age, email }
})
