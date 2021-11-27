import { ILabel } from '../../types/form'

const Label = ({ children, className = '', ...otherProps }: ILabel) => {
    return <label className={`s-label ${className}`} {...otherProps}>{children}</label>
}

export default Label