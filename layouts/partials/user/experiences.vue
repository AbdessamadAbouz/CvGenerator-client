<template>
  <div class="container">
    <div v-if="authenticated">
      <h1>Experiences</h1>
      <div class="container">
      <div class="row">
          <template v-for="(experience,index) in experiences">
            <b-card-group class="row" v-if="index%2 || index <4" :key="index" deck>
              <b-card :header="experience.id + ' - ' + experience.label" :key="experience.id" class="p-3 m-4">
                <p><strong>{{experience.label}}</strong> {{experience.societe}}.</p>
                <p> {{experience.description}}.</p>
                <p>From : {{experience.date_debut}} To : {{experience.date_fin}}</p>
              </b-card>
            </b-card-group>
          </template>
      </div>
      <div class="text-right pr-4">
        More ->
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
        experiences: null,
    }
  },
  methods: {
    async getexperiences() {
      this.$axios.get('/user/experiences').then(response => (this.experiences = response.data.experiences));
    },
  },
  created() {
    this.getexperiences();
  }
}
</script>

<style>

</style>
