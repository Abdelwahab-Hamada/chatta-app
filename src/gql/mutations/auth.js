import { gql } from '@apollo/client'

const auth=gql`
            mutation auth($username:String!,$password:String!) {
                tokenAuth(username: $username, password: $password) {
                  token
                  payload
                  refreshExpiresIn
              }
            }
`

export default auth