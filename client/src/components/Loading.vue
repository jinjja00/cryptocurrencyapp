<template>
    <div>
        <v-layout row justify-center>
             <v-dialog
                v-model="loading"
                hide-overlay
                persistent
                width="300">
                <v-card
                    color="primary"
                    dark>
                    <v-card-text>
                        Please stand by
                        <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"
                        ></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    export default {
        props: ['loading'],
        data () {
            return {
                loadingState : this.loading
            }
        }
    }
</script>

<style scoped>

</style>