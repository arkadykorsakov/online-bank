<template>
  <span :class="['badge', className]">{{ text }}</span>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  props: {
    type: {
      type: String,
      requred: true,
      validator(value) {
        return ['done', 'cancelled', 'active', 'pending'].includes(value)
      }
    }
  },
  setup(props) {
    const textMap = {
      done: 'Завершен',
      cancelled: 'Отменен',
      active: 'Активен',
      pending: 'В процессе'
    }

    const classesMap = {
      done: 'primary',
      cancelled: 'danger',
      active: 'primary',
      pending: 'warning'
    }

    const className = ref(classesMap[props.type])
    const text = ref(textMap[props.type])

    watch(props, (val) => {
      className.value = classesMap[props.type]
      text.value = textMap[props.type]
    })

    return {
      className,
      text
    }
  }
}
</script>

<style></style>
