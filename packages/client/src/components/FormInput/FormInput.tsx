import { Form, FormInstance, Input } from 'antd'
import validateForms from '@/shared/utils/validateForms'
import React, { FC } from 'react'

interface IProps {
  placeholder: string
  name: string
  form?: FormInstance<any>
  value?: string
}

export const FormInput: FC<IProps> = ({ placeholder, name, form, value }) => {
  if (form) {
    const { setFieldsValue } = form as FormInstance<any>

    React.useEffect(() => {
      setFieldsValue({ [name]: value })
    }, [setFieldsValue])
  }

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
