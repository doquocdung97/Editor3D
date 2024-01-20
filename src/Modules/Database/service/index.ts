import { EventDispatcher } from '@core/common/EventDispatcher';
import { GraphqlHelper } from 'src/Core/Base/graphql';
import { QUERY_DOCUMENT } from '../graphql/document';
import { ObjectBase ,DocumentBase} from './interface';
import {_Command,Command} from 'src/Core/command';

class Service extends EventDispatcher {
  private _rowdata: DocumentBase | null= null 
  private _current_data: ObjectBase | null = null
  private _name:string = String()
  private _graphql: GraphqlHelper
  private _command:_Command
  private _common_command:Command[] = []
  private _subscription:any = null
  constructor() {
    super()
    this._graphql = new GraphqlHelper()
    this._command = new _Command()
    let data = ["DeleteObject"]
    data.forEach(async n=>{
      const cmd = await this._command.get(n)
      if(cmd){
        this._common_command.push(cmd)
      }
    })
  }
  reset(){
    this._rowdata = null
    this._current_data = null
  }
  get(type:string = String()){
    if(type && this._rowdata && this._rowdata.children.length > 0){
      return this._rowdata.children.find(x=>x.theme == type)
    }
    return this._rowdata
  }
  getName(){
    return this._name
  }
  async load(name: string = String()) {
    if((name && name != this._name) || !this._subscription){
      if(this._subscription){
        this._subscription.close()
      }
      this._subscription = this._graphql.subscription(QUERY_DOCUMENT.SUBSCRIPTION,{  
        "name": name,
      },(data)=>{
        if (data){
          console.log(data)
        }
      })
    }
    if(name){
      this._name = name
    }
    if(this._name){
      this.reset()
      const res: any = await this.reload(this._name)
      if (res) {
        this._rowdata = res
        this.dispatchEvent({ type: 'load', data: this._rowdata });
      }
    }
    
    return null
  }
  async reload(namedoc: string, nameobject :string | null = null) {
    if(this._name){
      const res: any = await this._graphql.query(QUERY_DOCUMENT.TREE_OPJECT, {
        namedoc,
        nameobject: nameobject
      })
      if (res) {
        return res.documentTree
      }
    }
    return null
  }
  onSelection(data: ObjectBase) {
    this._current_data = data
    this.dispatchEvent({ type: 'onSelection', data: data });
  }
  dispatchEvent(event: any): void {
    if(event){
      event.doc = this._name
    }
    super.dispatchEvent(event)
  }
  isNull(): boolean {
    return false
  }
  insert(data: ObjectBase,parent: ObjectBase|null = null) {
    if(parent){
      if(parent.children && parent.children.length > 0){
        parent.children.push(data)
      }else{
        parent.children = [data]
      }
    
    }
    this.dispatchEvent({ type: 'insert', data ,parent});
    this.update()
  }
  update() {
    this.dispatchEvent({ type: 'update', data: this._rowdata});
  }
  delete(id: string) {

  }
  async get_command_by_object(name:string){
    const data = this._rowdata
    const cmds:Command[] = []
    if(name && data && data.commands){
      const cmd_child = data.commands[name]
      let commands:any[] = []
      if(cmd_child){
        for (let index = 0; index < cmd_child.length; index++) {
          const cmd = cmd_child[index];
          const command = await this._command.get(cmd)
          if(command){
            commands.push(command)
          }
          
        }
        const obj = new Command()
        obj.title = "Insert"
        obj.children = commands
        cmds.push(obj)
      }
      
    }
    cmds.push(...this._common_command)
    return cmds
  }
  
}
const service = new Service()
export default service