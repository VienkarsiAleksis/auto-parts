import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Components/Navbar';
import Filters from './Components/Filters';
import ProductList from './Components/ProductList';
import Paginator from './Components/Pagination';
import style from './Product.module.scss';
import bg from "../../../assets/bg.webp";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { Head } from '@inertiajs/react';

const ProductPage = ({ auth }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [secondarySearchTerm, setSecondarySearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        sortBy: 'relevance',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(30);
    const [websites, setWebsites] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [excludedWebsites, setExcludedWebsites] = useState([]);
    const [mostSearched, setMostSearched] = useState([]);
    const [recentSearched, setRecentSearched] = useState([]);
    const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');

    const username = auth?.user?.name || 'guest';

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query = params.get('search');
        if (query) {
            setSearchTerm(query);
            setSecondarySearchTerm(query);
            setSubmittedSearchTerm(query);
            fetchResults(query);
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1200) {
                setResultsPerPage(20);
            } else if (window.innerWidth <= 900) {
                setResultsPerPage(15);
            } else {
                setResultsPerPage(30);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        applyFilters(results);
    }, [filters, results, excludedWebsites]);

    const fetchResults = async (term) => {
        setLoading(true);

        try {
            const response = await axios.get(`/api/fetch_data`, {
                params: {
                    search_param: term,
                    username: username
                }
            });

            if (response.status === 200) {
                const data = Array.isArray(response.data) ? response.data : [];
                setResults(data);
                setTotalResults(data.length);

                const distinctWebsites = [...new Set(data.map(item => item.website))];
                setWebsites(distinctWebsites);
                applyFilters(data);
            } else if (response.status === 202) {
                setResults([]);
                setTotalResults(0);
                setWebsites([]);
                setFilteredResults([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = (data) => {
        let filteredData = Array.isArray(data) ? [...data] : [];

        // Filtrēšana pēc meklēšanas termina
        filteredData = filteredData.filter((item) => !excludedWebsites.includes(item.website));

        // Nosaka cenas diapazonu
        const minPrice = filters.minPrice === '' || parseFloat(filters.minPrice) < 0 ? 0 : parseFloat(filters.minPrice);
        const maxPrice = filters.maxPrice === '' || parseFloat(filters.maxPrice) < 0 ? 999999 : parseFloat(filters.maxPrice);

        // Filtrēšana pēc cenas
        filteredData = filteredData.filter((item) => {
            const price = parseFloat(item.price.replace(',', '.').replace('€', ''));
            return price >= minPrice && price <= maxPrice;
        });

        // Kārtošana pēc izvēlētās kritērijas
        if (filters.sortBy === 'priceAsc') {
            filteredData.sort((a, b) => parseFloat(a.price.replace(',', '.').replace('€', '')) - parseFloat(b.price.replace(',', '.').replace('€', '')));
        } else if (filters.sortBy === 'priceDesc') {
            filteredData.sort((a, b) => parseFloat(b.price.replace(',', '.').replace('€', '')) - parseFloat(a.price.replace(',', '.').replace('€', '')));
        }

        setFilteredResults(filteredData);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSecondarySearchChange = (event) => {
        setSecondarySearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Funkcija, lai izslēgtu vietni no rezultātiem
    const handleExcludeWebsite = (website) => {
        setExcludedWebsites((prevExcluded) => [...prevExcluded, website]);
    };

    // Funkcija, lai atgrieztu vietni atpakaļ rezultātos
    const handleReturnWebsite = (website) => {
        setExcludedWebsites((prevExcluded) => prevExcluded.filter(item => item !== website));
    };

    const indexOfLastItem = currentPage * resultsPerPage;
    const indexOfFirstItem = indexOfLastItem - resultsPerPage;
    const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const newUrl = `/products?search=${encodeURIComponent(searchTerm)}`;
            window.history.pushState({}, '', newUrl);
            fetchResults(searchTerm);
            setSubmittedSearchTerm(searchTerm);
            setSecondarySearchTerm(searchTerm);
        }
    };    

    const handleSecondaryKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const newUrl = `/products?search=${encodeURIComponent(secondarySearchTerm)}`;
            window.history.pushState({}, '', newUrl);
            fetchResults(secondarySearchTerm);
            setSubmittedSearchTerm(secondarySearchTerm);
            setSearchTerm(secondarySearchTerm);
        }
    };

    const handleSecondarySearchSubmit = () => {
        const newUrl = `/products?search=${encodeURIComponent(secondarySearchTerm)}`;
        window.history.pushState({}, '', newUrl);
        fetchResults(secondarySearchTerm);
        setSubmittedSearchTerm(secondarySearchTerm);
        setSearchTerm(secondarySearchTerm);
    };

    const fetchMostSearched = async () => {
        try {
            const response = await axios.get('/api/most_searched');
            if (response.status === 200) {
                setMostSearched(response.data);
            }
        } catch (error) {
            console.error('Error fetching most searched products:', error);
        }
    };
    
    useEffect(() => {
        fetchMostSearched();
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
        <div className="flex flex-col min-h-screen bg-white">
            <Head title="ChikChing.lv | Produkti" />
            <Navbar
                auth={auth}
                searchTerm={searchTerm}
                handleChange={handleChange}
                onKeyDown={handleKeyDown}
                recentSearched={recentSearched}
            />
            <div className={style.bg}>
                <img src={bg} alt="Background" />
            </div>
            <div className={style.mainSection}>
                <Filters
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                    websites={websites}
                    excludedWebsites={excludedWebsites}
                    handleReturnWebsite={handleReturnWebsite}
                    handleExcludeWebsite={handleExcludeWebsite}
                    searchTerm={searchTerm}
                    handleChange={handleChange}
                    onKeyDown={handleKeyDown}
                    recentSearched={recentSearched}
                    auth={auth}
                />
                <div className="w-full bg-white">
                    {totalResults > 0 && (
                        <div className={style.resultsHeader}>
                            <div className={style.resultsInfo}>
                                <p className={style.total}>
                                    Meklēšanas rezultāti priekš: "{submittedSearchTerm}" <span>({totalResults})</span>
                                </p>
                                
                                {/* Otrais meklēšanas ievadlauks */}
                                <div className={style.secondarySearchContainer}>
                                    <div className={style.secondarySearchInput}>
                                        <input
                                            type="text"
                                            value={secondarySearchTerm}
                                            onChange={handleSecondarySearchChange}
                                            onKeyDown={handleSecondaryKeyDown}
                                            className={style.secondarySearchField}
                                            placeholder="Meklēt citu..."
                                        />
                                        <button 
                                            onClick={handleSecondarySearchSubmit}
                                            className={style.secondarySearchButton}
                                        >
                                            <FaSearch />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* "Cilvēki ari meklēja" sekcija */}
                            <div className={style.alsoSearchedSection}>
                                <p className={style.also}>Citi meklēja arī:</p>
                                <div className={style.mostSearchedList}>
                                    {mostSearched.length > 0 ? (
                                        mostSearched.map((item, index) => (
                                            <div key={index} className={style.mostSearchedItem}>
                                                <a href={`/products?search=${encodeURIComponent(item.search_param)}`}>
                                                    <CiSearch /> {item.search_param}
                                                </a>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Nav citu populāru meklējumu šobrīd.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                
                    <ProductList results={currentItems} loading={loading} />

                    {filteredResults.length > 0 && totalPages > 1 && (
                        <Paginator
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;