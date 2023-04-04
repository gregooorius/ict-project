import { SimpleGrid, Center, Button, Box, Input } from "@chakra-ui/react";
import { ArtworkBase } from "../Models/Artwork";
import { useEffect, useState } from "react";
import { ListItem } from "../Components/ListItem";
import { SearchAction } from "../Services/SearchService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { add, search, setImageApi } from "../store/Artworks/artworksSlice";

export function Home() {
  const artwork = useSelector((state: RootState) => state.artwork);
  const searchTerm = useSelector(
    (state: RootState) => state.artwork.searchTerm
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchTermInput, setSearch] = useState(searchTerm);
  const handleChange = (event: any) => setSearch(event.target.value);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();
    if (!artwork.pages.some((p) => p.pageNumber === page)) {
      SearchAction.search(page, artwork.searchTerm, controller).then(
        (response) => {
          if (isActive) {
            dispatch(add({ pageNumber: page, artworks: response.data.data }));
            dispatch(setImageApi({ imageApi: response.data.config.iiif_url }));
            console.log(response.data);
          }
        }
      );
    }
    return () => {
      isActive = false;
      controller.abort();
    };
  }, [page, searchTerm]);

  function handleNextPage() {
    setPage(page + 1);
  }
  function handlePrevPage() {
    setPage(page - 1);
  }

  const handleSearch = async () => {
    dispatch(search({ searchTerm: searchTermInput }));
    setPage(1);
  };

  return (
    <Box color={"black"} padding={5}>
      <Center mb={5} gap={5}>
        <Input
          placeholder="Search..."
          variant="filled"
          colorScheme="orange"
          w={"40%"}
          value={searchTermInput}
          onChange={handleChange}
        />
        <Button onClick={handleSearch} colorScheme={"orange"}>
          Search
        </Button>
      </Center>
      <SimpleGrid columns={3} spacing={2}>
        {artwork.pages
          .find((p) => p.pageNumber === page)
          ?.artworks.map((item) => {
            return (
              <ListItem item={item} imageApi={artwork.imageApi} key={item.id} />
            );
          })}
      </SimpleGrid>
      <Center gap={5}>
        <Button
          isDisabled={page == 1}
          colorScheme={"orange"}
          onClick={handlePrevPage}
          marginTop={10}
        >
          {"Previous page"}
        </Button>
        <Button colorScheme={"orange"} onClick={handleNextPage} marginTop={10}>
          {"Next page"}
        </Button>
      </Center>
    </Box>
  );
}
