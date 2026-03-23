import type { FC } from "react"

interface SkeletonProps {
  className?: string
}

export const Skeleton: FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`animate-shimmer rounded-lg bg-[var(--color-border-light)] ${className}`}
    />
  )
}

export const ProductCardSkeleton: FC = () => {
  return (
    <div className="card p-4 animate-pulse-skeleton">
      {/* Image placeholder */}
      <Skeleton className="w-full h-48 rounded-lg mb-4" />
      
      {/* Title */}
      <Skeleton className="h-5 w-3/4 mb-2" />
      
      {/* Description */}
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      
      {/* Price and button */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    </div>
  )
}

export const CategoryCardSkeleton: FC = () => {
  return (
    <div className="card p-4 animate-pulse-skeleton">
      {/* Icon placeholder */}
      <Skeleton className="w-12 h-12 rounded-lg mb-3" />
      
      {/* Title */}
      <Skeleton className="h-5 w-24 mb-2" />
      
      {/* Count */}
      <Skeleton className="h-4 w-16" />
    </div>
  )
}

export const TableRowSkeleton: FC = () => {
  return (
    <tr className="animate-pulse-skeleton">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div className="flex-1">
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </td>
      <td className="p-4">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="p-4">
        <Skeleton className="h-4 w-16" />
      </td>
      <td className="p-4">
        <Skeleton className="h-8 w-20 rounded-lg" />
      </td>
    </tr>
  )
}

export const ProductsGridSkeleton: FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export const CategoriesGridSkeleton: FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  )
}

export const TableSkeleton: FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-[var(--color-border)]">
          <th className="p-4 text-left">
            <Skeleton className="h-4 w-24" />
          </th>
          <th className="p-4 text-left">
            <Skeleton className="h-4 w-20" />
          </th>
          <th className="p-4 text-left">
            <Skeleton className="h-4 w-16" />
          </th>
          <th className="p-4 text-left">
            <Skeleton className="h-4 w-20" />
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <TableRowSkeleton key={i} />
        ))}
      </tbody>
    </table>
  )
}

export const StatCardSkeleton: FC = () => {
  return (
    <div className="card p-6 animate-pulse-skeleton">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <Skeleton className="w-16 h-5 rounded-full" />
      </div>
      <Skeleton className="h-8 w-24 mb-2" />
      <Skeleton className="h-4 w-32" />
    </div>
  )
}
