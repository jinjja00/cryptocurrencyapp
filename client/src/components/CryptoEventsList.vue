<template>
    <div>
        <v-container class="mb-12">
            <h1 align="center">Upcoming Events</h1>
            <v-row>
                <v-col v-for="(event, index) in crypto.cryptoEventIncoming.data" :key="index" :cols="4">
                    <v-card
                        dark>
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div>
                                <v-card-title
                                class="headline"
                                v-text="event.title"
                                ></v-card-title>

                                <v-card-subtitle><div>{{event.description.substring(0,200)+'...'}}</div></v-card-subtitle>
                                 <v-card-actions>
                                    <v-btn :href="event.website" target="_blank" text>Read more..</v-btn>
                                </v-card-actions>
                            </div>

                            <v-avatar
                                class="ma-3"
                                size="125"
                                tile>
                                <v-img :src="event.screenshot"></v-img>
                            </v-avatar>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
       </v-container>
    </div>
</template>

<script>
    import store from  '@/store/store'
    import { mapState } from "vuex"
    export default {
          beforeCreate: function () {
            store.dispatch('crypto/fetchCryptoEventsIncoming')
          },
          computed: {
            ...mapState(['crypto'])
          }
    }
</script>

<style scoped>
     h1 {
        font-size: 4rem;
        text-shadow: 2px 2px #A9A9A9
    }
</style>