import Api from '@/services/Api'

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
        return Api().get('getcrypto')
            .then(response => {
                console.log(response)
                commit('setCrypto', response.data)
                return response.data
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