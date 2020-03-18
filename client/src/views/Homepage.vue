<template>
    <div>
       <header class="background">
         <Navbar/>
         <div class="wave-container">
             <h1>TestingTextTabarnak!</h1>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#f3f4f5" fill-opacity="1" d="M0,96L60,128C120,160,240,224,360,208C480,192,600,96,720,53.3C840,11,960,21,1080,37.3C1200,53,1320,75,1380,85.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
</svg>
         </div>
       </header>
       <section class="section-description">
          <v-icon>fas fa-list</v-icon>
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

<style scoped>
    h1 {
        font-size: 5rem;
        margin: 7rem 1.25rem 2.5rem 1.25rem;
    }
    .wave-container > svg {
        display: block;
    }
    .wave-container {
        position: relative;
        color: #f3f4f5;
        text-align: center; 
    }
    .background {
        background: url('../assets/keyboardbanner.jpg') no-repeat center center fixed;
        background-size: cover;
        height: 70vh;
        overflow: hidden;
    }
    .section-description {
        background-color: black;
        height: 70vh;
    }
    @keyframes animateWave {
  0% {
    transform: scale(1,0);
  }
  100% {
    transform: scale(1,1);
  }
}
.wave-container > svg , .wave-container > h1{
  display: block;
  transform-origin: bottom;
  animation: animateWave 1000ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
}
</style>