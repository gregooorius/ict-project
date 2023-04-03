import { SimpleGrid, Center, Button, Box, Input } from "@chakra-ui/react";
import { ArtworkBase } from "../Models/Artwork";
import { useEffect, useState } from "react";
import { ListItem } from "../Components/ListItem";
import { BaseDataAction } from "../Services/BaseDataService";
import { SearchAction } from "../Services/SearchService";

export function Home() {
  const [data, setData] = useState<ArtworkBase[]>();
  const [imageApi, setImageApi] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const handleChange = (event: any) => setSearch(event.target.value);

  useEffect(() => {
    SearchAction.search(page, search).then((response) => {
      setData(response.data.data);
      setImageApi(response.data.config.iiif_url);
      console.log(response.data);
    });
  }, [page]);

  function handleNextPage() {
    setPage(page + 1);
  }
  function handlePrevPage() {
    setPage(page - 1);
  }

  const handleSearch = async () => {
    await SearchAction.search(1, search)
    .then((response) => {
        setData(response.data.data)
        console.log(response.data);
    });
  };

  return (
    <Box color={"black"} padding={5}>
      <Center mb={5} gap={5}>
        <Input
          placeholder="Search..."
          variant="filled"
          colorScheme="orange"
          w={"40%"}
          value={search}
          onChange={handleChange}
        />
        <Button onClick={handleSearch} colorScheme={"orange"}>
          Search
        </Button>
      </Center>
      <SimpleGrid columns={3} spacing={2}>
        {data?.map((item) => {
          return <ListItem item={item} imageApi={imageApi} key={item.id} />;
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
