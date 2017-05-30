<template>
  <div id="carousel-home" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
      <li data-target="#carousel-example-generic" data-slide-to="1"></li>
      <li data-target="#carousel-example-generic" data-slide-to="2"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">
      <div class="item active slide1">
        <div class="carousel-caption">
          <h3>Productos de Calidad</h3>
          <p>¿Siempre quisite conocer de de dónde viene tu comida? Gretel es para ti.</p>
        </div>
      </div>
      <div class="item slide2">
        <div class="carousel-caption">
          <h3>Mejor Información, Mejores Productos</h3>
          <p>Gretel te ofrece información que no conocías de tus productos, así puedes mejorar tus procesos.</p>
        </div>
      </div>
      <div class="item slide3">
        <div class="carousel-caption">
          <h3>Trazabilidad de Productos Alimenticios en Tiempo Real</h3>
          <p>Gretel te ofrece información de todo lo que sucede con tus productos desde que empacas hasta que llegan a su destino.</p>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <a class="left carousel-control" href="#carousel-home" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only"></span>
    </a>
    <a class="right carousel-control" href="#carousel-home" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only"></span>
    </a>
  </div>
</template>

<style type="text/css" lang="css">
  .carousel {
    min-height: 500px;
  }

  .carousel-caption {
    background-color: RGBA(12, 11, 11, 0.6);
  }

  .slide1 {
    background: url('/static/img/market.jpg') no-repeat center top;
    background-size: cover;
    min-height: 500px;
    position: relative;
  }
  .slide2 {
    background: url('/static/img/corn.jpg') no-repeat center;
    background-size: cover;
    min-height: 500px;
    position: relative;
  }
  .slide3 {
    background: url('/static/img/delicious.jpg') no-repeat center;
    background-size: cover;
    min-height: 500px;
    position: relative;
  }
</style>
