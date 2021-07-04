<template lang="pug">
  div {{ isAuthenticated() ? user.uid : "not authed" }}
    v-btn(@click="login" v-if="!isAuthenticated()") login
    v-btn(@click="logout" v-if="isAuthenticated()") logout
    form(@submit.prevent="submitImg()")
      input(type="file" accept="img/*" @change="changeImg")
    div
      v-img(v-for="(item,index) in images" :key="index" :src="item" max-width=200 max-height=200)
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { firebase, storage, firestore } from '~/plugins/firebase'

export default {
  name: 'Mypage',
  data() {
    return {
      data: '',
      images: [],
    }
  },
  watch: {
    user(newVal) {
      const userdata = firestore.collection('users').doc(newVal.uid)
      userdata.get().then((result) => {
        this.images = result.data().images
        console.log(result)
      })
    },
  },
  mounted() {
    if (this.isAuthenticated()) {
      const userdata = firestore.collection('users').doc(this.user.uid)
      userdata.get().then((result) => {
        this.images = result.data().images
        console.log(result)
      })
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['setUser']),
    ...mapGetters(['isAuthenticated']),
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          this.setUser(result.user)
        })
        .catch((error) => {
          window.alert(error)
        })
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setUser(null)
        })
        .catch((err) => {
          window.alert(err)
        })
    },
    changeImg(e) {
      const filePrefix = new Date().getTime()
      const file = e.target.files[0]
      const storageRef = firebase
        .storage()
        .ref('users/' + this.user.uid + '/images/' + filePrefix + file.name)
      storageRef.put(file).then(() => {
        storage
          .ref('users/' + this.user.uid + '/images/' + filePrefix + file.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url)
            // アップロードした画像のURLと画像名をDBに保存
            /*
            this.$store.dispatch('user/uploadImage', {
              id: this.id,
              name: file.name,
              url,
            })
             */
            const userdata = firestore.collection('users').doc(this.user.uid)
            userdata.get().then((result) => {
              const imgs = result.data()
              const a = imgs.images ? imgs.images : []
              a.push(url)
              userdata.set({ images: a, public: true })
              this.images = a
            })
          })
          .catch((error) => {
            console.log(error)
          })
      })
    },
  },
}
</script>

<style scoped></style>
