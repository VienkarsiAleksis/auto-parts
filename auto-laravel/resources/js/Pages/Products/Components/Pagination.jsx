import React, { useState, useEffect } from 'react';
import style from '../Product.module.scss';

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
    const [visiblePages, setVisiblePages] = useState(5); // Noklusējumā redzamo lapu skaits

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 700) {
                setVisiblePages(2); // Norāda, ka redzamo lapu skaits ir 2
            } else {
                setVisiblePages(5); // Norāda, ka redzamo lapu skaits ir 5
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2)); // Kalkulē sākuma lapu
    const endPage = Math.min(totalPages, startPage + visiblePages - 1); // Kalkulē beigu lapu

    // Pieregulējums, lai nodrošinātu, ka sākuma lapa ir vismaz 1 un beigu lapa nepārsniedz kopējo lapu skaitu
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
