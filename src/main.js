import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlay , faSearch, faList, faHeart, faBookmark, faStar, faSun, faMoon} from '@fortawesome/free-solid-svg-icons';


library.add(faPlay, faSearch, faList, faHeart, faBookmark, faStar, faSun, faMoon);


const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');

