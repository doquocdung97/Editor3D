import { gql } from 'graphql-request'
export default class COMMAND {
    static LIST = gql`
    query Commands {
      commands {
        name
        title
        tooltip
        args
      }
    }
    `;
    static RUN = gql`
    mutation runCommand($name: String!, $parameters: [ObjectField], $document: String) {
      runCommand(name: $name, parameters: $parameters, document: $document) {
        code
        success
        message
        data
      }
    }    
    `;
}