import React from 'react';
import {Link} from "react-router-dom";

function ProductCard({product: {id}}) {
    return (
        <Link to={`product/${id}`} className='productCardContainer'>

        </Link>
    );
}

export default ProductCard;
