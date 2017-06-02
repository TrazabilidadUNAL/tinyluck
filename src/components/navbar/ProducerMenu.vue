<template>
  <ul class="nav navbar-nav navbar-right">
    <li :class="{active: route == 'Places'}">
      <router-link :to="{name: 'Places'}" tag="a">
        <i class="fa fa-map-marker" aria-hidden="true"></i> Lugares</a>
      </router-link>
    </li>
    <li :class="{active: route == 'Products'}">
      <router-link :to="{name: 'Products'}">
        <i class="fa fa-tree" aria-hidden="true"></i> Productos
      </router-link>
    </li>
    <li :class="{active: route == 'Packages'}">
      <router-link :to="{name: 'Packages'}">
        <i class="fa fa-cubes" aria-hidden="true"></i> Paquetes
      </router-link>
    </li>
    <li :class="{active: route == 'Routes'}"><a><i class="fa fa-truck" aria-hidden="true"></i> Rutas</a></li>
    <li class="dropdown">
      <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i
        class="fa fa-bars" aria-hidden="true"></i> Menú <span class="caret"></span></a>
      <ul class="dropdown-menu" role="menu">
        <li><a><i class="fa fa-user-circle-o" aria-hidden="true"></i> Sesión: <strong>{{user.username}}</strong></a>
        </li>
        <li class="divider"></li>
        <li>
          <router-link :to="{name: 'MyData'}" tag="a">
            <i class="fa fa-cogs" aria-hidden="true"></i> Mis datos
          </router-link>
        </li>
        <li class="divider"></li>
        <li><a href="" @click="logout"><i class="fa fa-sign-out" aria-hidden="true"></i> Cerrar Sesión</a></li>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel" lang="babel">
  export default {
    props: [
      'route',
      'user'
    ],
    methods: {
      logout () {
        this.$emit('logout')
      }
    }
  }
</script>
