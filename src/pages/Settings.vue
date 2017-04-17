<template>
  <div class="mt2">
    <h1 class="fw6">Settings</h1>
    <h2 class="fw5 bb pb2 b--dark-gray"><i class="fa fa-link mr1"></i> Connections</h2>
    <div class="cf">
      <div class="fl pv2">
        <span class="mal-icon mr1"></span>
        <span class="fw5">MyAnimeList</span>
        <span v-if="malAuth.username">({{malAuth.username}})</span>
      </div>
      <form class="fr" @submit.prevent="loginMal" v-if="!malAuth.username">
        <input type="text" placeholder="Username" class="ph3 pv2" required v-model="malUsername" />
        <input type="password" placeholder="Password" class="ph3 pv2" required v-model="malPassword" />
        <input type="submit" :value="malLoading ? 'Loading...' : 'Sign in'" class="fw6 ph3 pv2 input-reset ba b--black-20 bg-white bg-animate hover-bg-blue black hover-white br1 pointer f6 dib">
        <div class="red mt1" v-if="malError">Invalid username/password</div>
      </form>
      <div class="fr" v-else>
        <button @click="logoutMal" class="fw6 ph3 pv2 ba b--black-20 bg-white bg-animate hover-bg-blue black hover-white br1 pointer f6 dib">Sign out</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'settings',
    metaInfo: {
      title: 'Settings'
    },
    data () {
      return {
        malUsername: '',
        malPassword: '',
        malLoading: false,
        malError: false
      }
    },
    computed: {
      malAuth () {
        return this.$store.state.malAuth
      }
    },
    methods: {
      async loginMal () {
        this.malError = false
        this.malLoading = true

        try {
          await this.$store.dispatch('authenticateMal', {
            username: this.malUsername,
            password: this.malPassword
          })
          this.malLoading = false
          this.malUsername = ''
          this.malPassword = ''
        } catch (err) {
          this.malLoading = false
          this.malError = true
        }
      },
      logoutMal () {
        this.$store.commit('REMOVE_MAL_AUTH')
      }
    }
  }
</script>

<style>
</style>