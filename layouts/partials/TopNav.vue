<template>
  <div>
    <b-navbar type="light" variant="light">
        <nuxt-link class='navbar-brand pl-4' to="/">CvGenerator</nuxt-link>
        <div class="container">

        <!-- Navbar dropdowns -->
        <template v-if="authenticated">
        <b-navbar-nav>
          <b-nav-item-dropdown text="Insert or Update" right>
            <b-dropdown-item href="/user/informations">Personal information</b-dropdown-item>
            <b-dropdown-item href="/user/experiences">Experiences</b-dropdown-item>
            <b-dropdown-item href="/user/formations">Formations</b-dropdown-item>
            <b-dropdown-item href="/user/languages">Languages</b-dropdown-item>
            <b-dropdown-item href="/user/skills">Skills</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </template>

        <template v-if="authenticated">
          <b-navbar-nav class='ml-auto'>
            <li class="nav-item">
              <nuxt-link class='nav-link' to="/dashboard">{{user.name}}</nuxt-link>
            </li>
            <li class="nav-item">
              <b-nav-item @click.prevent="signOut">logout</b-nav-item>
            </li>
          </b-navbar-nav>
        </template>

        <template v-else>
          <b-navbar-nav class='ml-auto'>
            <li class="nav-item">
              <nuxt-link class='nav-link' to="/auth/login">Login</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class='nav-link' to="/auth/register">Register</nuxt-link>
            </li>
          </b-navbar-nav>
        </template>

      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      this.$auth.logout();

    }
  }
}
</script>

<style>

</style>
