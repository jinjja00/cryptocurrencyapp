<template>
    <div>
        <v-container fluid> 
            <v-row justify="center">
                <v-col cols="8" md="4">
                     <v-img width="150" :src="currentCoinInformation.image.large" aspect-ratio="1"></v-img>
                 
                </v-col>
                <v-col cols="6" md="4">
                    <v-card
                        class="pa-2"
                        outlined
                        tile>
                        .col-6 .col-md-4
                    </v-card>
                 </v-col>
            </v-row>
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
        },
        async mounted () {
            await this.$store.dispatch('crypto/fetchCoinInformation', this.$route.params.id)
            this.currentCoinInformation = this.$store.state.crypto.coinInformation
            console.log(this.currentCoinInformation)
        },
        computed: {
            ...mapState(['crypto'])
        }
    }
</script>

<style scoped>

</style>