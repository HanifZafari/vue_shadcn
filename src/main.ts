import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { HiSolidLocationMarker } from 'oh-vue-icons/icons'

const app = createApp(App)

app.use(createPinia())
app.use(router)

addIcons(HiSolidLocationMarker)
app.component('v-icon', OhVueIcon)

app.mount('#app')
