<template>
    <div>
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
                        <!-- <v-tooltip left>
                          <template v-slot:activator="{ on }">  v-on="on"-->
                              <td nowrape="true" style="text-transform: uppercase">{{ props.item.symbol }}</td>
                          <!-- </template>
                          <span><td nowrape="true">{{ props.item.name }}</td></span>
                        </v-tooltip> -->
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
                  <apexchart width="500" type="line" :options="options" :series="series" ref="apexchart"></apexchart>
                </v-card>
            </v-row>
          </v-container>
       </header>
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
            ]
          }
        },
        beforeCreate: function () {
          store.dispatch('crypto/fetchCrypto')
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