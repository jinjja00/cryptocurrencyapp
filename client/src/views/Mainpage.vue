<template>
  <div>
       <div>
            <v-toolbar>
                <v-btn  icon  @click="logout" v-if="auth">
                   <v-icon left>mdi-logout</v-icon>
                </v-btn>
                  <v-btn icon  :to="{name: 'Coins'}">
                   <v-icon left>mdi-feature-search</v-icon>
                </v-btn>
            </v-toolbar>
        </div>
          <v-container fluid>
              <v-row>
                <v-row justify="center">
                  <v-col cols="12" md="6">
                    <v-simple-table dark>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Price</th>
                            <th class="text-left">High 24h</th>
                            <th class="text-left">Change 24h</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="coin in filterFavoritesCoins" :key="coin.id">
                              <td>{{ coin.name }}</td>
                              <td>{{ coin.current_price }}</td>
                              <td>{{ coin.high_24h }}</td>
                              <td><v-chip color="grey darken-1" dark>{{ roundDecimal(coin.price_change_percentage_24h) }}%</v-chip></td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                </v-row>
                <v-col cols="4" md="2">
                  <cryptoeventslist/>
                </v-col>
              </v-row>
          </v-container>
  </div>
</template>

<script>
  import { roundDecimal } from '@/plugins/roundDecimal.js'
  import cryptoeventslist from '@/components/CryptoEventsList.vue'
  export default {
    data(){
      return {
        initialCoins: [],
        favoriteCoins: [],
        filteredFavoriteCoins: []
      }
    },
    components: {
      cryptoeventslist
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
      logout () {
        this.$store.dispatch('user/logoutUser').then(()=>{
          this.$router.push('/')
        })

      }
    }
  }
</script>

<style>

</style>

