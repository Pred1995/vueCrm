<template>
  <div>
    <div class='page-title'>
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class='form' @submit.prevent='onSub'>
      <div class='input-field'>
        <input
          id='description'
          type='text'
          v-model='name'
          :class='{invalid: $v.name.$dirty && !$v.name.required}'
        >
        <label for='description'>{{'name' | localize}}</label>
        <small class='helper-text invalid' v-if='$v.name.$dirty && !$v.name.required'>{{'Message_EnterName' | localize}}</small>
      </div>
      <div class='switch'>
        <label>
          English
          <input type='checkbox' v-model='isRuLocale'>
          <span class='lever'></span>
          Русский
        </label>
      </div>
      <button class='btn waves-effect waves-light' type='submit'>
        {{'updateLocalize' | localize}}
        <i class='material-icons right'>send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import M from 'materialize-css'
import { required } from 'vuelidate/lib/validators'
import localizeFilter from '../filters/localize.filter'
export default {
  name: 'v-profile',
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  metaInfo () {
    return {
      title: this.$title('Profile_Title')
    }
  },
  validations: {
    name: { required }
  },
  methods: {
    ...mapActions(['updateInfo']),
    async onSub () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  mounted () {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  }
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
