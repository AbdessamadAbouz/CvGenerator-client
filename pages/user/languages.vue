<template>
  <div>
    <div class="container">
      <h1>Languages</h1>

    </div>
    <div class="row">
      <div class='col-md-3'>
        <side-bar />
      </div>
      <div class="col-md-6">
        <div class="card mt-4">
          <div class="card-header">
            <p class='mb-0'>Add or update new language</p>
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
                <label>Level</label>
                <b-form-select v-model="form.level" :options="options"></b-form-select>
              </div>
              <div class="invalid-feedback d-block" v-if="errors.level">
                {{errors.level[0]}}
              </div>
              {{message}}
              <div class="form-group">
                <template v-if="form.id">
                  <input type="submit" value="Update your language" class="btn btn-default w-100">
                  <a href="#" @click="editLangue(langue)">
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
    <div class="col-md-8 offset-md-2 mt-4" v-if="langues">
      <table class="table table-sm">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Language label</th>
      <th scope="col">Level</th>
      <th scope="col">Edit/Delete</th>
    </tr>
  </thead>
  <tbody>

    <template v-for="langue in langues.data.langues">
    <tr :key="langue.id">
      <th scope="row">{{langue.id}}</th>
      <td>{{langue.label}}</td>
      <td>{{langue.level}}</td>
      <td>
        <a href="#" @click="editLangue(langue)">
          Edit
        </a>
        /
        <a href="#" @click="deleteLangue(langue.id)">
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
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'beginner', text: 'Entry level (Beginner)' },
          { value: 'intermediate', text: 'Intermediate' },
          { value: 'advanced', text: 'Advanced' }
        ],
        form: {
          id: null,
          label: '',
          level: null
        },
        message: '',
        langues: null,
        fields: ['label', 'level']
      }
  },
  methods: {
    async storeOrUpdate(id) {
      if(!id) {
        try {
          this.$axios.post('/user/langues',this.form).then(response => (
            this.message = response.data.message,
            this.clear()
          ));
          this.getlanguages();
        } catch(e) {
        }
      }
      else {
        this.$axios.put('user/langues/'+id, this.form).then(response => {
          this.message = response.data.message;
          this.getlanguages();
          this.clear();
      }).catch(e=> {
          this.message = e;
      });
      }
      
    },
    async getlanguages() {
      this.$axios.get('/user/langues').then(response => (this.langues = response));
    },
    deleteLangue(id) {
      this.$axios.delete('user/langues/'+id).then(response => {
          this.message = response.data.message;
          this.getlanguages();
      }).catch(e=> {
          this.message = e;
      });

    },
    editLangue(langue) {
      this.form.id = langue.id;
      this.form.label = langue.label;
      this.form.level = langue.level;
    },
    clear() {
      this.form.id = null;
      this.form.label = '';
      this.form.level = null;
    },
    clearMessages() {
      this.message = '';
    }
  },
  created() {
    this.getlanguages();
    setInterval(() => this.clearMessages(),30000);
  }
}
</script>

<style>

</style>