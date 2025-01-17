<template>
  <div class="header">
    <!-- 네비게이션 바 -->
    <nav class="nav-bar">
      <router-link v-if="!isLoggedIn" to="/">Home | </router-link> 
      <router-link to="/raidMatch"> RaidMatch </router-link> 
      <router-link v-if="isLoggedIn" to="/raid">| RaidClearInfo </router-link> 
      <router-link v-if="isLoggedIn" to="/mypage">| MyPage</router-link>
      <router-link v-if="isLoggedIn" to="/goldcheck">| CharacterGoldCheck</router-link>
    </nav>

    <!-- 로그아웃 버튼 -->
    <button v-if="isLoggedIn" @click="logout" class="logout-button">Logout</button>
  </div>

  <!-- 라우터 뷰 -->
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
    logout() {
      // 로그아웃 처리
      sessionStorage.removeItem("username");
      this.isLoggedIn = false;
      this.$router.push("/"); // 로그아웃 후 홈으로 리다이렉트
    },
  },
};
</script>

<style>
/* 기본 스타일 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* 헤더 스타일 */
/* 헤더 스타일 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

/* 네비게이션 스타일 */
.nav-bar {
  display: flex;
  align-items: center;
  flex: 1; /* 네비게이션이 남은 공간을 차지 */
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin-right: 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

/* 로그아웃 버튼 스타일 */
.logout-button {
  font-weight: bold;
  color: #2c3e50;
  background: none;
  border: 1px solid #2c3e50;
  padding: 10px 0; /* 위아래 여백 */
  width: 5%; /* 부모 요소의 5%로 고정 */
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  text-align: center; /* 텍스트 가운데 정렬 */
}

.logout-button:hover {
  background-color: #2c3e50;
  color: white;
}

/* 버튼 우측 정렬 */
.logout-button {
  margin-left: auto; /* 버튼을 우측으로 밀기 */
}
</style>
