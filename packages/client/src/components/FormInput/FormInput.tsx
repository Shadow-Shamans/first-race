import { Form, Input } from 'antd'
import validateForms from '@/shared/utils/validateForms'
import { FC } from 'react'

interface IProps {
  placeholder: string
  name: string
}

export const FormInput: FC<IProps> = ({ placeholder, name }) => {
  return (
    <Form.Item
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
      {name === 'password' ? (
        <Input.Password placeholder={placeholder} />
      ) : (
        <Input placeholder={placeholder} />
      )}
    </Form.Item>
  )
}
