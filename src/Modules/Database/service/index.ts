import { EventDispatcher } from '@core/common/EventDispatcher';
import { GraphqlHelper } from 'src/Core/Base/graphql';
import { QUERY_DOCUMENT } from '../graphql/document';
import { ObjectBase ,DocumentBase} from './interface';
import {_Command,Command} from 'src/Core/command';
import { QUERY_OBJECT } from '../graphql/object';
import { QUERY_PROPERTY } from '../graphql/property';

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

  async getAll(){
    if(this._name){
      const res: any = await this._graphql.query(QUERY_DOCUMENT.GET, {
        name:this._name,
      })
      if (res) {
        return res.document
      }
    }
    return null
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
        const result = data?.documentObserver
        if (result){
          console.log(result)
          this.dispatchEvent({ type: 'onUsync', data: result });
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

  async onSelection(row:ObjectBase) {
    if(this._current_data != row && row){
      var result = []
      if (row.theme == "document") {
        result = await this._graphql.query(QUERY_DOCUMENT.PROPERTY, {
          "name": this._name
        }).then((data: any) => data?.document?.propertys)
      } else if (row.theme == "parameter") {
        result = await this._graphql.query(QUERY_DOCUMENT.PARAMETER, {
          "name": this._name,
        }).then((data: any) => data?.document?.parameters)
      } else if (row.theme == "object" || row.theme == "media") {
        result = await this._graphql.query(QUERY_OBJECT.GET_ONE, {
          "namedoc": this._name,
          "nameobject": row.name,
          "mode":row.theme.toUpperCase()
        }).then((data: any) => data?.object?.propertys)
      }
      this._current_data = row
      this.dispatchEvent({ type: 'onSelection', data: result });
    }
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
  
  async createParameter(type, name) {
    if (!this._name)
      return
    const result = await this._graphql.query(QUERY_PROPERTY.CREATE_PARAMETER, {
      "doc": this._name,
      "input": {
        "type": type,
        "name": name
      }
    }).then((data: any) => data?.createParameter)
    if(result.success){
      this.dispatchEvent({ type: 'createParameter', data: result.data });
    }
    return result
  }

  getSelection(){
    return this._current_data
  }

  async updateProperty(row:any){
    const data_new = row.original
    if(this._current_data && row){
      const theme = this._current_data.theme
      var variables:any = {
        "namedoc": this._name,
        "nameobject": null,
        "nameproperty": data_new.name,
        "value": row.original_value,
        "parameter":false,
        "mode": theme.toUpperCase()
      }
      
      if (theme == "parameter") {
        variables.parameter = true
      } else if (theme == "object" || theme == "media") {
        variables.nameobject = this._current_data.name
        
      }
      const result: any = await this._graphql.query(QUERY_PROPERTY.UPDATE, variables)
                                              .then((data: any) => data?.updateProperty)
      if(result.success){
        this.dispatchEvent({ type: 'updateProperty', data: result.data });
      }
      return result
    }
    return null
  }
}
const service = new Service()
export default service