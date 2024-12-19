<template>
  <div class="raid">
    <RaidMainChart />  <!-- 'RaidMainChart' 컴포넌트를 사용 -->
  </div>
</template>

<script>
import RaidMainChart from '../components/RaidView/RaidMainChart.vue';  // 'RaidMainChart' 컴포넌트 가져오기

export default {
  name: 'RaidView',
  components: {
    RaidMainChart  // 'RaidMainChart' 컴포넌트 등록
  }
}
</script>
