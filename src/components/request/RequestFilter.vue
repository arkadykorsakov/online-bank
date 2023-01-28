<template>
  <div class="filter">
    <div class="form-control">
      <input type="text" placeholder="Начните писать имя" v-model="name" />
    </div>
    <div class="form-control">
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">В процессе</option>
      </select>
    </div>
    <button class="btn warning" @click="reset" v-if="isActive">Очистить</button>
  </div>
</template>

<script>
import { watch, ref, computed } from 'vue'
export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(_, { emit }) {
    const name = ref('')
    const status = ref('')
    const isActive = computed(() => name.value || status.value)
    watch([name, status], (values) => {
      emit('update:modelValue', { name: values[0], status: values[1] })
    })
    const reset = () => {
      name.value = ''
      status.value = ''
    }
    return {
      name,
      status,
      reset,
      isActive
    }
  }
}
</script>

<style></style>
