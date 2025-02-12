import React, { useState, useEffect } from 'react';
import style from '../Product.module.scss';

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
    const [visiblePages, setVisiblePages] = useState(5); // Default number of visible pages

    // Use effect to handle screen width changes
    useEffect(() => {
        const handleResize = () => {
            // Check if screen width is 600px or less
            if (window.innerWidth <= 700) {
                setVisiblePages(2); // Set visible pages to 2
            } else {
                setVisiblePages(5); // Set back to default 5
            }
        };

        // Add event listener for resizing
        window.addEventListener('resize', handleResize);

        // Call once to set initial value
        handleResize();

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2)); // Calculate start page
    const endPage = Math.min(totalPages, startPage + visiblePages - 1); // Calculate end page

    // Adjust start page if we are close to the end of the total pages
    const adjustedStartPage = Math.max(1, Math.min(startPage, totalPages - visiblePages + 1));

    return (
        <div className={style.paginator}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${style.pageButton} ${currentPage === 1 ? style.disabled : ''}`}
            >
                {`<`}
            </button>

            {Array.from({ length: endPage - adjustedStartPage + 1 }, (_, index) => {
                const pageNumber = adjustedStartPage + index;
                return (
                    <button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        className={`${style.pageNumber} ${currentPage === pageNumber ? style.active : ''}`}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${style.pageButton} ${currentPage === totalPages ? style.disabled : ''}`}
            >
                {`>`}
            </button>
        </div>
    );
};

export default Paginator;
