import { gql } from '@apollo/client'

const onlineMeMutation=gql`
          mutation online {
            onlineMe {
              isOnline
            }
          }
`

export default onlineMeMutation