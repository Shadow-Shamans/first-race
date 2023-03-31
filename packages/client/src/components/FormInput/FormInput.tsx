import { Form, Input } from 'antd'
import validateForms from '@/shared/utils/validateForms'

interface IFormInputProps {
  label: string
  name: string
}

export function FormInput({ label, name }: IFormInputProps) {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: true,
          message: 'Поле не может быть пустым!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            return validateForms(getFieldValue, name, value)
          },
        }),
      ]}>
      {name === 'password' ? <Input.Password /> : <Input />}
    </Form.Item>
  )
}
