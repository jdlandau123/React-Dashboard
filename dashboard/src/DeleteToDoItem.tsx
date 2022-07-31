import { IconButton } from '@chakra-ui/react';
import axios from 'axios';
import { DeleteIcon } from '@chakra-ui/icons';


export function DeleteToDoItem(props: any) {
    
    const deleteItem = () => {
        let item = document.getElementById(`item-${props.id}`);
        axios.delete(`http://127.0.0.1:8000/api/tasks/${props.id}`);
        if (item) {
            item.style.display = 'none';
        }
    }

    return (
        <IconButton aria-label='delete' icon={<DeleteIcon />} onClick={deleteItem}></IconButton>
    )
}
