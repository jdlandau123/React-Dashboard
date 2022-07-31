import {
  ChakraProvider,
  Box,
  theme,
  Heading
} from "@chakra-ui/react"
// import { ColorModeSwitcher } from "./ColorModeSwitcher" Add this back in later or make custom version
import { Weather } from './Weather';
import { Gmail } from "./Gmail";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl" maxH='100%'>
      <Heading size='2xl' style={{marginBottom:'15px', marginTop:'15px'}}>Personal Dashboard</Heading>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', paddingTop:'10px', minHeight:'300px'}}>
        <Weather />
        <Gmail />
      </div>
      <br />
      {/* Add To-do list here */}
    </Box>
  </ChakraProvider>
)
