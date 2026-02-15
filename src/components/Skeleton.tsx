import { cn } from "@/lib/utils";

function Skeleton({
  className,
  shimmerClassName,
  ...props
}: React.ComponentProps<"div"> & { shimmerClassName?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("relative overflow-hidden rounded-lg bg-gray-200", className)}
      {...props}>
      <span
        className={cn(
          "absolute inset-0 -translate-x-full animate-[shimmer_2s_ease-in-out_infinite] from-transparent via-white/40 to-transparent bg-linear-to-r",
          shimmerClassName,
        )}
        aria-hidden
      />
    </div>
  );
}
export { Skeleton };
