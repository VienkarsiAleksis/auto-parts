import React from 'react';
import ProductItem from './ProductItem';
import style from '../Product.module.scss';

const ProductList = ({ results, loading }) => {
    return (
        <div className={style.productOutput}>
            {loading ? (
                <div className={style.loadingContainer}>
                    <div className={style.spinner}></div>
                    <p>Notiek datu apkopošana, lūdzu, uzgaidiet...</p>
                </div>
            ) : results.length > 0 ? (
                <div className={style.products}>
                    {results.map((item, index) => (
                        <ProductItem key={index} item={item} />
                    ))}
                </div>
            ) : (
                <p>Nav atrasts neviens rezultāts. Mēģiniet meklēt kaut ko citu!</p>
            )}
        </div>
    );
};

export default ProductList;
