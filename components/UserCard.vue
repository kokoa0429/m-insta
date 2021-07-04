<template lang="pug">
  v-card(max-width="374")
    v-img(height="250" :src="data.data().images[0]")
    v-card-title test
    v-card-actions
      v-btn(link :to="'/user/' + data.id") details
  // div usercard
    nuxt-link(:to="'/user/' + data.id") link
</template>

<script>
export default {
  name: 'UserCard',
  props: ['data'],
}
</script>

<style scoped></style>
