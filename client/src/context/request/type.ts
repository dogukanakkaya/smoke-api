export interface IRequest {
    _id: string
    title: string
    url: string
    method: string
    queryParams: Map<string, string>
    headers: Map<string, string>
    createdAt: Date // Date
}

interface IModifiableRequest {
    queryParams?: Map<string, string>
    headers?: Map<string, string>
}

export interface ICreateableRequest extends IModifiableRequest {
    title: string
    url: string
    method: string
}

export interface IUpdateableRequest extends IModifiableRequest {
    title?: string
    url?: string
    method?: string
}

export enum ActionType {
    START_LOADING = 'START_LOADING',
    FETCH_REQUESTS = 'FETCH_REQUESTS',
    FETCH_REQUEST = 'FETCH_REQUEST',
    CREATE_REQUEST = 'CREATE_REQUEST',
    UPDATE_REQUEST = 'UPDATE_REQUEST',
    DELETE_REQUEST = 'DELETE_REQUEST'
}

export type Action = { type: ActionType, payload?: IRequest }