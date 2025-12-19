import type { WeatherInfo } from '../types';

export const weatherIcons: Record<WeatherInfo['type'], string> = {
  sunny: 'sun',
  cloudy: 'cloud',
  rainy: 'cloud-rain',
  snowy: 'cloud-snow',
  storm: 'cloud-lightning'
};

export function mapWmoCode(code: number): WeatherInfo {
  if (code === 0) return { text: '晴朗', type: 'sunny' };
  if (code <= 3) return { text: '多云', type: 'cloudy' };
  if (code <= 48) return { text: '有雾', type: 'cloudy' };
  if (code <= 67) return { text: '有雨', type: 'rainy' };
  if (code <= 77) return { text: '落雪', type: 'snowy' };
  if (code <= 82) return { text: '阵雨', type: 'rainy' };
  if (code <= 86) return { text: '大雪', type: 'snowy' };
  if (code >= 95) return { text: '雷暴', type: 'storm' };
  return { text: '未知', type: 'cloudy' };
}
