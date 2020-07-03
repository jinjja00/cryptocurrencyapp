import Api from '@/services/Api'
import axios from 'axios'

import router from '@/router'

const state = {
    localStorageToken: localStorage.getItem('user-token') || null,
    token: null,
    user: null,
    favoriteCrypto: []
}

const mutations = {
    setToken(state, token) {
        state.localStorageToken = token
        state.token = token
    },
    setUser(state, user) {
        state.user = user
    },
    setFavoritecrypto(state, crypto) {
        state.favoriteCrypto = crypto
    }
}

const actions = {
    setToken({commit}, token) {
        commit('setToken', token)
    },
    setUser({commit}, user) {
        commit('setUser', user)
    },
    setFavoriteCrypto({commit}, token) {
            return Api().get('getuserfavoritescoins', {
                params: {
                    token: state.localStorageToken
                }
            })
            .then(response => response.data.coins)
            .then(cryptoFav => {
                commit('setFavoritecrypto', cryptoFav)
            })
        
    },
    addFavoriteCrypto({commit}, payload) {
        return Api().post('adduserfavoritecrypto', {
            params : {
                coinId: payload,
                token: state.localStorageToken
            }
        })
    },
    removeFavoriteCrypto({commit}, payload) {
        return Api().post('removeuserfavoritecrypto', {
            params : {
                coinId: payload,
                token: state.localStorageToken
            }
        })
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
