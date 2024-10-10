import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Components/Navbar';
import Filters from './Components/Filters';
import ProductList from './Components/ProductList';
import Paginator from './Components/Pagination';
import style from './Product.module.scss';

const ProductPage = ({ auth }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        minPrice: '', // Initial values set to empty strings
        maxPrice: '',
        sortBy: 'relevance',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage] = useState(40);
    const [websites, setWebsites] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [searchCompleted, setSearchCompleted] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query = params.get('search');
        if (query) {
            setSearchTerm(query);
            fetchResults(query);
        }
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query = params.get('search_param'); // Changed from 'search' to 'search_param'
        if (query) {
            setSearchTerm(query);
            fetchResults(query);
        }
    }, []);

    useEffect(() => {
        applyFilters(results); // Call applyFilters whenever results or filters change
    }, [filters, results]);

    const fetchResults = async (term) => {
        setLoading(true);
        setSearchCompleted(false);

        try {
            const response = await axios.get(`http://localhost:8000/api/fetch_data`, {
                params: { 
                    search_param: term,
                    username: auth.user.name // Pass the username
                }

            });

            if (response.status === 200) {
                const data = Array.isArray(response.data) ? response.data : [];
                setResults(data);
                setTotalResults(data.length);

                const distinctWebsites = [...new Set(data.map(item => item.website))];
                setWebsites(distinctWebsites);
                applyFilters(data); // Filter immediately after fetching
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
            setSearchCompleted(true);
        }
    };

    const applyFilters = (data) => {
        let filteredData = Array.isArray(data) ? [...data] : [];

        // Determine min and max prices
        const minPrice = filters.minPrice === '' || parseFloat(filters.minPrice) < 0 ? 0 : parseFloat(filters.minPrice);
        const maxPrice = filters.maxPrice === '' || parseFloat(filters.maxPrice) < 0 ? 999999 : parseFloat(filters.maxPrice);

        // Filter the data based on price range
        filteredData = filteredData.filter((item) => {
            const price = parseFloat(item.price.replace(',', '.').replace('€', ''));
            return price >= minPrice && price <= maxPrice;
        });

        // Sort the filtered data based on the sort criteria
        if (filters.sortBy === 'priceAsc') {
            filteredData.sort((a, b) => {
                return parseFloat(a.price.replace(',', '.').replace('€', '')) - parseFloat(b.price.replace(',', '.').replace('€', ''));
            });
        } else if (filters.sortBy === 'priceDesc') {
            filteredData.sort((a, b) => {
                return parseFloat(b.price.replace(',', '.').replace('€', '')) - parseFloat(a.price.replace(',', '.').replace('€', ''));
            });
        }

        setFilteredResults(filteredData);
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action
            // Update the URL with search_param
            const newUrl = `/products?search=${encodeURIComponent(searchTerm)}`;
            window.history.pushState({}, '', newUrl); // Update the URL without refreshing
            fetchResults(searchTerm); // Trigger search
        }
    };


    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const indexOfLastItem = currentPage * resultsPerPage;
    const indexOfFirstItem = indexOfLastItem - resultsPerPage;
    const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

    return (
        <div className="flex flex-col min-h-screen bg-center bg-cover">
            <Navbar
                auth={auth}
                searchTerm={searchTerm}
                handleChange={handleChange}
                handleKeyDown={handleKeyDown}
            />
            <Filters filters={filters} handleFilterChange={handleFilterChange} totalResults={totalResults} />
            <div className="p-4">
                {searchTerm && totalResults > 0 && (
                    <>
                        <p className={style.total}>
                            Total results found for "{searchTerm}" <span>({totalResults})</span>
                        </p>
                        <p className={style.found}>
                            Found in: <span>{websites.join(', ')}</span>
                        </p>
                    </>
                )}
            </div>
            <ProductList results={currentItems} loading={loading} />

            {/* Show Paginator only when there are results */}
            {filteredResults.length > 0 && totalPages > 1 && (
                <Paginator
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default ProductPage;
