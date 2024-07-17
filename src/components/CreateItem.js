import React, {memo, useCallback, useState} from 'react';
import axios from "axios";
import {useAppContext} from "../context/AppContext";

function CreateItem() {
    const [isNewItem, setIsNewItem] = useState(false);
    const [newItem, setNewItem] = useState({title: '', fullDescription: '', thumbnail: '', rating: '' , category: ''})
    const {state, dispatch} = useAppContext()

    const toggleCreate = () => {
        setIsNewItem(!isNewItem)
    }

    const changeHandle = (event) => {
        const {target: { name, value }} = event;
        setNewItem({...newItem, [name]: value})
    };

    const createHandle = async () => {
        const data = {...newItem, createdAt: new Date()}
        await axios.post(`https://668da243099db4c579f386c9.mockapi.io/products`, data).then(async (response) => {
            dispatch({
                type: 'CREATE_PRODUCT_SUCCESS',
                payload: {data: response.data}
            })
        })
            .catch(error => {
                alert(error.response.data)
            })

    }


    return (
        <>
            {!isNewItem && <span className='createTitle' onClick={toggleCreate}>Create new item</span>}
            {isNewItem &&
                <div className='createInputWrapper'>
                    <input placeholder='Thumbnail Url'  type="text" name='thumbnail' className="createInput" value={newItem.thumbnail} onChange={changeHandle}/>
                    <input placeholder='Title' name='title' type="text" className="createInput" value={newItem.title}  onChange={changeHandle}/>
                    <input placeholder='Description' name='fullDescription' type="text" className="createInput" value={newItem.fullDescription}  onChange={changeHandle}/>
                    <input placeholder='Rating' type="text" name='rating' className="createInput" value={newItem.rating}  onChange={changeHandle}/>
                    <input placeholder='Category' type="text" name='category' className="createInput" value={newItem.category}  onChange={changeHandle}/>
                    <span className='saveItem' onClick={createHandle}>Create</span>
                    <span className='cancelItem' onClick={() => setIsNewItem(false)}>Cancel</span>
                </div>
            }
        </>
    );
}

export default memo(CreateItem);
