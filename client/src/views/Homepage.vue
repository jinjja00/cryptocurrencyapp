<template>
    <div>
       <header class="background">
         <Navbar/>
       </header>
       <section class="section-description">
         
       </section>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar.vue"
    import { gsap } from "gsap"

    export default {
        components: {
            Navbar
        }
    }
</script>

<style  scoped>
    .background {
        background: url('../assets/keyboardbanner.jpg') no-repeat center center fixed;
        background-size: cover;
        height: 70vh;
        overflow: hidden;
    }
    .section-description {
        height: 70vh;
        background-color: #C0C0C0;
    }
</style>