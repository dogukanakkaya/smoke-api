import { gql } from '@apollo/client'

export const CREATE_COLLECTION_MUTATION = gql`
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
`

export const UPDATE_COLLECTION_MUTATION = gql`
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
`

export const DELETE_COLLECTION_MUTATION = gql`
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
`