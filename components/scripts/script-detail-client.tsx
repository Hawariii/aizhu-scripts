"use client";

import { useState } from "react";
import AdSlot from "@/components/ads/ad-slot";
import { AdInline } from "@/components/ads/ad-inline";
import { CopyScriptPanel } from "@/components/scripts/copy-script-panel";
import { RelatedScripts } from "@/components/scripts/related-scripts";
import { ScriptAccessPanel } from "@/components/scripts/script-access-panel";
import { ScriptBody } from "@/components/scripts/script-body";
import { ScriptMetaPanel } from "@/components/scripts/script-meta-panel";
import type { ScriptListItem, ScriptRecord } from "@/types/script";

type ScriptDetailClientProps = {
  relatedScripts: ScriptListItem[];
  script: ScriptRecord;
};

export function ScriptDetailClient({
  relatedScripts,
  script,
}: ScriptDetailClientProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const accessPanel = !isRevealed ? (
    <ScriptAccessPanel
      isRevealed={isRevealed}
      onReveal={() => setIsRevealed(true)}
      scriptId={script.id}
    />
  ) : null;
  const copyPanel = isRevealed ? (
    <CopyScriptPanel scriptId={script.id} scriptText={script.script} />
  ) : null;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
      <div className="space-y-6">
        <ScriptBody
          accessPanel={accessPanel}
          copyPanel={copyPanel}
          isRevealed={isRevealed}
          script={script}
        />
        <AdInline />
        <RelatedScripts items={relatedScripts} />
      </div>
      <div className="space-y-6">
        <ScriptMetaPanel script={script} />
        <AdSlot placement="sidebar" />
      </div>
    </div>
  );
}
