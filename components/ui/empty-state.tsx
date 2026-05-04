type EmptyStateProps = {
  description: string;
  title: string;
};

export function EmptyState({ description, title }: EmptyStateProps) {
  return (
    <div className="glass-panel surface-border rounded-[30px] px-6 py-10 text-center">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-foreground-muted">
        {description}
      </p>
    </div>
  );
}
