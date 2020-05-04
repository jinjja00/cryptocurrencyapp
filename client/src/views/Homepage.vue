<template>
    <div>
       <header class="background">
         <Navbar/>
         <div class="wave-container">
             <h1>Welcome! Tabarnak</h1>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#f3f4f5" fill-opacity="1" d="M0,96L60,128C120,160,240,224,360,208C480,192,600,96,720,53.3C840,11,960,21,1080,37.3C1200,53,1320,75,1380,85.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
              </svg>
         </div>
       </header>
       <v-lazy :options="{threshold: .5}" min-height="400">
          <div class="wave-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#000" fill-opacity="1" d="M0,160L80,149.3C160,139,320,117,480,128C640,139,800,181,960,176C1120,171,1280,117,1360,90.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
            </svg>
          </div>
       </v-lazy>
       <div>
         <v-app>
             <v-data-table
                :headers="headers"
                :items="crypto.cryptoNews"
                class="elevation-1"
              >
                <template slot="item" slot-scope="props">
                  <tr>
                    <!-- <v-tooltip left>
                      <template v-slot:activator="{ on }">  v-on="on"-->
                          <td nowrape="true">{{ props.item.symbol }}</td>
                      <!-- </template>
                      <span><td nowrape="true">{{ props.item.name }}</td></span>
                    </v-tooltip> -->
                    <td nowrape="true">{{ props.item.quote.USD.price }}</td>
                    <td nowrape="true">{{ props.item.quote.USD.percent_change_24h }} %</td>
                    <td nowrape="true">{{ props.item.last_updated }}</td>
                  </tr>
                </template>
              </v-data-table>
         </v-app>
       </div>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar.vue"
    import store from  '@/store/store'
    import { mapState } from "vuex";
    
    export default {
        data () {
          return {
             headers: [
                {
                  text: 'Name',
                  align: 'start'
                },
                {
                  text: 'Price'
            
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
        components: {
            Navbar
        },
        beforeCreate: function () {
          store.dispatch('crypto/fetchCrypto')
        },
        mounted : function ()  {
  
          console.log(this.crypto.cryptoNews)
        },
        computed: {
          ...mapState(['crypto'])
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
        height: 90vh;
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