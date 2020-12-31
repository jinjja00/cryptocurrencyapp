<template>
  <div>
      <v-autocomplete
      v-model="model" 
      :search-input.sync="search"
      :items="items"
      :loading="isLoading"
      item-text="name"
      item-value="symbol"
      label="Search for a coin..."
      >
        <template v-slot:selection="{ attr, on, item, selected }">
        <v-chip
          v-bind="attr"
          :input-value="selected"
          color="blue-grey"
          class="white--text"
          v-on="on"
        >
          <span v-text="item.symbol"></span>
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title v-text="item.name" @click="redirectToCoinPage(item.name)"></v-list-item-title>
        </v-list-item-content>
      </template>
      </v-autocomplete>
  </div>
</template>

<script>
export default {
    data : () => ({
      isLoading: false,
      items: [],
      model: null,
      search: null,
    }),
    methods: {
        redirectToCoinPage (coin) {
            if (/\s/.test(coin)) {
                let redirectURL = coin.replace(/\s+/g, '-').toLowerCase()
                if (redirectURL) {
                    this.$router.push(encodeURI('/coin/'+ redirectURL)) 
                }   
            }
            this.$router.push('/coin/'+ coin.toLowerCase())
        }
    },
    watch: {
        model (val) {
            if (val != null) this.tab = 0
            else this.tab = null
        },
        search (input) {
            if (this.items.length > 0) return

            this.isLoading = true

            fetch('https://api.coingecko.com/api/v3/coins/list')
            .then(res => res.clone().json())
            .then(res => {
                this.items = res
                console.log(this.items)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => (this.isLoading = false))
        }
    }
}
</script>

<style>

</style>