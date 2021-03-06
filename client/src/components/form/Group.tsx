import { IFormItem } from './Form'

const Group = ({ children, className = '', ...otherProps }: IGroup) => {
    return <div className={`s-group`.concat(' ', className)} {...otherProps}>{children}</div>
}

interface IGroup extends IFormItem { }

export default Group