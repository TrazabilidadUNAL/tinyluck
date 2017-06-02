/**
 * Created by mesi on 1/06/17.
 */
import Vue from 'vue'
import * as constants from '@/store/constants'

const state = {
  packages: []
}
const actions = {
  [constants.PACKAGES_GET]: ({commit}, userType) => {
    // let slashes = location.protocol.concat('//')
    // let host = slashes.concat(`${window.location.hostname}:${window.location.port}`)
    Vue.axios.get(`/${userType}/packages`)
      .then(response => response.data.data)
      .then(packages => {
        commit(constants.PACKAGES_STATE_SET_LIST, packages)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
const mutations = {
  [constants.PACKAGES_STATE_SET_LIST]: (state, packages) => {
    state.packages = packages
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
