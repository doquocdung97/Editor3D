import { request, gql, GraphQLClient } from 'graphql-request'
import GraphqlQuery from './query'

class GraphqlHelper {
    settings: any = {}
    client: any
    constructor() {
        this.settings = {
            EndPoint: "",
            Token: ""
        }
        this.client = new GraphQLClient(this.settings['EndPoint'], { headers: this.getHeaders() })
    }
    getHeaders() {
        return {
            Authorization: this.settings['Token']
        }
    }
    async fefch(query: string, variables: any = {}) {
        return await this.client.request(query, variables).then((data: any) => {
            return data;
        })
    }
}
export { GraphqlQuery, GraphqlHelper }