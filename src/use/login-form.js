import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useLoginForm() {
  const { handleSubmit, isSubmitting, submitCount } = useForm()
  const store = useStore()
  const router = useRouter()

  const MIN_LENGTH = 6

  const {
    value: email,
    errorMessage: eError,
    handleBlur: eBlur
  } = useField(
    'email',
    yup
      .string()
      .trim()
      .required('Пожалуйста, введите email')
      .email('Пожалуйста, введите корректный email')
  )

  const {
    value: password,
    errorMessage: pError,
    handleBlur: pBlur
  } = useField(
    'password',
    yup
      .string()
      .trim()
      .required('Пожалуйста, введите пароль')
      .min(MIN_LENGTH, `Длина пароля мининмум ${MIN_LENGTH} символов`)
  )

  const onSubmit = handleSubmit(async (values) => {
    try {
      await store.dispatch('auth/login', values)
      router.push('/')
    } catch (e) {}
  })

  const isTooManyAttempts = computed(() => submitCount.value >= 3)

  watch(isTooManyAttempts, (val) => {
    if (val) {
      setTimeout(() => (submitCount.value = 0), 1500)
    }
  })

  return {
    email,
    password,
    eError,
    pError,
    eBlur,
    pBlur,
    onSubmit,
    isSubmitting,
    isTooManyAttempts
  }
}
