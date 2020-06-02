<template>
  <div>
       <div>
            <v-toolbar>
                <v-btn  icon  @click="logout" v-if="auth">
                   <v-icon left>mdi-logout</v-icon>
                </v-btn>
                  <v-btn icon  :to="{name: 'Coins'}">
                   <v-icon left>mdi-feature-search</v-icon>
                </v-btn>
            </v-toolbar>
        </div>
  </div>
</template>

<script>
export default {
  computed: {
    auth() {
      return this.$store.getters['user/isAuthenticated']
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logoutUser').then(()=>{
         this.$router.push('/')
      })

    }
  }
}
</script>

<style>

</style>