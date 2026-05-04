export function ScriptGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="surface-border h-72 animate-pulse rounded-[24px] bg-panel"
          key={index}
        />
      ))}
    </div>
  );
}
