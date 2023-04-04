import { SimpleGrid, Box } from "@chakra-ui/react";
import { ListItem } from "../Components/ListItem";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ArtworkBase } from "../Models/Artwork";

export function Favorites() {
  const pages = useSelector((state: RootState) => state.artwork.pages);
  const imageApi = useSelector((state: RootState) => state.artwork.imageApi);
  const favorites = useSelector((state: RootState) => state.favorite);

  console.log(favorites);
  const artWorks = pages.reduce((acc, curr) => {
    acc.push(...curr.artworks);
    return acc;
  }, [] as ArtworkBase[]);

  const favArtworks = artWorks.filter((item) =>
    favorites.artworkIds.includes(item.id)
  );

  return (
    <Box color={"black"} padding={5}>
      <SimpleGrid columns={3} spacing={2}>
        {favArtworks.map((item) => {
          return <ListItem item={item} imageApi={imageApi} key={item.id} />;
        })}
      </SimpleGrid>
    </Box>
  );
}
