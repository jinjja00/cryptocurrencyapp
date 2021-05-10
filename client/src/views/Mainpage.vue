<template>
	<div>
		<navbarapp/>
		<v-container>
			<v-row>
				<v-col cols="12">
					<cryptoeventslist/>
				</v-col>
				<v-col cols="12">
					<v-layout v-resize="onResize">
						<v-data-table 
							:items="filterFavoritesCoins"
							:headers="headersCoin"
							:hide-default-headers="isMobile" 
							:class="{mobile: isMobile}"
							disable-sort
              				:loading="loadingCoins"
              				loading-text="Loading... Please wait">
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
										<router-link class="flex-content" tag="ul" :to="{ name: 'CoinInformation', params: { id: props.item.id }}">										
											<li class="flex-item text-uppercase" data-label="Name">														
												<img class="coin" style="vertical-align:middle" :src="props.item.image"/>
												{{ props.item.symbol }}																													
											</li>
											<li class="flex-item"  data-label="Percent (1h)">
												<v-sparkline :color="getColor(props.item.price_change_percentage_7d_in_currency)" :value="props.item.sparkline_in_7d.price"></v-sparkline>
											</li>
											<li class="flex-item" data-label="Price (USD)">${{ roundDecimal(props.item.current_price) }} </li>
											<v-icon  v-if="auth" @click.stop="removeFavoriteCoin(props.item.id)">mdi-delete</v-icon>			
										</router-link>									
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
					</v-layout>
				</v-col>
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
        loadingCoins: true,
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

      this.loadingCoins = false
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
			return num > 0 ? "green" : "red";
		},
    }
  }
</script>

<style scoped>
	.coin{
		width: 20%;
	}
     tr:hover {
        background-color: transparent !important;
    }
    .flex-content {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
		    flex-direction: row;
        width: 100%;
    }

    .flex-item {
        margin-right: 5%;
        width: 50%;
        font-weight: bold;
    }
</style>

