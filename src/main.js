import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

import 'assets/css/theme/index.css'
import "assets/css/base.css"
import "assets/fonts/iconfont.css";


const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')