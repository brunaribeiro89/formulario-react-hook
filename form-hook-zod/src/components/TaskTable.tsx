import { getCoreRowModel, useReactTable, flexRender, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, PaginationState, ColumnDef, SortingState, ColumnFiltersState, VisibilityState, RowSelectionState } from "@tanstack/react-table"
import { useState } from "react"
import DATA from "../data"
import { EditableComponent } from "./EditableCell"
import StatusCell from "./StatusCell"
import DateCustomInput from "./DateCustomInput"
import Filters from "./Filters"
import React from "react"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CheckBoxCell from "./CheckBoxCell"



const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return <CheckBoxCell
        {
        ...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler()
        }}
      />
    },
    cell: ({ row }) => {
      return <CheckBoxCell
        {
        ...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler()
        }}
      />
    }
  },
  {
    accessorKey: 'task',
    header: "Task",
    size: 225,
    cell: EditableComponent,
    enableColumnFilter: true,
    enableSorting: true,
    filterFn: "includesString",
  },
  /*{
    header: "Name",
    enableSort: false,
    columns: [
      {
        accessorKey: 'firstName',
        header: "First Name",
        enableColumnFilter: true,
      },
      {
        accessorKey: 'lastName',
        header: "Last Name",
        enableColumnFilter: true,
      }
    ],
  },*/
  {
    accessorFn: (row: { firstName: any; lastName: any }) => `${row.firstName} ${row.lastName}`,
    header: "Nome",
    enableColumnFilter: true,
    enableSorting: true,

  },

  {
    accessorKey: "status",
    header: "Status",
    cell: StatusCell,
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: (row: any, columnId: any, filterStatuses: any) => {
      if (filterStatuses.length === 0) return true;
      const status = row.getValue(columnId);
      return filterStatuses.includes(status?.id);
    },
  },
  {
    accessorKey: 'due',
    header: "Data",
    enableSorting: true,
    cell: DateCustomInput
  },
  {
    accessorKey: 'notes',
    header: "Notas",
    enableSorting: false,
    size: 225,
    cell: EditableComponent
  }

]

interface TaskTableComponent {
  canNextPage: boolean,
  canPrevPage: boolean,
  totalPages: number,
  pageNumber: number
}



export const TaskTableComponent = () => {
  // Search params
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = searchParams?.get("page") ?? "1"
  const pageAsNumber = Number(page)
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
  const per_page = searchParams?.get("per_page") ?? "10"
  const perPageAsNumber = Number(per_page)
  const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  // Table states
  const [data, setData] = useState(DATA)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: fallbackPage - 1,
      pageSize: fallbackPerPage,
    })


  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )
  React.useEffect(() => {
    setPagination({
      pageIndex: fallbackPage - 1,
      pageSize: fallbackPerPage,
    })
  }, [fallbackPage, fallbackPerPage])

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting: sorting,
      rowSelection,
      pagination


    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    columnResizeMode: "onChange",
    enableColumnResizing: true,
    enableRowSelection: true,
    meta: {
      updateData: (rowIndex: number, columId: any, value: any) => setData(
        prev => prev.map(
          (row, index) =>
            index === rowIndex ? {
              ...prev[rowIndex],
              [columId]: value,
            } : row
        )
      )
    }
  });
  console.log(table.getSelectedRowModel().flatRows)
  return (
    <div>
      <Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />

      <table width={`w-${table.getTotalSize()}`} className="border-none text-md text-left font-ligth">
        {/*mapeamento dos grupos de cabeçalho*/}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (

            <tr className="border-2 border-[#4b4e50bd]" key={headerGroup.id}>
              {headerGroup.headers.map((header) =>
              (

                <th colSpan={header.colSpan} onClick={header.column.getToggleSortingHandler()} className={`w-${header.getSize()} relative  text-sm align-middle font-bold text-center text-gray-700 uppercase bg-[#dce2e9bd] border border-[#4b4e50bd] h-12 px-4`} key={header.id}>

                  <div className="flex items-center justify-between">

                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "desc" ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#25250dec]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>

                    ) : null}
                    {header.column.getIsSorted() === "asc" ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#25250dec]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>

                    ) : null}
                  </div>


                  {header.column.getCanResize() ? (<div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`${header.column.getIsResizing() ? "bg-[#021629] opacity-100" : ""} 
absolute top-0 right-0 opacity-0 hover:opacity-100 h-full w-[3px] bg-[#425fdf] cursor-col-resize rounded-md touch-none select-none
                `}></div>) : null}

                </th>
              ))}
            </tr >


          ))}
        </thead>
        <tbody >
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="bg-[#d2e4f5ec] border border-neutral-700 transition-colors ">
              {row.getVisibleCells().map((cell) => (
                <td width={`w-${cell.column.getSize()}`} className={`p-2.5 border-none  bg-transparent`} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>


          ))}
        </tbody>
      </table >
      <div className="flex items-center justify-center space-x-2 py-4">
        <p className="my-2">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() - 1}
        </p>
        <div>
          <button
            className="p-1 border-2 rounded-md"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            First Page
          </button>
          <button
            className="p-1 border-2 rounded-md"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="p-1 border-2 rounded-md"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="p-1 border-2 rounded-md"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            Last Page
          </button>
        </div>
      </div>

    </div>

  )
}