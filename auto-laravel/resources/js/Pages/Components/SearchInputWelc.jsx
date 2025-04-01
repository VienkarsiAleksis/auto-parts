import { forwardRef, useEffect, useRef, useState } from 'react';

const SearchInputWelc = forwardRef(function SearchInputWelc(
  { type = 'text', className = '', isFocused = false, icon: Icon, onSearch, ...props },
  ref
) {
  const inputRef = ref || useRef();
  const containerRef = useRef(null);
  const [buttonTop, setButtonTop] = useState('7px');

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  // Adjust button position based on input height
  useEffect(() => {
    const updateButtonPosition = () => {
      if (inputRef.current) {
        const inputHeight = inputRef.current.offsetHeight;
        // Calculate position based on input height to center it
        const topOffset = Math.max(7, (inputHeight - 50) / 2);
        setButtonTop(`${topOffset}px`);
      }
    };

    // Initial positioning
    updateButtonPosition();

    // Set up resize listener
    window.addEventListener('resize', updateButtonPosition);
    
    // Clean up
    return () => window.removeEventListener('resize', updateButtonPosition);
  }, []);

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <div className="searchInput relative w-full" ref={containerRef}>
      <input
        {...props}
        type={type}
        className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-full shadow-sm w-full ${className}`}
        ref={inputRef}
        style={{ paddingRight: '60px' }}
      />
      {Icon && (
        <button
          type="button"
          className="absolute right-3"
          style={{ 
            width: '3rem', 
            height: '50%', 
            background: '#85BDF5', 
            borderRadius: '50%',
            top: buttonTop,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={handleSearchClick}
          aria-label="Search"
        >
          <Icon style={{ color: 'white' }} size={20} />
        </button>
      )}
    </div>
  );
});

export default SearchInputWelc;