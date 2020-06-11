<template>
  <div>
    <div class="container">
      <h1>Personal Informations</h1>

    </div>
    <div class="row">
      <div class='col-md-3'>
        <side-bar />
      </div>
      <div class="col-md-6">
        <div class="card mt-4">
          <div class="card-header">
            <p class='mb-0'>Add or update Personal Informations</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="storeOrUpdate(form.id)">
              <template v-if="form.id">
                id of item to update : {{form.id}}
              </template>
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.nom }">
                <label>Last Name</label>
                <input v-model="form.nom" type="text" class="form-control" placeholder="Last Name (Ex: English, French, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.nom">
              {{errors.nom[0]}}
              </div>
              
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.prenom }">
                <label>First Name</label>
                <input v-model="form.prenom" type="text" class="form-control" placeholder="First Name (Ex: English, French, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.prenom">
              {{errors.prenom[0]}}
              </div>
              
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.email }">
                <label>Email</label>
                <input v-model="form.email" type="email" class="form-control" placeholder="Email (Ex: English, French, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.email">
              {{errors.email[0]}}
              </div>
              
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.phone }">
                <label>Phone Number</label>
                <input v-model="form.phone" type="text" class="form-control" placeholder="Last Name (Ex: English, French, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.phone">
              {{errors.phone[0]}}
              </div>
              
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.adresse }">
                <label>Address</label>
                <input v-model="form.adresse" type="text" class="form-control" placeholder="Address (Ex: English, French, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.adresse">
              {{errors.adresse[0]}}
              </div>

              <div class="form-group" :class="{ 'is-invalid mb-0': errors.propos }">
                <label>About you</label>
                <input v-model="form.propos" type="text" class="form-control" placeholder="About you (Ex: English, French, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.propos">
              {{errors.propos[0]}}
              </div>
              
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.code_postal }">
                <label>Postal Code</label>
                <input v-model="form.code_postal" type="text" class="form-control" placeholder="Last Name (Ex: English, French, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.code_postal">
              {{errors.code_postal[0]}}
              </div>
              
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.linkedin }">
                <label>LinkedIn profile</label>
                <input v-model="form.linkedin" type="text" class="form-control" placeholder="LinkedIn (Ex: English, French, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.linkedin">
              {{errors.linkedin[0]}}
              </div>
              
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.github }">
                <label>github</label>
                <input v-model="form.github" type="text" class="form-control" placeholder="github (Ex: English, French, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.github">
              {{errors.github[0]}}
              </div>
              
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.facebook }">
                <label>Facebook account</label>
                <input v-model="form.facebook" type="text" class="form-control" placeholder="Facebook profil (Ex: English, French, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.facebook">
              {{errors.facebook[0]}}
              </div>
              
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.portfolio }">
                <label>Portfolio address</label>
                <input v-model="form.portfolio" type="text" class="form-control" placeholder="Portfolio address (Ex: English, French, ...)">
              </div>
              <div class="invalid-feedback d-block" v-if="errors.portfolio">
              {{errors.portfolio[0]}}
              </div>
              
              <div class="form-group" :class="{ 'is-invalid mb-0': errors.profil_picture }">
                <label>Profil picture</label>
                <b-form-file
                  v-model="form.profil_picture"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                ></b-form-file>
              </div>
              <div class="invalid-feedback d-block" v-if="errors.profil_picture">
              {{errors.profil_picture[0]}}
              </div>
              

              {{message}}
              <div class="form-group">
                <template v-if="form.id">
                  <input type="submit" value="Update your language" class="btn btn-default w-100">
                  <a href="#" @click="clear()">
                    Add new element..
                  </a>
                </template>
                <template v-else>
                  <input type="submit" value="Store your language" class="btn btn-default w-100">
                </template>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    {{personal_infos}}
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
          nom: '',
          prenom: '',
          email: '',
          phone: '',
          adresse: '',
          propos: '',
          code_postal: '',
          linkedin: '',
          github: '',
          facebook: '',
          portfolio: '',
          profil_picture: null
        },
        message: '',
        personal_infos: null,
      }
  },
  methods: {
    async storeOrUpdate(id) {
      if(!id) {
        try {
          this.$axios.post('/user/personal-infos',this.form).then(response => (
            this.message = response.data.message,
            this.clear()
          ));
          this.getPersonalInfos();
        } catch(e) {
        }
      }
      else {
        this.$axios.put('user/personal-infos/'+id, this.form).then(response => {
          this.message = response.data.message;
          this.getPersonalInfos();
          this.clear();
      }).catch(e=> {
          this.message = e;
      });
      }
      
    },
    async getPersonalInfos() {
      this.$axios.get('/user/personal-infos').then(response => (this.personal_infos = response.data.personal_infos));
    },
    deletePersonalInfos(id) {
      this.$axios.delete('user/personal-infos/'+id).then(response => {
          this.message = response.data.message;
          this.getPersonalInfos();
      }).catch(e=> {
          this.message = e;
      });

    },
    editPersonalInfos(personal_info) {
      this.form.id = personal_info.id;
      this.form.nom = personal_info.nom;
      this.form.prenom = personal_info.prenom;
      this.form.email = personal_info.email;
      this.form.phone = personal_info.phone;
      this.form.adresse = personal_info.adresse;
      this.form.propos = personal_info.propos;
      this.form.code_postal = personal_info.code_postal;
      this.form.linkedin = personal_info.linkedin;
      this.form.github = personal_info.github;
      this.form.facebook = personal_info.facebook;
      this.form.portfolio = personal_info.portfolio;
      this.form.profil_picture = null;
    },
    clear() {
          this.form.id = null;
          this.form.nom = '';
          this.form.prenom = '';
          this.form.email = '';
          this.form.phone = '';
          this.form.adresse = '';
          this.form.propos = '';
          this.form.code_postal = '';
          this.form.linkedin = '';
          this.form.github = '';
          this.form.facebook = '';
          this.form.portfolio = '';
          this.form.profil_picture = null;
    },
    clearMessages() {
      this.message = '';
    }
  },
  created() {
    this.getPersonalInfos();
    setInterval(() => this.clearMessages(),30000);
  }
}
</script>

<style>

</style>