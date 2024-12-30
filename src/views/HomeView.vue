<template>
  <div class="home">
    <HomeLoginView msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeLoginView from '@/components/HomeView/HomeLoginView.vue'

export default {
  name: 'HomeView',
  components: {
    HomeLoginView
  }
}
</script>
