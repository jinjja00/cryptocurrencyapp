<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: HelveticaNow;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
li {
    list-style-type: none;
}
@font-face {
  font-family: HelveticaNow;
  src: url('assets/HelveticaNowDisplayXBlk.otf');
}
</style>
