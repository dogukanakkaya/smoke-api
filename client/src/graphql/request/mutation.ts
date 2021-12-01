import { gql } from '@apollo/client'

export const CREATE_REQUEST_MUTATION = gql`
    mutation CreateRequest($input: CreateRequestInput!) {
        createRequest(input: $input) {
            _id
            title
            method
            queryParams
            headers
        }
    }
`

export const UPDATE_REQUEST_MUTATION = gql`
    mutation UpdateRequest($_id: ID!, $input: UpdateRequestInput!) {
        updateRequest(_id: $_id, input: $input) {
            _id
            title
            method
            queryParams
            headers
        }
    }
`

export const DELETE_REQUEST_MUTATION = gql`
    mutation DeleteRequest($_id: ID!) {
        deleteRequest(_id: $_id) {
            _id
            title
        }
    }
`