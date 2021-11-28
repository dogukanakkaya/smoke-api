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
        case ActionType.CREATE_COLLECTION:
            return {
                ...state,
                collections: [...state.collections, payload],
                loading: false
            }
        case ActionType.UPDATE_COLLECTION:
            // convert payload to ICollection type cause what is returned from update
            // is absolutely ICollection if no error returned
            const newCollection = payload as ICollection
            state.collections[state.collections.findIndex((collection: ICollection) => collection._id === newCollection._id)] = newCollection

            return {
                ...state,
                collections: state.collections,
                loading: false
            }
    }
}