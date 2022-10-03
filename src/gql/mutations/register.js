import { gql } from '@apollo/client'

const registerMutation=gql`
            mutation register($username:String!,$password:String!) {
              registerMe(username: $username, password: $password) {
                isRegistered
              }
            }
`

export default registerMutation