<template>
  <div class="container">
    <div v-if="authenticated">
      <h2>Langues</h2>
      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">Language label</th>
            <th scope="col">Level</th>
          </tr>
        </thead>
        <tbody>

          <template v-for="(langue,index) in this.langues">

          <tr :key="langue.id" v-if="index < 4">
            <td>{{langue.label}}</td>
            <td>{{langue.level}}</td>
          </tr>
          </template>
        </tbody>
      </table>
      <div class="text-right pr-2">
        <nuxt-link class='nav-link' to="/user/languages">More -></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
        langues: null,
    }
  },
  methods: {
    async getlanguages() {
      this.$axios.get('/user/langues').then(response => (this.langues = response.data.langues));
    },
  },
  created() {
    this.getlanguages();
  }
}
</script>

<style>

</style>
