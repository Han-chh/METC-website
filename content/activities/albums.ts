import { resourceAlbums } from "../../src/data/resources";
import type { ActivityAlbum, GalleryPhoto, LocalizedText } from "./types";

const local = (text: string): LocalizedText => ({ zh: text, en: text });

function toPhoto(photo: (typeof resourceAlbums)[number]["photos"][number]): GalleryPhoto {
  return {
    id: photo.id,
    src: photo.src,
    alt: local(photo.alt),
    caption: photo.caption ? local(photo.caption) : undefined,
    size: photo.size === "wide" ? "wide" : photo.size === "portrait" ? "portrait" : "standard"
  };
}

export const albums: ActivityAlbum[] = resourceAlbums.filter((album) => album.photos.length > 0).map((album) => ({
  id: album.id,
  title: local(album.title),
  subtitle: local(album.subtitle),
  description: local(album.description),
  year: "METC",
  category: local("活动成果"),
  coverPhotoId: album.photos[0].id,
  accent: album.accent,
  photos: album.photos.map(toPhoto)
}));
