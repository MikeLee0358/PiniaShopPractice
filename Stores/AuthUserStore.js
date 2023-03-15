import { defineStore, acceptHMRUpdate } from 'pinia'
export const useAuthUserStore = defineStore('AuthUserStore', {
  state: () => {
    return {
      name: 'mike lee'
    }
  },
  // getters: {
  //   name: () => 'mike lee'
  // }
  actions: {
    visitGoogle() {
      window.open('https://www.google.com', '_blank')
    }
  }
})

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthUserStore, import.meta.hot))
}
