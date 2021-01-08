<template>
    <div>
        <v-lazy>
            <v-container fluid class="background-image">
                <loading-page :loading="loading"/> 
                <v-row justify="center" align="center" style="height:900px;">
                    <v-col cols="8" md="4">
                        <v-alert dense v-if="error" type="error" v-html="error"/>
                        <v-form>
                            <v-text-field dark color="white" label="First Name" v-model="firstname"/>
                            <v-text-field dark color="white" label="Last Name" v-model="lastname"/>
                            <v-text-field dark color="white" label="Email" v-model="email"/>
                            <v-text-field 
                                v-model="password" 
                                dark color="white" 
                                label="Password" 
                                type="password"  
                                required 
                                autocomplete="new-password"/>
                            <v-text-field 
                                v-model="confirmPassword" 
                                :rules="[(password === confirmPassword) || 'Password must match']" 
                                dark color="white" 
                                label="Confirm Password" 
                                type="password"  
                                required
                                autocomplete="new-password"/>
                            <v-btn  color="white" :to="{name: 'Login'}">Login</v-btn>
                            <v-btn  class="float-right" color="white" @click="register">Register</v-btn>
                        </v-form>
                    </v-col>
                </v-row>
            </v-container>
        </v-lazy>
        <footercrypto/>
    </div>
</template>

<script>
    import AuthenticationService from '@/services/AuthenticationService'
    import footercrypto from '@/components/CryptoFooter'
    import loadingPage from '@/components/Loading'

    export default  {
        components: {
            loadingPage,
            footercrypto
        },
        data () {
            return {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                confirmPassword: '',
                error: null,
                loading: false
            }
        },
        methods: {
            async register () {
                try {
                    this.loading = true

                    const response = await AuthenticationService.register({
                        firstName: this.firstname,
                        lastName: this.lastname,
                        email: this.email,
                        password: this.password
                    })

                    this.$router.push('/login')
                } catch(error) {
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
        background:linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(255, 0, 150, 0.3)), url('../assets/city-view.jpg');
        background-size:cover;
    }
</style>