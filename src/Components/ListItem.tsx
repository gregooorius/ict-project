import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Heading,
  Image,
} from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArtworkBase } from "../Models/Artwork";
import { RootState } from "../store";
import { add, remove } from "../store/Favorites/favoritesSlice";

export function ListItem({
  item,
  imageApi,
}: {
  item: ArtworkBase;
  imageApi: string;
}) {
  const favorites = useSelector(
    (state: RootState) => state.favorite.artworkIds
  );

  const isFavorite = favorites.includes(item.id);

  const dispatch = useDispatch();

  function setFav() {
    isFavorite ? dispatch(remove(item.id)) : dispatch(add(item.id));
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
          <Link to={"/artwork/" + item.id} state={{ imageApi: imageApi }}>
            <Button variant="solid" colorScheme="orange">
              Details
            </Button>
          </Link>

          <Button
            onClick={setFav}
            leftIcon={isFavorite ? <AiFillStar /> : <AiOutlineStar />}
            variant="solid"
            colorScheme="orange"
          >
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
