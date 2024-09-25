import { Link, Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Dropdown from '../Components/Dropdown';
import SearchInput from '../Components/SearchInput';
import { FaCar } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";


export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [part, setPart] = useState('');

    const handleSearch = () => {
        if (part.trim()) {
            router.visit(`/products?search=${part}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="container background relative flex flex-col min-h-screen bg-center bg-cover">
                <img className='absolute bmw' src="https://www.lloydmotorgroup.com/ImageLibrary/images/BMW/Retail/Master/New%20Cars/M%20Cars/M4%20Coupe%20Gallery/BMW-G82-M4-Sao-Paulo-Yellow-thumb.png" alt="" />
                <img className='absolute mazda' src="https://s7d1.scene7.com/is/image/scom/RZR_K7X_360e_022?$750p$" alt="" />
                <div className="navbar sm:fixed sm:top-0 p-6 sm:right-0 text-end w-screen flex px-20 bg-white">
                    <div className='text-2xl sm:text-4xl text-black logo'>ChikChing.lv</div>
                    <div className='ml-auto'>
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
                <div className='flex flex-col justify-center items-center text-center mt-56'>
                    <div className='text-7xl font-bold text-black m-2'><h1>ALL PARTS. ONE SEARCH.</h1></div>
                    <div className='text-4xl text-black'><p>Browse listings from all the major car parts sites, including:</p></div>
                    <div className='flex space-x-4'>
                        <img src="https://www.trodo.lv/media/delivery/trodo.svg" alt="Trodo" className='w-36 h-auto' />
                        <img src="https://cdn.autodoc.de/uploads/images/social-networks/autodoc-logo.png" alt="Autodoc" className='w-36 h-auto' />
                        <img src="https://bluesoft.com/wp-content/uploads/2020/04/Inter-Cars.png" alt="Inter-Cars" className='w-36 h-auto' />
                    </div>
                </div>
                <div className='down w-screen flex flex-col justify-items-end items-center'>
                    <SearchInput
                        id="part"
                        type="text"
                        name="part"
                        value={part}
                        className="input h-16 rounded-3xl px-6 input-sty mb-10"
                        autoComplete="current-part"
                        onChange={(e) => setPart(e.target.value)}
                        onKeyDown={handleKeyDown}
                        isFocused={true}
                        placeholder="Search car parts..."
                        icon={FaSearch}
                    />
                    <div className='h-64 w-full bg-white rounded-lg flex justify-center items-center down-border'>
                        <div className='select'>
                            <img src="https://cdn-icons-png.flaticon.com/512/5385/5385676.png" alt="" />
                            <p>Engine oil</p>
                        </div>
                        <div className='select'>
                            <img src="https://cdn1.iconfinder.com/data/icons/car-service-90/32/fuel_filter_car_part-512.png" alt="" />
                            <p>Fuel filter</p>
                        </div>
                        <div className='select'>
                            <img src="https://cdn-icons-png.flaticon.com/512/6590/6590498.png" alt="" />
                            <p>Oil filter</p>
                        </div>
                        <div className='select'>
                            <img src="https://cdn-icons-png.flaticon.com/512/8570/8570258.png" alt="" />
                            <p>Air filter</p>
                        </div>
                        <div className='select'>
                            <img src="https://cdn-icons-png.flaticon.com/512/3071/3071441.png" alt="" />
                            <p>Battery</p>
                        </div>
                        <div className='select'>
                            <img src="https://cdn-icons-png.flaticon.com/512/926/926678.png" alt="" />
                            <p>Belt</p>
                        </div>
                        <div className='select'>
                            <img src="https://cdn-icons-png.flaticon.com/512/6590/6590519.png" alt="" />
                            <p>Alternator</p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .background {
                    position: relative;
                    background-color: #C6E1F1;
                    background-size: cover;
                    background-position: center;
                }
                .bg-btn{
                    background-color: #70727E;
                    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.5);
                }   
                .input-sty{
                    border: none;
                    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
                    border-radius: 50px;
                }
                .input-sty:focus{
                    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
                }
                .navbar{
                    border-radius: 0px 0px 70px 70px;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }
                .down{
                    height: 14.9em;
                }
                .down-border{
                    border-radius: 70px 70px 0px 0px;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px -4px 12px;
                }
                .bmw{
                    right: -500px;
                    top: 200px;
                    height: 25em;
                    width: auto;
                }
                .mazda{
                    left: -470px;
                    top: 200px;
                    height: 30em;
                    width: auto;
                }
                .container{
                    overflow: hidden;
                }
                .select{
                    width: 100px;
                    height: 100px;
                    margin: 20px;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                    border-radius: 15px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }
                .select:hover{
                    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
                }
                .input{
                    width: 100%;
                }
                .select img{
                    width: 40px;
                    height: 40px;
                }
            `}</style>
        </>
    );
}
