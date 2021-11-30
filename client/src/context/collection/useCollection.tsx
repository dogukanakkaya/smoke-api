import { createContext, ReactNode, useEffect, useMemo, useContext, Dispatch } from 'react'
import { useReducerWithMiddleware } from '../../hooks/useReducerWithMiddleware'
import { GraphQLMutationResult, GraphQLQueryResult, request, RestResponse } from '../../utils/request'
import { reducer } from './reducer'
import { ActionType, LoadingType, ICollection, IModifiableCollection } from './types'
import { gql, useApolloClient } from '@apollo/client'

export interface ICollectionContext {
    collections: ICollection[]
    loading: boolean
    showModal: boolean
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
            dispatch({ type: LoadingType.START_LOADING })

            const response: GraphQLQueryResult<{ collections: ICollection[] }> = await client.query({
                query: gql`
                    query {
                        collections{
                            _id
                            title
                            requests {
                                _id
                                title
                                method
                            }
                        }
                    }
                `
            })

            //const response: RestResponse<{ collections: ICollection[] }> = await request.get(`/collection`)

            dispatch({ type: ActionType.FETCH_COLLECTIONS, payload: response.data.collections })
        })()
    }, [])

    const find = async (_id: string): Promise<ICollection> => {
        dispatch({ type: LoadingType.START_LOADING })

        const response: GraphQLQueryResult<{ collection: ICollection }> = await client.query({
            query: gql`
                query Collection($_id: ID!) {
                    collection(_id: $_id) {
                        _id
                        title
                        requests {
                            _id
                            title
                            url
                            method
                            queryParams
                            headers
                        }
                    }
                }
            `,
            variables: { _id }
        })

        dispatch({ type: ActionType.FETCH_COLLECTION })

        return response.data.collection
    }

    const create = async (collection: IModifiableCollection) => {
        dispatch({ type: LoadingType.START_LOADING })

        const response: GraphQLMutationResult<{ createCollection: ICollection }> = await client.mutate({
            mutation: gql`
                mutation CreateCollection($input: CollectionInput!) {
                    createCollection(input: $input) {
                        _id
                        title
                        requests {
                            _id
                            title
                            method
                        }
                    }
                }
            `,
            variables: { input: collection }
        })

        dispatch({ type: ActionType.CREATE_COLLECTION, payload: response.data?.createCollection })
    }

    const update = async (_id: string, collection: IModifiableCollection) => {
        //dispatch({ type: LoadingType.START_LOADING })

        const response: GraphQLMutationResult<{ updateCollection: ICollection }> = await client.mutate({
            mutation: gql`
                mutation UpdateCollection($_id: ID!, $input: CollectionInput!) {
                    updateCollection(_id: $_id, input: $input) {
                        _id
                        title
                        requests {
                            _id
                            title
                            method
                        }
                    }
                }
            `,
            variables: { _id, input: collection }
        })

        dispatch({ type: ActionType.UPDATE_COLLECTION, payload: response.data?.updateCollection })
    }

    const destroy = async (_id: string) => {
        //dispatch({ type: LoadingType.START_LOADING })

        const response: GraphQLMutationResult<{ deleteCollection: ICollection }> = await client.mutate({
            mutation: gql`
                mutation DeleteCollection($_id: ID!) {
                    deleteCollection(_id: $_id) {
                        _id
                        title
                        requests {
                            _id
                            title
                            method
                        }
                    }
                }
            `,
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