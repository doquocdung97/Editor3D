import Editor from "@monaco-editor/react";
import React, { useState, Component, useRef } from "react";
import { ViewBase } from "Gui/Layout/View/index";
import LayoutService from "Gui/Layout/service";
import SidebarService from "Gui/Sidebar/service";
import { Dropdown, Button } from "react-bootstrap";
import { Icon } from "Gui/Icon";
import "./style.scss";
import source from "!!raw-loader!./library.d.ts";
import BrowserData from "Core/Base/BrowserData";
export class EditorCode extends ViewBase {
  editorRef: any;
  codedefualt:string = String();
  browserData = new BrowserData();
  constructor(props: any) {
    super(props);
    this.codedefualt = this.browserData.get(this.constructor.name);
  }
  handleEditorWillMount(monaco: any) {
    var libUri = "file:///model.js";
    try {
      monaco.languages.typescript.javascriptDefaults.addExtraLib(
        source,
        libUri
      );
      monaco.editor.createModel(source, "typescript", monaco.Uri.parse(libUri));
    } catch (error) {}
    //console.log(source);
  }
  handleEditorDidMount(editor: any, monaco: any) {
    this.editorRef = editor;
  }
  onExcute() {
    try {
      let val = this.editorRef?.getValue();
      this.browserData.set(this.constructor.name, val);
      eval(val);
    } catch (error) {
      console.log(error);
    }
  }
  onVisibility(status: boolean) {
    console.log("status: ", status);
  }
  render() {
    return (
      <>
        <div className="editor-code">
          <div>
            <Button onClick={this.onExcute.bind(this)}>
              <Icon iconName="Play" />
            </Button>
          </div>
          <Editor
            beforeMount={this.handleEditorWillMount.bind(this)}
            onMount={this.handleEditorDidMount.bind(this)}
            defaultLanguage="typescript"
            defaultValue={this.codedefualt}
          />
        </div>
      </>
    );
  }
}
LayoutService.addLayout("EditorCode", EditorCode);

// import { TabBase as Tab, Icon, Button } from "Gui/Sidebar/Child";
import { WorkbenchBase, TabBase } from "Gui/Sidebar";

class TabChild extends TabBase {
  Title = "File View";
  render() {
    return (
      <>
        <TabBase.Base.Header title={this.Title}>
          <TabBase.Button>
            <TabBase.Icon iconName="ArrowClockwise" />
          </TabBase.Button>
          <TabBase.Button>
            <TabBase.Icon iconName="Gear" />
          </TabBase.Button>
          <TabBase.Button>
            <TabBase.Icon iconName="Bank" />
          </TabBase.Button>
        </TabBase.Base.Header>
        <TabBase.Base.Body>
          <h1>sdfdsf 3</h1>
        </TabBase.Base.Body>
      </>
    );
  }
}
class TabChild1 extends TabBase {
  Title = "File View1";
  render() {
    return (
      <>
        <TabBase.Base.Header title={this.Title}>
          <TabBase.Button>
            <TabBase.Icon iconName="ArrowClockwise" />
          </TabBase.Button>
          <TabBase.Button>
            <TabBase.Icon iconName="Gear" />
          </TabBase.Button>
          <TabBase.Button>
            <TabBase.Icon iconName="Bank" />
          </TabBase.Button>
        </TabBase.Base.Header>
        <TabBase.Base.Body>
          <h1>sdfdsf 3</h1>
        </TabBase.Base.Body>
      </>
    );
  }
}
class EditorTab extends WorkbenchBase {
  Children = [TabChild, TabChild1];
  Title = "Macro";
  Name = "Macro";
  Icon = "CodeSlash";
  constructor(parent: any) {
    super(parent);
  }
  IsActive() {
    return true;
  }
  Activated() {}
}
SidebarService.addTab("EditorCode", EditorTab);
