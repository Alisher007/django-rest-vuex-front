import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false
const token = localStorage.getItem('token')
if (token) {
  Axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + token,
    'Content-Type':'application/json'
};
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
