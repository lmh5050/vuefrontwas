<template>
  <div class="raid-main-chart">
    <h2>Raid</h2>
    <table>
      <thead>
        <tr>
          <th>레이드 명</th>
          <th>1관</th>
          <th>2관</th>
          <th>3관</th>
          <th>합계</th>
          <th>재료명</th>
          <th>1관 개수 / (더보기) = 합계</th>
          <th>2관 개수 / (더보기) = 합계</th>
          <th>3관 개수 / (더보기) = 합계</th>
          <th>인원 수 </th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(RaidInfo, index) in Raid" :key="index">
          <td>{{ RaidInfo.raidName }}</td>
          <td>{{ RaidInfo.gold1 }}</td>
          <td>{{ RaidInfo.gold2 }}</td>
          <td>{{ RaidInfo.gold3 }}</td>
          <td class="gold-sum">
            {{ (getValidNumber(RaidInfo.gold1) + getValidNumber(RaidInfo.gold2) + getValidNumber(RaidInfo.gold3)).toLocaleString() }}
          </td>
          <td>{{ RaidInfo.reward1 }}</td>
          <td>
            {{ RaidInfo.plus1 }} / ({{ RaidInfo.plus1 }}) = 
            {{ (getValidNumber(RaidInfo.plus1) + getValidNumber(RaidInfo.plus1)).toLocaleString() }}
          </td>
          <td>
            {{ RaidInfo.plus2 }} / ({{ RaidInfo.plus2 }}) = 
            {{ (getValidNumber(RaidInfo.plus2) + getValidNumber(RaidInfo.plus2)).toLocaleString() }}
          </td>
          <td v-if="RaidInfo.plus3">
              {{ RaidInfo.plus3 }} / ({{ RaidInfo.plus3 }}) = 
              {{ (getValidNumber(RaidInfo.plus3) + getValidNumber(RaidInfo.plus3)).toLocaleString() }}
          </td>
          <td v-else>
          <!-- 빈 셀 -->
          </td>
          <td>
            {{ RaidInfo.raidmaxmember }}
          </td>
          <td>
            <button @click="deleteRaid(RaidInfo.raidName)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 등록 버튼 추가 -->
    <div class="add-button-container" style="display: flex; justify-content: flex-end; margin-top: 2%;">
      <button @click="addRaid" style="width: 7%;">등록</button>
    </div>

    <!-- 모달 컴포넌트 -->
    <RaidModal v-if="isModalVisible" @close="closeModal"/>
  </div>
</template>

<script>
import '../../css/components/RaidView/RaidMainChart.css';
import axios from 'axios';
import RaidModal from './RaidModal.vue';  // RaidModal.vue 컴포넌트 import

export default {
  name: 'RaidMainChart',
  components: {
    RaidModal  // 컴포넌트 등록
  },
  data() {
    return {
      Raid: [], // 데이터를 저장할 배열
      isModalVisible: false  // 모달 표시 여부
    };
  },
  mounted() {
    // 컴포넌트가 마운트되면 Spring API에서 데이터를 불러옴
    axios.get('http://34.47.90.90:8081/api/lostark/characters/raid')
      .then(response => {
        console.log(response.data);
        this.Raid = response.data;
      })
      .catch(error => {
        console.error("There was an error!", error);
      });
  },
  methods: {
    getValidNumber(value) {
      return isNaN(parseFloat(value)) || value === null || value === '' ? 0 : parseFloat(value);
    },
    deleteRaid(raidName) {
      console.log(`${raidName} 레이드를 삭제합니다.`);
      axios
          .delete(`http://34.47.90.90:8081/api/lostark/characters/raid/${encodeURIComponent(raidName)}`, {
              data: {
                  data: raidName  // 본문에 raidName을 data로 포함
              }
          })
          .then(response => {
              console.log(response.data);  // API 응답 데이터를 콘솔에 출력
              // 성공 시 처리 로직 추가 (예: UI에서 해당 항목 제거)
              this.Raid = this.Raid.filter(raid => raid.raidName !== raidName);
          })
          .catch(error => {
              console.error('There was an error!', error);  // 에러 처리
          });
    },
    // 등록 버튼 클릭 시 실행할 메소드
    addRaid() {
      this.isModalVisible = true;  // 모달 창 표시
    },
    // 모달 창 닫기
    closeModal() {
      this.isModalVisible = false;  // 모달 창 숨기기
    }
  }
};
</script>