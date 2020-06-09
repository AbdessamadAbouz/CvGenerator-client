<template>
  <div>
    <div class="container">
      <h1>Formations</h1>

    </div>
    <div class='col-md-3'>
      <side-bar />
    </div>
  </div>
</template>

<script>
import SideBar from '../../layouts/partials/SideBar';

export default {
  middleware: 'auth',
  components: {
    SideBar
  }
}
</script>

<style>

</style>