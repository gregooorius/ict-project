import {
  Box,
  Button,
  Center,
  ButtonGroup,
  Text,
  Input,
} from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <Box justifyContent={"center"}>
      <Box w={"100%"} bg={"orange"} p={4}>
        <Box>
          <Text fontSize={"lg"} as={"b"}>
            Art Institute of Chicago
          </Text>

          <Center>
            <ButtonGroup>
              <Link to={"/"}>
                <Button leftIcon={<FiHome />} variant={"ghost"}>
                  Home
                </Button>
              </Link>
              <Link to={"favorites"}>
                <Button leftIcon={<AiFillStar />} variant={"ghost"}>
                  Favorites
                </Button>
              </Link>
            </ButtonGroup>
          </Center>
        </Box>
      </Box>
     
      <Outlet />
    </Box>
  );
}

export default App;
