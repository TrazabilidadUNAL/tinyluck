<template>
  <div class="container">
    <h1><i class="fa fa-cubes" aria-hidden="true"></i> Paquetes</h1>
    <div class="row">
      <div class="col-md-2">
        <table class="table table-striped table-hover scrollable">
          <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(pack, key) in packages">
            <tr @click="toggle(pack)" :class="{success: pack.id == selected}">
              <td>{{key + 1}}</td>
              <td>{{pack.crop.product.name}}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      <div class="col-md-3">
        <h1>{{pack.crop.product.name}}</h1>
        <p>
          <strong>Cantidad:</strong> {{pack.quantity}} {{pack.crop.container.name}}
        </p>
        <img :src="pack.qr_code" alt="">
      </div>
      <div class="col-md-7">
        <ul class="nav nav-tabs">
          <li :class="{active: tab === 'crop'}"><a @click="tab = 'crop'">Datos de Cosecha</a></li>
          <li :class="{active: tab === 'route'}"><a @click="tab = 'route'">Datos de la Ruta</a></li>
        </ul>
        <div id="myTabContent" class="tab-content">
          <div :class="{'tab-pane': true, fade: true, active: tab === 'crop', in: tab === 'crop'}" id="crop">
            <p><strong>Fecha de inicio de producción:</strong> {{formater(pack.crop.sow_date)}}</p>
            <p><strong>Fecha de finalización de producción:</strong> {{formater(pack.crop.harvest_date)}}</p>
            <h4>Bitácora</h4>
            <div v-for="log in pack.crop.crop_logs">
              <p><strong>Fecha y hora:</strong> {{formater(log.created_at)}} | <strong>Descripción:</strong> {{log.description}}</p>
            </div>
          </div>
          <div :class="{'tab-pane': true, fade: true, active: tab === 'route', in: tab === 'route'}" id="route">
            Hola mundo
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  import {mapActions, mapState} from 'vuex'
  import moment from 'moment'
  import * as constants from '@/store/constants'

  export default {
    data () {
      return {
        selected: null,
        tab: 'crop',
        pack: {
          id: null,
          parent_id: null,
          quantity: null,
          qr_code: null,
          crop: {
            id: null,
            sow_date: null,
            harvest_date: null,
            product: {
              id: null,
              name: null,
              image_url: null,
              description: null
            },
            container: {
              id: null,
              name: null
            },
            crop_logs: null
          },
          route: {
            id: null,
            route_logs: null
          }
        }
      }
    },
    methods: {
      ...mapActions({
        getPackages: constants.PACKAGES_GET
      }),
      toggle (pack) {
        if (this.pack.id === null) {
          this.detail(pack)
        } else {
          this.clean()
        }
      },
      detail (pack) {
        this.pack = pack
        this.selected = pack.id
      },
      clean () {
        this.pack = {
          id: null,
          parent_id: null,
          quantity: null,
          qr_code: null,
          crop: {
            id: null,
            sow_date: null,
            harvest_date: null,
            product: {
              id: null,
              name: null,
              image_url: null,
              description: null
            },
            container: {
              id: null,
              name: null
            },
            crop_logs: null
          },
          route: {
            id: null,
            route_logs: null
          }
        }
      },
      formater (date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a')
      }
    },
    computed: {
      ...mapState({
        userType: state => state.Session.userType,
        packages: state => state.Packages.packages
      })
    },
    mounted () {
      this.getPackages(this.userType)
    }
  }

</script>
