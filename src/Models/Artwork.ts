export type ArtworkBase = {
  id: number;
  title: string;
  thumbnail: Thumbnail;
  image_id: string
};


export type Thumbnail = {
    lqip:string,
    width: number,
    height: number,
    alt_text: string
}