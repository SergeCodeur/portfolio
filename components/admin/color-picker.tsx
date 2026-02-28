"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const presetColors = [
  "#050816", "#0A0A0B", "#0F172A", "#1E3A8A",
  "#E8ECF1", "#F5F5F5", "#FFFFFF",
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6",
];

export default function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const colorInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => colorInputRef.current?.click()}
          className="w-9 h-9 rounded-lg border border-border shrink-0 cursor-pointer transition-transform hover:scale-105"
          style={{ backgroundColor: value }}
          title="Choisir une couleur"
        >
          <input
            ref={colorInputRef}
            type="color"
            value={value.startsWith("#") ? value : "#000000"}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
        </button>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="font-mono text-xs"
        />
      </div>
      <div className="flex flex-wrap gap-1">
        {presetColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`w-5 h-5 rounded-md border transition-transform ${
              value === color
                ? "border-accent scale-110 ring-1 ring-accent"
                : "border-border/50 hover:scale-110"
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}
