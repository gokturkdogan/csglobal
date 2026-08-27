/** Varsayılan ofis konumu: Levent, İstanbul */
export const DEFAULT_MAP_LAT = 41.0812;
export const DEFAULT_MAP_LNG = 29.0096;

export function parseLatLngFromGoogleEmbed(url: string): { lat: number; lng: number } | null {
  const latLngMatch = url.match(/!3d([\d.-]+)!4d([\d.-]+)/);
  if (latLngMatch) {
    return { lat: parseFloat(latLngMatch[1]), lng: parseFloat(latLngMatch[2]) };
  }

  const atMatch = url.match(/@([\d.-]+),([\d.-]+)/);
  if (atMatch) {
    return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) };
  }

  return null;
}

export function buildOpenStreetMapStaticUrl(
  lat: number,
  lng: number,
  width = 1200,
  height = 630,
): string {
  const params = new URLSearchParams({
    center: `${lat},${lng}`,
    zoom: "15",
    size: `${width}x${height}`,
    markers: `${lat},${lng},red-pushpin`,
  });
  return `https://staticmap.openstreetmap.de/staticmap.php?${params.toString()}`;
}

export function resolveMapCoordinates(embedUrl?: string): { lat: number; lng: number } {
  if (embedUrl?.trim()) {
    const parsed = parseLatLngFromGoogleEmbed(embedUrl);
    if (parsed) return parsed;
  }
  return { lat: DEFAULT_MAP_LAT, lng: DEFAULT_MAP_LNG };
}
