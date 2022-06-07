import 'flowbite';
import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router";
import App from './App.vue'
import "./index.css";
import Login from './components/Login.vue';
import Todo from "./components/Todo.vue";
import AddEditTodo from "./components/AddEditTodo.vue";
import Flowbite from "./components/Flowbite.vue";
import Registration from "./components/Register.vue";
import Users from "./components/Users.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { path: '/', component: Todo },    
    { path: '/Todo', component: Todo },
    { path: '/AddEdit', component: AddEditTodo },
    { path: '/AddEdit/:id', component: AddEditTodo },
    { path: '/Registration', component: Registration },
    { path: '/Users', component: Users },
    { path: '/login', component: Login },
    { path: '/flowbite', component: Flowbite }
  ]
  
  // 3. Create the router instance and pass the `routes` option
  // You can pass in additional options here, but let's
  // keep it simple for now.
  const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
  });

  router.beforeEach((to, from, next) => {
    // ...
    // explicitly return false to cancel the navigation    

    if(to.fullPath.toLowerCase() != '/registration' && to.fullPath.toLowerCase() != '/login'){
      if (localStorage.getItem('token') == null) {          
        return next({ path: '/login' });
      }
    }

    next();
    
  });
  
  // 5. Create and mount the root instance.
  const app = createApp(App)
  // Make sure to _use_ the router instance to make the
  // whole app router-aware.
  app.use(router)

  app.mount('#app');
