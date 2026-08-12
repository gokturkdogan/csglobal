import Image from "next/image";

type SiteImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
};

const REMOTE_HOSTS = [
  "images.unsplash.com",
  "plus.unsplash.com",
  "flagcdn.com",
  "res.cloudinary.com",
];

function canUseNextImage(src: string) {
  if (src.startsWith("/")) return true;
  try {
    const host = new URL(src).hostname;
    return REMOTE_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

export function SiteImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  priority,
  sizes,
}: SiteImageProps) {
  if (!src) return null;

  if (canUseNextImage(src)) {
    if (fill) {
      return (
        <Image
          src={src}
          alt={alt}
          fill
          className={className}
          priority={priority}
          sizes={sizes}
        />
      );
    }
    return (
      <Image
        src={src}
        alt={alt}
        width={width ?? 800}
        height={height ?? 600}
        className={className}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={className} />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
