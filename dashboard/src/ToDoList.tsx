import {
    Box, 
    Button, 
    Heading, 
    Center,
    FormControl,
    Input
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DeleteToDoItem } from './DeleteToDoItem';

export function ToDoList() {
    const [items, setItems] = useState(Array<any>);
    const [newItemName, setNewItemName] = useState("New Item");
    const [newItemDesc, setNewItemDesc] = useState("");

    const getToDoItems = () => {
        let itemsList: any[] = [];

        axios.get('http://127.0.0.1:8000/api/tasks/').then((results) => {
            results.data.forEach((i: any) => {
                itemsList.push(i);
            });
            setItems(itemsList);
        })
    }

    useEffect(() => {
        getToDoItems();
    }, [])



    const createNewTask = () => {
        axios.post('http://127.0.0.1:8000/api/tasks/', {
            name: newItemName,
            description: newItemDesc,
            complete: false
        }).then((res) => {
            console.log(res);
        })
    }

    return (
        <Center>
            <Box bg='blue.100' opacity='92%' fontSize='lg' textAlign='center' w='80%' borderWidth='1px' borderRadius='lg' boxShadow='dark-lg'
                minH='640px'>
                <Heading size='lg'>To-Do List</Heading>
                <form onSubmit={createNewTask}>
                    <FormControl p='10px' isRequired borderColor='black'>
                        <Input bg='white' placeholder='Task Name' size='sm' borderRadius='lg'
                            onChange={({target}) => setNewItemName(target.value)}></Input>
                    </FormControl>
                    <FormControl p='10px' borderColor='black'>
                        <Input bg='white' placeholder='Description' size='sm' borderRadius='lg'
                            onChange={({target}) => setNewItemDesc(target.value)}></Input>
                    </FormControl>
                    <Button type='submit' colorScheme='purple'>
                        Create New Task
                    </Button>
                </form>
                <br />
                <div style={{display:'flex',flexDirection:'column', rowGap:'5px', maxHeight:'420px', overflowY:'scroll'}}>
                {items.map((item: any) => (
                    <Center>
                        <Box id={`item-${item.id}`} bg='white' textAlign='center' borderColor='black' borderWidth='1px' borderRadius='lg' w='90%' p='5px'>
                            <Heading size='md'>{item.name}</Heading>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>
                                <p>{item.description}</p>
                                <DeleteToDoItem id={item.id} />
                            </div>
                        </Box>
                    </Center>
                ))}
                </div>
            </Box>
        </Center>
    )
}