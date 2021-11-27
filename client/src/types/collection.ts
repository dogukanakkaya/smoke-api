export interface ICollection {
    _id: string
    title: string
    createdAt: Date // Date
}

export enum ActionType {
    FETCH_COLLECTIONS = 'FETCH_COLLECTIONS',
    CREATE_COLLECTION = 'CREATE_COLLECTION'
}

export type Action = { type: ActionType, payload: ICollection[] | ICollection }