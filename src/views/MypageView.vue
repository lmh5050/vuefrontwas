<template>
  <div class="raid">
    <MypageMainView />  <!-- 'MypageMainView' 컴포넌트를 사용 -->
  </div>
</template>

<script>
import MypageMainView from '../components/MypageView/MypageMainView.vue'; // 'MypageMainView' 컴포넌트를 가져오기
  
export default {
  name: 'MypageView',  // 컴포넌트 이름을 'MypageView'로 변경
  components: {
    MypageMainView  // 여기에서 'MypageMainView'만 등록
  }
}
</script>

<style scoped>
</style>
