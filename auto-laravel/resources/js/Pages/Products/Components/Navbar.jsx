import React from 'react';
import { Link } from '@inertiajs/react';
import Dropdown from 'C:/laragon/www/auto-parts/auto-laravel/resources/js/Components/Dropdown';
import SearchInput from 'C:/laragon/www/auto-parts/auto-laravel/resources/js/Components/SearchInput';
import { FaSearch } from "react-icons/fa";
import style from '../Product.module.scss';

const Navbar = ({ auth, searchTerm, handleChange, handleKeyDown }) => {

    
    return (
        <div className={style.navbar}>
            <div className="text-2xl sm:text-4xl text-black font-thin font-semibold">ChikChing.lv</div>
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
                            className="text-lg sm:text-xl font-semibold text-black hover:text-gray-300"
                        >
                            Log in
                        </Link>

                        <Link
                            href={route('register')}
                            className="text-lg sm:text-xl ml-4 font-semibold text-black hover:text-gray-300"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
