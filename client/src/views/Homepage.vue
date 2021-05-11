<template>
    <div>
        <v-lazy>
            <header class="background">
            <nav-bar></nav-bar>
            <v-divider dark></v-divider>
            <div class="wave-container">
                    <h1>Your crypto news!</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#f3f4f5" fill-opacity="1" d="M0,96L60,128C120,160,240,224,360,208C480,192,600,96,720,53.3C840,11,960,21,1080,37.3C1200,53,1320,75,1380,85.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                    </svg>
            </div>
            </header>
        </v-lazy>
        <v-container fluid class="pa-0 ma-0"> 
            <div class="wave-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#000" fill-opacity="1" d="M0,160L80,149.3C160,139,320,117,480,128C640,139,800,181,960,176C1120,171,1280,117,1360,90.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                </svg>
            </div>
             <h2 class="text-uppercase font-size-custom text-center">Follow your favorite crypto</h2>
            <v-row  justify="center" align="center" no-gutters>
                <v-col md="5" class="hidden-sm-and-down">
                    <img class="logo-woman" svg-inline :src="require('@/assets/cryptologo/undraw_crypto.svg')" height="400" width="400"/>
                </v-col> 
                <v-col md="3" align="center" class="mt-9 mb-9">
                    <cryptotablehomepage/>
                </v-col> 
            </v-row>
        </v-container>
        <v-divider class="ma-5"></v-divider>
        <v-container fluid class="pa-0 ma-0">
            <h2 class="text-uppercase text-center">CoinGecko Trend</h2>
            <v-sheet class="mx-auto" max-width="800">
                <v-slide-group
                    style="background-color:#f9f9f9;"
                    class="pa-4"
                    active-class="success"
                    show-arrows>  
                        <v-slide-item
                            v-for="coin in trendingCoin.coins"
                            :key="coin.item.id">
                                <router-link 
                                    tag="v-card" 
                                    :to="{ name: 'CoinInformation', params: { id: coin.item.id.toLowerCase() }}"
                                    height="120"
                                    class="ma-4"
                                    width="100">
                                        <v-row
                                            class="fill-height ma-3"
                                            align="center"
                                            justify="center">
                                            <v-col align="center">
                                                <img class="coin" style="vertical-align:middle; width:30%;" :src="coin.item.small"/>
                                                <div class="subtitle-2">{{coin.item.name}}</div>
                                                <div class="caption">Rank:{{coin.item.market_cap_rank}}</div>
                                            </v-col>        
                                        </v-row>
                                </router-link>
                        </v-slide-item>
                </v-slide-group>
            </v-sheet>
        </v-container>
        <footercrypto/>
    </div>
</template>

<script>
        import navBar from '@/components/NavBar'
        import footercrypto from '@/components/CryptoFooter.vue'
        import cryptotablehomepage from '@/components/CryptoTableHomePage.vue'
        import store from  '@/store/store'
  
        export default {
            components: {
                navBar,
                cryptotablehomepage,
                footercrypto,
            },
            data(){
                return {
                    trendingCoin: [],
            
                }
            },
            async mounted () {
                await this.$store.dispatch('crypto/fetchCryptoTrending')
                this.trendingCoin = this.$store.state.crypto.cryptoTrending
                console.log(this.trendingCoin)
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
        height: 95vh;
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
    @media screen and (max-device-width : 1143px) {
        svg {
            visibility: hidden;
        }
        .lower-heading {
            background-color: #000;
        }
        h2 {
            font-size: 0.5rem;
        }
        .logo-woman{
            width: 400px;
        }
    }
    @media screen and (max-device-width : 700px) {
        h1 {
             margin: 2rem 1rem;
        }
        .font-size-custom {
            font-size: 2rem;
        }
         .logo-woman{
            width: 200px;
        }
    }
     @media screen and (max-device-width : 500px) {
        h2 {
            font-size: 1rem !important;
        }
    }
</style>