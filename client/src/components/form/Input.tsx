import { IFormItem } from './Form'

const Input = ({ className = '', placeholder = ' ', type = 'text', ...otherProps }: IInput) => {
    return <input className={`s-input`.concat(' ', className)} type={type} placeholder={placeholder} {...otherProps} />
}

interface IInput extends IFormItem {
    type?: string
    placeholder?: string
}

export default Input