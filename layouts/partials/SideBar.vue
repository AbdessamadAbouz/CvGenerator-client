<template>
  <div class="container">
    <div v-if="authenticated">
      <div class="card">
        <article class="card-group-item">
          <header class="card-header"><h6 class="title">Hello {{user.name}} </h6></header>
          <div class="filter-content">
            <div class="list-group list-group-flush">
              <nuxt-link class='nav-link' to="/user/informations">Informations</nuxt-link>
              <nuxt-link class='nav-link' to="/user/experiences">Experiences</nuxt-link>
              <nuxt-link class='nav-link' to="/user/formations">Formations</nuxt-link>
              <nuxt-link class='nav-link' to="/user/languages">Languages</nuxt-link>
              <nuxt-link class='nav-link' to="/user/skills">Skills</nuxt-link>
            </div>  <!-- list-group .// -->
          </div>
        </article> <!-- card-group-item.// -->
      </div> <!-- card.// -->
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>