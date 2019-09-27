<template>
  <div id="app">
    <div id="whole_header_area">
      <div id="header_area">
        <div id="header_left">
          <div class="region region-logo-area">
            <a class="logo navbar-btn pull-left" href="/" title="Home" rel="home">
              <img src="./assets/logo.png">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="menu_area"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
