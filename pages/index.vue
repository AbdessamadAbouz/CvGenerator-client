<template>
  <div>
    <div class="container">
      <h1 class="pt-3">Home</h1>

    </div>
    <div class="row px-5 pt-3">
      <div class='col-md-3'>
        <side-bar />
      </div>
      <div class="col-md-9">
        <h1>Generate Resume</h1>
        <img src="~/assets/add.png" height="100vh">
        <hr>
        <div class="pt-5">
          <h1>Your Resumes</h1>
          LIST
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import SideBar from '../layouts/partials/SideBar';

export default {
  components: {
    SideBar
  }
}
</script>
