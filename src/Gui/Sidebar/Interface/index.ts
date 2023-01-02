import { ElementRef } from "react";
export interface PropsConfig {
  show: boolean;
  onHide: any;
}
export interface StateItemChildConfig {
  component: any;
  show?: boolean;
  hidden?: boolean;
}

export interface StateItemConfig {
  icon: string;
  title: string;
  active: boolean;
  children: StateItemChildConfig[];
}
export interface StateConfig {
  ismobile: boolean;
  toggle: boolean;
  item: StateItemConfig[];
}
export interface ResizeConfig {
  tracking: boolean;
  startWidth: number;
  startCursorScreenX: number;
  handleWidth: number;
  resizeTarget: any;
  parentElement: any;
  maxWidth: number;
  minReSizeWidth: number;
  maxReSizeWidth: number;
  width: number;
  widthmobile: number;
}
export interface PropsTabBase {
  children?: ElementRef<any>;
  show?: boolean;
  onToggle?: (status: boolean) => {};
}
export interface StateTabBase {
  show: boolean;
  toggle: any;
}
export interface PropsHeader {
  children?: ElementRef<any>;
  title: string;
}
export interface StateHeader {}
