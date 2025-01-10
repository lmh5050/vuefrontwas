<template>
  <nav>
    <router-link v-if="!isLoggedIn" to="/">Home | </router-link> 
    <router-link to="/raidMatch"> RaidMatch </router-link> 
    <router-link v-if="isLoggedIn" to="/raid">| RaidClearInfo </router-link> 
    <router-link v-if="isLoggedIn" to="/mypage">| MyPage</router-link>
    <router-link v-if="isLoggedIn" to="/goldcheck">| CharacterGoldCheck</router-link>
  </nav>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  mounted() {
    this.updateLoginStatus();
    window.addEventListener("storage", this.updateLoginStatus);
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.updateLoginStatus);
  },
  methods: {
    updateLoginStatus() {
      this.isLoggedIn = !!sessionStorage.getItem("username");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
