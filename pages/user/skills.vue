<template>
  <div>
    <div class="container">
      <h1>Skills</h1>

    </div>
    <div class="row">
      <div class='col-md-3'>
        <side-bar />
      </div>
      <div class="col-md-6">
        <div class="card mt-4">
          <div class="card-header">
            <p class='mb-0'>Add or update skill</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="storeOrUpdate(form.id)">
              <template v-if="form.id">
                id of item to update : {{form.id}}
              </template>
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.label }">
                <label>Label</label>
                <input v-model="form.label" type="text" class="form-control" placeholder="Label (Ex: English, French, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.label">
              {{errors.label[0]}}
              </div>
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.level }">
                <label>Competence Category</label>
                <!-- <b-form-select v-model="selected" :options="options"></b-form-select> -->
                 <select class="form-control" v-model="selected">
                  <option :value="null" disabled>Please select an option</option>
                  <template v-for="type in options">
                    <option :key="type.label">{{type.label}}</option>
                  </template>
                  <option value="other">other (Will be added to database for future uses.)</option>
                </select>
              </div>
              <div v-if="selected=='other'" class="form-group" :class="{ 'is-invalid mb-0': errors.label }">
                <label>Skill Category (Ex: Web programming)</label>
                <input v-model="form.competence_type" type="text" class="form-control" placeholder="Label (Ex: English, French, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.level">
                {{errors.level[0]}}
              </div>
              {{message}}
              <div class="form-group">
                <template v-if="form.id">
                  <input type="submit" value="Update your skill" class="btn btn-default w-100">
                  <a href="#" @click="clear()">
                    Add new element..
                  </a>
                </template>
                <template v-else>
                  <input type="submit" value="Store your skill" class="btn btn-default w-100">
                </template>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-8 offset-md-2 mt-4" v-if="competences">
      <table class="table table-sm">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Skill label</th>
      <th scope="col">Skill Category</th>
      <th scope="col">Edit/Delete</th>
    </tr>
  </thead>
  <tbody>

    <template v-for="competence in competences.data.competences">
    <tr :key="competence.id">
      <th scope="row">{{competence.id}}</th>
      <td>{{competence.label}}</td>
      <td>{{competence.competence_type}}</td>
      <td>
        <a href="#" @click="editSkill(competence)">
          Edit
        </a>
        /
        <a href="#" @click="deleteSkill(competence.id)">
            Delete
        </a></td>
    </tr>
    </template>
  </tbody>
</table>
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
      selected: null,
      options: null,
      form: {
        id: null,
        label: '',
        competence_type: null
      },
      message: '',
      competences: null
    }
  },
  methods: {
    async storeOrUpdate(id) {
      if(!id) {
        if(this.form.competence_type == null)
          this.form.competence_type = this.selected;
        try {
          this.$axios.post('/user/competences',this.form).then(response => (
            this.message = response.data.message,
            this.clear(),
            this.getCompetences(),
            this.getOptions()
          ));
        } catch(e) {
        }
      }
      else {
        this.$axios.put('user/competences/'+id, this.form).then(response => {
          this.message = response.data.message;
          this.getCompetences();
          this.getOptions();
          this.clear();
      }).catch(e=> {
          this.message = e;
      });
      }
      
    },
    async getCompetences() {
      this.$axios.get('/user/competences').then(response => (this.competences = response));
    },
    deleteSkill(id) {
      this.$axios.delete('user/competences/'+id).then(response => {
          this.message = response.data.message;
          this.getCompetences();
      }).catch(e=> {
          this.message = e;
      });

    },
    editSkill(competence) {
      this.form.id = competence.id;
      this.form.label = competence.label;
      this.selected = competence.competence_type;
    },
    clear() {
      this.form.id = null;
      this.form.label = '';
      this.form.competence_type = null;
      this.selected = null;
    },
    clearMessages() {
      this.message = '';
    },
    getOptions() {
      this.$axios.get('/user/competences-type').then(response => (this.options = response.data.types));
    }
  },
  created() {
    this.getCompetences();
    this.getOptions();
    setInterval(() => this.clearMessages(),30000);
  }
}
</script>

<style>

</style>