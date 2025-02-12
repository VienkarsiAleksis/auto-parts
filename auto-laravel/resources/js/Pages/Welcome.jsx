import { Link, Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Dropdown from './Components/Dropdown';
import SearchInputWelc from './Components/SearchInputWelc';
import { FaCar } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import oil from "../../assets/engine.png";
import fuelFilter from "../../assets/fuel_filter.webp";
import oilFilter from "../../assets/oil_filter.png";
import airFilter from "../../assets/air filter.png";
import alternator from "../../assets/alternator.png";
import belt from "../../assets/belt.png";
import battery from "../../assets/battery.webp";
import trodo from "../../assets/trodo.svg";
import autodoc from "../../assets/autodco.png";
import ic from "../../assets/ic.webp";
import bmw from "../../assets/bmw.webp";
import subaru from "../../assets/subaru.png";


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

    const handleSelectPart = (selectedPart) => {
        setPart(selectedPart); // Set the selected part in state
        router.visit(`/products?search=${selectedPart}`); // Route to the search page
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="background relative flex flex-col min-h-screen bg-center bg-cover">
                <img className='absolute bmw' src={bmw} alt="" />
                <img className='absolute mazda' src={subaru} alt="" />
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
                                    className="text-lg sm:text-xl font-semibold text-black hover:text-gray-300 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Ierakstīties
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="text-lg sm:text-xl ml-4 font-semibold text-black hover:text-gray-300 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Reģistrēties
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className='main_blow flex flex-col justify-center items-center text-center mt-56'>
                    <div className='text-7xl font-bold text-black m-2'><h1 className="slogan">VISAS DETAĻAS. VIENĀ MEKLĒJUMĀ</h1></div>
                    <div className='text-4xl text-black'><p className='include'>Pārlūkojiet sarakstus no visām pieprasītakajām automašīnu detaļu vietnēm, tostarp:</p></div>
                    <div className='flex space-x-4'>
                        <img src={trodo} alt="Trodo" className='w-36 h-auto img' />
                        <img src={autodoc} alt="Autodoc" className='w-36 h-auto img' />
                        <img src={ic} alt="Inter-Cars" className='w-36 h-auto img' />
                    </div>
                </div>
                <div className='down w-screen flex flex-col justify-items-end items-center'>
                    <SearchInputWelc
                        id="part"
                        type="text"
                        name="part"
                        value={part}
                        className="input h-16 rounded-3xl px-6 input-sty mb-10"
                        autoComplete="current-part"
                        onChange={(e) => setPart(e.target.value)}
                        onKeyDown={handleKeyDown}
                        isFocused={true}
                        placeholder="Meklē auto detaļu..."
                        icon={FaSearch}
                    />
                    <div className='h-64 w-full bg-white rounded-lg flex justify-center items-center down-border'>
                        <div className='select' onClick={() => handleSelectPart('motoreļļa')}>
                            <img src={oil} alt="Engine oil" />
                            <p>Motoreļļa</p>
                        </div>
                        <div className='select' onClick={() => handleSelectPart('degvielas filtrs')}>
                            <img src={fuelFilter} alt="Fuel filter" />
                            <p>Degvielas filtrs</p>
                        </div>
                        <div className='select' onClick={() => handleSelectPart('eļļas filtrs')}>
                            <img src={oilFilter} alt="Oil filter" />
                            <p>Eļļas filtrs</p>
                        </div>
                        <div className='select' onClick={() => handleSelectPart('gaisa filtrs')}>
                            <img src={airFilter} alt="Air filter" />
                            <p>Gaisa filtrs</p>
                        </div>
                        <div className='select' onClick={() => handleSelectPart('akumulators')}>
                            <img src={battery} alt="Battery" />
                            <p>Akumulators</p>
                        </div>
                        <div className='select' onClick={() => handleSelectPart('siksna')}>
                            <img src={belt} alt="Belt" />
                            <p>Siksna</p>
                        </div>
                        <div className='select' onClick={() => handleSelectPart('ģenerātors')}>
                            <img src={alternator} alt="Alternator" />
                            <p>Ģenerātors</p>
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
                    overflow: hidden;
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
                    top: 270px;
                    height: 22em;
                    width: auto;
                }
                .mazda{
                    left: -500px;
                    top: 270px;
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
                    text-align: center;
                    flex-direction: column;
                    transition-duration: 0.2s;
                    cursor: pointer;
                    
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
                .border{
                    border: none;
                }
                @media only screen and (max-width: 600px) {
                    .navbar {
                        padding-left: 30px;
                        padding-right: 30px;
                    }
                    .logo{
                        font-size: 20px;
                    }
                    .slogan{
                        font-size: 36px;
                    }
                    .include{
                        font-size: 26px;
                    }
                    .border{
                        width: 90%;
                        border: none;
                        margin-top: 20px;
                    }
                    .img{
                        width: 80px;
                    }
                    .down-border{
                        display: none;
                    }
                    .bmw, .mazda{
                        display: none;
                    }
                    .main_blow{
                        margin-top: 5em;
                    }
                }
            `}</style>
        </>
    );
}
