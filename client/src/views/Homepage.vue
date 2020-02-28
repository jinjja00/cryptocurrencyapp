<template>
    <div>
       <header class="background">
         <nav class="navbar">
            <img  class="logo" src="../assets/logoB.png">
            <ul class="main-nav">
                <li>
                    <a href="#" class="nav-links">BLOG</a>
                </li>
            </ul>
        </nav>
       </header>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style  scoped>
    .navbar {
        display: flex;
        justify-content: space-between;
        padding-bottom: 0;
        height: 70px;
        align-items: center;
    }
    .background {
        background: url('../assets/keyboardbanner.jpg') no-repeat center center fixed;
        background-size: cover;
        height: 70vh;
        overflow: hidden;
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
        max-width: 50%;
height: auto !important;
    }
</style>