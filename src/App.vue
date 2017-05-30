<template>
  <div id="app">
    <navbar></navbar>
    <router-view class="content"></router-view>
  </div>
</template>

<script type="text/babel" lang="babel">
  import Navbar from './components/navbar/Navbar.container.vue'
  export default {
    name: 'app',
    components: {
      Navbar
    }
  }
</script>

<style type="text/css" lang="css">
  .content {
    margin-top: 60px;
  }
</style>
