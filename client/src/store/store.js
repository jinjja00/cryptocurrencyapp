import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/user'
import crypto from '@/store/crypto'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    user,
    crypto
  }
});