<template>
    <div>
         <v-footer dark padless absolute>
          <v-card
            flat
            tile
            class="black lighten-1 white--text text-center"
            width="100%">
            <v-card-text class="mx-auto">
              <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-4 white--text"
                icon>
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
    export default {
        data () {
            return {
              icons: [
                'mdi-gmail',
                'mdi-github',
                'mdi-linkedin',
                'mdi-instagram',
              ],
            }
          }
    }
</script>

<style scoped>

</style>