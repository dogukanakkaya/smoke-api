export interface ICollection {
    _id: string
    title: string
    createdAt: Date // Date
}

export enum LoadingType {
    START_LOADING = 'START_LOADING',
    END_LOADING = 'END_LOADING'
}

export enum ActionType {
    FETCH_COLLECTIONS = 'FETCH_COLLECTIONS',
    CREATE_COLLECTION = 'CREATE_COLLECTION'
}

export type Action = { type: ActionType | LoadingType, payload?: ICollection[] | ICollection }