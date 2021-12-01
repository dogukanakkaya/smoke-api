export enum HTTPMethod {
    DELETE = 'DELETE',
    GET = 'GET',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
    TRACE = 'TRACE'
}

export interface ICollection {
    _id: string
    title: string
    requests: IRequest[]
    createdAt: Date // Date
}

export interface IRequest {
    _id: string
    title: string
    url: string
    method: string
    queryParams: Map<string, string>
    headers: Map<string, string>
    createdAt: Date // Date
}

export interface IModifiableCollection {
    title: string
}

export enum ActionType {
    START_LOADING = 'START_LOADING',
    FETCH_COLLECTIONS = 'FETCH_COLLECTIONS',
    FETCH_COLLECTION = 'FETCH_COLLECTION',
    CREATE_COLLECTION = 'CREATE_COLLECTION',
    UPDATE_COLLECTION = 'UPDATE_COLLECTION',
    DELETE_COLLECTION = 'DELETE_COLLECTION'
}

export type Action = { type: ActionType, payload?: ICollection[] | ICollection }