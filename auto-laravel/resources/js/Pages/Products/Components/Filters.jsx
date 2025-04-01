import React, { useState, useEffect } from 'react';
import style from '../Product.module.scss';
import { MdOutlineFilterList, MdOutlineFilterListOff } from "react-icons/md";
import SearchInput from "./SearchInput";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RiArrowGoBackFill } from "react-icons/ri";

const Filters = ({ filters, handleFilterChange, websites, excludedWebsites, handleReturnWebsite, handleExcludeWebsite, auth, searchTerm, handleChange, onKeyDown, recentSearched = [] }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isVisibleSearch, setVisibleSearch] = useState();

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleFocus = () => {
        setIsDropdownOpen(true);
    };

    const handleBlur = () => {
        setIsDropdownOpen(false);  // Close immediately when the input loses focus
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 900) {
                setVisibleSearch(true);
            } else {
                setVisibleSearch(false);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleKeyDownEvent = (event) => {
            if (event.key === 'Escape') {
                setIsDropdownOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDownEvent);
        return () => window.removeEventListener('keydown', handleKeyDownEvent);
    }, [searchTerm]);

    const handleKeyDownSearchInput = (event) => {
        if (event.key === 'Enter') {
            setIsSidebarVisible(false); // Close the sidebar when Enter is pressed
        }
        onKeyDown(event);
    };

    return (
        <>
            <button className={style.filterToggle} onClick={toggleSidebar}>
                {isSidebarVisible ? <MdOutlineFilterListOff /> : <MdOutlineFilterList />}
            </button>

            <div className={`${style.filter} ${isSidebarVisible ? style.showFilter : ''}`}>
                {isVisibleSearch && (
                    <div className={`${style['search-filter']} relative w-[100%] flex`}>
                        <SearchInput
                            id="part"
                            type="text"
                            name="part"
                            searchTerm={searchTerm}
                            className={`h-16 w-full rounded-3xl px-6 text-lg ${style['input-sty']}`}
                            autoComplete="current-part"
                            handleChange={handleChange}
                            onKeyDown={handleKeyDownSearchInput}
                            bool={true}
                            isFocused={true}
                            placeholder="Search car parts..."
                            icon={FaSearch}
                            onFocus={handleFocus}
                            onBlur={handleBlur}  // Close dropdown immediately on blur
                        />

                        {/* Recent Searches Dropdown */}
                        {isDropdownOpen && recentSearched.length > 0 && (
                            <div className={`${style.recentSearches} absolute z-10 w-full bg-white shadow-lg rounded-md mt-1`}>
                                <div className={style.recentSearchesList}>
                                    {recentSearched.map((item, index) => (
                                        <div key={index} className={style.recentSearchesItem}>
                                            <a href={`/products?search=${encodeURIComponent(item.search_param)}`}>
                                                <FaSearch /> {item.search_param}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className={style.found}>
                    <p>Atrasts:</p>
                    {websites.map(website => (
                        <span className={style.editWebsite} key={website}>
                            {website}
                            {excludedWebsites.includes(website) ? (
                                <button
                                    className={style.returnButton}
                                    onClick={() => handleReturnWebsite(website)}
                                >
                                    <p><RiArrowGoBackFill size='26' color='lightblue'/></p>
                                </button>
                            ) : (
                                <button
                                    className={style.excludeButton}
                                    onClick={() => handleExcludeWebsite(website)}
                                >
                                    <p><IoMdClose color='red' size='26'/></p>
                                </button>
                            )}
                        </span>
                    ))}
                </div>
                <div className={style.sort}>
                    <p>Kartot pēc</p>
                    <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
                        <option value="relevance">Noklusējums</option>
                        <option value="priceAsc">No lētākās uz dargāko</option>
                        <option value="priceDesc">No dargākā uz letāko</option>
                    </select>
                </div>
                <div className={style.sortByPrice}>
                    <p>Cenu diapazons</p>
                    <div className={style.numberInput}>
                        <div>
                            <label>Min (€):</label>
                            <input
                                type="number"
                                name="minPrice"
                                value={filters.minPrice}
                                onChange={handleFilterChange}
                                placeholder="Min (€)"
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label>Max (€):</label>
                            <input
                                type="number"
                                name="maxPrice"
                                value={filters.maxPrice}
                                onChange={handleFilterChange}
                                placeholder="Max (€)"
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Filters;
