import React from 'react';
import style from '../Product.module.scss';

const Filters = ({ filters, handleFilterChange }) => {
    return (
        <div className={style.filter}>
            <div className={style.sort}>
                <p>Sort By</p>
                <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
                    <option value="relevance">Relevance</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                </select>
            </div>

            <div className={style.sortByPrice}>
                <p>Price Range</p>
                <div className={style.numberInput}>
                    <div>
                        <label>Min:</label>
                        <input
                            type="number"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                            placeholder="Min"
                        />
                    </div>
                    <div>
                        <label>Max:</label>
                        <input
                            type="number"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                            placeholder="Max"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;
