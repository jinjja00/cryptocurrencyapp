<template>
    <div>
        <loading-page :loading="loading"/>
        <v-container fluid class="background-image"> 
            <v-row justify="center" align="center" style="height:900px;">
                <v-col cols="8" md="4">
                    <v-alert dense v-if="error" type="error" v-html="error"/>
                    <v-form>
                        <v-text-field dark color="white" label="Email" v-model="email"/>
                        <v-text-field 
                        dark color="white" 
                        label="Password" 
                        v-model="password"
                        type="password"  
                        required
                        autocomplete="new-password"/>
                        <v-btn  text color="white" :to="{name: 'Register'}">Register</v-btn>
                        <v-btn  class="float-right" text color="white" @click="login">Login</v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
        <footercrypto/>
    </div>
</template>

<script>
    import footercrypto from '@/components/CryptoFooter'
    import loadingPage from '@/components/Loading'

    export default {
        data () {
            return {
                email: '',
                password: '',
                error: null,
                loading: false
            }
        },
        mounted () {

        },
        components: {
            loadingPage,
            footercrypto
        },
        methods: {
            async login () {
                this.loading = true

                let payload = {
                    email: this.email,
                    password: this.password
                }
                try {
                    await this.$store.dispatch('user/loginUser', payload)
               
                } catch (error) {
                    this.loading = false
                    this.error = error.response.data.error
                }
            }
        }
    }
</script>

<style  scoped>
    .background-image {
        color:white;
        background:linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(255, 0, 150, 0.3)), url('../assets/look-at-the-sky.jpg');
        background-size:cover;
    }
</style>