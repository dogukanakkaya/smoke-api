import { IFormItem } from './Form'

const Button = ({ type = 'button', className = '', children, ...otherProps }: IButton) => {
    return (
        <button type={type} className={`s-btn`.concat(' ', className)} {...otherProps}>{children}</button>
    )
}

interface IButton extends IFormItem {
    type?: 'submit' | 'reset' | 'button'
}

export default Button