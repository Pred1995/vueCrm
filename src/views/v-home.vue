<template>
  <div>
    <div class='page-title'>
      <h3>Счет</h3>

      <button class='btn waves-effect waves-light btn-small' @click='refresh'>
        <i class='material-icons'>refresh</i>
      </button>
    </div>

    <v-loader v-if='loading'/>

    <div v-else class='row'>

      <v-home-bill :rates='currency.rates'/>

      <v-home-currency :rates='currency.rates' :date='currency.date'/>

    </div>
  </div>
</template>

<script>
import vHomeBill from '../components/v-homebill'
import vHomeCurrency from '../components/v-homecurrrency'
export default {
  name: 'v-home',
  data: () => ({
    loading: true,
    currency: null
  }),
  metaInfo () {
    return {
      title: this.$title('Home')
    }
  },
  async mounted () {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  components: {
    vHomeBill, vHomeCurrency
  },
  methods: {
    async refresh () {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
