import { createContext, ReactNode, useEffect, useMemo, useContext, Dispatch } from 'react'
import { useReducerWithMiddleware } from '../../hooks/useReducerWithMiddleware'
import { request, Response } from '../../utils/request'
import { reducer } from './reducer'
import { ActionType, LoadingType, ICollection, IModifiableCollection } from './types'

export interface ICollectionContext {
    collections: ICollection[]
    loading: boolean
    showModal: boolean
    create: (collection: IModifiableCollection) => void
    update: (_id: string, collection: IModifiableCollection) => void
    destroy: (_id: string) => void
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

    const create = async (collection: IModifiableCollection) => {
        dispatch({ type: LoadingType.START_LOADING })

        const response: Response<{ collection: ICollection }> = await request.post('/collection', collection)

        dispatch({ type: ActionType.CREATE_COLLECTION, payload: response.data.collection })
    }

    const update = async (_id: string, collection: IModifiableCollection) => {
        //dispatch({ type: LoadingType.START_LOADING })

        const response: Response<{ collection: ICollection }> = await request.put(`/collection/${_id}`, collection)

        dispatch({ type: ActionType.UPDATE_COLLECTION, payload: response.data.collection })
    }

    const destroy = async (_id: string, collection: IModifiableCollection) => {
        //dispatch({ type: LoadingType.START_LOADING })

        const response: Response<{ collection: ICollection }> = await request.delete(`/collection/${_id}`)

        dispatch({ type: ActionType.DELETE_COLLECTION, payload: response.data.collection })
    }

    const memoedValue = useMemo(() => ({ ...state, create, update, destroy }), [state])

    return <CollectionContext.Provider value={memoedValue}>{children}</CollectionContext.Provider>
}

export default function useCollection() {
    return useContext(CollectionContext)
}