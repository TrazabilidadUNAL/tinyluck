/**
 * Created by mesi on 29/05/17.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import Session from './modules/session'
import Places from './modules/places'
import Products from './modules/products'
import Packages from './modules/packages'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Session,
    Places,
    Products,
    Packages
  }
})
