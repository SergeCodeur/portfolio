"use client";

import { useState } from "react";
import { UploadIcon, LinkIcon, XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [mode, setMode] = useState<"file" | "url">(
    value && !value.startsWith("/uploads/") && value.startsWith("http")
      ? "url"
      : "file"
  );
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState(
    value && value.startsWith("http") ? value : ""
  );

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      }
    } catch {
      // Handle error silently
    } finally {
      setUploading(false);
    }
  }

  function handleUrlSubmit() {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button
          type="button"
          variant={mode === "file" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setMode("file")}
        >
          <UploadIcon className="w-3.5 h-3.5" />
          Fichier
        </Button>
        <Button
          type="button"
          variant={mode === "url" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setMode("url")}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          URL
        </Button>
      </div>

      {mode === "file" ? (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-accent/50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadIcon className="w-8 h-8 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {uploading
                ? "Upload en cours..."
                : "Cliquez pour sélectionner"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              JPEG, PNG, WebP, AVIF (max 5Mo)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      ) : (
        <div className="flex gap-2">
          <Input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          <Button type="button" size="sm" onClick={handleUrlSubmit}>
            OK
          </Button>
        </div>
      )}

      {value && (
        <div className="relative inline-block">
          <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-border">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon-xs"
            onClick={() => {
              onChange("");
              setUrlInput("");
            }}
            className="absolute -top-2 -right-2 rounded-full"
          >
            <XIcon className="w-3 h-3" />
          </Button>
        </div>
      )}
    </div>
  );
}
