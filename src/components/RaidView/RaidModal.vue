<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <h2>레이드를 추가</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="raidName">레이드 명</label>
            <input type="text" id="raidName" v-model="formData.raidName" required />
          </div>
  
          <div class="form-group">
            <label for="reward1">재료명</label>
            <input type="text" id="reward1" v-model="formData.reward1" required />
          </div>
  
          <div class="form-group">
            <label for="raidLevel">레이드 레벨</label>
            <input type="text" id="raidLevel" v-model="formData.raidLevel" required />
          </div>
  
          <!-- 두 개씩 가로로 배치 -->
          <div class="input-row">
            <div class="form-group">
              <label for="gold1">1관 클골</label>
              <input
                type="text"
                id="gold1"
                v-model="formData.gold1"
                @input="validateNumber('gold1')"
                required
                pattern="\d*"
              />
            </div>
  
            <div class="form-group">
              <label for="plus1">1관 개수</label>
              <input
                type="text"
                id="plus1"
                v-model="formData.plus1"
                @input="validateNumber('plus1')"
                required
                pattern="\d*"
              />
            </div>
          </div>
  
          <div class="input-row">
            <div class="form-group">
              <label for="gold2">2관 클골</label>
              <input
                type="text"
                id="gold2"
                v-model="formData.gold2"
                @input="validateNumber('gold2')"
                required
                pattern="\d*"
              />
            </div>
  
            <div class="form-group">
              <label for="plus2">2관 개수</label>
              <input
                type="text"
                id="plus2"
                v-model="formData.plus2"
                @input="validateNumber('plus2')"
                required
                pattern="\d*"
              />
            </div>
          </div>
  
          <div class="input-row">
            <div class="form-group">
              <label for="gold3">3관 클골</label>
              <input
                type="text"
                id="gold3"
                v-model="formData.gold3"
                @input="validateNumber('gold3')"
                required
                pattern="\d*"
              />
            </div>
  
            <div class="form-group">
              <label for="plus3">3관 개수</label>
              <input
                type="text"
                id="plus3"
                v-model="formData.plus3"
                @input="validateNumber('plus3')"
                pattern="\d*"
              />
            </div>
          </div>
  
          <div class="form-group">
            <button type="submit">등록</button>
          </div>
        </form>
  
        <button @click="close">닫기</button>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios'; // axios import 추가
import '../../css/components/RaidView/RaidModal.css';

export default {
  name: 'RaidModal',
  data() {
    return {
      formData: {
        raidName: '',
        gold1: '',
        gold2: '',
        gold3: '',
        reward1: '',
        plus1: '',
        plus2: '',
        plus3: '',
        raidLevel: '',
      },
    };
  },
  methods: {
    close() {
      this.$emit('close'); // 부모에게 모달 닫기 이벤트 전달
    },
    validateNumber(field) {
      // 필드에 입력된 값이 숫자인지 확인하고 숫자 외의 값은 제거
      this.formData[field] = this.formData[field].replace(/[^0-9]/g, '');
    },
    submitForm() {
      // 폼 제출 시 데이터 전송하는 로직
      console.log('Form submitted with data:', this.formData);

      // axios를 사용하여 POST 요청 보내기
      axios
        .post('http://localhost:8080/api/lostark/characters/raid', this.formData)
        .then((response) => {
          // 성공적으로 요청이 완료된 후 처리할 로직
          console.log('Data submitted successfully:', response.data);

          // 폼 제출 후 모달 닫기
          this.close();

          // 페이지 새로 고침하여 데이터 반영
          window.location.reload();
        })
        .catch((error) => {
          // 오류가 발생한 경우 처리할 로직
          console.error('Error submitting form:', error);
        });
    },
  },
};
</script>

  
 