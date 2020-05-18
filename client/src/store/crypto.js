import Api from '@/services/Api'

const state = {
    cryptoNews: [],
    cryptoQuotePriceHistory: [],
    cryptoEventIncoming: [],
    coinInformation: {}
}

const mutations = {
    setCrypto(state, crypto) {
        state.cryptoNews = crypto
    },
    setCryptoHistory(state, crypto) {
        state.cryptoQuotePriceHistory = crypto
    },
    setCoinInformation(state, crypto) {
        state.coinInformation = crypto
    },
    setCryptoEvents(state, event) {
        state.cryptoEventIncoming = event
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
    fetchCoinInformation({commit}, coinId) {
        return Api().get('getcoininformation', {
            params: {
                coinId
            }
        })
        .then(response => response.data)
        .then(coin =>{
            commit('setCoinInformation', coin)
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
    },
    fetchCryptoEventsIncoming({commit}, state) {
        return Api().get('getcryptoeventincoming')
        .then(response => response.data)
        .then(events => {
            commit('setCryptoEvents', events)
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