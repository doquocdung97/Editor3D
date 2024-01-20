import { gql } from 'graphql-request'
export default class CORE {
    static CONFIG = gql`
    query Config {
      config {
        property
        object
        document
      }
    }
    `;
}