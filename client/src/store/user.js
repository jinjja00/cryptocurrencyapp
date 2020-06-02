import Api from '@/services/Api'

const state = {
    localStorageToken: localStorage.getItem('user-token') || '',
    token: null,
    user: null,
}

const mutations = {
    setToken(state, token) {
        state.token = token
        if (token) {
            localStorage.setItem('user-token', token)
        } else {
            localStorage.removeItem('user-token')
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
    },
    loginUser({commit}, payload) {
        return Api().post('login', payload)
        .then(response => {
            commit('setUser', response.data.user)
            commit('setToken', response.data.token)
            Api().defaults.headers.common['Authorization'] = response.data.token
        })
    },
    logoutUser({commit, dispatch})  {
        localStorage.removeItem('user-token')
        commit('setUser', null)
        commit('setToken', null)
        delete  Api().defaults.headers.common['Authorization']
    }
}

const getters = {
    isAuthenticated: state => !!state.localStorageToken,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
