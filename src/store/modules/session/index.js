/**
 * Created by mesi on 29/05/17.
 */
import Vue from 'vue'
import * as constants from '@/store/constants'

const state = {
  user: !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '', // eslint-disable-line no-extra-boolean-cast
  token: !!localStorage.getItem('token') ? localStorage.getItem('token') : '' // eslint-disable-line no-extra-boolean-cast
}
const actions = {
  [constants.SESSION_SIGN_UP]: ({commit}, data) => {
    Vue.axios.post(`/${data.userType}`, data.info)
      .then(response => response.data.data)
      .then(data => {
        commit(constants.SESSION_SET_USER, data)
      })
  },
  [constants.SESSION_SIGN_IN]: ({commit}, data) => {
    let url
    switch (process.env.NODE_ENV) {
      case 'development':
        url = `http://localhost:3000/sign-in`
        break
      case 'production':
        url = `https://gretelapp.herokuapp.com/sign-in`
        break
    }
    Vue.axios.post(url, data)
      .then(response => response.data.token)
      .then(token => {
        commit(constants.SESSION_SET_TOKEN, token)
        return Vue.axios.get('/producer', {headers: {'Authorization': `Token token=${token}`}})
      })
      .then(response => response.data.data)
      .then(data => {
        commit(constants.SESSION_SET_USER, data)
      })
  },
  [constants.SESSION_SIGN_OUT]: ({commit}) => {
    let url
    switch (process.env.NODE_ENV) {
      case 'development':
        url = `http://localhost:3000/sign-out`
        break
      case 'production':
        url = `https://gretelapp.herokuapp.com/sign-out`
        break
    }
    Vue.axios.delete(url)
      .then(response => {})
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
const mutations = {
  [constants.SESSION_SET_USER]: (state, user) => {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
  [constants.SESSION_SET_TOKEN]: (state, token) => {
    state.token = token
    localStorage.setItem('token', token)
  }
}
const getters = {
  [constants.SESSION_USER_TYPE]: state => {
    if (state.user !== '') {
      if (state.user.first_name !== undefined) {
        return 'producer'
      } else {
        return 'warehouse'
      }
    } else {
      return false
    }
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
