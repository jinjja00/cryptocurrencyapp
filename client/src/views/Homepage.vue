<template>
    <div>
      <div>
        <v-tool-bar
          dark
          prominent
        >
          <v-btn icon>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </v-tool-bar>
      </div>
       <header class="background">
          <v-container>
            <v-row justify="center">
                <v-data-table
                    :headers="headers"
                    :items="crypto.cryptoNews"
                    class="mr-5"
                    :hide-default-footer="true"
                    light
                  >
                    <template slot="item" slot-scope="props">
                      <tr @click="handleClick(props.item)">
                        <td nowrape="true" style="text-transform: uppercase">{{ props.item.symbol }}</td>
                        <td nowrape="true">
                          <v-chip color="grey darken-1" dark>{{ roundDecimal(props.item.current_price) }} $</v-chip>
                        </td>
                        <td nowrape="true">{{ roundDecimal(props.item.price_change_percentage_24h) }} %</td>
                        <td nowrape="true">{{ props.item.last_updated| moment("MMMM Do YYYY, h:mm:ss a") }}</td>
                        <td><v-sparkline :value="props.item.sparkline_in_7d.price"></v-sparkline></td>
                      </tr>
                    </template>
                  </v-data-table>
                  <div> </div>
                <v-card class="mr-5">
                  <apexchart v-if="options.series" width="500" type="line" :options="options" :series="series" ref="apexchart"></apexchart>
                </v-card>
            </v-row>
          </v-container>
       </header>
       <v-container>
         <h2>Next Blockchain Events</h2>
         <v-card  class="mx-auto my-12" max-width="374" v-for="(event, index) in crypto.cryptoEventIncoming.data" :key="index">
           <v-img
            height="250"
            :src="event.screenshot"/>

            <v-card-title>{{event.title}}</v-card-title>
            <v-card-text>
             <div class="my-4 subtitle-1">{{event.start_date}} to {{event.end_date}}</div>
             <div>{{event.description.substring(0,200)+'...'}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                target="_blank"
                :href="event.website"
                text
                color="deep-purple accent-4"
              >
                Read more..
              </v-btn>
            </v-card-actions>
         </v-card>
       </v-container>
       <v-footer dark padless>
          <v-card
            flat
            tile
            class="black lighten-1 white--text text-center"
            width="100%"
          >
            <v-card-text class="mx-auto">
              <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-4 white--text"
                icon
              >
                <v-icon size="24px">{{ icon }}</v-icon>
              </v-btn>
            </v-card-text>
            
            <v-divider></v-divider>

            <v-card-text class="white--text">
              {{ new Date().getFullYear() }} — <strong>Powered by CoinGecko API</strong>
            </v-card-text>
          </v-card>
       </v-footer>
    </div>
</template>

<script>
    import store from  '@/store/store'
    import { mapState } from "vuex";

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
              series: [],
            },
            headers: [
              {
                text: 'Name',
                align: 'start',
                value : 'symbol'
              },
              {
                text: 'Price (USD)'
              },
              {
                text: 'Percent (24h)'
              },
              {
                text: 'Last Updated'
              },
              {
                text: 'Sparkline'
              }
            ],
            icons: [
              'mdi-gmail',
              'mdi-github',
              'mdi-linkedin',
              'mdi-instagram',
            ],
          }
        },
        beforeCreate: function () {
          store.dispatch('crypto/fetchCrypto')
          store.dispatch('crypto/fetchCryptoEventsIncoming')
        },
        mounted : function ()  {
          console.log(this.crypto.cryptoNews) 
        },
        computed: {
          ...mapState(['crypto'])
        },
        methods: {
          roundDecimal (num) {
            return parseFloat(num).toFixed(2)
          },
          handleClick (cryptoRow) {
            if (this.cryptoSelected.id === cryptoRow.id) {
              return
            }
            this.cryptoSelected = cryptoRow
            
            store.dispatch('crypto/fetchCryptoQuoteHistory', this.cryptoSelected) 
         
            if (this.$store.state.crypto.cryptoQuotePriceHistory.prices) {
              this.$refs.apexchart.updateSeries([{
                data: this.$store.state.crypto.cryptoQuotePriceHistory.prices
              }])
              this.options.series.data = this.$store.state.crypto.cryptoQuotePriceHistory.prices
            }
          }
        }
    }
</script>

<style scoped>
    h1 {
        font-size: 5rem;
        margin: 15rem 1rem 2rem 1rem;
        text-shadow: 2px 2px #A9A9A9
    }
   
    .background {
        background: url('../assets/keyboardbanner.jpg') no-repeat center center fixed;
        background-size: cover;
    }
</style>