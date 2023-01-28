const ERROR_CODES = {
  EMAIL_NOT_FOUND: 'Email не найден',
  INVALID_PASSWORD: 'Неправильный пароль',
  auth: 'Войдите в свой аккаунт'
}

export function error(code) {
  return ERROR_CODES[code]
    ? ERROR_CODES[code]
    : 'Ошибка сервера. Ненайденная ошибка'
}
