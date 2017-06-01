/**
 * Created by mesi on 1/06/17.
 */
import Vue from 'vue'
import * as constants from '@/store/constants'

const state = {
  products: []
}
const actions = {
  [constants.PRODUCTS_GET]: ({commit}, userType) => {
    Vue.axios.get(`/${userType}/products`)
      .then(response => response.data.data)
      .then(products => {
        commit(constants.PRODUCTS_SET, products)
      })
      .catch(error => console.log(error))
  }
}
const mutations = {
  [constants.PRODUCTS_SET]: (state, products) => {
    state.products = products
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
