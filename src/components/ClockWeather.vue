<script setup lang="ts">
import Digit from './Digit.vue';
import Weather from './Weather.vue';
import { useTime } from '../composables/useTime';

const { h1, h2, m1, m2, s1, s2, lunar, now, showSeconds } = useTime();

function toggleSeconds() {
  showSeconds.value = !showSeconds.value;
}
</script>

<template>
  <div class="glass-panel p-8 md:p-14 flex flex-col items-center text-white w-full">
    <!-- 日期与农历 -->
    <div class="flex flex-col md:flex-row items-center gap-6 mb-10 w-full justify-center">
      <div class="flex items-center gap-4">
        <div class="date-day-big text-glow">{{ now.getDate() }}</div>
        <div class="flex flex-col">
          <span class="text-3xl tracking-[0.2em] opacity-90 uppercase">
            {{ now.toLocaleDateString('zh-CN', { weekday: 'long' }) }}
          </span>
          <span class="text-2xl tracking-[0.2em] font-light opacity-70">
            {{ now.getFullYear() }}年{{ now.getMonth() + 1 }}月
          </span>
        </div>
      </div>
      <div class="hidden md:block w-px h-12 bg-white/10 mx-4"></div>
      <div class="flex flex-col items-center md:items-start">
        <span class="text-3xl font-medium text-white/90 tracking-wider">{{ lunar.fullDate }}</span>
        <span class="text-2xl tracking-[0.2em] font-light opacity-70">农历 {{ lunar.year }}</span>
      </div>
    </div>

    <!-- 时钟显示 -->
    <div 
      class="clock-display text-glow tabular-nums mb-12 cursor-pointer transition-all duration-500" 
      :class="{ 'with-seconds': showSeconds }"
      @click="toggleSeconds"
    >
      <Digit :value="h1" />
      <Digit :value="h2" />
      <div class="clock-separator">:</div>
      <Digit :value="m1" />
      <Digit :value="m2" />
      <div v-if="showSeconds" class="seconds-container flex items-center">
        <div class="clock-separator">:</div>
        <Digit :value="s1" />
        <Digit :value="s2" />
      </div>
    </div>

    <!-- 天气展示 -->
    <Weather />
  </div>
</template>

<style scoped>
.glass-panel {
  max-width: 1000px;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
}

.date-day-big {
  font-size: clamp(4rem, 8vw, 8rem);
  line-height: 1;
  font-weight: 800;
  background: linear-gradient(to bottom, #ffffff, #666666);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.clock-display {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(7rem, 25vw, 18rem);
  font-weight: 1000;
  letter-spacing: -0.02em;
  line-height: 1;
}

.clock-display.with-seconds {
  font-size: clamp(4rem, 15vw, 10rem);
}

.clock-separator {
  opacity: 0.6;
  margin: 0 0.05em;
  font-weight: 700;
}

.seconds-container {
  opacity: 0.6;
}
</style>
