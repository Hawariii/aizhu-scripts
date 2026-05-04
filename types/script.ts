export type ScriptStatus = "working" | "patched" | "risk";

export type ScriptRow = {
  created_at: string;
  description: string;
  game: string;
  id: string;
  rating: number;
  script: string;
  status: string;
  title: string;
  updated_at: string;
};

export type ScriptRecord = {
  createdAt: string;
  createdLabel: string;
  description: string;
  game: string;
  id: string;
  rating: number;
  script: string;
  status: ScriptStatus;
  title: string;
  updatedAt: string;
  updatedLabel: string;
  verdict: string;
};

export type ScriptListItem = Pick<
  ScriptRecord,
  "description" | "game" | "id" | "rating" | "status" | "title" | "updatedAt" | "updatedLabel"
>;
