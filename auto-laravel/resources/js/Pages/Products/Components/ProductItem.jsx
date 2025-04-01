import React, { useState } from 'react';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import style from '../Product.module.scss';
import { CiHeart } from "react-icons/ci";
import Alert from '../../Components/Alert';

const ProductItem = ({ item }) => {
    const { auth } = usePage().props;
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [alertColor, setAlertColor] = useState('green');
    const [isAnimating, setIsAnimating] = useState(false);

    const formattedPrice = item.price.includes('€') ? item.price : `${item.price} €`;

    const handleSaveProduct = async (event) => {
        event.preventDefault(); // Prevent the default action of the link
        event.stopPropagation(); // Prevent the <a> link from being triggered

        setIsAnimating(true);
        
        // Reset animation after a delay
        setTimeout(() => {
            setIsAnimating(false);
        }, 500);

        if (!auth.user) {
            setShowAlert(true);
            setMessage('Lūdzu ieraksties, lai saglabātu produktu!');
            setAlertColor('red');
            return;
        }

        try {
            const response = await axios.post('/api/save-product', {
                picture_url: item.img,
                title: item.desc,
                website: item.website,
                price: parseFloat(item.price.replace(',', '.').replace('€', '')),
                user_id: auth.user.id,
                link: item.link,
            });

            if (response.status === 200) {
                setShowAlert(true);
                setMessage('Produkts tika saglabāts veiksmīgi!');
                setAlertColor('green');
                return;
            }
        } catch (error) {
            setShowAlert(true);
            setMessage('Produkts netika saglabāts!');
            setAlertColor('red');
            return;
        }
    };

    return (
        <>
            {showAlert && <Alert message={message} onClose={() => setShowAlert(false)} color={alertColor} />}
            <div className={style.item}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <div className={style.imageContainer}>
                        <img srcSet={item.img} alt={item.desc} loading="lazy" />
                    </div>
                    <div className={style.info}>
                        <p className={style.name}>{item.desc}</p>
                        <p className={style.website}>{item.website}</p>
                        <div className={style.priceContainer}>
                            <p className={style.price}>{formattedPrice}</p>
                            <button className={`${style.saveButton} ${isAnimating ? style.animateSave : ''}`}
                                aria-label="Save product" onClick={handleSaveProduct}>
                                <CiHeart size={28} className={style.heartIcon}/>
                            </button>
                        </div>
                    </div>
                </a>
            </div>
        </>
    );
};

export default ProductItem;