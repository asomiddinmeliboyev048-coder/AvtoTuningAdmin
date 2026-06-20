// Supabase Storage (admin tomondan mahsulot rasmi va h.k. yuklash uchun)
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export const STORAGE_BUCKET = "models";

export const getPublicUrl = (path, bucket = STORAGE_BUCKET) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

export const makeUploadPath = (folder, fileName) => {
  const ext = (fileName.split(".").pop() || "bin").toLowerCase();
  const safe = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  return `${folder}/${safe}`;
};

export const uploadFile = async (folder, file, bucket = STORAGE_BUCKET) => {
  const path = makeUploadPath(folder, file.name);
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: "3600", upsert: true });
  if (error) throw error;
  return { url: getPublicUrl(path, bucket), path };
};
