<template>
    <div>
         <div>
            <v-toolbar>
                <v-btn  icon  v-if="auth">
                   <v-icon left>mdi-logout</v-icon>
                </v-btn>
                  <v-btn icon  :to="{name: 'Coins'}">
                   <v-icon left>mdi-feature-search</v-icon>
                </v-btn>
            </v-toolbar>
        </div>
        <cryptoInformation/>
    </div>
</template>

<script>
    import cryptoInformation from "@/components/CryptoInformation"

    export default {
        components: {
            cryptoInformation
        },
        computed: {
            auth() {
                return this.$store.getters['user/isAuthenticated']
            }
        }
    }
</script>

<style scoped>

</style>