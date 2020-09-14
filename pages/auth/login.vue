<template>
  <div class="container">
    <div class="col-md-6 offset-md-3 pb-5">
      <div class="card mt-4">
        <div class="card-header">
          <p class='mb-0'>Login</p>
        </div>
        <div class="card-body">
          <form @submit.prevent="Register">
            <div class="form-group">
              <label>Email</label>
              <input v-model="form.email" type="email" class="form-control" :class="{'is-invalid': errors.email}" placeholder="Email">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input v-model="form.password" type="password" class="form-control" :class="{'is-invalid': errors.password}" placeholder="Password">
            </div>
            <div class='invalid-feedback d-block' v-if="message">
                {{message}}
            </div>
            <div class="form-group">
              <input type="submit" value="Login" class="btn btn-default w-100">
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
        email: '',
        password: '',
      },
      message: null,
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
      this.message = null;
      try {
        this.$auth.login({data: this.form});
        this.$auth.push({name: 'index'});
      } catch(e) {
        this.message = 'Mail/Password Invalid';
      }

    }
  },
}
</script>

<style>

</style>
