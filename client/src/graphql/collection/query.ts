import { gql } from '@apollo/client'

export const COLLECTIONS_QUERY = gql`
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

export const COLLECTION_QUERY = gql`
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
`