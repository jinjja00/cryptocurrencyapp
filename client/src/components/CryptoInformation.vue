<template>
    <div>
        <v-container>
            <v-row justify="center">
                <v-data-table
                    :headers="headers"
                    :items="crypto.cryptoNews"
                    class="mr-5"
                    :hide-default-footer="true"
                    dark>
                    <template slot="item" slot-scope="props">
                        <router-link tag='tr' :to="{ name: 'CoinInformation', params: { id: props.item.id }}">
                                <td nowrape="true" style="text-transform: uppercase">{{ props.item.symbol }}</td>
                                <td nowrape="true">
                                    <v-chip color="grey darken-1" dark>{{ roundDecimal(props.item.current_price) }} $</v-chip>
                                </td>
                                <td nowrape="true">{{ roundDecimal(props.item.price_change_percentage_1h_in_currency) }} %</td>
                                <td nowrape="true">{{ roundDecimal(props.item.price_change_percentage_24h) }} %</td>
                                <td nowrape="true">{{ roundDecimal(props.item.price_change_percentage_7d_in_currency) }} %</td>
                                <td nowrape="true">{{ props.item.last_updated| moment("MMMM Do YYYY, h:mm:ss a") }}</td>
                                <td><v-sparkline color="white" :value="props.item.sparkline_in_7d.price"></v-sparkline></td>
                        </router-link>
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
            roundDecimal (num) {
                return parseFloat(num).toFixed(2)
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
            }
            
        },
        computed: {
            ...mapState(['crypto'])
          }
    }
</script>

<style scoped>

</style>