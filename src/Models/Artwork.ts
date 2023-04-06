export type ArtworkBase = {
  id: number;
  title: string;
  thumbnail: Thumbnail;
  image_id: string;
  page: number;
};

export type Thumbnail = {
  lqip: string;
  width: number;
  height: number;
  alt_text: string;
};

export type ArtworkDetails = {
  id: number;
  artist_display: string;
  classification_title: string;
  date_display: string;
  exhibition_history: string;
  image_id: string;
  provenance_text: string;
  title: string;
  gallery_title: string;
  place_of_origin: string;
  dimensions: string;
  department_title: string;
};
