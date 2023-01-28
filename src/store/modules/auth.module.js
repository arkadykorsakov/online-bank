import { error } from '@/utils/error'
import axios from 'axios'

const TOKEN_JWT = 'jwt-token'

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_JWT)
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem(TOKEN_JWT, token)
    },
    logout(state) {
      state.token = null
      localStorage.removeItem(TOKEN_JWT)
    }
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axios.post(url, {
          ...payload,
          returnSecureToken: true
        })
        commit('clearMessage', null, { root: true })
        commit('setToken', data.idToken)
      } catch (e) {
        dispatch(
          'setMessage',
          {
            value: error(e.response.data.error.message),
            type: 'danger'
          },
          {
            root: true
          }
        )
        throw new Error(e)
      }
    }
  },
  getters: {
    token: (s) => s.token,
    isAuthenticated: (_, getters) => !!getters.token
  }
}
