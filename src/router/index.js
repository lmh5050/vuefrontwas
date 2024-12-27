import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyTest from '../views/MyTest.vue'
import RaidView from '../views/RaidView.vue'
import RaidMatchView from '../views/RaidMatchView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/test',
    name: 'test',
    component: MyTest
  },
  {
    path: '/raid',
    name: 'raid',
    component: RaidView
  },
  {
    path: '/raidMatch',
    name: 'raidMatch',
    component: RaidMatchView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
