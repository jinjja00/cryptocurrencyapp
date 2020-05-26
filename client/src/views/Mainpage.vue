<template>
  <div>
       <div>
            <v-toolbar>
                <v-btn  icon v-if="$store.state.user.isUserLoggedin" @click="logout">
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
  methods: {
    logout () {
      this.$store.dispatch('user/setToken', null)
      this.$store.dispatch('user/setUser', null)
      this.$router.push({
        name: 'Homepage'
      })
    }
  }
}
</script>

<style>

</style>