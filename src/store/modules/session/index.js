/**
 * Created by mesi on 29/05/17.
 */
import Vue from 'vue'
import * as constants from '@/store/constants'

const state = {
  user: !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '', // eslint-disable-line no-extra-boolean-cast
  userType: !!localStorage.getItem('userType') ? localStorage.getItem('userType') : '', // eslint-disable-line no-extra-boolean-cast
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
      .then(response => response.data)
      .then(data => {
        commit(constants.SESSION_SET_TOKEN, data)
        return Vue.axios.get('/producer', {headers: {'Authorization': `Token token=${data.token}`}})
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
  },
  [constants.SESSION_UPDATE_DATA]: ({commit}, data) => {
    Vue.axios.put('/producer', data)
      .then(response => {
        commit(constants.SESSION_SET_USER, data)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
const mutations = {
  [constants.SESSION_SET_USER]: (state, user) => {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
  [constants.SESSION_SET_TOKEN]: (state, data) => {
    state.token = data.token
    state.userType = data.userType
    Vue.axios.defaults.headers.common['Authorization'] = `Token token=${data.token}`
    localStorage.setItem('token', data.token)
    localStorage.setItem('userType', data.userType)
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
