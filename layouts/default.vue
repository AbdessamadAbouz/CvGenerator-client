<template>
  <div>
    <top-nav />
    <nuxt />
    <foot-bar />
  </div>
</template>

<script>
import TopNav from './partials/TopNav';
import FootBar from './partials/FootBar';

export default {
  components: {
    TopNav,
    FootBar
  }
}
</script>
