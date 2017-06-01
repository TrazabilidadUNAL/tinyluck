<template>
  <div class="container">
    <h1>Mis Lugares</h1>
    <div class="row">
      <div class="col-md-4">
        <table class="table table-striped table-hover scrollable">
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(place, key) in places">
            <tr @click="detail(place)" :class="{success: place.id == selected}">
              <td>{{key + 1}}</td>
              <td>{{place.tag}}</td>
            </tr>
          </template>
          </tbody>
        </table>
        <button type="button" class="btn btn-default" @click="clean">Limpiar</button>
      </div>
      <div class="col-md-8">
        <gmap-map
          :center="center"
          :zoom="zoom"
          :style="style"
          map-type-id="satellite"
        >
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
          ></gmap-marker>
        </gmap-map>
        <br>
        <form class="form-horizontal" v-if="selected">
          <fieldset>
            <div class="form-group">
              <label for="placeName" class="col-lg-2 control-label">Nombre</label>
              <div class="col-lg-10">
                <input type="text" class="form-control" id="placeName" placeholder="Un buen nombre para mi lugar" v-model="place.tag">
              </div>
            </div>
            <div class="form-group">
              <label for="latitude" class="col-lg-2 control-label">Latitud</label>
              <div class="col-lg-4">
                <input type="number" class="form-control" id="latitude" placeholder="4.25" v-model="place.lat">
              </div>
              <label for="longitude" class="col-lg-2 control-label">Longitud</label>
              <div class="col-lg-4">
                <input type="number" class="form-control" id="longitude" placeholder="-74.25" v-model="place.lon">
              </div>
            </div>
            <div class="form-group">
              <div class="col-lg-10 col-lg-offset-2">
                <button type="reset" class="btn btn-default">Cancel</button>
                <button type="button" class="btn btn-primary">Submit</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as constants from '@/store/constants'

  import * as VueGoogleMaps from 'vue2-google-maps'
  import Vue from 'vue'

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyDUEOdkJLKMsXexf6z88-rYiDkcNj_j_0o',
      v: '3.27'
//      libraries: 'places' // If you need to use place input
    }
  })

  export default {
    data () {
      return {
        center: {lat: 4.713875, lng: -74.108810},
        zoom: 6,
        selected: null,
        style: 'width: 100%; height: 500px',
        place: {
          tag: null,
          lat: null,
          lon: null,
          id: null
        }
      }
    },
    methods: {
      ...mapActions({
        getPlaces: constants.PLACES_GET
      }),
      detail (place) {
        this.selected = place.id
        this.center = {lat: place.lat, lng: place.lon}
        this.zoom = 16
        this.place = place
        this.style = 'width: 100%; height: 350px'
      },
      clean () {
        this.selected = null
        this.center = {lat: 4.713875, lng: -74.108810}
        this.zoom = 6
        this.style = 'width: 100%; height: 500px'
        this.place = {
          tag: null,
          lat: null,
          lon: null,
          id: null
        }
      }
    },
    computed: {
      ...mapState({
        places: state => state.Places.places,
        userType: state => state.Session.userType
      }),
      ...mapGetters({
        markers: constants.PLACES_MARKERS
      })
    },
    mounted () {
      this.getPlaces(this.userType)
    }
  }
</script>

<style type="text/css" lang="css" scoped>
  .scrollable {
    display: block;
    height: 500px;
    overflow-y: scroll;
  }
</style>
