import {  gql } from '@apollo/client';
export class QUERY_OBJECT{
  static readonly GET_ONE = gql`
  query Object($namedoc: String!, $nameobject: String!, $mode: ObjectModeEnum!) {
    object(namedoc: $namedoc, nameobject: $nameobject, mode: $mode) {
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
  static readonly GET_OBJECT_CHILDREN = gql`
  query ObjectChildren($namedoc: String!, $nameobject: String!) {
    objectChildren(namedoc: $namedoc, nameobject: $nameobject) {
      propertys {
        name
        description
        status
        type
        value
        attribute
      }
      uuid
      name
      label
      type
    }
  }
  `
}