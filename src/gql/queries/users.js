import { gql } from '@apollo/client'

const usersQuery=gql`
                query {
                    others{
                        id
                        username
                        
                    }
                }
`

export default usersQuery