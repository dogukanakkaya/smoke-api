import { gql } from '@apollo/client'

export const REQUEST_QUERY = gql`
    query Request($_id: ID!) {
        request(_id: $_id) {
            _id
            title
            url
            method
            queryParams
            headers
        }
    }
`