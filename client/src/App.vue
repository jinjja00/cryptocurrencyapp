<template>
  <div id="app">
    <v-app>
		<v-main>
			<router-view/>
		</v-main>
	</v-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	.theme--light.v-data-table {
		background-color: #f9f9f9;
	}
	#app {
		font-family: HelveticaNow;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		background-color: #f9f9f9;
	}
	li {
		list-style-type: none;
	}
	@font-face {
		font-family: HelveticaNow;
		src: url('assets/HelveticaNowDisplayXBlk.otf');
	}
</style>
