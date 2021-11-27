export interface ICollection {
    _id: string
    title: string
    createdAt: Date // Date
}

export enum ActionType {
    FETCH_COLLECTIONS = 'FETCH_COLLECTIONS'
}

export type Action = { type: ActionType, payload: ICollection[] }