import React, { useState, useEffect } from 'react';
import { Head, usePage} from '@inertiajs/react';
import axios from 'axios';
import style from "./SavedProducts.module.scss";
import Alert from '../Components/Alert';
import Navbar from './Components/Navbar';

const SavedProductsPage = () => {
    const { auth, savedProducts: initialSavedProducts = [] } = usePage().props; // Get auth and initial saved products from props
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

    const handleDelete = async (productId) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await axios.delete(`/api/saved-products/${productId}`);
            if (response.status === 200) {
                setSavedProducts(savedProducts.filter(product => product.id !== productId));
                addAlert('Produkts tika veiksmīgi izdzēsts!', 'green');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            addAlert('Produkts netika izdzēsts!', 'red');
        }
    };

    const handleDeleteSelected = async () => {
        try {
            const response = await axios.post('/api/delete-selected-products', {
                productIds: selectedProducts,
            });
            if (response.status === 200) {
                setSavedProducts(savedProducts.filter(product => !selectedProducts.includes(product.id)));
                setSelectedProducts([]);
                addAlert('Atlasītie produkti tika veiksmīgi izdzēsti!', 'green');
            }
        } catch (error) {
            console.error('Error deleting selected products:', error);
            addAlert('Atlasītie produkti netika izdzēsti!', 'red');
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
        setAlerts((prevAlerts) => {
            const newAlerts = [...prevAlerts, { message, color }];
            if (newAlerts.length > 3) {
                newAlerts.shift(); // Remove the oldest alert if there are more than 3
            }
            return newAlerts;
        });
    };

    const handleCloseAlert = (index) => {
        setAlerts((prevAlerts) => prevAlerts.filter((_, i) => i !== index));
    };

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchRecentSearched = async () => {
        // Check if the user is a guest
        if (!auth?.user?.name) {
            console.log("Guest user. Skipping recent search fetch.");
            return; // Exit if the user is a guest
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
            <Head title="ChikChing.lv | Saglabātie produkti" />
            <div className={style.alertContainer}>
                {alerts.map((alert, index) => (
                    <Alert key={index} message={alert.message} onClose={() => handleCloseAlert(index)} color={alert.color} />
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
                <h1 className={style.title}>Saved Products</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : savedProducts.length > 0 ? (
                    <>
                        <button
                            className={style.deleteSelectedButton}
                            onClick={handleDeleteSelected}
                            disabled={selectedProducts.length === 0}
                        >
                            Delete Selected
                        </button>
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
                                    <div className='flex flex-col items-center m-auto mb-10 gap-2'>
                                    <p className={style.productPrice}>{product.price} €</p>
                                    <button
                                        className={style.removeButton}
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Remove
                                    </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className={style.noProducts}>Tev nav saglabātu produktu.</p>
                )}
            </div>
        </>
    );
};

export default SavedProductsPage;