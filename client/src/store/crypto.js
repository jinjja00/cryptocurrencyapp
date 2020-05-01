import CryptoService from '@/services/CryptoService'

const state = {
    cryptoNews: []
}

const mutations = {
    setCrypto(state, crypto) {
        state.cryptoNews = crypto
    }
}
  
const actions = {
    fetchCrypto({commit}, state) {
        return CryptoService.getCryptoNews
            .then((response) => {
                console.log(response)
                commit('setCrypto', response.data)
                return response.data
            }).catch(error => {
                throw new Error(`API ${error}`)
            });
    }
}

const getters = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}