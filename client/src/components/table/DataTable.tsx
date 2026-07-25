import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type SortingState,
} from "@tanstack/react-table";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import { cn } from "../../lib/cn";

const columns = [
  { accessorKey: "identificadorFicha", header: "ID", size: 60 },
  { accessorKey: "nombreCentro", header: "Centro", size: 160 },
  { accessorKey: "nombreProgramaFormacion", header: "Programa", size: 200 },
  { accessorKey: "etapaFicha", header: "Etapa", size: 70 },
  { accessorKey: "nombreEmpresa", header: "Empresa", size: 150 },
  { accessorKey: "nombreMunicipioCurso", header: "Municipio", size: 110 },
  { accessorKey: "totalAprendices", header: "Aprendices", size: 75 },
  { accessorKey: "modalidadFormacion", header: "Modalidad", size: 85 },
];

export default function DataTable() {
  const fichas = useDashboardStore((s) => s.fichasFiltradas);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: fichas,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 12 } },
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-gray-600">Datos PE-04</h3>
          <span className="text-[10px] text-gray-400">{fichas.length.toLocaleString("es-CO")} registros</span>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar..."
            className="h-8 pl-7 pr-2.5 text-[10px] bg-gray-50 border border-gray-200 rounded-lg w-full outline-none focus:border-blue-400 transition-colors text-gray-600 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-3 py-2 text-left text-[9px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 cursor-pointer hover:text-gray-600 transition-colors whitespace-nowrap"
                  >
                    <div className="flex items-center gap-0.5">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === "asc" ? (
                        <ChevronUp className="w-2.5 h-2.5 text-blue-400" />
                      ) : header.column.getIsSorted() === "desc" ? (
                        <ChevronDown className="w-2.5 h-2.5 text-blue-400" />
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={cn(
                  "border-b border-gray-50 hover:bg-gray-50/50 transition-colors",
                  i % 2 === 0 && "bg-gray-50/30"
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2 text-gray-600 whitespace-nowrap text-[10px]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100">
        <span className="text-[9px] text-gray-400">{pageIndex + 1}/{pageCount}</span>
        <div className="flex items-center gap-0.5">
          <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}
            className="p-1 rounded hover:bg-gray-100 text-gray-400 disabled:opacity-15 disabled:cursor-not-allowed cursor-pointer">
            <ChevronsLeft className="w-3 h-3" />
          </button>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}
            className="p-1 rounded hover:bg-gray-100 text-gray-400 disabled:opacity-15 disabled:cursor-not-allowed cursor-pointer">
            <ChevronLeft className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-0.5 mx-0.5">
            {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
              let p: number;
              if (pageCount <= 5) p = i;
              else if (pageIndex < 3) p = i;
              else if (pageIndex > pageCount - 4) p = pageCount - 5 + i;
              else p = pageIndex - 2 + i;
              return (
                <button key={p} onClick={() => table.setPageIndex(p)}
                  className={cn(
                    "w-5 h-5 rounded text-[9px] font-medium transition-colors cursor-pointer",
                    p === pageIndex ? "bg-blue-50 text-blue-500 border border-blue-200" : "text-gray-400 hover:bg-gray-100"
                  )}>
                  {p + 1}
                </button>
              );
            })}
          </div>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}
            className="p-1 rounded hover:bg-gray-100 text-gray-400 disabled:opacity-15 disabled:cursor-not-allowed cursor-pointer">
            <ChevronRight className="w-3 h-3" />
          </button>
          <button onClick={() => table.setPageIndex(pageCount - 1)} disabled={!table.getCanNextPage()}
            className="p-1 rounded hover:bg-gray-100 text-gray-400 disabled:opacity-15 disabled:cursor-not-allowed cursor-pointer">
            <ChevronsRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
