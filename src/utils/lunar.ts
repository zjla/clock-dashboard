import type { LunarInfo } from '../types';

function getTraditionalLunarDay(dayStr: string): string {
  const dayNum = parseInt(dayStr.replace(/[^0-9]/g, ''));
  const lunarDays = ["", "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];
  return lunarDays[dayNum] || dayStr;
}

export function getLunarDate(date: Date): LunarInfo {
  try {
    const options: Intl.DateTimeFormatOptions = { 
      // @ts-ignore: calendar is a valid option in some environments
      calendar: 'chinese', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    };
    const formatter = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', options);
    
    let month = '', dayValue = '', yearValue = '';
    
    // @ts-ignore
    if (formatter.formatToParts) {
      const parts = formatter.formatToParts(date);
      parts.forEach(p => {
        if (p.type === 'month') month = p.value;
        if (p.type === 'day') dayValue = p.value;
        // @ts-ignore
        if (p.type === 'year' || p.type === 'relatedYear') yearValue = p.value;
      });
    } else {
      const dateString = formatter.format(date);
      const yearMatch = dateString.match(/(\d+)年/);
      yearValue = yearMatch ? yearMatch[1] : '';
      month = dateString.split('年')[1]?.substring(0, 2) || '';
      dayValue = dateString.match(/[\u4e00-\u9fa5]+$/)?.[0] || '';
    }

    let ly = parseInt(yearValue.replace(/[^0-9]/g, ''));
    if (isNaN(ly)) {
      ly = date.getFullYear();
    }

    const stems = "甲乙丙丁戊己庚辛壬癸";
    const branches = "子丑寅卯辰巳午未申酉戌亥";
    
    let stemIndex, branchIndex;
    if (ly > 3000) {
      stemIndex = (ly - 1) % 10;
      branchIndex = (ly - 1) % 12;
    } else {
      stemIndex = (ly - 4) % 10;
      branchIndex = (ly - 4) % 12;
    }
    
    stemIndex = (stemIndex + 10) % 10;
    branchIndex = (branchIndex + 12) % 12;

    const stem = stems[stemIndex];
    const branch = branches[branchIndex];
    const traditionalDay = getTraditionalLunarDay(dayValue);

    return {
      fullDate: `${month}${traditionalDay}`,
      date: traditionalDay === '初一' ? month : traditionalDay,
      year: `${stem}${branch}年`
    };
  } catch (e) { 
    console.error("Lunar date error:", e);
    return { fullDate: "加载失败", date: "加载失败", year: "--年" }; 
  }
}
