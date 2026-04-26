"use client";

import { ChevronDown, ChevronUp, LayoutDashboard, Search } from "lucide-react";
import type { ReactNode } from "react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { TabItem, TabKey } from "./types";

type DashboardHeaderCardProps = {
  onRefresh: () => void;
  isRefreshing?: boolean;
  lastSavedAt?: string | null;
};

export function DashboardHeaderCard({ onRefresh, isRefreshing = false, lastSavedAt = null }: DashboardHeaderCardProps) {
  return (
    <SpotlightCard className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)]">Admin Dashboard</p>
          <h1 className="mt-1 text-2xl font-semibold flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-[var(--primary)]" />
            Portfolio Control Center
          </h1>
          <p className="mt-2 text-xs text-[var(--text-secondary)]">
            {lastSavedAt ? `Last saved at ${lastSavedAt}` : "No saved actions yet."}
          </p>
        </div>
        <button type="button" onClick={onRefresh} className="rounded-xl border border-[var(--card-border)] px-3 py-2 text-sm" disabled={isRefreshing}>
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>
    </SpotlightCard>
  );
}

type SidebarTabsProps = {
  tabItems: TabItem[];
  activeTab: TabKey;
  onSelect: (tab: TabKey) => void;
};

export function SidebarTabs({ tabItems, activeTab, onSelect }: SidebarTabsProps) {
  return (
    <SpotlightCard className="p-4 h-fit lg:sticky lg:top-28">
      <div className="space-y-2">
        {tabItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelect(item.key)}
              className={`w-full flex items-center gap-2 rounded-xl px-3 py-2 text-sm border transition-colors ${
                active
                  ? "border-[color-mix(in_srgb,var(--primary)_45%,transparent)] bg-[color-mix(in_srgb,var(--primary)_18%,transparent)] text-[var(--foreground)]"
                  : "border-[var(--card-border)] text-[var(--text-secondary)]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>
    </SpotlightCard>
  );
}

type CollapsibleSectionCardProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
};

export function CollapsibleSectionCard({ title, isOpen, onToggle, children, className = "p-5 space-y-4" }: CollapsibleSectionCardProps) {
  return (
    <SpotlightCard className={className}>
      <button type="button" onClick={onToggle} className="w-full flex items-center justify-between gap-3">
        <h2 className="font-semibold text-lg text-left">{title}</h2>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {isOpen ? children : null}
    </SpotlightCard>
  );
}

type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function SearchField({ value, onChange, placeholder }: SearchFieldProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-secondary)]" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[var(--card-border)] bg-transparent pl-9 pr-3 py-2 text-sm"
      />
    </div>
  );
}

type ColorSwatchesProps = {
  colors: string[];
  value?: string;
  onSelect: (color: string) => void;
};

export function ColorSwatches({ colors, value, onSelect }: ColorSwatchesProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {colors.map((color) => {
        const active = value === color;
        return (
          <button
            key={color}
            type="button"
            aria-label={`Select color ${color}`}
            onClick={() => onSelect(color)}
            className={`h-7 w-7 rounded-md border transition-transform ${active ? "scale-105 border-white" : "border-white/20"}`}
            style={{ background: color }}
          />
        );
      })}
      <button type="button" onClick={() => onSelect("")} className={`h-7 rounded-md border px-2 text-xs ${value ? "border-white/20" : "border-white"}`}>
        None
      </button>
    </div>
  );
}

type InlineToastProps = {
  message: string;
  tone?: "success" | "error" | "info";
};

export function InlineToast({ message, tone = "info" }: InlineToastProps) {
  const colorClass =
    tone === "success"
      ? "border-emerald-500/30 text-emerald-300"
      : tone === "error"
        ? "border-red-500/30 text-red-300"
        : "border-[var(--card-border)] text-[var(--text-secondary)]";

  return (
    <div className={`rounded-xl border px-3 py-2 text-sm ${colorClass}`}>
      {message}
    </div>
  );
}
