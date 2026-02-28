"use client";

import { PlusIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ArrayInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export default function ArrayInput({
  value,
  onChange,
  placeholder = "Ajouter un élément...",
}: ArrayInputProps) {
  const [input, setInput] = useState("");

  function handleAdd() {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInput("");
    }
  }

  function handleRemove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <Button type="button" onClick={handleAdd} size="icon">
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((item, i) => (
            <Badge key={i} variant="secondary" className="gap-1.5 pr-1.5">
              {item}
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={() => handleRemove(i)}
                className="text-muted-foreground hover:text-destructive"
              >
                <XIcon className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
