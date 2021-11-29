import { Action, ActionType, ICollection, LoadingType } from './types'
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
        case ActionType.FETCH_COLLECTION:
            return {
                ...state,
                loading: false
            }
        case ActionType.CREATE_COLLECTION:
            return {
                ...state,
                collections: [...state.collections, payload],
                loading: false
            }
        case ActionType.UPDATE_COLLECTION:
            // convert payload to ICollection type cause what is returned from update
            // is absolutely ICollection if response has no exception
            const newCollection = payload as ICollection

            const collections = [...state.collections]
            collections[collections.findIndex((collection: ICollection) => collection._id === newCollection._id)] = newCollection

            return {
                ...state,
                collections: collections,
                loading: false
            }
        case ActionType.DELETE_COLLECTION:
            return {
                ...state,
                collections: state.collections.filter((collection: ICollection) => collection._id !== (payload as ICollection)._id),
                loading: false
            }
    }
}