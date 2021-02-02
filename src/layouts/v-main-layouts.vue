<template>
  <div>
    <v-loader v-if='loading'/>
    <div class='app-main-layout' v-else>

      <v-navbar @click="isOpen = !isOpen"/>

      <v-sidebar v-model="isOpen" :key="locale"/>

      <main class='app-content' :class='{ full: !isOpen }'>
        <div class='app-page'>
          <router-view/>
        </div>
      </main>

      <div class='fixed-action-btn'>
        <router-link class='btn-floating btn-large blue' to='/record' v-tooltip="' Создать новую запись'">
          <i class='large material-icons'>add</i>
        </router-link>
      </div>
    </div>
    </div>
</template>

<script>
import vNavbar from '../components/app/v-navbar'
import vSidebar from '../components/app/v-sidebar'
import messages from '../utils/messages'
export default {
  name: 'v-main-layouts',
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  components: {
    vNavbar, vSidebar
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    locale () {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error (fbError) {
      console.log(fbError)
      this.$error(messages[fbError.code] || 'Неизвестная ошибка')
    },
    locale () {

    }
  }
}
</script>

<style scoped>

</style>
