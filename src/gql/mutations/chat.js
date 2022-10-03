import { gql } from '@apollo/client'

const chatMutation=gql`
          mutation ($recipientId:String){ 
            joinChat(recipientId:$recipientId){ 
              isJoined
            }
          }
`

export default chatMutation