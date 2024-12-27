<template>
    <div class="raidMatch">
      <RaidMatchMainTable />  <!-- 'RaidMatchMainTable' 컴포넌트를 사용 -->
    </div>
  </template>
  
  <script>
  import RaidMatchMainTable from '../components/RaidMatchView/RaidMatchMainTable.vue';  // 'RaidMainChart' 컴포넌트 가져오기
  
  export default {
    name: 'RaidMatchView',
    components: {
        RaidMatchMainTable  // 'RaidMatchMainTable' 컴포넌트 등록
    }
  }
  </script>
  