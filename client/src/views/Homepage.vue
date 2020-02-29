<template>
    <div>
       <header class="background">
         <Navbar/>
       </header>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar.vue"
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
</style>