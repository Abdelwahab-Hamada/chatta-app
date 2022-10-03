import { gql } from '@apollo/client'

const leavingMutation=gql`
          mutation { 
            leaveChat{ 
              isLeaved
            }
          }
`

export default leavingMutation