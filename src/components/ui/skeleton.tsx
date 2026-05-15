import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[--color-brand-light]/10 dark:bg-[--color-brand-primary]/20", className)}
      {...props}
    />
  )
}

export { Skeleton }
