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
  Table2,
} from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";

const columns = [
  { accessorKey: "identificadorFicha", header: "ID", size: 80 },
  { accessorKey: "nombreCentro", header: "Centro", size: 200 },
  { accessorKey: "nombreProgramaFormacion", header: "Programa", size: 260 },
  { accessorKey: "etapaFicha", header: "Etapa", size: 85 },
  { accessorKey: "nombreEmpresa", header: "Empresa", size: 180 },
  { accessorKey: "nombreMunicipioCurso", header: "Municipio", size: 130 },
  { accessorKey: "totalAprendices", header: "Aprendices", size: 90 },
  { accessorKey: "modalidadFormacion", header: "Modalidad", size: 100 },
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
    initialState: { pagination: { pageSize: 15 } },
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
    <div className="card table-container">
      <div className="px-5 pt-4 pb-3 border-b border-sena-blue-light/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="chart-card-icon bg-blue-400/10 border border-blue-400/10">
              <Table2 className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="chart-card-title">Datos PE-04</h3>
          </div>
          <span className="badge badge-blue">
            {fichas.length.toLocaleString("es-CO")} registros
          </span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sena-gray/25" />
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar en todas las columnas..."
            className="filter-item !h-auto !py-2.5 pl-9 text-[11px] !rounded-xl"
          />
        </div>
      </div>

      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="w-full text-xs">
          <thead className="table-header-sticky">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-2.5 text-left text-[10px] font-bold text-sena-gray/50 uppercase tracking-wider border-b border-sena-blue-light/10 cursor-pointer hover:text-sena-white transition-colors whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1.5">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === "asc" ? (
                        <ChevronUp className="w-3 h-3 text-sena-green" />
                      ) : header.column.getIsSorted() === "desc" ? (
                        <ChevronDown className="w-3 h-3 text-sena-green" />
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
                className={`border-b border-sena-blue-light/5 table-row-hover transition-colors ${
                  i % 2 === 0 ? "table-row-even" : ""
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2.5 text-sena-white/75 whitespace-nowrap text-[11px]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t border-sena-blue-light/10">
        <span className="text-[10px] text-sena-gray/35 font-medium">
          {pageIndex + 1} / {pageCount} páginas
        </span>
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="p-1.5 rounded-lg hover:bg-sena-blue-light/30 text-sena-gray/30 hover:text-sena-white disabled:opacity-15 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1.5 rounded-lg hover:bg-sena-blue-light/30 text-sena-gray/30 hover:text-sena-white disabled:opacity-15 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-0.5 mx-1">
            {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
              let pageNum: number;
              if (pageCount <= 5) {
                pageNum = i;
              } else if (pageIndex < 3) {
                pageNum = i;
              } else if (pageIndex > pageCount - 4) {
                pageNum = pageCount - 5 + i;
              } else {
                pageNum = pageIndex - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => table.setPageIndex(pageNum)}
                  className={`w-7 h-7 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
                    pageNum === pageIndex
                      ? "bg-sena-green/15 text-sena-green border border-sena-green/20"
                      : "text-sena-gray/40 hover:bg-sena-blue-light/30 hover:text-sena-white"
                  }`}
                >
                  {pageNum + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-1.5 rounded-lg hover:bg-sena-blue-light/30 text-sena-gray/30 hover:text-sena-white disabled:opacity-15 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
            className="p-1.5 rounded-lg hover:bg-sena-blue-light/30 text-sena-gray/30 hover:text-sena-white disabled:opacity-15 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
