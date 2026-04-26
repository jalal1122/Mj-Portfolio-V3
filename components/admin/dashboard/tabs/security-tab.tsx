"use client";

import type { Dispatch, SetStateAction } from "react";
import { CollapsibleSectionCard } from "@/components/admin/dashboard/admin-ui";

type SecurityTabProps = {
  adminToken: string;
  setAdminToken: Dispatch<SetStateAction<string>>;
  status: string;
  panelOpen: { security: boolean };
  onTogglePanel: () => void;
};

export function SecurityTab({ adminToken, setAdminToken, status, panelOpen, onTogglePanel }: SecurityTabProps) {
  return (
    <CollapsibleSectionCard title="Security & Status" isOpen={panelOpen.security} onToggle={onTogglePanel}>
      <p className="text-sm text-[var(--text-secondary)]">Admin mutation token (required only when `ADMIN_TOKEN` is enabled)</p>
      <input
        value={adminToken}
        onChange={(event) => setAdminToken(event.target.value)}
        placeholder="Paste admin token"
        className="w-full rounded-xl border border-[var(--card-border)] bg-transparent px-4 py-2"
      />
      {status ? <p className="text-sm text-[var(--text-secondary)]">{status}</p> : <p className="text-sm text-[var(--text-secondary)]">No recent actions.</p>}
    </CollapsibleSectionCard>
  );
}
