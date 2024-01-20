import * as icons from 'react-bootstrap-icons';
export enum TypeIcon {
  BOOTSTRAP,
  IMAGE
}
export class IconModel {
  type!: TypeIcon
  value!: keyof typeof icons
}

export type RowData  = {
  uuid: string
  name: string
  theme: string
  type?: string
  icon?: IconModel
  isOpen?: boolean
  children: ObjectBase[]
}

export interface ObjectBase extends RowData {
  commands?:any
}

export interface DocumentBase extends RowData {
  commands?:any
}