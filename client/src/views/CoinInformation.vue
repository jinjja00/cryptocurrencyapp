<template>
    <div>
        <navbarapp/>
        <v-container fluid class="grey lighten-4 mt-5"> 
            <v-row justify="center">
                <v-col cols="8" md="4" >
                    <v-img width="50" :src="currentCoinInformation.image.large" aspect-ratio="1"></v-img>
                    {{currentCoinInformation.name}}
                    <h3 class="overline">{{currentCoinInformation.last_updated | moment("MMMM Do YYYY, h:mm:ss a")}}</h3>
                    <h3 class="overline">
                       Rank:<span class="font-weight-black"> #{{currentCoinInformation.market_cap_rank}}</span>
                    </h3>
                    <h3 class="overline">
                       Market Cap:<span class="font-weight-black"> ${{Number(currentCoinInformation.market_data.market_cap.usd).toLocaleString('en-US', {maximumFractionDigits:2})}}
                     </span>
                    </h3>
                </v-col>
                <v-col cols="4" md="4" class=" d-flex flex-row align-self-start justify-end flex-wrap">
                     <h1>$ {{currentCoinInformation.market_data.current_price.usd}}</h1>
                     <h1 class="caption" :style="getColor(currentCoinInformation.market_data.price_change_percentage_1h_in_currency.usd)">
                        {{ roundDecimal(currentCoinInformation.market_data.price_change_percentage_1h_in_currency.usd) }} %
                    </h1>
                </v-col>
                <v-col cols="8">
                    <v-row class="d-flex flex-row mt-2" justify="center" >
                        <v-col>
                            <h3 class="overline ">Price Change 24h(%)</h3>
                            <span :style="getColor(currentCoinInformation.market_data.price_change_percentage_24)">
                                {{ roundDecimal(currentCoinInformation.market_data.price_change_percentage_24h) }}
                            </span>
                        </v-col>
                        <v-col>
                            <h3 class="overline">Price Change 7d(%)</h3>
                            <span :style="getColor(currentCoinInformation.market_data.price_change_percentage_7d)">
                                {{ roundDecimal(currentCoinInformation.market_data.price_change_percentage_7d) }}
                            </span>
                        </v-col>
                        <v-col>
                            <h3 class="overline">Price Change 30d(%)</h3>
                            <span :style="getColor(currentCoinInformation.market_data.price_change_percentage_30d)">
                                {{ roundDecimal(currentCoinInformation.market_data.price_change_percentage_30d) }}
                            </span>   
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row justify="center">
                <v-col cols="8" md="4" align="center">
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
        <v-divider class="mx-16"></v-divider>
        <apexchart class="chartHeightWidth" v-if="options.series" type="line" :options="options" :series="options.series" ref="apexchart"></apexchart>
        <footercrypto/>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import { roundDecimal } from '@/plugins/roundDecimal.js'
    import footercrypto from '@/components/CryptoFooter'
     import navbarapp from '@/components/NavBarApp.vue'

    export default {
        components: {
            navbarapp,
            footercrypto
        },
        data () {
            return {
                currentCoinInformation: {},
                 options: {
                    chart: {
                        id: 'vuechart-example',
                        width: "100%"
                    },
                    xaxis: {
                        type: 'datetime'
                    },
                    series: [],
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
            },
            getColor (num) {
                return num > 0 ? "color:green" : "color:red";
            },
        },
        computed: {
            ...mapState(['crypto'])
        }
    }
</script>

<style scoped>
    .chartHeightWidth {
        margin: auto;
        max-height: 700px;
        max-width: 700px;
    }
</style>