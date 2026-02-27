"use client";

import { useState } from "react";
import { getIcon, getIconNames } from "@/lib/icons";

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const allIcons = getIconNames();

  const filtered = search
    ? allIcons.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
      )
    : allIcons;

  const CurrentIcon = getIcon(value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-background border border-border text-foreground hover:border-accent/50 transition-colors w-full"
      >
        <CurrentIcon className="w-5 h-5 text-accent" />
        <span className="text-sm">{value || "Choisir une icône"}</span>
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-2 left-0 w-80 max-h-80 bg-surface border border-border rounded-xl shadow-xl overflow-hidden">
          <div className="p-3 border-b border-border">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une icône..."
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              autoFocus
            />
          </div>
          <div className="p-3 grid grid-cols-6 gap-2 overflow-y-auto max-h-56">
            {filtered.slice(0, 60).map((name) => {
              const Icon = getIcon(name);
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    onChange(name);
                    setOpen(false);
                    setSearch("");
                  }}
                  title={name}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    value === name
                      ? "bg-accent/20 text-accent"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
