<template>
    <div>
        <v-card width="300" align-self="center"> 
            <v-list v-if="coins">
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
    </div>
</template>

<script>
    export default {
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
          }
    }
</script>

<style scoped>

</style>