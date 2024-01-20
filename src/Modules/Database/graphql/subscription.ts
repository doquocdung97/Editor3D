import {  gql } from '@apollo/client';
export const SUBSCRIPTION_DATA = `
subscription Subscription {
  data
}
`;

export const SUBSCRIPTION_DOC = `
subscription Subscription($name: String!) {
  DocumentObserver(name: $name) {
    event
    name
    object {
      name
      property {
        ... on PropertyBase {
          name
          description
          status
          type
          value
        }
      }
    }
  }
}
`;

export const SUBSCRIPTION_PROPERTY_BY_OBJECT = `
subscription PropertyByObjectRealtime($namedoc: String!, $nameobject: String!, $nameproperty: String!, $time: Float!) {
  propertyByObjectRealtime(namedoc: $namedoc, nameobject: $nameobject, nameproperty: $nameproperty, time: $time)
}
`;
export const SUBSCRIPTION_PROPERTYS_BY_OBJECT = `
subscription PropertysByObjectRealtime($namedoc: String!, $nameobject: String!, $namepropertys: [String]!, $time: Float!) {
  propertysByObjectRealtime(namedoc: $namedoc, nameobject: $nameobject, namepropertys: $namepropertys, time: $time) {
    ... on PropertyBase {
      name
      description
      status
      type
      value
    }
    ... on PropertyEnum {
      name
      description
      status
      type
      value
      values
    }
  }
}
`;