<template>
    <div>
        <v-container class="mb-12">
            <v-row justify="center">
                <v-data-table
                    :headers="headers"
                    :items="initialCoins"
                    class="mr-5"
                    :hide-default-footer="true"
                    disable-sort
                    dark>
                    <template slot="item" slot-scope="props">
                        <tr>
                            <td v-if="auth">
                                <v-icon @click="AddToFavorite(props.item.id)" :color="favoriteUserCoins(props.item.id)">mdi-star</v-icon>
                            </td>
                            <router-link tag="tr" :to="{ name: 'CoinInformation', params: { id: props.item.id }}">
                                <td  style="text-transform: uppercase">{{ props.item.symbol }}</td>
                            </router-link>    
                            <td nowrape="true">
                                <v-chip color="grey darken-3" dark>{{ roundDecimal(props.item.current_price) }} $</v-chip>
                            </td>
                            <td nowrape="true" :style="{color: (Math.sign(props.item.price_change_percentage_1h_in_currency) === 1 ? 'green' : 'red')}">
                                {{ roundDecimal(props.item.price_change_percentage_1h_in_currency) }} %
                            </td>
                            <td nowrape="true" :style="{color: (Math.sign(props.item.price_change_percentage_24h) === 1 ? 'green' : 'red')}">
                                {{ roundDecimal(props.item.price_change_percentage_24h) }} %
                            </td>
                            <td nowrape="true" :style="{color: (Math.sign(props.item.price_change_percentage_7d_in_currency) === 1 ? 'green' : 'red')}">
                                {{ roundDecimal(props.item.price_change_percentage_7d_in_currency) }} %
                            </td>
                            <td nowrape="true">{{ props.item.last_updated| moment("MMMM Do YYYY, h:mm:ss a") }}</td>
                            <td><v-sparkline color="white" :value="props.item.sparkline_in_7d.price"></v-sparkline></td>
                        </tr>
                    </template>
                  </v-data-table>
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
                initialCoins: [],
                favoriteCoins: [],
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
        async mounted () {
            await this.$store.dispatch('crypto/fetchCrypto')
            await this.$store.dispatch('user/setFavoriteCrypto')

            this.initialCoins = this.$store.state.crypto.cryptoNews
            this.favoriteCoins = this.$store.state.user.favoriteCrypto
        },
        methods: {
            AddToFavorite (coinId)  {
                const coinIndex = this.favoriteCoins.findIndex(e => e.cryptoName === coinId)

                if (coinIndex === -1) {
                    store.dispatch('user/addFavoriteCrypto', coinId)

                    this.favoriteCoins.push({cryptoName: coinId})
                } else {
                    store.dispatch('user/removeFavoriteCrypto', coinId)
                  
                    this.favoriteCoins.splice(coinIndex, 1)
                }
            },
            favoriteUserCoins(coinId) {
                return this.favoriteCoins.some(e => e.cryptoName === coinId) ? 'yellow' : 'grey lighten-1'
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