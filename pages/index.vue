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
      <div class="col-md-6" v-if='authenticated'>
        <h1>Generate Resume</h1>
        <p>Click on the button bellow and fill your information in order to generate your first resume, make your choice on the content of your resume by filling the form and start downloading your resume.</p>
        <h5 class="">it is for free.</h5>
        <img class="mt-3 ml-3" src="~/assets/add.png" height="80vh" @click="modalShow = !modalShow">

        <b-modal hide-footer="true" v-model="modalShow">
          <resume-fill />
        </b-modal>
        <hr>
        <div class="pt-5">
          <h1>Your Resumes</h1>
          LIST
          <template v-for="resume in resumes">
            <b-card class="mb-3">
              <strong>Resume Reference :</strong> {{resume.id}} <br>
              <strong>Created at :</strong> {{resume.created_at}}
              <b-button style="float:right" variant="outline-success" @click="generateResume(resume.id)">
                Generate Resume
              </b-button>

            </b-card>
          </template>
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
      modalShow: false,
      resumes: null
    }
  },
  created() {
    this.getResumes()
  },
  methods: {
    async getResumes() {
      this.$axios.get('user/resumes').then(response => {this.resumes = response.data.resumes})
    },
    async generateResume(id) {
      
    }
  }
}
</script>
