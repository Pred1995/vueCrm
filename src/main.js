import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import dateFilter from './filters/date.filter'
import store from './store'
import messagePlugin from './utils/message.plagin'
import titlePlugin from './utils/title.plugin'
import vLoader from './components/app/v-loader'
import tooltipDirective from './directives/tooltip.directive'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import currency from './filters/currency.filter'
import localize from './filters/localize.filter'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(titlePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currency)
Vue.filter('localize', localize)
Vue.directive('tooltip', tooltipDirective)
Vue.component('vLoader', vLoader)
Vue.component('vPaginate', Paginate)

firebase.initializeApp({
  apiKey: 'AIzaSyCYCG25nmVDN-If-huCZW_1TdJmKAE-Hr8',
  authDomain: 'vue-crm-test-01.firebaseapp.com',
  databaseURL: 'https://vue-crm-test-01.firebaseio.com',
  projectId: 'vue-crm-test-01',
  storageBucket: 'vue-crm-test-01.appspot.com',
  messagingSenderId: '454425567641'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
