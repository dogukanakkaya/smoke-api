import { createContext, ReactNode, useEffect, useMemo, useContext, Dispatch } from 'react'
import { useReducerWithMiddleware } from '../../hooks/useReducerWithMiddleware'
import { GraphQLMutationResult, GraphQLQueryResult } from '../../utils/request'
import { reducer } from './reducer'
import { ActionType, ICollection, IModifiableCollection } from './type'
import { useApolloClient } from '@apollo/client'
import { COLLECTION_QUERY, COLLECTIONS_QUERY } from '../../graphql/collection/query'
import { CREATE_COLLECTION_MUTATION, UPDATE_COLLECTION_MUTATION, DELETE_COLLECTION_MUTATION } from '../../graphql/collection/mutation'

export interface ICollectionContext {
    collections: ICollection[]
    loading: boolean
    find: (_id: string) => Promise<ICollection>
    create: (collection: IModifiableCollection) => void
    update: (_id: string, collection: IModifiableCollection) => void
    destroy: (_id: string) => void
}

const CollectionContext = createContext<ICollectionContext>({} as ICollectionContext)

export const CollectionProvider = ({ children }: { children: ReactNode }) => {
    const client = useApolloClient()
    const [state, dispatch] = useReducerWithMiddleware(reducer, {
        collections: [],
        loading: false
    })

    useEffect(() => {
        (async () => {
            dispatch({ type: ActionType.START_LOADING })

            const response: GraphQLQueryResult<{ collections: ICollection[] }> = await client.query({
                query: COLLECTIONS_QUERY
            })

            dispatch({ type: ActionType.FETCH_COLLECTIONS, payload: response.data.collections })
        })()
    }, [])

    const find = async (_id: string): Promise<ICollection> => {
        dispatch({ type: ActionType.START_LOADING })

        const response: GraphQLQueryResult<{ collection: ICollection }> = await client.query({
            query: COLLECTION_QUERY,
            variables: { _id }
        })

        dispatch({ type: ActionType.FETCH_COLLECTION })

        return response.data.collection
    }

    const create = async (collection: IModifiableCollection) => {
        dispatch({ type: ActionType.START_LOADING })

        const response: GraphQLMutationResult<{ createCollection: ICollection }> = await client.mutate({
            mutation: CREATE_COLLECTION_MUTATION,
            variables: { input: collection }
        })

        dispatch({ type: ActionType.CREATE_COLLECTION, payload: response.data?.createCollection })
    }

    const update = async (_id: string, collection: IModifiableCollection) => {
        const response: GraphQLMutationResult<{ updateCollection: ICollection }> = await client.mutate({
            mutation: UPDATE_COLLECTION_MUTATION,
            variables: { _id, input: collection }
        })

        dispatch({ type: ActionType.UPDATE_COLLECTION, payload: response.data?.updateCollection })
    }

    const destroy = async (_id: string) => {
        const response: GraphQLMutationResult<{ deleteCollection: ICollection }> = await client.mutate({
            mutation: DELETE_COLLECTION_MUTATION,
            variables: { _id }
        })

        dispatch({ type: ActionType.DELETE_COLLECTION, payload: response.data?.deleteCollection })
    }

    const memoedValue = useMemo(() => ({ ...state, find, create, update, destroy }), [state])

    return <CollectionContext.Provider value={memoedValue}>{children}</CollectionContext.Provider>
}

export default function useCollection() {
    return useContext(CollectionContext)
}