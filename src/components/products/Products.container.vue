<template>
  <div class="container">
    <h1><i class="fa fa-tree" aria-hidden="true"></i> Mis Productos</h1>
    <div class="row">
      <div class="col-md-4">
        <table class="table table-striped table-hover scrollable">
          <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(product, key) in products">
            <tr @click="toggle(product)" :class="{success: product.id == selected}">
              <td>{{key + 1}}</td>
              <td>{{product.name}}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      <div class="col-md-8">
        <h2>{{product.name}}</h2>
        <img :src="product.image_url" :alt="product.name" class="img-circle imageSize center-block">
        <blockquote>
          <div v-text="product.description"></div>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script type="text/babel" lang="babel">
  import {mapState, mapActions} from 'vuex'
  import * as constants from '@/store/constants'

  export default{
    data () {
      return {
        selected: null,
        product: {
          id: null,
          description: null,
          image_url: null,
          name: null
        }
      }
    },
    computed: {
      ...mapState({
        products: state => state.Products.products,
        userType: state => state.Session.userType
      })
    },
    methods: {
      ...mapActions({
        getProducts: constants.PRODUCTS_GET
      }),
      toggle (product) {
        if (this.product.id === null) {
          this.detail(product)
        } else {
          this.clean()
        }
      },
      detail (product) {
        this.selected = product.id
        this.product = product
      },
      clean () {
        this.selected = null
        this.product = {
          id: null,
          description: null,
          image_url: null,
          name: null
        }
      }
    },
    mounted () {
      this.getProducts(this.userType)
    }
  }
</script>

<style type="text/css" lang="css" scoped>
  .imageSize {
    width: 200px;
    height: 200px;
  }
</style>
