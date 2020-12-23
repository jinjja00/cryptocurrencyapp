<template>
    <div>
        <v-container fluid class="grey lighten-4"> 
            <v-row justify="center">
                <v-col cols="8" md="4">
                    <v-img width="50" :src="currentCoinInformation.image.large" aspect-ratio="1"></v-img>
                    {{currentCoinInformation.name}}
                    <h3 class="overline">{{currentCoinInformation.last_updated | moment("MMMM Do YYYY, h:mm:ss a")}}</h3>
                </v-col>
                <v-col cols="4" md="4" align="end">
                     <h1>$ {{currentCoinInformation.market_data.current_price.usd}}</h1>
                 </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="2" md="2">
                    <h3 class="overline">Market Cap</h3>
                    <span>Rank #{{currentCoinInformation.market_cap_rank}}</span>
                </v-col>
                <v-col cols="12" md="6" align="end">
                      <v-btn rounded class="ma-2 pa-4" color="black" dark small :href="currentCoinInformation.links.subreddit_url" target="_blank">
                        <v-icon left>mdi-reddit</v-icon> Reddit
                    </v-btn>
                    <v-btn rounded class="ma-2 pa-4" color="black" dark small :href="currentCoinInformation.links.repos_url.github[0]" target="_blank">
                        <v-icon left>mdi-github</v-icon> Github
                    </v-btn>
                    <v-btn rounded class="ma-2 pa-4" color="black" dark small :href="`https://twitter.com/`+currentCoinInformation.links.twitter_screen_name" target="_blank">
                        <v-icon left>mdi-twitter</v-icon> Twitter
                    </v-btn>
                    <v-btn rounded class="ma-2 pa-4" color="black" dark small :href="currentCoinInformation.links.homepage[0]" target="_blank">
                        Homepage
                    </v-btn>

                </v-col>
            </v-row>
        </v-container>
        <v-container class="pa-16">
            <v-row justify="center">
                 <v-col cols="4" md="2">
                    <h3 class="overline">Low 24h / High 24h</h3>
                    <span class="font-weight-regular">$ {{currentCoinInformation.market_data.low_24h.usd}} / $ {{currentCoinInformation.market_data.high_24h.usd}}</span>

                    <h3 class="overline">Market Cap</h3>
                    <span> $ {{Intl.NumberFormat().format(currentCoinInformation.market_data.market_cap.usd)}}</span>

                    <h3 class="overline">Circulating Supply</h3>
                    <span>{{currentCoinInformation.market_data.circulating_supply}} / {{currentCoinInformation.market_data.total_supply}}</span>
                </v-col>
                <v-col cols="4" md="2">
                    <h3 class="overline">Price Change 24h(%)</h3>
                    <span>{{ roundDecimal(currentCoinInformation.market_data.price_change_percentage_24h) }}</span>

                    <h3 class="overline">Price Change 7d(%)</h3>
                    <span>{{ roundDecimal(currentCoinInformation.market_data.price_change_percentage_7d) }}</span>

                    <h3 class="overline">Price Change 30d(%)</h3>
                    <span>{{ roundDecimal(currentCoinInformation.market_data.price_change_percentage_30d) }}</span>
                </v-col>
                <v-col cols="4" md="2">
                    <h3 class="overline">Price Change 24h(%)</h3>
                    <span>{{ roundDecimal(currentCoinInformation.market_data.price_change_percentage_24h) }}</span>

                    <h3 class="overline">Price Change 7d(%)</h3>
                    <span>{{ roundDecimal(currentCoinInformation.market_data.price_change_percentage_7d) }}</span>

                    <h3 class="overline">Price Change 30d(%)</h3>
                    <span>{{ roundDecimal(currentCoinInformation.market_data.price_change_percentage_30d) }}</span>
                </v-col>
            </v-row>
        </v-container>
         <v-divider class="mx-16"></v-divider>
        <v-container fluid class="pa-16">
            <v-row justify="center">
                 <apexchart v-if="options.series" width="1000" type="line" :options="options" :series="options.series" ref="apexchart"></apexchart>
            </v-row>
        </v-container>
        <footercrypto/>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import moment from "moment"
    import { roundDecimal } from '@/plugins/roundDecimal.js'
    import footercrypto from '@/components/CryptoFooter'

    export default {
        components: {
            footercrypto
        },
        data () {
            return {
                currentCoinInformation: {},
                 options: {
                    chart: {
                        id: 'vuechart-example'
                    },
                    xaxis: {
                        type: 'datetime'
                    },
                    series: []
                },
            }
        },
        beforeCreate() {
        },
        async mounted () {
            await this.$store.dispatch('crypto/fetchCoinInformation', this.$route.params.id)
            this.currentCoinInformation = this.$store.state.crypto.coinInformation

            await this.$store.dispatch('crypto/fetchCryptoQuoteHistory', this.$route.params.id) 
            
            this.$refs.apexchart.updateSeries([{
                data: this.filterPriceQuote()
            }])
        },
        methods : {
            roundDecimal,
            filterPriceQuote () {
                 return this.$store.state.crypto.cryptoQuotePriceHistory.prices.map(quote => [
                    quote[0], 
                    Math.round(quote[1])
                ])
            }
        },
        computed: {
            ...mapState(['crypto'])
        }
    }
</script>

<style scoped>

</style>