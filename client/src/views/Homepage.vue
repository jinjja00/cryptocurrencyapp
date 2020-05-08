<template>
    <div>
       <header class="background">
         <div class="wave-container">
             <h1>Get Your Crypto News ! </h1>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#f3f4f5" fill-opacity="1" d="M0,96L60,128C120,160,240,224,360,208C480,192,600,96,720,53.3C840,11,960,21,1080,37.3C1200,53,1320,75,1380,85.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
              </svg>
         </div>
       </header>
       <v-container>
         <v-row justify="center">
           <v-app>
             <v-data-table
                :headers="headers"
                :items="crypto.cryptoNews"
                class="elevation-1"
                :hide-default-footer="true"
                dark
              >
                <template slot="item" slot-scope="props">
                  <tr>
                    <!-- <v-tooltip left>
                      <template v-slot:activator="{ on }">  v-on="on"-->
                          <td nowrape="true">{{ props.item.symbol }}</td>
                      <!-- </template>
                      <span><td nowrape="true">{{ props.item.name }}</td></span>
                    </v-tooltip> -->
                    <td nowrape="true">
                      <v-chip color="grey darken-1" dark>{{ roundDecimal(props.item.quote.USD.price) }} $</v-chip>
                      </td>
                    <td nowrape="true">{{  roundDecimal(props.item.quote.USD.percent_change_24h) }} %</td>
                    <td nowrape="true">{{ props.item.last_updated| moment("MMMM Do YYYY, h:mm:ss a") }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-app>
            <div>
               <apexchart width="500" type="candlestick" :options="options" :series="series"></apexchart>
            </div>
         </v-row>
       </v-container>
       {{crypto.cryptoQuoteHistory}}
    </div>
</template>

<script>
    import store from  '@/store/store'
    import { mapState } from "vuex";

    export default {
        data () {
          return {
            options: {
              chart: {
                id: 'vuechart-example'
              },
              xaxis: {
                categories: ['BTC', 'ETH', 'XRP', 1994, 1995, 1996, 1997, 1998]
              }
            },
            series: [{
              data: [
               {
                  x: new Date(2016, 1, 1),
                  y: [40, 30, 29, 10]
               },
               {
                  x: new Date(2016, 4, 6),
                  y: [51.98, 56.29, 51.59, 53.85]
               },
               {
                  x: new Date(2016, 6, 1),
                  y: [55, 56.29, 67, 80]
               },
              ]
            }],
            headers: [
              {
                text: 'Name',
                align: 'start'
              },
              {
                text: 'Price (USD)'
          
              },
              {
                text: 'Percent (24h)'
              },
              {
                text: 'Last Updated'
              }
            ]
          }
        },
        beforeCreate: function () {
          store.dispatch('crypto/fetchCrypto')
          store.dispatch('crypto/fetchCryptoQuoteHistory')
        },
        mounted : function ()  {
  
        },
        computed: {
          ...mapState(['crypto'])
        },
        methods: {
          roundDecimal(num) {
            return parseFloat(num).toFixed(2)
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
    .wave-container > svg {
        display: block;
    }
    .wave-container {
        position: relative;
        color: #f3f4f5;
        text-align: center; 
    }
    .background {
        background: url('../assets/keyboardbanner.jpg') no-repeat center center fixed;
        background-size: cover;
        height: 80vh;
        overflow: hidden;
    }
    .section-description {
        background-color: black;
        height: 70vh;
    }
    .wave-container > svg{
      display: block;
      transform-origin: bottom;
      animation: animateWave 1000ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
    }

    @keyframes animateWave {
      0% {
        transform: scale(1,0);
      }
      100% {
        transform: scale(1,1);
      }
    }
</style>