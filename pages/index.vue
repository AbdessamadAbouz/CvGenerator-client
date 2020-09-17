<template>
  <div>
    <div class="container">

    </div>
    <div class="py-5" v-if="!authenticated">
      <div class="row" >
        <div class="col-md-2">
        </div>
        <div class="col-md-4">
          <h6 style="color:blue;" class="mb-0">Fast. Easy. Effective.</h6>
          <h1 class="mb-0">The Best CV Maker Online.</h1>
          <footer class="blockquote-footer mb-4"> If a sheet of paper represents your entire work life, personality, and skills, it better be a pretty amazing piece of paper—
            Let CvGenerator do the heavy lifting.</footer>
            <div class="text-right pr-5">
              <b-button variant="info">Join for free now</b-button>
            </div>
          </div>
          <div class="col-md-4">

          </div>
        </div>

      </div>
    <div class="row px-5 pt-3">
      <div class='col-md-3'>
        <side-bar />
      </div>
      <div class="col-md-9" v-if='authenticated'>
        <h1>Generate Resume</h1>
        <img src="~/assets/add.png" height="100vh">
        <b-button @click="modalShow = !modalShow">Open Modal</b-button>

        <b-modal hide-footer="true" v-model="modalShow">
          <resume-fill />
        </b-modal>
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
import ResumeFill from '../layouts/partials/resume/resumeFill';

export default {
  components: {
    SideBar,
    ResumeFill,
  },
  data() {
    return {
      modalShow: false
    }
  }
}
</script>
