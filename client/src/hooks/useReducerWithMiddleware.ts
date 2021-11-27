import { useReducer, Reducer, ReducerState, ReducerAction, Dispatch } from 'react'

// TODO: improve this later to run start and end middlewares that will set loading to true and false
export function useReducerWithMiddleware<R extends Reducer<any, any>>(
    reducer: Reducer<ReducerState<R>, ReducerAction<R>>,
    initialState: ReducerState<R>,
    middlewares?: [(state: ReducerState<R>, action: ReducerAction<R>) => void]
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
    const [state, dispatch] = useReducer(reducer, initialState)

    const dispatchWithMiddleware = (action: ReducerAction<R>) => {
        middlewares?.forEach((middleware) => middleware(state, action))
        dispatch(action)
    }

    return [state, dispatchWithMiddleware]
}
