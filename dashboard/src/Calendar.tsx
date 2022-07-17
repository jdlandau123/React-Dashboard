import {Box, Heading} from '@chakra-ui/react';

export function Calendar() {
    return (
        <Box bg='green.200' fontSize='lg' textAlign='center' borderWidth='1px' borderRadius='lg' w='50%' h='300px' mr='7%' boxShadow='dark-lg'>
            <Heading size='lg' pb='5px'>Calendar</Heading>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'85%'}}>
                <iframe src="https://calendar.google.com/calendar/embed?src=jdlandau123%40gmail.com&ctz=America%2FDenver"
                    style={{height:'100%', width:'95%'}}></iframe>
            </div>
        </Box>
    )
}