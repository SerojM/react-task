import React, {useState} from 'react';
import axios from "axios";
import {useAppContext} from "../context/AppContext";

function ProductCard({product, product: {id, title, thumbnail, fullDescription, rating, category}}) {
    const {dispatch} = useAppContext()

    const [isMore, setIsMore] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editTitle, setEditTitle] = useState(title)

    const toggleMoreHandle = (event) => {
        event.stopPropagation()
        setIsMore(!isMore)
    };
    const nameEditHandle = (e) => {
        e.stopPropagation();
        setIsEdit(true)
    }

    const inputClickHandle = (e) => {
        e.stopPropagation();
    }

    const saveHandle = (e) => {
        const mockData = {...product, 'title': editTitle}
        e.stopPropagation();
        setIsEdit(false)
        axios
            .put(`https://668da243099db4c579f386c9.mockapi.io/products/${id}`, mockData)
            .then(response => {
                dispatch({
                    type: 'EDIT_PRODUCT_SUCCESS',
                    payload: {data: response.data, id: id}
                })
            })
            .catch(error => {
                dispatch({
                    type: 'EDIT_PRODUCT_FAILURE',
                    payload: {error: error.message}
                })
            })
    }

    const inputChangeHandle = (e) => {
        setEditTitle(e.target.value)
    }

    const deleteHandle = (e) => {
        e.stopPropagation();
        axios
            .delete(`https://668da243099db4c579f386c9.mockapi.io/products/${id}`)
            .then(async (response) => {
                dispatch({
                    type: 'DELETE_PRODUCT_SUCCESS',
                    payload: {id}
                })
            })
            .catch(error => {
                dispatch({
                    type: 'DELETE_PRODUCT_FAILURE',
                    payload: {error: error.message}
                })
            })
    }

    return (
        <div className='productCardContainer' onClick={toggleMoreHandle}>
            <span onClick={deleteHandle} className='deleteTitle'>Delete</span>
            <img className='productImage' src={thumbnail} alt={title}/>
            {isEdit ?
                <div className='editNameContainer'>
                    <input onClick={inputClickHandle} className='editNameInput' type="text" value={editTitle}
                           onChange={inputChangeHandle}/>
                    <span className='saveTitle' onClick={saveHandle}>Save</span>
                </div>
                :
                <div className='titleWrapper'>
                    <h4 className='productTitle'>{title}</h4>
                    <span className='editTitle' onClick={nameEditHandle}>Edit</span>
                </div>
            }
            <div className={`productDesc ${isMore ? 'productDescFull' : ''}`}>{fullDescription}</div>
            {isMore &&
                <div className='additionInfo'>
                    <span>Rating: {rating}</span>
                    <span>Category: {category}</span>
                </div>
            }
        </div>
    );
}

export default ProductCard;
