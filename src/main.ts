import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin as formKitPlugin } from '@formkit/vue'
import formKitConfig from './formkit.config'
import App from './App.vue'
import './styles.css'

const app = createApp(App)
app.use(createPinia())
app.use(formKitPlugin, formKitConfig)
app.mount('#app')
