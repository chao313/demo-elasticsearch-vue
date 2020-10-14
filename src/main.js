import Vue from 'vue'
import http from './utils/http.js'
import api from './utils/api.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import App from './App'
import router from './router'
import store from './store'
import './permission'

/**
 * 这里是导入的入口！！！
 */
import DateUtil from './utils/DateUtil.js'

Vue.use(ElementUI);
/**
 * 设置全局的http
 * @type {{get, post}}
 */
Vue.prototype.$http = http;
/*设置全局的api*/
Vue.prototype.api = api;
Vue.prototype.$DateUtil = DateUtil;


Vue.config.productionTip = false
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
