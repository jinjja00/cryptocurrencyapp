import Api from '@/services/Api'

const state = {
    cryptoNews: [],
    cryptoQuoteHistory: []
}

const mutations = {
    setCrypto(state, crypto) {
        state.cryptoNews = crypto
    },
    setCryptoHistory(state, crypto) {
        state.cryptoQuoteHistory = crypto
    }
}
  
const actions = {
    fetchCrypto({commit}, state) {
        return Api().get('getcrypto')
            .then(response => response.data)
            .then(crypto => {
                commit('setCrypto', crypto)
            })
    },
    fetchCryptoQuoteHistory({commit}, state) {
        return Api().get('getcryptoquote')
            .then(response => response.data)
            .then(crypto => {
                commit('setCryptoHistory', crypto)
            })
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