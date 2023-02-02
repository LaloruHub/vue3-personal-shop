import { createApp } from 'vue'

import App from './index.vue'
createApp(App).mount('#app')

import Menu from './components/_menu.vue'
createApp(Menu).mount('#menu')

import footer from './components/_footer.vue'
createApp(footer).mount('#footer')
