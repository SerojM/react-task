import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import ProductCard from "./ProductCard";
import {useAppContext} from "../context/AppContext";
import axios from "axios";
import CreateItem from "./CreateItem";
import Filter from "./Filter";
import { useSearchParams} from "react-router-dom";

function ProductList() {
    const {state, dispatch} = useAppContext()
    const [page, setPage] = useState(1)
    const [searchParams] = useSearchParams();
    useEffect(() => {
        getProduct();
    }, [page])


    useEffect(() => {

        const scrollHandler = async (e) => {
            const scrollHeight = e.target.documentElement.scrollHeight
            const currentHeight = e.target.documentElement.scrollTop + window.innerHeight
            if ((currentHeight + 1 >= scrollHeight) && 5 > page) {
                const currentPage = page + 1
                setPage(currentPage)
            }
        }
        document.addEventListener("scroll", scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);
    }, [page])


    const getProduct = useCallback(async () => {
        await axios
            .get('https://668da243099db4c579f386c9.mockapi.io/products', {
                params: {
                    orderBy: 'desc',
                    sortBy: 'title',
                    title: searchParams.get('search'),
                    page: page,
                    limit: 20
                }
            })
            .then(response => {
                dispatch({
                    type: 'GET_PRODUCT_SUCCESS',
                    payload: {data: response.data}
                })
            })
            .catch(error => {
                dispatch({
                    type: 'GET_PRODUCT_FAILURE',
                    payload: {error: error.message}
                })
            })

    }, [page])

    return (
        <div className='productCardWrapper'>
            <div className='productCardWrapper'>
                <CreateItem/>
                <Filter/>
            </div>
            {/*Connect Virtualization plugin*/}
            <div className="listWrapper">
                {state.products.map((product, index) => {
                    return <ProductCard product={product} key={product.id}/>
                })}
            </div>
        </div>
    );
}

export default memo(ProductList);
