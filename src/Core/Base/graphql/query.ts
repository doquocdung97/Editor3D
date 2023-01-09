import { gql } from 'graphql-request'
export default class GraphqlQuery {
    static ACCOUNT = gql`
        query{
            getAccount{
                id
                name
                email
                phone
                language
                
            }
        }
    `;
}