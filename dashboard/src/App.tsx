import * as React from "react"
import {
  ChakraProvider,
  Box,
  theme,
} from "@chakra-ui/react"
// import { ColorModeSwitcher } from "./ColorModeSwitcher" Add this back in later or make custom version
import {Weather} from './Weather';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <h1 style={{fontSize:'24pt', marginBottom:'15px', marginTop:'15px'}}>Personal Dashboard</h1>
      <Weather />
    </Box>
  </ChakraProvider>
)
