<template>
  <div class="container">
    <div class="col-md-6 offset-md-3">
      <div class="card mt-4">
        <div class="card-header">
          <p class='mb-0'>Register</p>
        </div>
        <div class="card-body pb-10">
          <form @submit.prevent="Register">
            <div class="form-group mb-0">
              <label>Name</label>
              <input v-model="form.name" type="text" class="form-control" :class="{ 'is-invalid': errors.name }" placeholder="Name">
            </div>
            <div class="invalid-feedback d-block" v-if="errors.name">
              {{errors.name[0]}}
            </div>
            <div class="form-group mb-0">
              <label>Email</label>
              <input v-model="form.email" type="email" class="form-control" :class="{'is-invalid': errors.email}" placeholder="Email">
            </div>
            <div class="invalid-feedback d-block" v-if="errors.email">
              {{errors.email[0]}}
            </div>
            <div class="form-group mb-0">
              <label>Password</label>
              <input v-model="form.password" type="password" class="form-control" :class="{'is-invalid': errors.password}" placeholder="Password">
            </div>
            <div class="invalid-feedback d-block" v-if="errors.password">
              <div v-for="error in errors.password" :key ="error">
                {{error}}
              </div>
            </div>
            <div class="form-group">
              <label>Confirm password</label>
              <input v-model="form.password_confirmation" type="password" class="form-control" :class="{'is-invalid': errors.password}" placeholder="Confirm your Password">
            </div>
            <div class="form-group">
              <input type="submit" value="Register" class="btn btn-default w-100">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middlware: 'guest',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  beforeMount() {
    if(this.$auth.user)
    {
      window.location.replace('/');
    }
  },
  methods: {
    async Register() {
      try {
        await this.$axios.post('/auth/register', this.form);
        this.$auth.login({data: this.form});
        this.$auth.push({name: 'index'});
      } catch(e) {
        //
      }

    }
  }
}
</script>

<style>

</style>
