export function ScriptGridSkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="surface-border h-44 animate-pulse rounded-[24px] bg-panel sm:h-52"
          key={index}
        />
      ))}
    </div>
  );
}
