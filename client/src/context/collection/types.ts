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

export enum LoadingType {
    START_LOADING = 'START_LOADING'
}

export enum ActionType {
    FETCH_COLLECTIONS = 'FETCH_COLLECTIONS',
    FETCH_COLLECTION = 'FETCH_COLLECTION',
    CREATE_COLLECTION = 'CREATE_COLLECTION',
    UPDATE_COLLECTION = 'UPDATE_COLLECTION',
    DELETE_COLLECTION = 'DELETE_COLLECTION'
}

export type Action = { type: ActionType | LoadingType, payload?: ICollection[] | ICollection }