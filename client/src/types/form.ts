import { ReactNode } from "react";

export interface IFormItem {
    className?: string
    children?: ReactNode
    [key: string]: unknown
}

export interface IForm extends IFormItem { }

export interface IInput extends IFormItem {
    type?: string
    placeholder?: string
}

export interface ILabel extends IFormItem { }

export interface IGroup extends IFormItem { }