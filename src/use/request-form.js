import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
export function useRequestForm(fn) {
  const { handleSubmit, isSubmitting } = useForm({
    initialValues: { status: 'active' }
  })
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const {
    value: fio,
    errorMessage: fError,
    handleBlur: fBlur
  } = useField('fio', yup.string().trim().required('Пожалуйста, введите ФИО'))

  const {
    value: phone,
    errorMessage: pError,
    handleBlur: pBlur
  } = useField(
    'phone',
    yup
      .string()
      .trim()
      .required('Пожалуйста, введите телефон')
      .matches(phoneRegExp, 'Пожалуйста, введите валидный номер телефона')
  )

  const {
    value: amount,
    errorMessage: aError,
    handleBlur: aBlur
  } = useField(
    'amount',
    yup
      .number('Пожалуйста, введите число')
      .required('Пожалуйста, введите сумму')
      .min(0, 'Сумма должна быть больше 0')
  )

  const { value: status } = useField('status')

  const onSubmit = handleSubmit(fn)

  return {
    fio,
    fError,
    fBlur,
    phone,
    pError,
    pBlur,
    amount,
    aError,
    aBlur,
    status,
    onSubmit,
    isSubmitting
  }
}
