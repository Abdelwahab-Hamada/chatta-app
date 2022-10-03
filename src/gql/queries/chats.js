import { gql } from '@apollo/client'

const chatsQuery=gql`
                query{
                    friends {
                        id
                        username
                        status
                        chat{
                            id
                            lastMessage{
                                text
                                readTimeAgo
                                sender
                                isRead
                            }
                            unreadMessages{
                                text
                                readTimeAgo
                            }
                        }
                    }
                }
`

export default chatsQuery