<script setup>
import TheHeader from '@/components/TheHeader.vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '../Stores/ProductStore'
import { useCartStore } from '../Stores/CartStore'
const productStore = useProductStore()
const cartStore = useCartStore()
productStore.fill()
cartStore.$onAction(({ name, args, after }) => {
  if (name === 'addItem') {
    after(() => {
      console.log('每次執行action後觸發這行', args[0])
    })
  }
})
</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItem($event, product)"
      />
    </ul>
  </div>
</template>
