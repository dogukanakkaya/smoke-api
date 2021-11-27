import { createContext, ReactNode, useEffect, useMemo, useContext, Dispatch } from 'react'
import { useReducerWithMiddleware } from '../../hooks/useReducerWithMiddleware'
import { request, Response } from '../../utils/request'
import { reducer } from './reducer'
import { ActionType, LoadingType, ICollection, IModifiableCollection } from './types'

export interface ICollectionContext {
    collections: ICollection[]
    loading: boolean
    showModal: boolean
    create: (collection: IModifiableCollection, cb: Function) => void
}

const CollectionContext = createContext<ICollectionContext>({} as ICollectionContext)

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

    const create = async (collection: IModifiableCollection, cb: Function) => {
        dispatch({ type: LoadingType.START_LOADING })

        const response: Response<{ collection: ICollection }> = await request.post('/collection', collection)
        cb()

        dispatch({ type: ActionType.CREATE_COLLECTION, payload: response.data.collection })
    }

    const memoedValue = useMemo(() => ({ ...state, create }), [state])

    return <CollectionContext.Provider value={memoedValue}>{children}</CollectionContext.Provider>
}

export default function useCollection() {
    return useContext(CollectionContext)
}