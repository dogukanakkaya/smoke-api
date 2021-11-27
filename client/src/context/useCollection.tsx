import { createContext, ReactNode, useEffect, useMemo, useContext } from 'react'
import { useReducerWithMiddleware } from '../hooks/useReducerWithMiddleware'
import { Response } from '../types/api'
import { ICollection, Action, ActionType } from '../types/collection'
import { request } from '../utils/request'

interface ICollectionContext {
    collections: ICollection[]
    loading: boolean
}

const CollectionContext = createContext<ICollectionContext>({} as ICollectionContext)

const reducer = (state: ICollectionContext, { type, payload }: Action) => {
    switch (type) {
        case ActionType.FETCH_COLLECTIONS:
            return {
                ...state,
                collections: payload,
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
            const response: Response<{ collections: ICollection[] }> = await request.get(`/collection`)
            dispatch({ type: ActionType.FETCH_COLLECTIONS, payload: response.data.collections })
        })()
    }, [])

    const memoedValue = useMemo(() => state, [state])

    return <CollectionContext.Provider value={memoedValue}>{children}</CollectionContext.Provider>
}

export default function useCollection() {
    return useContext(CollectionContext)
}