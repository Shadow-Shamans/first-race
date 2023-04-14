interface IREG {
  [key: string]: {
    pattern: RegExp
    error: string
  }
}

const REG: IREG = {
  login: {
    pattern: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
    error: 'Логин: от 3-10 символов, без пробелов, без спецсимволов',
  },
  password: {
    pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,15}$/,
    error: 'Пароль: от 5 до 15 символов, заглавная буква и цифра',
  },
  name: {
    pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
    error: `Имя: с большой буквы, без пробелов, цифр, спецсимволов`,
  },
  last_name: {
    pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
    error: `Фамилия: с большой буквы, без пробелов, цифр, спецсимволов`,
  },
  phone: {
    pattern: /^[+-d]?\d{11,12}$/,
    error: 'Телефон: от 11 до 12 символов',
  },
  email: {
    pattern: /.+@[^@]+[a-z]+\.[^@]{2,}$/,
    error: `Некорректный email`,
  },
}

export default function validateForms(
  // eslint-disable-next-line @typescript-eslint/ban-types
  getFieldValue: Function,
  name: string,
  value: string
) {
  if (!value || REG[name].pattern.test(getFieldValue(name))) {
    return Promise.resolve()
  }
  return Promise.reject(new Error(REG[name].error))
}
