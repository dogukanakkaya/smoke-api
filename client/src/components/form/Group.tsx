import { IGroup } from '../../types/form'

const Group = ({ children, className = '', ...otherProps }: IGroup) => {
    return <div className={`s-group ${className}`} {...otherProps}>{children}</div>
}

export default Group