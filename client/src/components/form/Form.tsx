import Input from './Input'
import Label from './Label'
import Group from './Group'
import { ReactNode } from 'react'

const Form = ({ children, ...otherProps }: IForm) => {
    return (
        <form {...otherProps}>{children}</form>
    )
}

interface IFormItem {
    children: ReactNode
    [key: string]: unknown
}

interface IForm extends IFormItem { }

Form.Group = Group
Form.Input = Input
Form.Label = Label

export default Form