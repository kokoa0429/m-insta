<template lang="pug">
  div
    user-card(v-for="(data, index) in users" :key="index" :data="data")
</template>

<script>
import UserCard from '../components/UserCard'
import { firestore } from '~/plugins/firebase'
export default {
  components: { UserCard },
  data() {
    return {
      users: [],
    }
  },
  mounted() {
    console.log('index mounted')
    const users = firestore.collection('users').where('public', '==', true)
    users.get().then((result) => {
      console.log(result.docs)
      this.users = result.docs
    })
  },
}
</script>
