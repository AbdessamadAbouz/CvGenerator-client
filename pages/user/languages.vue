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
            <p class='mb-0'>Add new language</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="store">
              <div class="form-group">
                <label>Label</label>
                <input v-model="form.label" type="text" class="form-control" placeholder="Label (Ex: English, French, ...)">
              </div>
              <div class="form-group">
                <label>Level</label>
                <b-form-select v-model="form.level" :options="options"></b-form-select>
              </div>
              {{message}}
              <div class="form-group">
                <input type="submit" value="Store your language" class="btn btn-default w-100">
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
          label: '',
          level: null
        },
        message: '',
        langues: null,
        fields: ['label', 'level']
      }
  },
  methods: {
    async store() {
      try {
        this.$axios.post('/user/langues',this.form);
        this.getlanguages();
        this.message = 'stored succesfully';
      } catch(e) {
        this.message = e;
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
    editLangue($langue) {

    }
  },
  created() {
    this.getlanguages();
    // setInterval(() => this.getlanguages(),10000);
  }
}
</script>

<style>

</style>