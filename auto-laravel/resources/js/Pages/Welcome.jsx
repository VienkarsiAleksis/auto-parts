import { Link, Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Dropdown from './Components/Dropdown';
import SearchInputWelc from './Components/SearchInputWelc';
import { FaSearch } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
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
import bmw from "../../assets/bmw.png";
import subaru from "../../assets/subaru.png";
import PuppeteerExplanation from './Components/PuppeteerExplanation';

export default function Welcome({ auth }) {
    const [part, setPart] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    // Parbauda ekrāna izmēru un iestata isMobile stāvokli
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

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
        setPart(selectedPart);
        router.visit(`/products?search=${selectedPart}`);
    };

    // Populārākās detaļas
    const popularParts = [
        { id: 1, name: 'Motoreļļa', image: oil, searchTerm: 'motoreļļa' },
        { id: 2, name: 'Degvielas filtrs', image: fuelFilter, searchTerm: 'degvielas filtrs' },
        { id: 3, name: 'Eļļas filtrs', image: oilFilter, searchTerm: 'eļļas filtrs' },
        { id: 4, name: 'Gaisa filtrs', image: airFilter, searchTerm: 'gaisa filtrs' },
        { id: 5, name: 'Akumulators', image: battery, searchTerm: 'akumulators' },
        { id: 6, name: 'Siksna', image: belt, searchTerm: 'siksna' },
        { id: 7, name: 'Ģenerātors', image: alternator, searchTerm: 'ģenerātors' },
    ];

    return (
        <>
            <Head title="ChikChing.lv | Auto Detaļu Meklētājs" />
            <div className="background relative flex flex-col min-h-screen bg-center bg-cover">
                <div className="hidden lg:block">
                    <img className='absolute right-car' src={bmw} alt="BMW" />
                    <img className='absolute left-car' src={subaru} alt="Subaru" />
                </div>
                
                <nav className="navbar fixed top-0 z-50 w-full py-4 px-4 md:px-8 lg:px-20 bg-white flex items-center justify-between shadow-md">
                    <div className='text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 logo'>
                        ChikChing.lv
                    </div>
                    
                    <div className='flex items-center gap-3 md:gap-6'> 
                        {auth.user && (
                            <a href="/SavedProducts" className="flex items-center hover:text-gray-600 transition-colors">
                                <CiHeart size={isMobile ? 22 : 27} className="text-gray-800" />
                            </a>
                        )}
                        
                        {auth.user ? (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center text-sm md:text-base lg:text-lg font-semibold text-gray-800 hover:text-gray-600 transition-colors"
                                        >
                                            Sveiki, {auth.user.name}!
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
                </nav>
                <div className='main-content flex flex-col justify-center items-center text-center mt-32 md:mt-40 lg:mt-56 px-4 md:px-8'>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-4 md:mb-6 slogan">
                        VISAS DETAĻAS. VIENĀ MEKLĒJUMĀ
                    </h1>
                    
                    <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-700 mb-6 md:mb-8 include max-w-4xl'>
                        Pārlūkojiet sarakstus no visām pieprasītakajām automašīnu detaļu vietnēm, tostarp:
                    </p>
                    
                    <div className='flex space-x-4 md:space-x-8 mb-12'>
                        <img src={trodo} alt="Trodo" className='w-20 sm:w-24 md:w-28 lg:w-36 h-auto img' />
                        <img src={autodoc} alt="Autodoc" className='w-20 sm:w-24 md:w-28 lg:w-36 h-auto img' />
                        <img src={ic} alt="Inter-Cars" className='w-20 sm:w-24 md:w-28 lg:w-36 h-auto img' />
                    </div>
                </div>
                <div className='w-full flex flex-col items-center px-4 md:px-8 lg:px-20'>
                    <div className="w-full max-w-4xl">
                        <SearchInputWelc
                            id="part"
                            type="text"
                            name="part"
                            value={part}
                            className="input h-12 md:h-16 rounded-full px-6 input-sty mb-6 md:mb-10 w-full"
                            autoComplete="current-part"
                            onChange={(e) => setPart(e.target.value)}
                            onKeyDown={handleKeyDown}
                            isFocused={true}
                            placeholder="Meklē auto detaļu... (detaļas nosaukums vai detaļas kods)"
                            icon={FaSearch}
                            onSearch={handleSearch}
                        />
                    </div>
                    
                    <div className='mb-12 md:mt-4 w-full max-w-5xl bg-white rounded-lg md:rounded-2xl shadow-md py-6 md:py-8 px-2 md:px-4'>
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 text-center">Populārākās detaļas</h2>
                        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 md:gap-4 justify-items-center'>
                            {popularParts.map((part) => (
                                <div 
                                    key={part.id}
                                    className='select w-full max-w-24 h-24 p-2 flex flex-col justify-center items-center text-center cursor-pointer'
                                    onClick={() => handleSelectPart(part.searchTerm)}
                                >
                                    <img src={part.image} alt={part.name} className="w-8 h-8 md:w-10 md:h-10 mb-2" />
                                    <p className="text-xs md:text-sm text-gray-700">{part.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <PuppeteerExplanation />
                </div>
            </div>

            <style>{`
                .background {
                    background: linear-gradient(135deg, #C6E1F1, #A1C4FD);
                    background-size: cover;
                    background-position: center;
                    min-height: 100vh;
                    padding-bottom: 2rem;
                    overflow-x: hidden;
                }
                
                .navbar {
                    border-radius: 0 0 20px 20px;
                }
                
                .input-sty {
                    border: none;
                    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
                    transition: all 0.3s ease;
                }
                
                .input-sty:focus {
                    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
                    outline: none;
                }
                
                .select {
                    box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 8px;
                    border-radius: 12px;
                    transition: all 0.2s ease-in-out;
                }
                
                .select:hover {
                    box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;
                    transform: translateY(-2px);
                    background-color: #f8f9fa;
                }
                
                .logo, .slogan, .include {
                    user-select: none;
                }
                
                .right-car {
                    right: -200px;
                    top: 230px;
                    height: 28rem;
                    width: auto;
                    opacity: 0.7;
                    z-index: 0;
                }
                
                .left-car {
                    left: -200px;
                    top: 300px;
                    height: 26rem;
                    width: auto;
                    opacity: 0.7;
                    z-index: 0;
                }
                
                @media (min-width: 1600px) {
                    .right-car {
                        right: -100px;
                    }
                    
                    .left-car {
                        left: -100px;
                    }
                }
                
                @media (max-width: 768px) {
                    .navbar {
                        border-radius: 0 0 15px 15px;
                    }
                }
            `}</style>
        </>
    );
}