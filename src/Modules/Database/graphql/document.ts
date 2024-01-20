import {  gql } from '@apollo/client';
export class QUERY_DOCUMENT{
  static readonly TREE_OPJECT = gql`
  query Query($namedoc: String!, $nameobject: String) {
    documentTree(namedoc: $namedoc, nameobject: $nameobject)
  }
  `

  static readonly PROPERTY = gql`
  query Document($name: String!) {
    document(name: $name) {
      name
      label
      type
      uuid
      version
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
  
  static readonly PARAMETER = gql`
  query Document($name: String!) {
    document(name: $name) {
      parameters {
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
  static readonly SUBSCRIPTION = `
  subscription Subscription($name: String!) {
    documentObserver(name: $name) {
      name
      event
      object {
        name
        property {
          name
          description
          status
          type
          value
          attribute
        }
        uuid
      }
      property {
        name
        description
        status
        type
        value
        attribute
      }
      parameter {
        name
        description
        status
        type
        value
        attribute
      }
    }
  }
  `;
}