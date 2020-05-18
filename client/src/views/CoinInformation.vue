<template>
    <div>
        <v-container fluid>

        </v-container>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import store from  '@/store/store'

    export default {
        data () {
            return {
                currentCoinInformation: {}
            }
        },
        beforeCreate() {
            store.dispatch('crypto/fetchCoinInformation', this.$route.params.id)
        },
        mounted () {
            this.currentCoinInformation = this.$store.state.crypto.coinInformation
        },
        computed: {
            ...mapState(['crypto'])
        }
    }
</script>

<style scoped>

</style>