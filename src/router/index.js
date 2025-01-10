import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RaidView from '../views/RaidView.vue'
import RaidMatchView from '../views/RaidMatchView.vue'
import signupView from '../views/signupView.vue'
import MypageView from '../views/MypageView.vue'
import GoldCheckView from '../views/GoldCheckView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
  },
  {
    path: '/signup',
    name: 'signup',
    component: signupView
  },
  {
    path: '/login',
    name: 'login',
    component: HomeView
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MypageView
  },
  {
    path: '/goldcheck',
    name: 'GoldCheckMainView',
    component: GoldCheckView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
