<template>
    <v-row no-gutters>
        <v-col justify="center">
            <v-img :src="require('@/assets/logoB.png')" max-width="150"></v-img>
        </v-col>
        <v-spacer></v-spacer>
        <v-col align-self="center" align="end" class="mr-7">
            <v-btn class="white--text" plain to="/login">Login</v-btn>
            <v-btn outlined color="white" to="/register">Register</v-btn>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    @media screen and (max-device-width : 500px){
       .v-btn{
           width: 10%;
           font-size:65%;
       }
    }
</style>