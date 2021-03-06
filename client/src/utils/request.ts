import { ApolloQueryResult, FetchResult } from '@apollo/client';
import axios from 'axios'
import { AxiosResponse } from "axios";
import { API_URL } from './config'

axios.defaults.withCredentials = true

export const request = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    validateStatus: function (status: any) {
        return status >= 200 && status <= 450;
    }
})
export interface RestResponse<T, D = any> extends AxiosResponse<{ status: number } & T, D> {

}

export interface GraphQLQueryResult<T> extends ApolloQueryResult<{ status: number } & T> {

}

export interface GraphQLMutationResult<T> extends FetchResult<{ status: number } & T> {

}

export enum LoadingType {
    START_LOADING = 'START_LOADING'
}