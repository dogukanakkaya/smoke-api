import { Action, ActionType, LoadingType } from './types'
import { ICollectionContext } from './useCollection'

export const reducer = (state: ICollectionContext, { type, payload }: Action) => {
    switch (type) {
        case LoadingType.START_LOADING:
            return {
                ...state,
                loading: true
            }
        case ActionType.FETCH_COLLECTIONS:
            return {
                ...state,
                collections: payload,
                loading: false
            }
        case ActionType.CREATE_COLLECTION:
            return {
                ...state,
                collections: [...state.collections, payload],
                loading: false
            }
    }
}