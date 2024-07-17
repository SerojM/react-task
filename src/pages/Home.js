import React, {lazy, Suspense, useMemo} from 'react';
import Loading from "../components/Loading";

function Home(props) {
    const ProductList = useMemo(() => lazy(() => import('../../src/components/ProductList')), []);

    return (
        <div className='homeWrapper'>
            <h1 className='homeTitle' >Product List</h1>
            <Suspense fallback={<Loading />}>
                <ProductList />
            </Suspense>
        </div>

    );
}

export default Home;
