<template>
  <div>
    <div class="container">
      <h1>Dashboard</h1>
    </div>
    <div class="row px-4">
      <div class='col-md-3'>
        <side-bar />
      </div>
      <div class="col-md-6">
        <experiences />
      </div>
      <div class="col-md-3">
        <langues />
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../layouts/partials/SideBar';
import experiences from '../layouts/partials/user/experiences';
import langues from '../layouts/partials/user/langues';

export default {
  middleware: 'auth',
  components: {
    SideBar,
    experiences,
    langues
  }
}
</script>
