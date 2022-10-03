import { gql } from '@apollo/client'

const offlineMeMutation=gql`
          mutation offline {
            offlineMe {
              isOffline
            }
          }
`

export default offlineMeMutation