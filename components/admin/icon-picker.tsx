"use client";

import { useState } from "react";
import { getIcon, getIconNames } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-start gap-3"
        >
          <CurrentIcon className="w-5 h-5 text-accent" />
          <span className="text-sm">{value || "Choisir une icône"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Choisir une icône</DialogTitle>
        </DialogHeader>
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une icône..."
          autoFocus
        />
        <div className="grid grid-cols-6 gap-2 overflow-y-auto max-h-56">
          {filtered.slice(0, 60).map((name) => {
            const Icon = getIcon(name);
            return (
              <Button
                key={name}
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  onChange(name);
                  setOpen(false);
                  setSearch("");
                }}
                title={name}
                className={
                  value === name
                    ? "bg-accent/20 text-accent"
                    : "text-muted-foreground"
                }
              >
                <Icon className="w-5 h-5" />
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
