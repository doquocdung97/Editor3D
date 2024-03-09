import {  gql } from '@apollo/client';
export class QUERY_PROPERTY{
  static readonly UPDATE = gql`
  mutation UpdateProperty($namedoc: String!, $nameproperty: String!, $value: ObjectField!, $nameobject: String, $parameter: Boolean, $mode: ObjectModeEnum!) {
    updateProperty(namedoc: $namedoc, nameproperty: $nameproperty, value: $value, nameobject: $nameobject, parameter: $parameter, mode: $mode) {
      code
      success
      message
    }
  }
  `
  static readonly CREATE_PARAMETER = gql`
  mutation CreateParameter($doc: String!, $input: InputProperty!) {
    createParameter(doc: $doc, input: $input) {
      success
      code
      data {
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