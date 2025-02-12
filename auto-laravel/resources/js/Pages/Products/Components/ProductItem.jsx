import React from 'react';
import style from '../Product.module.scss';

const ProductItem = ({ item }) => {
    const formattedPrice = item.price.includes('€') ? item.price : `${item.price} €`;

    return (
        <a className={style.item} href={item.link} target="_blank" rel="noopener noreferrer">
            <div className={style.imageContainer}>
                <img srcSet={item.img} alt={item.desc} loading="lazy" />
            </div>
            <div className={style.info}>
                <p className={style.name}>{item.desc}</p>
                <p className={style.website}>{item.website}</p>
                <p className={style.price}>{formattedPrice}</p>
            </div>
        </a>
    );
};

export default ProductItem;
