import { IFormItem } from './Form'

const Select = ({ className = '', placeholder = ' ', options, ...otherProps }: ISelect) => {
    console.log();

    return (
        <select className={`s-input`.concat(' ', className)} placeholder={placeholder} {...otherProps}>
            {
                [...options.entries()].map(([key, value]) => <option key={key} value={key}>{value}</option>)
            }
        </select>
    )
}

interface ISelect extends IFormItem {
    options: Map<string | number, string>,
    placeholder?: string
}

export default Select