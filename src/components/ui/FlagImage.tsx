type Props = {
  flag: string;
  /** Görüntülenen genişlik (px). CDN kaynağı buna göre seçilir. */
  displayWidth: number;
  className?: string;
};

function flagCdnWidth(displayWidth: number): number {
  if (displayWidth <= 20) return 20;
  if (displayWidth <= 40) return 40;
  if (displayWidth <= 80) return 80;
  return 160;
}

/** Küçük harici bayrak ikonları; Next/Image yerine native img (aspect ratio uyarısı yok). */
export function FlagImage({ flag, displayWidth, className = "" }: Props) {
  const cdnWidth = flagCdnWidth(displayWidth);
  const code = flag.toLowerCase();
  const height = Math.round(displayWidth * 0.75);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w${cdnWidth}/${code}.png`}
      alt=""
      width={displayWidth}
      height={height}
      className={className}
      style={{ width: displayWidth, height: "auto" }}
    />
  );
}
