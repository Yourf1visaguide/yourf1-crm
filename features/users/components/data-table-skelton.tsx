import { Skeleton } from "@/components/ui/skeleton";

export function DataTableSkeleton({
  columns = 6,
  rows = 8,
}: {
  columns?: number;
  rows?: number;
}) {
  return (
    <div className="w-full">
      {/* Top action */}
      <div className="mb-8 flex items-center justify-end">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      {/* Search + actions */}
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-10 w-full max-w-sm rounded-md" />

        <div className="flex gap-4">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>

      {/* Table  */}
      <div className="w-full overflow-hidden rounded-md border border-border/70 bg-card shadow-sm">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[720px]">
            {/* Header */}
            <div className="flex h-12 items-center gap-6 border-b border-border/70 bg-muted px-5">
              {Array.from({ length: columns }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-3.5"
                  style={{
                    width:
                      index === 0
                        ? "18%"
                        : index === columns - 1
                          ? "8%"
                          : "12%",
                  }}
                />
              ))}
            </div>

            {/* Rows */}
            <div>
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex h-[68px] items-center gap-6 border-b border-border/50 px-5 last:border-b-0"
                >
                  {Array.from({ length: columns }).map((_, columnIndex) => (
                    <div
                      key={columnIndex}
                      className="flex-1"
                    >
                      {columnIndex === 0 ? (
                        <div className="flex items-center gap-3">
                          <Skeleton className="size-9 rounded-full" />

                          <div className="space-y-1.5">
                            <Skeleton className="h-3.5 w-28" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                        </div>
                      ) : columnIndex === columns - 1 ? (
                        <Skeleton className="size-8 rounded-md" />
                      ) : (
                        <Skeleton
                          className={
                            columnIndex % 2 === 0
                              ? "h-3.5 w-24"
                              : "h-3.5 w-20"
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-4 w-28" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>
    </div>
  );
}