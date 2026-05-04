export function ScriptGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="glass-panel surface-border h-72 animate-pulse rounded-[28px]"
          key={index}
        />
      ))}
    </div>
  );
}
