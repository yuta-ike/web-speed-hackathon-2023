type MediaType = 'image' | 'video';

export function getMediaType(filename: string): MediaType {
  if (filename.endsWith('.webm')) {
    return 'video';
  }

  return 'image';
}
