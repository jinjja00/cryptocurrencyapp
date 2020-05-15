<template>
    <div>
        <v-container>
            <h2>Upcoming Events</h2>
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
                    color="deep-purple accent-4">
                    Read more..
                </v-btn>
                </v-card-actions>
            </v-card>
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

</style>