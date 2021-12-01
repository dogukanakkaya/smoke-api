import { ReactNode } from "react"

const Grid = ({ className = '', cols, children }: IGrid) => {
    return <div className={`grid grid-cols-${cols}`.concat(' ', className)}>{children}</div>
}

const Col = ({ className = '', col = "1", children }: ICol) => {
    return <div className={`col-span-${col}`.concat(' ', className)}>{children}</div>
}

interface IGrid {
    className?: string
    cols: string
    children: ReactNode
}

interface ICol {
    className?: string
    col?: string
    children: ReactNode
}

export {
    Grid,
    Col
}