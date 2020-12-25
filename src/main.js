import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import VueCookies from 'vue-cookies'


Vue.use(ElementUI)
Vue.use(VueCookies)

Vue.config.productionTip = false
axios.defaults.timeout = 3000
Vue.prototype.$axios = axios


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
