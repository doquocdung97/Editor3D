import "./Base"
import { GraphqlHelper } from '@core/Base/graphql';
import CORE from "./query";

type Config = {
  property: string[]
  object: string[]
  document: string[]
}
export class Core {
  private static instance: Core;
  private _graphql: GraphqlHelper|null  = null;
  private _config:Config|null  = null;
  constructor() {
    const instance = Core.instance;
    if (instance) {
      return instance;
    }
    this._graphql = new GraphqlHelper()
    Core.instance = this;
  }
  async load() {
    if (this._config) {
      return this._config
    }
    let result = await this._graphql?.query(CORE.CONFIG).then((data: any) => {
      return data?.config
    })
    if (result) {
      this._config = result
    }
    return this._config
  }
  async getConfig(){
    await this.load()
    return this._config
  }
}