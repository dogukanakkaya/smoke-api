import { IInput } from '../../types/form'

const Input = ({ className = '', placeholder = ' ', type = 'text', ...otherProps }: IInput) => {
    return <input className={`s-input ${className}`} type={type} placeholder={placeholder} {...otherProps} />
}

export default Input