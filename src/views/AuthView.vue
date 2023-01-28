<template>
  <app-message />
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>
    <div :class="['form-control', { invalid: eError }]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="eBlur" />
      <small v-if="eError">{{ eError }}</small>
    </div>
    <div :class="['form-control', { invalid: pError }]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="pBlur" />
      <small v-if="pError">{{ pError }}</small>
    </div>
    <button
      type="submit"
      class="btn primary"
      :disabled="isSubmitting || isTooManyAttempts"
    >
      Войти
    </button>
    <div class="text-danger" v-if="isTooManyAttempts">
      Вы слишком часто пытаетесь войти в систему. Попробуйте позже
    </div>
  </form>
</template>

<script>
import { useLoginForm } from '@/use/login-form'
import AppMessage from '@/components/ui/AppMessage.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { error } from '@/utils/error'
export default {
  components: { AppMessage },
  setup() {
    const store = useStore()
    const route = useRoute()

    if (route.query.message) {
      store.dispatch('setMessage', {
        type: 'warning',
        value: error(route.query.message)
      })
    }

    return {
      ...useLoginForm()
    }
  }
}
</script>

<style></style>
