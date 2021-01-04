<template>
     <nav class="navbar">
         <div class="logome">
             <img  class="logo" src="../assets/logoB.png">
         </div>
            <ul class="main-nav">
                <li>
                    <v-btn rounded color="#CDCDCD" class="nav-links" to="/login">Login</v-btn>
                     <v-btn rounded color="#CDCDCD" class="nav-links" to="/register">Register</v-btn>
                </li>
            </ul>
        </nav>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .navbar {
        display: flex;
        justify-content: space-between;
        padding-bottom: 0;
        height: 70px;
        align-items: center;
    }
    .main-nav {
        display: flex;
        margin-right: 30px;
        flex-direction: row;
        justify-content: flex-end;
    }
    .nav-links {
        margin-left: 40px;
        color: #fff;
        text-decoration: none;
    }
    .logo {
        margin-top: 15%;
        max-width: 35%;
        height: auto !important;
    }
     @media screen and (max-device-width : 835px){
        .v-btn {
            font-size: 70%;
            width: 30%;
        }
        li {
            display: flex;
        }
        .logo{
            max-width: 50%;
        }
    }
    @media screen and (max-device-width : 500px){
         .logo{
            max-width: 80%;
        }
    }
</style>