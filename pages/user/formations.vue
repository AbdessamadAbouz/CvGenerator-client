<template>
  <div>
    <div class="container">
      <h1>Formations</h1>

    </div>
    <div class="row mb-4">
      <div class='col-md-3'>
        <side-bar />
      </div>
      <div class="col-md-6">
        <div class="card mt-4">
          <div class="card-header">
            <p class='mb-0'>Add or update new formation</p>
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
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.titre }">
                <label>Title</label>
                <input v-model="form.titre" type="text" class="form-control" placeholder="Title (Ex: Data Science, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.titre">
              {{errors.titre[0]}}
              </div>

              <div class="form-group" :class="{ 'is-invalid mb-0': errors.nom_ecole }">
                <label>School Name</label>
                <input v-model="form.nom_ecole" type="text" class="form-control" placeholder="School Name (Ex: Higher School of Technology, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.nom_ecole">
              {{errors.nom_ecole[0]}}
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
                  <input type="submit" value="Update your formation" class="btn btn-default w-100">
                  <a href="#" @click="clear()">
                    Add new element..
                  </a>
                </template>
                <template v-else>
                  <input type="submit" value="Store your formation" class="btn btn-default w-100">
                </template>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
    <div class="row-fluid">
      <b-card-group class="row cols-3" deck>
        <template v-for="form in formations">
          <b-card :header="form.id + ' - ' + form.label" :key="form.id" class="flex-column col-xs-6 col-sm-4 col-md-4">
            <p :key="form.id"><strong>{{form.label}}</strong> {{form.titre}}, {{form.nom_ecole}}.</p>
            <p :key="form.id">From : {{form.date_debut}} To : {{form.date_fin}}</p>
            <a href="#" @click="editFormation(form)">
              Update
            </a> -
            <a href="#" @click="deleteFormation(form.id)">
              Delete
            </a>
          </b-card>
        </template>
      </b-card-group>
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
          titre: '',
          nom_ecole: '',
          date_debut: '',
          date_fin: '',
        },
        message: '',
        formations: null,
      }
  },
  methods: {
    async storeOrUpdate(id) {
      if(!id) {
        try {
          this.$axios.post('/user/formations',this.form).then(response => (
            this.message = response.data.message,
            this.clear()
          ));
          this.getformations();
        } catch(e) {
        }
      }
      else {
        this.$axios.put('user/formations/'+id, this.form).then(response => {
          this.message = response.data.message;
          this.getformations();
          this.clear();
      }).catch(e=> {
          this.message = e;
      });
      }
      
    },
    async getformations() {
      this.$axios.get('/user/formations').then(response => (this.formations = response.data.formations));
    },
    deleteFormation(id) {
      this.$axios.delete('user/formations/'+id).then(response => {
          this.message = response.data.message;
          this.getformations();
      }).catch(e=> {
          this.message = e;
      });

    },
    editFormation(formation) {
      this.form.id = formation.id;
      this.form.label = formation.label;
      this.form.titre = formation.titre;
      this.form.nom_ecole = formation.nom_ecole;
      this.form.date_debut = formation.date_debut;
      this.form.date_fin = formation.date_fin;
    },
    clear() {
      this.form.id = null;
      this.form.label = '';
      this.form.titre = '';
      this.form.nom_ecole = '';
      this.form.date_debut = null;
      this.form.date_fin = null;
    },
    clearMessages() {
      this.message = '';
    }
  },
  created() {
    this.getformations();
    setInterval(() => this.clearMessages(),30000);
  }
}
</script>

<style>

</style>