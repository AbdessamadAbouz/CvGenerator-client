<template>
  <div class="">
    <template class="" v-if="prev">
      <b-button block variant="outline-dark" @click="Decrement()">
        previous
      </b-button>
    </template>
    <template v-if="next == 1">
      <h4>Select personal infos to show on resume</h4>
      <div>
        <b-form-group>
          <template v-for="infos in this.personal_infos">

            <b-card title="" style="max-width: 30rem;" class="mb-2">
              <div class="co-md-2">
                <b-form-radio v-model="pers_infos" :value="infos.id"></b-form-radio>
              </div>
              <div class="col-md-10">
                <b-card-text>
                  <strong>Full Name :</strong> {{infos.nom}} {{infos.prenom}} <br>
                  <strong>Mail :</strong> {{infos.email}} <br>
                  <strong>Phone :</strong> {{infos.phone}} <br>
                  <strong>Address :</strong> {{infos.adresse}} <br>
                  <strong>About :</strong> {{infos.propos}} <br>
                  <strong>Picture :</strong> <template v-if="infos.profil_picture">
                    Yes
                  </template>
                  <template v-else>
                    No Photo Inserted on those infos
                  </template>
                </b-card-text>
              </div>
            </b-card>
          </template>
        </b-form-group>
      </div>
    </template>
    <template v-if='next == 2'>
      second
    </template>
    <div class="invalid-feedback d-block" v-if="message">
      {{message}}
    </div>
    <template v-if="next <= 5">
      <b-button block variant="outline-dark" @click="increment()">
        next
      </b-button>
    </template>
  </div>
</template>

<script>

export default {
    components: {
    },
    data() {
      return {
        prev: 0,
        next: 1,
        personal_infos: null,
        pers_infos: '',
        message: ''
      }
    },
    created() {
      this.getPersonalInfos()
    },
    methods: {
      increment() {
        if(this.next == 1) {
          if(!this.pers_infos) {
            this.message = "Should select one choice"
            return 0
          }
        }
        this.message = ''
        this.next = this.next + 1
        this.prev = this.prev + 1
      },
      Decrement() {
        this.next = this.next - 1
        this.prev = this.prev - 1
      },
      async getPersonalInfos() {
        this.$axios.get('/user/personal-infos').then(response => (this.personal_infos = response.data.personal_infos));
      },
    }
}
</script>

<style>

</style>
