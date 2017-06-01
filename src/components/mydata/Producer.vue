<template>
  <form class="form-horizontal">
    <fieldset>
      <legend><strong>Username: </strong>{{producer.username}}</legend>
      <div class="form-group">
        <label for="firstName" class="col-lg-2 control-label">Nombre</label>
        <div class="col-lg-10">
          <input type="text" class="form-control" id="firstName" placeholder="Nombres" v-model="producer.first_name">
        </div>
      </div>
      <div class="form-group">
        <label for="lastName" class="col-lg-2 control-label">Apellidos</label>
        <div class="col-lg-10">
          <input type="text" class="form-control" id="lastName" placeholder="Apellidos" v-model="producer.last_name">
        </div>
      </div>
      <div class="form-group">
        <label for="email" class="col-lg-2 control-label">Correo electrónico</label>
        <div class="col-lg-10">
          <input type="email" class="form-control" id="email" placeholder="Correo electrónico" v-model="producer.email">
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
      <div class="form-group">
        <div class="col-lg-10 col-lg-offset-2">
          <button type="button" class="btn btn-primary" @click="updateUserData">
            <i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar
          </button>
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script type="text/babel" lang="babel">
  export default {
    props: [
      'producer'
    ],
    data () {
      return {
        showPassword: false,
        password: ''
      }
    },
    methods: {
      updateUserData () {
        this.$emit('update-producer', this.userData)
      }
    },
    computed: {
      userData () {
        let data = {
          email: this.producer.email,
          first_name: this.producer.first_name,
          last_name: this.producer.last_name,
          username: this.producer.username
        }
        if (this.password !== '') {
          data['password'] = this.password
        }
        return data
      }
    }
  }
</script>
