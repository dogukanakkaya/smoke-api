import { IFormItem } from "./Form"

const Label = ({ children, className = '', ...otherProps }: ILabel) => {
    return <label className={`s-label ${className}`} {...otherProps}>{children}</label>
}

interface ILabel extends IFormItem { }

export default Label