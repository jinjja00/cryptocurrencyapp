import Api from '@/services/Api'
import axios from 'axios'

import router from '@/router'

const state = {
    localStorageToken: localStorage.getItem('user-token') || null,
    token: null,
    user: null,
}

const mutations = {
    setToken(state, token) {
        state.localStorageToken = token
        state.token = token
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

            localStorage.setItem('user-token', response.data.token)

            axios.defaults.headers.common['Authorization'] = response.data.token

            router.push('/main').catch(e => {})
        })
    },
    logoutUser({commit, dispatch})  {
        localStorage.removeItem('user-token')

        commit('setUser', null)
        commit('setToken', null)
        
        delete axios.defaults.headers.common['Authorization']
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
