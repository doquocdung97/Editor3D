import { GraphqlHelper,GraphqlQuery } from "../graphql"
class _Account{
    graphql = new GraphqlHelper()
    data:any
    constructor(){
        this.get()
    }
    async get(){
        if(!this.data){
            this.data = await this.graphql.fefch(GraphqlQuery.ACCOUNT)
            return this.data
        }else{
            return this.data
        }
    }
    async update(){
        this.data = await this.graphql.fefch(GraphqlQuery.ACCOUNT)
        return this.data
    }
}
const Account = new _Account()
window['Account'] = Account
export default Account