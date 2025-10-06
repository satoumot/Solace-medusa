import { Filter } from ".."
import { DataTableFilter } from "../data-table-filter"
import { DataTableOrderBy, DataTableOrderByKey } from "../data-table-order-by"
import { DataTableSearch } from "../data-table-search"

export interface DataTableQueryProps<TData> {
  search?: boolean | "autofocus"
  orderBy?: DataTableOrderByKey<TData>[]
  filters?: Filter[]
  prefix?: string
}

export const DataTableQuery = <TData,>({
  search,
  orderBy,
  filters,
  prefix,
}: DataTableQueryProps<TData>) => {
  return (
    (search || orderBy || filters || prefix) && (
      <div className="flex items-start justify-between gap-x-4 px-6 py-4">
        <div className="w-full max-w-[60%]">
          {filters && filters.length > 0 && (
            <DataTableFilter filters={filters} prefix={prefix} />
          )}
        </div>
        <div className="flex shrink-0 items-center gap-x-2">
          {search && (
            // DataTableSearchを複製し、<>で囲った
            // Prefixを変えることで別の検索バーとして機能する
            // {prefix}_qがＵＲＬ末尾にクエリとして追加される（今回はsnd_q）
            <>
            <DataTableSearch
              prefix={prefix}
              autofocus={search === "autofocus"}
              placeholder="email"
            />
            <DataTableSearch
              prefix="snd"
              autofocus={search === "autofocus"}
              placeholder="name"
            />
            </>
          )}
          {orderBy && <DataTableOrderBy keys={orderBy} prefix={prefix} />}
        </div>
      </div>
    )
  )
}
