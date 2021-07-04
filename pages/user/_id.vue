<template lang="pug">
  div {{ $route.params.id }}
    div
      img(v-for="(item,index) in images" :key="index" :src="item")
</template>

<script>
import { firestore } from '~/plugins/firebase'
export default {
  name: 'Id',
  data() {
    return {
      images: [],
    }
  },
  mounted() {
    const userdata = firestore.collection('users').doc(this.$route.params.id)
    userdata.get().then((result) => {
      this.images = result.data().images
      console.log(result)
    })
  },
}
</script>

<style scoped></style>
