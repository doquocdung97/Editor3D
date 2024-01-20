import { ReactNode, useEffect, useState } from "react";
import { ComponetValueCell } from "./common";

export default class DefaultCell extends ComponetValueCell{
  view(): ReactNode {
    if (this.value instanceof Object){
      return (<p>{JSON.stringify(this.value)}</p>)
    }
    return <p>{this.value}</p>;
  }
}