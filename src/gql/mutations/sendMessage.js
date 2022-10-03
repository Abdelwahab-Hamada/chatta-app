import { gql } from '@apollo/client'

const messageMutation=gql`
          mutation ($recipientId:String,$text:String){ 
              sendMessage(recipientId: $recipientId, text: $text){ 
                message{
                  readTimeAgo  
                }
              }
            }
`

export default messageMutation