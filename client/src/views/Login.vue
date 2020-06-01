<template>
    <div>
        <v-container fluid class="background-image"> 
            <v-row justify="center" align="center" style="height:900px;">
                <v-col cols="8" md="4">
                    <v-form>
                        <v-text-field dark color="white" label="Email" v-model="email"/>
                        <v-text-field dark color="white" label="Password" v-model="password"/>
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
    import AuthentificationService from '@/services/AuthenticationService'
    import store from  '@/store/store'
    import footercrypto from '@/components/CryptoFooter'

    export default {
        data () {
            return {
                email: '',
                password: '',
                error: null
            }
        },
        components: {
            footercrypto
        },
        methods: {
            async login () {
                try {
                   const response = await AuthentificationService.login({
                        email: this.email,
                        password: this.password
                   })
            
                   this.$store.dispatch('user/setToken', response.data.token)
                   this.$store.dispatch('user/setUser', response.data.user)

                   if (this.$store.state.user.isUserLoggedin) {
                       this.$router.push('/main')
                   }
                } catch (error) {
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