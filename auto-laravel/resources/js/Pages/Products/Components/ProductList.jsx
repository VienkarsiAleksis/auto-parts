import React from 'react';
import ProductItem from './ProductItem';
import style from '../Product.module.scss';

const ProductList = ({ results, loading }) => {
    return (
        <div className={style.productOutput}>
            {loading ? (
                <div className={style.loadingContainer}>
                    <div className={style.spinner}></div>
                    <p>Gathering data, please wait...</p>
                </div>
            ) : results.length > 0 ? (
                <div className={style.products}>
                    {results.map((item, index) => (
                        <ProductItem key={index} item={item} />
                    ))}
                </div>
            ) : (
                <p>No results found. Try searching for something else!</p>
            )}
        </div>
    );
};

export default ProductList;
