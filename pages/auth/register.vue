<template>
  <div class="container">
    <div class="col-md-6 offset-md-3">
      <div class="card mt-4">
        <div class="card-header">
          <p class='mb-0'>Register</p>
        </div>
        <div class="card-body">
          <form @submit.prevent="Register">
            <div class="form-group">
              <label>Name</label>
              <input v-model="form.name" type="text" class="form-control" placeholder="Name">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="form.email" type="email" class="form-control" placeholder="Email">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input v-model="form.password" type="password" class="form-control" placeholder="Password">
            </div>
            <div class="form-group">
              <label>Confirm password</label>
              <input v-model="form.password_confirmation" type="password" class="form-control" placeholder="Confirm your Password">
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
  methods: {
    async Register() {
      await this.$axios.post('/auth/register', this.form);

      this.$auth.login({data: this.form});

      this.$auth.push({name: 'index'});
    }
  }
}
</script>

<style>

</style>