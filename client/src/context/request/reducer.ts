import { Action, ActionType, IRequest } from './type'
import { IRequestContext } from './useRequest'

export const reducer = (state: IRequestContext, { type, payload }: Action) => {
    switch (type) {
        case ActionType.START_LOADING:
            return {
                ...state,
                loading: true
            }
        case ActionType.FETCH_REQUEST:
            return {
                ...state,
                loading: false
            }
        case ActionType.CREATE_REQUEST:
            return {
                ...state,
                requests: [...state.requests, payload],
                loading: false
            }
        case ActionType.UPDATE_REQUEST:
            // convert payload to IRequest type cause what is returned from update
            // is absolutely IRequest if response has no exception
            const newRequest = payload as IRequest

            const requests = [...state.requests]
            requests[requests.findIndex((request: IRequest) => request._id === newRequest._id)] = newRequest

            return {
                ...state,
                requests,
                loading: false
            }
        case ActionType.DELETE_REQUEST:
            return {
                ...state,
                requests: state.requests.filter((request: IRequest) => request._id !== (payload as IRequest)._id),
                loading: false
            }
    }
}