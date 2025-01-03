<template>
  <div class="raid">
    <MypageMainView />  <!-- 'MypageMainView' 컴포넌트를 사용 -->
    <MypageMainCharacter/>
  </div>
</template>

<script>
import MypageMainView from '../components/MypageView/MypageMainView.vue'; // 'MypageMainView' 컴포넌트를 가져오기
import MypageMainCharacter from '../components/MypageView/MypageMainCharacter.vue'; // 'MypageMainCharacter' 컴포넌트를 가져오기

export default {
  name: 'MypageView',  // 컴포넌트 이름을 'MypageView'로 변경
  components: {
    MypageMainView,  // 여기에서 'MypageMainView'만 등록
    MypageMainCharacter
  }
}
</script>

<style scoped>
.raid {
  width: 100%;
  height: 65vh;  /* 페이지의 크기 조정 (80%로 줄임) */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
