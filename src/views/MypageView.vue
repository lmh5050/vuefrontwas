<template>
  <div class="raid">
    <div class="view-wrapper">
      <MypageMainView /> <!-- 첫 번째 컴포넌트 -->
    </div>
  </div>
</template>

<script>
import MypageMainView from '../components/MypageView/MypageMainView.vue';

export default {
  name: 'MypageView',
  components: {
    MypageMainView,
  },
};
</script>

<style scoped>
.raid {
  width: 100%;
  height: 100vh; /* 전체 높이를 뷰포트 높이로 설정 */
  padding: 20px;
  display: flex;
  flex-direction: column; /* 세로 배치 */
}

.view-wrapper {
  flex: 0 0 10%; /* 높이를 전체의 10%로 설정 */
}

.character-wrapper {
  flex: 1; /* 나머지 공간을 차지 */
}
</style>
