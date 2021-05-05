<template>
    <div>
        <v-card  justify="center">
            <v-list-item-subtitle class=" headline text-center">Upcoming Events</v-list-item-subtitle>
            <template v-if="crypto.cryptoEventIncoming.count != 0">
                <v-list-item v-for="(event, index) in crypto.cryptoEventIncoming.data" :key="index" :href="event.website" target=”_blank”>
                    <v-list-item-content>
                        <v-list-item-title v-text="event.title">Single-line item</v-list-item-title>
                        <v-list-item-subtitle>{{event.start_date}} &bull; {{event.end_date}} </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
            <template v-else>
                <v-list-item-subtitle class="text-center">No events at the moment</v-list-item-subtitle>
            </template>
        </v-card>
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