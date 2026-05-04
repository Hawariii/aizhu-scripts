type GameTagBadgeProps = {
  game: string;
};

export function GameTagBadge({ game }: GameTagBadgeProps) {
  return (
    <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
      {game}
    </span>
  );
}
