import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Dropdown from '../../Components/Dropdown';
import SearchInput from './SearchInput';
import { FaSearch } from "react-icons/fa";
import style from '../Product.module.scss';
import { CiHeart } from "react-icons/ci";

const Navbar = ({ auth, searchTerm, handleChange, onKeyDown, recentSearched = [] }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleFocus = () => {
        setIsDropdownOpen(true);
    };
    
    const handleBlur = () => {
        setTimeout(() => {
            setIsDropdownOpen(false);
        }, 200); // Delay to allow click event on dropdown items
    };

    useEffect(() => {
        const handleKeyDownEvent = (event) => {
            if (event.key === 'Escape') {
                setIsDropdownOpen(false);
            } else if (searchTerm === "") {
                setIsDropdownOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDownEvent);
        return () => window.removeEventListener('keydown', handleKeyDownEvent);
    }, [searchTerm]);

    return (
        <div className={`top-0 z-50 w-full py-4 px-4 md:px-8 lg:px-20 bg-white flex items-center justify-between shadow-md`}>
            <a className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 logo" href={route('welcome')}>ChikChing.lv</a>
            <div className={style.right_side}>
                <div className={`${style['search-input']} relative w-[50%]`}>
                    <SearchInput
                        id="part"
                        type="text"
                        name="part"
                        searchTerm={searchTerm}
                        className={`h-16 w-full rounded-3xl px-6 text-lg ${style['input-sty']}`}
                        autoComplete="current-part"
                        handleChange={handleChange}
                        onKeyDown={onKeyDown}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        isFocused={true}
                        placeholder="Search car parts..."
                        icon={FaSearch}
                    />

                    {/* Recent Searches Dropdown */}
                    {isDropdownOpen && recentSearched.length > 0 && (
                        <div className={`${style.recentSearches} absolute z-10 w-full bg-white shadow-lg rounded-md mt-1`}>
                            <div className={style.recentSearchesList}>
                                {recentSearched.map((item, index) => (
                                    <div key={index} className={style.recentSearchesItem}>
                                        <Link href={`/products?search=${encodeURIComponent(item.search_param)}`}>
                                            🔍 {item.search_param}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {auth.user && (
                    <a href="/SavedProducts"><CiHeart size={26}/></a>
                )}
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
                                <Dropdown.Link href={route('profile.edit')}>Profils</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Izrakstīties
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="text-sm md:text-base font-semibold text-gray-800 hover:text-gray-600 transition-colors"
                            >
                                Ierakstīties
                            </Link>

                            <Link
                                href={route('register')}
                                className="text-sm md:text-base font-semibold text-gray-800 hover:text-gray-600 transition-colors ml-3 md:ml-4"
                            >
                                Reģistrēties
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;