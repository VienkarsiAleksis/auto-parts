import React from 'react';
import style from '../Product.module.scss';

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className={style.paginator}>
            <button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className={`${style.pageButton} ${currentPage === 1 ? style.disabled : ''}`}
            >
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button 
                    key={index + 1} 
                    onClick={() => onPageChange(index + 1)}
                    className={`${style.pageNumber} ${currentPage === index + 1 ? style.active : ''}`}
                >
                    {index + 1}
                </button>
            ))}
            <button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className={`${style.pageButton} ${currentPage === totalPages ? style.disabled : ''}`}
            >
                Next
            </button>
        </div>
    );
};

export default Paginator;
