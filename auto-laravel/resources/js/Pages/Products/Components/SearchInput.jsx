import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchInput = ({ searchTerm, handleChange, bool, onFocus, onKeyDown, placeholder = 'Search...' }) => {
    const [isExpanded, setIsExpanded] = useState(bool);
    const inputRef = useRef(null);

    const handleIconClick = () => {
        setIsExpanded(true);
        inputRef.current.focus();
    };

    const handleBlur = () => {
        if (!searchTerm) {
            setIsExpanded(false);
        }
    };

    useEffect(() => {
        const handleKeyDownEvent = (event) => {
            if (event.key === 'Escape') {
                setIsExpanded(false);
            }
        };
        window.addEventListener('keydown', handleKeyDownEvent);
        return () => window.removeEventListener('keydown', handleKeyDownEvent);
    }, []);

    return (
        <div className="relative flex items-center justify-end">
            <input
                ref={inputRef}
                type="text"
                value={searchTerm} // Correctly using the dynamic searchTerm value
                onChange={handleChange} // Ensure handleChange is correctly passed and defined
                onBlur={handleBlur}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                className={`transition-all duration-300 ease-in-out border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-full py-2 px-6 shadow-sm ${
                    isExpanded ? 'w-[100%] opacity-100' : 'w-0 opacity-0'
                }`}
                style={{ left: isExpanded ? '0' : '100%', position: 'absolute' }}
                placeholder={placeholder}
            />
            <button
                onClick={handleIconClick}
                className="z-10 flex justify-center items-center w-12 h-12"
            >
                <FaSearch className="text-black" />
            </button>
        </div>
    );
};

export default SearchInput;
