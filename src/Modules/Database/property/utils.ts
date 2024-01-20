export type PropertyModel = {
  __typename?: string;
  name: string;
  value: any;
  description?: string;
  type?: string;
  attribute: any
  status: number
  subRows?: PropertyModel[]
  group?: string;
  isExpanded?: boolean
  isGroup?: boolean
};