/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import "./main.scss";
// Components
import App from './App.vue'
import router from './router'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

router.isReady().then(() => app.mount('#app'))
