<template>
    <div>
        <v-container fluid> 
            <v-row justify="center">
                <v-col cols="8" md="4">
                    <v-img width="50" :src="currentCoinInformation.image.large" aspect-ratio="1"></v-img>
                    {{currentCoinInformation.name}}
                    <subtitle>{{currentCoinInformation.last_updated | moment("MMMM Do YYYY, h:mm:ss a")}}</subtitle>
                </v-col>
                <v-col cols="4" md="4" align="end">
                     <h1 class="display-3">$ {{currentCoinInformation.market_data.current_price.usd}}</h1>
                 </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="6" md="3">
                    <h3>Market Cap</h3>
                    <span>Rank #{{currentCoinInformation.market_cap_rank}}</span>
                </v-col>
                <v-col cols="4" md="2">
                    <h3>Low 24h / High 24h</h3>
                    <span>$ {{currentCoinInformation.market_data.low_24h.usd}} / $ {{currentCoinInformation.market_data.high_24h.usd}}</span>
                    <h3>Market Cap</h3>
                    <span> $ {{Intl.NumberFormat().format(currentCoinInformation.market_data.market_cap.usd)}}</span>
                </v-col>
                 <v-col cols="4" md="2">
                    <h3>Circulating Supply</h3>
                    <span>$ {{currentCoinInformation.market_data.circulating_supply}} / {{currentCoinInformation.market_data.total_supply}}</span>
                </v-col>
            </v-row>
            <v-row justify="center"> 
                <v-col cols="12" md="6">
                    <v-btn rounded class="ma-2"  color="black" dark :href="currentCoinInformation.links.subreddit_url" target="_blank">
                        <v-icon left>mdi-reddit</v-icon> Reddit
                    </v-btn>
                    <v-btn rounded class="ma-2" color="black" dark :href="currentCoinInformation.links.repos_url.github[0]" target="_blank">
                        <v-icon left>mdi-github</v-icon> Github
                    </v-btn>
                    <v-btn rounded class="ma-2" color="black" dark :href="`https://twitter.com/`+currentCoinInformation.links.twitter_screen_name" target="_blank">
                        <v-icon left>mdi-twitter</v-icon> Twitter
                    </v-btn>
                    <v-btn rounded class="ma-2" color="black" dark :href="currentCoinInformation.links.homepage[0]" target="_blank">
                        Homepage
                    </v-btn>
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