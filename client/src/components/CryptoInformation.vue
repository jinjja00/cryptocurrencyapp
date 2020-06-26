<template>
    <div>
        <v-container class="mb-12">
            <v-row justify="center">
                <v-data-table
                    :headers="headers"
                    :items="crypto.cryptoNews"
                    class="mr-5"
                    :hide-default-footer="true"
                    disable-sort
                    dark>
                    <template slot="item" slot-scope="props">
                        <tr>
                            <td v-if="auth">
                                <v-icon @click="AddToFavorite(props.item.id)" color="grey lighten-1">mdi-star</v-icon>
                            </td>
                            <router-link tag="tr" :to="{ name: 'CoinInformation', params: { id: props.item.id }}">
                                <td  style="text-transform: uppercase">{{ props.item.symbol }}</td>
                            </router-link>    
                            <td nowrape="true">
                                <v-chip color="grey darken-1" dark>{{ roundDecimal(props.item.current_price) }} $</v-chip>
                            </td>
                            <td nowrape="true">{{ roundDecimal(props.item.price_change_percentage_1h_in_currency) }} %</td>
                            <td nowrape="true">{{ roundDecimal(props.item.price_change_percentage_24h) }} %</td>
                            <td nowrape="true">{{ roundDecimal(props.item.price_change_percentage_7d_in_currency) }} %</td>
                            <td nowrape="true">{{ props.item.last_updated| moment("MMMM Do YYYY, h:mm:ss a") }}</td>
                            <td><v-sparkline color="white" :value="props.item.sparkline_in_7d.price"></v-sparkline></td>
                        </tr>
                    </template>
                  </v-data-table>
                <v-card class="mr-5" v-if="!isObjectEmpty(cryptoSelected)">
                  <apexchart v-if="options.series" width="500" type="line" :options="options" :series="options.series" ref="apexchart"></apexchart>
                </v-card>
            </v-row>
          </v-container>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import { roundDecimal } from '@/plugins/roundDecimal.js'
    import store from  '@/store/store'

    export default {
        data () {
            return {
                cryptoSelected: {},
                options: {
                    chart: {
                        id: 'vuechart-example'
                    },
                    xaxis: {
                    type: 'numeric'
                    },
                    series: []
                },
                headers: [
                    {
                        text: '#',
                        align: 'start',
                    },
                    {
                        text: 'Name',
                        align: 'start',
                        value : 'symbol'
                    },
                    {
                        text: 'Price (USD)',
                        value: 'current_price'
                    },
                    {
                        text: 'Percent (1h)'
                    },
                    {
                        text: 'Percent (24h)'
                    },
                    {
                        text: 'Percent (7d)'
                    },
                    {
                        text: 'Last Updated',
                        value: 'last_updated'
                    },
                    {
                        text: 'Sparkline',
                        value: 'sparkline_in_7d.price'
                    }
                ]
            }
        },
         beforeCreate: function () {
          store.dispatch('crypto/fetchCrypto')
        },
        methods: {
            AddToFavorite (coinId)  {
                console.log(coinId)

                 store.dispatch('user/addFavoriteCrypto', coinId) 
            },
            handleClick (cryptoRow) {
                if(!this.isObjectEmpty(this.cryptoSelected)) {
                    this.cryptoSelected = {}
                }
                this.cryptoSelected = {...cryptoRow}
                
                store.dispatch('crypto/fetchCryptoQuoteHistory', this.cryptoSelected) 
            
                this.$refs.apexchart.updateSeries([{
                    data: this.$store.state.crypto.cryptoQuotePriceHistory.prices
                }])
                
            },
            isObjectEmpty(obj) {
                for(var key in obj) {
                    if(obj.hasOwnProperty(key)) {
                        return false
                    }
                }
                return true
            },
            roundDecimal  
        },
        computed: {
            ...mapState(['crypto']),
            auth() {
                return this.$store.getters['user/isAuthenticated']
            }
        }, 
    }
</script>

<style scoped>
    tr:hover {
        background-color: transparent !important;
    }

</style>