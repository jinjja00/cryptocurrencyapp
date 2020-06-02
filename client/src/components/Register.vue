<template>
    <div>
        <h1> Register</h1>
         <v-text-field
            label="firstname"
            v-model="firstname"
        />
         <v-text-field
            label="lastname"
            v-model="lastname"
        />
         <v-text-field
            label="email"
            v-model="email"
        />
         <v-text-field
            label="Password"
            v-model="password"
        />
        <br>
        <div class="error"
            v-html="error"
        />
        <br>
        <button @click="register">Register</button>
        <v-btn to="login">Login</v-btn>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default  {
    data () {
        return {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        async register () {
            try {
                const response = await AuthenticationService.register({
                    firstName: this.firstname,
                    lastName: this.lastname,
                    email: this.email,
                    password: this.password
                })

                this.$store.dispatch('user/setToken', response.data.token)
                this.$store.dispatch('user/setUser', response.data.user)
            } catch(error) {
                this.error = error.response.data.error
            }
        }
    }
}
</script>

<style  scoped>
 .error {
     color:red
 }
</style>