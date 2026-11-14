"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { SiteImage } from "@/components/ui/SiteImage";
import { cloudinaryVideoPosterUrl } from "@/lib/cloudinary-video";

type Props = {
  videoUrl: string;
  label?: string;
};

function PlayIcon() {
  return (
    <svg
      className="h-14 w-14 text-white drop-shadow-md md:h-16 md:w-16"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="2" fill="rgb(0 0 0 / 0.35)" />
      <path
        d="M26 20.5v23L44 32 26 20.5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FeatureVideoPlayer({ videoUrl, label }: Props) {
  const [open, setOpen] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const titleId = useId();
  const poster = cloudinaryVideoPosterUrl(videoUrl, 1920);
  const isCloudinaryPoster = poster !== videoUrl.trim();

  const close = useCallback(() => {
    setOpen(false);
    setLoadVideo(false);
  }, []);

  const openPlayer = useCallback(() => {
    setLoadVideo(true);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={openPlayer}
        className="group relative block w-full cursor-pointer overflow-hidden bg-slate-950 text-left"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label?.trim() ? `${label} videosunu oynat` : "Videoyu oynat"}
      >
        <span className="relative block aspect-video w-full max-h-[min(80vh,56rem)] md:aspect-[16/9]">
          {isCloudinaryPoster ? (
            <SiteImage
              src={poster}
              alt=""
              fill
              sizes="100vw"
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <span className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-950" />
          )}
          <span className="absolute inset-0 bg-slate-950/25 transition group-hover:bg-slate-950/35" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full ring-2 ring-white/80 transition group-hover:scale-105 group-hover:ring-white">
              <PlayIcon />
            </span>
          </span>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={label?.trim() ? titleId : undefined}
          onClick={close}
        >
          {label?.trim() && (
            <span id={titleId} className="sr-only">
              {label}
            </span>
          )}
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition hover:bg-white/20"
            aria-label="Videoyu kapat"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div
            className="flex h-full w-full max-h-full max-w-6xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            {loadVideo && (
              <video
                src={videoUrl}
                controls
                autoPlay
                playsInline
                preload="auto"
                className="max-h-[90vh] w-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}