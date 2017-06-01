/**
 * Created by mesi on 29/05/17.
 */
import Vue from 'vue'
import * as constants from '@/store/constants'

const state = {
  places: []
}
const actions = {
  [constants.PLACES_GET]: ({commit}, data) => {
    Vue.axios.get(`/${data}/places`)
      .then(response => response.data.data)
      .then(places => {
        commit(constants.PLACES_STATE_SET_LIST, places)
      })
  }
}
const mutations = {
  [constants.PLACES_STATE_SET_LIST]: (state, places) => {
    state.places = places
  }
}
const getters = {
  [constants.PLACES_MARKERS]: state => {
    return state.places.map(place => {
      return {position: {lat: place.lat, lng: place.lon}}
    })
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
