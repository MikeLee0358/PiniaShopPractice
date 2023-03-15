import { defineStore, acceptHMRUpdate } from 'pinia'
import { groupBy } from 'lodash'
import { useAuthUserStore } from './AuthUserStore'
export const useCartStore = defineStore('CartStore', {
  state: () => {
    return {
      items: []
    }
  },
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: (state) => {
      const grouped = groupBy(state.items, (item) => item.name)
      const sorted = Object.keys(grouped).sort()
      const inOrder = {}
      sorted.forEach((key) => (inOrder[key] = grouped[key]))
      return inOrder
    },
    groupCount: (state) => (name) => state.grouped[name].length,
    total: (state) => () => state.items.reduce((total, item) => (total += item.price), 0)
  },

  actions: {
    checkOut() {
      const authUserStore = useAuthUserStore()
      alert(`${authUserStore.name} has ${this.count} stuff and total is ${this.total()}`)
    },
    addItem(count, item) {
      count = parseInt(count)
      for (let i = 0; i < count; i++) {
        this.items.push({ ...item })
      }
    },
    clearItem(itemName) {
      this.items = this.items.filter((item) => item.name !== itemName)
    },
    setItemCount(item, count) {
      this.clearItem(item.name)
      this.addItem(count, item)
    }
  }
})

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
