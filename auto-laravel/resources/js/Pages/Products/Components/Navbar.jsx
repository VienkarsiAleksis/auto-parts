import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Dropdown from '../../Components/Dropdown';
import SearchInput from './SearchInput';
import { FaSearch } from "react-icons/fa";
import style from '../Product.module.scss';

const Navbar = ({ auth, searchTerm, handleChange, onKeyDown, recentSearched = [] }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleFocus = () => {
        setIsDropdownOpen(true);
    };
    
    const handleBlur = () => {
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleKeyDownEvent = (event) => {
            if (event.key === 'Escape') {
                setIsDropdownOpen(false);
            }else if(searchTerm === ""){
                setIsDropdownOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDownEvent);
        return () => window.removeEventListener('keydown', handleKeyDownEvent);
    }, []);

    return (
        <div className={style.navbar}>
            <a className="text-2xl sm:text-4xl text-black logo" href={route('welcome')}>ChikChing.lv</a>
            <div className={style.right_side}>
            <div className={`${style['search-input']} relative w-[50%]`}>
                <SearchInput
                    id="part"
                    type="text"
                    name="part"
                    searchTerm={searchTerm}
                    className={`h-16 w-full rounded-3xl px-6 text-lg ${style['input-sty']}`} // Adjusted h-16 to a larger height if desired
                    autoComplete="current-part"
                    handleChange={handleChange}
                    onKeyDown={onKeyDown}
                    onFocus={handleFocus} // Open dropdown on focus
                    onBlur={handleBlur}   // Close dropdown on blur
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
                            className="text-lg sm:text-xl font-semibold text-black hover:text-gray-300"
                        >
                            Ierakstīties
                        </Link>

                        <Link
                            href={route('register')}
                            className="text-lg sm:text-xl ml-4 font-semibold text-black hover:text-gray-300"
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
