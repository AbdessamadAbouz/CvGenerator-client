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
      <h4>Select experiences to show in resume</h4>
      <div>
        <b-form-group>
          <b-form-checkbox-group id="checkbox-group-2" v-model="experiences_list" name="flavour-2">
            <template v-for="exp in this.experiences">

              <b-card title="" style="max-width: 30rem;" class="mb-2">
                <div class="co-md-2">
                  <b-form-checkbox :value="exp.id"></b-form-checkbox>
                </div>
                <div class="col-md-10">
                  <b-card-text>
                    <strong>Label : </strong> {{exp.societe}} <br>
                    <strong>Description :</strong> {{exp.description}} <br>
                    <strong>Duration :</strong> {{exp.date_debut}} {{exp.date_fin}}
                  </b-card-text>
                </div>
              </b-card>
            </template>
          </b-form-checkbox-group>
        </b-form-group>
      </div>
    </template>


    <template v-if='next == 3'>
      <h4>Select formations to show in resume</h4>
      <div>
        <b-form-group>
          <b-form-checkbox-group id="checkbox-group-2" v-model="formation_list" name="flavour-2">
            <template v-for="formation in this.formations">

              <b-card title="" style="max-width: 30rem;" class="mb-2">
                <div class="co-md-2">
                  <b-form-checkbox :value="formation.id"></b-form-checkbox>
                </div>
                <div class="col-md-10">
                  <b-card-text>
                    <strong>Label : </strong>{{formation.label}} <br>
                    <strong>Title : </strong>  {{formation.titre}} <br>
                    <strong>School name : </strong> {{formation.nom_ecole}} <br>
                    {{formation.date_debut}} - {{formation.date_fin}}
                  </b-card-text>
                </div>
              </b-card>
            </template>
          </b-form-checkbox-group>
        </b-form-group>
      </div>
    </template>


    <template v-if='next == 4'>
      <h4>Select skills to show in resume</h4>
      <div>
        <b-form-group>
          <b-form-checkbox-group id="checkbox-group-2" v-model="skill_list" name="flavour-2">
            <template v-for="skill in this.skills">

              <b-card title="" style="max-width: 30rem;" class="mb-2">
                <div class="co-md-2">
                  <b-form-checkbox :value="skill.id"></b-form-checkbox>
                </div>
                <div class="col-md-10">
                  <b-card-text>
                    <strong>{{skill.competence_type}}</strong> : {{skill.label}}
                  </b-card-text>
                </div>
              </b-card>
            </template>
          </b-form-checkbox-group>
        </b-form-group>
      </div>
    </template>

    <template v-if='next == 5'>
      <h4>Select languages to show in resume</h4>
      <div>
        <b-form-group>
          <b-form-checkbox-group id="checkbox-group-2" v-model="language_list" name="flavour-2">
            <template v-for="language in this.languages">

              <b-card title="" style="max-width: 30rem;" class="mb-2">
                <div class="co-md-2">
                  <b-form-checkbox :value="language.id"></b-form-checkbox>
                </div>
                <div class="col-md-10">
                  <b-card-text>
                    <strong>{{language.label}}</strong> : {{language.level}}
                  </b-card-text>
                </div>
              </b-card>
            </template>
          </b-form-checkbox-group>
        </b-form-group>
      </div>
    </template>

    <div class="invalid-feedback d-block" v-if="message">
      {{message}}
    </div>
    <template v-if="next <= 5">
      <b-button block variant="outline-dark" @click="increment()">
        next
      </b-button>
    </template>
    <template v-if="next == 6">
      <h5>If you are not sure about your infos, go back and re-check your choices.</h5>
      {{this.choices.info_choice}}
      <b-button block variant="outline-dark" @click="apply()">
        Apply
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
        experiences: null,
        formations: null,
        skills: null,
        languages: null,
        choices: {
          info_choice: null,
        },
        form: {
          personal_info_id: '',
          competence_ids: [],
          experience_ids: [],
          formation_ids: [],
          langue_ids: [],
        },
        language_list: [],
        skill_list: [],
        formation_list: [],
        experiences_list: [],
        pers_infos: '',
        message: ''
      }
    },
    created() {
      this.getPersonalInfos()
      this.getexperiences()
      this.getformations()
      this.getCompetences()
      this.getlanguages()
    },
    methods: {
      increment() {
        if(this.next == 1) {
          if(!this.pers_infos) {
            this.message = "Should select one choice"
            return 0
          }
        }
        else if(this.next == 2) {
          if(!this.experiences_list.length) {
            this.message = "Should select at least on experience"
            return 0
          }
        }
        else if(this.next == 3) {
          if(!this.formation_list.length) {
            this.message = "Should Select at least on formation"
            return 0
          }
        }
        else if(this.next == 4) {
          if(!this.skill_list.length) {
            this.message = "Should select skills"
            return 0
          }
        }
        else if(this.next == 5){
          if(!this.language_list.length) {
            this.message = "Should select a language"
            return 0
          }
        }
        this.message = ''
        this.next = this.next + 1
        this.prev = this.prev + 1
        if(this.next == 6) {
          this.getInfo(this.pers_infos)
        }
      },
      Decrement() {
        this.next = this.next - 1
        this.prev = this.prev - 1
      },
      async getPersonalInfos() {
        this.$axios.get('/user/personal-infos').then(response => (this.personal_infos = response.data.personal_infos));
      },
      async getexperiences() {
        this.$axios.get('/user/experiences').then(response => (this.experiences = response.data.experiences));
      },
      async getformations() {
        this.$axios.get('/user/formations').then(response => (this.formations = response.data.formations));
      },
      async getCompetences() {
        this.$axios.get('/user/competences').then(response => (this.skills = response.data.competences));
      },
      async getlanguages() {
        this.$axios.get('/user/langues').then(response => (this.languages = response.data.langues));
      },
      async getInfo(id) {
        this.$axios.get('user/personal-infos/'+id).then(response => (this.choices.info_choice = response.data.Personal_infos))
      },
      // async getOneExperience(id) {
      //   this.$axios.get('user/personal-infos/'+id).then(response => (this.choices.exp_choice.append(response.data.experience)))
      // }
      apply() {
        this.form.formation_ids = this.formation_list
        this.form.personal_info_id = this.pers_infos
        this.form.competence_ids = this.skill_list
        this.form.experience_ids = this.experiences_list
        this.form.langue_ids = this.language_list

        try {
          this.$axios.post('user/generate-resume',this.form).then(response => (
          this.message = response.data.message,
          this.clear()
          ))
        }catch(e) {

        }
        // this.message = "Your resume has been created succesfully!!"
        // this.message = this.form
        this.prev = 0
        this.next = 1
      }
    }
}
</script>

<style>

</style>
