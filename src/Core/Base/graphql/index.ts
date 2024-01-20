import { request, gql, GraphQLClient } from 'graphql-request'
import { SubscriptionClient } from "graphql-subscriptions-client";
import GraphqlQuery from './query'
import {Config} from '../../../Constants'
class GraphqlHelper {
	settings: any = {}
	private _client: GraphQLClient
	// _client_subscription:SubscriptionClient
	constructor() {
		this.settings = {
			ENDPOINT: `http://127.0.0.1:8001/graphql/`,
			ENDPOINT_WS: `ws://127.0.0.1:8001/graphql/`,
			Token: ""
		}
		this._client = new GraphQLClient(this.settings.ENDPOINT);
		
	}
	getHeaders() {
		return {
			Authorization: this.settings['Token']
		}
	}
	async query(query: any, variables: any = {}) {
		try {
			const q = await this._client.request(query, variables).then()
			return q
		} catch (error) {
			console.error(`error ${error}\n query: ${query}\n variables: ${variables}`)
		}
	}
	subscription(query: any, variables: any = {},callback){
		const client = new SubscriptionClient(this.settings.ENDPOINT_WS, {
			reconnect: true,
			lazy: true, // only connect when there is a query
			connectionCallback: (error) => {
				error && console.error(error);
			},
		});
		client.request({ query,variables }).subscribe({
      next({ data }:any) {
        if (data && callback){
          callback(data)
        }
      },
    });
		return client
	}
}
export { GraphqlQuery, GraphqlHelper }