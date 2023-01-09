import { ElementRef,ReactNode } from "react";
export interface PropsConfig {
  show: boolean;
  onHide: any;
}
export interface StateConfig {
  ismobile: boolean;
  toggle: boolean;
  date: any;
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
  children?: ReactNode;
  show?: boolean;
  onToggle?: (status: boolean) => void;
}
export interface StateTabBase {
  show: boolean;
  toggle: any;
}
export interface PropsHeader {
  children?: ReactNode;
  title: string;
}
export interface StateHeader { }
