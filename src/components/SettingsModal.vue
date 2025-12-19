<script setup lang="ts">
import { ref, watch } from 'vue';
import { X, PlusCircle, Trash2, ChevronUp, ChevronDown } from 'lucide-vue-next';
import type { HAConfig, HAEntity } from '../types';

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(['close', 'saved']);

const config = ref<HAConfig>(JSON.parse(localStorage.getItem('ha_config') || '{"url":"","token":"","entities":[]}'));

function addEntity() {
  config.value.entities.push({ id: '', name: '' });
}

function removeEntity(index: number) {
  config.value.entities.splice(index, 1);
}

function moveEntity(index: number, direction: number) {
  const newIndex = index + direction;
  if (newIndex >= 0 && newIndex < config.value.entities.length) {
    const temp = config.value.entities[index];
    config.value.entities[index] = config.value.entities[newIndex];
    config.value.entities[newIndex] = temp;
  }
}

function save() {
  localStorage.setItem('ha_config', JSON.stringify(config.value));
  emit('saved');
  emit('close');
}
</script>

<template>
  <div v-if="show" id="settings-modal" class="fixed inset-0 flex items-center justify-center p-4 md:p-6 z-[1000]">
    <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="emit('close')"></div>
    <div class="bg-white/10 backdrop-blur-3xl p-6 md:p-8 rounded-[40px] border border-white/10 w-full max-w-lg text-white max-h-[90vh] flex flex-col relative">
      <div class="flex items-center justify-between mb-6 flex-shrink-0">
        <h3 class="text-2xl font-bold">Home Assistant 配置</h3>
        <button @click="emit('close')" class="opacity-50 hover:opacity-100 p-2">
          <X class="w-6 h-6" />
        </button>
      </div>
      
      <div class="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
        <div>
          <label class="block text-sm opacity-50 mb-2 uppercase tracking-widest">HA 地址</label>
          <input 
            v-model="config.url" 
            type="text" 
            placeholder="http://192.168.1.xxx:8123"
            class="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-white/30"
          >
        </div>
        <div>
          <label class="block text-sm opacity-50 mb-2 uppercase tracking-widest">长期访问令牌</label>
          <input 
            v-model="config.token" 
            type="password" 
            placeholder="输入令牌"
            class="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-white/30"
          >
        </div>
        
        <div class="space-y-4">
          <label class="block text-sm opacity-50 uppercase tracking-widest">设备列表</label>
          <div class="space-y-3">
            <div v-for="(entity, index) in config.entities" :key="index" class="flex gap-2">
              <div class="flex flex-col gap-1">
                <button @click="moveEntity(index, -1)" class="p-1 opacity-30 hover:opacity-100 transition-opacity">
                  <ChevronUp class="w-4 h-4" />
                </button>
                <button @click="moveEntity(index, 1)" class="p-1 opacity-30 hover:opacity-100 transition-opacity">
                  <ChevronDown class="w-4 h-4" />
                </button>
              </div>
              <input 
                v-model="entity.id" 
                type="text" 
                class="flex-1 bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2 outline-none focus:border-white/30" 
                placeholder="实体 ID"
              >
              <input 
                v-model="entity.name" 
                type="text" 
                class="w-24 md:w-32 bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2 outline-none focus:border-white/30" 
                placeholder="备注名"
              >
              <button @click="removeEntity(index)" class="p-2 text-red-400 hover:bg-red-400/10 rounded-lg">
                <Trash2 class="w-5 h-5" />
              </button>
            </div>
          </div>
          <button @click="addEntity" class="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-all mt-2 bg-white/5 px-4 py-2 rounded-xl">
            <PlusCircle class="w-5 h-5" />
            添加设备
          </button>
        </div>
      </div>

      <div class="pt-6 mt-2 border-t border-white/10 flex-shrink-0">
        <button @click="save" class="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-opacity-90 transition-all shadow-xl">
          保存并应用
        </button>
      </div>
    </div>
  </div>
</template>
