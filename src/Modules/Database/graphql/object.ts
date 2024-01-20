import {  gql } from '@apollo/client';
export class QUERY_OBJECT{
  static readonly GET_ONE = gql`
  query Object($namedoc: String!, $nameobject: String!) {
    object(namedoc: $namedoc, nameobject: $nameobject) {
      uuid
      name
      label
      type
      propertys {
        name
        description
        status
        type
        value
        attribute
      }
    }
  }
  `
}