import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchInput = ({ searchTerm, handleChange, onFocus, onBlur, onKeyDown, placeholder = 'Search...', icon: Icon }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const inputRef = useRef(null);

    const handleIconClick = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
            inputRef.current.focus();
        }
    };

    const handleBlur = (e) => {
        if (!searchTerm) {
            setIsExpanded(false);
        }
        if (onBlur) {
            onBlur(e);
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
                value={searchTerm}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                className={`transition-all duration-300 ease-in-out border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-full py-2 px-6 shadow-sm ${
                    isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`}
                style={{ position: 'absolute' }}
                placeholder={placeholder}
            />
            <button
                onClick={handleIconClick}
                className="z-10 flex justify-center items-center w-12 h-12"
            >
                <Icon className="text-black" />
            </button>
        </div>
    );
};

export default SearchInput;