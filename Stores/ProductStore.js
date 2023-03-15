import { defineStore } from 'pinia'
export const useProductStore = defineStore('ProductStore', {
  // state
  state: () => {
    return {
      products: []
    }
  },
  // action
  actions: {
    async fill() {
      this.products = (await import('@/data/products.json')).default
    }
  }
  // getter
})
