import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { useVirtual } from "react-virtual";
import "./index.css";

export type TableTSProps = {
  data: { [key: string]: unknown }[];
  columns: ColumnDef<{ [key: string]: unknown }>;
  height?: number;
};
const TableTS = (props: TableTSProps) => {
  const [data] = React.useState(props.data);

  // @ts-ignore
  const table = useReactTable({
    data: data as any,
    columns: props.columns as any,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 100,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <div
      ref={tableContainerRef}
      className="container"
      style={{
        height: props.height ? props.height + "px" : undefined,
      }}
    >
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          onClick: () => {
                            // console.log("click");
                          },
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
          {virtualRows.map((virtualRow) => {
            // @ts-ignore
            const row = rows[virtualRow.index] as Row<Person>;
            const children = row.original.children;

            return (
              <React.Fragment key={row.id}>
                <tr>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
                {row.getIsExpanded() && children ? (
                  <tr>
                    <td colSpan={row.getVisibleCells().length}>{children}</td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: paddingBottom + `px` }} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableTS;
