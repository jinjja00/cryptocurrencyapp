<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12">
                <v-layout v-resize="onResize" justify-center="true">
                    <v-data-table
                        style="width:90%"
                        :headers="headerFiltered"
                        :items="initialCoins"
                        class="mr-5"
                        :page="2"
                        :hide-default-headers="isMobile" 
                        :class="{mobile: isMobile}"
                        disable-sort
                        :loading="loadingCoins"
                        loading-text="Loading... Please wait">
                        <template slot="item" slot-scope="props">
                            <tr v-if="!isMobile">
                                <td v-if="auth">
                                    <v-icon @click="AddToFavorite(props.item.id)" :color="favoriteUserCoins(props.item.id)">mdi-star</v-icon>
                                </td>
                                <router-link align="baseline" tag="td" :to="{ name: 'CoinInformation', params: { id: props.item.id }}">
                                    <img style="width:25px; vertical-align:middle" :src="props.item.image"/>
                                    {{ props.item.name }}
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
                            <tr v-else>
                                <td>
                                    <router-link class="flex-content" tag="ul" :to="{ name: 'CoinInformation', params: { id: props.item.id }}">
                                        <li class="flex-item" v-if="auth">
                                            <v-icon @click.stop="AddToFavorite(props.item.id)" :color="favoriteUserCoins(props.item.id)">mdi-star</v-icon>
                                        </li>
                                        <li class="flex-item text-uppercase" data-label="Name">                                         
                                            <img style="width:25px; vertical-align:middle" :src="props.item.image"/>
                                            {{ props.item.name }}                                   
                                        </li>
                                        <li class="flex-item" data-label="Price (USD)">${{ roundDecimal(props.item.current_price) }} </li>
                                        <li class="flex-item"  data-label="Percent (1h)">
                                            Percent(1h): <span :style="getColor(props.item.price_change_percentage_1h_in_currency)">{{ roundDecimal(props.item.price_change_percentage_1h_in_currency) }} %</span>
                                        </li>
                                        <li class="flex-item" data-label="Percent (24h)">
                                            Percent(24h): <span :style="getColor(props.item.price_change_percentage_24h)">{{ roundDecimal(props.item.price_change_percentage_24h) }} %</span>
                                        </li>
                                        <li class="flex-item" data-label="Percent (7d)">
                                            Percent(7d): <span :style="getColor(props.item.price_change_percentage_7d_in_currency)">{{ roundDecimal(props.item.price_change_percentage_7d_in_currency) }} %</span>
                                        </li>
                                        <li class="flex-item"></li>
                                        <li class="caption"> 
                                            {{ props.item.last_updated| moment("MM Do YY, h:mm a") }}
                                        </li>
                                     
                                    </router-link>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-layout>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapState } from "vuex"
    import { roundDecimal } from '@/plugins/roundDecimal.js'
    import store from  '@/store/store'

    export default {
        data () {
            return {
                loadingCoins: true,
                isMobile: false,
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
                        width: "180px"
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
        created () {
            this.fetchCrypto()
        },
        async mounted () {
            await this.$store.dispatch('user/setFavoriteCrypto')
            this.favoriteCoins = this.$store.state.user.favoriteCrypto
            console.log(this.favoriteCoins)
        },
        methods: {
            async fetchCrypto () {
                await this.$store.dispatch('crypto/fetchCrypto')
                this.initialCoins = this.$store.state.crypto.cryptoNews
                this.loadingCoins = false
                setTimeout(() => this.fetchCrypto(), 60 * 1000) 
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
            onResize () {
                if (window.innerWidth < 769)
                    this.isMobile = true;
                else
                    this.isMobile = false;
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
     .mobile {
      color: #333;
    }

    @media screen and (max-width: 768px) {
      .mobile table.v-table tr {
        max-width: 100%;
        position: relative;
        display: block;
      }

      .mobile table.v-table tr:nth-child(odd) {
        border-left: 6px solid deeppink;
      }

      .mobile table.v-table tr:nth-child(even) {
        border-left: 6px solid cyan;
      }

      .mobile table.v-table tr td {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #f5f5f5;
        height: auto;
        padding: 10px;
      }

      .mobile table.v-table tr td ul li:before {
        content: attr(data-label);
        padding-right: .5em;
        text-align: left;
        display: block;
        color: #999;

      }
      .v-datatable__actions__select
      {
        width: 50%;
        margin: 0px;
        justify-content: flex-start;
      }
      .mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
        background: transparent;
      }

    }
    .flex-content {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    .flex-item {
        width: 50%;
        font-weight: bold;
    }
</style>