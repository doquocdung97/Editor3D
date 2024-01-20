import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { Modal, Button } from 'react-bootstrap';
import "./style.scss"

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  ExpandedState, VisibilityState,
  getExpandedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { Icon } from "@components/Icon";
import DefaultCell from "./cell/default";
import { ValueCellData } from "./cell";
import { PropertyModel } from "./utils";
import EditCode from "@components/EditCode";
import { GraphqlHelper } from "@core/Base/graphql";
import { QUERY_OBJECT } from "../graphql/object";
import { QUERY_DOCUMENT } from "../graphql/document";
import { QUERY_PROPERTY } from "../graphql/property";
const _graphql = new GraphqlHelper()
const ValueCell = (props: any) => {
  const { getValue, row, column, table } = props
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
    // console.log(initialValue, row.index)
  }, [initialValue, tableMeta.editedRows]);
  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value);
  };
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };
  const setEditedRows = (status: boolean) => {
    // const elName = e.currentTarget.name;
    // for(let key in tableMeta.editedRows){
    //   tableMeta?.revertData(key, true);
    // }
    tableMeta?.setEditedRows((old: []) => ({
      // ...old,
      [row.id]: true,
    }));
  };
  const revertData = () => {
    tableMeta?.revertData(row.id, true);
    tableMeta?.setEditedRows((old: []) => ({}));
    setValue(initialValue)
  };
  var TypeCell = ValueCellData[row.original.type]
  if (!TypeCell) {
    TypeCell = DefaultCell
  }
  return <TypeCell {...props} />;
};
const TableCellExpand = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  let status = row.getCanExpand()
  return (
    <>
      <div
        className="expand"
        style={{
          // Since rows are flattened by default,
          // we can use the row.depth property
          // and paddingLeft to visually indicate the depth
          // of the row
          marginLeft: `${row.depth * 10}px`,
        }}>
        {row.getCanExpand() ? (
          <button
            {...{
              onClick: row.getToggleExpandedHandler()
            }}
          >
            {row.getIsExpanded() ? (<Icon iconName="ChevronDown"></Icon>) : (<Icon iconName="ChevronRight"></Icon>)}
          </button>
        ) : (<button className="not-expand"></button>)}{' '}
        <label>{getValue()}</label>
      </div>
    </>
  );
};
const EditCell = ({ row, table }: any) => {
  const meta = table.options.meta;
  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }
  };
  return (
    <div className="edit-cell-container">
      {meta?.editedRows[row.id] ? (
        <div className="edit-cell">
          <button onClick={setEditedRows} name="cancel">
            X
          </button>
          <button onClick={setEditedRows} name="done">
            ✔
          </button>
        </div>
      ) : (
        <button onClick={setEditedRows} name="edit">
          ✐
        </button>
      )}
    </div>
  );
};
const columnHelper = createColumnHelper<PropertyModel>();
const columns = [
  columnHelper.accessor("name", {
    cell: TableCellExpand,
    header: "Name",
    enableResizing: true,
    enableHiding: false,
    meta: {

    },
    size: 200,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("value", {
    header: "Value",
    cell: ValueCell,
    meta: {
    },
  }),
  // columnHelper.accessor("type", {
  //   header: "Type",
  //   cell: props => <DefaultCell {...props} />,
  //   meta: {
  //   },
  // }),
  // columnHelper.accessor("description", {
  //   header: "Description",
  //   cell: props => <DefaultCell {...props} />,
  //   meta: {
  //   },
  // })
  // columnHelper.display({
  //   header: "tools",
  //   cell: EditCell
  // }),
];
export const Property = (props: any) => {
  const { nameDocument, nameObject, theme, updateRow ,onEndChangeRow} = props
  // const defaultData = convertData(resultdata)
  const [data, setData] = useState<PropertyModel[]>([]);
  const [date, setDate] = useState(new Date());
  // const [originalData, setOriginalData] = useState(() => [...defaultData]);
  const [editedRows, setEditedRows] = useState({});
  const getExpanded = (data: PropertyModel[]) => {
    const result: any = {}
    for (let index = 0; index < data.length; index++) {
      result[index] = true
    }
    return result
  }
  const [expanded, setExpanded] = React.useState<ExpandedState>(getExpanded(data))
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    GenderIdentity: false,
  })
  const fetch_data = async () => {
    let result: any = null
    if (theme == "document") {
      result = await _graphql.query(QUERY_DOCUMENT.PROPERTY, {
        "name": nameDocument
      }).then((data: any) => data?.document?.propertys)
    } else if (theme == "parameter") {
      result = await _graphql.query(QUERY_DOCUMENT.PARAMETER, {
        "name": nameDocument,
      }).then((data: any) => data?.document?.parameters)
    } else if (theme == "object") {
      result = await _graphql.query(QUERY_OBJECT.GET_ONE, {
        "namedoc": nameDocument,
        "nameobject": nameObject
      }).then((data: any) => data?.object?.propertys)
    }
    if(!result){
      result = []
    }
    setData(result)
    return result
  };
  useEffect(() => {
    setEditedRows({})
    fetch_data()
  }, [nameObject]);
  // const [statusShow, setStatusShow] = useState(true);
  const table = useReactTable({
    data,
    columns,
    enableExpanding: true,
    autoResetExpanded: true,
    // manualExpanding :true,
    state: {
      expanded,
      columnVisibility,
    },
    initialState: {
      // expanded: { '2': true, '1': true }
    },
    onExpandedChange: setExpanded,
    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      onChangeRow: (row: any) => {
        setDate(new Date())
        if(updateRow){
          updateRow(row.original)
        }
        
      },
      onEndChangeRow: async (row: any) => {
        if (row) {
          const data_new = row.original
          var variables = {
            "namedoc": nameDocument,
            "nameobject": null,
            "nameproperty": data_new.name,
            "value": row.original_value,
            "parameter":false
          }
          if (theme == "parameter") {
            variables.parameter = true
          } else if (theme == "object") {
            variables.nameobject = nameObject
          }
          const res: any = await _graphql.query(QUERY_PROPERTY.UPDATE, variables)
          const result = res?.updateProperty
          if (!result || !result.success) {
            row.original.value = row._valuesCache.value
            setDate(new Date())
          }
        }


        if(onEndChangeRow){
          const status = await onEndChangeRow(row)
          if(status){
            setDate(new Date())
          }
        }
      },

    },
  });
  return (
    <>
      <div className="view-property">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}
                    style={{
                      width:
                        header.getSize() !== 150 ? header.getSize() : undefined,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              row.original.isGroup ?
                <tr key={row.id} style={{ background: "#eee" }}>
                  <td colSpan={columns.length}>
                    {flexRender(row.getVisibleCells()[0].column.columnDef.cell, row.getVisibleCells()[0].getContext())}
                  </td>
                </tr>
                :
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Property