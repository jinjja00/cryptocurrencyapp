
const state = {
    token: null,
    user: null,
    isUserLoggedin: false,
}

const mutations = {
    setToken(state, token) {
        state.token = token
        if (token) {
            state.isUserLoggedin = true
        } else {
            state.isUserLoggedin = false
        }
    },
    setUser(state, token) {
        state.user = token
    },
    setCrypto(state,crypto) {
        state.crypto = crypto
    }
}

const actions = {
    setToken({commit}, token) {
        commit('setToken', token)
    },
    setUser({commit}, user) {
        commit('setUser', user)
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
