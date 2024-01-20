import { GraphqlHelper } from '@core/Base/graphql';
import COMMAND from './query';
export class Command {
  name: string = String()
  title: string = String()
  tooltip: string = String()
  args: string[] = []
  children: Command[] = []
}
export class _Command {
  private static instance: _Command;
  private _commands: object | null = null
  private _graphql: GraphqlHelper | null = null;
  constructor() {
    const instance = _Command.instance;
    if (instance) {
      return instance;
    }
    this._graphql = new GraphqlHelper()
    _Command.instance = this;
  }
  async load() {
    if (this._commands) {
      return this._commands
    }
    let result = await this._graphql?.query(COMMAND.LIST).then((data: any) => {
      return data?.commands
    })
    if (result && result.length > 0) {
      this._commands = {}
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        this._commands[element.name] = element
      }
      return this._commands
    }
    return null
  }
  async get(): Promise<object | null>
  async get(name: string): Promise<Command | null>
  async get(name: string = String()): Promise<Command | object | null> {
    const commands = await this.load()
    if (name && commands) {
      let command = commands[name]
      if (command) {
        return command
      }
      return null
    }
    return commands
  }
  async run(variables: any) {
    return this._graphql?.query(COMMAND.RUN, variables).then((data: any) => {
      return data?.runCommand
    })
  }
  async default(){
    let list = ["DeleteObject"]
  }
}