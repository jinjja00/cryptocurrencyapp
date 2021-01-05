<template>
    <div>
        <v-footer dark padless >
			<v-card
				flat
				tile
				class="black white--text text-center"
				width="100%">
				<v-card-text class="mx-auto">
					<v-btn
						v-for="icon in icons"
						:key="icon"
						class="black white--text text-center mx-4"
						icon>
						<v-icon size="24px">{{ icon }}</v-icon>
					</v-btn>
				</v-card-text>
				
				<v-divider></v-divider>

				<v-card-text class="black white--text text-center">
					{{ new Date().getFullYear() }} — Powered by CoinGecko API
				</v-card-text>
			</v-card>
		</v-footer>
    </div>
</template>

<script>
    export default {
        data () {
            return {
              icons: [
                'mdi-gmail',
                'mdi-github',
                'mdi-linkedin',
                'mdi-instagram',
              ],
            }
		  },
		computed: {
			/*footerColor () {
				switch (this.$vuetify.breakpoint.name) {
					case 'xs': return "white black--text text-center"
					case 'sm': return "white black--text text-center"
					case 'md': return "white black--text text-center"
					case 'lg': return "black white--text text-center"
					case 'xl': return "black white--text text-center"
       			}
			}*/
		}
    }
</script>

<style scoped>
</style>