import {
  ChakraProvider,
  Box,
  theme,
  Heading
} from "@chakra-ui/react"
import { Weather } from './Weather';
import { Gmail } from "./Gmail";
import { ToDoList } from "./ToDoList";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl" maxH='100%'>
      <Heading size='2xl' style={{marginBottom:'15px', marginTop:'15px'}}>Personal Dashboard</Heading>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', paddingTop:'10px'}}>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', width:'40%', marginLeft:'5%'}}>
          <Weather />
          <br />
          <Gmail />
        </div>
        <div style={{width:'60%'}}>
          <ToDoList />
        </div>
      </div>
    </Box>
  </ChakraProvider>
)
