import { createContext, ReactNode, useEffect, useMemo, useContext, Dispatch } from 'react'
import { useReducerWithMiddleware } from '../../hooks/useReducerWithMiddleware'
import { GraphQLResponse, request, RestResponse } from '../../utils/request'
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

            const response: GraphQLResponse<{ collections: ICollection[] }> = await client.query({
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

        const response: GraphQLResponse<{ collection: ICollection }> = await client.query({
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

        const response: RestResponse<{ collection: ICollection }> = await request.post('/collection', collection)

        dispatch({ type: ActionType.CREATE_COLLECTION, payload: response.data.collection })
    }

    const update = async (_id: string, collection: IModifiableCollection) => {
        //dispatch({ type: LoadingType.START_LOADING })

        const response: RestResponse<{ collection: ICollection }> = await request.put(`/collection/${_id}`, collection)

        dispatch({ type: ActionType.UPDATE_COLLECTION, payload: response.data.collection })
    }

    const destroy = async (_id: string, collection: IModifiableCollection) => {
        //dispatch({ type: LoadingType.START_LOADING })

        const response: RestResponse<{ collection: ICollection }> = await request.delete(`/collection/${_id}`)

        dispatch({ type: ActionType.DELETE_COLLECTION, payload: response.data.collection })
    }

    const memoedValue = useMemo(() => ({ ...state, find, create, update, destroy }), [state])

    return <CollectionContext.Provider value={memoedValue}>{children}</CollectionContext.Provider>
}

export default function useCollection() {
    return useContext(CollectionContext)
}