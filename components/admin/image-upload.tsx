"use client";

import { useState } from "react";
import { Upload, Link as LinkIcon, X } from "lucide-react";
import Image from "next/image";

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
        <button
          type="button"
          onClick={() => setMode("file")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            mode === "file"
              ? "bg-accent/10 text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          Fichier
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            mode === "url"
              ? "bg-accent/10 text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          URL
        </button>
      </div>

      {mode === "file" ? (
        <div>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-accent/50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
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
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-4 py-2 rounded-lg bg-accent text-background text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            OK
          </button>
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
          <button
            type="button"
            onClick={() => {
              onChange("");
              setUrlInput("");
            }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
