<template>
  	<div>
		<navbarapp/>
		<v-container fluid>
			<v-row>
				<v-col cols="4" md="2">
					<cryptoeventslist/>
				</v-col>
				<v-row justify="center">
					<v-col cols="12" md="6">
						<v-data-table 
							:items="filterFavoritesCoins" 
							:headers="headersCoin"
							class="mr-5">
							<template slot="item" slot-scope="props">
								<tr>
									<router-link tag="td" :to="{ name: 'CoinInformation', params: { id: props.item.name.toLowerCase() }}">
										<td>{{ props.item.name }}</td>
									</router-link> 
									<td nowrape="true">{{ props.item.current_price }}</td>
									<td nowrape="true">{{ props.item.high_24h }}</td>
									<td nowrape="true"><v-chip color="grey darken-1" dark>{{ roundDecimal(props.item.price_change_percentage_24h) }}%</v-chip></td>
									<td v-if="auth">
                                    <v-icon>mdi-delete</v-icon>
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
				</v-row>
			</v-row>
		</v-container>
  	</div>
</template>

<script>
  import { roundDecimal } from '@/plugins/roundDecimal.js'
  import cryptoeventslist from '@/components/CryptoEventsList.vue'
  import navbarapp from '@/components/NavBarApp.vue'

  export default {
    data(){
      return {
        initialCoins: [],
        favoriteCoins: [],
        filteredFavoriteCoins: [],
         headersCoin: [
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
      roundDecimal
    }
  }
</script>

<style>

</style>

