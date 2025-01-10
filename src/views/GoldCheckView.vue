<template>
  <div class="home">
    <GoldCheckMainView msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import GoldCheckMainView from '@/components/RaidGoldCheckView/GoldCheckMainView.vue'

export default {
  name: 'GoldCheckView',
  components: {
    GoldCheckMainView
  }
}
</script>
