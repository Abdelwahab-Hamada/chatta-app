import { gql } from '@apollo/client'

const logoutMutation=gql`
            mutation {
              logoutMe{
                isLoggedout
              }
              deleteTokenCookie{
                deleted
              }
              deleteRefreshTokenCookie{
                deleted
              }
            }
`

export default logoutMutation