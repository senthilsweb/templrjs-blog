'use client'

import { Loader, Trash2, MoreHorizontal } from 'lucide-react'
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, ChevronUp, ChevronsUpDown, Settings2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import type { Metric } from "@/lib/db/schema"
import { MetricForm } from "./metric-form"
import { toast } from "sonner"
import { addMetric, updateMetric } from "@/app/actions"
import { useState } from 'react';

const SortButton = ({ column, children }: { column: any, children: React.ReactNode }) => {
  return (
    <Button
      variant="ghost"
      className="p-0 hover:bg-transparent"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      {column.getIsSorted() === "asc" ? (
        <ChevronUp className="ml-1 h-4 w-4" />
      ) : column.getIsSorted() === "desc" ? (
        <ChevronDown className="ml-1 h-4 w-4" />
      ) : (
        <ChevronsUpDown className="ml-1 h-4 w-4 opacity-50" />
      )}
    </Button>
  )
}

const columns: ColumnDef<Metric>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <SortButton column={column}>ID</SortButton>,
    size: 60,
  },
  {
    accessorKey: "datasourceDescription",
    header: ({ column }) => <SortButton column={column}>Description</SortButton>,
  },
  {
    accessorKey: "noOfFilesOrTables",
    header: ({ column }) => <SortButton column={column}>Files/Tables</SortButton>,
    size: 100,
  },
  {
    accessorKey: "fileType",
    header: ({ column }) => <SortButton column={column}>File Type</SortButton>,
    cell: ({ row }) => {
      return (
        <Badge variant="secondary" className="font-medium">
          {row.getValue("fileType")}
        </Badge>
      )
    },
    size: 100,
  },
  {
    accessorKey: "dataSourceType",
    header: ({ column }) => <SortButton column={column}>Source Type</SortButton>,
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className="font-medium">
          {row.getValue("dataSourceType")}
        </Badge>
      )
    },
    size: 120,
  },
  {
    accessorKey: "totalSourceDataSizeInKb",
    header: ({ column }) => <SortButton column={column}>Size (KB)</SortButton>,
    size: 100,
  },
  {
    accessorKey: "noOfColumnsInFileOrTable",
    header: ({ column }) => <SortButton column={column}>Columns</SortButton>,
    size: 80,
  },
  {
    accessorKey: "rowCountPerResource",
    header: ({ column }) => <SortButton column={column}>Rows/Resource</SortButton>,
    size: 120,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const metric = row.original
      const [editSheetOpen, setEditSheetOpen] = useState(false)
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(metric.id.toString())}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen}>
              <SheetTrigger asChild>
                <DropdownMenuItem onSelect={(e) => {
                  e.preventDefault()
                  setEditSheetOpen(true)
                }}>
                  Edit
                </DropdownMenuItem>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit Metric</SheetTitle>
                  <SheetDescription>
                    Make changes to the metric here. Click save when you're done.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <MetricForm
                    initialData={metric}
                    onSubmit={async (data) => {
                      await updateMetric(metric.id, data)
                      setEditSheetOpen(false)
                    }}
                    onCancel={() => setEditSheetOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    size: 50,
  },
]

interface MetricsTableProps {
  data: Metric[]
  pageCount: number
  currentPage: number
  defaultPageSize?: number
  initialSort?: { id: string; desc: boolean }
  isLoading?: boolean
  onPaginationChange?: (page: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
  onSortingChange?: (sorting: SortingState) => void
  onSearchChange?: (search: string) => void
  onFiltersChange?: (filters: ColumnFiltersState) => void
  onDeleteSelected?: (selectedIds: number[]) => void
}

export function MetricsTable({
  data,
  pageCount,
  currentPage,
  defaultPageSize = 5,
  initialSort,
  isLoading = false,
  onPaginationChange,
  onRowsPerPageChange,
  onSortingChange,
  onSearchChange,
  onFiltersChange,
  onDeleteSelected,
}: MetricsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>(
    initialSort ? [initialSort] : []
  )
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [pageSize, setPageSize] = React.useState(defaultPageSize)
  const [rowSelection, setRowSelection] = React.useState({})
  const [sheetOpen, setSheetOpen] = useState(false)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: (newSorting) => {
      const sortingState = typeof newSorting === 'function' 
        ? newSorting(sorting)
        : newSorting
      setSorting(sortingState)
      onSortingChange?.(sortingState)
    },
    onGlobalFilterChange: (value) => {
      setGlobalFilter(value)
      onSearchChange?.(value)
    },
    onColumnFiltersChange: (filters) => {
      setColumnFilters(filters)
      onFiltersChange?.(filters)
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      rowSelection,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
    },
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount,
  })

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value)
    setPageSize(newSize)
    onRowsPerPageChange?.(newSize)
  }

  const handleDeleteSelected = () => {
    const selectedIds = table.getSelectedRowModel().rows.map(row => row.original.id)
    onDeleteSelected?.(selectedIds)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search metrics..."
          value={globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteSelected}
            disabled={table.getSelectedRowModel().rows.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button>Add New Metric</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Metric</SheetTitle>
                <SheetDescription>
                  Add a new metric here. Click save when you're done.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <MetricForm
                  onSubmit={async (data) => {
                    await addMetric(data as Omit<Metric, 'id'>)
                    setSheetOpen(false) // Explicitly close the sheet after successful submission
                  }}
                  onCancel={() => setSheetOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="rounded-md border relative">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <th 
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className="px-4 py-2 text-left text-sm font-medium text-muted-foreground"
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
            {isLoading ? (
              <tr>
                <td 
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="h-6 w-6 animate-spin text-primary" />
                    <span className="text-muted-foreground">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td 
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b hover:bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <td 
                      key={cell.id} 
                      style={{ width: cell.column.getSize() }}
                      className="px-4 py-2 text-sm"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Rows per page</span>
            <select
              className="h-8 rounded-md border border-input bg-background px-2 text-sm"
              value={pageSize}
              onChange={handleRowsPerPageChange}
            >
              {[5, 10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {pageCount}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPaginationChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPaginationChange?.(currentPage + 1)}
            disabled={currentPage >= pageCount}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

