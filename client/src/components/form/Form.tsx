import Input from './Input'
import Label from './Label'
import Group from './Group'
import { ReactNode } from 'react'
import Button from './Button'

const Form = ({ children, ...otherProps }: IForm) => {
    return (
        <form {...otherProps}>{children}</form>
    )
}
export interface IFormItem {
    className?: string
    children?: ReactNode
    [key: string]: unknown
}

interface IForm extends IFormItem { }

Form.Group = Group
Form.Input = Input
Form.Label = Label
Form.Button = Button

export default Form