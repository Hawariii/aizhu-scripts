type EmptyStateProps = {
  description: string;
  title: string;
};

export function EmptyState({ description, title }: EmptyStateProps) {
  return (
    <div className="surface-border rounded-[24px] bg-panel px-6 py-12 text-center sm:px-8">
      <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-foreground-muted">
        {description}
      </p>
    </div>
  );
}
