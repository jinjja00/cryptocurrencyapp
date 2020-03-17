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
            
                   this.$store.dispatch('setToken', response.data.token)
                   this.$store.dispatch('setUser', response.data.user)
                } catch (error) {
                    this.error = error.response.data.error
                }
            }
        }
    }
</script>

<style  scoped>

</style>