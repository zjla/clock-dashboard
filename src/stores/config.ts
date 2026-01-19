import type { HAConfig } from '../types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { normalizeLocale } from '../i18n'

const defaultLanguage = normalizeLocale(typeof navigator !== 'undefined' ? navigator.language : undefined)

export const useConfigStore = defineStore('config', () => {
  const showDrawer = ref(false)
  const activeTab = ref<'general' | 'clock' | 'weather' | 'calendar' | 'smart'>('general')
  const language = ref(defaultLanguage)

  const haConfig = ref<HAConfig>({
    url: '',
    token: '',
    entities: [],
  })

  const clockConfig = ref({
    /** 时钟颜色 */
    color: '#ffffff',
    /** 字重 */
    fontWeight: 700,
    /** 数字随机倾斜 */
    enableTilt: true,
    /** 显示秒钟 */
    showSeconds: false,
    /** 透明度 */
    opacity: 0.9,
    /** 24小时制 */
    is24Hour: true,
  })

  const calendarConfig = ref({
    /** 一周的开始：0 为周日，1 为周一 */
    weekStartDay: 0,
    /** 显示法定节假日 */
    showHolidays: true,
  })

  return {
    haConfig,
    clockConfig,
    calendarConfig,
    showDrawer,
    activeTab,
    language,
  }
}, {
  persist: {
    omit: ['showDrawer', 'activeTab'],
  },
})
