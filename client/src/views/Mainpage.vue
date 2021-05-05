<template>
	<div>
		<navbarapp/>
		<v-container>
			<v-row>
				<v-col cols="12" md="2" sm>
					<cryptoeventslist/>
				</v-col>
				<v-row justify="center">
					<v-layout v-resize="onResize">
						<v-col cols="12">
							<v-data-table 
								:items="filterFavoritesCoins" 
								:headers="headersCoin"
								:hide-default-headers="isMobile" 
								:class="{mobile: isMobile}"
								 disable-sort>
								<template slot="item" slot-scope="props">
									<tr v-if="!isMobile">
										<td v-if="auth">
											<v-icon @click="removeFavoriteCoin(props.item.id)">mdi-delete</v-icon>
										</td>
										<router-link tag="td" :to="{ name: 'CoinInformation', params: { id: props.item.name.toLowerCase() }}">
											<td>{{ props.item.name }}</td>
										</router-link> 
										<td nowrape="true">{{ props.item.current_price }}</td>
										<td nowrape="true">{{ props.item.high_24h }}</td>
										<td nowrape="true"><v-chip color="grey darken-1" dark>{{ roundDecimal(props.item.price_change_percentage_24h) }}%</v-chip></td>
									</tr>
									<tr v-else>
										<td>
											<ul class="flex-content">
												<li class="flex-item" v-if="auth"><v-icon @click="removeFavoriteCoin(props.item.id)">mdi-delete</v-icon></li>
												<li class="flex-item text-uppercase" data-label="Name">
													<router-link class="text-xs-right" align="baseline" tag="td" :to="{ name: 'CoinInformation', params: { id: props.item.id }}">
														<img style="width:25px; vertical-align:middle" :src="props.item.image"/>
															{{ props.item.name }}															
													</router-link> 
												</li>
												<li class="flex-item" data-label="Price (USD)">${{ roundDecimal(props.item.current_price) }} </li>
												<li class="flex-item"  data-label="Percent (1h)">
                                            		Percent(1h): <span :style="getColor(props.item.price_change_percentage_1h_in_currency)">{{ roundDecimal(props.item.price_change_percentage_1h_in_currency) }} %</span>
                                       			</li>
												<li class="flex-item" data-label="Percent (24h)">
													Percent(24h): <span :style="getColor(props.item.price_change_percentage_1h_in_currency)">{{ roundDecimal(props.item.price_change_percentage_24h) }} %</span>
												</li>
                                        		<li class="flex-item" data-label="Percent (7d)">
                                            		Percent(7d): <span :style="getColor(props.item.price_change_percentage_1h_in_currency)">{{ roundDecimal(props.item.price_change_percentage_7d_in_currency) }} %</span>
												</li>
												<li class="flex-item"></li>
												<li class="caption"> 
													{{ props.item.last_updated| moment("MM Do YY, h:mm a") }}
												</li>								
											</ul>
										</td>
                            		</tr>
								</template>
								<template v-slot:no-data>
									<p>No crypto currencies in your favorite.<br>
										To add a currency go here
										<router-link class="black--text text-decoration-none" :to="{ name: 'Coins'}">
											Crypto Currency
										</router-link> 
									</p>
								</template>
							</v-data-table>
						</v-col>
					</v-layout>
				</v-row>
			</v-row>
		</v-container>
	</div>
</template>

<script>
  import { roundDecimal } from '@/plugins/roundDecimal.js'
  import cryptoeventslist from '@/components/CryptoEventsList.vue'
  import navbarapp from '@/components/NavBarApp.vue'
  import store from  '@/store/store'

  export default {
    data(){
      return {
		isMobile: false,
        initialCoins: [],
        favoriteCoins: [],
        filteredFavoriteCoins: [],
        headersCoin: [
                    {
                        text: '#'
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
                        text: 'High (24h)'
                    },
					{
                        text: 'Percent (24h)'
                    },
                ]
      }
    },
    components: {
      cryptoeventslist,
      navbarapp
    },
    async mounted () {
      await this.$store.dispatch('crypto/fetchCrypto')
      await this.$store.dispatch('user/setFavoriteCrypto')

      this.initialCoins = this.$store.state.crypto.cryptoNews
      this.favoriteCoins = this.$store.state.user.favoriteCrypto
    },
    computed: {
      auth() {
        return this.$store.getters['user/isAuthenticated']
      },
      filterFavoritesCoins () {
        const usersSet = this.favoriteCoins.reduce((set, { cryptoName }) => set.add(cryptoName), new Set)

        let  filteredFavoriteCoins = this.initialCoins.filter(({ id }) => usersSet.has(id))

        return filteredFavoriteCoins
      }
    },
    methods: {
		roundDecimal,
		removeFavoriteCoin (coinId) {
			const index = this.favoriteCoins.map(function(item) {
    			return item.cryptoName
			}).indexOf(coinId)

			store.dispatch('user/removeFavoriteCrypto', coinId)				
			this.favoriteCoins.splice(index, 1)
		},
		 onResize () {
			if (window.innerWidth < 769)
				this.isMobile = true;
			else
				this.isMobile = false;
        },
		getColor (num) {
                return num > 0 ? "color:green" : "color:red";
        },
    }
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
      padding: 5px;
      width: 50%;
      height: 40px;
      font-weight: bold;
    }
</style>

