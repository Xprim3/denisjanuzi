import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './i18n'
import { vReveal } from './directives/reveal'

const app = createApp(App)
app.directive('reveal', vReveal)
app.use(i18n).mount('#app')
