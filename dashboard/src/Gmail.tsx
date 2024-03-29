import {Box, Button, Heading, Center} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

export function Gmail() {
    const [hasToken, setHasToken] = useState(false);
    const [messageIds, setMessageIds] = useState([]);
    const [messageText, setMessageText] = useState([]);

    let messageData: any = [];
    
    const queryGmail = () => {
        const url = new URL(window.location.href);
        const urlToken = url.hash.split('&')[0];
        const token = urlToken.split('=')[1];

        axios.get(`https://gmail.googleapis.com/gmail/v1/users/jdlandau123@gmail.com/messages?includeSpamTrash=false&maxResults=5`, {
            headers: {
                Authorization: "Bearer " + token
            }}).then((response) => {
                let initMessages: any = [];
                response.data.messages.forEach((i: any) => {
                    initMessages.push(i.id);
                    getMessageFromId(i.id, token);
                })
                setHasToken(true);
                setMessageIds(initMessages);
                setMessageText(messageData);
        })
    }

    const getMessageFromId = (id: string, token: string) => {
        axios.get(`https://gmail.googleapis.com/gmail/v1/users/jdlandau123@gmail.com/messages/${id}`,{
            headers: {
                Authorization: "Bearer " + token
            }}).then((response) => {
                let subject = response.data.payload.headers.find((i: any) => i.name === 'Subject')['value'];
                let from = response.data.payload.headers.find((i: any) => i.name === 'From')['value'];
                messageData.push({Subject: subject, From: from, key: id});
            })
    }

    useEffect(() => {
        if (!hasToken) {
            if (window.location.href.includes('access_token')) {
                queryGmail();
            }
        }
    }, [hasToken, setHasToken]);

    return (
        <Box bg='green.100' opacity='92%' fontSize='lg' textAlign='center' borderWidth='1px' borderRadius='lg' boxShadow='dark-lg'
            minH='300px' maxH='300px'>
            <Heading size='lg'>Gmail</Heading>
            {!hasToken ?
            <Center h='80%'>
                <Button leftIcon={<FaGoogle />} variant='solid' colorScheme='green' id='gmail-log-in-button'>
                    <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/gmail.modify&response_type=token&redirect_uri=http%3A//localhost%3A3000&client_id=518083156653-edtc9dalc8a48ed6f9ml20ucimlr8fch.apps.googleusercontent.com">
                        Log in to Google Account
                    </a>
                </Button> 
            </Center> : null}
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',
                maxHeight:'250px', overflowY:'scroll'}}>
                {messageText.slice(0, 6).map((message: any) => (
                    <Box bg='white' textAlign='center' borderWidth='1px' borderRadius='lg' w='90%'
                        _hover={{backgroundColor:'lightgrey', cursor:'pointer'}} key={message.key}>
                        <a href='https://mail.google.com/mail' target='blank'>
                            <p>Subject: {message.Subject}</p>
                            <p>From: {message.From}</p>
                        </a>
                    </Box>
                ))}
            </div>
        </Box>
    )
}