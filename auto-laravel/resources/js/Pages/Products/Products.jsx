import { Link, Head, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchInput from '../../Components/SearchInput';
import { FaSearch } from "react-icons/fa";
import style from "./product.module.scss";
import Dropdown from '../../Components/Dropdown';

const ProductPage = ({ auth }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query = params.get('search');
        if (query) {
            setSearchTerm(query);
            fetchResults(query);
        }
    }, []);

    const fetchResults = async (term) => {
        try {
            // Call Laravel API to check if data exists in the database
            const dbResponse = await axios.get(`http://localhost:8000/api/fetch_data`, {
                params: { search_term: term }
            });

            if (dbResponse.data.length > 0) {
                setResults(dbResponse.data); // Set results from the database
            } else {
                // If no data, scrape and save it
                const scrapeResponse = await axios.get('http://localhost:6969/scrape', {
                    params: { q: term }
                });
                const scrapedData = scrapeResponse.data;
                setResults(scrapedData);
                await saveScrapedData(scrapedData, term); // Save scraped data
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const saveScrapedData = async (searchTerm, scrapedData) => {
        try {
            const response = await axios.post('http://localhost:8000/api/save-scraped-data', {
                search_param: scrapedData, // The search term the user entered
                data: searchTerm, // The scraped data as a JSON string
            });
            console.log('Data saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving data:', error.response.data);
        }
    };    
    
    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            fetchResults(searchTerm);
        }
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className='flex flex-col min-h-screen bg-center bg-cover'>
            <div className={style.navbar}>
                <div className='text-2xl sm:text-4xl text-black font-thin font-semibold'>ChikChing.lv</div>
                <SearchInput
                    id="part"
                    type="text"
                    name="part"
                    value={searchTerm}
                    className={`h-16 w-full rounded-3xl px-6 ${style['input-sty']}`}
                    autoComplete="current-part"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    isFocused={true}
                    placeholder="Search car parts..."
                    icon={FaSearch}
                />
                <div>
                    {auth.user ? (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center text-lg sm:text-xl font-semibold text-black hover:text-gray-300"
                                    >
                                        {auth.user.name}
                                        <svg
                                            className="ms-2 -me-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="text-lg sm:text-xl font-semibold text-black hover:text-gray-300 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="text-lg sm:text-xl ml-4 font-semibold text-black hover:text-gray-300 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className={style.productOutput}>
                <div className={style.filter}>
                    <div className={style.sort}>
                        <p>Sort</p>
                        <select name="sort" id="sort">
                            <option value="Lowest to Highest">Lowest to Highest</option>
                            <option value="Highest to Lowest">Highest to Lowest</option>
                        </select>
                    </div>
                    <div className={style.sortByPrice}>
                        <p>Sort by Price</p>
                        <div className={style.numberInput}>
                            <input type="number" /><div>-</div><input type="number" />
                        </div>
                    </div>
                </div>
                {results.length > 0 && (
                    <div className={style.products}>
                        {results.map((item, index) => (
                            <div key={index} className={style.item}>
                                <img src={item.img} alt={item.desc} />
                                <p><strong>Website: </strong> {item.website}</p>
                                <p><strong>Name:</strong> {item.desc}</p>
                                <p><strong>Price:</strong> {item.price}</p>
                                <a href={item.link} target="_blank" rel="noopener noreferrer">View Item</a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
