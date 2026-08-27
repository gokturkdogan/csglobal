import Image from "next/image";

type Props = {
  flag: string;
  /** Görüntülenen genişlik (px). CDN kaynağı retina için 2x seçilir. */
  displayWidth: number;
  className?: string;
  alt?: string;
};

function flagCdnWidth(displayWidth: number): number {
  const retinaWidth = Math.ceil(displayWidth * 2);
  return Math.min(160, Math.max(20, retinaWidth));
}

/** Bayrak ikonları; flagcdn next/image üzerinden birinci parti proxy ile yüklenir. */
export function FlagImage({
  flag,
  displayWidth,
  className = "",
  alt = "",
}: Props) {
  const cdnWidth = flagCdnWidth(displayWidth);
  const code = flag.toLowerCase();
  const intrinsicHeight = Math.round(cdnWidth * 0.75);
  const src = `https://flagcdn.com/w${cdnWidth}/${code}.png`;

  return (
    <span
      className={`inline-block shrink-0 leading-none ${className}`}
      style={{ width: displayWidth }}
    >
      <Image
        src={src}
        alt={alt}
        width={cdnWidth}
        height={intrinsicHeight}
        sizes={`${displayWidth}px`}
        className="h-auto w-full"
      />
    </span>
  );
}
