<template>
  <div>
    <div class="container">
      <h1>Experiences</h1>

    </div>
    <div class="row mb-4">
      <div class='col-md-3'>
        <side-bar />
      </div>
      <div class="col-md-6">
        <div class="card mt-4">
          <div class="card-header">
            <p class='mb-0'>Add or update experience</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="storeOrUpdate(form.id)">
              <template v-if="form.id">
                id of item to update : {{form.id}}
              </template>
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.label }">
                <label>Label</label>
                <input v-model="form.label" type="text" class="form-control" placeholder="Label (Ex: Master, IT, ...)">
              </div>

              <div class="invalid-feedback d-block" v-if="errors.label">
              {{errors.label[0]}}
              </div>
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.societe }">
                <label>Societe</label>
                <input v-model="form.societe" type="text" class="form-control" placeholder="Societe (Ex: Data Science, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.societe">
              {{errors.societe[0]}}
              </div>

              <div class="form-group" :class="{ 'is-invalid mb-0': errors.description }">
                <label>Description</label>
                <input v-model="form.description" type="text" class="form-control" placeholder="School Name (Ex: Higher School of Technology, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.description">
              {{errors.description[0]}}
              </div>
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.date_debut }">              
                <label>Starting date</label>
                <b-form-datepicker v-model="form.date_debut" class="mb-2"></b-form-datepicker>
              </div>
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.date_fin }">              
                <label>End date</label>
                <b-form-datepicker v-model="form.date_fin" class="mb-2"></b-form-datepicker>
              </div>
              {{message}}
              <div class="form-group">
                <template v-if="form.id">
                  <input type="submit" value="Update your experience" class="btn btn-default w-100">
                  <a href="#" @click="clear()">
                    Add new element..
                  </a>
                </template>
                <template v-else>
                  <input type="submit" value="Store your experience" class="btn btn-default w-100">
                </template>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
    <div class="row">
        <template v-for="(experience,index) in experiences">
          <b-card-group class="row"  :v-if="index%3" :key="index" deck>
          <b-card :header="experience.id + ' - ' + experience.label" :key="experience.id" class="p-3 m-4">
            <p :key="experience.id"><strong>{{experience.label}}</strong> {{experience.societe}}.</p>
            <p> {{experience.description}}.</p>
            <p :key="experience.id">From : {{experience.date_debut}} To : {{experience.date_fin}}</p>
            <a href="#" @click="editExperience(experience)">
              Update
            </a> -
            <a href="#" @click="deleteExperience(experience.id)">
              Delete
            </a>
          </b-card>
            </b-card-group>
        </template>
    </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../../layouts/partials/SideBar';

export default {
  middleware: 'auth',
  components: {
    SideBar
  },
  data() {
    return {
        form: {
          id: null,
          label: '',
          societe: '',
          description: '',
          date_debut: '',
          date_fin: '',
        },
        message: '',
        experiences: null,
      }
  },
  methods: {
    async storeOrUpdate(id) {
      if(!id) {
        try {
          this.$axios.post('/user/experiences',this.form).then(response => (
            this.message = response.data.message,
            this.clear()
          ));
          this.getexperiences();
        } catch(e) {
        }
      }
      else {
        this.$axios.put('user/experiences/'+id, this.form).then(response => {
          this.message = response.data.message;
          this.getexperiences();
          this.clear();
      }).catch(e=> {
          this.message = e;
      });
      }
      
    },
    async getexperiences() {
      this.$axios.get('/user/experiences').then(response => (this.experiences = response.data.experiences));
    },
    deleteExperience(id) {
      this.$axios.delete('user/experiences/'+id).then(response => {
          this.message = response.data.message;
          this.getexperiences();
      }).catch(e=> {
          this.message = e;
      });

    },
    editExperience(experience) {
      this.form.id = experience.id;
      this.form.label = experience.label;
      this.form.societe = experience.societe;
      this.form.descripton = experience.descripton;
      this.form.date_debut = experience.date_debut;
      this.form.date_fin = experience.date_fin;
    },
    clear() {
      this.form.id = null;
      this.form.label = '';
      this.form.societe = '';
      this.form.description = '';
      this.form.date_debut = null;
      this.form.date_fin = null;
    },
    clearMessages() {
      this.message = '';
    }
  },
  created() {
    this.getexperiences();
    setInterval(() => this.clearMessages(),30000);
  }
}
</script>

<style>

</style>