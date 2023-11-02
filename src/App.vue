<template>
  <router-view />
  <nav class="d-flex justify-content-center">
    <router-link to="/">Home</router-link>
    <!-- <p class="px-2">|</p> -->
    <!-- <router-link to="/about">About</router-link> -->
  </nav>
</template>

<style lang="scss">
nav {
  a {
    font-weight: bold;
    color: #ffffff;

    &.router-link-exact-active {
      color: #efefef;
    }
  }
}
</style>
