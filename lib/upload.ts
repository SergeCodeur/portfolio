import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import crypto from "crypto";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const isR2Configured =
  process.env.R2_ACCOUNT_ID &&
  process.env.R2_ACCESS_KEY_ID &&
  process.env.R2_SECRET_ACCESS_KEY &&
  process.env.R2_BUCKET_NAME &&
  process.env.R2_PUBLIC_URL;

const s3 = isR2Configured
  ? new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    })
  : null;

export async function uploadFile(
  file: File
): Promise<{ url: string } | { error: string }> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      error: "Type de fichier non autorisé. Utilisez JPEG, PNG, WebP ou AVIF.",
    };
  }

  if (file.size > MAX_SIZE) {
    return { error: "Le fichier est trop volumineux. Maximum 5 Mo." };
  }

  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${crypto.randomUUID()}.${ext}`;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Cloudflare R2
  if (s3 && isR2Configured) {
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: filename,
        Body: buffer,
        ContentType: file.type,
      })
    );
    return { url: `${process.env.R2_PUBLIC_URL}/${filename}` };
  }

  // Fallback filesystem (dev local)
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);
  return { url: `/uploads/${filename}` };
}

export async function deleteFile(url: string): Promise<void> {
  if (!url) return;

  // R2: extract key from public URL
  if (s3 && isR2Configured && url.startsWith(process.env.R2_PUBLIC_URL!)) {
    const key = url.replace(`${process.env.R2_PUBLIC_URL}/`, "");
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
      })
    );
    return;
  }

  // Fallback filesystem
  if (url.startsWith("/uploads/")) {
    const filepath = path.join(process.cwd(), "public", url);
    try {
      await unlink(filepath);
    } catch {
      // File may not exist
    }
  }
}
