<template>
    <div>
        <v-text-field
            label="Email"
            v-model="email"
        />
        <v-text-field
            label="Password"
            v-model="password"
        />
        <button @click="login">Login</button>
    </div>
</template>

<script>
    import AuthentificationService from '@/services/AuthenticationService'
    import store from  '@/store/store'

    export default {
        data () {
            return {
                email: '',
                password: '',
                error: null
            }
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
                   console.log(this.$store.state.user.isUserLoggedin)
                } catch (error) {
                    this.error = error.response.data.error
                }
            }
        }
    }
</script>

<style  scoped>

</style>