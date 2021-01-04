<template>
     <div>
        <v-app-bar dark>
            <searchbycryptoname/>
            <v-spacer></v-spacer>
             <v-btn icon  :to="{name: 'Mainpage'}" v-if="auth">
                <v-icon left>mdi-home</v-icon>
            </v-btn>
             <v-btn icon  :to="{name: 'Coins'}">
                <v-icon left>mdi-feature-search</v-icon>
            </v-btn>
            <v-btn  icon  @click="logout" v-if="auth">
                <v-icon left>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>
        </div>
</template>

<script>
  import searchbycryptoname from '@/components/CryptoSearchBar.vue'

    export default {
        components: {
            searchbycryptoname
        },
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

<style></style>
