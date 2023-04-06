import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdLocalShipping } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ArtworkDetails } from "../Models/Artwork";
import { DetailsAction } from "../Services/DetailsService";
import { RootState } from "../store";

import { setImageApi } from "../store/Artworks/artworksSlice";
import { remove, add } from "../store/Favorites/favoritesSlice";

export function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState<ArtworkDetails>();
  const imageApi = useSelector((state: RootState) => state.artwork.imageApi);
  const dispatch = useDispatch();

  useEffect(() => {
    DetailsAction.getDetails(Number(id))
      .then((response) => {
        dispatch(setImageApi({ imageApi: response.data.config.iiif_url }));
        setDetails(response.data.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const favorites = useSelector(
    (state: RootState) => state.favorite.artworkIds
  );
  const isFavorite = details && favorites.includes(details.id);

  function setFav() {
    isFavorite ? dispatch(remove(details.id)) : (details && dispatch(add(details.id)));
  }

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 1 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Center>
          <Image
            rounded={"md"}
            alt={"artwork image"}
            src={
              imageApi + "/" + details?.image_id + "/full/843,/0/default.jpg"
            }
            fit={"cover"}
            align={"center"}
            // w={"100%"}
            // h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Center>

        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {details?.title}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {details?.artist_display}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>{details?.provenance_text}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Exhibitions
              </Text>

              <Text fontSize={"lg"}>{details?.exhibition_history}</Text>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Artwork Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Date:
                  </Text>{" "}
                  {details?.date_display}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Artist:
                  </Text>{" "}
                  {details?.artist_display}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Place of origin:
                  </Text>{" "}
                  {details?.place_of_origin}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Gallery:
                  </Text>{" "}
                  {details?.gallery_title}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Dimension:
                  </Text>{" "}
                  {details?.dimensions}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Department:
                  </Text>{" "}
                  {details?.department_title}
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            onClick={setFav}
            leftIcon={isFavorite ? <AiFillStar /> : <AiOutlineStar />}
            colorScheme={"orange"}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Add to favorites
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
