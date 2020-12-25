<template>
    <div>
        <header class="background">
          <nav-bar></nav-bar>
          <div class="wave-container">
                <h1>Your crypto news!</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#f3f4f5" fill-opacity="1" d="M0,96L60,128C120,160,240,224,360,208C480,192,600,96,720,53.3C840,11,960,21,1080,37.3C1200,53,1320,75,1380,85.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
          </div>
        </header>
        <v-container fluid class="pa-0 ma-0">
            <div class="wave-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#000" fill-opacity="1" d="M0,160L80,149.3C160,139,320,117,480,128C640,139,800,181,960,176C1120,171,1280,117,1360,90.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                </svg>
            </div>
            <v-row justify="space-around" align="center">
                <v-col class="col-md-2 offset-md-2">
                    <img svg-inline :src="require('@/assets/cryptologo/undraw_crypto.svg')" height="500" width="500"/>
                </v-col>
                <v-row>
                    <v-col class="col-md-6 offset-md-4">
                        <h2 class="text-uppercase font-size-custom">Follow the trend</h2>
                    </v-col>
                </v-row>
            </v-row>
            <div class="wave-container lower-heading">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#000" fill-opacity="1" d="M0,160L34.3,186.7C68.6,213,137,267,206,288C274.3,309,343,299,411,277.3C480,256,549,224,617,218.7C685.7,213,754,235,823,218.7C891.4,203,960,149,1029,122.7C1097.1,96,1166,96,1234,122.7C1302.9,149,1371,203,1406,229.3L1440,256L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path>
                    </svg>
                    <v-row>
                        <v-col justify="end" align="center" class="pa-6">
                            <v-card max-width="300"> 
                                    <v-list>
                                        <v-list-item v-for="coin in coins" :key="coin.title">
                                        <v-list-item-content>
                                            <v-list-item-title v-text="coin.title"></v-list-item-title>
                                        </v-list-item-content>

                                        <v-list-item-avatar>
                                            <v-img :src="coin.logo"></v-img>
                                        </v-list-item-avatar>
                                        </v-list-item>
                                    </v-list>
                                    <v-divider></v-divider>
                                <v-list-item-subtitle>
                                    <v-btn
                                        block 
                                        color="white"
                                        :to="{name: 'Coins'}"
                                    >
                                    Browse more..
                                    </v-btn>
                                </v-list-item-subtitle>
                            </v-card>
                        </v-col>  
                     </v-row>
                </div>
        </v-container>
        <footercrypto/>
    </div>
</template>

<script>
      import navBar from '@/components/NavBar'
      import footercrypto from '@/components/CryptoFooter.vue'
  
      export default {
          components: {
            navBar,
            footercrypto,
          },
          data () {
            return {
              coins: [
                { title: 'Bitcoin', logo:  require('@/assets/cryptologo/btc.png')},
                { title: 'Ethereum', logo: require('@/assets/cryptologo/eth.png')},
                { title: 'Tether', logo: require('@/assets/cryptologo/tet.png')},
                { title: 'XRP', logo: require('@/assets/cryptologo/xrp.png')},
                { title: 'Bitcoin Cash', logo: require('@/assets/cryptologo/btcash.png')},
              ]
            }
          },
          mounted : function ()  {
          } 
      }
</script>

<style scoped>
    .font-size-custom {
        font-size: 3em;
    }
    h1 {
        font-size: 5rem;
        margin: 20rem 1rem 2rem 1rem;
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
    @media screen and (max-device-width : 1143px){
        svg {
            visibility: hidden;
        }
        .lower-heading {
            background-color: #000;
        }
        h2 {
            margin-left: 25%;
        }
    }
</style>