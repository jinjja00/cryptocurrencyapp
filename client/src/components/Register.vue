<template>
    <div>
        <h1> Register</h1>
         <input 
            type="text" 
            name="firstname"
            placeholder="firstname"
            v-model="firstname"
        />
         <input 
            type="text" 
            name="lastname"
            placeholder="lastname"
            v-model="lastname"
        />
        <input 
            type="email" 
            name="email"
            placeholder="email"
            v-model="email"
        />
        <input 
            type="password" 
            name="password"
            v-model="password"
            placeholder="password"
        />

        <br>
        <div class="error"
            v-html="error"
        />
        <br>
        <button @click="register">Register</button>
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
                await AuthenticationService.register({
                    firstName: this.firstname,
                    lastName: this.lastname,
                    email: this.email,
                    password: this.password
                })
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