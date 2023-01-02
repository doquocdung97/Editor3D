import Editor from "@monaco-editor/react";
import React, { useState, Component, useRef } from "react";
import { ViewBase } from "../../Gui/Layout/View/index";
import LayoutService from "../../Gui/Layout/service";
import SidebarService from "../../Gui/Sidebar/service";
export class EditorCode extends ViewBase {
  editorRef: any;
  codedefualt;
  constructor(props: any) {
    super(props);
    this.codedefualt = `
      //some comment
      let a = new Vector()
      console.log(a.Length)
    `;
  }
  handleEditorWillMount(monaco: any) {
    var libSource = `
    class Vector {
      private _x: number = 0;
      private _y: number = 0;
      private _z: number = 0;
      /**
     * @type {*} - can be 'any' type
     */
      constructor(x: number = 0, y: number = 0, z: number = 0)
      /**
       * Returns the next fact
       */
      get Length(): number
    }
`;
    var libUri = "ts:filename/facts.d.ts";
    try {
      monaco.languages.typescript.javascriptDefaults.addExtraLib(
        libSource,
        libUri
      );
      monaco.editor.createModel(
        libSource,
        "typescript",
        monaco.Uri.parse(libUri)
      );
    } catch (error) {}
  }
  handleEditorDidMount(editor: any, monaco: any) {
    this.editorRef = editor;
  }
  // showValue() {
  //   eval(editorRef?.getValue());
  // }
  onVisibility(status: boolean) {
    console.log("status: ", status);
  }
  render() {
    return (
      <>
        <Editor
          beforeMount={this.handleEditorWillMount.bind(this)}
          onMount={this.handleEditorDidMount.bind(this)}
          defaultLanguage="typescript"
          defaultValue={this.codedefualt}
        />
      </>
    );
  }
}
LayoutService.addLayout("EditorCode", EditorCode);
class EditorTab {}
SidebarService.addTab("EditorCode", EditorTab);
