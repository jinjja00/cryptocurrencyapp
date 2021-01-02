<template>
    <div>
        <v-container class="mb-12">
            <v-row justify="center">
                <v-data-table
                    :headers="headerFiltered"
                    :items="initialCoins"
                    class="mr-5"
                    :hide-default-footer="true"
                    disable-sort>
                    <template slot="item" slot-scope="props">
                        <tr>
                            <td v-if="auth">
                                <v-icon @click="AddToFavorite(props.item.id)" :color="favoriteUserCoins(props.item.id)">mdi-star</v-icon>
                            </td>
                            <router-link tag="tr" :to="{ name: 'CoinInformation', params: { id: props.item.id }}">
                                <td style="inline-block;"> 
                                    <v-img max-width="20" :src="props.item.image"/>
                                    {{ props.item.name }}
                                </td>
                            </router-link>    
                            <td nowrape="true">
                                ${{ roundDecimal(props.item.current_price) }} 
                            </td>
                            <td nowrape="true" :style="getColor(props.item.price_change_percentage_1h_in_currency)">
                                {{ roundDecimal(props.item.price_change_percentage_1h_in_currency) }} %
                            </td>
                            <td nowrape="true" :style="getColor(props.item.price_change_percentage_24h)">
                                {{ roundDecimal(props.item.price_change_percentage_24h) }} %
                            </td>
                            <td nowrape="true" :style="getColor(props.item.price_change_percentage_7d_in_currency)">
                                {{ roundDecimal(props.item.price_change_percentage_7d_in_currency) }} %
                            </td>
                            <td nowrape="true">{{ props.item.last_updated| moment("MMMM Do YYYY, h:mm:ss a") }}</td>
                            <td><v-sparkline color="black" :value="props.item.sparkline_in_7d.price"></v-sparkline></td>
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
                        value: 'fav'
                    },
                    {
                        text: 'Name',
                        align: 'start',
                        value : 'symbol',
                        width: "1%"
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
            this.fetchCrypto()
            await this.$store.dispatch('user/setFavoriteCrypto')

            this.initialCoins = this.$store.state.crypto.cryptoNews
            this.favoriteCoins = this.$store.state.user.favoriteCrypto
        },
        methods: {
            async fetchCrypto () {
                await this.$store.dispatch('crypto/fetchCrypto')
                //setTimeout(() => this.fetchCrypto(), 60 * 1000) 
            },
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
            getColor (num) {
                return num > 0 ? "color:green" : "color:red";
            },
            roundDecimal  
        },
        computed: {
            ...mapState(['crypto']),
            auth () {
                return this.$store.getters['user/isAuthenticated']
            },
            headerFiltered() {
                if (!this.auth) {
                    let headerCopy = this.headers.slice(0)
                    return headerCopy.filter(x => x.value !== "fav")
                }

                return this.headers
            }
        }, 
    }
</script>

<style scoped>
    tr:hover {
        background-color: transparent !important;
    }
</style>