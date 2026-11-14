/** Cloudinary video URL'den ilk kare poster (JPEG) üretir. */
export function cloudinaryVideoPosterUrl(videoUrl: string, width = 1920): string {
  const trimmed = videoUrl.trim();
  if (!trimmed.includes("res.cloudinary.com/") || !trimmed.includes("/video/upload/")) {
    return trimmed;
  }
  const marker = "/video/upload/";
  const uploadIdx = trimmed.indexOf(marker);
  const rest = trimmed.slice(uploadIdx + marker.length);
  if (/^(so_|f_|q_|w_|c_|g_)/.test(rest)) {
    return trimmed;
  }
  return `${trimmed.slice(0, uploadIdx + marker.length)}so_0,f_jpg,q_auto,w_${width}/${rest}`;
}