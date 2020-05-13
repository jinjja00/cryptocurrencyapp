import Api from '@/services/Api'

const state = {
    cryptoNews: [],
    cryptoQuotePriceHistory: {}
}

const mutations = {
    setCrypto(state, crypto) {
        state.cryptoNews = crypto
    },
    setCryptoHistory(state, crypto) {
        state.cryptoQuotePriceHistory = crypto
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
    fetchCryptoQuoteHistory({commit}, payload) {
        console.log(payload)
        return Api().get('getcryptoquote', {
            params: {
                coinId:payload.id,
                vs_currency:'usd',
                days:'7'
            }
        })
        .then(response => response.data)
        .then(price => {
            commit('setCryptoHistory', price)
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