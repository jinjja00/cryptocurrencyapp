<template>
     <nav class="navbar">
         <div class="logome">
             <img  class="logo" src="../assets/logoB.png">
         </div>
            <ul class="main-nav">
                <li>
                    <v-btn text class="nav-links">BLOG</v-btn>
                </li>
                <li>
                    <v-btn rounded color="#CDCDCD" class="nav-links" to="/Login">Login</v-btn>
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
</style>