import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Heading,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { ArtworkBase } from "../Models/Artwork";

export function ListItem({
  item,
  imageApi,
}: {
  item: ArtworkBase;
  imageApi: string;
}) {
  const [favorite, setFavorite] = useState(false);

  function setFav() {
    setFavorite(!favorite);
  }
  return (
    <Card key={item.id} margin={5} borderColor={"orange"} border={"1px"}>
      <CardBody>
        <Heading size={"sm"} mt={3} textAlign={"center"} mb={5}>
          {item.title}
        </Heading>
        <Center>
          {item.image_id && (
            <Image
              borderRadius={"lg"}
              src={imageApi + "/" + item.image_id + "/full/843,/0/default.jpg"}
              h={200}
            />
          )}
        </Center>
      </CardBody>
      <Divider />
      <CardFooter justifyContent={"center"}>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="orange">
            Details
          </Button>
          <Button
            onClick={setFav}
            leftIcon={favorite ? <AiFillStar /> : <AiOutlineStar />}
            variant="solid"
            colorScheme="orange"
          >
            Add to favorites
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
