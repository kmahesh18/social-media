import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import PrimeVue from 'primevue/config';

// Simplify PrimeVue imports to use v3 compatible paths
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.css';
import 'primeicons/primeicons.css';

// Import PrimeVue components
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Password from 'primevue/password';
import Textarea from 'primevue/textarea';
import Card from 'primevue/card';
import ToastService from 'primevue/toastservice';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

// Register components globally
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Toast', Toast);
app.component('Password', Password);
app.component('Textarea', Textarea);
app.component('Card', Card);
app.component('Toast', Toast);

// Initialize auth state before mounting
store.dispatch('initializeAuth').finally(() => {
  app.mount('#app');
});
