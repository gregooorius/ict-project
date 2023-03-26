import { Box, Center } from "@chakra-ui/react";
import { useState } from "react";
import SimpleSidebar from "./Components/SideBar";

function App() {
  return (
    // <Box bg="tomato" p={4} color="white">
    //   <Center>This is new</Center>
    // </Box>
    <SimpleSidebar children={undefined}/>
  );
}

export default App;
