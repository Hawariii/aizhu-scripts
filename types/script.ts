export type ScriptStatus = "working" | "patched" | "risk";

export type ScriptRow = {
  created_at: string;
  description: string;
  game: string;
  id: string;
  published?: boolean;
  rating: number;
  script: string;
  slug?: string;
  status: string;
  title: string;
  updated_at: string;
  verdict?: string | null;
};

export type ScriptRecord = {
  createdAt: string;
  createdLabel: string;
  description: string;
  game: string;
  id: string;
  published: boolean;
  rating: number;
  script: string;
  slug: string;
  status: ScriptStatus;
  title: string;
  updatedAt: string;
  updatedLabel: string;
  verdict: string;
};

export type ScriptListItem = Pick<
  ScriptRecord,
  | "description"
  | "game"
  | "id"
  | "rating"
  | "slug"
  | "status"
  | "title"
  | "updatedAt"
  | "updatedLabel"
>;
