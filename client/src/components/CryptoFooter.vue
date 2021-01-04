<template>
    <div>
        <v-footer dark padless >
			<v-card
				flat
				tile
				:class="footerColor"
				width="100%">
				<v-card-text class="mx-auto">
					<v-btn
						v-for="icon in icons"
						:key="icon"
						class="mx-4"
						:class="footerColor"
						icon>
						<v-icon size="24px">{{ icon }}</v-icon>
					</v-btn>
				</v-card-text>
				
				<v-divider></v-divider>

				<v-card-text :class="footerColor">
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
			footerColor () {
				switch (this.$vuetify.breakpoint.name) {
					case 'xs': return "white black--text  text-center "
					case 'sm': return "white black--text  text-center"
					case 'md': return "white black--text  text-center"
					case 'lg': return "black white--text text-center"
					case 'xl': return "black white--text text-center"
       			}
			}
		}
    }
</script>

<style scoped>
</style>