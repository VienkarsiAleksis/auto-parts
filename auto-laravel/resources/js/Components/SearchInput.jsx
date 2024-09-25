import { forwardRef, useEffect, useRef } from 'react';

const SearchInput = forwardRef(function SearchInput(
  { type = 'text', className = '', isFocused = false, icon: Icon, ...props },
  ref
) {
  const inputRef = ref || useRef();

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div className="relative w-7/12 h-auto flex justify-center items-center">
      <input
        {...props}
        type={type}
        className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm${
          Icon ? 'pr-10' : ''
        } ${className}`}
        ref={inputRef}
      />
      {Icon && (
        <button style={{width: '50px', height: '50px', background: '#85BDF5', borderRadius: '50%'}} className='absolute inset-y-2 right-1 flex justify-center items-center'>
            <Icon className=" pointer-events-none" />
        </button>
      )}
    </div>
  );
});

export default SearchInput;
