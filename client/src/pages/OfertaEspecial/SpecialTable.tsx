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
} from "lucide-react";
import { SearchIcon } from "../../components/icons/search";
import { cn } from "../../lib/cn";
import type { Ficha } from "../../types";

interface SpecialTableProps {
  fichas: Ficha[];
}

const columns = [
  {
    id: "anio",
    header: "Año",
    size: 70,
    accessorFn: (row: Ficha) => {
      const parts = row.fechaTerminacionFicha?.split("/");
      return parts?.length === 3 ? parts[2] : "";
    },
  },
  { accessorKey: "identificadorFicha", header: "Ficha", size: 90 },
  { accessorKey: "nombreCentro", header: "Centro", size: 200 },
  { accessorKey: "nombreProgramaFormacion", header: "Programa", size: 260 },
  { accessorKey: "nombreEmpresa", header: "Empresa", size: 180 },
];

export default function SpecialTable({ fichas }: SpecialTableProps) {
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
    <div className="section-card overflow-hidden">
      <div className="px-6 py-4 border-b border-border-light">
        <div className="flex items-center justify-between mb-3">
          <h3 className="section-title">Oferta Especial</h3>
          <span className="text-xs font-semibold text-text-muted bg-bg-base px-3 py-1 rounded-full">
            {fichas.length.toLocaleString("es-CO")} registros
          </span>
        </div>
        <div className="relative max-w-sm">
          <SearchIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            aria-label="Buscar en tabla"
            placeholder="Buscar..."
            className="w-full h-11 pl-10 pr-4 text-sm bg-bg-base border border-border rounded-xl outline-none focus:border-sena-green transition-colors text-text-primary placeholder:text-text-muted"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto max-h-[520px] overflow-y-auto">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-10 bg-bg-base/95 backdrop-blur-sm border-b border-border">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-5 py-3.5 text-[11px] font-bold text-text-muted uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1.5">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === "asc" ? (
                        <ChevronUp className="w-3.5 h-3.5 text-sena-green" />
                      ) : header.column.getIsSorted() === "desc" ? (
                        <ChevronDown className="w-3.5 h-3.5 text-sena-green" />
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border-light">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-sena-green-50 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-5 py-3.5 text-text-secondary font-medium whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden divide-y divide-border-light max-h-[60vh] overflow-y-auto">
        {table.getRowModel().rows.map((row) => (
          <div key={row.id} className="p-5 hover:bg-bg-base transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div className="font-bold text-text-primary">Ficha: {row.getValue("identificadorFicha")}</div>
            </div>
            <div className="text-sm font-semibold text-text-primary mb-1 line-clamp-1">
              {row.getValue("nombreProgramaFormacion") as string}
            </div>
            <div className="text-xs text-text-muted mb-3">
              {row.getValue("nombreCentro") as string}
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex flex-col gap-0.5">
                <span className="text-text-muted font-medium">Empresa</span>
                <span className="font-semibold text-text-secondary truncate max-w-[140px]">{row.getValue("nombreEmpresa") as string || "-"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border-light bg-bg-base/30">
        <span className="text-xs font-semibold text-text-muted">
          Pagina {pageIndex + 1} de {pageCount}
        </span>
        <div className="flex items-center gap-1">
          <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} aria-label="Primera pagina"
            className="p-2 rounded-xl hover:bg-bg-base text-text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} aria-label="Pagina anterior"
            className="p-2 rounded-xl hover:bg-bg-base text-text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1 mx-1">
            {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
              let p: number;
              if (pageCount <= 5) p = i;
              else if (pageIndex < 3) p = i;
              else if (pageIndex > pageCount - 4) p = pageCount - 5 + i;
              else p = pageIndex - 2 + i;
              return (
                <button key={p} onClick={() => table.setPageIndex(p)}
                  className={cn(
                    "w-9 h-9 rounded-xl text-xs font-bold transition-all duration-200",
                    p === pageIndex ? "bg-sena-green text-white shadow-sm" : "text-text-muted hover:bg-bg-base"
                  )}>
                  {p + 1}
                </button>
              );
            })}
          </div>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} aria-label="Pagina siguiente"
            className="p-2 rounded-xl hover:bg-bg-base text-text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button onClick={() => table.setPageIndex(pageCount - 1)} disabled={!table.getCanNextPage()} aria-label="Ultima pagina"
            className="p-2 rounded-xl hover:bg-bg-base text-text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
