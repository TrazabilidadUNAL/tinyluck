<template>
  <div class="container">
    <template v-if="user === ''">
      <h1>Inscripción</h1>
      <p>
        Gretel está abierto para productores, bodegas, distribuidores y vendedores.
      </p>
      <form class="form-horizontal">
        <fieldset>
          <div class="form-group">
            <label class="col-lg-2 control-label">Tipo de Usuario</label>
            <div class="col-lg-10">
              <div class="radio">
                <label>
                  <input type="radio" name="userType" id="producer" value="producer" checked="" v-model="userType">
                  Productor
                </label>
              </div>
              <div class="radio">
                <label>
                  <input type="radio" name="userType" id="warehouse" value="warehouse" v-model="userType">
                  Distribuidor
                </label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="email" class="col-lg-2 control-label">Correo electrónico</label>
            <div class="col-lg-10">
              <input type="text" class="form-control" id="email" placeholder="mesi@gretel.com" v-model="email">
            </div>
          </div>
          <div class="form-group">
            <label for="password1" class="col-lg-2 control-label">Contraseña</label>
            <div class="col-lg-10">
              <div class="input-group">
                <input type="text" class="form-control" id="password1" placeholder="contraseña" v-model="password"
                       v-if="showPassword">
                <input type="password" class="form-control" id="password1" placeholder="contraseña" v-model="password"
                       v-else>
                <span class="input-group-btn" v-if="showPassword">
                <button class="btn btn-success" type="button" @click="showPassword = !showPassword">
                  <i class="fa fa-lg fa-eye" aria-hidden="true"></i>
                </button>
                </span>
                <span class="input-group-btn" v-else>
                <button class="btn btn-success" type="button" @click="showPassword = !showPassword">
                  <i class="fa fa-lg fa-eye-slash" aria-hidden="true"></i>
                </button>
                </span>
              </div>
            </div>
          </div>
          <template v-if="userType == 'producer'">
            <div class="form-group">
              <label for="first_name" class="col-lg-2 control-label">Nombres</label>
              <div class="col-lg-10">
                <input type="text" class="form-control" id="first_name" placeholder="Mesi" v-model="first_name">
              </div>
            </div>
            <div class="form-group">
              <label for="last_name" class="col-lg-2 control-label">Apellidos</label>
              <div class="col-lg-10">
                <input type="text" class="form-control" id="last_name" placeholder="Rendon" v-model="last_name">
              </div>
            </div>
          </template>
          <template v-else>
            <div class="form-group">
              <label for="name" class="col-lg-2 control-label">Nombre</label>
              <div class="col-lg-10">
                <input type="text" class="form-control" id="name" placeholder="Almacen" v-model="name">
              </div>
            </div>
          </template>
          <div class="form-group">
            <label for="username" class="col-lg-2 control-label">Usuario</label>
            <div class="col-lg-10">
              <input type="text" class="form-control" id="username" placeholder="mrendon" v-model="username">
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-10 col-lg-offset-2">
              <button type="reset" class="btn btn-danger">Cancel</button>
              <button type="button" class="btn btn-primary" @click="build">Submit</button>
            </div>
          </div>
        </fieldset>
      </form>
    </template>
    <template v-else-if="user.first_name !== undefined">
      <h1>Bienvenido {{user.first_name}} {{user.last_name}}</h1>
      <p>Ahora puedes iniciar sesión</p>
    </template>
    <template v-else>
      <h1>Bienvenido {{user.name}}</h1>
      <p>Ahora puedes iniciar sesión</p>
    </template>
  </div>
</template>

<script type="text/babel" lang="babel">
  import {mapActions, mapState} from 'vuex'
  import * as constants from '@/store/constants'

  export default {
    data () {
      return {
        userType: 'producer',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        username: '',
        name: '',
        showPassword: false
      }
    },
    computed: {
      ...mapState({
        user: state => state.Session.user
      })
    },
    methods: {
      ...mapActions({
        signup: constants.SESSION_SIGN_UP
      }),
      build () {
        let data = {
          email: this.email,
          password: this.password,
          username: this.username
        }
        if (this.userType === 'producer') {
          data.first_name = this.first_name
          data.last_name = this.last_name
        } else {
          data.name = this.name
        }
        this.signup({userType: this.userType, info: data})
      }
    }
  }
</script>
