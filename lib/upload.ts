import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function uploadFile(
  file: File
): Promise<{ url: string } | { error: string }> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Type de fichier non autorisé. Utilisez JPEG, PNG, WebP ou AVIF." };
  }

  if (file.size > MAX_SIZE) {
    return { error: "Le fichier est trop volumineux. Maximum 5 Mo." };
  }

  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${crypto.randomUUID()}.${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  await mkdir(UPLOAD_DIR, { recursive: true });

  const bytes = await file.arrayBuffer();
  await writeFile(filepath, Buffer.from(bytes));

  return { url: `/uploads/${filename}` };
}
