import {
  Box,
  Button,
  Center,
  ButtonGroup,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ArtworkBase } from "./Models/Artwork";
import { BaseDataAction } from "./Services/BaseDataService";
import { AiFillStar } from "react-icons/ai";
import {FiHome} from "react-icons/fi"
import { ListItem } from "./Components/ListItem";

function App() {
  const [data, setData] = useState<ArtworkBase[]>();
  const [page, setPage] = useState(1);
  const [imageApi, setImageApi] = useState("");

  useEffect(() => {
    BaseDataAction.get(page).then((response) => {
      setData(response.data.data);
      setImageApi(response.data.config.iiif_url);
      console.log(response.data);
    });
  }, [page]);

  function handleNextPage() {
    setPage((prev) => (prev += 1));
  }
  function handlePrevPage() {
    setPage((prev) => (prev -= 1));
  }

  return (
    <Box justifyContent={"center"}>
      <Box w={"100%"} bg={"orange"} p={5}>
        <Text fontSize={"lg"} as={"b"}>
          Art Institute of Chicago
        </Text>

        <Center>
          <ButtonGroup>
            <Button leftIcon={<FiHome />} variant={"ghost"}>
              Home
            </Button>
            <Button leftIcon={<AiFillStar />} variant={"ghost"}>
              Favorites
            </Button>
          </ButtonGroup>
        </Center>
      </Box>
      <Box color={"black"} padding={10}>
        <SimpleGrid columns={3} spacing={2}>
          {
            data?.map((item) => {
              return (
                <ListItem item={item} imageApi={imageApi} key={item.id}/>
              )
            })
          }
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
          <Button
            colorScheme={"orange"}
            onClick={handleNextPage}
            marginTop={10}
          >
            {"Next page"}
          </Button>
        </Center>
      </Box>
    </Box>
  );
}

export default App;
