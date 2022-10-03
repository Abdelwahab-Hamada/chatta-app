import { gql } from '@apollo/client'

export const chatSubscription=gql`
            subscription ($chatId:String){
                subscribeChat(chatId:$chatId){
                    message{
                        id
                        text
                        sender
                        readTimeAgo
                        isRead
                        chat{
                            id
                        }
                    }
                }
            }
`