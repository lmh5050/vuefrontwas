<template>
    <div>
      <h3>레이드 상세 정보</h3>
      <div v-if="selectedRaidInfo" style="padding-bottom: 2%;">
        <span style="margin-right: 5px;">시간: <span style="font-weight: bold;">{{ selectedRaidInfo.time }}</span> |</span>
        <span style="margin-right: 5px;">레이드 명: <span style="font-weight: bold;">{{ selectedRaidInfo.raidName }}</span> |</span>
        <span style="margin-right: 5px;">공대장: <span style="font-weight: bold;">{{ selectedRaidInfo.characterName }}</span></span>
      </div>
      <div class="raid-details">
        <div v-for="(raid, index) in raids" :key="index" class="raid-item">
          <p>참여 캐릭터: {{ raid.characterName }}</p>
          <p>아이템 최대 레벨: {{ raid.itemMaxLevel }}</p>
          <p>클래스 이름: {{ raid.CharacterClassName }}</p>
          <p>클래스 타입: {{ raid.classType }}</p>
        </div>
      </div>
      <button @click="$emit('close')"> 닫기 </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "RaidMatchDetailModal",
    props: {
        selectedRaidInfo: Object, // 부모에서 받은 선택된 레이드 정보
      raids: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .raid-details {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-around;
  }
  
  .raid-item {
    flex: 1 1 250px;
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #3a9b75;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7); /* 더 진한 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    width: 90vw; /* 90% of the viewport width */
    height: 80vh; /* 80% of the viewport height */
    max-width: 100%;
    max-height: 100%;
    overflow-y: auto;
  }
  </style>
  