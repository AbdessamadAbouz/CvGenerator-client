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
    <div class="col-md-4 offset-md-4 mt-4" v-if="langues">
      <b-table striped hover :items="langues.data.langues" :fields="fields"></b-table>
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
        this.$axios.get('/user/langues').then(response => (this.langues = response));
        this.message = 'stored succesfully';
      } catch(e) {
        this.message = e;
      }

    }
  },
  mounted () {
    this.$axios.get('/user/langues').then(response => (this.langues = response));
  }
}
</script>

<style>

</style>