import { createContext, ReactNode, useMemo, useContext } from 'react'
import { useReducerWithMiddleware } from '../../hooks/useReducerWithMiddleware'
import { GraphQLMutationResult, GraphQLQueryResult } from '../../utils/request'
import { reducer } from './reducer'
import { ActionType, IRequest, ICreateableRequest, IUpdateableRequest } from './type'
import { useApolloClient } from '@apollo/client'
import { REQUEST_QUERY } from '../../graphql/request/query'
import { CREATE_REQUEST_MUTATION, UPDATE_REQUEST_MUTATION, DELETE_REQUEST_MUTATION } from '../../graphql/request/mutation'

export interface IRequestContext {
    requests: IRequest[]
    loading: boolean
    find: (_id: string) => Promise<IRequest>
    create: (request: ICreateableRequest) => void
    update: (_id: string, request: IUpdateableRequest) => void
    destroy: (_id: string) => void
}

const RequestContext = createContext<IRequestContext>({} as IRequestContext)

export const RequestProvider = ({ children }: { children: ReactNode }) => {
    const client = useApolloClient()
    const [state, dispatch] = useReducerWithMiddleware(reducer, {
        requests: [],
        loading: false
    })

    const find = async (_id: string): Promise<IRequest> => {
        dispatch({ type: ActionType.START_LOADING })

        const response: GraphQLQueryResult<{ request: IRequest }> = await client.query({
            query: REQUEST_QUERY,
            variables: { _id }
        })

        dispatch({ type: ActionType.FETCH_REQUEST })

        return response.data.request
    }

    const create = async (request: ICreateableRequest) => {
        dispatch({ type: ActionType.START_LOADING })

        const response: GraphQLMutationResult<{ createRequest: IRequest }> = await client.mutate({
            mutation: CREATE_REQUEST_MUTATION,
            variables: { input: request }
        })

        dispatch({ type: ActionType.CREATE_REQUEST, payload: response.data?.createRequest })
    }

    const update = async (_id: string, request: IUpdateableRequest) => {
        const response: GraphQLMutationResult<{ updateRequest: IRequest }> = await client.mutate({
            mutation: UPDATE_REQUEST_MUTATION,
            variables: { _id, input: request }
        })

        dispatch({ type: ActionType.UPDATE_REQUEST, payload: response.data?.updateRequest })
    }

    const destroy = async (_id: string) => {
        const response: GraphQLMutationResult<{ deleteRequest: IRequest }> = await client.mutate({
            mutation: DELETE_REQUEST_MUTATION,
            variables: { _id }
        })

        dispatch({ type: ActionType.DELETE_REQUEST, payload: response.data?.deleteRequest })
    }

    const memoedValue = useMemo(() => ({ ...state, find, create, update, destroy }), [state])

    return <RequestContext.Provider value={memoedValue}>{children}</RequestContext.Provider>
}

export default function useRequest() {
    return useContext(RequestContext)
}