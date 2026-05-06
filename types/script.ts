export type ScriptStatus = "working" | "patched" | "risk";

export type ScriptRow = {
  created_at: string;
  description: string;
  game: string;
  id: string;
  published?: boolean;
  script: string;
  slug?: string;
  status: string;
  thumbnail_url?: string | null;
  title: string;
  updated_at: string;
};

export type ScriptRecord = {
  createdAt: string;
  createdLabel: string;
  description: string;
  game: string;
  id: string;
  published: boolean;
  script: string;
  slug: string;
  status: ScriptStatus;
  thumbnailUrl: string;
  title: string;
  updatedAt: string;
  updatedLabel: string;
};

export type ScriptListItem = Pick<
  ScriptRecord,
  | "description"
  | "game"
  | "id"
  | "slug"
  | "status"
  | "thumbnailUrl"
  | "title"
  | "updatedAt"
  | "updatedLabel"
>;
