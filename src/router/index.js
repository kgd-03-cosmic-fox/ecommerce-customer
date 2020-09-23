import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import CategoryPage from '../views/CategoryPage.vue'
import ManualBrewers from '../components/ManualBrewers.vue'
import CoffeeMachines from '../components/CoffeeMachines.vue'
import Coffee from '../components/Coffee.vue'
import EditingPage from '../views/EditingPage.vue'
import RegisterPage from '../views/RegisterPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/category',
    component: CategoryPage,
    children: [
      {
        path: '',
        name: 'CategoryPage',
        component: ManualBrewers
      },
      {
        path: 'manual-brewers',
        name: 'ManualBrewers',
        component: ManualBrewers
      },
      {
        path: 'coffee-machines',
        name: 'CoffeeMachines',
        component: CoffeeMachines
      },
      {
        path: 'coffees',
        name: 'Coffees',
        component: Coffee
      }
    ]
  },
  {
    path: '/product/:id',
    name: 'EditingPage',
    component: EditingPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
