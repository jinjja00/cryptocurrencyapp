<template>
    <div>
        <h1> Register</h1>
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
        <button @click="register">Register</button>
    </div>
</template>

<script>
    export default  {
        data () {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            register () {
                console.log('button clicked')
            }
        }
    }
</script>

<style  scoped>

</style>