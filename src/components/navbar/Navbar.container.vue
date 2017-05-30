<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-2">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link :to="{name: 'Home'}" class="navbar-brand" tag="a"><img src="/static/img/logo.png" alt="logo"
                                                                            class="logo"></router-link>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
        <ul class="nav navbar-nav">
          <li>
            <router-link :to="{name: 'AboutUs'}">Nosotros</router-link>
          </li>
        </ul>
        <template v-if="token === ''">
          <form class="navbar-form navbar-right">
            <div class="form-group">
              <input type="email" class="form-control" placeholder="correo electrónico" v-model="email">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="contraseña" v-model="password">
            </div>
            <button type="button" class="btn btn-default" @click="login">Iniciar sesión</button>
          </form>
          <ul class="nav navbar-nav navbar-right">
            <li v-if="user === ''">
              <router-link :to="{name: 'SignUp'}">Inscribirse</router-link>
            </li>
            <li v-else><a>Iniciar sessión <i class="fa fa-lg fa-long-arrow-right" aria-hidden="true"></i></a></li>
          </ul>
        </template>
        <template v-else>
          <ul class="nav navbar-nav navbar-right">
            <template v-if="userType == 'producer'">
              <li :class="{active: route == 'Places'}"><router-link :to="{name: 'Places'}" tag="a"><i class="fa fa-map-marker" aria-hidden="true"></i> Lugares</a></router-link></li>
              <li :class="{active: route == 'Production'}"><a><i class="fa fa-tree" aria-hidden="true"></i> Producción</a></li>
              <li :class="{active: route == 'Packages'}"><a><i class="fa fa-cubes" aria-hidden="true"></i> Paquetes</a></li>
              <li :class="{active: route == 'Routes'}"><a><i class="fa fa-truck" aria-hidden="true"></i> Rutas</a></li>
            </template>
            <li class="dropdown">
              <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i
                class="fa fa-bars" aria-hidden="true"></i> Menú <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a>Sesión: <strong>{{user.username}}</strong></a></li>
                <li class="divider"></li>
                <li><a href="" @click="logout"><i class="fa fa-sign-out" aria-hidden="true"></i> Cerrar Sesión</a></li>
              </ul>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </nav>
</template>

<script type="text/babel" lang="babel">
  import {mapState, mapActions, mapGetters} from 'vuex'
  import * as constants from '@/store/constants'

  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      ...mapState({
        user: state => state.Session.user,
        token: state => state.Session.token,
        route: state => state.route.name
      }),
      ...mapGetters({
        userType: constants.SESSION_USER_TYPE
      }),
      loginData () {
        return {
          user_login: {
            email: this.email,
            password: this.password
          }
        }
      }
    },
    methods: {
      ...mapActions({
        signin: constants.SESSION_SIGN_IN,
        signout: constants.SESSION_SIGN_OUT
      }),
      logout () {
        this.signout()
        this.$router.push({name: 'Home'})
      },
      login () {
        this.signin(this.loginData)
        this.$router.push({name: 'Home'})
      }
    }
  }
</script>

<style type="text/css" lang="css">
  .logo {
    margin-top: -11px;
  }
</style>
