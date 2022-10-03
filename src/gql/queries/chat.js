import { gql } from '@apollo/client'

const chatQuery=gql`
                query ($recipientId:String){
                    chat(recipientId:$recipientId){
                        id
                        unreadMessages{
                            id
                            text
                            readTimeAgo
                            sender
                        }                        
                    }
                }
`

export default chatQuery