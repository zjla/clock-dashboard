<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps<{
  value: number;
}>();

const prevValue = ref(props.value);
const wrapperStyle = ref({
  transform: `translateY(-${props.value * 1.1}em)`,
  transition: 'transform 0.8s cubic-bezier(0, -0.6, 0.32, 1.6)'
});

const containerRotate = ref(`rotate(${(Math.random() * 8 - 4).toFixed(1)}deg)`);

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

watch(() => props.value, (newVal) => {
  if (prevValue.value === 9 && newVal === 0) {
    // 9 -> 0 special case: scroll to the 11th digit (index 10)
    wrapperStyle.value = {
      ...wrapperStyle.value,
      transform: `translateY(-11em)`
    };
    
    setTimeout(() => {
      wrapperStyle.value = {
        ...wrapperStyle.value,
        transition: 'none',
        transform: `translateY(0)`
      };
      // Force reflow
      void document.body.offsetHeight;
      wrapperStyle.value = {
        ...wrapperStyle.value,
        transition: 'transform 0.8s cubic-bezier(0, -0.6, 0.32, 1.6)'
      };
    }, 800);
  } else {
    wrapperStyle.value = {
      ...wrapperStyle.value,
      transform: `translateY(-${newVal * 1.1}em)`
    };
  }
  
  containerRotate.value = `rotate(${(Math.random() * 10 - 5).toFixed(1)}deg)`;
  prevValue.value = newVal;
});
</script>

<template>
  <div class="digit-container" :style="{ transform: containerRotate }">
    <div class="digit-wrapper" :style="wrapperStyle">
      <div v-for="(digit, index) in digits" :key="index" class="digit-item">
        {{ digit }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.digit-container {
  position: relative;
  height: 1.1em;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 0.62em;
  opacity: 0.85;
  mix-blend-mode: plus-lighter;
  margin: 0 -0.01em;
  transition: transform 0.8s cubic-bezier(0, -0.6, 0.32, 1.6);
}

.digit-wrapper {
  display: flex;
  flex-direction: column;
}

.digit-item {
  height: 1.1em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
