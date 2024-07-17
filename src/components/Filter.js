import React, {memo, useMemo } from 'react';
import {useAppContext} from "../context/AppContext";
import axios from "axios";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";

function Filter(props) {
    const {state, dispatch} = useAppContext()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    const handleInputChange = useMemo((e) => (e) => {
        const searchItem = e.target.value;
        navigate({
            search: createSearchParams({
                search: searchItem
            }).toString()
        });

        axios
            .get('https://668da243099db4c579f386c9.mockapi.io/products', {
                params: {
                    orderBy: 'desc',
                    sortBy: 'title',
                    title: searchItem,
                    // page: 1,
                    limit: 20
                }
            })
            .then(response => {
                dispatch({
                    type: 'GET_FILTERED_PRODUCT',
                    payload: {data: response.data}
                })
            })
            .catch(error => {
                dispatch({
                    type: 'GET_PRODUCT_FAILURE',
                    payload: {error: error.message}
                })
            })

    }, [])

    return (
        <div className='filterWrapper'>
            <span>Filter by title or category</span>
            <>
                <input
                    type="text"
                    value={searchParams.get('search')}
                    onChange={handleInputChange}
                    placeholder='Type to search'
                />
            </>
        </div>
    );
}

export default memo(Filter);
