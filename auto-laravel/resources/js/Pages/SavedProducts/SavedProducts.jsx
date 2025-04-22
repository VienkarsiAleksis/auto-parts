import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import style from "./SavedProducts.module.scss";
import Alert from '../Components/Alert';
import Navbar from './Components/Navbar';

const SavedProductsPage = () => {
    const { auth, savedProducts: initialSavedProducts = [] } = usePage().props;
    const [savedProducts, setSavedProducts] = useState(initialSavedProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [recentSearched, setRecentSearched] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alerts, setAlerts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            window.location.href = `/products?search=${encodeURIComponent(searchTerm)}`;
        }
    };

    const fetchResults = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`/api/saved-products`, {
                params: {
                    user_id: auth.user.id,
                }
            });

            if (response.status === 200) {
                const data = Array.isArray(response.data.savedProducts) ? response.data.savedProducts : [];
                setSavedProducts(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId, event) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        try {
            const response = await axios.delete(`/api/saved-products/${productId}`);
            if (response.status === 200) {
                setSavedProducts(savedProducts.filter(product => product.id !== productId));
                addAlert('Product successfully removed!', 'green');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            addAlert('Failed to remove product!', 'red');
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedProducts.length === 0) return;
        
        try {
            const response = await axios.post('/api/delete-selected-products', {
                productIds: selectedProducts,
            });
            if (response.status === 200) {
                setSavedProducts(savedProducts.filter(product => !selectedProducts.includes(product.id)));
                setSelectedProducts([]);
                addAlert('Selected products successfully removed!', 'green');
            }
        } catch (error) {
            console.error('Error deleting selected products:', error);
            addAlert('Failed to remove selected products!', 'red');
        }
    };

    const handleSelectProduct = (productId) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId)
                : [...prevSelected, productId]
        );
    };

    const addAlert = (message, color) => {
        const id = Date.now();
        setAlerts((prevAlerts) => {
            const newAlerts = [...prevAlerts, { id, message, color }];
            if (newAlerts.length > 3) {
                newAlerts.shift(); // Noņem pirmo elementu, ja ir vairāk par 3
            }
            return newAlerts;
        });
        
        // Automātiski izdzēš alert pēc 5 sekundēm
        setTimeout(() => {
            setAlerts(current => current.filter(alert => alert.id !== id));
        }, 5000);
    };

    const handleCloseAlert = (alertId) => {
        setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== alertId));
    };

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchRecentSearched = async () => {
        if (!auth?.user?.name) {
            return;
        }

        try {
            const response = await axios.get('/api/recent-searches', {
                params: { username: auth.user.name }
            });
            if (response.status === 200) {
                setRecentSearched(response.data);
            }
        } catch (error) {
            console.error('Error fetching recent searches:', error);
        }
    };

    useEffect(() => {
        fetchRecentSearched();
    }, []);

    return (
        <>
            <Head title="ChikChing.lv | Saved Products" />
            <div className={style.alertContainer}>
                {alerts.map((alert) => (
                    <Alert 
                        key={alert.id} 
                        message={alert.message} 
                        onClose={() => handleCloseAlert(alert.id)} 
                        color={alert.color} 
                    />
                ))}
            </div>
            <Navbar
                auth={auth}
                searchTerm={searchTerm}
                handleChange={handleChange}
                onKeyDown={handleKeyDown}
                recentSearched={recentSearched}
            />
            <div className={style.container}>
                <h1 className={style.title}>Saglabātie produkti</h1>
                
                {loading ? (
                    <div className="flex justify-center my-8">
                        <div className="loader"></div>
                    </div>
                ) : savedProducts.length > 0 ? (
                    <>
                        <div className="text-right mb-6">
                            <button
                                className={style.deleteSelectedButton}
                                onClick={handleDeleteSelected}
                                disabled={selectedProducts.length === 0}
                            >
                                Izdzēst atlasītos ({selectedProducts.length})
                            </button>
                        </div>
                        <div className={style.productsGrid}>
                            {savedProducts.map(product => (
                                <div key={product.id} className={style.productCard}>
                                    <div className={style.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            className={style.checkbox}
                                            checked={selectedProducts.includes(product.id)}
                                            onChange={() => handleSelectProduct(product.id)}
                                        />
                                    </div>
                                    <a href={product.link} className={style.productLink}>
                                        <img src={product.picture_url} alt={product.title} className={style.productImage} />
                                        <div className={style.productInfo}>
                                            <h2 className={style.productTitle}>{product.title}</h2>
                                            <p className={style.productWebsite}>{product.website}</p>
                                        </div>
                                    </a>
                                    <div className={style.productPriceContainer}>
                                        <p className={style.productPrice}>{product.price} €</p>
                                        <button
                                            className={style.removeButton}
                                            onClick={(e) => handleDelete(product.id, e)}
                                        >
                                            Izdzēst
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className={style.noProducts}>Tev vēl nav saglabāts neviens produkts.</p>
                )}
            </div>
        </>
    );
};

export default SavedProductsPage;