<template>
  <div class="container">
    <h1>Mis datos</h1>
    <producer v-if="userType === 'producer'"
              :producer="user"
              @update-producer="updateUserData">
    </producer>
    <warehouse v-else></warehouse>
  </div>
</template>

<script type="text/babel" lang="babel">
  import {mapState, mapActions} from 'vuex'
  import * as constants from '@/store/constants'

  import Producer from './Producer.vue'
  import Warehouse from './Warehouse.vue'

  export default {
    computed: {
      ...mapState({
        userType: state => state.Session.userType,
        user: state => state.Session.user
      })
    },
    methods: {
      ...mapActions({
        updateUserData: constants.SESSION_UPDATE_DATA
      })
    },
    components: {
      Producer,
      Warehouse
    }
  }
</script>
