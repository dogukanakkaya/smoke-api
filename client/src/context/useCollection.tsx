import { createContext, ReactNode, useEffect, useMemo, useContext, Dispatch } from 'react'
import { useReducerWithMiddleware } from '../hooks/useReducerWithMiddleware'
import { Response } from '../types/api'
import { ICollection, Action, ActionType, LoadingType } from '../types/collection'
import { request } from '../utils/request'

interface ICollectionContext {
    collections: ICollection[]
    loading: boolean
    dispatch: Dispatch<Action>
}

const CollectionContext = createContext<ICollectionContext>({} as ICollectionContext)

const reducer = (state: ICollectionContext, { type, payload }: Action) => {
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

export const CollectionProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducerWithMiddleware(reducer, {
        collections: [],
        loading: false
    })

    useEffect(() => {
        (async () => {
            dispatch({ type: LoadingType.START_LOADING })

            const response: Response<{ collections: ICollection[] }> = await request.get(`/collection`)

            dispatch({ type: ActionType.FETCH_COLLECTIONS, payload: response.data.collections })
        })()
    }, [])

    const memoedValue = useMemo(() => ({ ...state, dispatch }), [state])

    return <CollectionContext.Provider value={memoedValue}>{children}</CollectionContext.Provider>
}

export default function useCollection() {
    return useContext(CollectionContext)
}